import { useState } from 'react';
import { Shell } from '../components/Shell';
import type { PenaltySide } from '../data/penalties';
import { pickRandomPenalty } from '../lib/customPenalties';
import type { Player } from '../types';

type Props = {
  players: Player[];
  onNextTopic: () => void;
  onChangeCategory: () => void;
  onHome: () => void;
};

type Step = 'choose' | 'gate' | 'reveal' | 'done';

export function PenaltyScreen({
  players,
  onNextTopic,
  onChangeCategory,
  onHome,
}: Props) {
  const [step, setStep] = useState<Step>('choose');
  const [side, setSide] = useState<PenaltySide | null>(null);
  const [penalty, setPenalty] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const wolves = players.filter((p) => p.isWolf);
  const wolfNames = wolves.map((p) => p.name).join('・');

  const startSide = (next: PenaltySide) => {
    const picked = pickRandomPenalty(next);
    if (!picked) {
      setError('この罰ゲームがまだ登録されていません。ホームから作成してください。');
      return;
    }
    setError(null);
    setSide(next);
    setPenalty(picked);
    setStep('gate');
  };

  const reroll = () => {
    if (!side) return;
    const picked = pickRandomPenalty(side, penalty ?? undefined);
    if (picked) setPenalty(picked);
  };

  const resetChoice = () => {
    setSide(null);
    setPenalty(null);
    setError(null);
    setStep('choose');
  };

  return (
    <Shell>
      {step === 'choose' && (
        <>
          <p className="screen-heading">罰ゲーム</p>
          <p className="screen-sub">どちらが負けましたか？</p>
          {error && <p className="error-text">{error}</p>}
          <div className="btn-stack">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => startSide('villager')}
            >
              村人が負けた場合
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => startSide('wolf')}
            >
              ウルフが負けた場合
            </button>
          </div>
        </>
      )}

      {step === 'gate' && (
        <div className="center-block">
          <h2 className="confirm-question">
            ウルフの方だけ
            <br />
            見てください
          </h2>
          <p className="confirm-hint">
            {wolfNames
              ? `ウルフは ${wolfNames} さんです。`
              : 'ウルフの方に端末を渡してください。'}
            <br />
            他の方に見せないように「はい」を押してください。
          </p>
          <p className="screen-sub">あなたはウルフですか？</p>
          <div className="btn-stack">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setStep('reveal')}
            >
              はい
            </button>
            <button type="button" className="btn btn-ghost btn-compact" onClick={resetChoice}>
              戻る
            </button>
          </div>
        </div>
      )}

      {step === 'reveal' && side && penalty && (
        <>
          <p className="screen-heading">ウルフ専用</p>
          <p className="screen-sub">この内容をみんなに発表してください</p>
          <div className={`penalty-spotlight ${side === 'wolf' ? 'is-wolf' : 'is-villager'}`}>
            <p className="penalty-badge">
              {side === 'villager' ? '村人負け' : 'ウルフ負け'}
            </p>
            <p className="penalty-kicker">発表する罰ゲーム</p>
            <p key={penalty} className="penalty-text">
              {penalty}
            </p>
          </div>
          <div className="btn-stack">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setStep('done')}
            >
              発表した
            </button>
            <button type="button" className="btn btn-ghost btn-compact" onClick={reroll}>
              別の罰ゲームにする
            </button>
            <button type="button" className="btn btn-ghost btn-compact" onClick={resetChoice}>
              勝ち負けを選び直す
            </button>
          </div>
        </>
      )}

      {step === 'done' && (
        <>
          <p className="screen-heading">罰ゲーム終了</p>
          <p className="screen-sub">発表おつかれさま！次はどうする？</p>
          <div className="btn-stack">
            <button type="button" className="btn btn-primary" onClick={onNextTopic}>
              次のお題でプレイ
            </button>
            <button type="button" className="btn btn-ghost" onClick={onChangeCategory}>
              カテゴリを変更
            </button>
            <button type="button" className="btn btn-ghost" onClick={onHome}>
              ホーム画面へ戻る
            </button>
          </div>
        </>
      )}
    </Shell>
  );
}
