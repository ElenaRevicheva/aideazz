#!/bin/bash

# Migration Script: Move Docs to Private Repository
# Date: October 31, 2025
# Purpose: Migrate sensitive documentation to private repo

set -e  # Exit on error

echo "=================================="
echo "AIDeazz Documentation Migration"
echo "=================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Create private repository on GitHub
echo -e "${YELLOW}STEP 1: Create Private Repository${NC}"
echo "Please create a new private repository on GitHub:"
echo ""
echo "  1. Go to: https://github.com/new"
echo "  2. Repository name: aideazz-private-docs"
echo "  3. Description: Private documentation and strategic materials for AIDeazz"
echo "  4. Visibility: ??  SELECT 'PRIVATE' ??"
echo "  5. DO NOT initialize with README, .gitignore, or license"
echo "  6. Click 'Create repository'"
echo ""
read -p "Press ENTER after you've created the private repository..."

# Step 2: Get the repository URL
echo ""
echo -e "${YELLOW}STEP 2: Repository URL${NC}"
echo "What is your GitHub username?"
read -p "Username: " GITHUB_USERNAME

PRIVATE_REPO_URL="https://github.com/${GITHUB_USERNAME}/aideazz-private-docs.git"
echo "Will use: $PRIVATE_REPO_URL"
read -p "Is this correct? (y/n): " confirm

if [ "$confirm" != "y" ]; then
    echo "Please enter the correct repository URL:"
    read PRIVATE_REPO_URL
fi

# Step 3: Create temporary directory and clone
echo ""
echo -e "${YELLOW}STEP 3: Preparing Migration${NC}"
TEMP_DIR="/tmp/aideazz-private-docs-migration"

# Clean up if exists
if [ -d "$TEMP_DIR" ]; then
    rm -rf "$TEMP_DIR"
fi

mkdir -p "$TEMP_DIR"
cd "$TEMP_DIR"

# Initialize new repo
echo "Initializing new repository..."
git init
git checkout -b main

# Step 4: Copy documentation
echo ""
echo -e "${YELLOW}STEP 4: Copying Documentation${NC}"
echo "Copying docs folder from current workspace..."

# Copy the entire docs folder
cp -r /workspace/docs .

# Copy important files
cp /workspace/README.md ./README-FROM-DOCS-BRANCH.md 2>/dev/null || true

# Create new README for private repo
cat > README.md << 'EOF'
# AIDeazz Private Documentation

**?? CONFIDENTIAL - PRIVATE REPOSITORY**

This repository contains sensitive documentation, business strategies, and personal materials for AIDeazz.

## ?? Documentation Structure

### `/docs/01-career-applications/`
Resume versions, job applications, and career materials
- Contains personal contact information
- Multiple resume versions and analyses
- Job application materials

### `/docs/02-portfolio/`
Portfolio documentation and technical summaries
- Technical skills overview
- Portfolio organization guides

### `/docs/03-business-pitch/`
Business strategy and investor materials
- Startup descriptions
- Investor pitches (CONFIDENTIAL)
- Business card analyses
- Competitor analysis

### `/docs/04-tech-stacks/`
Detailed technical documentation
- EspaLuz, ALGOM, WhatsApp bot architectures
- Technical implementation details
- System designs

### `/docs/05-marketing-communications/`
Marketing and communication strategies
- Community messages
- Promotion strategies

### `/docs/06-deployment/`
Deployment and infrastructure documentation
- Fleek deployment guides
- Infrastructure setup

### `/docs/07-planning-tracking/`
Project planning and progress tracking
- 30-day plans
- Progress trackers

### `/docs/08-guides-howtos/`
How-to guides and process documentation
- Branch management
- Security solutions
- Best practices

### `/docs/09-website-ui/`
Website planning and UI materials
- Design decisions
- Content planning

### `/docs/10-ai-cofounder-strategy/`
AI Co-Founder development strategy (STRATEGIC)
- Feasibility analysis
- Implementation roadmap
- Competitive advantage materials

## ?? Access Control

**This repository is PRIVATE.**

Access is granted on a case-by-case basis to:
- Serious investors (after NDA/initial discussion)
- Potential employers (during final interview stages)
- Strategic partners (as needed)

## ?? Public Resources

For public portfolio and website:
- Website: https://aideazz.com
- Public Code: https://github.com/ElenaRevicheva/aideazz

## ?? Contact

For access requests or questions, please contact via professional channels.

---

**Last Updated:** October 31, 2025  
**Status:** Active - Regularly Updated
EOF

# Add .gitignore
cat > .gitignore << 'EOF'
# OS files
.DS_Store
Thumbs.db

# Editor files
.vscode/
.idea/
*.swp
*.swo
*~

# Temporary files
*.tmp
*.temp
.cache/

# Sensitive files (extra protection)
*.key
*.pem
*.env
.env.local
secrets/
EOF

echo ""
echo -e "${GREEN}? Documentation copied successfully${NC}"
echo "  Total files migrated:"
find docs -type f | wc -l

# Step 5: Commit and push
echo ""
echo -e "${YELLOW}STEP 5: Committing and Pushing${NC}"

git add .
git commit -m "Initial migration: Move all sensitive documentation from public repo

Migrated from public aideazz repository to private repository:
- 51 documentation files across 10 thematic folders
- Resume versions and personal information
- Business strategies and investor pitches
- AI Co-Founder feasibility analysis
- Job applications and career materials
- Strategic planning documents

This migration protects sensitive information while keeping
the public repository focused on website code and portfolio showcase.

Date: $(date)
"

echo "Pushing to private repository..."
git remote add origin "$PRIVATE_REPO_URL"
git push -u origin main

echo ""
echo -e "${GREEN}????????????????????????????????????${NC}"
echo -e "${GREEN}? MIGRATION COMPLETED SUCCESSFULLY!${NC}"
echo -e "${GREEN}????????????????????????????????????${NC}"
echo ""
echo "Private repository: $PRIVATE_REPO_URL"
echo ""
echo -e "${YELLOW}NEXT STEPS:${NC}"
echo "  1. Verify the private repo on GitHub"
echo "  2. Confirm all files are present"
echo "  3. Delete docs/doc branches from public repo"
echo "  4. Update public repo README"
echo ""
echo -e "${RED}??  IMPORTANT: Do not delete local docs until verified!${NC}"
echo ""

# Cleanup
cd /workspace
echo "Temporary migration directory: $TEMP_DIR"
echo "You can delete it after verification with: rm -rf $TEMP_DIR"
