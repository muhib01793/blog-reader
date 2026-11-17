import React from 'react';
import { Clock, Heart, Bookmark, Eye, ArrowRight, BookOpen } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

function CategoryBadge({ category }) {
  const { categories } = useBlog();
  const cat = categories.find(c => c.id === category);
  if (!cat) return <span className="text-xs text-slate-500">{category}</span>;
  return (
    <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${cat.badgeClass}`}>
      {cat.name}
    </span>
  );
}

export default function PostCard({ post, layout = 'grid', featured = false }) {
  const { 
    navigateTo, 
    likesMap, 
    userLikedMap, 
    toggleLike, 
    isBookmarked, 
    toggleBookmark 
  } = useBlog();

  const likes = likesMap[post.id] ?? post.initialLikes;
  const isLiked = !!userLikedMap[post.id];
  const bookmarked = isBookmarked(post.id);

  const handleOpen = () => navigateTo(`/post/${post.id}`);

  if (featured) {
    return (
      <article
        onClick={handleOpen}
        className="group relative flex flex-col md:flex-row gap-6 p-5 md:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-800 hover:shadow-xl hover:shadow-brand-500/5 transition-all cursor-pointer overflow-hidden"
      >
        {/* Gradient blob on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50/0 to-brand-100/0 group-hover:from-brand-50/60 group-hover:to-purple-50/40 dark:group-hover:from-brand-950/30 dark:group-hover:to-purple-950/20 transition-all pointer-events-none" />

        <div className="relative md:w-72 h-52 md:h-auto flex-shrink-0 rounded-xl overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-brand-600 text-white shadow-md">
              ✦ Featured
            </span>
          </div>
        </div>

        <div className="relative flex flex-col justify-between flex-1 min-w-0">
          <div className="space-y-3">
            <CategoryBadge category={post.category} />
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
              />
              <div className="text-xs">
                <span className="font-semibold text-slate-900 dark:text-white">{post.author.name}</span>
                <span className="text-slate-400 ml-1.5">· {post.publishDate}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {post.views}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); toggleLike(post.id); }}
                className={`flex items-center gap-1 hover:scale-110 transition-transform ${isLiked ? 'text-rose-500' : ''}`}
              >
                <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500' : ''}`} />
                {likes}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); toggleBookmark(post.id); }}
                className={`hover:scale-110 transition-transform ${bookmarked ? 'text-brand-600 dark:text-brand-400' : ''}`}
                title={bookmarked ? "Remove from reading list" : "Save to reading list"}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-brand-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (layout === 'list') {
    return (
      <article
        onClick={handleOpen}
        className="group flex gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-lg transition-all cursor-pointer"
      >
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-24 sm:w-32 h-24 sm:h-28 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
        />
        <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
          <div>
            <CategoryBadge category={post.category} />
            <h3 className="mt-1.5 text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 leading-snug">
              {post.title}
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed hidden sm:block">
              {post.excerpt}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400 mt-2 flex-wrap">
            <span className="font-medium text-slate-600 dark:text-slate-300">{post.author.name}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views}</span>
            <button
              onClick={(e) => { e.stopPropagation(); toggleLike(post.id); }}
              className={`flex items-center gap-1 hover:scale-110 transition-transform ml-auto ${isLiked ? 'text-rose-500' : ''}`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500' : ''}`} />
              {likes}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); toggleBookmark(post.id); }}
              className={`hover:scale-110 transition-transform ${bookmarked ? 'text-brand-600 dark:text-brand-400' : ''}`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-brand-500' : ''}`} />
            </button>
          </div>
        </div>
      </article>
    );
  }

  // Grid Card
  return (
    <article
      onClick={handleOpen}
      className="group flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-xl hover:shadow-brand-500/5 transition-all cursor-pointer overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3">
          <CategoryBadge category={post.category} />
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); toggleBookmark(post.id); }}
          className={`absolute top-3 right-3 p-1.5 rounded-lg backdrop-blur-md transition-all hover:scale-110 ${
            bookmarked 
              ? 'bg-brand-600 text-white' 
              : 'bg-black/20 text-white hover:bg-brand-600'
          }`}
          title={bookmarked ? "Saved" : "Save to reading list"}
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-white' : ''}`} />
        </button>
      </div>

      <div className="flex flex-col flex-1 p-4 gap-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-6 h-6 rounded-full object-cover flex-shrink-0 ring-2 ring-white dark:ring-slate-800"
            />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
              {post.author.name}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-400 flex-shrink-0">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
            <button
              onClick={(e) => { e.stopPropagation(); toggleLike(post.id); }}
              className={`flex items-center gap-1 hover:scale-110 transition-transform ${isLiked ? 'text-rose-500' : ''}`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500' : ''}`} />
              {likes}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
