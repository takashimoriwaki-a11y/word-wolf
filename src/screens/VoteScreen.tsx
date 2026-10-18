import { Shell } from '../components/Shell';
import { CATEGORY_META } from '../data/topics';
import type { Category } from '../types';

type Props = {
  category: Category;
  onReveal: () => void;
};

export function VoteScreen({ category, onReveal }: Props) {
  const meta = CATEGORY_META[category];

  return (
    <Shell>
      <p className="screen-heading">トーク終了</p>

      <div className="card vote-card">
        <p>
          一斉に指をさして、{meta.wolfName}だと思う人に投票してください。
        </p>
        <p>
          一番票が多かった人が{meta.wolfName}（少数派）なら
          <br />
          <strong>{meta.villagerName}（多数派）の勝ち</strong>です。
        </p>
        <p>
          一番票が多かった人が{meta.villagerName}（多数派）なら
          <br />
          <strong>{meta.wolfName}（少数派）の勝ち</strong>です。
        </p>
      </div>

      <div className="btn-stack">
        <button type="button" className="btn btn-primary" onClick={onReveal}>
          お題の答えを見る
        </button>
      </div>
    </Shell>
  );
}
