
    import React, { Suspense, lazy, useState, useEffect } from 'react';
    import { Routes, Route, Link, useLocation } from 'react-router-dom';
    import { Toaster } from "@/components/ui/toaster";
    import { motion, AnimatePresence } from 'framer-motion';
    import { Info, Home, Globe, Menu, X, FileText, Shield } from 'lucide-react';
    import { useTranslation, supportedLanguages } from '@/context/LanguageContext';
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu";
    import { Button } from "@/components/ui/button";

    const HomePage = lazy(() => import('@/pages/HomePage'));
    const AboutPage = lazy(() => import('@/pages/AboutPage'));
    const LegalNoticePage = lazy(() => import('@/pages/LegalNoticePage'));
    const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage'));

    function LanguageSelector() {
      const { language, changeLanguage, t } = useTranslation();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center text-slate-300 hover:text-sky-400 hover:bg-sky-500/10 border-slate-700 hover:border-sky-500">
              <Globe size={18} className="mr-2" />
              {language.toUpperCase()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 text-slate-200 max-h-60 overflow-y-auto">
            {supportedLanguages.map(lang => (
              <DropdownMenuItem 
                key={lang.code} 
                onClick={() => changeLanguage(lang.code)} 
                className="hover:bg-sky-500/20 focus:bg-sky-500/20"
              >
                {lang.nativeName}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    function App() {
      const { t, language } = useTranslation();
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
      const location = useLocation();

      useEffect(() => {
        setIsMobileMenuOpen(false); 
      }, [location]);
      
      useEffect(() => {
        const currentLangObject = supportedLanguages.find(l => l.code === language);
        document.documentElement.lang = language;
        document.documentElement.dir = currentLangObject?.dir || 'ltr';
      }, [language]);


      const navLinks = [
        { to: "/", icon: Home, labelKey: "navHome" },
        { to: "/about", icon: Info, labelKey: "navAbout" },
      ];

      const footerLinks = [
        { to: `/${t('legalNoticeLink')}`, labelKey: "legalNoticePageTitle" },
        { to: `/${t('privacyPolicyLink')}`, labelKey: "privacyPolicyPageTitle" },
      ];


      return (
        <>
          <div className="flex flex-col min-h-screen">
            <header className="bg-slate-900/50 backdrop-blur-md shadow-lg sticky top-0 z-50">
              <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl sm:text-2xl font-bold text-sky-400 hover:text-sky-300 transition-colors">
                  {t('appTitle')}
                </Link>
                
                <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
                  {navLinks.map(link => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="flex items-center px-3 py-2 text-slate-300 hover:text-sky-400 rounded-md transition-all duration-300 ease-in-out hover:bg-sky-500/10"
                      >
                        <Icon size={18} className="mr-2" />
                        {t(link.labelKey)}
                      </Link>
                    );
                  })}
                  <LanguageSelector />
                </div>

                <div className="md:hidden flex items-center">
                  <LanguageSelector /> 
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="ml-2 text-slate-300 hover:text-sky-400 hover:bg-sky-500/10"
                    aria-label="Toggle menu"
                  >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </Button>
                </div>
              </nav>

              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden bg-slate-800/80 backdrop-blur-sm"
                  >
                    <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col space-y-2">
                      {navLinks.map(link => {
                        const Icon = link.icon;
                        return(
                          <Link
                            key={`mobile-${link.to}`}
                            to={link.to}
                            className="flex items-center px-3 py-3 text-slate-200 hover:text-sky-300 rounded-md transition-all duration-300 ease-in-out hover:bg-sky-500/20"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Icon size={20} className="mr-3" />
                            {t(link.labelKey)}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </header>

            <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
              <Suspense
                fallback={
                  <div className="flex justify-center items-center h-64">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 border-4 border-t-sky-500 border-r-sky-500 border-b-transparent border-l-transparent rounded-full"
                    />
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path={`/${t('legalNoticeLink')}`} element={<LegalNoticePage />} />
                  <Route path={`/${t('privacyPolicyLink')}`} element={<PrivacyPolicyPage />} />
                </Routes>
              </Suspense>
            </main>

            <footer className="bg-slate-900/50 py-6 text-center text-slate-400">
              <div className="container mx-auto px-4 sm:px-6">
                <div className="flex justify-center space-x-4 mb-2">
                  {footerLinks.map(link => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-xs text-slate-400 hover:text-sky-400 transition-colors"
                    >
                      {t(link.labelKey)}
                    </Link>
                  ))}
                </div>
                <p className="text-sm">
                  &copy; {new Date().getFullYear()} {t('appTitle')}. {t('footerRights')}
                </p>
                <p className="text-xs mt-1">
                  {t('footerSlogan')}
                </p>
              </div>
            </footer>
          </div>
          <Toaster />
        </>
      );
    }

    export default App;
  