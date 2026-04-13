/** Scroll to the Phase 3 inquiry form (below CTA cards in #contact). */
export function scrollToInquiryForm(): void {
  document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
