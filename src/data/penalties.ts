export type PenaltySide = 'villager' | 'wolf';

export const PENALTY_SIDE_META: Record<
  PenaltySide,
  { label: string; shortLabel: string; description: string }
> = {
  villager: {
    label: '村人負けの罰ゲーム',
    shortLabel: '村人',
    description: '村人が負けたときに使う罰',
  },
  wolf: {
    label: 'ウルフ負けの罰ゲーム',
    shortLabel: 'ウルフ',
    description: 'ウルフが負けたときに使う罰',
  },
};

/** 初期プリセット */
export const PENALTY_PRESETS: Record<PenaltySide, string[]> = {
  villager: [
    '村人負けた全員で、せーので一気飲み！',
    '村人の中で一番怪しかった人を指名して、その人が飲む',
    '村人全員で、好きな人（または推し）を発表する',
    '村人代表がモノマネを1つ披露する',
    '村人全員で、正直に「今夜いちばんドキドキしたこと」を言う',
    '間違って疑われた人が、好きな人に一言メッセージを送る（実況OK）',
    '村人全員で、隣の人と腕組みして乾杯',
  ],
  wolf: [
    'ウルフは指名されたドリンクを飲み干す',
    'ウルフは一発ギャグ（またはモノマネ）を披露する',
    'ウルフは「実は…」から始まる本音を1つ言う',
    'ウルフは好きな仕草・ポーズを1つやって見せる',
    'ウルフは他のプレイヤーにマッサージを30秒',
    'ウルフは今ラウンドの反省を一言で発表する',
    'ウルフは次のラウンド、最初に自己紹介トークを30秒やる',
  ],
};

export function penaltyPresetId(side: PenaltySide, index: number): string {
  return `penalty-preset-${side}-${index}`;
}
