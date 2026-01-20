
import React from 'react';

interface FeatureCardProps {
  icon?: React.ReactNode;
  customVisual?: React.ReactNode;
  title: string;
  subtitle: string;
  badgeCount?: number;
  ctaText: string;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, customVisual, title, subtitle, badgeCount, ctaText, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-all duration-300 relative group overflow-hidden ${onClick ? 'cursor-pointer hover:-translate-y-1' : ''}`}
    >
      {badgeCount && (
        <div className="absolute top-6 right-8 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm group-hover:scale-110 transition-transform z-10">
          {badgeCount}
        </div>
      )}
      
      <div className="mb-6 w-full flex justify-center min-h-[48px]">
        {customVisual ? customVisual : (
          <div className="text-gray-700">
            {icon}
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">
        {title}
      </h3>
      
      <p className="text-sm text-gray-500 mb-8 font-medium">
        {subtitle}
      </p>
      
      <button className="text-sm font-semibold text-gray-400 hover:text-brand-600 transition-colors mt-auto">
        {ctaText}
      </button>
    </div>
  );
};

export default FeatureCard;
