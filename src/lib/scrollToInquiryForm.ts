/** Scroll to the Phase 3 inquiry form (below CTA cards in #contact). */
export function scrollToInquiryForm(): void {
  const el =
    document.getElementById("inquiry-form") ||
    document.getElementById("inquiry-form-anchor");
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}
