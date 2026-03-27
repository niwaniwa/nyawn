#!/usr/bin/env bash
set -euo pipefail

# ドキュメントのYAML frontmatterを検証するスクリプト
# 対象: docs/adr/, docs/spec/, docs/research/ 配下の .md ファイル（_template.md を除く）
# 除外: docs/steering/ はfrontmatterなしの常時参照ドキュメントのため検証対象外

VALID_STATUSES="wip accepted archive"
ERRORS=0
WARNINGS=0

check_frontmatter() {
  local file="$1"
  local in_frontmatter=false
  local has_frontmatter=false
  local status=""
  local frontmatter_lines=""

  while IFS= read -r line; do
    if [[ "$line" == "---" ]]; then
      if $in_frontmatter; then
        # frontmatter終了
        break
      else
        in_frontmatter=true
        has_frontmatter=true
        continue
      fi
    fi
    if $in_frontmatter; then
      frontmatter_lines+="$line"$'\n'
      if [[ "$line" =~ ^status:\ *(.+)$ ]]; then
        status="${BASH_REMATCH[1]}"
        # クォートを除去
        status="${status%\"}"
        status="${status#\"}"
        status="${status%\'}"
        status="${status#\'}"
        status="$(echo "$status" | xargs)"
      fi
    fi
  done < "$file"

  if ! $has_frontmatter; then
    echo "ERROR: $file - YAML frontmatter が見つかりません"
    ERRORS=$((ERRORS + 1))
    return
  fi

  if [[ -z "$status" ]]; then
    echo "ERROR: $file - status フィールドがありません"
    ERRORS=$((ERRORS + 1))
    return
  fi

  local valid=false
  for s in $VALID_STATUSES; do
    if [[ "$status" == "$s" ]]; then
      valid=true
      break
    fi
  done

  if ! $valid; then
    echo "ERROR: $file - 無効な status: '$status' (有効値: $VALID_STATUSES)"
    ERRORS=$((ERRORS + 1))
    return
  fi

  # accepted な spec に未解決事項があれば警告
  if [[ "$status" == "accepted" && "$file" == *"/spec/"* ]]; then
    local in_open_questions=false
    local has_content=false
    while IFS= read -r line; do
      if [[ "$line" =~ ^##\ *未解決事項 ]]; then
        in_open_questions=true
        continue
      fi
      if $in_open_questions; then
        if [[ "$line" =~ ^## ]]; then
          break
        fi
        # 空行・ハイフンのみの行を除く実質的な内容があるか
        local trimmed
        trimmed="$(echo "$line" | sed 's/^[[:space:]]*-[[:space:]]*//' | xargs)"
        if [[ -n "$trimmed" ]]; then
          has_content=true
          break
        fi
      fi
    done < "$file"

    if $has_content; then
      echo "WARNING: $file - accepted な spec に未解決事項が残っています"
      WARNINGS=$((WARNINGS + 1))
    fi
  fi

  echo "OK: $file (status: $status)"
}

echo "=== ドキュメントバリデーション ==="
echo ""

TARGET_DIRS=("docs/adr" "docs/spec" "docs/research")
FILE_COUNT=0

for dir in "${TARGET_DIRS[@]}"; do
  if [[ ! -d "$dir" ]]; then
    continue
  fi

  for file in "$dir"/*.md; do
    [[ -e "$file" ]] || continue
    # _template.md はスキップ
    [[ "$(basename "$file")" == _template.md ]] && continue
    check_frontmatter "$file"
    FILE_COUNT=$((FILE_COUNT + 1))
  done
done

echo ""
echo "=== 結果 ==="
echo "検証ファイル数: $FILE_COUNT"
echo "エラー: $ERRORS"
echo "警告: $WARNINGS"

if [[ $ERRORS -gt 0 ]]; then
  exit 1
fi

exit 0
