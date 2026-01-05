
import React, { useState } from 'react';
import { SymptomEntry } from '../types';
import { Battery, Heart, Brain, Activity, Plus, Check, Droplets } from 'lucide-react';
import { EMOTIONS, SYMPTOMS } from '../constants';

interface TrackerProps {
  history: SymptomEntry[];
  onLog: (entry: SymptomEntry) => void;
}

const Tracker: React.FC<TrackerProps> = ({ history, onLog }) => {
  const [isLogging, setIsLogging] = useState(false);
  const [energy, setEnergy] = useState<'high' | 'low' | 'neutral'>('neutral');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isPeriod, setIsPeriod] = useState(false);

  const handleSave = () => {
    onLog({
      date: new Date().toISOString(),
      energy,
      emotions: selectedEmotions,
      symptoms: selectedSymptoms,
      periodStart: isPeriod,
      activity: []
    });
    setIsLogging(false);
    setEnergy('neutral');
    setSelectedEmotions([]);
    setSelectedSymptoms([]);
    setIsPeriod(false);
  };

  const toggleItem = (list: string[], setList: (l: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <div className="p-6 pb-24 space-y-8 h-screen overflow-y-auto bg-slate-50">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Мой дневник 🗓️💜</h1>
        {!isLogging && (
          <button 
            onClick={() => setIsLogging(true)}
            className="bg-violet-600 text-white p-3 rounded-2xl shadow-lg shadow-violet-200 active:scale-95 transition-all"
          >
            <Plus size={24} />
          </button>
        )}
      </div>

      {isLogging ? (
        <div className="bg-white rounded-3xl p-6 border border-violet-100 shadow-xl space-y-8 animate-in fade-in slide-in-from-bottom-4">
          
          <section className="space-y-4">
            <h3 className="font-bold flex items-center gap-2 text-slate-800">Менструация 🩸</h3>
            <button
              onClick={() => setIsPeriod(!isPeriod)}
              className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 font-bold ${
                isPeriod 
                  ? 'bg-rose-50 border-rose-500 text-rose-600' 
                  : 'bg-slate-50 border-slate-100 text-slate-400'
              }`}
            >
              <Droplets size={20} fill={isPeriod ? "currentColor" : "none"} />
              {isPeriod ? 'Сегодня идет кровь' : 'Сегодня без выделений'}
            </button>
          </section>

          <section className="space-y-4">
            <h3 className="font-bold flex items-center gap-2 text-slate-800">Энергия ⚡</h3>
            <div className="flex gap-2">
              {(['low', 'neutral', 'high'] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setEnergy(lvl)}
                  className={`flex-1 p-3 rounded-xl border-2 transition-all text-sm font-bold ${
                    energy === lvl ? 'bg-violet-600 text-white border-violet-600' : 'bg-slate-50 border-slate-100 text-slate-500'
                  }`}
                >
                  {lvl === 'low' && 'Низкая'}
                  {lvl === 'neutral' && 'Обычная'}
                  {lvl === 'high' && 'Зашкаливает'}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="font-bold flex items-center gap-2 text-slate-800">Эмоции 😊🌈</h3>
            <div className="grid grid-cols-3 gap-2">
              {EMOTIONS.map(emo => (
                <button
                  key={emo.label}
                  onClick={() => toggleItem(selectedEmotions, setSelectedEmotions, emo.label)}
                  className={`p-3 rounded-xl border-2 text-[10px] font-bold transition-all ${
                    selectedEmotions.includes(emo.label) 
                      ? 'bg-violet-50 border-violet-500 text-violet-700' 
                      : 'bg-slate-50 border-slate-100 text-slate-500'
                  }`}
                >
                  <span className="text-xl block mb-1">{emo.emoji}</span>
                  {emo.label.toUpperCase()}
                </button>
              ))}
            </div>
          </section>

          <div className="flex gap-3 pt-4">
            <button 
              onClick={() => setIsLogging(false)}
              className="flex-1 py-4 rounded-2xl font-bold text-slate-400 bg-slate-100"
            >
              Отмена
            </button>
            <button 
              onClick={handleSave}
              className="flex-[2] py-4 rounded-2xl font-bold text-white bg-violet-600 shadow-lg shadow-violet-200"
            >
              Сохранить 💜
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="p-16 text-center space-y-4">
              <div className="text-7xl opacity-50">📝</div>
              <p className="text-slate-400 font-medium">Твой дневник ждет первых записей. <br/>Нажми на плюс выше!</p>
            </div>
          ) : (
            history.map((entry, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                {entry.periodStart && (
                  <div className="absolute top-0 right-0 w-2 h-full bg-rose-400" />
                )}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-300 uppercase tracking-tighter">
                      {new Date(entry.date).toLocaleDateString('ru-RU', { weekday: 'long' })}
                    </span>
                    <span className="text-lg font-bold text-slate-800">
                      {new Date(entry.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                    </span>
                  </div>
                  {entry.periodStart && (
                    <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                      🩸 Менструация
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-amber-50 text-amber-700 px-3 py-1 rounded-full font-bold border border-amber-100">
                    ⚡ {entry.energy === 'high' ? 'Много энергии' : entry.energy === 'low' ? 'Мало сил' : 'В норме'}
                  </span>
                  {entry.emotions.map(e => (
                    <span key={e} className="text-xs bg-violet-50 text-violet-700 px-3 py-1 rounded-full font-bold border border-violet-100">
                      {EMOTIONS.find(em => em.label === e)?.emoji} {e}
                    </span>
                  ))}
                  {entry.symptoms.map(s => (
                    <span key={s} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-bold">
                      {SYMPTOMS.find(sm => sm.label === s)?.emoji} {s}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Tracker;
