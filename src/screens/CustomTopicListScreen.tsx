import { Shell } from '../components/Shell';
import { CATEGORY_META } from '../data/topics';
import type { SavedTopic } from '../lib/customTopics';
import type { Category } from '../types';

type Props = {
  topicsByCategory: Record<Category, SavedTopic[]>;
  onEdit: (category: Category, id: string) => void;
  onRemove: (category: Category, id: string) => void;
  onCreate: () => void;
  onHome: () => void;
};

const ORDER: Category[] = ['general', 'romance', 'ecchi'];

export function CustomTopicListScreen({
  topicsByCategory,
  onEdit,
  onRemove,
  onCreate,
  onHome,
}: Props) {
  const total = ORDER.reduce((sum, key) => sum + topicsByCategory[key].length, 0);

  return (
    <Shell>
      <p className="screen-heading">オリジナルお題一覧</p>
      <p className="screen-sub">
        {total > 0 ? `全${total}件登録中` : 'まだお題がありません'}
      </p>

      <div className="topic-browse">
        {ORDER.map((key) => {
          const meta = CATEGORY_META[key];
          const topics = topicsByCategory[key];
          return (
            <div key={key} className="card topic-browse-section">
              <p className="topic-browse-label">
                {meta.label}
                <span className="topic-browse-count">{topics.length}件</span>
              </p>
              {topics.length === 0 ? (
                <p className="topic-browse-empty">お題なし</p>
              ) : (
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
                          onClick={() => onEdit(key, t.id)}
                        >
                          編集
                        </button>
                        <button
                          type="button"
                          className="topic-delete"
                          onClick={() => onRemove(key, t.id)}
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
          お題を追加作成
        </button>
        <button type="button" className="btn btn-ghost" onClick={onHome}>
          ホーム画面へ戻る
        </button>
      </div>
    </Shell>
  );
}
