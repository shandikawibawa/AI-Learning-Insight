// src/components/InsightCard.jsx

import React from 'react';
import { Trophy, Zap, Target, TrendingUp, Brain } from 'lucide-react';

// Map ikon (sudah termasuk Brain)
const IconMap = { Trophy, Zap, Target, TrendingUp, Brain };

/**
 * Renders a single AI Insight card using Tailwind CSS classes.
 * Props: { iconName, title, description, color }
 */
const InsightCard = ({ iconName, title, description, color }) => {
  const Icon = IconMap[iconName] || Zap;
  let iconClasses = "";
  let cardClasses = "";

  // Dynamic styling based on card color (Tailwind classes)
  switch (color) {
    case 'yellow':
      iconClasses = "text-yellow-600 border-yellow-200";
      cardClasses = "bg-yellow-50 border-yellow-200"; 
      break;
    case 'purple':
      iconClasses = "text-purple-600 border-purple-200";
      cardClasses = "bg-purple-50 border-purple-200";
      break;
    case 'blue':
      iconClasses = "text-blue-600 border-blue-200";
      cardClasses = "bg-blue-50 border-blue-200";
      break;
    case 'green':
      iconClasses = "text-green-600 border-green-200";
      cardClasses = "bg-green-50 border-green-200";
      break;
    default:
      iconClasses = "text-gray-600 border-gray-200";
      cardClasses = "bg-gray-50 border-gray-200";
  }

  return (
    // Menggunakan flex items-center untuk perataan vertikal
    <div className={`p-4 rounded-xl shadow-md transition duration-300 hover:shadow-lg flex items-center border ${cardClasses}`}>
      
      {/* Ikon */}
      <div className={`p-2 rounded-full mr-4 bg-white bg-opacity-70 border ${iconClasses} flex-shrink-0`}>
        <Icon className="w-6 h-6" />
      </div>
      
      {/* Konten Teks */}
      <div className="flex flex-col">
        <h3 className="text-base font-semibold text-gray-800 mb-1 leading-tight">{title}</h3>
        <p className="text-sm text-gray-600 m-0">{description}</p>
      </div>
    </div>
  );
};

export default InsightCard;