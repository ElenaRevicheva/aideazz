---
title: The blog post GitHub had and the live CID did not
slug: 2026-08-21-git-ahead-of-pin
date: 2026-08-21
blog: no
subtitle: Dev.to and the portfolio advertised a canonical URL whose IPFS directory did not exist
concepts: git-is-not-the-origin, ack-is-not-completion, silent-failure, verify-from-logs
symptom: The 21 August daily post was live on Dev.to and listed on the portfolio, while the canonical aideazz.xyz/blog URL returned a raw IPFS error -- no link named for that slug -- so crawlers never saw the article.
root_cause: Two layers. First, the daily publisher advertised three surfaces (cross-post, portfolio API, Telegram) before the canonical HTML existed in the pin, and a bulk regenerate fired fifty-six skip-ci commits in one minute so the host was told not to rebuild. Second, even the eligible no-skip-ci commits that followed created no new GitHub production deployment -- last success was the previous day's wiki refresh -- so git HEAD moved and the live CID did not.
fix: Daily publish now awaits a single-article HTML put, never skip-ci on the sitemap, and does not tell Telegram "published" if that put failed. Those changes are in the application. Completion is still a new x-ipfs-path CID, not a new git SHA; a host that has stopped creating production deploys is a dashboard rebuild, not another commit.
verified: GitHub Actions 21 Aug 2026 20:55:23 UTC -- HTTP/2 404, cdn-cache MISS, x-ipfs-path still CID bafybeibllpftpprs4kg4p4jjrjsrhddgxl5h5cd3af36abhovxizm25z5m, body "no link named telegram-my-ai-agent-ops-dashboard-not-a-web-ui". Same hour the GitHub tree held that path (19.8KB, article title in HTML). Commit log: 56 skip-ci blog-static puts 19:30:17Z-19:31:18Z, then 023b8b6 at 19:31:19Z without skip-ci. Last GitHub production deployment: 20 Aug 21:31 UTC, SHA 29d1a63. Portfolio and /blog still scored A+ 100 on the same run; the missing child 404s, a missing root file would have been a 200 homepage.
rule: A new public URL is not shipped until the serving origin moves. Git, Dev.to and a bot message are receipts. The CID and the production deploy record are completion.
---
