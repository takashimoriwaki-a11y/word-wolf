import { Shell } from '../components/Shell';
import { CATEGORY_META } from '../data/topics';
import type { Category, Player } from '../types';

type Props = {
  category: Category;
  players: Player[];
  onPenalty: () => void;
};

export function ResultScreen({ category, players, onPenalty }: Props) {
  const meta = CATEGORY_META[category];

  return (
    <Shell>
      <p className="screen-heading">結果発表</p>

      <div className="card result-card">
        {players.map((p) => (
          <div key={p.id} className="result-row">
            <span className="result-name">{p.name}</span>
            <span className={`result-role ${p.isWolf ? 'is-wolf' : ''}`}>
              {p.isWolf ? 'ウルフ' : meta.villagerName}
            </span>
            <span className="result-word">{p.word}</span>
          </div>
        ))}
      </div>

      <div className="btn-stack">
        <button type="button" className="btn btn-primary" onClick={onPenalty}>
          罰ゲーム
        </button>
      </div>
    </Shell>
  );
}
