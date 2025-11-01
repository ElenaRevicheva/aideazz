#!/bin/bash

# Simple command to push your docs to private repo
# This will work in browser/cloud Cursor

cd /workspace/PRIVATE-DOCS-TO-UPLOAD

echo "Pushing to private repository..."
echo "Repository: https://github.com/ElenaRevicheva/aideazz-private-docs.git"
echo ""

# Use the GitHub token that's already configured
git push https://x-access-token:${GITHUB_TOKEN}@github.com/ElenaRevicheva/aideazz-private-docs.git main --force 2>&1

echo ""
echo "If successful, check: https://github.com/ElenaRevicheva/aideazz-private-docs"
