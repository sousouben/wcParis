import React from 'react';
    import { motion } from 'framer-motion';
    import { ShieldCheck } from 'lucide-react';
    import { useTranslation } from '@/context/LanguageContext';

    const PrivacyPolicyPage = () => {
      const { t } = useTranslation();
      const editorName = "wpdevdesigns";
      const editorEmail = "mouatakide@gmail.com";
      const currentDate = new Date().toLocaleDateString(t('localeForDate'), { year: 'numeric', month: 'long', day: 'numeric' });

      const createMarkup = (htmlString) => {
        return { __html: htmlString };
      };

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 text-slate-200"
        >
          <section className="glassmorphism p-6 sm:p-8 rounded-xl shadow-xl">
            <div className="flex items-center mb-6">
              <ShieldCheck size={32} className="text-sky-400 mr-4" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-300">{t('privacyPolicyPageTitle')}</h1>
            </div>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed prose prose-sm sm:prose-base prose-invert max-w-none 
                            prose-headings:text-sky-400 prose-strong:text-slate-100 
                            prose-a:text-sky-400 hover:prose-a:text-sky-300">
              <p><strong>{t('privacyLastUpdate')}:</strong> {currentDate}</p>

              <h2>{t('privacyIntroTitle')}</h2>
              <p>{t('privacyIntroText1', { appName: t('appTitle'), editorName: editorName })}</p>
              <p>{t('privacyIntroText2')}</p>

              <h2>{t('privacyDataCollectedTitle')}</h2>
              <p>{t('privacyDataCollectedText1')}</p>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>{t('privacyDataCollectedItem1')}</li>
                <li>{t('privacyDataCollectedItem2')}</li>
                <li>{t('privacyDataCollectedItem3')}</li>
              </ul>
              <p>{t('privacyDataCollectedText2')}</p>

              <h2>{t('privacyDataUsageTitle')}</h2>
              <p>{t('privacyDataUsageText1')}</p>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>{t('privacyDataUsageItem1')}</li>
                <li>{t('privacyDataUsageItem2')}</li>
                <li>{t('privacyDataUsageItem3')}</li>
              </ul>

              <h2>{t('privacyDataSharingTitle')}</h2>
              <p>{t('privacyDataSharingText1')}</p>
              <p>{t('privacyDataSharingText2')}</p>

              <h2>{t('privacyDataStorageTitle')}</h2>
              <p>{t('privacyDataStorageText1')}</p>
              <p>{t('privacyDataStorageText2')}</p>

              <h2>{t('privacyCookiesTitle')}</h2>
              <p>{t('privacyCookiesText1')}</p>
              <p>{t('privacyCookiesText2')}</p>

              <h2>{t('privacyUserRightsTitle')}</h2>
              <p>{t('privacyUserRightsText1')}</p>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>{t('privacyUserRightsItem1')}</li>
                <li>{t('privacyUserRightsItem2')}</li>
                <li>{t('privacyUserRightsItem3')}</li>
                <li>{t('privacyUserRightsItem4')}</li>
              </ul>
              <p dangerouslySetInnerHTML={createMarkup(t('privacyUserRightsText2', { email: `<a href="mailto:${editorEmail}">${editorEmail}</a>` }))} />

              <h2>{t('privacyPolicyChangesTitle')}</h2>
              <p>{t('privacyPolicyChangesText')}</p>

              <h2>{t('privacyContactTitle')}</h2>
              <p dangerouslySetInnerHTML={createMarkup(t('privacyContactText', { email: `<a href="mailto:${editorEmail}">${editorEmail}</a>` }))} />
            </div>
          </section>
        </motion.div>
      );
    };

    export default PrivacyPolicyPage;