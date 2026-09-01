import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
      <div className="bg-inverse-surface text-inverse-on-surface px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-outline/20 max-w-md">
        {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-secondary-container shrink-0" />}
        {toast.type === 'info' && <Info className="w-5 h-5 text-primary-container shrink-0" />}
        {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />}
        <span className="text-xs sm:text-sm font-semibold">{toast.message}</span>
      </div>
    </div>
  );
}
