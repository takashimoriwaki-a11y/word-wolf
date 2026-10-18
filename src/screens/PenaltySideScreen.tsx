import { Shell } from '../components/Shell';
import { PENALTY_SIDE_META, type PenaltySide } from '../data/penalties';

type Props = {
  onSelect: (side: PenaltySide) => void;
  onHome: () => void;
};

const ORDER: PenaltySide[] = ['villager', 'wolf'];

export function PenaltySideScreen({ onSelect, onHome }: Props) {
  return (
    <Shell>
      <p className="screen-heading">罰ゲームを作成</p>
      <p className="screen-sub">どちらの罰ゲームを作りますか？</p>

      <div className="category-list">
        {ORDER.map((side, i) => {
          const meta = PENALTY_SIDE_META[side];
          return (
            <button
              key={side}
              type="button"
              className="category-card"
              onClick={() => onSelect(side)}
            >
              <span className="category-step">{i + 1}</span>
              <span className="category-body">
                <span className="category-label">{meta.shortLabel}</span>
                <span className="category-desc">{meta.description}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="btn-stack">
        <button type="button" className="btn btn-ghost" onClick={onHome}>
          ホーム画面へ戻る
        </button>
      </div>
    </Shell>
  );
}
