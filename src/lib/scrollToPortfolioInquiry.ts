import { PORTFOLIO_INQUIRY_ANCHOR } from "@/config/marketing";

/** Scroll to the portfolio UTM inquiry form (Phase 3 lead path). */
export function scrollToPortfolioInquiry(): void {
  document
    .getElementById(PORTFOLIO_INQUIRY_ANCHOR)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}
