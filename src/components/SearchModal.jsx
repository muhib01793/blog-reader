import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

export default function SearchModal() {
  const { isSearchModalOpen, setIsSearchModalOpen, posts, categories, navigateTo } = useBlog();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchModalOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const q = query.toLowerCase().trim();
  const results = q.length < 2 ? [] : posts.filter(post =>
    post.title.toLowerCase().includes(q) ||
    post.excerpt.toLowerCase().includes(q) ||
    post.tags.some(tag => tag.toLowerCase().includes(q)) ||
    post.categoryName.toLowerCase().includes(q)
  );

  const handleSelect = (postId) => {
    setIsSearchModalOpen(false);
    navigateTo(`/post/${postId}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => setIsSearchModalOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden animate-slideDown">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search articles, topics, tags..."
            className="flex-1 text-base bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:flex text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {q.length < 2 ? (
            <div className="p-4">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Popular Topics
              </p>
              <div className="flex flex-wrap gap-2">
                {['React', 'AI Agents', 'System Design', 'TypeScript', 'Performance', 'Design Systems', 'Node.js'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-700 hover:text-brand-600 dark:hover:text-brand-400 transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    <TrendingUp className="w-3 h-3 opacity-60" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-14 text-slate-500 dark:text-slate-400">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No articles found for "{query}"</p>
              <p className="text-xs mt-1 opacity-70">Try different keywords or browse all categories</p>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              <p className="text-xs text-slate-400 px-3 py-1">
                {results.length} result{results.length > 1 ? 's' : ''} found
              </p>
              {results.map(post => (
                <button
                  key={post.id}
                  onClick={() => handleSelect(post.id)}
                  className="w-full text-left flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                >
                  <img
                    src={post.coverImage}
                    alt=""
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 mb-0.5">
                      {post.categoryName}
                    </div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {post.title}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {post.readTime} · {post.publishDate}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-brand-500 transition-colors flex-shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="px-4 py-2.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-[11px] text-slate-400 flex gap-4">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>Esc close</span>
        </div>
      </div>
    </div>
  );
}
