import React from 'react';
    import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
    import 'leaflet/dist/leaflet.css';
    import L from 'leaflet';
    import { Button } from '@/components/ui/button';
    import { Navigation } from 'lucide-react';
    import { useTranslation } from '@/context/LanguageContext';
    import { isToiletOpenNow } from '@/lib/toiletApi';

    const defaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const pmrIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    
    const userIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const closedIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });


    const ChangeView = ({ center, zoom }) => {
      const map = useMap();
      map.setView(center, zoom);
      return null;
    }

    const ToiletMap = ({ toilets, selectedToilet, userPosition, onOpenDirections }) => {
      const { t } = useTranslation();
      const parisPosition = [48.8566, 2.3522];
      const displayToilets = toilets && toilets.length > 0 ? toilets : [];

      const mapCenter = selectedToilet && selectedToilet.position ? selectedToilet.position : (userPosition || parisPosition);
      const mapZoom = selectedToilet ? 16 : (userPosition ? 14 : 13);

      const getToiletIcon = (toilet) => {
        if (!isToiletOpenNow(toilet.horaire, t)) {
          return closedIcon;
        }
        if (toilet.accessible_pmr) {
          return pmrIcon;
        }
        return defaultIcon;
      };

      return (
        <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} style={{ height: '100%', width: '100%', borderRadius: '16px' }}>
          <ChangeView center={mapCenter} zoom={mapZoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {userPosition && (
            <Marker position={userPosition} icon={userIcon}>
              <Popup>{t('yourPosition')}</Popup>
            </Marker>
          )}
          {displayToilets.map(toilet => (
            <Marker key={toilet.id} position={toilet.position} icon={getToiletIcon(toilet)}>
              <Popup>
                <div className="font-sans max-w-xs">
                  <h3 className="font-bold text-lg text-sky-700 mb-1">{toilet.nom || t('addressNotAvailable')}</h3>
                  <p className="text-sm text-slate-600 mb-0.5"><strong>{t('addressLabel')}:</strong> {toilet.adresse || t('addressNotAvailable')}</p>
                  <p className="text-sm text-slate-600 mb-0.5"><strong>{t('hoursLabel')}:</strong> {toilet.horaire || t('hoursNotSpecified')}</p>
                  <p className="text-sm text-slate-600 mb-1"><strong>{t('arrondissementLabel')}:</strong> {toilet.arrondissement || 'N/A'}</p>
                  {toilet.accessible_pmr && <p className="text-sm text-green-600 font-semibold mb-1">{t('pmrAccessible')}</p>}
                  {!isToiletOpenNow(toilet.horaire, t) && <p className="text-sm text-red-600 font-semibold mb-1">{t('closedStatus')}</p>}
                  <Button 
                    onClick={() => onOpenDirections(toilet)} 
                    variant="default" 
                    size="sm"
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white mt-1"
                  >
                    <Navigation size={16} className="mr-2" />
                    {t('getDirections')}
                  </Button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      );
    };

    export default ToiletMap;