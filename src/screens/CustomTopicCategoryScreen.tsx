import { Shell } from '../components/Shell';
import { CATEGORY_META } from '../data/topics';
import type { Category } from '../types';

type Props = {
  onSelect: (category: Category) => void;
  onHome: () => void;
};

const ORDER: Category[] = ['general', 'romance', 'ecchi'];

export function CustomTopicCategoryScreen({ onSelect, onHome }: Props) {
  return (
    <Shell>
      <p className="screen-heading">オリジナルお題を作成</p>
      <p className="screen-sub">カテゴリを選んでください</p>

      <div className="category-list">
        {ORDER.map((key, i) => {
          const meta = CATEGORY_META[key];
          return (
            <button
              key={key}
              type="button"
              className="category-card"
              onClick={() => onSelect(key)}
            >
              <span className="category-step">{i + 1}</span>
              <span className="category-body">
                <span className="category-label">{meta.label}</span>
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
