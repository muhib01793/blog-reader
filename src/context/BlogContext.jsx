import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { posts as initialPosts, initialCommentsData } from '../data/posts';
import { categories } from '../data/categories';

const BlogContext = createContext(null);

export const BlogProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('inkflow_theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('inkflow_theme', theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Toast notification state
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast(current => (current?.id === id ? null : current));
    }, 3500);
  };

  // Bookmarks state (array of post IDs)
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('inkflow_bookmarks');
      return saved ? JSON.parse(saved) : ["understanding-react-server-components"];
    } catch {
      return ["understanding-react-server-components"];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('inkflow_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  const toggleBookmark = (postId) => {
    const exists = bookmarks.includes(postId);
    if (exists) {
      setBookmarks(prev => prev.filter(id => id !== postId));
      showToast("Removed from your bookmarks", "info");
    } else {
      setBookmarks(prev => [...prev, postId]);
      showToast("Saved to your reading list!", "success");
    }
  };

  const isBookmarked = (postId) => bookmarks.includes(postId);

  // Likes state
  const [likesMap, setLikesMap] = useState(() => {
    try {
      const saved = localStorage.getItem('inkflow_likes');
      if (saved) return JSON.parse(saved);
      const defaults = {};
      initialPosts.forEach(p => { defaults[p.id] = p.initialLikes; });
      return defaults;
    } catch {
      const defaults = {};
      initialPosts.forEach(p => { defaults[p.id] = p.initialLikes; });
      return defaults;
    }
  });

  const [userLikedMap, setUserLikedMap] = useState(() => {
    try {
      const saved = localStorage.getItem('inkflow_user_liked');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('inkflow_likes', JSON.stringify(likesMap));
      localStorage.setItem('inkflow_user_liked', JSON.stringify(userLikedMap));
    } catch (e) {
      console.error(e);
    }
  }, [likesMap, userLikedMap]);

  const toggleLike = (postId) => {
    const isLiked = !!userLikedMap[postId];
    if (isLiked) {
      setLikesMap(prev => ({ ...prev, [postId]: Math.max(0, (prev[postId] || 1) - 1) }));
      setUserLikedMap(prev => ({ ...prev, [postId]: false }));
    } else {
      setLikesMap(prev => ({ ...prev, [postId]: (prev[postId] || 0) + 1 }));
      setUserLikedMap(prev => ({ ...prev, [postId]: true }));
      // Trigger festive confetti burst
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#3b82f6', '#ec4899', '#8b5cf6', '#10b981']
        });
      } catch (err) {
        // ignore
      }
      showToast("Thanks for the applause!", "success");
    }
  };

  // Comments state
  const [commentsMap, setCommentsMap] = useState(() => {
    try {
      const saved = localStorage.getItem('inkflow_comments');
      return saved ? JSON.parse(saved) : initialCommentsData;
    } catch {
      return initialCommentsData;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('inkflow_comments', JSON.stringify(commentsMap));
    } catch (e) {
      console.error(e);
    }
  }, [commentsMap]);

  const addComment = (postId, { name, text }) => {
    if (!text.trim()) return;
    const newComment = {
      id: "c_" + Date.now(),
      author: name.trim() || "Thoughtful Reader",
      avatar: `https://images.unsplash.com/photo-${1535713875000 + Math.floor(Math.random() * 500)}?auto=format&fit=crop&w=150&q=80`,
      date: "Just now",
      text: text.trim()
    };
    setCommentsMap(prev => ({
      ...prev,
      [postId]: [newComment, ...(prev[postId] || [])]
    }));
    showToast("Comment published successfully!", "success");
  };

  // Search, Filters & Sorting
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest"); // 'latest', 'popular', 'read-asc', 'read-desc'
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'

  // Modals & Drawers
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Reading preferences for post detail
  const [fontSize, setFontSize] = useState("normal"); // 'normal' | 'large' | 'xlarge'

  // Hash-based Routing
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash.replace('#', '') || '/';
    return hash;
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      setCurrentRoute(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (path) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    window.location.hash = `#${cleanPath}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K or Cmd+K or / to open search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(prev => !prev);
      }
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
      // Esc to close drawers
      if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
        setIsBookmarksOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <BlogContext.Provider
      value={{
        theme,
        toggleTheme,
        toast,
        showToast,
        posts: initialPosts,
        categories,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        likesMap,
        userLikedMap,
        toggleLike,
        commentsMap,
        addComment,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        viewMode,
        setViewMode,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isBookmarksOpen,
        setIsBookmarksOpen,
        fontSize,
        setFontSize,
        currentRoute,
        navigateTo
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
