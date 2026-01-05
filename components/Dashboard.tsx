
import React from 'react';
import { UserProfile, SymptomEntry } from '../types';
import { AlertCircle, Sparkles, Heart, Battery, Zap } from 'lucide-react';
import { RITUALS } from '../constants';

interface DashboardProps {
  profile: UserProfile;
  onEmergencyClick: () => void;
  history: SymptomEntry[];
}

const Dashboard: React.FC<DashboardProps> = ({ profile, onEmergencyClick, history }) => {
  const latestLog = history[0];
  const ritualOfTheDay = RITUALS[new Date().getDay() % RITUALS.length];

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Привет, {profile.name || 'цветочек'}! 🌸</h1>
          <p className="text-slate-400 text-xs">Как твоё настроение?</p>
        </div>
        <button 
          onClick={onEmergencyClick}
          className="bg-rose-500 text-white px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-black shadow-lg shadow-rose-100 active:scale-95 transition-all"
        >
          <AlertCircle size={16} />
          <span>БОЛИТ</span>
        </button>
      </div>

      {/* Cycle Widget */}
      <div className="bg-gradient-to-br from-violet-600 to-fuchsia-500 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 text-center">
          <p className="text-sm font-medium opacity-80 mb-2 tracking-widest">ТВОЙ ДЕНЬ</p>
          <h2 className="text-7xl font-black mb-4">12</h2>
          <div className="bg-white/20 backdrop-blur-lg rounded-full px-6 py-2 inline-flex items-center gap-2">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Время сиять! ✨</span>
          </div>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-fuchsia-400/30 rounded-full blur-2xl" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-violet-50 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-amber-400">
            <Zap size={18} fill="currentColor" />
            <span className="text-[10px] font-black uppercase tracking-widest">Энергия</span>
          </div>
          <p className="text-base font-bold text-slate-700">
            {latestLog?.energy === 'high' ? 'Полный заряд! ⚡' : 'Всё хорошо 🔋'}
          </p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-violet-50 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-rose-400">
            <Heart size={18} fill="currentColor" />
            <span className="text-[10px] font-black uppercase tracking-widest">Сердечко</span>
          </div>
          <p className="text-base font-bold text-slate-700">Бьется ровно 💗</p>
        </div>
      </div>

      {/* Ritual */}
      <div className="bg-emerald-50/50 border border-emerald-100/50 p-6 rounded-[2rem] flex items-center gap-5">
        <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm">
          {ritualOfTheDay.emoji}
        </div>
        <div className="flex-1">
          <h4 className="font-black text-emerald-900 text-sm uppercase tracking-wider">{ritualOfTheDay.title}</h4>
          <p className="text-xs text-emerald-700/70 mt-1">Очень полезно для тебя 🌿</p>
        </div>
      </div>

      {/* Eva Tip */}
      <div className="bg-violet-50 p-6 rounded-[2rem] border border-violet-100 flex gap-4 items-start">
        <span className="text-2xl">🍎</span>
        <p className="text-xs text-violet-800 leading-relaxed italic">
          "{profile.evaName} говорит: Ты сегодня просто чудо! Не забудь выпить стакан чистой водички, чтобы твои феи-помощники в теле радовались 💜"
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
