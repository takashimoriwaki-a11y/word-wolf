export type Category = 'general' | 'romance' | 'ecchi';

export type Screen =
  | 'top'
  | 'settings'
  | 'names'
  | 'category'
  | 'customTopicCategory'
  | 'customTopicEditor'
  | 'customTopicList'
  | 'customTopicEdit'
  | 'confirm'
  | 'reveal'
  | 'ready'
  | 'talk'
  | 'vote'
  | 'result'
  | 'penalty'
  | 'penaltySide'
  | 'penaltyCreate'
  | 'penaltyList'
  | 'penaltyEdit'
  | 'dataSync'
  | 'howto';

export type TopicPair = {
  majority: string;
  minority: string;
};

export type Player = {
  id: number;
  name: string;
  isWolf: boolean;
  word: string;
};

export type GameSettings = {
  playerCount: number;
  wolfCount: number;
  talkMinutes: number;
};

export type GameState = {
  screen: Screen;
  settings: GameSettings;
  players: Player[];
  category: Category | null;
  topic: TopicPair | null;
  currentPlayerIndex: number;
  remainingSeconds: number;
  generating: boolean;
  error: string | null;
};
