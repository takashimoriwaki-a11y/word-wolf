import { Shell } from '../components/Shell';
import { CATEGORY_META } from '../data/topics';

type Props = {
  onBack: () => void;
};

export function HowtoScreen({ onBack }: Props) {
  return (
    <Shell>
      <p className="screen-heading">遊び方</p>

      <div className="card howto-card">
        <ol className="howto-list">
          <li>みんなにお題が配られます。ほとんど同じお題ですが、少数の「ウルフ」だけ違うお題です。</li>
          <li>お題についてトーク。自分のお題は直接言わず、会話の違和感からウルフを探します。</li>
          <li>時間切れ後、一斉に指差し投票。最多得票がウルフなら村人の勝ち、違えばウルフの勝ち！</li>
        </ol>

        <div className="howto-flow">
          <p className="howto-flow-title">おすすめの盛り上げ方</p>
          <p>
            <strong>{CATEGORY_META.general.label}</strong>でルールに慣れる
            <br />→ <strong>{CATEGORY_META.romance.label}</strong>で距離を縮める
            <br />→ <strong>{CATEGORY_META.ecchi.label}</strong>で今夜のクライマックス
          </p>
        </div>
      </div>

      <div className="btn-stack">
        <button type="button" className="btn btn-primary" onClick={onBack}>
          戻る
        </button>
      </div>
    </Shell>
  );
}
