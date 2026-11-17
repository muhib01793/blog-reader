import React from 'react';
import { Bookmark, X, Trash2, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

export default function BookmarksDrawer() {
  const { 
    isBookmarksOpen, 
    setIsBookmarksOpen, 
    bookmarks, 
    toggleBookmark, 
    posts, 
    navigateTo 
  } = useBlog();

  if (!isBookmarksOpen) return null;

  const bookmarkedPosts = posts.filter(post => bookmarks.includes(post.id));

  // Compute total reading time
  const totalMinutes = bookmarkedPosts.reduce((acc, curr) => {
    const minutes = parseInt(curr.readTime) || 5;
    return acc + minutes;
  }, 0);

  const handleOpenPost = (id) => {
    setIsBookmarksOpen(false);
    navigateTo(`/post/${id}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsBookmarksOpen(false)}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Reading List
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {bookmarkedPosts.length} saved {bookmarkedPosts.length === 1 ? 'article' : 'articles'} • ~{totalMinutes} min total
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsBookmarksOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {bookmarkedPosts.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto mb-4">
                  <Bookmark className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Your reading list is empty
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto mb-6">
                  Save articles while browsing to read them later at your own pace.
                </p>
                <button
                  onClick={() => setIsBookmarksOpen(false)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Explore Articles
                </button>
              </div>
            ) : (
              bookmarkedPosts.map(post => (
                <div
                  key={post.id}
                  className="group relative p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-brand-300 dark:hover:border-brand-700 transition-all flex gap-3.5"
                >
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0 cursor-pointer"
                    onClick={() => handleOpenPost(post.id)}
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                          {post.categoryName}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(post.id);
                          }}
                          className="text-slate-400 hover:text-rose-500 p-1 rounded transition-colors"
                          title="Remove from reading list"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4
                        onClick={() => handleOpenPost(post.id)}
                        className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer transition-colors"
                      >
                        {post.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                      <button
                        onClick={() => handleOpenPost(post.id)}
                        className="inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 font-medium hover:underline text-[11px]"
                      >
                        Read <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {bookmarkedPosts.length > 0 && (
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">
                Bookmarks saved in local browser storage
              </span>
              <button
                onClick={() => {
                  bookmarkedPosts.forEach(p => toggleBookmark(p.id));
                }}
                className="text-rose-600 dark:text-rose-400 hover:underline font-medium"
              >
                Clear all
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
