import type { GameSettings, Player, TopicPair } from '../types';

export function createPlayers(
  names: string[],
  settings: GameSettings,
  topic: TopicPair,
): Player[] {
  const indices = names.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  const wolfSet = new Set(indices.slice(0, settings.wolfCount));

  return names.map((name, id) => {
    const isWolf = wolfSet.has(id);
    return {
      id,
      name: name.trim(),
      isWolf,
      word: isWolf ? topic.minority : topic.majority,
    };
  });
}

export function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function clampSettings(settings: GameSettings): GameSettings {
  const playerCount = Math.min(12, Math.max(3, settings.playerCount));
  const maxWolves = Math.max(1, Math.floor(playerCount / 2));
  const wolfCount = Math.min(maxWolves, Math.max(1, settings.wolfCount));
  const talkMinutes = Math.min(10, Math.max(1, settings.talkMinutes));
  return { playerCount, wolfCount, talkMinutes };
}
