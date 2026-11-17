import React, { useState } from 'react';
import { 
  Search, Filter, Grid, List, Clock, TrendingUp, Zap, 
  BookOpen, SlidersHorizontal, ChevronDown, X 
} from 'lucide-react';
import PostCard from '../components/PostCard';
import { useBlog } from '../context/BlogContext';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest First', icon: Clock },
  { value: 'popular', label: 'Most Popular', icon: TrendingUp },
  { value: 'read-asc', label: 'Quick Reads', icon: Zap },
];

export default function HomePage() {
  const {
    posts,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    setIsSearchModalOpen,
  } = useBlog();

  const [filtersOpen, setFiltersOpen] = useState(false);

  const featured = posts.filter(p => p.featured);
  const hasActiveFilter = selectedCategory !== 'all' || searchQuery.trim();

  // Filter & Sort
  const filteredPosts = posts
    .filter(post => {
      const matchCat = selectedCategory === 'all' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some(t => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.initialLikes + parseInt(b.views || 0)) - (a.initialLikes + parseInt(a.views || 0));
      }
      if (sortBy === 'read-asc') {
        return parseInt(a.readTime) - parseInt(b.readTime);
      }
      return 0; // Default: latest (by array order)
    });

  const nonFeatured = filteredPosts.filter(p => !p.featured || hasActiveFilter);
  const showFeatured = !hasActiveFilter && featured.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

      {/* Hero Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-900 text-brand-600 dark:text-brand-400 text-xs font-semibold mb-5 animate-fadeIn">
          <BookOpen className="w-3.5 h-3.5" />
          Engineering & Technology Editorial
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
          Where Deep Technical{' '}
          <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-500 bg-clip-text text-transparent">
            Insights Live
          </span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Curated articles on system design, AI frontiers, modern web architecture, and product craft — by practicing engineers.
        </p>

        {/* Quick Search Trigger */}
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-md transition-all shadow-sm max-w-md w-full"
        >
          <Search className="w-4 h-4" />
          <span>Search articles, tags, topics...</span>
          <kbd className="ml-auto text-xs bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Featured Posts Section */}
      {showFeatured && (
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-brand-500 to-purple-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Featured Articles</h2>
          </div>
          <div className="space-y-5">
            {featured.map(post => (
              <PostCard key={post.id} post={post} featured={true} />
            ))}
          </div>
        </section>
      )}

      {/* Toolbar: Category Filters, Sort, View */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {hasActiveFilter ? 'Search Results' : 'All Articles'}
            </h2>
            <span className="text-sm text-slate-400">({filteredPosts.length})</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-brand-400 cursor-pointer"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                title="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              selectedCategory === 'all'
                ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-700'
            }`}
          >
            All Topics
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? 'all' : cat.id)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
          {hasActiveFilter && (
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 transition-colors"
            >
              <X className="w-3 h-3" /> Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Posts Grid/List */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-24">
          <Search className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">No articles found</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Try different keywords or browse all categories.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-5 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {(hasActiveFilter ? filteredPosts : nonFeatured).map(post => (
            <PostCard key={post.id} post={post} layout="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {(hasActiveFilter ? filteredPosts : nonFeatured).map(post => (
            <PostCard key={post.id} post={post} layout="list" />
          ))}
        </div>
      )}
    </div>
  );
}
