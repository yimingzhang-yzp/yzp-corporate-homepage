# YZ PARTNERS コーポレートホームページ 開発ルール

## プロジェクト概要

YZ PARTNERS のコーポレートホームページ。シンプル・誠実・プロフェッショナルなデザインを基本方針とする。

## 担当ファイル

| ファイル | 役割 |
|---|---|
| `index.html` | メインHTML構造 |
| `style.css` | スタイル定義 |
| `script.js` | インタラクション・動作 |

## クラス名一覧

| クラス名 | 対応セクション |
|---|---|
| `.navbar` | グローバルナビゲーション |
| `.hero-section` | トップのヒーローエリア |
| `.services-section` | サービス紹介セクション |
| `.about-section` | 会社概要・Aboutセクション |
| `.contact-section` | お問い合わせセクション |

クラス名は上記に統一すること。新たなセクションを追加する場合も `*-section` の命名規則に従う。

## カラーパレット

| 変数名 | 値 | 用途 |
|---|---|---|
| `--color-main` | `#FFFFFF` | テキスト・見出し（ダーク背景上） |
| `--color-bg` | `#f0ede8` | ページ背景（ベージュ） |
| `--color-bg-light` | `#f0ede8` | セクション背景（`--color-bg` と同値） |
| `--color-accent` | `#155C59` | アクセント（グリーン） |
| `--color-accent-hover` | `#1a7a76` | アクセントhover（少し明るいグリーン） |
| `--color-text` | `#0a0a0f` | 本文テキスト（ほぼ黒） |
| `--color-text-muted` | `#6b6b72` | 補足・リード文など |

その他のデザイントークン：

| 変数名 | 値 | 用途 |
|---|---|---|
| `--radius` | `6px` | カード等の角丸 |
| `--transition` | `0.25s ease` | ホバーアニメーション基準 |
| `--shadow-card` | `0 4px 20px rgba(0,0,0,0.07)` | カード通常時の影 |
| `--shadow-card-hover` | `0 12px 36px rgba(0,0,0,0.13)` | カードhover時の影 |

CSSカスタムプロパティで管理する：

```css
:root {
  --color-main: #FFFFFF;
  --color-bg: #f0ede8;
  --color-bg-light: #f0ede8;
  --color-accent: #155C59;
  --color-accent-hover: #1a7a76;
  --color-text: #0a0a0f;
  --color-text-muted: #6b6b72;
  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.07);
  --shadow-card-hover: 0 12px 36px rgba(0, 0, 0, 0.13);
  --radius: 6px;
  --transition: 0.25s ease;
}
```

### ナビゲーションバー

背景は黒（半透明）。リンク文字色は白系。

```css
.navbar {
  background-color: rgba(0, 0, 0, 0.92); /* 黒・半透明 */
}
.navbar__list li a {
  color: rgba(255, 255, 255, 0.85);
}
```

## フォント

Google Fonts の日本語対応フォントを使用する。

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
```

```css
body {
  font-family: 'Noto Sans JP', sans-serif;
}
```

- 本文：`font-weight: 400`
- 見出し・強調：`font-weight: 700`
- サブ見出し：`font-weight: 500`

## レスポンシブ対応

ブレークポイント：**768px**

```css
/* モバイルファーストで記述する */
/* デスクトップ向け上書き */
@media (min-width: 768px) {
  ...
}
```

- 基本はモバイルファーストで記述する
- 768px 以上をデスクトップレイアウトとして扱う

## コーディング規約

- インデント：スペース2つ
- CSSはセクション単位でコメント区切りを入れる（例：`/* === NAVBAR === */`）
- JavaScriptは `DOMContentLoaded` イベント内にまとめる
- 外部ライブラリは原則使用しない（Google Fontsは除く）
