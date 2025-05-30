import React, { useState, useEffect, useMemo, useCallback } from 'react';
    import { motion } from 'framer-motion';
    import { useToast } from "@/components/ui/use-toast";
    import { useTranslation } from '@/context/LanguageContext';
    import { fetchToilets, formatToiletData, isToiletOpenNow } from '@/lib/toiletApi';
    import { getUserLocation } from '@/lib/geolocation';

    import HomePageHeader from '@/components/HomePage/HomePageHeader';
    import SearchAndFilterBar from '@/components/HomePage/SearchAndFilterBar';
    import ToiletsDisplay from '@/components/HomePage/ToiletsDisplay';

    const HomePage = () => {
      const { t, language } = useTranslation();
      const [searchTerm, setSearchTerm] = useState('');
      const [allToilets, setAllToilets] = useState([]);
      const [selectedToilet, setSelectedToilet] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState(null);
      const [userPosition, setUserPosition] = useState(null);
      const { toast } = useToast();

      const [filterPMR, setFilterPMR] = useState(false);
      const [filterOpenNow, setFilterOpenNow] = useState(false);
      const [filterType, setFilterType] = useState(t('filterTypeAll'));
      const [availableTypes, setAvailableTypes] = useState([t('filterTypeAll')]);

      const fetchToiletsDataCallback = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
          const rawToilets = await fetchToilets(language, t);
          const typesFromApi = new Set([t('filterTypeAll')]);
          const formattedToilets = rawToilets.map((record, index) => {
            const ft = formatToiletData(record, t, index);
            if (ft.type && ft.type !== "N/A" && ft.type !== t('filterTypeAll')) typesFromApi.add(ft.type);
            return ft;
          });
          
          setAvailableTypes(Array.from(typesFromApi).sort((a, b) => {
            if (a === t('filterTypeAll')) return -1;
            if (b === t('filterTypeAll')) return 1;
            return a.localeCompare(b, language);
          }));
          setAllToilets(formattedToilets);
          localStorage.setItem(`parisToilets-${language}`, JSON.stringify(formattedToilets));
          if (formattedToilets.length > 0) {
            toast({
              title: t('dataLoadedToastTitle'),
              description: t('dataLoadedToastDescription', { count: formattedToilets.length }),
              className: "bg-green-600 text-white border-green-700",
            });
          }
        } catch (err) {
          console.error("Erreur lors de la récupération des données des toilettes:", err);
          setError(err.message);
          toast({
            title: t('errorLoadingToilets'),
            description: `${t('errorLoadingDescription')} (${err.message})`,
            variant: "destructive",
          });
          const storedToilets = localStorage.getItem(`parisToilets-${language}`);
          if (storedToilets) {
            try {
              const parsedToilets = JSON.parse(storedToilets);
              setAllToilets(parsedToilets);
              const typesFromStorage = new Set([t('filterTypeAll')]);
              parsedToilets.forEach(ft => {
                if (ft.type && ft.type !== "N/A" && ft.type !== t('filterTypeAll')) typesFromStorage.add(ft.type);
              });
              setAvailableTypes(Array.from(typesFromStorage).sort((a, b) => {
                if (a === t('filterTypeAll')) return -1;
                if (b === t('filterTypeAll')) return 1;
                return a.localeCompare(b, language);
              }));

            } catch (parseError) {
              console.error("Erreur de parsing des données localStorage:", parseError);
              setAllToilets([]);
            }
          } else {
            setAllToilets([]);
          }
        } finally {
          setIsLoading(false);
        }
      }, [language, t, toast]);

      useEffect(() => {
        fetchToiletsDataCallback();
      }, [fetchToiletsDataCallback]);


      useEffect(() => {
        getUserLocation(
          (position) => setUserPosition([position.coords.latitude, position.coords.longitude]),
          (geoError) => {
            console.warn("Erreur de géolocalisation: ", geoError);
            toast({
              title: t('geolocationDeniedToastTitle'),
              description: t('geolocationDeniedToastDescription'),
              variant: "default",
              className: "bg-amber-500 text-white border-amber-600"
            });
          }
        );
      }, [toast, t]);

      const filteredToilets = useMemo(() => {
        return allToilets.filter(toilet => {
          const searchMatch = !searchTerm ||
            (toilet.nom && toilet.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (toilet.adresse && toilet.adresse.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (toilet.arrondissement && toilet.arrondissement.toLowerCase().includes(searchTerm.toLowerCase()));

          const pmrMatch = !filterPMR || toilet.accessible_pmr;
          const openNowMatch = !filterOpenNow || isToiletOpenNow(toilet.horaire, t);
          const typeMatch = filterType === t('filterTypeAll') || toilet.type === filterType;
          
          return searchMatch && pmrMatch && openNowMatch && typeMatch;
        });
      }, [searchTerm, allToilets, filterPMR, filterOpenNow, filterType, t]);

      const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
      };

      const handleToiletSelect = (toilet) => {
        setSelectedToilet(toilet);
        toast({
          title: t('toiletSelectedToastTitle'),
          description: `${toilet.nom} - ${toilet.adresse}`,
          className: "bg-sky-600 text-white border-sky-700",
        });
      };

      const openDirections = (toilet) => {
        if (!toilet || !toilet.position) return;
        const [lat, lon] = toilet.position;
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        
        let url;
        if (isIOS) {
          url = `maps://?daddr=${lat},${lon}&dirflg=w`;
        } else {
          url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=walking`;
        }
        
        if (userPosition) {
          const [userLat, userLon] = userPosition;
          if (isIOS) {
            url = `maps://?saddr=${userLat},${userLon}&daddr=${lat},${lon}&dirflg=w`;
          } else {
            url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${lat},${lon}&travelmode=walking`;
          }
        }
        window.open(url, '_blank');
      };

      const resetFilters = () => {
        setFilterPMR(false);
        setFilterOpenNow(false);
        setFilterType(t('filterTypeAll'));
        setSearchTerm('');
        toast({
          title: t('filtersResetToastTitle'),
          description: t('filtersResetToastDescription'),
          className: "bg-sky-600 text-white border-sky-700",
        });
      };
      
      useEffect(() => {
        if (!availableTypes.includes(filterType) && availableTypes.length > 0) {
            setFilterType(t('filterTypeAll'));
        }
      }, [availableTypes, filterType, t]);


      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 sm:space-y-8"
        >
          <HomePageHeader t={t} />
          <SearchAndFilterBar 
            t={t} 
            searchTerm={searchTerm} 
            handleSearchChange={handleSearchChange}
            filterPMR={filterPMR}
            setFilterPMR={setFilterPMR}
            filterOpenNow={filterOpenNow}
            setFilterOpenNow={setFilterOpenNow}
            filterType={filterType}
            setFilterType={setFilterType}
            availableTypes={availableTypes}
            resetFilters={resetFilters}
          />
          <ToiletsDisplay
            t={t}
            isLoading={isLoading}
            error={error}
            fetchToiletsDataCallback={fetchToiletsDataCallback}
            filteredToilets={filteredToilets}
            selectedToilet={selectedToilet}
            userPosition={userPosition}
            openDirections={openDirections}
            handleToiletSelect={handleToiletSelect}
            searchTerm={searchTerm}
            filterPMR={filterPMR}
            filterOpenNow={filterOpenNow}
            filterType={filterType}
          />
        </motion.div>
      );
    };

    export default HomePage;