const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// ====================================================
// Function Format Tanggal ke Format Indonesia
// ====================================================
function formatTanggalIndo(isoDate) {
    const bulanIndo = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const date = new Date(isoDate);
    const d = date.getDate();
    const m = bulanIndo[date.getMonth()];
    const y = date.getFullYear();

    return `${d} ${m} ${y}`;
}

// ====================================================
// Generate Data 7 Hari Terakhir
// MODE:
//  - noValue = true  → hanya kirim hari + tanggal
//  - noValue = false → kirim hari + tanggal + value
// ====================================================
function generateActivityData(noValue = false) {
    const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    const today = new Date();
    let activityData = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);

        const isoDate = date.toISOString().split("T")[0];

        activityData.push({
            day: days[date.getDay()],
            date: formatTanggalIndo(isoDate),   // ⬅ format Indonesia
            ...(noValue ? {} : { value: Math.floor(Math.random() * 60) + 20 })
        });
    }

    return activityData;
}

// ====================================================
// Endpoint Dashboard
// ====================================================
app.get('/api/dashboard-data', (req, res) => {

    // Simulasi: jika mau mengirim tanpa value
    const noValue = false; 
    // → ganti ke true kalau ingin tanpa `value`

    const data = {
        learnerType: "Consistent Learner",
        learnerDescription:
            "Kamu belajar dengan konsisten dan terstruktur, menyelesaikan materi secara rutin setiap hari.",
        weeklyProgress: 85,

        // Auto-generate (TERURUT otomatis)
        activityData: generateActivityData(noValue)
    };

    res.json(data);
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
