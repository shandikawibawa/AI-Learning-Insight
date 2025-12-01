import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Kartu Tipe Pembelajar
const LearnerCard = ({ type, description, progress }) => (
  <div className="p-6 sm:p-8 bg-blue-600 rounded-2xl shadow-xl text-white w-full max-w-full">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2">
          Tipe Pembelajar : <span className="text-yellow-300">{type}</span>
        </h2>
        <p className="text-sm sm:text-base opacity-90">{description}</p>
      </div>

      <div className="flex flex-row items-center justify-end gap-2 text-right lg:flex-col lg:items-end">
        <p className="text-4xl font-extrabold">{progress}%</p>
        <p className="text-xs opacity-80">Proses Minggu Ini</p>
      </div>

    </div>
  </div>
);

// Grafik Aktivitas Belajar
const ActivityChart = ({ data }) => {
  // Format tanggal hari ini (agar cocok dengan payload.date)
  const todayString = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-xl w-full max-w-full">
      <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 flex items-center">
        🗓️ Aktivitas Belajar 7 Hari Terakhir
      </h3>

      <div className="w-full h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>

            {/* Grid */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />

            <XAxis
              dataKey="day"
              stroke="#555"
              tickLine={false}
              axisLine={false}
              padding={{ left: 10, right: 10 }}
            />

            <YAxis hide={true} domain={["auto", "auto"]} />

            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                padding: "5px",
              }}
              labelFormatter={(label, payload) => {
                if (!payload || !payload[0]) return `Hari: ${label}`;
                const tanggal = payload[0].payload.date;
                return `${label} — ${tanggal}`;
              }}
              formatter={(value) => {
                if (value === undefined) return ["", ""];
                return [`${value} Poin`, "Aktivitas"];
              }}
            />

            {/* --------------------------------------------------- */}
            {/* HIGHLIGHT AREA HARI INI */}
            {/* --------------------------------------------------- */}
            {data.map((entry, index) => {
              const isToday = entry.date === todayString;
              if (!isToday) return null;

              // Lebar rectangle = lebar satu item (dibagi jumlah data)
              const widthPercent = 100 / data.length;

              return (
                <rect
                  key={`highlight-${index}`}
                  x={`${index * widthPercent}%`}
                  width={`${widthPercent}%`}
                  y={0}
                  height="100%"
                  fill="rgba(255, 87, 34, 0.12)" // highlight oranye
                  rx={6}
                />
              );
            })}

            {/* --------------------------------------------------- */}
            {/* LINE + CUSTOM DOT (HARI INI) */}
            {/* --------------------------------------------------- */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#016B61"
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload } = props;

                const isToday =
                  payload.date === todayString;

                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isToday ? 7 : 4}
                    fill={isToday ? "#FF5722" : "#00D4FF"}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                );
              }}
              activeDot={{ r: 10 }}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// ============================
// Komponen Utama
// ============================
function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard-data')
      .then(res => res.json())
      .then(apiData => {
        setData(apiData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal mengambil data:", err);
        setLoading(false);
        setData({
          learnerType: "Gagal Ambil",
          learnerDescription: "Data gagal dimuat dari server.",
          weeklyProgress: 0,
          activityData: []
        });
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600">Memuat data...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-red-600">Terjadi kesalahan saat memuat data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-6">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
        <LearnerCard
          type={data.learnerType}
          description={data.learnerDescription}
          progress={data.weeklyProgress}
        />
        <ActivityChart data={data.activityData} />
      </div>
    </div>
  );
}

export default App;
