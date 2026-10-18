import { useState } from 'react';
import { Shell } from '../components/Shell';
import { PENALTY_SIDE_META, type PenaltySide } from '../data/penalties';
import type { SavedPenalty } from '../lib/customPenalties';

type Props = {
  side: PenaltySide;
  penalty: SavedPenalty;
  onSave: (text: string) => void;
  onBack: () => void;
};

export function PenaltyEditScreen({ side, penalty, onSave, onBack }: Props) {
  const meta = PENALTY_SIDE_META[side];
  const [draft, setDraft] = useState(penalty.text);
  const canSave = draft.trim().length > 0;

  return (
    <Shell>
      <p className="screen-heading">{meta.label}を編集</p>
      <p className="screen-sub">内容を書き換えて保存してください</p>

      <div className="card custom-card">
        <label className="field">
          <span>罰ゲームの内容</span>
          <textarea
            className="penalty-input"
            maxLength={80}
            rows={3}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
        </label>
      </div>

      <div className="btn-stack">
        <button
          type="button"
          className="btn btn-primary"
          disabled={!canSave}
          onClick={() => onSave(draft.trim())}
        >
          保存する
        </button>
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          戻る
        </button>
      </div>
    </Shell>
  );
}
