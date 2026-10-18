import type { Category } from '../types';

export const CATEGORY_META: Record<
  Category,
  {
    label: string;
    short: string;
    wolfName: string;
    villagerName: string;
    talkLabel: string;
    description: string;
    tip: string;
  }
> = {
  general: {
    label: '一般',
    short: '一般',
    wolfName: 'ウルフ',
    villagerName: '村人',
    talkLabel: 'トークを開始する',
    description: 'まずはこれでルールに慣れよう',
    tip: 'まずはここからルールに慣れよう',
  },
  romance: {
    label: '恋愛',
    short: '恋愛',
    wolfName: 'ラブウルフ',
    villagerName: '村人',
    talkLabel: '恋愛トークを開始する',
    description: '恋バナでぐっと距離が縮まる',
    tip: '場が温まってきたら恋愛へステップアップ',
  },
  ecchi: {
    label: 'エッチ',
    short: 'エッチ',
    wolfName: 'ウルフ',
    villagerName: '村人',
    talkLabel: 'エッチなトークを開始する',
    description: '今夜いちばん盛り上がるお題',
    tip: 'ノリが乗ってきたら、ここでフィナーレ',
  },
};
