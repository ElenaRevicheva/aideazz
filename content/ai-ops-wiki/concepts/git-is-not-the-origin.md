---
title: Git is not the origin
slug: git-is-not-the-origin
one_liner: The repository is the source of the next pin. The live site is the current CID. They are not the same object.
aka: the map is not the territory; serving origin vs source repo
---
A git commit proves that a file was accepted into a repository. It does not prove that any browser, crawler or CDN is serving that file. On a static host the public origin is whatever was last built and pinned -- an IPFS CID, a release tarball, a CDN snapshot -- and that object only moves when the host actually rebuilds.

The trap is that git log, GitHub's file view and a green "published" notification all feel like the site. They are receipts. The cheap, decisive check is the header or artifact the edge actually returns: the CID in `x-ipfs-path`, the SHA of the last production deploy, the HTML `<title>` of the live URL.

Ordinary-life version: finishing the manuscript and filing it at the publisher is not the same as the new edition being on the newsstand. Checking the filing cabinet does not tell you what is on the shelf.

Defences:

1. **Name the serving origin in the runbook**, not "git main". If the chain is git then pin then CDN, the completion signal is a new pin, not a new SHA.
2. **Verify from the edge.** Compare the live CID (or deploy record) before and after the push. If it did not move, the push did not ship.
3. **Do not retry the receipt.** A second git commit cannot unstick a host that is no longer building. That is a different system, with a different credential.
