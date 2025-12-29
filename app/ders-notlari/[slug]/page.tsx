'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  FileText, 
  Eye, 
  Heart,
  Search,
  ArrowRight,
  Sparkles,
  BookOpen,
  Clock,
  GraduationCap,
  ChevronDown,
  Target,
  Layers,
  User,
  LogOut,
  X,
  Trophy,
} from 'lucide-react';
import { notesApi, Note } from '@/lib/api';
import { Footer } from '@/components/footer';
import { 
  WebsiteStructuredData, 
  OrganizationStructuredData, 
  EducationalOrganizationStructuredData,
  FAQStructuredData 
} from '@/components/structured-data';

// Slug'dan grade ve lesson bilgisini çıkar
const parseSlug = (slug: string) => {
  // Kombinasyon URL'leri: 10-sinif-biyoloji-ders-notlari
  const combinationPattern = /^(\d+)-sinif-(.+)-ders-notlari$/;
  const match = slug.match(combinationPattern);
  
  if (match) {
    const gradeNum = match[1];
    const lessonSlug = match[2];
    const lessonNames: { [key: string]: string } = {
      'biyoloji': 'Biyoloji',
      'fizik': 'Fizik',
      'kimya': 'Kimya',
      'matematik': 'Matematik',
      'turkce': 'Türkçe',
      'tarih': 'Tarih',
      'cografya': 'Coğrafya',
      'ingilizce': 'İngilizce',
      'felsefe': 'Felsefe',
      'din-kulturu': 'Din Kültürü',
      'edebiyat': 'Edebiyat',
    };
    const lessonName = lessonNames[lessonSlug] || lessonSlug;
    return {
      grade: `${gradeNum}-sinif`,
      lesson: lessonSlug,
      title: `${gradeNum}. Sınıf ${lessonName} Ders Notları ve Detaylı Konu Anlatımı`,
      description: `${gradeNum}. sınıf ${lessonName.toLowerCase()} ders notları, konu anlatımları ve detaylı özetler. Ücretsiz ${gradeNum}. sınıf ${lessonName.toLowerCase()} ders notları.`
    };
  }
  
  // TYT/AYT kombinasyonları: tyt-matematik-ders-notlari
  if (slug.startsWith('tyt-') && slug.endsWith('-ders-notlari')) {
    const lessonSlug = slug.replace('tyt-', '').replace('-ders-notlari', '');
    const lessonNames: { [key: string]: string } = {
      'matematik': 'Matematik',
      'turkce': 'Türkçe',
      'fizik': 'Fizik',
      'kimya': 'Kimya',
      'biyoloji': 'Biyoloji',
      'tarih': 'Tarih',
      'cografya': 'Coğrafya',
    };
    const lessonName = lessonNames[lessonSlug] || lessonSlug;
    return {
      grade: 'tyt',
      lesson: lessonSlug,
      title: `TYT ${lessonName} Ders Notları ve Detaylı Konu Anlatımı`,
      description: `TYT ${lessonName.toLowerCase()} ders notları, konu anlatımları ve detaylı özetler. 2026 TYT hazırlık için ücretsiz ${lessonName.toLowerCase()} ders notları.`
    };
  }
  
  if (slug.startsWith('ayt-') && slug.endsWith('-ders-notlari')) {
    const lessonSlug = slug.replace('ayt-', '').replace('-ders-notlari', '');
    const lessonNames: { [key: string]: string } = {
      'matematik': 'Matematik',
      'fizik': 'Fizik',
      'kimya': 'Kimya',
      'biyoloji': 'Biyoloji',
      'edebiyat': 'Edebiyat',
      'tarih': 'Tarih',
      'cografya': 'Coğrafya',
    };
    const lessonName = lessonNames[lessonSlug] || lessonSlug;
    return {
      grade: 'ayt',
      lesson: lessonSlug,
      title: `AYT ${lessonName} Ders Notları ve Detaylı Konu Anlatımı`,
      description: `AYT ${lessonName.toLowerCase()} ders notları, konu anlatımları ve detaylı özetler. 2026 AYT hazırlık için ücretsiz ${lessonName.toLowerCase()} ders notları.`
    };
  }
  
  const slugMap: { [key: string]: { grade?: string; lesson?: string; title: string; description: string } } = {
    '9-sinif-ders-notlari': {
      grade: '9-sinif',
      title: '9. Sınıf Ders Notları ve Detaylı Konu Anlatımı',
      description: '9. sınıf ders notları, konu anlatımları ve detaylı özetler. Matematik, Fizik, Kimya, Biyoloji, Türkçe, Tarih, Coğrafya ve daha fazlası için ücretsiz 9. sınıf ders notları.'
    },
    '10-sinif-ders-notlari': {
      grade: '10-sinif',
      title: '10. Sınıf Ders Notları ve Detaylı Konu Anlatımı',
      description: '10. sınıf ders notları, konu anlatımları ve detaylı özetler. Matematik, Fizik, Kimya, Biyoloji, Türkçe, Tarih, Coğrafya ve daha fazlası için ücretsiz 10. sınıf ders notları.'
    },
    '11-sinif-ders-notlari': {
      grade: '11-sinif',
      title: '11. Sınıf Ders Notları ve Detaylı Konu Anlatımı',
      description: '11. sınıf ders notları, konu anlatımları ve detaylı özetler. Matematik, Fizik, Kimya, Biyoloji, Türkçe, Tarih, Coğrafya ve daha fazlası için ücretsiz 11. sınıf ders notları.'
    },
    '12-sinif-ders-notlari': {
      grade: '12-sinif',
      title: '12. Sınıf Ders Notları ve Detaylı Konu Anlatımı',
      description: '12. sınıf ders notları, konu anlatımları ve detaylı özetler. YKS hazırlık için Matematik, Fizik, Kimya, Biyoloji, Türkçe, Tarih, Coğrafya ve daha fazlası için ücretsiz 12. sınıf ders notları.'
    },
    'tyt-ders-notlari': {
      grade: 'tyt',
      title: 'TYT Ders Notları ve Detaylı Konu Anlatımı',
      description: 'TYT (Temel Yeterlilik Testi) ders notları, konu anlatımları ve detaylı özetler. 2026 TYT hazırlık için Matematik, Türkçe, Fizik, Kimya, Biyoloji, Tarih, Coğrafya ve daha fazlası için ücretsiz TYT ders notları.'
    },
    'ayt-ders-notlari': {
      grade: 'ayt',
      title: 'AYT Ders Notları ve Detaylı Konu Anlatımı',
      description: 'AYT (Alan Yeterlilik Testi) ders notları, konu anlatımları ve detaylı özetler. 2026 AYT hazırlık için Matematik, Fizik, Kimya, Biyoloji, Edebiyat, Tarih, Coğrafya ve daha fazlası için ücretsiz AYT ders notları.'
    },
    'biyoloji-ders-notlari': {
      lesson: 'biyoloji',
      title: 'Biyoloji Ders Notları ve Detaylı Konu Anlatımı',
      description: 'Biyoloji ders notları, konu anlatımları ve detaylı özetler. 9, 10, 11, 12. sınıf ve YKS hazırlık için ücretsiz biyoloji ders notları. Hücre, genetik, ekoloji ve daha fazlası.'
    },
    'fizik-ders-notlari': {
      lesson: 'fizik',
      title: 'Fizik Ders Notları ve Detaylı Konu Anlatımı',
      description: 'Fizik ders notları, konu anlatımları ve detaylı özetler. 9, 10, 11, 12. sınıf ve YKS hazırlık için ücretsiz fizik ders notları. Mekanik, elektrik, manyetizma ve daha fazlası.'
    },
    'kimya-ders-notlari': {
      lesson: 'kimya',
      title: 'Kimya Ders Notları ve Detaylı Konu Anlatımı',
      description: 'Kimya ders notları, konu anlatımları ve detaylı özetler. 9, 10, 11, 12. sınıf ve YKS hazırlık için ücretsiz kimya ders notları. Atom, periyodik tablo, kimyasal reaksiyonlar ve daha fazlası.'
    },
    'matematik-ders-notlari': {
      lesson: 'matematik',
      title: 'Matematik Ders Notları ve Detaylı Konu Anlatımı',
      description: 'Matematik ders notları, konu anlatımları ve detaylı özetler. 9, 10, 11, 12. sınıf ve YKS hazırlık için ücretsiz matematik ders notları. Cebir, geometri, analiz ve daha fazlası.'
    },
    'turkce-ders-notlari': {
      lesson: 'turkce',
      title: 'Türkçe Ders Notları ve Detaylı Konu Anlatımı',
      description: 'Türkçe ders notları, konu anlatımları ve detaylı özetler. 9, 10, 11, 12. sınıf ve YKS hazırlık için ücretsiz türkçe ders notları. Dil bilgisi, edebiyat, kompozisyon ve daha fazlası.'
    },
    'tarih-ders-notlari': {
      lesson: 'tarih',
      title: 'Tarih Ders Notları ve Detaylı Konu Anlatımı',
      description: 'Tarih ders notları, konu anlatımları ve detaylı özetler. 9, 10, 11, 12. sınıf ve YKS hazırlık için ücretsiz tarih ders notları. Osmanlı tarihi, Türkiye tarihi, dünya tarihi ve daha fazlası.'
    },
    'cografya-ders-notlari': {
      lesson: 'cografya',
      title: 'Coğrafya Ders Notları ve Detaylı Konu Anlatımı',
      description: 'Coğrafya ders notları, konu anlatımları ve detaylı özetler. 9, 10, 11, 12. sınıf ve YKS hazırlık için ücretsiz coğrafya ders notları. Fiziki coğrafya, beşeri coğrafya, Türkiye coğrafyası ve daha fazlası.'
    },
    'ingilizce-ders-notlari': {
      lesson: 'ingilizce',
      title: 'İngilizce Ders Notları ve Detaylı Konu Anlatımı',
      description: 'İngilizce ders notları, konu anlatımları ve detaylı özetler. 9, 10, 11, 12. sınıf ve YKS hazırlık için ücretsiz ingilizce ders notları. Grammar, vocabulary, reading ve daha fazlası.'
    },
    'felsefe-ders-notlari': {
      lesson: 'felsefe',
      title: 'Felsefe Ders Notları ve Detaylı Konu Anlatımı',
      description: 'Felsefe ders notları, konu anlatımları ve detaylı özetler. 9, 10, 11, 12. sınıf ve YKS hazırlık için ücretsiz felsefe ders notları. Felsefe tarihi, mantık, etik ve daha fazlası.'
    },
    'din-kulturu-ders-notlari': {
      lesson: 'din-kulturu',
      title: 'Din Kültürü Ders Notları ve Detaylı Konu Anlatımı',
      description: 'Din Kültürü ders notları, konu anlatımları ve detaylı özetler. 9, 10, 11, 12. sınıf için ücretsiz din kültürü ders notları. İslam dini, ahlak, kültür ve daha fazlası.'
    },
    'edebiyat-ders-notlari': {
      lesson: 'edebiyat',
      title: 'Edebiyat Ders Notları ve Detaylı Konu Anlatımı',
      description: 'Edebiyat ders notları, konu anlatımları ve detaylı özetler. 9, 10, 11, 12. sınıf ve YKS hazırlık için ücretsiz edebiyat ders notları. Türk edebiyatı, dünya edebiyatı, şiir, roman ve daha fazlası.'
    },
  };

  return slugMap[slug] || { title: 'Ders Notları', description: 'Ücretsiz lise ders notları' };
};

// Konu ve derse göre görsel ve renk eşleştirmesi (homepage'den kopyalandı)
const getLessonImage = (lessonName: string, topicName?: string) => {
  const lesson = lessonName?.toLowerCase() || '';
  const topic = topicName?.toLowerCase() || '';
  
  if (lesson.includes('matematik')) {
    return { gradient: 'from-blue-500 to-purple-600', icon: '📐', bgColor: 'bg-blue-500' };
  }
  if (lesson.includes('fizik')) {
    return { gradient: 'from-purple-500 to-pink-600', icon: '💡', bgColor: 'bg-purple-500' };
  }
  if (lesson.includes('kimya')) {
    return { gradient: 'from-orange-500 to-red-600', icon: '⚗️', bgColor: 'bg-orange-500' };
  }
  if (lesson.includes('biyoloji')) {
    return { gradient: 'from-green-500 to-teal-600', icon: '🔬', bgColor: 'bg-green-500' };
  }
  return { gradient: 'from-gray-500 to-gray-700', icon: '📚', bgColor: 'bg-gray-500' };
};

export default function DersNotlariPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { grade, lesson, title: pageTitle, description: pageDescription } = parseSlug(slug);
  
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [stats, setStats] = useState({
    totalNotes: 0,
    totalViews: 0,
    totalLikes: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    // SEO Meta Tags
    document.title = `${pageTitle} | DersNotu.net`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = pageDescription;
      document.head.appendChild(meta);
    }

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.role);
        setUserName(payload.username || payload.email || 'Kullanıcı');
      } catch {
        // JWT decode hatası
      }
    }

    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const fetchedNotes = await notesApi.getAll(lesson || undefined, grade || undefined);
        
        if (!fetchedNotes || fetchedNotes.length === 0) {
          setNotes([]);
          setStats({ totalNotes: 0, totalViews: 0, totalLikes: 0, activeUsers: 0 });
          return;
        }
        
        const mappedNotes = fetchedNotes.map(note => ({
          ...note,
          imageUrl: note.fileUrl || note.imageUrl,
        }));
        
        setNotes(mappedNotes);
        
        const totalViews = mappedNotes.reduce((sum: number, note: Note) => sum + note.viewCount, 0);
        const totalLikes = mappedNotes.reduce((sum: number, note: Note) => sum + note.likeCount, 0);
        const uniqueUsers = new Set(mappedNotes.map((note: Note) => note.uploader.username)).size;
        
        setStats({
          totalNotes: mappedNotes.length,
          totalViews,
          totalLikes,
          activeUsers: uniqueUsers,
        });
      } catch (error) {
        console.error('Notlar yüklenemedi:', error);
        setNotes([]);
        setStats({ totalNotes: 0, totalViews: 0, totalLikes: 0, activeUsers: 0 });
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [router, grade, lesson, pageTitle, pageDescription]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showUserMenu && !target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  const filteredNotes = notes.filter((note: Note) => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.topic?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.topic?.lesson?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>

      <WebsiteStructuredData />
      <OrganizationStructuredData />
      <EducationalOrganizationStructuredData />
      
      <div className="min-h-screen bg-[#F9FAFB]">
        {/* Header - Homepage ile aynı */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex-1 flex justify-center">
                <Link href="/" className="flex items-center space-x-3">
                  <Image 
                    src="/logo1.png" 
                    alt="DersNotu.net" 
                    width={130} 
                    height={130}
                    className="object-contain"
                  />
                </Link>
              </div>
              
              <div className="flex-1 flex justify-end">
                <div className="hidden md:block relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Not ara..."
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border-gray-200 rounded-xl focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                  />
                </div>
                
                <button
                  className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                >
                  <Search className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              <div className="flex-1 flex justify-end items-center space-x-4 ml-4">
                {!userRole ? (
                  <>
                    <Link href="/login">
                      <Button variant="ghost" className="text-gray-700 hover:text-[#3B82F6]">
                        Giriş Yap
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white">
                        Kayıt Ol
                      </Button>
                    </Link>
                  </>
                ) : userRole === 'ADMIN' ? (
                  <Link href="/admin">
                    <Button variant="outline" size="sm">
                      Admin Panel
                    </Button>
                  </Link>
                ) : (
                  <div className="relative user-menu-container">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <div className="h-8 w-8 rounded-full bg-[#3B82F6] flex items-center justify-center text-white font-semibold text-sm">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                    </button>
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 user-menu-container">
                        <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={() => setShowUserMenu(false)}>
                          <FileText className="h-4 w-4" />
                          Not Yükle
                        </Link>
                        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={() => setShowUserMenu(false)}>
                          <User className="h-4 w-4" />
                          Profil
                        </Link>
                        <Link href="/leaderboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={() => setShowUserMenu(false)}>
                          <Trophy className="h-4 w-4" />
                          Liderlik Tablosu
                        </Link>
                        <button
                          onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('userRole');
                            setUserRole(null);
                            setUserName('');
                            setShowUserMenu(false);
                            router.push('/');
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <LogOut className="h-4 w-4" />
                          Çıkış Yap
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {mobileSearchOpen && (
          <div className="fixed top-20 left-0 right-0 bg-white border-b border-gray-200 p-4 md:hidden z-40 shadow-lg">
            <div className="relative max-w-7xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Not ara..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 py-2 w-full border-gray-200 rounded-xl focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                autoFocus
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setMobileSearchOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{pageTitle}</h1>
                <p className="text-gray-600">{pageDescription}</p>
              </div>
            </div>

            {/* Notes Grid - Homepage ile aynı */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <Card key={i} className="border-0 shadow-sm bg-white rounded-2xl animate-pulse">
                    <CardContent className="p-0">
                      <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
                      <div className="p-6">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredNotes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map((note: Note) => {
                  const lessonImage = getLessonImage(
                    note.topic?.lesson?.name || '',
                    note.topic?.name || ''
                  );
                  return (
                    <Link key={note.id} href={`/konu/${note.slug}`}>
                      <Card className="border-0 shadow-sm bg-white rounded-2xl hover:shadow-lg transition-all duration-200 group cursor-pointer overflow-hidden transform hover:scale-[1.02]">
                        <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${lessonImage.gradient}`}>
                          {note.imageUrl ? (
                            <div className="relative w-full h-full">
                              <img
                                src={note.imageUrl}
                                alt={note.title}
                                className="w-full h-full object-contain bg-gray-100"
                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                              />
                              <div className={`absolute inset-0 bg-gradient-to-br ${lessonImage.gradient} opacity-60`}></div>
                            </div>
                          ) : (
                            <>
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10"></div>
                              <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-30 animate-pulse">
                                {lessonImage.icon}
                              </div>
                            </>
                          )}
                          
                          <div className="absolute bottom-4 left-4">
                            <span className={`px-3 py-1 ${lessonImage.bgColor} text-white rounded-lg text-sm font-semibold shadow-lg`}>
                              {note.topic?.lesson?.name || 'Ders'}
                            </span>
                          </div>
                          
                          {note.topic?.lesson?.grade?.name && (
                            <div className="absolute bottom-4 right-4">
                              <span className="px-3 py-1 bg-purple-500/90 backdrop-blur-sm text-white rounded-lg text-xs font-medium shadow-lg">
                                {note.topic.lesson.grade.name}
                              </span>
                            </div>
                          )}
                        </div>

                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-[#3B82F6] transition-colors">
                            {note.title}
                          </h3>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <FileText className="h-4 w-4 mr-2 text-gray-400" />
                              <span>Konu Anlatımı</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-2 text-gray-400" />
                              <span>Müfredat Süresi: 2 saat</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{note.viewCount}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Heart className="h-3 w-3" />
                                <span>{note.likeCount}</span>
                              </div>
                            </div>
                            <div className="flex items-center text-[#3B82F6] text-sm font-medium">
                              <span>Üniteye Git</span>
                              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <Card className="border-0 shadow-sm bg-white rounded-2xl">
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {searchQuery ? 'Arama sonucu bulunamadı' : 'Henüz not bulunmuyor'}
                  </p>
                </CardContent>
              </Card>
            )}
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

