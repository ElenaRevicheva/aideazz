import { useEffect, useLayoutEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SERVICE_CHECKOUT_API } from "@/config/services";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ArrowLeft, CreditCard, Loader2 } from "lucide-react";

type Sku = "web_audit_prelim" | "web_audit_blueprint";

const SKUS: Sku[] = ["web_audit_prelim", "web_audit_blueprint"];

const ServicePay = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get("sku") as Sku | null;
  const inviteBlueprint = searchParams.get("invite") === "blueprint";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [activeSku, setActiveSku] = useState<Sku>(
    preselected && SKUS.includes(preselected) ? preselected : "web_audit_prelim",
  );
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (preselected && SKUS.includes(preselected)) setActiveSku(preselected);
  }, [preselected]);

  /** LATAM-first pay page: Spanish unless ?lng=en or ?lang=en */
  useLayoutEffect(() => {
    const lng = searchParams.get("lng") ?? searchParams.get("lang");
    const target = lng === "en" ? "en" : lng === "es" ? "es" : "es";
    if (!i18n.language.startsWith(target)) {
      void i18n.changeLanguage(target);
    }
  }, [searchParams, i18n]);

  useEffect(() => {
    document.documentElement.lang = i18n.language.startsWith("es") ? "es" : "en";
  }, [i18n.language]);

  const pageUrl = typeof window !== "undefined" ? window.location.href.split("#")[0] : "";

  const checkout = async (sku: Sku) => {
    if (!name.trim() || !email.trim()) {
      toast.error(t("servicePay.validationContact"));
      return;
    }
    setPaying(true);
    setActiveSku(sku);
    try {
      const utm: Record<string, string> = {};
      for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const) {
        const v = searchParams.get(k);
        if (v) utm[k] = v;
      }
      const body: Record<string, unknown> = {
        sku,
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        notes: notes.trim(),
        page_url: pageUrl,
        ...utm,
      };
      if (sku === "web_audit_blueprint" && inviteBlueprint) {
        body.allow_blueprint = true;
      }
      const r = await fetch(SERVICE_CHECKOUT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await r.json().catch(() => ({}))) as {
        ok?: boolean;
        checkout_url?: string;
        error?: string;
        message?: string;
      };
      if (!r.ok || !data.checkout_url) {
        if (data.error === "blueprint_requires_prelim") {
          throw new Error("__BLUEPRINT__");
        }
        throw new Error(data.message || data.error || r.statusText);
      }
      window.location.href = data.checkout_url;
    } catch (e) {
      const msg =
        e instanceof Error && e.message === "__BLUEPRINT__"
          ? t("servicePay.blueprintBlocked")
          : t("servicePay.checkoutError");
      toast.error(msg);
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#05060a] via-[#0a0c14] to-[#05060a] text-white">
      <div className="container mx-auto px-6 py-12 max-w-3xl">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200"
          >
            <ArrowLeft className="w-4 h-4" />
            aideazz.xyz
          </Link>
          <LanguageSwitcher
            syncQueryParam
            className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/5"
          />
        </div>

        <div className="mb-8">
          <p className="text-sm text-emerald-400 font-medium mb-2">{t("servicePay.paymentBadge")}</p>
          <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-3">
            {t("servicePay.title")}
          </h1>
          <p className="text-gray-300 leading-relaxed">{t("servicePay.subtitle")}</p>
        </div>

        <div className="glass-card p-6 mb-8 border border-white/10">
          <h3 className="text-lg font-semibold mb-4">{t("servicePay.formTitle")}</h3>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="sp-name">{t("servicePay.name")}</Label>
              <Input
                id="sp-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/5 border-white/20 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="sp-email">{t("servicePay.email")}</Label>
              <Input
                id="sp-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/20 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="sp-company">{t("servicePay.company")}</Label>
              <Input
                id="sp-company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="bg-white/5 border-white/20 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="sp-notes">{t("servicePay.notes")}</Label>
              <Textarea
                id="sp-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-white/5 border-white/20 mt-1"
                placeholder={t("servicePay.notesPlaceholder")}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {SKUS.map((sku) => (
            <div
              key={sku}
              className={`glass-card p-6 border transition-colors ${
                activeSku === sku ? "border-purple-400/50" : "border-white/10"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {t(`servicePay.products.${sku}.title`)}
                  </h2>
                  <p className="text-gray-300 text-sm leading-relaxed mb-2">
                    {t(`servicePay.products.${sku}.description`)}
                  </p>
                  {sku === "web_audit_blueprint" && !inviteBlueprint && (
                    <p className="text-xs text-amber-200/80 mb-2">{t("servicePay.blueprintRequiresNote")}</p>
                  )}
                  <p className="text-2xl font-bold text-emerald-400">
                    ${t(`servicePay.products.${sku}.price`)} USD
                  </p>
                </div>
                <Button
                  disabled={paying}
                  onClick={() => checkout(sku)}
                  className="shrink-0 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                >
                  {paying && activeSku === sku ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <CreditCard className="w-4 h-4 mr-2" />
                  )}
                  {t("servicePay.payButton")}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card p-6 mb-8 border border-amber-500/20 bg-amber-500/5">
          <p className="text-sm text-amber-100/90 leading-relaxed">{t("servicePay.afterPayNote")}</p>
        </div>

        <p className="text-xs text-gray-500 text-center">
          {t("servicePay.footer")} · Elena Revicheva · AIdeazz
        </p>
      </div>
    </div>
  );
};

export default ServicePay;
