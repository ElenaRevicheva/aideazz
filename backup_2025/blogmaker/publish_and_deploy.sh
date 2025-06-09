#!/bin/bash

set -e

# 1. Compile all markdown posts
./publish.py posts/*

# 2. Copy compiled HTMLs to the deployed site
find . -name "*.html" -exec cp {} ~/aideazz/public/blog/ \;

# 3. Regenerate blog index
INDEX=~/aideazz/public/blog/index.html
echo '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Blog</title></head><body><h1>Blog Posts</h1><ul>' > $INDEX

for post in ~/aideazz/public/blog/*.html; do
  name=$(basename "$post" .html)
  title=$(echo "$name" | sed 's/-/ /g' | sed -E 's/\b\w/\u&/g')
  echo "<li><a href=\"/blog/$name.html\">$title</a></li>" >> $INDEX
done

echo '</ul></body></html>' >> $INDEX

# 4. Commit and push from live project
cd ~/aideazz
git add public/blog/
git commit -m "Auto-publish blog post(s) via script"
git push
