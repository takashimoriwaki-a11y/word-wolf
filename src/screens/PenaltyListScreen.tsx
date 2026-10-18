import { Shell } from '../components/Shell';
import { PENALTY_SIDE_META, type PenaltySide } from '../data/penalties';
import type { SavedPenalty } from '../lib/customPenalties';

type Props = {
  penaltiesBySide: Record<PenaltySide, SavedPenalty[]>;
  onEdit: (side: PenaltySide, id: string) => void;
  onRemove: (side: PenaltySide, id: string) => void;
  onCreate: () => void;
  onHome: () => void;
};

const ORDER: PenaltySide[] = ['villager', 'wolf'];

export function PenaltyListScreen({
  penaltiesBySide,
  onEdit,
  onRemove,
  onCreate,
  onHome,
}: Props) {
  const total = ORDER.reduce((sum, key) => sum + penaltiesBySide[key].length, 0);

  return (
    <Shell>
      <p className="screen-heading">罰ゲーム一覧</p>
      <p className="screen-sub">
        {total > 0 ? `全${total}件登録中` : 'まだ罰ゲームがありません'}
      </p>

      <div className="topic-browse">
        {ORDER.map((side) => {
          const meta = PENALTY_SIDE_META[side];
          const items = penaltiesBySide[side];
          return (
            <div key={side} className="card topic-browse-section">
              <p className="topic-browse-label">
                {meta.shortLabel}
                <span className="topic-browse-count">{items.length}件</span>
              </p>
              {items.length === 0 ? (
                <p className="topic-browse-empty">罰ゲームなし</p>
              ) : (
                <ul className="topic-list">
                  {items.map((p) => (
                    <li key={p.id} className="topic-list-item topic-list-item-actions">
                      <span className="topic-list-text">{p.text}</span>
                      <span className="topic-actions">
                        <button
                          type="button"
                          className="topic-edit"
                          onClick={() => onEdit(side, p.id)}
                        >
                          編集
                        </button>
                        <button
                          type="button"
                          className="topic-delete"
                          onClick={() => onRemove(side, p.id)}
                        >
                          削除
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      <div className="btn-stack">
        <button type="button" className="btn btn-primary" onClick={onCreate}>
          罰ゲームを追加作成
        </button>
        <button type="button" className="btn btn-ghost" onClick={onHome}>
          ホーム画面へ戻る
        </button>
      </div>
    </Shell>
  );
}
