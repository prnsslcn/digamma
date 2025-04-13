import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { usePlace } from '@/context/PlaceContext';
import { places as placesData } from '@/data/placesData';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const places = [
  { id: 'seoulPlaza', coords: [126.9779692, 37.566535] },
  { id: 'lotteTower', coords: [127.1025, 37.5131] },
];

export default function MapSection() {
  const mapContainer = useRef(null);
  const { setSelectedPlace } = usePlace();
  const [showFocusCard, setShowFocusCard] = useState(false);
  const [focusedPlace, setFocusedPlace] = useState(null);

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
        setFocusedPlace(place.id);
        map.flyTo({ center: place.coords, zoom: 14 });
        map.once('moveend', () => {
          setShowFocusCard(true);
        });
      });
    });

    return () => map.remove();
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <div className="w-full h-full" ref={mapContainer} />

      {showFocusCard && focusedPlace && (
        <>
          {/* 블러 배경 */}
          <div
            className="absolute inset-0 bg-white/30 backdrop-blur-sm z-10"
            onClick={() => setShowFocusCard(false)}
          />

          {/* 카드 컨테이너 */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="grid grid-cols-2 gap-6 max-w-5xl w-full px-6 pointer-events-auto">
              {/* 카드 1 */}
              <div className="bg-white/90 rounded-2xl shadow-lg p-4">
                <h3 className="text-lg font-semibold mb-2">오늘 방문자</h3>
                <p className="text-3xl font-bold">28,900명</p>
              </div>
              {/* 카드 2 */}
              <div className="bg-white/90 rounded-2xl shadow-lg p-4">
                <h3 className="text-lg font-semibold mb-2">행사</h3>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  <li>봄꽃 페스티벌</li>
                  <li>야외 음악회</li>
                </ul>
              </div>
              {/* 카드 3 */}
              <div className="bg-white/90 rounded-2xl shadow-lg p-4">
                <h3 className="text-lg font-semibold mb-2">주간 방문 추이</h3>
                <p className="text-sm text-gray-600">월~일 트렌드 데이터</p>
              </div>
              {/* 카드 4 */}
              <div className="bg-white/90 rounded-2xl shadow-lg p-4">
                <h3 className="text-lg font-semibold mb-2">추천 관심사</h3>
                <div className="flex flex-wrap gap-2">
                  {['전시', '공연', '야경', '건축'].map((tag) => (
                    <span key={tag} className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 자세히 보기 버튼 (카드처럼 스타일 적용) */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
            <div className="bg-white/90 rounded-2xl shadow-lg p-4">
              <button
                className="px-6 py-3 text-base font-semibold text-indigo-600 hover:text-white hover:bg-indigo-600 rounded-xl transition"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFocusCard(false);
                  window.fullpage_api.moveSectionDown();
                }}
              >
                자세히 보기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
