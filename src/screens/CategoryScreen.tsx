import { Shell } from '../components/Shell';
import { CATEGORY_META } from '../data/topics';
import type { Category } from '../types';

type Props = {
  category: Category | null;
  generating: boolean;
  error: string | null;
  onSelectCategory: (category: Category) => void;
  onNext: () => void;
  onBack: () => void;
};

const ORDER: Category[] = ['general', 'romance', 'ecchi'];

export function CategoryScreen({
  category,
  generating,
  error,
  onSelectCategory,
  onNext,
  onBack,
}: Props) {
  return (
    <Shell>
      <p className="screen-heading">カテゴリを選んでください</p>
      <p className="screen-sub">
        まずは一般 → 恋愛 → エッチの順がおすすめ
      </p>

      <div className="category-list">
        {ORDER.map((key, i) => {
          const meta = CATEGORY_META[key];
          const active = category === key;
          return (
            <button
              key={key}
              type="button"
              className={`category-card ${active ? 'is-active' : ''}`}
              onClick={() => onSelectCategory(key)}
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

      {error && <p className="error-text">{error}</p>}

      <div className="btn-stack">
        <button
          type="button"
          className="btn btn-primary"
          disabled={!category || generating}
          onClick={onNext}
        >
          {generating ? 'お題を選んでいます…' : '次へ'}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onBack} disabled={generating}>
          戻る
        </button>
      </div>
    </Shell>
  );
}
