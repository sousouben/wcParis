import React from 'react';
    import { MapPin as MapPinIcon, Clock, Accessibility, Navigation, Building2 } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { isToiletOpenNow } from '@/lib/toiletApi';

    const ToiletListItem = ({ toilet, t, selectedToilet, handleToiletSelect, openDirections }) => {
      const isOpen = isToiletOpenNow(toilet.horaire, t);
      return (
        <li 
          className={`p-3 sm:p-4 rounded-lg shadow-md hover:shadow-sky-400/50 transition-all cursor-pointer border
            ${selectedToilet && selectedToilet.id === toilet.id ? 'bg-sky-700/30 border-sky-500' : 'bg-slate-700/40 border-slate-600 hover:border-sky-600'}`}
          onClick={() => handleToiletSelect(toilet)}
        >
          <h3 className="font-semibold text-sky-300 text-md sm:text-lg">{toilet.nom}</h3>
          <p className="text-xs sm:text-sm text-slate-300 flex items-center mt-0.5">
            <MapPinIcon size={14} className="mr-1.5 text-rose-400 flex-shrink-0" /> {toilet.adresse}
          </p>
          <p className="text-xs sm:text-sm text-slate-400">{t('arrondissementLabel')}: {toilet.arrondissement}</p>
          <div className="flex flex-wrap items-center mt-1.5 text-xs text-slate-400 gap-x-2 gap-y-1 sm:gap-x-3">
            <span className={`flex items-center ${isOpen ? '' : 'text-red-400'}`}>
              <Clock size={12} className={`mr-1 flex-shrink-0 ${isOpen ? 'text-amber-400' : 'text-red-400'}`} /> {toilet.horaire}
            </span>
            {toilet.accessible_pmr && (
              <span className="flex items-center text-green-400 font-medium">
                <Accessibility size={14} className="mr-0.5 sm:mr-1 flex-shrink-0" /> {t('pmrAccessibleShort')}
              </span>
            )}
             <span className="flex items-center text-indigo-400">
                <Building2 size={12} className="mr-1 text-indigo-400 flex-shrink-0" /> {toilet.type || 'N/A'}
              </span>
          </div>
          <Button 
              onClick={(e) => { e.stopPropagation(); openDirections(toilet); }} 
              variant="link" 
              size="sm"
              className="text-sky-400 hover:text-sky-300 p-0 h-auto mt-2 flex items-center text-xs sm:text-sm"
          >
              <Navigation size={14} className="mr-1 flex-shrink-0" /> {t('getDirections')}
          </Button>
        </li>
      );
    };
    export default ToiletListItem;