import { Shell } from '../components/Shell';

type Props = {
  names: string[];
  onChange: (names: string[]) => void;
  onNext: () => void;
  onBack: () => void;
  canNext: boolean;
};

export function NamesScreen({ names, onChange, onNext, onBack, canNext }: Props) {
  const setName = (index: number, value: string) => {
    const next = [...names];
    next[index] = value;
    onChange(next);
  };

  return (
    <Shell>
      <p className="screen-heading">プレイヤー名を入力してください。</p>

      <div className="card names-card">
        {names.map((name, i) => (
          <input
            key={i}
            className="name-input"
            type="text"
            maxLength={10}
            placeholder="プレイヤー名を入力"
            value={name}
            onChange={(e) => setName(i, e.target.value)}
          />
        ))}
      </div>

      <div className="btn-stack">
        <button type="button" className="btn btn-primary" onClick={onNext} disabled={!canNext}>
          次へ
        </button>
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          戻る
        </button>
      </div>
    </Shell>
  );
}
