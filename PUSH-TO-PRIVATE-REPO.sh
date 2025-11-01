#!/bin/bash

# Simple Push Script for Private Repository
# This will push all your documentation to the private repo

set -e

echo "=================================="
echo "Push to Private Repository"
echo "=================================="
echo ""

cd /workspace/PRIVATE-DOCS-TO-UPLOAD

# Update the remote URL to ensure it's correct
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/ElenaRevicheva/aideazz-private-docs.git

echo "Pushing to https://github.com/ElenaRevicheva/aideazz-private-docs.git"
echo ""

# Try to push, will prompt for credentials if needed
git push -u origin main --force

echo ""
echo "? SUCCESS! Documentation pushed to private repository!"
echo ""
echo "Verify at: https://github.com/ElenaRevicheva/aideazz-private-docs"
echo ""
