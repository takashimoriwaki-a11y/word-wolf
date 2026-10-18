import { Shell } from '../components/Shell';
import { CATEGORY_META } from '../data/topics';
import type { Category } from '../types';

type Props = {
  category: Category;
  onStart: () => void;
};

export function ReadyScreen({ category, onStart }: Props) {
  const meta = CATEGORY_META[category];

  return (
    <Shell>
      <div className="center-block">
        <p className="ready-text">全員のお題の確認が終わりました</p>
        <button type="button" className="btn btn-primary" onClick={onStart}>
          {meta.talkLabel}
        </button>
      </div>
    </Shell>
  );
}
