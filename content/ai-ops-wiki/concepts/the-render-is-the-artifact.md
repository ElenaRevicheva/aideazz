---
title: The render is the artifact
slug: the-render-is-the-artifact
one_liner: What a JavaScript-executing consumer stores is the DOM after execution, not the HTML you served. Anything that exists only before execution was never delivered.
aka: raw HTML vs rendered DOM; noscript is not a crawler channel; second-wave indexing
---
This is one step past [git is not the origin](#git-is-not-the-origin). There the receipt lied about what was being served. Here the serving is genuinely correct and current -- and still the consumer stores something else, because it transforms your bytes before reading them.

Modern search crawlers execute JavaScript. The thing that lands in the index is the DOM after that execution, not the file that came off the wire. Two consequences follow, and both are counter-intuitive because the served file looks perfect in `curl` and in the browser's View Source.

First, content that exists **only** in the pre-execution HTML is invisible. `<noscript>` is the sharpest example: by specification its contents render only when scripting is disabled, so a crawler running with JavaScript on discards it. A `<noscript>` block is a fallback for the absence of JavaScript. It is not a crawler channel, even though a crawler that does *not* execute JavaScript will happily read it -- which is exactly why the technique appears to work when you test it with a plain fetch.

Second, anything the application rewrites at runtime wins. If the page ships a carefully-chosen `<title>` and then the client-side router sets `document.title` on mount, the served title never reaches the index. Both values are "correct" in their own file. Nobody wrote a bug. The two simply describe the same page differently, and the one that executes last is the one that counts.

The result is a split audience. Consumers that execute JavaScript see one page; consumers that do not -- many AI crawlers, link-preview bots, plain HTTP clients -- see the other. Optimising for one can silently be measured with a tool that reads the other, which is how a page earns a perfect score on precisely the content its most important reader throws away.

Ordinary-life version: you post a letter with a covering note clipped to the front. The recipient's mailroom removes every clip before delivery. Your letter arrived. Your note never existed, as far as the reader is concerned -- and photographing the envelope on your desk will never reveal that.

Defences:

1. **Diff the two representations deliberately.** Fetch the URL raw, then fetch it through a renderer, and compare title, description, canonical and word count. If they disagree, decide which one you meant -- do not let execution order decide for you.
2. **One definition, both surfaces.** If a static build writes head identity and the client also sets it, both must read the same source file. See [single source of truth](#single-source-of-truth).
3. **Verify from the consumer's stored copy, not your own.** The decisive evidence is what the index actually holds. String-match it against your source: whichever file it matches character for character is the one that is really shipping.
4. **Know which half your instrument reads.** A checker that fetches raw HTML measures the non-executing audience. That is a real audience and a real score -- but it is not a verdict about a rendering one.
