import { MetadataRoute } from 'next';

// Backend'den notları çekmek için API fonksiyonu
async function getAllNotes() {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (
      process.env.NODE_ENV === 'production' 
        ? '' 
        : 'http://localhost:3002'
    );
    
    const response = await fetch(`${API_BASE_URL}/notes?limit=10000`, {
      next: { revalidate: 3600 }, // 1 saat cache
    });
    
    if (!response.ok) {
      return [];
    }
    
    const notes = await response.json();
    return notes || [];
  } catch (error) {
    console.error('Sitemap için notlar yüklenemedi:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
      priority: 0.7,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
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
      priority: 0.5,
    },
    {
      url: `${baseUrl}/gizlilik`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/yks-sayac`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/yorum-politikasi`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/biz-kimiz`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Sınıf sayfaları (SEO için önemli)
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

  // Ders sayfaları (SEO için önemli)
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
    { slug: 'edebiyat-ders-notlari', priority: 0.9 },
  ].map((lesson) => ({
    url: `${baseUrl}/ders-notlari/${lesson.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: lesson.priority,
  }));

  // Kombinasyon sayfaları (Sınıf + Ders) - SEO için önemli
  const combinationPages: { url: string; lastModified: Date; changeFrequency: 'daily'; priority: number }[] = [];
  const grades = ['9-sinif', '10-sinif', '11-sinif', '12-sinif'];
  const lessons = ['matematik', 'fizik', 'kimya', 'biyoloji', 'turkce', 'tarih', 'cografya', 'ingilizce', 'felsefe', 'din-kulturu', 'edebiyat'];
  
  grades.forEach(grade => {
    lessons.forEach(lesson => {
      combinationPages.push({
        url: `${baseUrl}/ders-notlari/${grade}-${lesson}-ders-notlari`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.95,
      });
    });
  });

  // TYT/AYT kombinasyon sayfaları
  const yksLessons = ['matematik', 'fizik', 'kimya', 'biyoloji', 'turkce', 'tarih', 'cografya'];
  ['tyt', 'ayt'].forEach(examType => {
    yksLessons.forEach(lesson => {
      combinationPages.push({
        url: `${baseUrl}/ders-notlari/${examType}-${lesson}-ders-notlari`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.95,
      });
    });
  });

  // Dinamik not sayfaları - Backend'den çek
  const notes = await getAllNotes();
  const notePages = notes
    .filter((note: any) => note.status === 'APPROVED' && note.slug) // Sadece onaylanmış notlar
    .map((note: any) => ({
      url: `${baseUrl}/konu/${note.slug}`,
      lastModified: note.updatedAt ? new Date(note.updatedAt) : new Date(note.createdAt || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  // Not ID sayfaları (alternatif URL)
  const noteIdPages = notes
    .filter((note: any) => note.status === 'APPROVED' && note.id)
    .map((note: any) => ({
      url: `${baseUrl}/notes/${note.id}`,
      lastModified: note.updatedAt ? new Date(note.updatedAt) : new Date(note.createdAt || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  return [
    ...staticPages,
    ...gradePages,
    ...lessonPages,
    ...combinationPages,
    ...notePages,
    ...noteIdPages,
  ];
}
