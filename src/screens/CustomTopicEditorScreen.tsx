import { useState } from 'react';
import { Shell } from '../components/Shell';
import { CATEGORY_META } from '../data/topics';
import type { SavedTopic } from '../lib/customTopics';
import type { Category, TopicPair } from '../types';

type Props = {
  category: Category;
  topics: SavedTopic[];
  onAdd: (topic: TopicPair) => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  onBack: () => void;
  onHome: () => void;
};

export function CustomTopicEditorScreen({
  category,
  topics,
  onAdd,
  onEdit,
  onRemove,
  onBack,
  onHome,
}: Props) {
  const meta = CATEGORY_META[category];
  const [draft, setDraft] = useState<TopicPair>({ majority: '', minority: '' });
  const [message, setMessage] = useState<string | null>(null);

  const canAdd =
    draft.majority.trim() &&
    draft.minority.trim() &&
    draft.majority.trim() !== draft.minority.trim();

  const handleAdd = () => {
    if (!canAdd) return;
    onAdd({
      majority: draft.majority.trim(),
      minority: draft.minority.trim(),
    });
    setDraft({ majority: '', minority: '' });
    setMessage('お題を保存しました');
  };

  return (
    <Shell>
      <p className="screen-heading">{meta.label}のお題を作成</p>
      <p className="screen-sub">多数派と少数派（ウルフ）で少し違う言葉にしてね</p>

      <div className="card custom-card">
        <label className="field">
          <span>多数派（村人）のお題</span>
          <input
            className="name-input"
            type="text"
            maxLength={20}
            placeholder="例）ラーメン"
            value={draft.majority}
            onChange={(e) => {
              setMessage(null);
              setDraft({ ...draft, majority: e.target.value });
            }}
          />
        </label>
        <label className="field">
          <span>少数派（ウルフ）のお題</span>
          <input
            className="name-input"
            type="text"
            maxLength={20}
            placeholder="例）うどん"
            value={draft.minority}
            onChange={(e) => {
              setMessage(null);
              setDraft({ ...draft, minority: e.target.value });
            }}
          />
        </label>
        <button
          type="button"
          className="btn btn-primary btn-in-card"
          disabled={!canAdd}
          onClick={handleAdd}
        >
          このお題を保存
        </button>
        {message && <p className="save-message">{message}</p>}
      </div>

      {topics.length > 0 && (
        <div className="card topic-list-card">
          <p className="topic-list-title">保存済みのお題</p>
          <ul className="topic-list">
            {topics.map((t) => (
              <li key={t.id} className="topic-list-item topic-list-item-actions">
                <span className="topic-list-text">
                  {t.majority}
                  <span className="topic-list-vs"> / </span>
                  {t.minority}
                </span>
                <span className="topic-actions">
                  <button
                    type="button"
                    className="topic-edit"
                    onClick={() => onEdit(t.id)}
                  >
                    編集
                  </button>
                  <button
                    type="button"
                    className="topic-delete"
                    onClick={() => onRemove(t.id)}
                    aria-label="削除"
                  >
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
          カテゴリ選択へ戻る
        </button>
        <button type="button" className="btn btn-ghost" onClick={onHome}>
          ホーム画面へ戻る
        </button>
      </div>
    </Shell>
  );
}
