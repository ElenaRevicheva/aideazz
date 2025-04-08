#!/bin/bash

# 1. Check if a title was provided
if [ -z "$1" ]; then
  echo "❌ Usage: ./newpost.sh \"Your Post Title\""
  exit 1
fi

# 2. Format slug and date
title="$1"
slug=$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')
date=$(date +%Y-%m-%d)
filepath="posts/${date}-${slug}.md"

# 3. Create post file with metadata
cat <<EOF > "$filepath"
Title: $title
Date: ${date//-//}
[pandoc]: <> (--mathjax)

Start writing your blog post here...
EOF

echo "✅ Created: $filepath"

# 4. Launch Typora from Windows (installed in Program Files)
echo "📝 Opening in Typora..."
/mnt/c/Program\ Files/Typora/Typora.exe "$(wslpath -w "$PWD/$filepath")"

echo "✅ Typora closed — publishing your blog..."

# 5. Run your auto-publish script
./publish_and_deploy.sh
