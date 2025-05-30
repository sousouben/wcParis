import React, { createContext, useState, useContext, useEffect } from 'react';
    import fr from '@/locales/fr.json';
    import en from '@/locales/en.json';
    import es from '@/locales/es.json';
    import zh from '@/locales/zh.json';
    import it from '@/locales/it.json';
    import de from '@/locales/de.json';
    import ar from '@/locales/ar.json';

    const translations = { fr, en, es, zh, it, de, ar };
    export const supportedLanguages = [
      { code: 'fr', name: 'Français', nativeName: 'Français (FR)' },
      { code: 'en', name: 'English', nativeName: 'English (EN)' },
      { code: 'es', name: 'Spanish', nativeName: 'Español (ES)' },
      { code: 'zh', name: 'Chinese', nativeName: '中文 (ZH)' },
      { code: 'it', name: 'Italian', nativeName: 'Italiano (IT)' },
      { code: 'de', name: 'German', nativeName: 'Deutsch (DE)' },
      { code: 'ar', name: 'Arabic', nativeName: 'العربية (AR)', dir: 'rtl' },
    ];

    const LanguageContext = createContext();

    export const LanguageProvider = ({ children }) => {
      const getInitialLanguage = () => {
        const storedLang = localStorage.getItem('paris-toilets-lang');
        if (storedLang && translations[storedLang]) {
          return storedLang;
        }
        const browserLang = navigator.language.split('-')[0];
        if (translations[browserLang]) {
          return browserLang;
        }
        return 'fr'; // Default language
      };

      const [language, setLanguage] = useState(getInitialLanguage());

      useEffect(() => {
        localStorage.setItem('paris-toilets-lang', language);
        const currentLangObject = supportedLanguages.find(l => l.code === language);
        document.documentElement.lang = language;
        document.documentElement.dir = currentLangObject?.dir || 'ltr';

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', t('appMetaDescription'));
        }
        // Update page title
        document.title = t('appBrowserTitle');

      }, [language]);

      const t = (key, params = {}) => {
        let translation = translations[language]?.[key] || translations['fr']?.[key] || key;
        if (typeof translation === 'string') {
            Object.keys(params).forEach(paramKey => {
            translation = translation.replace(`{${paramKey}}`, params[paramKey]);
            });
        }
        return translation;
      };
      
      const changeLanguage = (lang) => {
        if (translations[lang]) {
          setLanguage(lang);
        }
      };

      return (
        <LanguageContext.Provider value={{ language, changeLanguage, t, supportedLanguages }}>
          {children}
        </LanguageContext.Provider>
      );
    };

    export const useTranslation = () => {
      const context = useContext(LanguageContext);
      if (!context) {
        throw new Error('useTranslation must be used within a LanguageProvider');
      }
      return context;
    };