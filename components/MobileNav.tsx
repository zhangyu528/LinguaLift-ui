import React from 'react';
import { Home, BookOpen, User } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50 safe-area-pb">
      <button 
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-brand-600' : 'text-gray-400'}`}
      >
        <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
        <span className="text-[10px] font-medium">Home</span>
      </button>
      
      <button 
        onClick={() => onTabChange('lessons')}
        className={`flex flex-col items-center gap-1 ${activeTab === 'lessons' ? 'text-brand-600' : 'text-gray-400'}`}
      >
        <BookOpen size={24} strokeWidth={activeTab === 'lessons' ? 2.5 : 2} />
        <span className="text-[10px] font-medium">Lessons</span>
      </button>
      
      <button 
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-brand-600' : 'text-gray-400'}`}
      >
        <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
        <span className="text-[10px] font-medium">Profile</span>
      </button>
    </div>
  );
};

export default MobileNav;