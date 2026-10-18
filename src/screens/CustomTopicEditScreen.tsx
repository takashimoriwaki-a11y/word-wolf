import { useState } from 'react';
import { Shell } from '../components/Shell';
import { CATEGORY_META } from '../data/topics';
import type { SavedTopic } from '../lib/customTopics';
import type { Category, TopicPair } from '../types';

type Props = {
  category: Category;
  topic: SavedTopic;
  onSave: (topic: TopicPair) => void;
  onBack: () => void;
};

export function CustomTopicEditScreen({ category, topic, onSave, onBack }: Props) {
  const meta = CATEGORY_META[category];
  const [draft, setDraft] = useState<TopicPair>({
    majority: topic.majority,
    minority: topic.minority,
  });

  const canSave =
    draft.majority.trim() &&
    draft.minority.trim() &&
    draft.majority.trim() !== draft.minority.trim();

  return (
    <Shell>
      <p className="screen-heading">{meta.label}のお題を編集</p>
      <p className="screen-sub">内容を書き換えて保存してください</p>

      <div className="card custom-card">
        <label className="field">
          <span>多数派（村人）のお題</span>
          <input
            className="name-input"
            type="text"
            maxLength={20}
            value={draft.majority}
            onChange={(e) => setDraft({ ...draft, majority: e.target.value })}
          />
        </label>
        <label className="field">
          <span>少数派（ウルフ）のお題</span>
          <input
            className="name-input"
            type="text"
            maxLength={20}
            value={draft.minority}
            onChange={(e) => setDraft({ ...draft, minority: e.target.value })}
          />
        </label>
      </div>

      <div className="btn-stack">
        <button
          type="button"
          className="btn btn-primary"
          disabled={!canSave}
          onClick={() =>
            onSave({
              majority: draft.majority.trim(),
              minority: draft.minority.trim(),
            })
          }
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
