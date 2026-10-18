import { PENALTY_PRESETS, penaltyPresetId, type PenaltySide } from '../data/penalties';

const STORAGE_KEY = 'night-wolf-custom-penalties';
const DELETED_PRESETS_KEY = 'night-wolf-deleted-penalties';
const PRESET_OVERRIDES_KEY = 'night-wolf-penalty-overrides';

export type SavedPenalty = {
  id: string;
  text: string;
};

export type PenaltyBank = Record<PenaltySide, SavedPenalty[]>;

function loadBank(): PenaltyBank {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { villager: [], wolf: [] };
    const parsed = JSON.parse(raw) as Partial<PenaltyBank>;
    return {
      villager: Array.isArray(parsed.villager) ? parsed.villager : [],
      wolf: Array.isArray(parsed.wolf) ? parsed.wolf : [],
    };
  } catch {
    return { villager: [], wolf: [] };
  }
}

function saveBank(bank: PenaltyBank) {
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

function loadPresetOverrides(): Record<string, string> {
  try {
    const raw = localStorage.getItem(PRESET_OVERRIDES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, string>;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function savePresetOverrides(overrides: Record<string, string>) {
  localStorage.setItem(PRESET_OVERRIDES_KEY, JSON.stringify(overrides));
}

function buildPresets(side: PenaltySide, deleted: Set<string>): SavedPenalty[] {
  const overrides = loadPresetOverrides();
  return PENALTY_PRESETS[side]
    .map((text, index) => {
      const id = penaltyPresetId(side, index);
      return {
        id,
        text: overrides[id] ?? text,
      };
    })
    .filter((p) => !deleted.has(p.id));
}

export function getPenalties(side: PenaltySide): SavedPenalty[] {
  const deleted = loadDeletedPresets();
  const presets = buildPresets(side, deleted);
  const presetIds = new Set(presets.map((p) => p.id));
  const userItems = loadBank()[side].filter(
    (p) => !p.id.startsWith('penalty-preset-') && !presetIds.has(p.id),
  );
  return [...presets, ...userItems];
}

export function getAllPenalties(): PenaltyBank {
  return {
    villager: getPenalties('villager'),
    wolf: getPenalties('wolf'),
  };
}

export function findPenalty(side: PenaltySide, id: string): SavedPenalty | undefined {
  return getPenalties(side).find((p) => p.id === id);
}

export function addPenalty(side: PenaltySide, text: string): SavedPenalty {
  const bank = loadBank();
  const saved: SavedPenalty = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text: text.trim(),
  };
  bank[side] = [
    saved,
    ...bank[side].filter((p) => !p.id.startsWith('penalty-preset-')),
  ];
  saveBank(bank);
  return saved;
}

export function updatePenalty(side: PenaltySide, id: string, text: string): SavedPenalty {
  const next: SavedPenalty = { id, text: text.trim() };

  if (id.startsWith('penalty-preset-')) {
    const overrides = loadPresetOverrides();
    overrides[id] = next.text;
    savePresetOverrides(overrides);
    return next;
  }

  const bank = loadBank();
  bank[side] = bank[side].map((p) => (p.id === id ? next : p));
  saveBank(bank);
  return next;
}

export function removePenalty(side: PenaltySide, id: string) {
  if (id.startsWith('penalty-preset-')) {
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
  bank[side] = bank[side].filter((p) => p.id !== id);
  saveBank(bank);
}

export function pickRandomPenalty(side: PenaltySide, exclude?: string): string | null {
  const list = getPenalties(side);
  if (list.length === 0) return null;
  const candidates = exclude ? list.filter((p) => p.text !== exclude) : list;
  const pool = candidates.length > 0 ? candidates : list;
  return pool[Math.floor(Math.random() * pool.length)].text;
}
