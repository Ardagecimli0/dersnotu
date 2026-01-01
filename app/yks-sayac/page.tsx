'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Clock,
  Calendar,
  Target,
} from 'lucide-react';
import { Footer } from '@/components/footer';
import { SiteHeader } from '@/components/site-header';

export default function YKSSayacPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 2026 YKS Tarihi: Genellikle Haziran ayının ilk hafta sonu
  const yksDate = new Date('2026-06-14T09:00:00'); // Örnek tarih, gerçek tarih açıklandığında güncellenmeli

  useEffect(() => {
    // SEO Meta Tags
    document.title = "2026 YKS Sınav Sayaç | DersNotu.net";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', '2026 YKS sınavına kalan süreyi anlık olarak takip edin. Yükseköğretim Kurumları Sınavı için geri sayım ve hazırlık kaynakları.');

    // Sayaç güncelleme
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = yksDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-[#F9FAFB]">
        <SiteHeader />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-[#3B82F6]">2026 YKS</span> Sınav Sayaç
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Yükseköğretim Kurumları Sınavı'na kalan süreyi anlık olarak takip edin. 
              Hazırlığınızı planlayın ve hedefinize odaklanın.
            </p>
          </div>

          {/* Countdown Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {timeLeft.days}
                </div>
                <div className="text-sm md:text-base opacity-90">Gün</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base opacity-90">Saat</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-500 to-pink-600 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base opacity-90">Dakika</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base opacity-90">Saniye</div>
              </CardContent>
            </Card>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <Calendar className="h-12 w-12 text-[#3B82F6]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Sınav Tarihi</h3>
                <p className="text-gray-600 text-center">
                  14 Haziran 2026
                </p>
                <p className="text-sm text-gray-500 text-center mt-2">
                  (Resmi tarih açıklandığında güncellenecektir)
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <Clock className="h-12 w-12 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Sınav Saati</h3>
                <p className="text-gray-600 text-center">
                  09:00
                </p>
                <p className="text-sm text-gray-500 text-center mt-2">
                  TYT ve AYT sınavları
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <Target className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Hedefinize Odaklanın</h3>
                <p className="text-gray-600 text-center">
                  Düzenli çalışma ve kaliteli ders notları ile başarıya ulaşın
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                YKS Hazırlığınıza Başlayın
              </h2>
              <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                Binlerce ücretsiz ders notu ile YKS hazırlığınızı güçlendirin. 
                Matematik, Fizik, Kimya, Biyoloji ve daha fazlası için kaliteli notlar sizi bekliyor.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button size="lg" variant="secondary" className="bg-white text-[#3B82F6] hover:bg-gray-50">
                    Ders Notlarına Git
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="bg-white text-[#3B82F6] hover:bg-gray-50">
                    Ücretsiz Kaydol
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    </>
  );
}

