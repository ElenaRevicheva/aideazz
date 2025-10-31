# 📂 Branch Structure Guide

**Created:** October 15, 2025  
**Purpose:** Prevent unnecessary Fleek deployments

---

## 🌳 **Branch Overview**

### **`main` Branch** 
**Purpose:** Website code ONLY  
**Fleek watches this:** ✅ YES - Every push triggers deployment

**What's here:**
- `src/` - Website source code
- `public/` - Static assets
- `package.json` - Dependencies
- `vite.config.ts` - Build config
- `fleek.json` - Fleek config
- `README.md` - Public repo description
- All other website code

**What's NOT here:**
- ❌ Documentation files (.md)
- ❌ Guides, pitches, roadmaps
- ❌ Correspondence templates
- ❌ Tech specs

---

### **`docs` Branch**
**Purpose:** ALL documentation  
**Fleek watches this:** ❌ NO - Never triggers deployment

**What's here:**
- 📋 All .md documentation files
- 📝 ISD-COMMUNITY-MESSAGE.md
- 📊 30-DAY-TRACKER.md
- 📖 PROMOTION-PLAYBOOK-GET-HIRED-GET-FUNDED.md
- 🔧 FLEEK-DEPLOYMENT-EXPLANATION.md
- 💬 ISD-RESPONSE-SITE-DOWN.md
- 🚀 START-HERE-30-DAY-PLAN.md
- 📄 All tech stack files
- 📈 Business card analysis
- 🎯 Investor pitches
- 💼 Portfolio documentation
- Any future documentation

---

## ✅ **How to Work with This Setup**

### **When Editing Website Code:**

```bash
# Work on main branch
git checkout main

# Make changes to src/, public/, etc.
# Edit BusinessCard.tsx, add features, fix bugs, etc.

# Commit and push
git add .
git commit -m "Add new feature to business card"
git push origin main

# ⚠️ This WILL trigger Fleek deployment (expected!)
```

**Result:** Fleek deploys your changes, site down for 1-4 hours ✅ **This is what you want**

---

### **When Editing Documentation:**

```bash
# Work on docs branch
git checkout docs

# Make changes to any .md files
# Update ISD messages, roadmaps, pitches, guides, etc.

# Commit and push
git add .
git commit -m "Update 30-day tracker with week 1 results"
git push origin docs

# ✅ This will NOT trigger Fleek deployment!
```

**Result:** Documentation updated, site stays live ✅ **No downtime!**

---

### **Adding New Documentation:**

```bash
# Switch to docs branch
git checkout docs

# Create new .md file
echo "# New Guide" > NEW-GUIDE.md

# Commit and push to docs
git add NEW-GUIDE.md
git commit -m "Add new guide"
git push origin docs

# ✅ No Fleek deployment triggered
```

---

### **Viewing Documentation:**

**On GitHub:**
- Switch branch dropdown: `main` → `docs`
- Browse all documentation files

**Locally:**
```bash
# Switch to docs branch
git checkout docs

# View any file
cat ISD-COMMUNITY-MESSAGE.md
cat 30-DAY-TRACKER.md
```

---

## 📊 **Quick Reference**

| Task | Branch | Fleek Deploy? |
|------|--------|---------------|
| Edit BusinessCard.tsx | `main` | ✅ YES (intended) |
| Fix website bug | `main` | ✅ YES (intended) |
| Update i18n translations | `main` | ✅ YES (intended) |
| Add new React component | `main` | ✅ YES (intended) |
| Update ISD message | `docs` | ❌ NO (avoided!) |
| Edit 30-day tracker | `docs` | ❌ NO (avoided!) |
| Update pitch deck | `docs` | ❌ NO (avoided!) |
| Add new roadmap | `docs` | ❌ NO (avoided!) |
| Write correspondence | `docs` | ❌ NO (avoided!) |

---

## 🎯 **What This Solves**

**Before (Problem):**
- Push ISD message update → Fleek deploys → Site down 1-4 hours
- Push roadmap edit → Fleek deploys → Site down 1-4 hours
- Push any .md file → Fleek deploys → Site down 1-4 hours
- **Federico tries to view card → Site is down** 😞

**After (Solution):**
- Push ISD message to `docs` → No deployment → Site stays up ✅
- Push roadmap to `docs` → No deployment → Site stays up ✅
- Push any .md to `docs` → No deployment → Site stays up ✅
- **Federico can always view card** 😊

---

## 🚨 **Important Notes**

### **1. Check Current Branch Before Working:**
```bash
git branch
# Shows: * main  ← you're on main
# Or:    * docs  ← you're on docs
```

### **2. Pull Latest Before Starting:**
```bash
# If working on main
git checkout main
git pull origin main

# If working on docs
git checkout docs
git pull origin docs
```

### **3. Don't Mix Branches:**
- ❌ DON'T commit .md files to `main`
- ❌ DON'T commit code files to `docs`
- ✅ Keep them separate!

### **4. Current Status:**

**Last deployment triggered:** October 15, 2025  
**Reason:** Final cleanup - moved all docs to `docs` branch  
**Next deployment:** Only when you push code changes to `main`

---

## 💡 **Pro Tips**

### **Quick Branch Switching:**
```bash
# See what branch you're on
git branch

# Switch to main
git checkout main

# Switch to docs
git checkout docs

# See recent commits on current branch
git log --oneline -5
```

### **Push to Specific Branch:**
```bash
# Always specify branch when pushing
git push origin main   # ← Triggers Fleek
git push origin docs   # ← No Fleek trigger
```

### **Check What's Different Between Branches:**
```bash
# See what files exist on docs but not main
git checkout docs
ls *.md

git checkout main
ls *.md  # Only README.md
```

---

## 📞 **Quick Start Commands**

### **Working on Website:**
```bash
git checkout main
# ... edit code ...
git add .
git commit -m "Your message"
git push origin main  # Site will redeploy
```

### **Working on Documentation:**
```bash
git checkout docs
# ... edit .md files ...
git add .
git commit -m "Your message"
git push origin docs  # No deployment!
```

---

## ✅ **Success Criteria**

You'll know this is working when:

1. ✅ You can update docs without site going down
2. ✅ `main` branch has no .md files except README.md
3. ✅ `docs` branch has all documentation
4. ✅ Fleek only deploys when you change actual website code
5. ✅ Federico can always access your card! 😊

---

**This setup is now LIVE and active!** 🚀

Going forward: 
- Code changes → `main` → Deploy (expected)
- Doc changes → `docs` → No deploy (avoided)

---

*Last Updated: October 15, 2025*  
*Created by: Elena Revicheva | AIdeazz*
