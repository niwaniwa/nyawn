# CLAUDE.md

AIがこのプロジェクトで作業する際に必ず参照するファイル。

## 必読: Steeringドキュメント

実装・設計・レビューの前に、以下を必ず読むこと：

| ファイル | 内容 |
| --- | --- |
| [docs/steering/product.md](docs/steering/product.md) | プロダクト概要・コアバリュー・MVP定義 |
| [docs/steering/tech.md](docs/steering/tech.md) | 技術スタック・選定理由・禁止事項 |
| [docs/steering/structure.md](docs/steering/structure.md) | ディレクトリ構成・命名規則・依存ルール |

Steeringは「常時有効な参照文書」であり、ライフサイクル管理（wip/accepted/archive）は持たない。
プロジェクトの方針・構成が変わったタイミングで随時更新する。

## docs/ ディレクトリ構成

```
docs/
├── steering/         # プロジェクト知識（常時参照・ライフサイクルなし）
├── guides/           # 開発ガイド・ルール（ライフサイクル対象外）
│   └── template-overview.md  # このテンプレートの使い方・ディレクトリ構成・開発フロー
├── adr/              # ADR：技術的意思決定の記録
├── spec/             # 仕様書
├── research/         # 調査・分析
└── design-tokens/    # デザイントークン定義
```

## ドキュメントのライフサイクル

`adr/`, `spec/`, `research/` には YAML frontmatter で `status` を持つ：

| ステータス | 意味 |
| --- | --- |
| `wip` | 作成中・レビュー待ち |
| `accepted` | 承認済み・実装の根拠として有効 |
| `archive` | 廃止・過去の記録 |

- `status: accepted` のドキュメントのみを実装の根拠とする
- `wip` は明示的な指示がない限り実装に使わない

詳細は [docs/guides/document-lifecycle.md](docs/guides/document-lifecycle.md) を参照。

## バリデーション

```bash
bash scripts/validate-docs.sh
```

`docs/steering/` はフロントマターなしのため検証対象外。
