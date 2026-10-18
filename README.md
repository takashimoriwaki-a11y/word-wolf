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

## iPhoneで使う

### 同じWi-Fiで試す場合

```bash
npm run dev
```

ターミナルに出る `Network:` のアドレス（例: `http://192.168.x.x:5173`）を、iPhoneのSafariで開きます。

### ホーム画面に追加（アプリっぽく使う）

1. Safariでアプリを開く
2. 共有ボタン → 「ホーム画面に追加」
3. 追加したアイコンから起動

※ 本格利用時はHTTPSで公開したURLを使うのがおすすめです。

## 公開用ビルド

```bash
npm run build
npm run preview
```
