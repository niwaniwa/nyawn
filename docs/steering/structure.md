# Structure

updated: 2026-03-28

---

## ディレクトリ構成

```
/
├── src/
│   ├── components/       # 共通UIコンポーネント
│   ├── templates/        # カードテンプレート定義
│   ├── stores/           # Zustand ストア
│   ├── types/            # TypeScript 型定義
│   ├── utils/            # ユーティリティ関数
│   ├── pages/            # ページコンポーネント
│   ├── App.tsx           # ルートコンポーネント
│   └── main.tsx          # エントリーポイント
├── public/               # 静的アセット（favicon等）
├── docs/                 # ドキュメント（steering/adr/spec/research/guides）
├── scripts/              # 開発・CI用スクリプト
├── index.html            # Vite エントリーHTML
├── vite.config.ts        # Vite 設定
├── tailwind.config.ts    # Tailwind CSS 設定
├── tsconfig.json         # TypeScript 設定
├── biome.json            # Biome lint/format 設定
└── package.json
```

---

## モジュール責務

| パス | 責務 |
| --- | --- |
| `src/components/` | 再利用可能なUIコンポーネント（ボタン、フォーム入力、レイアウト等） |
| `src/templates/` | カードテンプレートの定義。各テンプレートはReactコンポーネントとして実装 |
| `src/stores/` | Zustand によるアプリケーション状態管理（カードデータ、テンプレート選択等） |
| `src/types/` | 共通の型定義（ProfileCard, Template, SocialLink 等） |
| `src/utils/` | ヘルパー関数（画像エクスポート、localStorage操作等） |
| `src/pages/` | ルーティング対象のページコンポーネント（トップ、エディタ） |
| `public/` | 静的アセット（favicon、OGP画像等） |
| `docs/` | プロジェクトドキュメント |
| `scripts/` | 開発補助スクリプト（バリデーション等） |

---

## 命名規則

### ファイル名

- コンポーネント: `kebab-case.tsx`（例: `card-preview.tsx`）
- ストア: `kebab-case.ts`（例: `card-store.ts`）
- 型定義: `kebab-case.ts`（例: `profile-card.ts`）
- ユーティリティ: `kebab-case.ts`（例: `export-image.ts`）

### 変数名・関数名

- `camelCase`（例: `displayName`, `exportAsImage`）

### コンポーネント名

- `PascalCase`（例: `CardPreview`, `TemplateGallery`）

### CSS クラス

- Tailwind CSS ユーティリティクラスを使用。カスタムクラスが必要な場合は `kebab-case`

---

## アーキテクチャパターン

- **SPA（Single Page Application）**: Vite + React によるクライアントサイド完結のSPA
- **コンポーネント駆動**: UIをコンポーネント単位で分割し、再利用性を確保
- **ストア分離**: 状態管理を Zustand ストアに集約し、コンポーネントはプレゼンテーションに集中

---

## モジュール間の依存ルール

- `components/` → `types/`, `stores/`, `utils/` を参照可能
- `templates/` → `types/` のみ参照可能（テンプレートは独立性を保つ）
- `stores/` → `types/`, `utils/` を参照可能。`components/` への依存禁止
- `pages/` → すべてのモジュールを参照可能（組み立て層）
- `types/` → 他モジュールへの依存禁止（純粋な型定義のみ）
- `utils/` → `types/` のみ参照可能
