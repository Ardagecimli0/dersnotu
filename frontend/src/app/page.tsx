'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
} from 'lucide-react';
import { notesApi, Note } from '@/lib/api';

// Konu ve derse göre görsel ve renk eşleştirmesi
const getLessonImage = (lessonName: string, topicName?: string) => {
  const lesson = lessonName?.toLowerCase() || '';
  const topic = topicName?.toLowerCase() || '';
  
  // Matematik
  if (lesson.includes('matematik')) {
    if (topic.includes('küme') || topic.includes('kumeler')) {
      return {
        gradient: 'from-blue-400 via-purple-500 to-pink-500',
        icon: '📊',
        bgColor: 'bg-blue-500'
      };
    }
    if (topic.includes('sayı') || topic.includes('sayi')) {
      return {
        gradient: 'from-indigo-500 via-blue-500 to-cyan-500',
        icon: '🔢',
        bgColor: 'bg-indigo-500'
      };
    }
    return {
      gradient: 'from-blue-500 to-purple-600',
      icon: '📐',
      bgColor: 'bg-blue-500'
    };
  }
  
  // Fizik
  if (lesson.includes('fizik')) {
    if (topic.includes('hareket') || topic.includes('kuvvet')) {
      return {
        gradient: 'from-purple-500 via-pink-500 to-red-500',
        icon: '⚡',
        bgColor: 'bg-purple-500'
      };
    }
    return {
      gradient: 'from-purple-500 to-pink-600',
      icon: '💡',
      bgColor: 'bg-purple-500'
    };
  }
  
  // Kimya
  if (lesson.includes('kimya')) {
    if (topic.includes('atom') || topic.includes('periyodik')) {
      return {
        gradient: 'from-orange-400 via-red-500 to-pink-500',
        icon: '⚛️',
        bgColor: 'bg-orange-500'
      };
    }
    if (topic.includes('etkileşim') || topic.includes('etkilesim')) {
      return {
        gradient: 'from-orange-500 via-red-600 to-rose-600',
        icon: '🧪',
        bgColor: 'bg-orange-500'
      };
    }
    return {
      gradient: 'from-orange-500 to-red-600',
      icon: '⚗️',
      bgColor: 'bg-orange-500'
    };
  }
  
  // Biyoloji
  if (lesson.includes('biyoloji')) {
    if (topic.includes('hücre') || topic.includes('hucre')) {
      return {
        gradient: 'from-green-400 via-emerald-500 to-teal-500',
        icon: '🔬',
        bgColor: 'bg-green-500'
      };
    }
    if (topic.includes('yaşam') || topic.includes('yasam')) {
      return {
        gradient: 'from-green-500 via-teal-500 to-cyan-500',
        icon: '🌱',
        bgColor: 'bg-green-500'
      };
    }
    return {
      gradient: 'from-green-500 to-teal-600',
      icon: '🔬',
      bgColor: 'bg-green-500'
    };
  }
  
  // Tarih
  if (lesson.includes('tarih')) {
    if (topic.includes('ilk çağ') || topic.includes('ilk cag')) {
      return {
        gradient: 'from-amber-500 via-orange-600 to-red-600',
        icon: '🏛️',
        bgColor: 'bg-amber-600'
      };
    }
    return {
      gradient: 'from-amber-600 to-orange-700',
      icon: '📜',
      bgColor: 'bg-amber-600'
    };
  }
  
  // Coğrafya
  if (lesson.includes('coğrafya') || lesson.includes('cografya')) {
    if (topic.includes('doğa') || topic.includes('doga')) {
      return {
        gradient: 'from-blue-300 via-cyan-500 to-teal-600',
        icon: '🌍',
        bgColor: 'bg-blue-400'
      };
    }
    return {
      gradient: 'from-blue-400 to-cyan-600',
      icon: '🌍',
      bgColor: 'bg-blue-400'
    };
  }
  
  // Edebiyat
  if (lesson.includes('edebiyat')) {
    if (topic.includes('şiir') || topic.includes('siir')) {
      return {
        gradient: 'from-pink-400 via-rose-500 to-red-500',
        icon: '📝',
        bgColor: 'bg-pink-500'
      };
    }
    if (topic.includes('söz') || topic.includes('soz')) {
      return {
        gradient: 'from-pink-500 via-rose-600 to-red-600',
        icon: '✍️',
        bgColor: 'bg-pink-500'
      };
    }
    return {
      gradient: 'from-pink-500 to-rose-600',
      icon: '📖',
      bgColor: 'bg-pink-500'
    };
  }
  
  // Din Kültürü
  if (lesson.includes('din') || lesson.includes('kültür')) {
    if (topic.includes('islam') || topic.includes('allah')) {
      return {
        gradient: 'from-green-500 via-emerald-600 to-teal-700',
        icon: '🕌',
        bgColor: 'bg-green-600'
      };
    }
    return {
      gradient: 'from-green-600 to-emerald-700',
      icon: '🕌',
      bgColor: 'bg-green-600'
    };
  }
  
  // Felsefe
  if (lesson.includes('felsefe')) {
    if (topic.includes('giriş') || topic.includes('giris')) {
      return {
        gradient: 'from-indigo-400 via-blue-500 to-purple-500',
        icon: '🤔',
        bgColor: 'bg-indigo-500'
      };
    }
    return {
      gradient: 'from-indigo-500 to-blue-600',
      icon: '🤔',
      bgColor: 'bg-indigo-500'
    };
  }
  
  // İngilizce
  if (lesson.includes('ingilizce') || lesson.includes('english')) {
    if (topic.includes('grammar') || topic.includes('dilbilgisi')) {
      return {
        gradient: 'from-red-400 via-pink-500 to-rose-500',
        icon: '🇬🇧',
        bgColor: 'bg-red-500'
      };
    }
    return {
      gradient: 'from-red-500 to-pink-600',
      icon: '🇬🇧',
      bgColor: 'bg-red-500'
    };
  }
  
  // Varsayılan
  return {
    gradient: 'from-gray-500 to-gray-700',
    icon: '📚',
    bgColor: 'bg-gray-500'
  };
};

export default function HomePage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [stats, setStats] = useState({
    totalNotes: 0,
    totalViews: 0,
    totalLikes: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
      return;
    }

    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        console.log('Notlar yükleniyor...', { selectedLesson, selectedGrade });
        const fetchedNotes = await notesApi.getAll(selectedLesson || undefined, selectedGrade || undefined);
        console.log('API\'den gelen notlar:', fetchedNotes);
        
        if (!fetchedNotes || fetchedNotes.length === 0) {
          console.warn('API\'den boş veri geldi');
          setNotes([]);
          setStats({
            totalNotes: 0,
            totalViews: 0,
            totalLikes: 0,
            activeUsers: 0,
          });
          return;
        }
        
        // fileUrl'i imageUrl'e map et
        const mappedNotes = fetchedNotes.map(note => ({
          ...note,
          imageUrl: note.fileUrl || note.imageUrl,
        }));
        
        console.log('Map edilmiş notlar:', mappedNotes);
        setNotes(mappedNotes); // Tüm notları göster
        
        // İstatistikleri hesapla
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
        // Hata durumunda boş array set et
        setNotes([]);
        setStats({
          totalNotes: 0,
          totalViews: 0,
          totalLikes: 0,
          activeUsers: 0,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [router, selectedLesson, selectedGrade]);

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.topic?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.topic?.lesson?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Glassmorphism Navbar with Logo and Search */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Center */}
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
            
            {/* Search Bar - Right */}
            <div className="flex-1 flex justify-end">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Not ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-gray-200 rounded-xl focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                />
              </div>
            </div>

            {/* Auth Buttons - Right */}
            <div className="flex-1 flex justify-end items-center space-x-4 ml-4">
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
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Stats */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ders Notlarını
              <span className="text-[#3B82F6]"> Paylaş</span> ve
              <span className="text-[#3B82F6]"> Öğren</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Öğrenciler için tasarlanmış modern ders notu paylaşım platformu. 
              Notlarını paylaş, puan kazan, binlerce öğrencinin notlarından faydalan.
            </p>
          </div>

          {/* Stats Widget Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-0 shadow-sm bg-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Toplam Not</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalNotes}</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-[#3B82F6]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Toplam Görüntüleme</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center">
                    <Eye className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Toplam Beğeni</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalLikes.toLocaleString()}</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-pink-50 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-pink-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Aktif Kullanıcı</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Notes Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Son Eklenen Notlar</h2>
              <p className="text-gray-600">Onaylanmış ders notlarını keşfedin</p>
            </div>
          </div>

          {/* Filter Menu */}
          <div className="mb-8 space-y-4">
            {/* Top Row - Subject Filters */}
            <div className="flex items-center space-x-6 overflow-x-auto pb-2 border-b border-gray-200">
              <div className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-[#3B82F6] transition-colors">
                <span className="font-medium">Tüm Sınıflar</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              
              <button
                onClick={() => {
                  setSelectedLesson('');
                  setSelectedGrade('');
                }}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  !selectedLesson && !selectedGrade
                    ? 'text-[#3B82F6] border-b-2 border-[#3B82F6]'
                    : 'text-gray-700 hover:text-[#3B82F6]'
                }`}
              >
                Tüm Notlar
              </button>
              
              {[
                { name: 'Biyoloji', slug: 'biyoloji' },
                { name: 'Fizik', slug: 'fizik' },
                { name: 'Kimya', slug: 'kimya' },
                { name: 'Matematik', slug: 'matematik' },
                { name: 'Edebiyat', slug: 'edebiyat' },
                { name: 'Tarih', slug: 'tarih' },
                { name: 'Coğrafya', slug: 'cografya' },
                { name: 'Din Kültürü', slug: 'din-kulturu' },
                { name: 'Felsefe', slug: 'felsefe' },
                { name: 'İngilizce', slug: 'ingilizce' },
              ].map((subject) => (
                <button
                  key={subject.slug}
                  onClick={() => {
                    setSelectedLesson(subject.slug);
                    setSelectedGrade('');
                  }}
                  className={`px-2 py-2 text-sm transition-colors whitespace-nowrap ${
                    selectedLesson === subject.slug
                      ? 'text-[#3B82F6] font-medium'
                      : 'text-gray-700 hover:text-[#3B82F6]'
                  }`}
                >
                  {subject.name}
                </button>
              ))}
            </div>

            {/* Bottom Row - Grade Filters */}
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              <button
                onClick={() => {
                  setSelectedGrade('');
                  setSelectedLesson('');
                }}
                className="px-4 py-2 rounded-full text-white text-sm font-medium bg-gradient-to-r from-green-500 to-purple-500 hover:from-green-600 hover:to-purple-600 transition-all whitespace-nowrap flex items-center space-x-2 shadow-sm"
              >
                <Target className="h-4 w-4" />
                <span>Yazılıya Hazırlık</span>
              </button>
              
              {['9-sinif', '10-sinif', '11-sinif', '12-sinif'].map((gradeSlug) => {
                const gradeName = gradeSlug.replace('-', '. ').replace('sinif', 'Sınıf Ders Notları');
                return (
                  <button
                    key={gradeSlug}
                    onClick={() => {
                      setSelectedGrade(gradeSlug);
                      setSelectedLesson('');
                    }}
                    className={`px-4 py-2 rounded-full text-white text-sm font-medium transition-all whitespace-nowrap flex items-center space-x-2 shadow-sm ${
                      selectedGrade === gradeSlug
                        ? 'bg-gradient-to-r from-green-600 to-purple-700 scale-105'
                        : 'bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700'
                    }`}
                  >
                    <Layers className="h-4 w-4" />
                    <span>{gradeName}</span>
                  </button>
                );
              })}
              
              <button
                onClick={() => {
                  setSelectedGrade('');
                  setSelectedLesson('');
                }}
                className="px-4 py-2 rounded-full text-white text-sm font-medium bg-gradient-to-r from-purple-500 to-green-500 hover:from-purple-600 hover:to-green-600 transition-all whitespace-nowrap flex items-center space-x-2 shadow-sm"
              >
                <Layers className="h-4 w-4" />
                <span>Lise Konuları</span>
              </button>
            </div>
          </div>

          {/* Notes Grid */}
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
              {filteredNotes.map((note, index) => {
                const lessonImage = getLessonImage(
                  note.topic?.lesson?.name || '',
                  note.topic?.name || ''
                );
                return (
                  <Link key={note.id} href={`/notes/${note.id}`}>
                    <Card className="border-0 shadow-sm bg-white rounded-2xl hover:shadow-lg transition-all duration-200 group cursor-pointer overflow-hidden transform hover:scale-[1.02]">
                      {/* Görsel Header - Gradient Background */}
                      <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${lessonImage.gradient} ${note.imageUrl ? '' : ''}`}>
                        {note.imageUrl ? (
                          <div className="relative w-full h-full">
                            <img
                              src={note.imageUrl}
                              alt={note.title}
                              className="w-full h-full object-cover"
                            />
                            {/* Overlay gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${lessonImage.gradient} opacity-60`}></div>
                          </div>
                        ) : (
                          <>
                            {/* Animated gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-30 animate-pulse">
                              {lessonImage.icon}
                            </div>
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                          </>
                        )}
                        
                        {/* Subject Label - Bottom Left */}
                        <div className="absolute bottom-4 left-4">
                          <span className={`px-3 py-1 ${lessonImage.bgColor} text-white rounded-lg text-sm font-semibold shadow-lg`}>
                            {note.topic?.lesson?.name || 'Ders'}
                          </span>
                        </div>
                        
                        {/* Grade Label - Bottom Right */}
                        {note.topic?.lesson?.grade?.name && (
                          <div className="absolute bottom-4 right-4">
                            <span className="px-3 py-1 bg-purple-500/90 backdrop-blur-sm text-white rounded-lg text-xs font-medium shadow-lg">
                              {note.topic.lesson.grade.name}
                            </span>
                          </div>
                        )}
                      </div>

                      <CardContent className="p-6">
                        {/* Title */}
                        <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-[#3B82F6] transition-colors">
                          {note.title}
                        </h3>

                        {/* Info Icons */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <FileText className="h-4 w-4 mr-2 text-gray-400" />
                            <span>Konu Anlatımı</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                            <span>Müfredat Süresi: 2 saat</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="line-clamp-1">Uyumlu Müfredat: 2025-2026 Türkiye Yüzyılı Maarif Modeli</span>
                          </div>
                        </div>

                        {/* Stats */}
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

        {/* Features Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Neden DersNotu.net?</h2>
            <p className="text-gray-600">Öğrenciler için tasarlanmış modern özellikler</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-sm bg-white rounded-2xl hover:shadow-md transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-[#3B82F6]" />
                </div>
                <CardTitle className="text-gray-900">Kapsamlı Arşiv</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  9. sınıftan TYT'ye kadar tüm derslerin notlarına tek yerden erişin. 
                  Binlerce kaliteli ders notu seni bekliyor.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white rounded-2xl hover:shadow-md transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-gray-900">Puan Sistemi</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Not paylaştıkça puan kazan, seviye atla ve özel ödülleri kazanın. 
                  Toplulukta öne çık ve liderlik tablosunda yerini al.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white rounded-2xl hover:shadow-md transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-gray-900">Aktif Topluluk</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Binlerce öğrencinin katkıda bulunduğu öğrenme topluluğuna katılın. 
                  Sorularını sor, cevaplarını paylaş, birlikte öğren.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-12">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-[#3B82F6] to-[#2563EB] rounded-2xl">
            <CardContent className="p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Öğrenmeye Başlamaya Hazır mısın?
              </h2>
              <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                Hemen kaydol, notlarını paylaş ve topluluğumuzun bir parçası ol. 
                Ücretsiz ve kolay!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
  <Link href="/register">
    <Button size="lg" variant="secondary" className="bg-white text-[#3B82F6] hover:bg-gray-50">
      Ücretsiz Kaydol
      <ArrowRight className="h-4 w-4 ml-2" />
    </Button>
  </Link>
  
  <Link href="/login">
    <Button size="lg" variant="secondary" className="bg-white text-[#3B82F6] hover:bg-gray-50">
      Zaten Hesabım Var
    </Button>
  </Link>
</div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Image src="/logo.png" alt="DersNotu.net" width={32} height={32} />
              <span className="text-xl font-bold text-gray-900">DersNotu.net</span>
            </div>
            <p className="text-gray-600 mb-4">
              Öğrenciler için öğrenciler tarafından tasarlandı.
            </p>
            <div className="text-gray-500 text-sm">
              © 2024 DersNotu.net. Tüm hakları saklıdır.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
