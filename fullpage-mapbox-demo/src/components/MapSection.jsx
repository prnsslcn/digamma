import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { usePlace } from '@/context/PlaceContext';
import { motion, AnimatePresence } from 'framer-motion';
import { places } from '../data/placesData';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const markerPlaces = [
  { id: 'seoulPlaza', coords: [126.9779692, 37.566535] },
  { id: 'lotteTower', coords: [127.1025, 37.5131] },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, rotate: -2 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.07,
      type: 'spring',
      stiffness: 80,
      damping: 12,
    },
  }),
  exit: (i) => ({
    opacity: 0,
    y: 20,
    scale: 0.9,
    rotate: 3,
    transition: {
      delay: i * 0.05,
      duration: 0.35,
      ease: 'easeInOut',
    },
  }),
};

export default function MapSection() {
  const mapContainer = useRef(null);
  const { setSelectedPlace } = usePlace();
  const [showFocusCard, setShowFocusCard] = useState(false);
  const [focusedPlace, setFocusedPlace] = useState(null);

  const summary = focusedPlace ? places[focusedPlace] : null;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/minseoks/cm99kn1ni00fl01sx4ygw7kiq',
      center: [126.9779692, 37.566535],
      zoom: 10,
    });

    markerPlaces.forEach((place) => {
      const marker = new mapboxgl.Marker().setLngLat(place.coords).addTo(map);

      marker.getElement().addEventListener('click', () => {
        setSelectedPlace(place.id);
        setFocusedPlace(place.id);
        map.flyTo({ center: place.coords, zoom: 16, pitch: 45, bearing: 45 });
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

      <AnimatePresence>
        {showFocusCard && summary && (
          <motion.div
            className="absolute inset-0 z-20 flex justify-center items-center pointer-events-auto"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10"
              onClick={() => setShowFocusCard(false)}
            />
            <div
              className="relative z-20 flex flex-wrap justify-center items-center gap-4 max-w-5xl w-full px-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 카드 1 */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-4"
                variants={cardVariants}
                custom={0}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -8 }}
              >
                <h3 className="text-xl text-gray-500 mb-1">안녕하세요</h3>
                <p className="text-4xl font-bold text-green-500">더미데이터입니다</p>
              </motion.div>

              {/* 카드 2 */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-4"
                variants={cardVariants}
                custom={1}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -8 }}
              >
                <h3 className="text-xl text-gray-500 mb-1">안녕하세요</h3>
                <p className="text-4xl font-bold text-green-500">얘도 더미데이터</p>
              </motion.div>
              {/* 카드 3 */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-4"
                variants={cardVariants}
                custom={2}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -8 }}
              >
                <h3 className="text-xl text-gray-500 mb-1">안녕하세요</h3>
                <p className="text-4xl font-bold text-green-500">더미데이터입니다</p>
              </motion.div>
              {/* 카드 4 */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-4"
                variants={cardVariants}
                custom={3}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -8 }}
              >
                <h3 className="text-xl text-gray-500 mb-1">{summary.name} 방문자 수</h3>
                <p className="text-5xl font-bold text-gray-900">{summary.todayVisitors.toLocaleString()}명</p>
              </motion.div>

              {/* 카드 5 */}
              <motion.div
                className="bg-red-500 text-white rounded-2xl shadow-lg p-4"
                variants={cardVariants}
                custom={4}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -8 }}
              >
                <h3 className="text-xl font-medium mb-1">행사</h3>
                <ul className="text-2xl space-y-1">
                  {summary.events.map((e, idx) => (
                    <li key={idx}>{e}</li>
                  ))}
                </ul>
              </motion.div>

              {/* 카드 3 */}
              <motion.div
                className="bg-blue-600 text-white w-1/5 rounded-2xl shadow-lg p-4"
                variants={cardVariants}
                custom={2}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -8 }}
              >
                <h3 className="text-xl font-medium mb-1">관심 키워드</h3>
                <div className="flex flex-wrap gap-2">
                  {summary.tags.map((tag) => (
                    <span key={tag} className="bg-white/20 text-white text-l px-3 py-1 rounded-full">#{tag}</span>
                  ))}
                </div>
              </motion.div>

              {/* 카드 4 */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-4"
                variants={cardVariants}
                custom={4}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -8 }}
              >
                <h3 className="text-xl text-gray-500 mb-1">안녕하세요</h3>
                <p className="text-4xl font-bold text-green-500">더미데이터입니다</p>
              </motion.div>

              {/* 카드 5 */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-4"
                variants={cardVariants}
                custom={3}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -8 }}
              >
                <h3 className="text-xl text-gray-500 mb-1">안녕하세요</h3>
                <p className="text-4xl font-bold text-green-500">얘도 더미데이터</p>
              </motion.div>
              {/* 카드 6 */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-4"
                variants={cardVariants}
                custom={4}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -8 }}
              >
                <h3 className="text-xl text-gray-500 mb-1">안녕하세요</h3>
                <p className="text-4xl font-bold text-green-500">더미데이터입니다</p>
              </motion.div>
              {/* 트리거 카드 */}
              <motion.div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFocusCard(false);
                  window.fullpage_api.moveSectionDown();
                }}
                className="cursor-pointer bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center text-4xl font-bold text-indigo-600 hover:bg-indigo-600 hover:text-white"
                variants={cardVariants}
                custom={5}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -8 }}
              >
                자세히 보기  &gt;
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
