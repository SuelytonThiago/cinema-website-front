import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './languages/en.json';
import ptTranslations from './languages/pt.json';

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      pt: {
        translation: ptTranslations,
      },
    },
    fallbackLng: 'pt', 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
