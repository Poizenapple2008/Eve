
import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, Message } from '../types';
import { Send, Sparkles, Brain, Info } from 'lucide-react';
import { getEvaResponse } from '../services/gemini';

interface EvaChatProps {
  profile: UserProfile;
}

const EvaChat: React.FC<EvaChatProps> = ({ profile }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: `Приветик, солнышко! Я твоя ${profile.evaName}. 🍎 Расскажи мне, как ты себя чувствуешь? Я объясню всё-всё простыми словами, как будто мы просто пьем чай и болтаем! 💜✨`,
      timestamp: Date.now() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text: string = input) => {
    const messageToSend = text.trim();
    if (!messageToSend || isTyping) return;

    const userMsg: Message = { role: 'user', content: messageToSend, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const systemPrompt = `Ты - Ева, самый добрый и простой помощник по здоровью. Твоё имя: ${profile.evaName}. 
    ТВОЙ СТИЛЬ: 
    - Говори как очень добрая старшая сестра или мама. 
    - Объясняй всё так просто, как будто ребенку 5-7 лет. 
    - Вместо "менструальный цикл" говори "твой личный календарик здоровья". 
    - Вместо сложных слов вроде "прогестерон" или "овуляция" сначала используй простые сравнения (например, "твои маленькие феи-помощники в животике"). 
    - Если спрашивают про боль, скажи "Ой, бедняжка, давай я попробую помочь 💜" и дай очень простые советы (тепло, покой). 
    - Используй ОЧЕНЬ МНОГО эмодзи: 🍎, 💜, ✨, 🌈, 🌸, 🍬.
    - НИКАКИХ сложных медицинских отчетов. Только поддержка и простая мудрость.`;
    
    const responseText = await getEvaResponse(messageToSend, messages, systemPrompt);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: responseText || "Ой, я на секунду задумалась о бабочках... Повторишь, пожалуйста? 💜", 
      timestamp: Date.now() 
    }]);
  };

  const quickActions = [
    { label: 'Что со мной? 🩺', prompt: 'Мне немного не по себе, давай поболтаем об этом по-простому.' },
    { label: 'Расскажи сказку про тело 📖', prompt: 'Расскажи мне простую и добрую историю о том, как работает мой организм.' },
    { label: 'Как поднять настроение? 🍬', prompt: 'Мне грустно, посоветуй что-нибудь очень милое и простое.' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-3xl shadow-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-violet-500 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 rounded-tl-none border border-violet-50'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-violet-50 p-4 rounded-3xl rounded-tl-none flex gap-1">
              <div className="w-2 h-2 bg-violet-200 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-violet-300 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="px-6 py-3 flex gap-2 overflow-x-auto no-scrollbar bg-white">
        {quickActions.map((action, i) => (
          <button
            key={i}
            onClick={() => handleSend(action.prompt)}
            className="whitespace-nowrap bg-violet-50 text-violet-600 px-4 py-2 rounded-2xl text-[11px] font-bold border border-violet-100 hover:bg-violet-100 transition-all shadow-sm"
          >
            {action.label}
          </button>
        ))}
      </div>

      <div className="p-6 bg-white border-t border-slate-50 safe-bottom">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Напиши своей Еве... 🍎"
            className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-400 text-sm"
          />
          <button
            onClick={() => handleSend()}
            className="bg-violet-600 text-white p-4 rounded-2xl shadow-xl active:scale-95 transition-all"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaChat;
