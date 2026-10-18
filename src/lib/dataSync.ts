const KEYS = [
  'night-wolf-custom-topics',
  'night-wolf-deleted-presets',
  'night-wolf-preset-overrides',
  'night-wolf-custom-penalties',
  'night-wolf-deleted-penalties',
  'night-wolf-penalty-overrides',
] as const;

export type AppBackup = {
  version: 1;
  exportedAt: string;
  data: Record<string, string>;
};

export function exportAppData(): AppBackup {
  const data: Record<string, string> = {};
  for (const key of KEYS) {
    const value = localStorage.getItem(key);
    if (value != null) data[key] = value;
  }
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    data,
  };
}

export function exportAppDataText(): string {
  return JSON.stringify(exportAppData());
}

export function importAppData(raw: string): { ok: true } | { ok: false; error: string } {
  try {
    const parsed = JSON.parse(raw) as AppBackup;
    if (!parsed || parsed.version !== 1 || typeof parsed.data !== 'object') {
      return { ok: false, error: 'データ形式が正しくありません' };
    }

    for (const key of KEYS) {
      localStorage.removeItem(key);
    }

    for (const [key, value] of Object.entries(parsed.data)) {
      if ((KEYS as readonly string[]).includes(key) && typeof value === 'string') {
        localStorage.setItem(key, value);
      }
    }

    return { ok: true };
  } catch {
    return { ok: false, error: '読み込みに失敗しました。コピー内容を確認してください。' };
  }
}
