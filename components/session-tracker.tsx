'use client';

import { useEffect, useRef, useCallback } from 'react';
import { xpApi } from '@/lib/api';
import { useXPToast } from './xp-toast';

const SESSION_XP_INTERVAL = 30 * 60 * 1000; // 30 dakika (milisaniye)

export function SessionTracker() {
  const lastXPTime = useRef<number>(Date.now());
  const isAuthenticated = useRef<boolean>(false);
  
  // XP Toast hook'unu güvenli şekilde kullan
  let showXPToast: ((amount: number, message?: string) => void) | null = null;
  try {
    const toast = useXPToast();
    showXPToast = toast.showXPToast;
  } catch {
    // Provider yoksa sessizce devam et
  }

  const checkAndAddSessionXP = useCallback(async () => {
    // Token kontrolü
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      isAuthenticated.current = false;
      return;
    }
    isAuthenticated.current = true;

    const now = Date.now();
    const timeSinceLastXP = now - lastXPTime.current;

    // 30 dakika geçtiyse XP ekle
    if (timeSinceLastXP >= SESSION_XP_INTERVAL) {
      try {
        const result = await xpApi.addSessionXP();
        lastXPTime.current = now;
        
        // Toast göster
        if (showXPToast) {
          showXPToast(result.xpAdded, 'Sitede vakit geçirme bonusu!');
        }
        
        console.log('Session XP eklendi:', result);
      } catch (error) {
        console.error('Session XP eklenemedi:', error);
      }
    }
  }, [showXPToast]);

  useEffect(() => {
    // İlk yüklemede token kontrolü
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    isAuthenticated.current = !!token;

    // Her dakika kontrol et
    const interval = setInterval(() => {
      if (isAuthenticated.current) {
        checkAndAddSessionXP();
      }
    }, 60 * 1000); // 1 dakikada bir kontrol

    // Sayfa görünürlük değişikliğinde kontrol
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isAuthenticated.current) {
        checkAndAddSessionXP();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [checkAndAddSessionXP]);

  // Bu component görsel bir şey render etmez
  return null;
}
