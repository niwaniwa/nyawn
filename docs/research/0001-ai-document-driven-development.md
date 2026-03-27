---
id: "0001"
title: "ドキュメント駆動 × AI開発フロー 他プロジェクト事例調査"
status: accepted
created: 2026-03-16
updated: 2026-03-16
research_type: competitor-analysis
---

# ドキュメント駆動 × AI開発フロー 他プロジェクト事例調査

## 目的

このリポジトリで整備した「ドキュメントライフサイクル管理（wip/accepted/archive）× AI開発フロー」が、
他のプロジェクト・ツール・業界トレンドと比較してどのような位置づけにあるかを明らかにする。
特に「プロセス・フロー」と「具体的なツール・構成」の観点から調査する。

---

## 業界の潮流：仕様駆動開発（SDD）とは

2025年以降、AI開発ツールの台頭に伴い **Spec-Driven Development（仕様駆動開発 / SDD）** が急速に普及している。
SDDは「仕様を実装の唯一の真実の源（Single Source of Truth）として扱い、AIがその仕様に基づいてコードを生成する」手法。

Thoughtworksは2025年のKey Engineering Practiceとして位置づけ、<a href="https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html" target="_blank">Martin Fowler公式ブログ</a>でも詳細分析が掲載されている。

### SDDの3段階モデル

<a href="https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html" target="_blank">Martin Fowlerの分類</a>によると、SDDには成熟度の異なる3段階がある。

| レベル | 名称 | 説明 |
| --- | --- | --- |
| 1 | **Spec-first** | 仕様を先に作り、実装後に削除する |
| 2 | **Spec-anchored** | 仕様を保持・更新し続ける（ライブドキュメント） |
| 3 | **Spec-as-source** | 仕様が主要成果物、コードは生成物 |

現在の主要ツールはほぼレベル1（spec-first）にとどまっており、
**このリポジトリのライフサイクル管理（wip→accepted→archive）はレベル2（spec-anchored）に相当する**。

---

## 主要ツール・プロジェクトの事例

### 1. toutou式：要求整理からリリースまでの統合フロー

<a href="https://www.docswell.com/s/toutou/KPR86L-2026-03-14-111926" target="_blank">Claude Codeで回す小規模プロダクト開発（2026年）</a>

**最も本リポジトリに近い事例。**Claude Codeを使った小規模プロダクト開発の包括的なフロー。

#### ドキュメント構成

3種類のADRを段階ごとに管理：

| フェーズ | ドキュメント | 問い |
| --- | --- | --- |
| 要求整理 | `business` ADR | なぜ作るか |
| 仕様策定 | `spec` ADR | 何を作るか |
| 設計 | `archi` ADR | どう作るか |

ライフサイクルは **wip → accepted → archive** の3段階。
**AIは`accepted`ステータスのドキュメントのみ参照するルール**が明示されている。

#### デザイントークン

本リポジトリと同じ3階層構造：

- **Primitive層**: 生の値（`yellow-500: #EAB308`）
- **Semantic層**: 意味命名（`accent-primary: yellow-500`）
- **Component層**: UI紐づけ（`button-bg: accent-primary`）

Claude Codeには「Semantic・Componentのみを使って実装する」と指示。

#### フィードバックループ

| 対象 | 手法 |
| --- | --- |
| Web | Playwright MCP でブラウザ操作・E2Eテスト |
| Unity | Unity MCP でコンパイルログ取得・自動修正 |
| 全般 | GitHub Actions CI → ログ取得 → 自動修正 |

#### レビュー半自動化

- 過去指摘パターンから「レビュー指針」ドキュメントを作成
- GitHub ActionsでPR自動レビュー実行
- Critical/Major → `/fix-review`で修正、Minor → 任意

---

### 2. Amazon Kiro：仕様書駆動開発のAI IDE

<a href="https://zenn.dev/gotalab/articles/3db0621ce3d6d2" target="_blank">Kiroの仕様書駆動開発プロセスをClaude Codeで徹底的に再現した</a>

2025年7月にAWSが発表した AI IDE。仕様駆動開発を組み込みのワークフローとして提供。

#### ディレクトリ構成

```text
プロジェクトルート/
├── .kiro/
│   ├── steering/              # 永続的なプロジェクト知識（Steeringドキュメント）
│   │   ├── product.md         # プロダクト概要
│   │   ├── tech.md            # 技術スタック
│   │   └── structure.md       # プロジェクト構成
│   └── specs/
│       └── {feature-name}/    # 機能ごとのサブディレクトリ
│           ├── requirements.md
│           ├── design.md
│           └── tasks.md
└── CLAUDE.md
```

#### ワークフロー

1. `/steering-init` でステアリング文書生成
2. `/spec-init "機能説明"` で仕様開始
3. `requirements.md` → `design.md` → `tasks.md` の順で生成・承認
4. 各ステップで**人間の承認ゲート**
5. タスク完了後、仕様は削除（Spec-first）

#### 特徴・課題

- `steering/` はCLAUDE.mdに相当する永続的なプロジェクト知識
- 機能単位でディレクトリを切り、コンテキストの肥大化を防ぐ
- Claude Codeで作成したドキュメントをそのままKiroで使用可能（互換性あり）
- **課題**: 小規模バグ修正でも過度に詳細な仕様（4ユーザーストーリー、16の受け入れ基準）が生成される

---

### 3. GitHub spec-kit：循環的SDD

<a href="https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/" target="_blank">GitHub公式SDD Toolkit（53.9k Stars）</a>

GitHub公式の仕様駆動開発ツールキット。最も広く使われているOSSの一つ。

#### ディレクトリ構成

```text
.specify/
├── memory/
│   └── constitution.md    # プロジェクトの不変原則（全フェーズで参照）
└── specs/
    └── {branch-name}/     # ブランチごとのサブディレクトリ
        ├── spec.md
        ├── plan.md
        ├── tasks.md
        ├── data-model.md
        ├── api.md
        └── component.md
```

#### ワークフロー

```text
Constitution → Specify → Plan → Tasks → Implement（循環）
```

- `constitution.md` が全フェーズの前提条件（ガバナンスドキュメント）
- 変更リクエストごとにブランチを作成
- `[P]` マーカーで並列化可能タスクを識別

#### 課題

- 1仕様あたり最大8ファイルが生成され、レビュー負荷が高い
- AIが既存コードを無視して重複生成する事例がある

---

### 4. OpenSpec：変更管理特化型

<a href="https://zenn.dev/gmomedia/articles/8ccf71e50858de" target="_blank">Claude Codeで仕様書駆動開発！3ツール比較</a>

既存サービスの改修に特化したツール。

#### ディレクトリ構成

```text
changes/          # アクティブな変更提案
changes/archive/  # 完了した変更
specs/            # 現行の確定仕様
```

#### ワークフロー

1. `/openspec:proposal` — 変更提案の作成
2. `/openspec:apply` — 提案に基づく実装
3. `/openspec:archive` — 完了した変更をアーカイブ

変更のライフサイクルをディレクトリ構造で表現しており、完了状況が一目でわかる。

---

### 5. Claude ADR System：git-flow統合型

<a href="https://gist.github.com/joshrotenberg/a3ffd160f161c98a61c739392e953764" target="_blank">Claude ADR System Guide（GitHub Gist）</a>

ブランチとADRを一対一で対応させる、AI最適化されたADRシステム。

#### ディレクトリ構成

```text
.claude/
├── adr-index.toml          # マスターインデックス（TOML形式）
├── branches/               # アクティブなブランチADR
│   ├── feat/, chore/, docs/, fix/
└── merged/                 # アーカイブ済みADR
    └── YYYY-MM/
```

#### ライフサイクル

1. **作成**: ブランチとADRを同時作成
2. **開発中**: 実装に応じてADRを更新
3. **マージ**: `merged/YYYY-MM/` にアーカイブ

#### AI最適化の特徴

- TOML形式のインデックスでAIが高速パース
- ADR間の依存関係を `[relationships.depends_on]` で明示
- タグシステムでドメイン横断検索が可能

---

### 6. newmo：Deep Research統合

<a href="https://tech.newmo.me/entry/claude-code-deep-research" target="_blank">Claude Code を Deep Research の用途で使うための工夫</a>

Claude Codeを調査フェーズに活用する事例。

- `/mode-researcher` Skillで20〜50クエリの反復調査を自動化
- 調査結果をMarkdownで保存し、iCloudでモバイル同期
- 調査プロセス（どのプロンプトでどの結果を得たか）を記録して再現性を確保

---

## ツール比較サマリー

| ツール/事例 | ライフサイクル管理 | ドキュメントの場所 | AI参照ルール | 特徴 |
| --- | --- | --- | --- | --- |
| **本リポジトリ** | YAML frontmatter status | `docs/adr/`, `docs/spec/`, `docs/research/` | accepted のみ | Spec-anchored、パス安定 |
| **toutou式** | ファイル内 status | 未公開（推定 `.adr/` 等） | accepted のみ | 本リポジトリに最も近い |
| **Kiro** | タスク完了で削除 | `.kiro/specs/{feature}/` | steering は常時 | Spec-first、AWS IDE |
| **spec-kit** | ブランチ単位 | `.specify/specs/{branch}/` | constitution は常時 | 最多採用OSS |
| **OpenSpec** | ディレクトリで管理 | `changes/`, `specs/` | 既存 specs は常時 | 改修特化 |
| **Claude ADR System** | Active/Merged/Abandoned | `.claude/branches/`, `.claude/merged/` | インデックス参照 | git-flow統合 |

---

## 本リポジトリの位置づけと差別化ポイント

### 強み

1. **Spec-anchored（レベル2）**: 大半のツールがSpec-first（削除）であるのに対し、
   本リポジトリはライフサイクルを通じてドキュメントを保持・更新する設計。
   意思決定の根拠が長期的に追跡可能。

2. **パスの安定性**: ディレクトリ移動ではなくfrontmatter statusで管理するため、
   ドキュメント間の相互参照リンクが壊れない。

3. **ツール非依存**: 特定IDEや外部CLIに依存せず、純粋なMarkdown + YAML + git で動作。
   Kiro, spec-kit, Claude Code, Cursor, Gemini CLI 等どのAIツールにも適用可能。

4. **デザイントークン統合**: toutou式と同様に、Primitive/Semantic/Component の3階層で
   UIの一貫性をドキュメントレベルで制約する。現時点でこれを明示的に含むツールは少ない。

5. **CI検証**: frontmatterの整合性をGitHub Actionsで自動検証。手動運用のみのツールより品質担保が高い。

### 改善余地・追加検討事項

1. **機能単位のディレクトリ**: Kiroのように `docs/spec/{feature-name}/` で機能ごとに
   requirements/design/tasks をまとめる構造も検討の余地あり（現在はフラット）。

2. **Steeringドキュメントの明示**: Kiro・spec-kitの `product.md`, `tech.md`, `structure.md` に相当する
   「プロジェクト知識の永続化」ドキュメントが現状不足している。

3. **タスクリスト（tasks.md）**: 仕様から実装タスクへの橋渡しドキュメントがない。
   `docs/spec/` に `tasks.md` を追加するか、spec自体に受け入れ基準チェックリストで代替できる。

4. **slash commands / skills**: Kiro・spec-kitはコマンドで仕様生成を自動化している。
   `docs/adr/` や `docs/spec/` のドキュメント作成を半自動化するSlash Command / Skillがあると
   運用コストが下がる。

---

## 推奨アクション

優先度順：

1. **Steeringドキュメントの追加** (`docs/steering/` または `docs/guides/` 内)
   - `product.md`: プロダクトのコアバリュー・ターゲット
   - `tech.md`: 採用技術スタックの一覧と選定理由
   - `structure.md`: ディレクトリ構成とモジュール責務

2. **深掘り研究**: spec-kitの具体的なfrontmatter設計とcc-sddのSlash Commands実装

3. **Slash Command / Skill追加**（任意）: ADR・specドキュメントの骨格を自動生成するコマンド

---

## 参考文献

- <a href="https://www.docswell.com/s/toutou/KPR86L-2026-03-14-111926" target="_blank">Claude Codeで回す小規模プロダクト開発（toutou, 2026）</a>
- <a href="https://tech.newmo.me/entry/claude-code-deep-research" target="_blank">Claude Code を Deep Research の用途で使うための工夫（newmo, 2025）</a>
- <a href="https://zenn.dev/gotalab/articles/3db0621ce3d6d2" target="_blank">Kiroの仕様書駆動開発プロセスをClaude Codeで徹底的に再現した（gotalab）</a>
- <a href="https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html" target="_blank">Understanding SDD: Kiro, spec-kit, and Tessl（Martin Fowler, 2025）</a>
- <a href="https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/" target="_blank">Spec-Driven Development with AI: spec-kit（GitHub Blog）</a>
- <a href="https://zenn.dev/gmomedia/articles/8ccf71e50858de" target="_blank">Claude Codeで仕様書駆動開発！3ツール比較（GMOメディア）</a>
- <a href="https://gist.github.com/joshrotenberg/a3ffd160f161c98a61c739392e953764" target="_blank">Claude ADR System Guide（Josh Rotenberg）</a>
- <a href="https://yoshidashingo.com/entry/sdd-with-claude_code" target="_blank">Claude Codeで実践する仕様駆動開発入門（yoshidashingo）</a>
- <a href="https://nathanlasnoski.com/2026/01/08/what-is-spec-driven-development/" target="_blank">What is Spec-Driven Development?（Nathan Lasnoski, 2026）</a>
