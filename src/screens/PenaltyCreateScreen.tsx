import { useState } from 'react';
import { Shell } from '../components/Shell';
import { PENALTY_SIDE_META, type PenaltySide } from '../data/penalties';
import type { SavedPenalty } from '../lib/customPenalties';

type Props = {
  side: PenaltySide;
  penalties: SavedPenalty[];
  onAdd: (text: string) => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  onBack: () => void;
  onHome: () => void;
};

export function PenaltyCreateScreen({
  side,
  penalties,
  onAdd,
  onEdit,
  onRemove,
  onBack,
  onHome,
}: Props) {
  const meta = PENALTY_SIDE_META[side];
  const [draft, setDraft] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const canAdd = draft.trim().length > 0;

  const handleAdd = () => {
    if (!canAdd) return;
    onAdd(draft.trim());
    setDraft('');
    setMessage('罰ゲームを保存しました');
  };

  return (
    <Shell>
      <p className="screen-heading">{meta.label}を作成</p>
      <p className="screen-sub">内容を入力して保存してください</p>

      <div className="card custom-card">
        <label className="field">
          <span>罰ゲームの内容</span>
          <textarea
            className="penalty-input"
            maxLength={80}
            rows={3}
            placeholder="例）負けた人は一気飲み！"
            value={draft}
            onChange={(e) => {
              setMessage(null);
              setDraft(e.target.value);
            }}
          />
        </label>
        <button
          type="button"
          className="btn btn-primary btn-in-card"
          disabled={!canAdd}
          onClick={handleAdd}
        >
          この罰ゲームを保存
        </button>
        {message && <p className="save-message">{message}</p>}
      </div>

      {penalties.length > 0 && (
        <div className="card topic-list-card">
          <p className="topic-list-title">保存済みの罰ゲーム</p>
          <ul className="topic-list">
            {penalties.map((p) => (
              <li key={p.id} className="topic-list-item topic-list-item-actions">
                <span className="topic-list-text">{p.text}</span>
                <span className="topic-actions">
                  <button type="button" className="topic-edit" onClick={() => onEdit(p.id)}>
                    編集
                  </button>
                  <button type="button" className="topic-delete" onClick={() => onRemove(p.id)}>
                    削除
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="btn-stack">
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          戻る
        </button>
        <button type="button" className="btn btn-ghost" onClick={onHome}>
          ホーム画面へ戻る
        </button>
      </div>
    </Shell>
  );
}
