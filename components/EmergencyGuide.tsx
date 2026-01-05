
import React from 'react';
import { X, Thermometer, Pill, AlertTriangle, MessageSquare } from 'lucide-react';

interface EmergencyGuideProps {
  onClose: () => void;
}

const EmergencyGuide: React.FC<EmergencyGuideProps> = ({ onClose }) => {
  return (
    <div className="min-h-screen bg-rose-50 flex flex-col p-6 animate-in slide-in-from-top duration-300">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-rose-900">Если тебе плохо 🩹</h1>
        <button 
          onClick={onClose}
          className="bg-white/50 p-2 rounded-full text-rose-900"
        >
          <X size={24} />
        </button>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto">
        {/* Section: Now Hurts */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100">
          <div className="flex items-center gap-3 text-rose-600 mb-4">
            <Thermometer size={24} />
            <h3 className="font-bold text-lg">Сейчас болит</h3>
          </div>
          <ul className="space-y-3 text-slate-600 text-sm">
            <li className="flex gap-3">
              <span className="bg-rose-50 text-rose-600 font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">1</span>
              <span>Приложи сухое тепло (грелку) к низу живота на 15-20 минут.</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-rose-50 text-rose-600 font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">2</span>
              <span>Попробуй "позу ребенка" — она помогает расслабить мышцы спины и таза.</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-rose-50 text-rose-600 font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">3</span>
              <span>Пей больше теплой воды или травяного чая.</span>
            </li>
          </ul>
        </div>

        {/* Section: Red Flags */}
        <div className="bg-rose-100 p-6 rounded-3xl border border-rose-200">
          <div className="flex items-center gap-3 text-rose-900 mb-4">
            <AlertTriangle size={24} />
            <h3 className="font-bold text-lg">Когда СРОЧНО к врачу</h3>
          </div>
          <div className="space-y-3 text-rose-900/80 text-sm font-medium">
            <p>🔴 Острая, кинжальная боль, от которой темнеет в глазах</p>
            <p>🔴 Сильное кровотечение (прокладка насквозь меньше чем за час)</p>
            <p>🔴 Повышенная температура тела выше 38°C</p>
            <p>🔴 Сильное головокружение или потеря сознания</p>
          </div>
        </div>

        {/* Section: What to say to Doctor */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100">
          <div className="flex items-center gap-3 text-rose-600 mb-4">
            <MessageSquare size={24} />
            <h3 className="font-bold text-lg">Что сказать врачу</h3>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl italic text-slate-600 text-sm border-l-4 border-rose-400">
            "Доктор, у меня сильная боль внизу живота (опиши характер: ноющая, колющая). Она началась тогда-то, по шкале от 1 до 10 — это примерно 8. Обычные обезболивающие не помогают."
          </div>
        </div>
      </div>

      <div className="py-6 space-y-4">
        <button className="w-full bg-rose-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-rose-200 active:scale-95 transition-all">
          Записать симптомы в дневник
        </button>
        <p className="text-[10px] text-center text-rose-400 uppercase font-black tracking-widest">
          Приложение не является медицинской консультацией
        </p>
      </div>
    </div>
  );
};

export default EmergencyGuide;
