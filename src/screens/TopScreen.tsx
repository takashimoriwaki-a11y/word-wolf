import { Shell } from '../components/Shell';

type Props = {
  onStart: () => void;
  onCreateTopics: () => void;
  onViewTopics: () => void;
  onCreatePenalties: () => void;
  onViewPenalties: () => void;
  onDataSync: () => void;
  onHowto: () => void;
};

export function TopScreen({
  onStart,
  onCreateTopics,
  onViewTopics,
  onCreatePenalties,
  onViewPenalties,
  onDataSync,
  onHowto,
}: Props) {
  return (
    <Shell className="screen-top">
      <div className="top-hero">
        <h1 className="top-title">ワードウルフ</h1>
      </div>

      <div className="btn-stack top-btn-stack">
        <button type="button" className="btn btn-primary btn-hero" onClick={onStart}>
          はじめる
        </button>
        <button type="button" className="btn btn-primary btn-compact" onClick={onCreateTopics}>
          オリジナルのお題を作成
        </button>
        <button type="button" className="btn btn-ghost btn-compact" onClick={onViewTopics}>
          オリジナルお題を確認
        </button>
        <button type="button" className="btn btn-primary btn-compact" onClick={onCreatePenalties}>
          罰ゲームを作成
        </button>
        <button type="button" className="btn btn-ghost btn-compact" onClick={onViewPenalties}>
          罰ゲームを確認
        </button>
        <button type="button" className="btn btn-ghost btn-compact" onClick={onDataSync}>
          データ引き継ぎ
        </button>
        <button type="button" className="btn btn-ghost btn-compact" onClick={onHowto}>
          遊び方を見る
        </button>
      </div>
    </Shell>
  );
}
