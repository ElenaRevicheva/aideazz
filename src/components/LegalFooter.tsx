import React from "react";

// Updated legal footer with correct contact information format
const LegalFooter = () => {
  return (
    <footer className="w-full bg-black/20 border-t border-white/10">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg mb-4">AIdeazz</h4>
            <div className="text-gray-300 text-sm space-y-2">
              <p>AIdeazz is registered as a foreign natural person (persona natural extranjera)</p>
              <p>Specializing in educational AI and emotionally intelligent AI Agents and solutions</p>
              <p>Creating conscious, human-centered AI interactions</p>
            </div>
          </div>

          {/* Legal Registration - Spanish Original */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg mb-4">Legal Registration</h4>
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
                Edificio PH LATITUDE<br/>
                Casa/Apto 8B<br/>
                Dirección Descriptiva COSTA DEL ESTE
              </p>
            </div>
          </div>

          {/* Contact Information - English Translation */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg mb-4">Contact Information</h4>
            <div className="text-gray-300 text-sm space-y-2">
              <p><strong>Nombre legal del negocio:</strong> ELENA REVICHEVA</p>
              <p><strong>Email:</strong> aipa@aideazz.xyz</p>
              <p><strong>Website:</strong> aideazz.xyz</p>
              <p><strong>Phone:</strong> +507 66623757</p>
              <p><strong>Dirección:</strong> PH Latitude 8 8B COSTA DEL ESTE JUAN DIAZ</p>
              <p><strong>PANAMA</strong></p>
              <p><strong>Provincia:</strong> PANAMA</p>
              <p><strong>Country:</strong> REPÚBLICA DE PANAMÁ</p>
            </div>
          </div>
        </div>

        {/* Bottom Section with existing content */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 AIdeazz. All rights reserved.
            </div>
            <div className="rounded-full bg-white/5 px-6 py-3 text-sm font-semibold text-amber-300 shadow-lg border border-white/10 flex items-center gap-2 backdrop-blur-md">
              <span role="img" aria-label="point">👉</span> 
              <span>AIPA Era minted. <span role="img" aria-label="fire">��</span> Have any AIdeazz? Get on the ledger.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LegalFooter;
