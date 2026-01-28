#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="frontend/out"
if [ ! -d "$OUT_DIR" ]; then
  echo "Error: $OUT_DIR not found"
  exit 1
fi

echo "Creating folder/index.html copies for pretty routes in $OUT_DIR"
for f in "$OUT_DIR"/*.html; do
  base=$(basename "$f")
  # skip index and 404
  if [[ "$base" == "index.html" || "$base" == "404.html" ]]; then
    continue
  fi
  name="${base%.html}"
  dir="$OUT_DIR/$name"
  mkdir -p "$dir"
  cp -f "$f" "$dir/index.html"
  echo "-> $dir/index.html"
done

echo "Done"
