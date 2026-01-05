
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ChevronRight, Sparkles } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [evaName, setEvaName] = useState('Ева');
  const [ageGroup, setAgeGroup] = useState<'teen' | 'adult' | 'senior'>('adult');

  const steps = [
    {
      title: "Привет! Я Ева",
      description: "Твой цифровой друг по здоровью. Я не врач, но помогу разобраться в твоем теле.",
      content: (
        <div className="flex flex-col gap-4 mt-8">
          <div className="p-4 bg-violet-50 rounded-2xl text-violet-700 italic border border-violet-100">
            "Как ты хочешь меня называть?"
          </div>
          <input
            type="text"
            placeholder="Имя помощника (например, Луна, Зоя...)"
            value={evaName}
            onChange={(e) => setEvaName(e.target.value)}
            className="p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
          />
        </div>
      )
    },
    {
      title: "Познакомимся?",
      description: "Ты можешь использовать вымышленное имя. Все данные хранятся только на твоем телефоне 🔒",
      content: (
        <div className="flex flex-col gap-4 mt-8">
          <input
            type="text"
            placeholder="Твое имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <div className="grid grid-cols-1 gap-3 mt-4">
            <label className="text-sm font-medium text-slate-500 ml-1">Твой возрастный этап:</label>
            {(['teen', 'adult', 'senior'] as const).map((age) => (
              <button
                key={age}
                onClick={() => setAgeGroup(age)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  ageGroup === age 
                    ? 'border-violet-500 bg-violet-50 text-violet-700 font-semibold' 
                    : 'border-slate-100 hover:border-slate-300'
                }`}
              >
                {age === 'teen' && '13-17 лет (Юность)'}
                {age === 'adult' && '18-25+ лет (Расцвет)'}
                {age === 'senior' && 'Зрелость'}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Твоё пространство",
      description: "Мы здесь, чтобы ты понимала свое тело без стыда и страха 💜",
      content: (
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
            <span className="text-2xl">📱</span>
            <p className="text-sm">Никаких облачных синхронизаций</p>
          </div>
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
            <span className="text-2xl">🌈</span>
            <p className="text-sm">Только научный подход без эвфемизмов</p>
          </div>
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
            <span className="text-2xl">🔒</span>
            <p className="text-sm">Шифрование данных мастер-паролем</p>
          </div>
        </div>
      )
    }
  ];

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete({ name, evaName, ageGroup, isSetupComplete: true });
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col justify-between max-w-md mx-auto">
      <div>
        <div className="flex gap-2 mb-12">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full flex-1 transition-all ${i <= step ? 'bg-violet-500' : 'bg-slate-100'}`} 
            />
          ))}
        </div>
        
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">{steps[step].title}</h1>
          <p className="text-slate-500 leading-relaxed">{steps[step].description}</p>
          {steps[step].content}
        </div>
      </div>

      <button
        onClick={next}
        disabled={step === 1 && !name}
        className="w-full bg-violet-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {step === steps.length - 1 ? 'Готова начать!' : 'Продолжить'}
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Onboarding;
