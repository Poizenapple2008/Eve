
import React from 'react';
import { Home, MessageCircle, Calendar, BookOpen } from 'lucide-react';

interface NavigationProps {
  activeTab: 'home' | 'chat' | 'tracker' | 'library';
  setActiveTab: (tab: 'home' | 'chat' | 'tracker' | 'library') => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Главная' },
    { id: 'chat', icon: MessageCircle, label: 'Ева' },
    { id: 'tracker', icon: Calendar, label: 'Трекер' },
    { id: 'library', icon: BookOpen, label: 'Знания' },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center safe-bottom z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-violet-600' : 'text-slate-400'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium uppercase tracking-wider">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;
