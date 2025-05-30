const PARIS_OPENDATA_API_URL_BASE = "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/sanisettesparis/records";

    export const fetchToilets = async (language, t) => {
      const langParam = language; 
      const apiUrl = `${PARIS_OPENDATA_API_URL_BASE}?limit=100&lang=${langParam}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`${t('errorApi')} ${response.status}`);
      }
      const data = await response.json();
      return data.results;
    };
    
    export const formatToiletData = (record, t, index) => {
      let adresse = t('addressNotAvailable');
      if (record.adresse) { 
        adresse = record.adresse;
      } else if (record.nom_voie) { 
        adresse = `${record.num_voie || ''} ${record.nom_voie}`.trim();
      }
    
      let horaire = record.horaire || record.horaires_ouverture || t('hoursNotSpecified');
      if (horaire && typeof horaire === 'string') {
        if (horaire.toLowerCase().includes("24h/24") || horaire.toLowerCase().includes("24 h / 24")) {
            horaire = t('hours247');
        } else if (horaire.includes(" - ")) {
          // Keep formats like "06h00 - 22h00"
        } else if (!horaire.trim() || horaire.toLowerCase() === "non communiqué" || horaire.toLowerCase() === "non specifie") {
          horaire = t('hoursNotSpecified');
        }
      } else {
          horaire = t('hoursNotSpecified');
      }
      
      let typeToilette = record.type || "Sanisette"; 
      if (record.libelle_type_sanisette) {
          typeToilette = record.libelle_type_sanisette;
      }
      // Normalize common urinal types
      if (typeToilette.toLowerCase().includes('urinoir') || typeToilette.toLowerCase().includes('pissoir')) {
        typeToilette = t('toiletTypeUrinal'); // Use a generic "Urinal" term from translations
      } else if (typeToilette.toLowerCase().includes('sanisette')) {
        typeToilette = t('toiletTypeSanisette');
      } else if (typeToilette.toLowerCase().includes('toilette publique à entretien automatique')) {
        typeToilette = t('toiletTypeAutomatic');
      } else if (typeToilette.toLowerCase().includes('lavatory') || typeToilette.toLowerCase().includes('wc')) {
        typeToilette = t('toiletTypeStandard');
      }
      // Add more normalization if needed based on API data
    
      return {
        id: record.gid || record.objectid || `api-${index || Math.random().toString(36).substring(7)}`,
        nom: record.type ? `${record.type} ${record.nom_voie || record.adresse || ''}`.trim() : `Sanisette ${record.arrondissement || ''}`,
        adresse: adresse,
        horaire: horaire,
        arrondissement: record.arrondissement ? record.arrondissement.replace(/EME ARRONDISSEMENT/gi, 'ème').replace(/ER ARRONDISSEMENT/gi, 'er') : "N/A",
        position: record.geo_point_2d ? [record.geo_point_2d.lat, record.geo_point_2d.lon] : (record.geom?.geometry?.coordinates ? [record.geom.geometry.coordinates[1], record.geom.geometry.coordinates[0]] : [48.8566, 2.3522]),
        accessible_pmr: record.acces_pmr === "Oui" || record.accessibilite_pmr === "Oui" || record.pmr === "Oui",
        type: typeToilette,
        source_id: record.source_id
      };
    };
    
    export const isToiletOpenNow = (horaire, t) => {
        if (!horaire || horaire === t('hoursNotSpecified') || horaire === t('hoursNotCommunicated')) return false; 
        if (horaire === t('hours247')) return true;
    
        try {
          const now = new Date();
          const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
    
          const parts = horaire.split(' - ');
          if (parts.length !== 2) return false; 
    
          const [startStr, endStr] = parts;
          const parseTime = (timeStr) => {
            const normalizedTimeStr = timeStr.replace(/\s/g, '').toLowerCase();
            const [h, m] = normalizedTimeStr.replace('h', ':').split(':').map(Number);
            if (isNaN(h) || isNaN(m)) throw new Error("Invalid time string component");
            return h * 60 + m;
          };
    
          const startMinutes = parseTime(startStr);
          let endMinutes = parseTime(endStr);
    
          if (endMinutes === 0 && startMinutes > 0) endMinutes = 24 * 60; 
    
          if (endMinutes < startMinutes) { 
              return currentTimeInMinutes >= startMinutes || currentTimeInMinutes < endMinutes;
          } else { 
              return currentTimeInMinutes >= startMinutes && currentTimeInMinutes < endMinutes;
          }
        } catch (e) {
          console.warn("Warning: Error parsing toilet hours:", horaire, e.message);
          return false; 
        }
    };