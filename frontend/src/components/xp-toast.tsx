'use client';

import { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { Sparkles, X } from 'lucide-react';

// XP Toast Context
interface XPToastContextType {
  showXPToast: (amount: number, message?: string) => void;
}

const XPToastContext = createContext<XPToastContextType | null>(null);

export const useXPToast = () => {
  const context = useContext(XPToastContext);
  if (!context) {
    throw new Error('useXPToast must be used within XPToastProvider');
  }
  return context;
};

interface Toast {
  id: number;
  amount: number;
  message: string;
}

export function XPToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showXPToast = useCallback((amount: number, message?: string) => {
    const id = Date.now();
    const newToast: Toast = {
      id,
      amount,
      message: message || `+${amount} XP Kazandınız!`,
    };

    setToasts((prev) => [...prev, newToast]);

    // 3 saniye sonra kaldır
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <XPToastContext.Provider value={{ showXPToast }}>
      {children}
      {/* Toast Container - Sağ üst köşe */}
      <div className="fixed top-24 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="animate-slide-in-right bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-[200px]"
          >
            <div className="bg-white/20 p-2 rounded-full">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg">+{toast.amount} XP</p>
              <p className="text-sm text-white/90">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </XPToastContext.Provider>
  );
}

// CSS Animation - globals.css'e eklenecek
// @keyframes slide-in-right {
//   from { transform: translateX(100%); opacity: 0; }
//   to { transform: translateX(0); opacity: 1; }
// }
// .animate-slide-in-right { animation: slide-in-right 0.3s ease-out; }
