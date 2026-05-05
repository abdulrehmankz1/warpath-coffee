#!/usr/bin/env bash
# Warpath Coffee — config edit warning
# Reminds you that next.config.ts / tailwind.config / tsconfig changes affect the whole project.
# Triggered as a PreToolUse hook on Edit/Write — exits 0 (informational only, doesn't block).

set -euo pipefail
INPUT=$(cat)

if command -v jq >/dev/null 2>&1; then
  PATH_ARG=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
else
  PATH_ARG=$(echo "$INPUT" | grep -oE '"file_path":"[^"]+"' | head -1 | sed 's/.*:"\([^"]*\)"/\1/')
fi

case "$PATH_ARG" in
  *next.config.ts|*next.config.mjs|*tailwind.config.*|*tsconfig.json|*postcss.config.*|*package.json)
    echo "⚠️  Editing $PATH_ARG — this affects the whole project. Verify the change is necessary and run 'yarn build' after." >&2
    ;;
esac
exit 0
