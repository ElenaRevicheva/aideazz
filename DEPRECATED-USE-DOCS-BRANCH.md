# ?? THIS BRANCH IS DEPRECATED ??

## Use the `docs` Branch Instead

**Date Deprecated:** October 31, 2025

---

## Important Notice

**This `doc` branch (singular) has been deprecated and merged into the `docs` branch (plural).**

All documentation has been consolidated and organized in the `docs` branch.

---

## What Happened?

1. Two similar branches existed: `doc` and `docs`
2. Analysis revealed significant overlap with only 1 unique file in `doc` branch
3. The unique file (`AI-Co-Founder-Feasibility-Analysis.md`) was merged into `docs/03-business-pitch/`
4. All documentation is now organized in thematic folders on the `docs` branch

---

## Action Required

### Switch to the `docs` branch:

```bash
git checkout docs
```

---

## Documentation Structure on `docs` Branch

The `docs` branch has all documentation organized into 9 thematic folders:

```
docs/
??? 01-career-applications/      # Job applications, resumes
??? 02-portfolio/                # Portfolio documentation  
??? 03-business-pitch/           # Business strategy and pitches
??? 04-tech-stacks/              # Technical documentation
??? 05-marketing-communications/ # Marketing materials
??? 06-deployment/               # Deployment guides
??? 07-planning-tracking/        # Project planning
??? 08-guides-howtos/            # How-to guides
??? 09-website-ui/               # Website planning
```

---

## For Repository Maintainers

This branch can be safely deleted:

```bash
# Delete local branch
git branch -d doc

# Delete remote branch
git push origin --delete doc
```

---

## More Information

For detailed information about the branch consolidation:
- See: `docs/08-guides-howtos/DOC-VS-DOCS-BRANCH-RESOLUTION.md` on the `docs` branch

---

**Summary:** This `doc` branch is obsolete. Please use the `docs` branch for all documentation needs.
