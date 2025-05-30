import React from 'react';
    import { motion } from 'framer-motion';
    import { Gavel } from 'lucide-react';
    import { useTranslation } from '@/context/LanguageContext';
    import { Link } from 'react-router-dom';

    const LegalNoticePage = () => {
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
              <Gavel size={32} className="text-sky-400 mr-4" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-300">{t('legalNoticePageTitle')}</h1>
            </div>
            
            <div className="space-y-4 text-sm sm:text-base leading-relaxed prose prose-sm sm:prose-base prose-invert max-w-none 
                            prose-headings:text-sky-400 prose-strong:text-slate-100 
                            prose-a:text-sky-400 hover:prose-a:text-sky-300">
              <p><strong>{t('legalLastUpdate')}:</strong> {currentDate}</p>

              <h2>{t('legalEditorTitle')}</h2>
              <p dangerouslySetInnerHTML={createMarkup(t('legalEditorText', { name: editorName, email: `<a href="mailto:${editorEmail}">${editorEmail}</a>` }))} />
              <p><strong>{t('legalPublicationDirector')}:</strong> {editorName}</p>

              <h2>{t('legalHostingTitle')}</h2>
              <p>{t('legalHostingText1')}</p>
              <p>Hostinger International Ltd.</p>
              <p>61 Lordou Vironos Street, 6023 Larnaca, Cyprus</p>
              <p dangerouslySetInnerHTML={createMarkup(t('legalHostingText2'))} />


              <h2>{t('legalIpTitle')}</h2>
              <p>{t('legalIpText1')}</p>
              <p>{t('legalIpText2')}</p>

              <h2>{t('legalLiabilityTitle')}</h2>
              <p>{t('legalLiabilityText1')}</p>
              <p>{t('legalLiabilityText2')}</p>
              <p>{t('legalLiabilityText3')}</p>

              <h2>{t('legalPersonalDataTitle')}</h2>
              <p>
                {t('legalPersonalDataTextPreLink')}
                <Link to={`/${t('privacyPolicyLink')}`} className="text-sky-400 hover:text-sky-300 underline">
                  {t('privacyPolicyLinkText')}
                </Link>
                {t('legalPersonalDataTextPostLink')}
              </p>

              <h2>{t('legalCookiesTitle')}</h2>
              <p>{t('legalCookiesText1')}</p>
              <p>{t('legalCookiesText2')}</p>

              <h2>{t('legalApplicableLawTitle')}</h2>
              <p>{t('legalApplicableLawText')}</p>

              <h2>{t('legalContactTitle')}</h2>
              <p dangerouslySetInnerHTML={createMarkup(t('legalContactText', { email: `<a href="mailto:${editorEmail}">${editorEmail}</a>` }))} />
            </div>
          </section>
        </motion.div>
      );
    };

    export default LegalNoticePage;