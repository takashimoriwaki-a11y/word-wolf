import { Shell } from '../components/Shell';
import type { Player } from '../types';

type Props = {
  player: Player;
  onGotIt: () => void;
};

export function RevealScreen({ player, onGotIt }: Props) {
  return (
    <Shell>
      <div className="center-block">
        <p className="reveal-label">{player.name} さんのお題は…</p>
        <p className="reveal-word">{player.word}</p>
        <p className="reveal-tail">です。</p>

        <button type="button" className="btn btn-primary" onClick={onGotIt}>
          わかった
        </button>
      </div>
    </Shell>
  );
}
