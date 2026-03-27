# デザイントークン

UIの一貫性を保つための3階層トークンシステム。

## 階層構造

```text
Primitive（生の値）→ Semantic（意味）→ Component（UIコンポーネント）
```

### Primitive トークン

生の値に名前をつけたもの。色コード、px値など。
→ [primitive.md](primitive.md)

### Semantic トークン

Primitiveに意味を持たせたもの。用途・役割で命名する。
→ [semantic.md](semantic.md)

### Component トークン

Semanticを特定のUIコンポーネントに紐づけたもの。
→ [component.md](component.md)

## 運用ルール

- UIの色・サイズ・間隔は必ずトークン経由で指定する
- 新しい値が必要な場合、まず Primitive に追加し、Semantic で意味付けする
- 直接的な色コードやマジックナンバーの使用は避ける
