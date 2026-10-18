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

/** 初期プリセット（ユーザー編集内容を反映済み） */
export const PENALTY_PRESETS: Record<PenaltySide, string[]> = {
  villager: [
    'ウルフが指名した村人が一気飲み',
    'ウルフに指名された村人は、この中で気になる人をウルフにこっそり伝える',
    'ウルフに指名された村人が特技を1つ披露する',
    '村人全員で、正直に自分の性癖を言う',
    'ウルフが指名した2人の村人は腕組みして乾杯',
    'ウルフが指名した村人は、ウルフの指示に1つ従う',
    '村人全員でウルフの良いところを耳元で1つ囁く',
    'ウルフが指名した村人は、村人の左に座っている人と次のゲーム中手をつなぐ',
    'ウルフに指名された村人は、右隣の人と次のゲーム中腕組みする',
    'ウルフはこの中から1人選んで遊びに行く約束をして',
  ],
  wolf: [
    'ウルフは指名されたドリンクを飲み干す',
    'ウルフは特技を披露する',
    'ウルフは「実は…」から始まる本音を1つ言う',
    'ウルフは好きな体位を村人全員に伝える',
    'ウルフは最近いつエッチしたかを村人に伝える',
    'ウルフは村人代表からNGなしの質問に答える',
    'ウルフは次のラウンド中、語尾に『にゃん』をつける',
    'ウルフは村人の中で気になる人を村人1人にこっそり伝える',
    '【ウルフはこの罰ゲームの内容を村人に伝えてはいけない！】※【】の中だけ村人に伝えていい。罰ゲーム→ウルフは気になる村人に耳元で「好き」と伝えこの画面を見せる。',
  ],
};

export function penaltyPresetId(side: PenaltySide, index: number): string {
  return `penalty-preset-${side}-${index}`;
}
