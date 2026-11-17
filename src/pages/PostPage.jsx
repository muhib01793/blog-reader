import React, { useState } from 'react';
import { 
  ArrowLeft, Clock, Eye, Heart, Bookmark, Twitter, Linkedin, Link, 
  MessageCircle, Send, ChevronDown, ChevronUp, User, Volume2,
  BookOpen, Tag, Share2, ThumbsUp
} from 'lucide-react';
import { useBlog } from '../context/BlogContext';

function CommentSection({ postId }) {
  const { commentsMap, addComment, showToast } = useBlog();
  const comments = commentsMap[postId] || [];
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [showAll, setShowAll] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) { showToast("Please write your comment first!", "info"); return; }
    addComment(postId, { name, text });
    setName('');
    setText('');
  };

  const displayedComments = showAll ? comments : comments.slice(0, 3);

  return (
    <div className="mt-10 pt-10 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-brand-600 dark:text-brand-400" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-8 border border-slate-200 dark:border-slate-700/60 space-y-3">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Share your thoughts
        </h4>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="w-full px-3.5 py-2.5 rounded-lg text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-400 dark:focus:border-brand-500 transition-colors"
        />
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write a thoughtful comment..."
          rows={4}
          className="w-full px-3.5 py-2.5 rounded-lg text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-400 dark:focus:border-brand-500 transition-colors resize-none"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition-colors shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            Post Comment
          </button>
        </div>
      </form>

      {/* Comment List */}
      {comments.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No comments yet. Be the first to share your insights!</p>
        </div>
      ) : (
        <div className="space-y-5">
          {displayedComments.map(comment => (
            <div key={comment.id} className="flex gap-3.5 animate-fadeIn">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="w-9 h-9 rounded-full object-cover flex-shrink-0 ring-2 ring-white dark:ring-slate-800"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200/80 dark:border-slate-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{comment.author}</span>
                  <span className="text-xs text-slate-400">{comment.date}</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{comment.text}</p>
              </div>
            </div>
          ))}

          {comments.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-1.5 text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium"
            >
              {showAll ? (
                <><ChevronUp className="w-4 h-4" /> Show fewer</>
              ) : (
                <><ChevronDown className="w-4 h-4" /> Show {comments.length - 3} more comments</>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function PostPage() {
  const { 
    currentRoute, posts, navigateTo, 
    likesMap, userLikedMap, toggleLike, 
    isBookmarked, toggleBookmark, 
    showToast, fontSize, setFontSize, 
    categories
  } = useBlog();

  // Parse post ID from route
  const postId = currentRoute.replace('/post/', '');
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Article not found</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">The article you're looking for doesn't exist or has been moved.</p>
        <button
          onClick={() => navigateTo('/')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Feed
        </button>
      </div>
    );
  }

  const likes = likesMap[post.id] ?? post.initialLikes;
  const isLiked = !!userLikedMap[post.id];
  const bookmarked = isBookmarked(post.id);

  const cat = categories.find(c => c.id === post.category);

  const related = posts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, text: post.excerpt, url: window.location.href })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => showToast("Link copied to clipboard!", "success"))
        .catch(() => showToast("Could not copy link", "info"));
    }
  };

  const fontSizeClass = fontSize === 'large' ? 'text-lg' : fontSize === 'xlarge' ? 'text-xl' : 'text-base';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Back + Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <button
            onClick={() => navigateTo('/')}
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Feed
          </button>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <button
            onClick={() => navigateTo(`/category/${post.category}`)}
            className="text-brand-600 dark:text-brand-400 hover:underline"
          >
            {post.categoryName}
          </button>
        </div>

        {/* Post Header */}
        <header className="mb-8">
          {cat && (
            <div className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border mb-4 ${cat.badgeClass}`}>
              {post.categoryName}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-5">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6 border-l-4 border-brand-500 pl-4 italic">
            {post.excerpt}
          </p>

          {/* Author & Meta Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-5 border-y border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 flex-1">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-slate-800 shadow-sm"
              />
              <div>
                <div className="font-semibold text-slate-900 dark:text-white text-sm">{post.author.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{post.author.role}</div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span>{post.publishDate}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{post.views} views</span>
            </div>
          </div>
        </header>

        {/* Reading Controls */}
        <div className="mb-6 flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">Text size:</span>
          {['normal', 'large', 'xlarge'].map(size => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                fontSize === size
                  ? 'bg-brand-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(post.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                bookmarked
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-brand-400'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-white' : ''}`} />
              {bookmarked ? 'Saved' : 'Save'}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-brand-400 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="mb-8 rounded-2xl overflow-hidden aspect-video shadow-lg">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          {post.coverCaption && (
            <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-2 italic">
              {post.coverCaption}
            </p>
          )}
        </div>

        {/* Article Body */}
        <article
          className={`prose-custom font-serif ${fontSizeClass}`}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="mt-10 flex flex-wrap items-center gap-2 pb-8 border-b border-slate-200 dark:border-slate-800">
          <Tag className="w-4 h-4 text-slate-400" />
          {post.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-brand-50 dark:hover:bg-slate-700 transition-colors cursor-default"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Like + Share CTA */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-brand-50/30 dark:from-slate-800/60 dark:to-brand-950/30 border border-slate-200 dark:border-slate-700/60 text-center">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-4">
            Found this article valuable? Give it some applause!
          </p>
          <button
            onClick={() => toggleLike(post.id)}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-bold transition-all shadow-md hover:scale-105 active:scale-95 ${
              isLiked
                ? 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-rose-300'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
            {likes} {isLiked ? 'Thank you!' : 'Appreciate this'}
          </button>
        </div>

        {/* Author Bio */}
        <div className="mt-8 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex gap-4 items-start">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-white dark:ring-slate-800 flex-shrink-0"
          />
          <div>
            <div className="text-xs text-brand-600 dark:text-brand-400 font-semibold uppercase tracking-wider mb-0.5">
              Written by
            </div>
            <div className="font-bold text-slate-900 dark:text-white">{post.author.name}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">{post.author.role}</div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{post.author.bio}</p>
          </div>
        </div>

        {/* Comments */}
        <CommentSection postId={post.id} />

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-purple-500 to-pink-500" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">More in {post.categoryName}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map(rel => (
                <div
                  key={rel.id}
                  onClick={() => navigateTo(`/post/${rel.id}`)}
                  className="group p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 cursor-pointer transition-all hover:shadow-md"
                >
                  <img
                    src={rel.coverImage}
                    alt={rel.title}
                    className="w-full h-32 object-cover rounded-lg mb-3 group-hover:scale-[1.02] transition-transform"
                  />
                  <div className="text-xs font-semibold text-brand-600 dark:text-brand-400 mb-1">{rel.readTime}</div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {rel.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
