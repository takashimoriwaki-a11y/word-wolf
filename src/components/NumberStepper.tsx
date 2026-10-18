type Props = {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

export function NumberStepper({ label, value, unit, min, max, onChange }: Props) {
  return (
    <div className="stepper">
      <span className="stepper-label">{label}</span>
      <div className="stepper-controls">
        <button
          type="button"
          className="stepper-btn"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label="減らす"
        >
          −
        </button>
        <span className="stepper-value">
          {value}
          {unit}
        </span>
        <button
          type="button"
          className="stepper-btn"
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label="増やす"
        >
          ＋
        </button>
      </div>
    </div>
  );
}
