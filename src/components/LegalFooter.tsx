import React from "react";
import { useTranslation } from "react-i18next";

// Updated legal footer with correct contact information format
const LegalFooter = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="w-full bg-black/20 border-t border-white/10">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg mb-4">{t("footer.companyTitle")}</h4>
            <div className="text-gray-300 text-sm space-y-2">
              <p>{t("footer.companyInfo1")}</p>
              <p>{t("footer.companyInfo2")}</p>
              <p>{t("footer.companyInfo3")}</p>
            </div>
          </div>

          {/* Legal Registration - Spanish Original */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg mb-4">{t("footer.legalTitle")}</h4>
            <div className="text-gray-300 text-sm space-y-2 bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="font-mono text-xs leading-relaxed">
                REPÚBLICA DE PANAMÁ<br/>
                REGISTRO ÚNICO DE CONTRIBUYENTES - PERSONA NATURAL<br/>
                RUC 8-NT-2-781965 DV 90<br/>
                Primer Apellido REVICHEVA Primer Nombre ELENA<br/>
                Tipo Persona EXTRANJERA<br/>
                Actividad Empresarial Ocupación 21320 - PROGRAMADORES INFORMATICOS<br/>
                Datos de Ubicación<br/>
                Provincia PANAMA<br/>
                Distrito PANAMA<br/>
                Corregimiento JUAN DIAZ<br/>
                Calle/Avenida PRINCIPAL<br/>
                Dirección Descriptiva COSTA DEL ESTE
              </p>
            </div>
          </div>

          {/* Contact Information - English Translation */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg mb-4">{t("footer.contactTitle")}</h4>
            <div className="text-gray-300 text-sm space-y-2">
              <p><strong>{t("footer.businessName")}</strong> {t("footer.businessNameValue")}</p>
              <p><strong>{t("footer.email")}</strong> aipa@aideazz.xyz</p>
              <p><strong>{t("footer.website")}</strong> aideazz.xyz</p>
              <p><strong>{t("footer.phone")}</strong> +507 61 666 716</p>
              <p><strong>{t("footer.address")}</strong> {t("footer.addressValue")}</p>
              <p><strong>PANAMA</strong></p>
              <p><strong>{t("footer.province")}</strong> {t("footer.provinceValue")}</p>
              <p><strong>{t("footer.country")}</strong> {t("footer.countryValue")}</p>
            </div>
          </div>
        </div>

        {/* Bottom Section with existing content */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              {t("footer.copyright")}
            </div>
            <div className="rounded-full bg-white/5 px-6 py-3 text-sm font-semibold text-amber-300 shadow-lg border border-white/10 flex items-center gap-2 backdrop-blur-md">
              <span role="img" aria-label="point">👉</span> 
              <span>{t("footer.aipaEra")} <span role="img" aria-label="fire">🔥</span> {t("footer.ledgerPrompt")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LegalFooter;