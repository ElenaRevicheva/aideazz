---
title: Privilege separation
slug: privilege-separation
one_liner: The thing that asks for an action and the thing that authorises it must be different things.
aka: no self-escalation; separation of duty; the agent cannot widen its own permissions
---
An autonomous agent will eventually meet a guard that stops it doing something the operator genuinely wants done. What happens next is the whole security model.

If the agent can lift the guard, there was never a guard. There was a suggestion, and the only boundary protecting the system is the agent's judgement in the moment it is most motivated to argue past it. That is the worst possible time to rely on judgement, because a capable model asked repeatedly by a frustrated owner will find a defensible-sounding reason. The reasoning is not even wrong — the owner really does own the system, and the action really is routine. The failure is structural, not logical.

Privilege separation puts the authorisation in a layer the agent cannot reach:

- **The agent may request access. It may not grant access.** Both directions must be enforced, and the second is the one that matters. Blocking credential reads while allowing edits to the permission list blocks nothing at all — it just adds a step.
- **Escalation is a human decision, made somewhere the agent does not run.** A mode toggle, a settings file the agent's own tooling refuses to write, an approval prompt. The mechanism can be humble; what matters is that it is out of reach.
- **The refusal must survive persistence.** Asking again is not new information. If the fifth request succeeds where the first failed, the boundary is a rate limit.

The tell that separation is working is uncomfortable by design: the agent stops and says it cannot proceed, while the operator is standing there able to authorise it. That friction is not a bug to be smoothed away. It is the boundary being visible for the one moment it can be observed.

The corollary matters as much. Once the human does authorise it, the work should proceed immediately and completely — no second-guessing, no re-litigating a decision already made. A boundary that keeps arguing after it has been lawfully opened teaches operators to disable it entirely, and a disabled guard protects nothing. Separation earns its cost by being absolute before the decision and silent after it.

The rule this earns: an agent must never be able to widen its own permissions. Design the refusal so that the only way through is a human acting at a different layer — and then, once they have, get out of the way.
