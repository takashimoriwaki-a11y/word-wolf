import { NumberStepper } from '../components/NumberStepper';
import { Shell } from '../components/Shell';
import { clampSettings } from '../lib/game';
import type { GameSettings } from '../types';

type Props = {
  settings: GameSettings;
  onChange: (settings: GameSettings) => void;
  onNext: () => void;
  onHowto: () => void;
  onHome: () => void;
};

export function SettingsScreen({ settings, onChange, onNext, onHowto, onHome }: Props) {
  const maxWolves = Math.max(1, Math.floor(settings.playerCount / 2));

  const update = (partial: Partial<GameSettings>) => {
    onChange(clampSettings({ ...settings, ...partial }));
  };

  return (
    <Shell>
      <div className="card settings-card">
        <NumberStepper
          label="プレイヤーの人数は？"
          value={settings.playerCount}
          unit="人"
          min={3}
          max={12}
          onChange={(playerCount) => update({ playerCount })}
        />
        <NumberStepper
          label="ウルフの人数は？"
          value={Math.min(settings.wolfCount, maxWolves)}
          unit="人"
          min={1}
          max={maxWolves}
          onChange={(wolfCount) => update({ wolfCount })}
        />
        <NumberStepper
          label="トークタイム？"
          value={settings.talkMinutes}
          unit="分"
          min={1}
          max={10}
          onChange={(talkMinutes) => update({ talkMinutes })}
        />
      </div>

      <div className="btn-stack">
        <button type="button" className="btn btn-primary" onClick={onNext}>
          次へ
        </button>
        <button type="button" className="btn btn-ghost" onClick={onHowto}>
          遊び方を見る
        </button>
        <button type="button" className="btn btn-ghost" onClick={onHome}>
          ホーム画面へ戻る
        </button>
      </div>
    </Shell>
  );
}
