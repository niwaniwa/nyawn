# 開発フローテンプレート — テンプレート概要

> このファイルはテンプレート自身の説明です。ルート `README.md` はプロダクト用に差し替えてご利用ください。

AI支援開発のためのドキュメント駆動開発フローテンプレート。

## 概要

要求整理からリリースまでの開発フロー全体を、ライフサイクル管理付きドキュメントで支える構造。
AIツールは `status: accepted` のドキュメントのみを実装の根拠として参照する。

## ディレクトリ構成

```text
docs/
├── guides/           # 開発ガイド・ルール
│   ├── coding-standards.md
│   ├── github-pr-summary.md
│   ├── document-lifecycle.md
│   └── workflows.md
├── adr/              # ADR（意思決定記録）
├── spec/             # 仕様書
├── research/         # 調査・分析
└── design-tokens/    # デザイントークン定義
```

## ドキュメントライフサイクル

| ステータス | 意味 |
| --- | --- |
| `wip` | 作成中・レビュー待ち |
| `accepted` | 承認済み・実装可 |
| `archive` | 廃止・過去の記録 |

詳細は `docs/guides/document-lifecycle.md` を参照。

## 使い方

1. このリポジトリをテンプレートとして新しいプロジェクトを作成
2. `docs/` 配下のテンプレート（`_template.md`）をコピーしてドキュメントを作成
3. `status: wip` で作成し、レビュー後に `status: accepted` に変更
4. AIツールは accepted なドキュメントに基づいて実装を進める

## 開発フロー

1. **要求整理** — コアバリュー定義、競合調査、MVP決定 → `docs/research/`, `docs/adr/`
2. **仕様策定** — 要件分割、デザイントークン定義 → `docs/spec/`
3. **設計** — 技術選定、アーキテクチャ決定 → `docs/adr/`
4. **実装** — accepted spec に基づいて TDD で実装
5. **レビュー** — CI + 人間レビュー
6. **リリース**

## 参考

- [GitHub PR サマリー自動生成](https://zenn.dev/dely_jp/articles/abe6a40a384985)
- [Claude Code を Deep Research の用途で使うための工夫](https://tech.newmo.me/entry/claude-code-deep-research)
- [Claude Codeで回す小規模プロダクト開発 - 要求整理からリリースまでやってみた](https://www.docswell.com/s/toutou/KPR86L-2026-03-14-111926#p1)
