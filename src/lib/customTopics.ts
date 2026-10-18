import { CUSTOM_PRESETS, presetId } from '../data/customPresets';
import type { Category, TopicPair } from '../types';

const STORAGE_KEY = 'night-wolf-custom-topics';
const DELETED_PRESETS_KEY = 'night-wolf-deleted-presets';
const PRESET_OVERRIDES_KEY = 'night-wolf-preset-overrides';

export type SavedTopic = TopicPair & {
  id: string;
};

export type CustomTopicBank = Record<Category, SavedTopic[]>;

function loadBank(): CustomTopicBank {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { general: [], romance: [], ecchi: [] };
    const parsed = JSON.parse(raw) as Partial<CustomTopicBank>;
    return {
      general: Array.isArray(parsed.general) ? parsed.general : [],
      romance: Array.isArray(parsed.romance) ? parsed.romance : [],
      ecchi: Array.isArray(parsed.ecchi) ? parsed.ecchi : [],
    };
  } catch {
    return { general: [], romance: [], ecchi: [] };
  }
}

function saveBank(bank: CustomTopicBank) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bank));
}

function loadDeletedPresets(): Set<string> {
  try {
    const raw = localStorage.getItem(DELETED_PRESETS_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as string[];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function saveDeletedPresets(ids: Set<string>) {
  localStorage.setItem(DELETED_PRESETS_KEY, JSON.stringify([...ids]));
}

function loadPresetOverrides(): Record<string, TopicPair> {
  try {
    const raw = localStorage.getItem(PRESET_OVERRIDES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, TopicPair>;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function savePresetOverrides(overrides: Record<string, TopicPair>) {
  localStorage.setItem(PRESET_OVERRIDES_KEY, JSON.stringify(overrides));
}

function buildPresets(category: Category, deleted: Set<string>): SavedTopic[] {
  const overrides = loadPresetOverrides();
  return CUSTOM_PRESETS[category]
    .map((topic, index) => {
      const id = presetId(category, index);
      const override = overrides[id];
      return {
        id,
        majority: override?.majority ?? topic.majority,
        minority: override?.minority ?? topic.minority,
      };
    })
    .filter((t) => !deleted.has(t.id));
}

/** プリセット＋ユーザー作成お題（プリセットを先頭に） */
export function getCustomTopics(category: Category): SavedTopic[] {
  const deleted = loadDeletedPresets();
  const presets = buildPresets(category, deleted);
  const presetIds = new Set(presets.map((t) => t.id));
  const userTopics = loadBank()[category].filter(
    (t) => !t.id.startsWith('preset-') && !presetIds.has(t.id),
  );
  return [...presets, ...userTopics];
}

export function getAllCustomTopics(): CustomTopicBank {
  return {
    general: getCustomTopics('general'),
    romance: getCustomTopics('romance'),
    ecchi: getCustomTopics('ecchi'),
  };
}

export function findCustomTopic(
  category: Category,
  id: string,
): SavedTopic | undefined {
  return getCustomTopics(category).find((t) => t.id === id);
}

export function pickRandomCustomTopic(
  category: Category,
  exclude?: TopicPair,
): TopicPair | null {
  const list = getCustomTopics(category);
  if (list.length === 0) return null;

  const candidates = exclude
    ? list.filter(
        (t) => t.majority !== exclude.majority || t.minority !== exclude.minority,
      )
    : list;
  const pool = candidates.length > 0 ? candidates : list;
  const picked = pool[Math.floor(Math.random() * pool.length)];
  return { majority: picked.majority, minority: picked.minority };
}

export function addCustomTopic(category: Category, topic: TopicPair): SavedTopic {
  const bank = loadBank();
  const saved: SavedTopic = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    majority: topic.majority.trim(),
    minority: topic.minority.trim(),
  };
  bank[category] = [saved, ...bank[category].filter((t) => !t.id.startsWith('preset-'))];
  saveBank(bank);
  return saved;
}

export function updateCustomTopic(
  category: Category,
  id: string,
  topic: TopicPair,
): SavedTopic {
  const next: SavedTopic = {
    id,
    majority: topic.majority.trim(),
    minority: topic.minority.trim(),
  };

  if (id.startsWith('preset-')) {
    const overrides = loadPresetOverrides();
    overrides[id] = { majority: next.majority, minority: next.minority };
    savePresetOverrides(overrides);
    return next;
  }

  const bank = loadBank();
  bank[category] = bank[category].map((t) => (t.id === id ? next : t));
  saveBank(bank);
  return next;
}

export function removeCustomTopic(category: Category, id: string) {
  if (id.startsWith('preset-')) {
    const deleted = loadDeletedPresets();
    deleted.add(id);
    saveDeletedPresets(deleted);

    const overrides = loadPresetOverrides();
    if (overrides[id]) {
      delete overrides[id];
      savePresetOverrides(overrides);
    }
    return;
  }

  const bank = loadBank();
  bank[category] = bank[category].filter((t) => t.id !== id);
  saveBank(bank);
}
