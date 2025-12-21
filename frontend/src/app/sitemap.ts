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
  ];

  // Sınıf sayfaları (SEO için önemli)
  const gradePages = [
    '9-sinif',
    '10-sinif', 
    '11-sinif',
    '12-sinif',
    'tyt',
    'ayt',
  ].map((grade) => ({
    url: `${baseUrl}/?grade=${grade}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  // Ders sayfaları (SEO için önemli)
  const lessonPages = [
    'matematik',
    'fizik',
    'kimya',
    'biyoloji',
    'turkce',
    'tarih',
    'cografya',
    'ingilizce',
    'felsefe',
    'din-kulturu',
  ].map((lesson) => ({
    url: `${baseUrl}/?lesson=${lesson}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...gradePages, ...lessonPages];
}
