import { usePlace } from '@/context/PlaceContext';
import { places } from '@/data/placesData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function About() {
  const { selectedPlace } = usePlace();
  const place = places[selectedPlace];

  if (!place) return <div className="p-8 text-gray-500">정보를 찾을 수 없습니다.</div>;

  return (
    <div className="w-full h-screen bg-gray-100 p-8 grid grid-cols-12 gap-6">
      {/* 장소 정보 카드 */}
      <div className="bg-white rounded-2xl shadow p-6 col-span-3">
        <h2 className="text-xl font-semibold">{place.name}</h2>
        <p className="text-sm text-gray-500">{place.address}</p>
        <p className="text-4xl font-bold mt-4">{place.todayVisitors.toLocaleString()}명</p>
        <p className="text-xs text-gray-400">오늘 방문객</p>
      </div>

      {/* 주간 방문자 추이 */}
      <div className="bg-white rounded-2xl shadow p-6 col-span-6">
        <h2 className="text-xl font-semibold mb-4">주간 방문자 추이</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={place.weeklyStats}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="population" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 행사 */}
      <div className="bg-white rounded-2xl shadow p-6 col-span-3">
        <h2 className="text-xl font-semibold mb-2">진행 중인 행사</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {place.events.map((e, i) => <li key={i} className="text-gray-700">{e}</li>)}
        </ul>
      </div>

      {/* 관심사 */}
      <div className="bg-white rounded-2xl shadow p-6 col-span-4">
        <h2 className="text-xl font-semibold mb-4">추천 관심사</h2>
        <div className="flex flex-wrap gap-2">
          {place.tags.map(tag => (
            <span key={tag} className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">#{tag}</span>
          ))}
        </div>
      </div>

      {/* 대표 이미지 */}
      <div className="col-span-8 overflow-hidden rounded-2xl shadow">
        <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}