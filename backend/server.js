const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); 
app.use(express.json());

// Endpoint untuk mendapatkan data dashboard
app.get('/api/dashboard-data', (req, res) => {
    // Data yang akan dikirim ke frontend
    const data = {
        learnerType: "Consistent Learner",
        learnerDescription: "Kamu belajar dengan konsisten dan terstruktur, menyelesaikan materi secara rutin setiap hari.",
        weeklyProgress: 85,
        // Data untuk grafik (Aktivitas Belajar 7 Hari Terakhir)
        // Nilai di sini mewakili poin/waktu belajar
        activityData: [
            { day: "Sen", value: 30 },
            { day: "Sel", value: 50 },
            { day: "Rab", value: 50 },
            { day: "Kam", value: 40 },
            { day: "Jum", value: 60 },
            { day: "Sab", value: 45 },
            { day: "Min", value: 80 }
        ]
    };
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});