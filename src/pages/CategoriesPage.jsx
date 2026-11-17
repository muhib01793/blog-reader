import React from 'react';
import { ArrowRight, BookOpen, TrendingUp } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

const colorMap = {
  blue: { icon: 'bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400', accent: 'border-blue-300 dark:border-blue-800 hover:shadow-blue-100 dark:hover:shadow-blue-950/40' },
  purple: { icon: 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400', accent: 'border-purple-300 dark:border-purple-800 hover:shadow-purple-100 dark:hover:shadow-purple-950/40' },
  rose: { icon: 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400', accent: 'border-rose-300 dark:border-rose-800 hover:shadow-rose-100 dark:hover:shadow-rose-950/40' },
  emerald: { icon: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400', accent: 'border-emerald-300 dark:border-emerald-800 hover:shadow-emerald-100 dark:hover:shadow-emerald-950/40' },
  amber: { icon: 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400', accent: 'border-amber-300 dark:border-amber-800 hover:shadow-amber-100 dark:hover:shadow-amber-950/40' },
};

const iconMap = {
  Cpu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2" />
    </svg>
  ),
  Sparkles: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4M19 17v4M3 5h4M17 19h4" />
    </svg>
  ),
  Palette: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  Layers: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
    </svg>
  ),
  Compass: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
};

export default function CategoriesPage() {
  const { categories, posts, navigateTo } = useBlog();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      
      {/* Page Header */}
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-5">
          <TrendingUp className="w-3.5 h-3.5" />
          Browse by Topic
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
          Explore All{' '}
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Categories
          </span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Dive deep into specialized topics curated by practitioners. Each category features hand-picked long-form technical articles.
        </p>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-14">
        {categories.map(cat => {
          const postsInCat = posts.filter(p => p.category === cat.id);
          const colors = colorMap[cat.color] || colorMap.blue;
          const IconComp = iconMap[cat.icon];

          return (
            <div
              key={cat.id}
              onClick={() => navigateTo(`/category/${cat.id}`)}
              className={`group relative flex flex-col rounded-2xl border bg-white dark:bg-slate-900 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden ${colors.accent}`}
            >
              {/* Cover Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={cat.coverImage}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 dark:opacity-60"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent`} />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl ${colors.icon} flex items-center justify-center backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 shadow-md`}>
                    {IconComp && <IconComp />}
                  </div>
                  <span className="text-xs font-semibold text-white/90 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {postsInCat.length} {postsInCat.length === 1 ? 'article' : 'articles'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h2 className={`text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-${cat.color}-600 dark:group-hover:text-${cat.color}-400 transition-colors`}>
                  {cat.name}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
                  {cat.description}
                </p>

                {/* Recent Articles Preview */}
                {postsInCat.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                    {postsInCat.slice(0, 2).map(post => (
                      <div key={post.id} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <BookOpen className="w-3 h-3 flex-shrink-0 opacity-60" />
                        <span className="line-clamp-1">{post.title}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button className={`mt-4 self-start inline-flex items-center gap-1.5 text-xs font-semibold text-${cat.color}-600 dark:text-${cat.color}-400 group-hover:gap-2.5 transition-all`}>
                  Browse articles <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-brand-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Explore the Full Library</h2>
        <p className="text-brand-100 mb-6 max-w-md mx-auto text-sm">
          {posts.length} in-depth articles across {categories.length} specialized categories — with new content every week.
        </p>
        <button
          onClick={() => navigateTo('/')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-brand-700 font-bold text-sm hover:bg-brand-50 transition-colors shadow-md"
        >
          <BookOpen className="w-4 h-4" />
          View All Articles
        </button>
      </div>

    </div>
  );
}
