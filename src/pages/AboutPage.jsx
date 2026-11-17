import React, { useState } from 'react';
import { 
  BookOpen, Users, Zap, Globe, Shield, Heart, Award, 
  Lightbulb, Send, CheckCircle2, ArrowRight, Twitter, 
  Github, Linkedin, Mail 
} from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { teamMembers } from '../data/posts';

const values = [
  { icon: Zap, title: 'Radical Depth', description: 'We go further than the basics. Every article is written to teach something genuinely new, backed by real production experience.', color: 'text-amber-500' },
  { icon: Shield, title: 'Technical Accuracy', description: 'All content is peer-reviewed by practicing engineers. We cite sources, acknowledge uncertainty, and correct errors openly.', color: 'text-blue-500' },
  { icon: Heart, title: 'Community First', description: 'InkFlow began as a tiny Slack channel for sharing engineering discoveries. That ethos of open knowledge sharing is baked into everything we do.', color: 'text-rose-500' },
  { icon: Lightbulb, title: 'Clarity Over Cleverness', description: 'We use precise language, concrete code examples, and real-world analogies — not jargon-for-jargon\'s-sake.', color: 'text-emerald-500' },
];

const stats = [
  { label: 'Published Articles', value: '120+' },
  { label: 'Weekly Readers', value: '28k' },
  { label: 'Newsletter Subscribers', value: '9.4k' },
  { label: 'Featured Authors', value: '18' },
];

export default function AboutPage() {
  const { navigateTo, showToast } = useBlog();
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSent, setContactSent] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.email.includes('@') || !contactForm.message.trim()) {
      showToast("Please complete all required fields.", "info");
      return;
    }
    setContactSent(true);
    showToast("Your message was sent successfully!", "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-900 text-purple-700 dark:text-purple-400 text-xs font-semibold mb-5">
          <BookOpen className="w-3.5 h-3.5" />
          Our Story
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-5">
          Built for Engineers,{' '}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            By Engineers
          </span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          InkFlow started in 2021 as a private Slack channel where three backend engineers shared research papers, dissected architectural post-mortems, and debated emerging language model capabilities. When the channel hit 500 members in six weeks, we realized we had something worth publishing.
        </p>
        <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Today, InkFlow reaches over 28,000 engineers weekly across 61 countries. Our writers are active practitioners — engineering leads, researchers, and senior architects — who write to teach what they've actually learned, not to summarize what others have already said.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-3xl font-black text-brand-600 dark:text-brand-400 mb-1">{stat.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-tight">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Mission Section */}
      <div className="relative mb-16 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-600 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-16 translate-x-16" />
        <div className="relative max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-widest text-brand-200 mb-3">Our Mission</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 leading-tight">
            To elevate the standard of technical knowledge sharing across the software industry.
          </h2>
          <p className="text-brand-100 leading-relaxed">
            Too many engineering blogs trade depth for search-engine-friendly brevity. InkFlow is a deliberate counter-movement. We care about understanding — not page impressions. Every article is designed to leave you with a mental model you can immediately apply to your own technical challenges.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">What We Stand For</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Our editorial principles guide every article we publish.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {values.map(val => {
            const Icon = val.icon;
            return (
              <div key={val.title} className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center bg-slate-50 dark:bg-slate-800 ${val.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{val.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{val.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team Section */}
      <div id="team" className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">The Editorial Team</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto">
            Our core contributors are senior practitioners with deep domain expertise and a passion for clear technical writing.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {teamMembers.map(member => (
            <div key={member.name} className="group flex flex-col items-center text-center p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-lg transition-all">
              <div className="relative mb-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-white dark:ring-slate-800 shadow-md group-hover:scale-105 transition-transform"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800" title="Active contributor" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">{member.name}</h3>
              <div className="text-xs text-brand-600 dark:text-brand-400 font-medium mb-2 leading-tight">{member.role}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{member.bio}</p>
              <div className="flex items-center gap-2 mt-auto">
                <a href={`https://twitter.com/${member.twitter.replace('@','')}`} target="_blank" rel="noreferrer" 
                   className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" title="Twitter">
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a href={`https://github.com/${member.github}`} target="_blank" rel="noreferrer"
                   className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" title="GitHub">
                  <Github className="w-3.5 h-3.5" />
                </a>
                <a href={`https://linkedin.com/in/${member.linkedin}`} target="_blank" rel="noreferrer"
                   className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" title="LinkedIn">
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write for Us Banner */}
      <div className="mb-14 p-8 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-5">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Contribute</div>
          <h2 className="text-xl font-extrabold mb-1">Write for InkFlow</h2>
          <p className="text-sm text-slate-400 max-w-sm">
            Practiced engineer? Deep insights to share? We're always looking for thoughtful, technically rigorous writers.
          </p>
        </div>
        <button
          onClick={() => showToast("Applications open! Email us at editors@inkflow.dev", "success")}
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-colors shadow-md shadow-brand-500/20"
        >
          <Mail className="w-4 h-4" />
          Apply to Write
        </button>
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Get In Touch</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Questions, editorial feedback, partnership inquiries — we respond within 48 hours.</p>
        </div>

        {contactSent ? (
          <div className="text-center py-14 px-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Message Received!</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Thanks for reaching out. We'll get back to you within 48 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Name</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={e => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your name"
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email <span className="text-rose-500">*</span></label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={e => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="you@company.com"
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-400 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Message <span className="text-rose-500">*</span></label>
              <textarea
                rows={5}
                required
                value={contactForm.message}
                onChange={e => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Tell us how we can help..."
                className="w-full px-3.5 py-2.5 rounded-lg text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-400 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-colors shadow-md shadow-brand-500/15"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
