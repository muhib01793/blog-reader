import React from 'react';
import { BlogProvider, useBlog } from './context/BlogContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import SearchModal from './components/SearchModal';
import BookmarksDrawer from './components/BookmarksDrawer';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryPage from './pages/CategoryPage';
import AboutPage from './pages/AboutPage';

function Router() {
  const { currentRoute } = useBlog();

  const renderPage = () => {
    if (currentRoute === '/' || currentRoute === '') return <HomePage />;
    if (currentRoute === '/categories') return <CategoriesPage />;
    if (currentRoute === '/about') return <AboutPage />;
    if (currentRoute.startsWith('/post/')) return <PostPage />;
    if (currentRoute.startsWith('/category/')) return <CategoryPage />;
    return <HomePage />; // Default fallback
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 animate-fadeIn">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BlogProvider>
      <Router />
      <Toast />
      <SearchModal />
      <BookmarksDrawer />
    </BlogProvider>
  );
}
