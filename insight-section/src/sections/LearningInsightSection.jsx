// src/sections/LearningInsightSection.jsx

import React from 'react';
import { Zap } from 'lucide-react';
import InsightCard from '../components/InsightCard';
import ActionBlock from '../components/ActionBlock';
import MOCK_INSIGHTS from '../mock_data/MOCK_AI_DATA.json';

/**
 * Komponen utama yang memuat data mockup dan merender Insight Section.
 * Menggunakan class Tailwind untuk layout.
 */
const LearningInsightSection = () => {
  const insights = MOCK_INSIGHTS;
  
  return (
    // Menggunakan kelas Tailwind untuk layout utama
    <div className="font-sans p-4 sm:p-8 bg-gray-50 min-h-screen"> 
      <main className="max-w-4xl mx-auto space-y-6 bg-white p-6 rounded-2xl shadow-lg">
        
        {/* --- Bagian Header Insight Pembelajaran AI --- */}
        <section>
          <div className="flex items-center text-2xl font-bold text-gray-800 mb-4">
            <Zap className="w-8 h-8 text-purple-600 mr-3" />
            <span>Insight Pembelajaran AI</span>
          </div>
          
          {/* List kartu insight */}
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <InsightCard 
                key={index}
                iconName={insight.iconName}
                title={insight.title}
                description={insight.description}
                color={insight.color}
              />
            ))}
          </div>
        </section>

        {/* --- Blok Ajakan Bertindak --- */}
        <ActionBlock />

      </main>
    </div>
  );
};

export default LearningInsightSection;