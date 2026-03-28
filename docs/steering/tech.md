# Tech

updated: 2026-03-28

---

## 技術スタック

### Frontend

| 技術 | バージョン | 選定理由 | 関連ADR |
| --- | --- | --- | --- |
| Vite | 6.x | 高速なビルド・HMR。SPA開発に最適 | ADR-0002 |
| React | 19.x | 豊富なエコシステム。カードレンダリングライブラリとの親和性 | ADR-0002 |
| TypeScript | 5.x | 型安全性の確保 | - |
| Tailwind CSS | 4.x | デザイントークンとの親和性。高速なUI開発 | - |
| Zustand | 5.x | 軽量な状態管理。localStorage永続化ミドルウェア対応 | ADR-0003 |
| React Router | 7.x | 最小限のページルーティング | - |
| html-to-image | latest | カードのPNG画像エクスポート。WYSIWYG忠実度が高い | - |
| Lucide React | latest | クリーン・モダンなアイコンセット | - |

### Backend

| 技術 | バージョン | 選定理由 | 関連ADR |
| --- | --- | --- | --- |
| なし | - | MVP制約: クライアントサイドSPAのみ。バックエンド不要 | ADR-0003 |

### DB / ストレージ

| 技術 | バージョン | 選定理由 | 関連ADR |
| --- | --- | --- | --- |
| localStorage | (ブラウザAPI) | 認証不要・サーバー不要の制約下で最もシンプルな永続化手段 | ADR-0003 |

### Infra / Platform

| 技術 | バージョン | 選定理由 | 関連ADR |
| --- | --- | --- | --- |
| Cloudflare Pages | - | 無料枠が充実。グローバルCDN。静的SPAホスティングに最適 | - |

### 開発ツール

| 技術 | バージョン | 選定理由 |
| --- | --- | --- |
| pnpm | 9.x | 高速・ディスク効率の良いパッケージマネージャー |
| Biome | 2.x | lint + format を一括で担う。ESLint + Prettier の代替 |

---

## 禁止事項・制約

- secrets をコミットしない（`.env` はリポジトリに含めない）
- `main` への force-push 禁止
- MVPフェーズではユーザー認証を導入しない
- サーバーサイドの状態管理を持ち込まない（クライアントサイド完結）
- `any` 型の使用を避ける（TypeScript strict mode）

---

## CI/CD構成

| ステージ | 内容 | ツール |
| --- | --- | --- |
| lint | コード品質・フォーマットチェック | Biome |
| type-check | 型チェック | tsc --noEmit |
| build | 本番ビルド | Vite |
| deploy | 静的サイトデプロイ | Cloudflare Pages |
