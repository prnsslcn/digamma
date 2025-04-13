import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { usePlace } from '@/context/PlaceContext';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const places = [
  { id: 'seoulPlaza', coords: [126.9779692, 37.566535] },
  { id: 'lotteTower', coords: [127.1025, 37.5131] },
];

export default function MapSection() {
  const mapContainer = useRef(null);
  const { setSelectedPlace } = usePlace();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/minseoks/cm99kn1ni00fl01sx4ygw7kiq',
      center: [126.9779692, 37.566535],
      zoom: 10,
    });

    places.forEach((place) => {
      const marker = new mapboxgl.Marker().setLngLat(place.coords).addTo(map);

      marker.getElement().addEventListener('click', () => {
        setSelectedPlace(place.id);
        map.flyTo({ center: place.coords, zoom: 14 });
        map.once('moveend', () => {
          if (window.fullpage_api) {
            window.fullpage_api.moveSectionDown();
          }
        });
      });
    });

    return () => map.remove();
  }, []);

  return <div className="w-screen h-screen" ref={mapContainer} />;
}