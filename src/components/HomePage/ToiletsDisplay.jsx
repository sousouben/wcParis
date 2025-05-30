import React from 'react';
    import { motion } from 'framer-motion';
    import { Loader2 } from 'lucide-react';
    import ToiletMap from '@/components/ToiletMap';
    import ToiletListItem from '@/components/HomePage/ToiletListItem';
    import { Button } from '@/components/ui/button';

    const ToiletsDisplay = ({ 
        t, 
        isLoading, 
        error, 
        fetchToiletsDataCallback, 
        filteredToilets, 
        selectedToilet, 
        userPosition, 
        openDirections, 
        handleToiletSelect,
        searchTerm, filterPMR, filterOpenNow, filterType
    }) => {
      if (isLoading) {
        return (
          <div className="flex flex-col items-center justify-center p-10 glassmorphism rounded-lg h-64">
            <Loader2 className="h-12 w-12 animate-spin text-sky-400 mb-4" />
            <p className="text-slate-300 text-lg">{t('loadingToilets')}</p>
          </div>
        );
      }

      if (error && !isLoading) {
        return (
           <div className="flex flex-col items-center justify-center p-10 bg-red-500/20 glassmorphism rounded-lg border border-red-500 h-64">
            <p className="text-red-400 text-lg font-semibold">{t('errorLoadingToilets')}</p>
            <p className="text-slate-300 text-center">{t('errorLoadingDescription')} <br/> ({error})</p>
            <Button onClick={fetchToiletsDataCallback} className="mt-4 bg-sky-500 hover:bg-sky-600 text-white">
              {t('tryAgainButton')}
            </Button>
          </div>
        );
      }

      return (
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <motion.div 
            className="lg:col-span-2 glassmorphism p-1 md:p-2 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ToiletMap toilets={filteredToilets} selectedToilet={selectedToilet} userPosition={userPosition} onOpenDirections={openDirections} />
          </motion.div>

          <motion.div 
            className="lg:col-span-1 glassmorphism p-4 sm:p-6 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] max-h-[500px] overflow-y-auto rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-3 sm:mb-4 sticky top-0 bg-slate-800/80 backdrop-blur-sm py-2 z-10">
              {t('toiletsListTitle')} ({filteredToilets.length})
            </h2>
            {filteredToilets.length > 0 ? (
              <ul className="space-y-3">
                {filteredToilets.map(toilet => (
                  <ToiletListItem 
                    key={toilet.id} 
                    toilet={toilet}
                    t={t}
                    selectedToilet={selectedToilet}
                    handleToiletSelect={handleToiletSelect}
                    openDirections={openDirections}
                  />
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 text-center py-10">
                {searchTerm || filterPMR || filterOpenNow || filterType !== t('filterTypeAll') ? t('noToiletsFoundSearchFilters') : t('noToiletsFound')}
              </p>
            )}
          </motion.div>
        </div>
      );
    };

    export default ToiletsDisplay;