import React, { useState } from 'react';
import { BookOpen, Github, Twitter, Linkedin, Heart, Send, CheckCircle2 } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

export default function Footer() {
  const { navigateTo, categories, showToast } = useBlog();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast("Please enter a valid email address.", "info");
      return;
    }
    setSubscribed(true);
    showToast("Thank you for subscribing to InkFlow Chronicles!", "success");
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 dark:bg-slate-950 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => navigateTo('/')}
              className="flex items-center gap-2.5 cursor-pointer group inline-flex"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Ink<span className="text-brand-400">Flow</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              An engineering-grade editorial publication dedicated to deep technical insights, system architectures, modern design craft, and emerging AI frontiers.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigateTo('/')} className="hover:text-brand-400 transition-colors">
                  Feed & Recent Posts
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/categories')} className="hover:text-brand-400 transition-colors">
                  Browse Categories
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/about')} className="hover:text-brand-400 transition-colors">
                  About Publication
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/about#team')} className="hover:text-brand-400 transition-colors">
                  Editorial Team
                </button>
              </li>
            </ul>
          </div>

          {/* Categories Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              {categories.slice(0, 5).map(cat => (
                <li key={cat.id}>
                  <button 
                    onClick={() => navigateTo(`/category/${cat.id}`)}
                    className="hover:text-brand-400 transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3 lg:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Weekly Digest
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curated articles and engineering analysis delivered to your inbox every Thursday.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>You're subscribed! Welcome aboard.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-brand-600 hover:bg-brand-500 text-white transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} InkFlow Media. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>using React, Vite & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
