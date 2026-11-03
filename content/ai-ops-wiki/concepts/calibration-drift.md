---
title: Calibration drift
slug: calibration-drift
one_liner: A number tuned for one model, one vendor or one data source stays in the code after the thing it was tuned for is replaced, and quietly stops meaning what it meant.
aka: stale threshold; a cut-off that outlived its model; uncalibrated score
---
Many AI systems decide with a number: keep search results above a similarity of 0.55, alert when a classifier is more than 80% sure, flag a transcript below a confidence of -1.0. Each number was chosen by looking at the scores one particular model produced.

The failure is replacing the model and keeping the number. Different embedding models, speech models and classifiers spread their scores differently: one model's "clearly the same topic" may be another's 0.4. Nothing crashes. The cut simply starts throwing away everything, or letting everything through, and because an empty search result and a "nothing relevant" result look identical, the system reports success while doing nothing.

The fix is to treat a threshold as part of the model, not part of the code: when the model changes, run a small known set (one pair that should match, a few that should not) through the new model, read the actual scores, and set the cut between them. Then keep that set as a test, so the next swap re-measures automatically.

Ordinary-life version: a bathroom scale moved from a soft carpet to a tile floor. The "healthy weight" line you drew on it still sits in the same place, but the readings all shifted, so the line now tells you nothing.
