import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      size="sm"
      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">{i18n.language === 'en' ? 'ES' : 'EN'}</span>
    </Button>
  );
};

export default LanguageSwitcher;