import React from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

export default function Toast() {
  const { toast } = useBlog();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideDown">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md border ${
        isSuccess 
          ? 'bg-slate-900/95 text-white border-slate-700/80 dark:bg-white dark:text-slate-900 dark:border-slate-200' 
          : 'bg-brand-900/95 text-white border-brand-700/80'
      }`}>
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 dark:text-emerald-600 flex-shrink-0" />
        ) : (
          <Info className="w-5 h-5 text-brand-300 flex-shrink-0" />
        )}
        <span className="text-sm font-medium pr-2">
          {toast.message}
        </span>
      </div>
    </div>
  );
}
