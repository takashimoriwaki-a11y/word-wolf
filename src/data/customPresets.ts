import type { Category, TopicPair } from '../types';

/** ユーザー指定＋同系統の提案（オリジナルお題のプリセット） */
export const CUSTOM_PRESETS: Record<Category, TopicPair[]> = {
  general: [
    { majority: 'ラーメン', minority: 'うどん' },
    { majority: '焼肉', minority: '焼き鳥' },
    { majority: '犬', minority: '猫' },
    { majority: '温泉', minority: 'サウナ' },
    { majority: 'オセロ', minority: '将棋' },
    { majority: '国語', minority: '英語' },
    { majority: 'アメリカ', minority: 'イギリス' },
    { majority: 'キャバクラ', minority: 'コンカフェ' },
    { majority: '寿司', minority: '刺身' },
    { majority: 'ビール', minority: 'ハイボール' },
    { majority: '麻雀', minority: 'ポーカー' },
    { majority: '数学', minority: '理科' },
    { majority: '日本', minority: '韓国' },
    { majority: 'クラブ', minority: 'バー' },
    { majority: 'ホストクラブ', minority: 'ガールズバー' },
    { majority: 'サッカー', minority: '野球' },
    { majority: '夏祭り', minority: '花火大会' },
    { majority: 'タクシー', minority: '電車' },
    { majority: 'youtube', minority: 'Netflix' },
  ],
  romance: [
    { majority: '両思い', minority: '片思い' },
    { majority: '腕組み', minority: '手つなぎ' },
    { majority: '嫉妬', minority: 'DV' },
    { majority: '束縛', minority: '自由恋愛' },
    { majority: '溺愛', minority: '塩対応' },
    { majority: '同棲', minority: '遠距離' },
    { majority: '告白', minority: '脈ありアピール' },
    { majority: 'キス', minority: 'ハグ' },
    { majority: 'セフレ', minority: '本命' },
  ],
  ecchi: [
    { majority: '早漏', minority: '中折れ' },
    { majority: '顔射', minority: '口内発射' },
    { majority: '生挿入', minority: 'アナルセックス' },
    { majority: '実家でセックス', minority: '友達の前でセックス' },
    { majority: 'フェラ', minority: 'ディープキス' },
    { majority: '乳首舐め', minority: '首舐め' },
    { majority: '正常位', minority: '後背位（バック）' },
    { majority: '騎乗位', minority: '立ちバック' },
    { majority: '手コキ', minority: '足コキ' },
    { majority: 'クンニ', minority: '乳首攻め' },
    { majority: '中出し', minority: '口内発射' },
    { majority: '複数プレイ', minority: 'SMプレイ' },
    { majority: '風呂でセックス', minority: '車でセックス' },
    { majority: '目隠し', minority: '拘束' },
    { majority: '声我慢', minority: '発射我慢' },
    { majority: '朝プレイ', minority: '出会ってすぐプレイ' },
  ],
};

export function presetId(category: Category, index: number): string {
  return `preset-${category}-${index}`;
}
