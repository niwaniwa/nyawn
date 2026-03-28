---
id: "0002"
title: "プロフィールカード データモデル"
status: accepted
phase: mvp
created: 2026-03-28
updated: 2026-03-28
related_adr: ["0003"]
---

# プロフィールカード データモデル

## 概要

プロフィールカードに表示するデータの構造を定義する。すべての仕様書の基盤となるデータモデル仕様。

## 背景・ADR参照

- [ADR-0003: データ永続化戦略](../adr/0003-data-persistence-strategy.md) — localStorage + Zustand persist を採用

## 要件

### 機能要件

- MUST: 以下のフィールドを持つプロフィールカードデータを管理できること
  - `displayName` — 表示名（必須）
  - `avatarUrl` — アバター画像のURL（任意）
  - `bio` — ひとこと紹介文（任意）
  - `vrcId` — VRChat ID（任意）
  - `socialLinks` — SNSリンクの配列（任意、最大3件）
- MUST: 対応SNSプラットフォーム: x, youtube, twitch, discord, github, misskey
- MUST: 選択中のテンプレートIDを保持できること
- MUST: localStorageに自動保存され、ブラウザ再起動後に復元できること
- SHOULD: データスキーマにバージョン番号を持ち、将来的なマイグレーションに対応できること
- MUST: 未入力のSNSリンクはカード上に表示しないこと
- COULD: 入力中の一時データと保存済みデータの区別

### 非機能要件

- パフォーマンス: localStorage への保存はデバウンス（500ms程度）で行い、キー入力ごとの書き込みを避ける
- セキュリティ: URLフィールドはサニタイズし、XSSを防止する

## スコープ

### このフェーズで対応するもの

- カードデータの型定義
- Zustand ストア設計
- localStorage 永続化スキーマ
- バリデーションルール

### 対応しないもの（後続フェーズ）

- 複数カードの管理
- カードデータのインポート/エクスポート（JSON）
- カスタムフィールドの追加

## 技術設計

### TypeScript 型定義

```typescript
type SocialPlatform = "x" | "youtube" | "twitch" | "discord" | "github" | "misskey";

interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

interface ProfileCard {
  displayName: string;
  avatarUrl: string;
  bio: string;
  vrcId: string;
  socialLinks: SocialLink[];
  templateId: string;
}

interface AppState {
  card: ProfileCard;
  schemaVersion: number;
  updateCard: (updates: Partial<ProfileCard>) => void;
  resetCard: () => void;
}
```

### localStorage スキーマ

```json
{
  "state": {
    "card": {
      "displayName": "",
      "avatarUrl": "",
      "bio": "",
      "vrcId": "",
      "socialLinks": [],
      "templateId": "default"
    },
    "schemaVersion": 1
  },
  "version": 0
}
```

キー名: `nyawn-card-store`

### バリデーションルール

| フィールド | ルール |
| --- | --- |
| `displayName` | 1〜30文字。空欄不可 |
| `avatarUrl` | 空欄可。入力時は `https://` で始まるURL |
| `bio` | 0〜100文字 |
| `vrcId` | 空欄可。入力時は `usr_` で始まる文字列 |
| `socialLinks` | 0〜3件。各 `url` は `https://` で始まるURL |
| `templateId` | 定義済みテンプレートIDのいずれか |

## 受け入れ基準

- [ ] ProfileCard 型が定義され、全フィールドが TypeScript で型安全に扱える
- [ ] Zustand ストアが実装され、カードデータの読み書きができる
- [ ] localStorage に自動保存され、ページリロード後にデータが復元される
- [ ] schemaVersion が保持され、将来的なマイグレーションの基盤がある
- [ ] バリデーションルールが実装され、不正な入力を防止できる

## 解決済み事項

- socialLinks の対応プラットフォーム一覧 → x, youtube, twitch, discord, github, misskey の6種に決定
- displayName の最大文字数 → 30文字に決定
- vrcId のフォーマット検証 → ゆるくチェック（`usr_` プレフィックスのみ）に決定
