import React from "react";
import { motion } from "framer-motion";
import {
  Info,
  Users,
  Code,
  Database,
  ListChecks,
  Coffee,
  MapPin,
  Languages,
  SearchCheck,
} from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon, title, text, delay }) => {
  const IconComponent = icon;
  return (
    <motion.div
      className="glassmorphism p-6 rounded-xl shadow-lg flex flex-col items-center text-center h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="p-3 bg-sky-500/20 rounded-full mb-4">
        <IconComponent size={32} className="text-sky-400" />
      </div>
      <h3 className="text-xl font-semibold text-sky-300 mb-2">{title}</h3>
      <p className="text-sm text-slate-300 leading-relaxed">{text}</p>
    </motion.div>
  );
};

const AboutPage = () => {
  const { t } = useTranslation();
  const appName = t("appTitle");
  const editorEmail = "mouatakide@gmail.com";

  const createMarkup = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-10 text-slate-200"
    >
      <section className="glassmorphism p-6 sm:p-8 rounded-xl shadow-xl text-center">
        <div className="flex flex-col items-center mb-4">
          <Info size={48} className="text-sky-400 mb-3" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-sky-300">
            {t("aboutPageTitle", { appName })}
          </h1>
        </div>
        <p className="text-md sm:text-lg leading-relaxed max-w-3xl mx-auto">
          {t("aboutIntro", { appName })}
        </p>
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-emerald-300">
          {t("aboutFeaturesTitle")}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <FeatureCard
            icon={MapPin}
            title={t("aboutFeatureMapTitle")}
            text={t("aboutFeatureMapText")}
            delay={0.1}
          />
          <FeatureCard
            icon={SearchCheck}
            title={t("aboutFeatureSearchFilterTitle")}
            text={t("aboutFeatureSearchFilterText")}
            delay={0.2}
          />
          <FeatureCard
            icon={Languages}
            title={t("aboutFeatureLanguagesTitle")}
            text={t("aboutFeatureLanguagesText")}
            delay={0.3}
          />
          <FeatureCard
            icon={Database}
            title={t("aboutFeatureDataSourceTitle")}
            text={t("aboutFeatureDataSourceText")}
            delay={0.4}
          />
          <FeatureCard
            icon={ListChecks}
            title={t("aboutFeatureAccessibilityTitle")}
            text={t("aboutFeatureAccessibilityText")}
            delay={0.5}
          />
          <FeatureCard
            icon={Code}
            title={t("aboutFeatureTechStackTitle")}
            text={t("aboutFeatureTechStackText")}
            delay={0.6}
          />
        </div>
      </section>

      <section className="glassmorphism p-6 sm:p-8 rounded-xl shadow-xl">
        <div className="flex items-center mb-4">
          <Users size={32} className="text-purple-400 mr-3" />
          <h2 className="text-2xl sm:text-3xl font-semibold text-purple-300">
            {t("aboutDataTitle")}
          </h2>
        </div>
        <p className="leading-relaxed mb-2 text-sm sm:text-base">
          {t("aboutDataText")}
        </p>
        <p className="text-xs text-slate-400">{t("aboutDataDisclaimer")}</p>
      </section>

      <section className="glassmorphism p-6 sm:p-8 rounded-xl shadow-xl">
        <div className="flex items-center mb-4">
          <Coffee size={32} className="text-amber-400 mr-3" />
          <h2 className="text-2xl sm:text-3xl font-semibold text-amber-300">
            {t("aboutContactTitle")}
          </h2>
        </div>
        <p
          className="leading-relaxed text-sm sm:text-base"
          dangerouslySetInnerHTML={createMarkup(
            t("aboutContactText", {
              emailLink: `<a href="mailto:${editorEmail}" class="text-sky-400 hover:text-sky-300 underline">${editorEmail}</a>`,
            })
          )}
        />
        <p className="mt-4 text-sm sm:text-base">
          {t("aboutSuggestionsText", { appName: t("appTitle") })}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Link
            to={`/${t("legalNoticeLink")}`}
            className="text-sky-400 hover:text-sky-300 underline"
          >
            {t("legalNoticePageTitle")}
          </Link>
          <Link
            to={`/${t("privacyPolicyLink")}`}
            className="text-sky-400 hover:text-sky-300 underline"
          >
            {t("privacyPolicyPageTitle")}
          </Link>
        </div>
      </section>

      <section className="text-center mt-8">
        <p className="text-slate-400 text-sm">
          {t("aboutDevelopedWithLove", { appName })}
        </p>
      </section>
    </motion.div>
  );
};

export default AboutPage;
