#!/usr/bin/env bash
# Warpath Coffee — voice & messaging hook
# Blocks banned marketing words (per DESIGN_RULES.md §5.1) from being committed in UI/content files.
# Triggered as a PreToolUse hook on Edit and Write.

set -euo pipefail

# Read tool input JSON from stdin
INPUT=$(cat)

# Extract relevant fields (use jq if available, fall back to grep)
if command -v jq >/dev/null 2>&1; then
  TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty')
  PATH_ARG=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
  CONTENT=$(echo "$INPUT" | jq -r '.tool_input.new_string // .tool_input.content // empty')
else
  TOOL=$(echo "$INPUT" | grep -oE '"tool_name":"[^"]+"' | head -1 | sed 's/.*:"\([^"]*\)"/\1/')
  PATH_ARG=$(echo "$INPUT" | grep -oE '"file_path":"[^"]+"' | head -1 | sed 's/.*:"\([^"]*\)"/\1/')
  CONTENT=$(echo "$INPUT" | grep -oE '"(new_string|content)":"[^"]*"' | head -1 | sed 's/.*:"\(.*\)"/\1/')
fi

# Only check UI/content files
case "$PATH_ARG" in
  *.tsx|*.ts|*.mdx|*.md|*.json) ;;
  *) exit 0 ;;
esac

# Skip the design-rules / brand-guide / memory files themselves
case "$PATH_ARG" in
  */DESIGN_RULES.md|*/warpath-brand-guide.html|*/MEMORY.md|*/memory/*) exit 0 ;;
esac

# Banned words list (from DESIGN_RULES.md §5.1)
BANNED='\b(artisanal|elevated|experiential|curated|best-in-class|world-class|revolutionary|disruptive|synergy|symphony|forged in fires|warriors for warriors)\b'

if echo "$CONTENT" | grep -iEq "$BANNED"; then
  HIT=$(echo "$CONTENT" | grep -ioE "$BANNED" | head -3 | tr '\n' ',' | sed 's/,$//')
  echo "🛑 Banned voice word(s) detected in $PATH_ARG: $HIT" >&2
  echo "Per DESIGN_RULES.md §5.1, these words are auto-flagged. Replace with a concrete claim." >&2
  exit 2
fi

exit 0
