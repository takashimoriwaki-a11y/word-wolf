# ワードウルフ

パーティー向けワードウルフのウェブアプリです。iPhoneのSafariからも使えます。

## 特徴

- **カテゴリ**: 一般 → 恋愛 → エッチ
- **お題**: オリジナルお題（作成・編集・ランダム出題）
- **罰ゲーム**: ウルフだけが確認して発表
- **iPhone対応**: ホーム画面追加できるPWA

## 始め方（PC）

```bash
npm install
npm run dev
```

表示された URL（例: `http://localhost:5173`）を開きます。

## iPhoneで使う（GitHub Pages）

公開URL:

https://takashimoriwaki-a11y.github.io/word-wolf/

1. Safariで上記URLを開く
2. 共有 → **ホーム画面に追加**
3. 追加したアイコンから起動

## ローカル確認

```bash
npm install
npm run dev
```

## GitHubへ公開する手順

1. このリポジトリを GitHub の `word-wolf` に push
2. リポジトリの **Settings → Pages → Source** を **GitHub Actions** に設定
3. `main` への push で自動デプロイされます
