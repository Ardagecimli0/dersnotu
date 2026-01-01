'use client';

import React from 'react';
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Heart, BookOpen, GraduationCap, Lightbulb } from 'lucide-react';

export default function BizKimizPage() {
  // SEO Meta Tags
  React.useEffect(() => {
    document.title = "Biz Kimiz? | DersNotu.net - Hakkımızda";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'DersNotu.net olarak öğrencilerin bilgiye erişimini demokratikleştirmeyi ve akademik yardımlaşmayı dijitalleştirmeyi hedefliyoruz. Ücretsiz lise ders notları platformu.');
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <SiteHeader />

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Biz Kimiz?
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Öğrenciler için öğrenciler tarafından tasarlanmış bir platform
          </p>
        </div>

        {/* Mission Section */}
        <Card className="border-0 shadow-lg bg-white rounded-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Target className="h-6 w-6 text-[#3B82F6]" />
              Misyonumuz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-lg leading-relaxed">
              DersNotu.net olarak, üniversite öğrencilerinin ders notlarını, çıkmış soruları ve 
              akademik kaynakları birbirleriyle paylaşmasını sağlayan; hızlı, modern ve SEO odaklı 
              bir açık kaynak platform olmayı hedefliyoruz. Öğrencilerin bilgiye erişimini 
              demokratikleştirmeyi ve akademik yardımlaşmayı dijitalleştirmeyi amaçlıyoruz.
            </p>
          </CardContent>
        </Card>

        {/* Vision Section */}
        <Card className="border-0 shadow-lg bg-white rounded-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Lightbulb className="h-6 w-6 text-yellow-500" />
              Vizyonumuz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Türkiye'nin en büyük ve en güvenilir ücretsiz ders notu platformu olmak. 
              Her öğrencinin ihtiyaç duyduğu ders notlarına kolayca erişebildiği, 
              paylaşım yaparak topluluğa katkıda bulunduğu bir ekosistem yaratmak.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Modern web teknolojileri kullanarak "Full Stack TypeScript" mimarisiyle 
              geliştirilen platformumuz, performans ve ölçeklenebilirlik odaklıdır.
            </p>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-sm bg-white rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <Heart className="h-5 w-5 text-red-500" />
                Değerlerimiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#3B82F6] mt-1">•</span>
                  <span><strong>Ücretsizlik:</strong> Tüm içerikler tamamen ücretsizdir</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3B82F6] mt-1">•</span>
                  <span><strong>Topluluk:</strong> Öğrenciler birbirine yardımcı olur</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3B82F6] mt-1">•</span>
                  <span><strong>Kalite:</strong> Tüm notlar moderasyon sürecinden geçer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3B82F6] mt-1">•</span>
                  <span><strong>Güvenlik:</strong> Kullanıcı verileri güvende tutulur</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <Users className="h-5 w-5 text-purple-500" />
                Topluluk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                DersNotu.net, binlerce öğrencinin katkıda bulunduğu aktif bir öğrenme topluluğudur. 
                Notlarını paylaşan, yorum yapan ve birbirine yardımcı olan öğrencilerden oluşur.
              </p>
              <p className="text-gray-700">
                Puan sistemi sayesinde aktif katılım gösteren öğrenciler ödüllendirilir ve 
                liderlik tablosunda yer alır.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-[#3B82F6] to-[#2563EB] rounded-2xl text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <BookOpen className="h-6 w-6" />
              Özelliklerimiz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  9-12. Sınıf Ders Notları
                </h3>
                <p className="text-blue-100">
                  Tüm sınıf seviyeleri için kapsamlı ders notları. Matematik, Fizik, Kimya, 
                  Biyoloji, Türkçe, Tarih, Coğrafya ve daha fazlası.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  YKS Hazırlık
                </h3>
                <p className="text-blue-100">
                  TYT ve AYT sınavlarına hazırlık için özel olarak hazırlanmış notlar. 
                  2026 YKS için güncel içerikler.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Puan Sistemi
                </h3>
                <p className="text-blue-100">
                  Not paylaştıkça puan kazan, seviye atla ve özel ödülleri kazanın. 
                  Toplulukta öne çık.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Topluluk Desteği
                </h3>
                <p className="text-blue-100">
                  Sorularını sor, cevaplarını paylaş, birlikte öğren. Aktif bir öğrenme 
                  topluluğunun parçası ol.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="border-0 shadow-sm bg-white rounded-2xl mt-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              İletişim
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Sorularınız, önerileriniz veya destek talepleriniz için bizimle iletişime geçebilirsiniz:
            </p>
            <p className="text-gray-700">
              <strong>E-posta:</strong> info@dersnotu.net
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

