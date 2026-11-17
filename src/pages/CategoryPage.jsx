import React from 'react';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import PostCard from '../components/PostCard';

export default function CategoryPage() {
  const { currentRoute, categories, posts, navigateTo } = useBlog();

  // Parse category from route: /category/:id
  const catId = currentRoute.replace('/category/', '');
  const cat = categories.find(c => c.id === catId);
  const catPosts = posts.filter(p => p.category === catId);

  if (!cat) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Category not found</h2>
        <button onClick={() => navigateTo('/categories')} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> All Categories
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back Link */}
      <button
        onClick={() => navigateTo('/categories')}
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors mb-7"
      >
        <ArrowLeft className="w-4 h-4" /> All Categories
      </button>

      {/* Category Header */}
      <div className="relative rounded-2xl overflow-hidden mb-10 h-56 sm:h-64">
        <img
          src={cat.coverImage}
          alt={cat.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center pl-8 pr-4">
          <div className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border self-start mb-3 ${cat.badgeClass}`}>
            {cat.name}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-2">{cat.name}</h1>
          <p className="text-sm text-white/70 max-w-sm leading-relaxed">{cat.description}</p>
          <div className="mt-3 text-xs text-white/50">{catPosts.length} articles</div>
        </div>
      </div>

      {/* Posts Grid */}
      {catPosts.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">No articles in this category yet</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Check back soon — new content is published every week!</p>
          <button
            onClick={() => navigateTo('/')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Browse all articles
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {catPosts.map(post => (
            <PostCard key={post.id} post={post} layout="grid" />
          ))}
        </div>
      )}

    </div>
  );
}
