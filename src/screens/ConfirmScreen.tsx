import { Shell } from '../components/Shell';
import type { Player } from '../types';

type Props = {
  player: Player;
  onYes: () => void;
};

export function ConfirmScreen({ player, onYes }: Props) {
  return (
    <Shell>
      <div className="center-block">
        <h2 className="confirm-question">
          あなたは <span>{player.name}</span> さん ですか？
        </h2>
        <p className="confirm-hint">
          {player.name}さんだったら、他の方に見せないように「はい」を押してください。
        </p>
        <button type="button" className="btn btn-primary" onClick={onYes}>
          はい
        </button>
      </div>
    </Shell>
  );
}
