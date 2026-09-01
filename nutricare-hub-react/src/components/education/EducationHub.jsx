import React, { useState } from 'react';
import { ARTICLES_DATA } from '../../data/articlesData';
import { BookOpen, Clock, Calendar, ArrowRight, Sparkles, User, Tag } from 'lucide-react';

export default function EducationHub() {
  const [selectedTopic, setSelectedTopic] = useState('All');

  const topics = ['All', 'Metabolic Science', 'Gut Health', 'Sports Nutrition', 'Micronutrients'];

  const filteredArticles = ARTICLES_DATA.filter(article => {
    if (selectedTopic === 'All') return true;
    return article.category === selectedTopic;
  });

  return (
    <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-container/20 text-on-primary-container font-semibold text-xs uppercase tracking-wider mb-4 border border-primary-container/30">
          <BookOpen className="w-3.5 h-3.5 text-primary" />
          <span>Evidence-Based Nutrition Science</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-on-surface mb-3">
          Food & Nutrition Education
        </h1>
        <p className="text-base text-on-surface-variant">
          Clinical articles, biochemical insights, and practical guides written by our board-certified dietitians.
        </p>
      </div>

      {/* Topics Filter */}
      <div className="flex gap-2 overflow-x-auto justify-start md:justify-center mb-10 pb-2 scrollbar-none">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedTopic === topic
                ? 'bg-primary-container text-on-primary-container font-bold shadow-xs'
                : 'bg-surface border border-surface-container hover:bg-surface-container-low text-on-surface'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Featured Article Card */}
      {filteredArticles.length > 0 && (
        <div className="glass-card rounded-2xl overflow-hidden border border-surface-container shadow-ambient-md mb-10 grid grid-cols-1 lg:grid-cols-12 gap-0 group">
          <div className="lg:col-span-7 h-64 lg:h-auto overflow-hidden relative">
            <img
              src={filteredArticles[0].image}
              alt={filteredArticles[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-primary-container text-on-primary-container text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
              Featured Research
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium mb-3">
                <span className="text-secondary font-bold uppercase tracking-wider">
                  {filteredArticles[0].category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  {filteredArticles[0].readTime}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                {filteredArticles[0].title}
              </h2>

              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                {filteredArticles[0].summary}
              </p>
            </div>

            <div className="pt-4 border-t border-surface-container flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center font-bold text-xs">
                  SJ
                </div>
                <span className="text-xs font-bold text-on-surface">{filteredArticles[0].author}</span>
              </div>

              <button className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer">
                <span>Read Full Paper</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Remaining Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            className="glass-card rounded-2xl overflow-hidden border border-surface-container hover-lift flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="h-48 w-full overflow-hidden relative">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-on-surface">
                  {art.category}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-[11px] text-on-surface-variant font-medium mb-2">
                  <Clock className="w-3 h-3 text-primary" />
                  <span>{art.readTime}</span>
                  <span>•</span>
                  <span>{art.date}</span>
                </div>

                <h3 className="text-base font-bold text-on-surface mb-2 line-clamp-2 hover:text-primary transition-colors">
                  {art.title}
                </h3>

                <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed mb-4">
                  {art.summary}
                </p>
              </div>
            </div>

            <div className="px-5 py-3.5 bg-surface-container-low border-t border-surface-container flex items-center justify-between text-xs font-semibold text-primary">
              <span className="text-on-surface-variant text-[11px]">{art.author}</span>
              <span className="flex items-center gap-1">
                Read Article <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
