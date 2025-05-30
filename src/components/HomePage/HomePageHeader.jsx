import React from 'react';
    import { motion } from 'framer-motion';

    const HomePageHeader = ({ t }) => (
      <section className="text-center py-8 sm:py-12 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xl shadow-2xl p-6 sm:p-8">
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t('homePageTitle')}
        </motion.h1>
        <motion.p 
          className="text-md sm:text-lg md:text-xl text-sky-100 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {t('homePageSubtitle')}
        </motion.p>
      </section>
    );

    export default HomePageHeader;