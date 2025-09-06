import React from 'react';

interface BadgeLevel {
  id: string;
  label: string;
  letter: string;
  color: string;
  textColor: string;
  pointRange: string;
}

const BADGE_LEVELS: BadgeLevel[] = [
  {
    id: 'bronze',
    label: 'Bronze',
    letter: 'B',
    color: 'from-amber-600 to-amber-800',
    textColor: 'text-amber-700',
    pointRange: '10-50 pts'
  },
  {
    id: 'silver',
    label: 'Silver',
    letter: 'S',
    color: 'from-gray-400 to-gray-600',
    textColor: 'text-gray-700',
    pointRange: '100-200 pts'
  },
  {
    id: 'gold',
    label: 'Gold',
    letter: 'G',
    color: 'from-yellow-500 to-yellow-700',
    textColor: 'text-yellow-700',
    pointRange: '250-500 pts'
  },
  {
    id: 'platinum',
    label: 'Platinum',
    letter: 'P',
    color: 'from-purple-500 to-purple-700',
    textColor: 'text-purple-700',
    pointRange: '1000+ pts'
  },
  {
    id: 'diamond',
    label: 'Diamond',
    letter: 'D',
    color: 'from-blue-500 to-blue-700',
    textColor: 'text-blue-700',
    pointRange: '5000+ pts'
  }
];

export const BadgeLevelGuide: React.FC = () => {
  return (
    <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
      <h3 className="text-lg font-semibold text-green-800 mb-4">🏆 Badge Levels</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {BADGE_LEVELS.map((level) => (
          <div key={level.id} className="text-center">
            <div className={`w-12 h-12 bg-gradient-to-br ${level.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
              <span className="text-white font-bold text-sm">{level.letter}</span>
            </div>
            <p className={`text-xs font-medium ${level.textColor}`}>{level.label}</p>
            <p className={`text-xs ${level.textColor.replace('700', '600')}`}>{level.pointRange}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
