import { useEffect } from 'react';
import { Shell } from '../components/Shell';
import { formatTime } from '../lib/game';

type Props = {
  remainingSeconds: number;
  totalSeconds: number;
  onTick: () => void;
  onForceEnd: () => void;
};

export function TalkScreen({ remainingSeconds, totalSeconds, onTick, onForceEnd }: Props) {
  useEffect(() => {
    const id = window.setInterval(onTick, 1000);
    return () => window.clearInterval(id);
  }, [onTick]);

  const ratio = totalSeconds > 0 ? remainingSeconds / totalSeconds : 0;

  return (
    <Shell>
      <div className="center-block talk-block">
        <h2 className="talk-title">トークタイム</h2>
        <p className="talk-hint">お題についてみんなで話してください。</p>

        <p className="timer-label">残りトーク時間</p>
        <div
          className="timer-ring"
          style={{ ['--ratio' as string]: String(ratio) }}
        >
          <span className="timer-digits">{formatTime(remainingSeconds)}</span>
        </div>

        <button type="button" className="btn btn-ghost" onClick={onForceEnd}>
          強制終了する
        </button>
      </div>
    </Shell>
  );
}
