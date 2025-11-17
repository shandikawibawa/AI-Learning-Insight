import React from 'react';

/**
 * Renders the static "Siap Melanjutkan Pembelajaran?" action block using Tailwind CSS.
 */
const ActionBlock = () => (
    // Menambahkan margin-top agar tidak menempel dengan kartu di atasnya
    <div className="rounded-2xl overflow-hidden shadow-xl mt-6">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Siap Melanjutkan Pembelajaran?</h2>
            <p className="text-sm opacity-90 mb-6">Berdasarkan pola belajarmu, sekarang adalah waktu terbaik untuk belajar!</p>
            <button className="bg-white text-blue-700 font-bold py-2 px-6 rounded-full shadow-lg hover:bg-gray-100 transition duration-200 text-sm">
                Lanjut Belajar
            </button>
        </div>
    </div>
);

export default ActionBlock;