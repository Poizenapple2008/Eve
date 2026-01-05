
import React, { useState, useMemo } from 'react';
import { ARTICLES } from '../constants';
import { Search, Bookmark, ChevronRight, Book, Sparkles, Filter } from 'lucide-react';

interface LibraryProps {
  ageGroup: 'teen' | 'adult' | 'senior';
}

const Library: React.FC<LibraryProps> = ({ ageGroup }) => {
  const [selectedArticle, setSelectedArticle] = useState<typeof ARTICLES[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(ARTICLES.map(a => a.category));
    return Array.from(cats);
  }, []);

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter(a => {
      const matchesAge = a.ageGroups.includes(ageGroup);
      const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           a.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? a.category === selectedCategory : true;
      return matchesAge && matchesSearch && matchesCategory;
    });
  }, [ageGroup, searchQuery, selectedCategory]);

  if (selectedArticle) {
    return (
      <div className="h-full bg-white animate-in slide-in-from-right duration-300 overflow-y-auto">
        <div className="relative h-72">
          <img 
            src={selectedArticle.illustration} 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />
          <button 
            onClick={() => setSelectedArticle(null)}
            className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl active:scale-90 transition-all"
          >
            <ChevronRight className="rotate-180 text-violet-600" size={24} />
          </button>
        </div>
        
        <div className="p-8 -mt-12 relative bg-white rounded-t-[3rem] space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="bg-violet-100 text-violet-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                {selectedArticle.category}
              </span>
              <h1 className="text-3xl font-black text-slate-800 leading-tight">
                {selectedArticle.title} {selectedArticle.emoji}
              </h1>
            </div>
            <button className="text-violet-200 hover:text-violet-500 transition-colors">
              <Bookmark size={32} />
            </button>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed text-lg font-medium whitespace-pre-line">
              {selectedArticle.content}
            </p>
          </div>

          <div className="bg-violet-50 p-6 rounded-[2rem] border border-violet-100 mt-8">
            <div className="flex items-center gap-3 mb-2 text-violet-700 font-bold">
              <Sparkles size={20} />
              <span>Совет от Евы 🍎</span>
            </div>
            <p className="text-sm text-violet-600/80 leading-relaxed">
              Помни, солнышко: это общие знания. Если ты чувствуешь себя как-то по-особенному плохо, обязательно скажи об этом взрослым или врачу. Мы за тебя болеем! 💜
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-6 space-y-6 bg-white rounded-b-[2.5rem] shadow-sm">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            Твоя Библиотека 🍎✨
          </h1>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Все знания мира в твоем кармане</p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Что хочешь узнать сегодня?" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 p-4 pl-12 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-violet-400 transition-all text-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <button 
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${!selectedCategory ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-400'}`}
          >
            ВСЁ
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-violet-600 text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="text-5xl">🔍</div>
            <p className="text-slate-400 font-bold">Ой, я пока об этом не написала... Попробуй другой поиск! 🍎</p>
          </div>
        ) : (
          filteredArticles.map(article => (
            <button
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="w-full bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 text-left group active:scale-95 transition-all"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                <img src={article.illustration} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-1">
                <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest">{article.category}</span>
                <h3 className="font-bold text-slate-800 flex items-center gap-1 group-hover:text-violet-600 transition-colors">
                  {article.title} <span>{article.emoji}</span>
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {article.content}
                </p>
              </div>
              <ChevronRight className="text-slate-200" size={20} />
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Library;
