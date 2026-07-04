import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

type LanguageSwitcherProps = {
  className?: string;
  /** Keep ?lng= in the URL when toggling (pay page share links). */
  syncQueryParam?: boolean;
};

const LanguageSwitcher = ({ className, syncQueryParam }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('en') ? 'es' : 'en';
    void i18n.changeLanguage(newLang);
    if (syncQueryParam && typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('lng', newLang);
      window.history.replaceState({}, '', url.toString());
    }
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      size="sm"
      className={
        className ??
        'flex items-center gap-2 text-gray-300 hover:text-white transition-colors cursor-pointer relative z-[111]'
      }
      style={{ pointerEvents: 'auto' }}
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">{i18n.language.startsWith('en') ? 'ES' : 'EN'}</span>
    </Button>
  );
};

export default LanguageSwitcher;