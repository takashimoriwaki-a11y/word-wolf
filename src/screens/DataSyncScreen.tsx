import { useState } from 'react';
import { Shell } from '../components/Shell';
import { exportAppDataText, importAppData } from '../lib/dataSync';

type Props = {
  onHome: () => void;
};

export function DataSyncScreen({ onHome }: Props) {
  const [draft, setDraft] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    const text = exportAppDataText();
    setDraft(text);
    setError(null);
    try {
      await navigator.clipboard.writeText(text);
      setMessage('データをコピーしました。iPhone側で貼り付けて読み込んでください。');
    } catch {
      setMessage('下の枠の内容をすべて選択してコピーしてください。');
    }
  };

  const handleImport = () => {
    const result = importAppData(draft.trim());
    if (!result.ok) {
      setError(result.error);
      setMessage(null);
      return;
    }
    setError(null);
    setMessage('読み込みました。ホームに戻って罰ゲーム一覧を確認してください。');
  };

  return (
    <Shell>
      <p className="screen-heading">データ引き継ぎ</p>
      <p className="screen-sub">
        お題・罰ゲームの追加／修正は端末ごとに保存されます。
        <br />
        PCで書き出して、iPhoneで読み込んでください。
      </p>

      <div className="card custom-card">
        <label className="field">
          <span>引き継ぎデータ</span>
          <textarea
            className="penalty-input"
            rows={8}
            placeholder="ここにデータを貼り付け"
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              setMessage(null);
              setError(null);
            }}
          />
        </label>
      </div>

      {message && <p className="save-message sync-message">{message}</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="btn-stack">
        <button type="button" className="btn btn-primary" onClick={handleExport}>
          この端末から書き出す
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!draft.trim()}
          onClick={handleImport}
        >
          この端末へ読み込む
        </button>
        <button type="button" className="btn btn-ghost" onClick={onHome}>
          ホーム画面へ戻る
        </button>
      </div>
    </Shell>
  );
}
