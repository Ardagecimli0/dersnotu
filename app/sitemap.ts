import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dersnotu.net';
  
  // Statik sayfalar
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/leaderboard`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kvkk`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/gizlilik`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/yks-sayac`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/yorum-politikasi`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Sınıf sayfaları (SEO için önemli) - Yeni URL yapısı
  const gradePages = [
    { slug: '9-sinif-ders-notlari', priority: 0.95 },
    { slug: '10-sinif-ders-notlari', priority: 0.95 },
    { slug: '11-sinif-ders-notlari', priority: 0.95 },
    { slug: '12-sinif-ders-notlari', priority: 0.95 },
    { slug: 'tyt-ders-notlari', priority: 0.95 },
    { slug: 'ayt-ders-notlari', priority: 0.95 },
  ].map((grade) => ({
    url: `${baseUrl}/ders-notlari/${grade.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: grade.priority,
  }));

  // Ders sayfaları (SEO için önemli) - Yeni URL yapısı
  const lessonPages = [
    { slug: 'matematik-ders-notlari', priority: 0.9 },
    { slug: 'fizik-ders-notlari', priority: 0.9 },
    { slug: 'kimya-ders-notlari', priority: 0.9 },
    { slug: 'biyoloji-ders-notlari', priority: 0.9 },
    { slug: 'turkce-ders-notlari', priority: 0.9 },
    { slug: 'tarih-ders-notlari', priority: 0.9 },
    { slug: 'cografya-ders-notlari', priority: 0.9 },
    { slug: 'ingilizce-ders-notlari', priority: 0.9 },
    { slug: 'felsefe-ders-notlari', priority: 0.9 },
    { slug: 'din-kulturu-ders-notlari', priority: 0.9 },
  ].map((lesson) => ({
    url: `${baseUrl}/ders-notlari/${lesson.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: lesson.priority,
  }));

  return [...staticPages, ...gradePages, ...lessonPages];
}
