#!/bin/bash

if [ -z "$1" ]; then
  echo "❌ Usage: ./trashpost.sh slug-of-your-post"
  echo "   Example: ./trashpost.sh my-second-post"
  exit 1
fi

slug="$1"
date=$(date +%Y-%m-%d)  # fallback for file suggestions

# Move HTML file (blog)
if [ -f ~/aideazz/public/blog/${slug}.html ]; then
  mv ~/aideazz/public/blog/${slug}.html ~/aideazz/public/blog/trash/
  echo "✅ Moved HTML: ${slug}.html to trash/"
else
  echo "⚠️  HTML not found: ${slug}.html"
fi

# Move MD file (posts)
mdfile=$(ls posts | grep "$slug.md" | head -n 1)

if [ -n "$mdfile" ]; then
  mv "posts/$mdfile" posts/trash/
  echo "✅ Moved Markdown: $mdfile to posts/trash/"
else
  echo "⚠️  Markdown file not found for: $slug"
fi

# Commit and push
cd ~/aideazz
git add public/blog
git commit -m "Archived post '$slug' to trash"
git push

echo "🚀 Archived '$slug' successfully!"
