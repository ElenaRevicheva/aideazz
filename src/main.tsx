
// www → apex redirect (must run before React mounts)
if (typeof window !== 'undefined' && window.location.hostname === 'www.aideazz.xyz') {
  window.location.replace(window.location.href.replace('www.aideazz.xyz', 'aideazz.xyz'));
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n/config'
import i18n from './i18n/config'
import App from './App.tsx'

function syncDocumentLang(lng: string) {
  const short = (lng.split('-')[0] ?? 'en').toLowerCase()
  document.documentElement.lang = short === 'es' ? 'es' : 'en'
}
syncDocumentLang(i18n.language)
i18n.on('languageChanged', syncDocumentLang)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
