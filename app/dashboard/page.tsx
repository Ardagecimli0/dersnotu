'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { notesApi, usersApi, gradesApi } from '@/lib/api';
import { ChevronDown, Upload, Image as ImageIcon, User, LogOut, FileText } from 'lucide-react';
import { Footer } from '@/components/footer';
import { RichTextEditor } from '@/components/rich-text-editor';

interface Note {
  id: string;
  title: string;
  content?: string;
  status: string;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  uploader: {
    username: string;
  };
  topic: {
    name: string;
    lesson?: {
      name: string;
      grade?: {
        name: string;
      };
    };
  };
}

interface Grade {
  id: number;
  name: string;
  slug: string;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  name: string;
  slug: string;
  topics: Topic[];
}

interface Topic {
  id: number;
  name: string;
  slug: string;
}

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [selectedGradeId, setSelectedGradeId] = useState<number | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [topicName, setTopicName] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Decode JWT to get user role and username
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUserRole(payload.role);
            setUserName(payload.username || payload.email || 'Kullanıcı');
          } catch {
            // If decode fails, try to get from API
            try {
              const profile = await usersApi.getProfile();
              setUserRole(profile.role);
              setUserName(profile.username || profile.email || 'Kullanıcı');
            } catch (apiError: unknown) {
              // API hatası için özel işlem yapma, ana catch bloğu yakalayacak
              throw apiError;
            }
          }
        }

        // Fetch grades and lessons
        const fetchedGrades = await gradesApi.getAll();
        setGrades(fetchedGrades as Grade[]);

        const fetchedNotes = await notesApi.getAll();
        setNotes(fetchedNotes as Note[]);
      } catch (error: any) {
        // 401 Unauthorized hatası için sessizce login'e yönlendir
        if (error?.status === 401 || error?.message?.includes('401') || error?.message?.includes('Unauthorized')) {
          router.push('/login');
          return;
        }
        // Diğer hatalar için log göster
        console.error('Veriler yüklenemedi:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  // Menü dışına tıklanınca kapat
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

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !selectedGradeId || !selectedLessonId || !topicName.trim()) {
      alert('Lütfen başlık, sınıf, ders ve konu bilgilerini girin');
      return;
    }

    setIsUploading(true);
    try {
      await notesApi.create({
        title,
        content: content || undefined,
        topicName: topicName,
        lessonId: selectedLessonId!,
        fileUrl: fileUrl || imageUrl || undefined,
      });
      setTitle('');
      setContent('');
      setImageUrl('');
      setFileUrl('');
      setTopicName('');
      setSelectedGradeId(null);
      setSelectedLessonId(null);
      // Refresh notes
      const fetchedNotes = await notesApi.getAll();
      setNotes(fetchedNotes as Note[]);
      alert('Not başarıyla gönderildi! Onay bekleniyor.');
    } catch (error: any) {
      // 401 Unauthorized hatası için sessizce login'e yönlendir
      if (error?.status === 401 || error?.message?.includes('401') || error?.message?.includes('Unauthorized')) {
        router.push('/login');
        return;
      }
      // Diğer hatalar için kullanıcıya bildir
      alert(error.message || 'Not yüklenemedi');
      console.error('Not yüklenemedi:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const selectedGrade = grades.find(g => g.id === selectedGradeId);
  const selectedLesson = selectedGrade?.lessons.find(l => l.id === selectedLessonId);
  const availableTopics = selectedLesson?.topics || [];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
              DersNotu.net
            </Link>
            <div className="flex items-center gap-4">
              {userRole === 'ADMIN' && (
                <Link href="/admin">
                  <Button variant="outline" size="sm">
                    Admin Panel
                  </Button>
                </Link>
              )}
              {userRole !== 'ADMIN' && (
                <div className="relative user-menu-container">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-[#3B82F6] flex items-center justify-center text-white font-semibold">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 user-menu-container">
                      <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Not Yükle
                      </Link>
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Profil
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowUserMenu(false);
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="text-white">Yeni Not Yükle</CardTitle>
                <CardDescription className="text-blue-100">
                  Ders notunuzu paylaşın ve puan kazanın
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpload} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Başlık *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Not başlığı"
                      required
                    />
                  </div>

                  {/* Sınıf Seçimi */}
                  <div className="space-y-2">
                    <Label htmlFor="grade">Sınıf *</Label>
                    <div className="relative">
                      <select
                        id="grade"
                        value={selectedGradeId || ''}
                        onChange={(e) => {
                          const gradeId = e.target.value ? parseInt(e.target.value) : null;
                          setSelectedGradeId(gradeId);
                          setSelectedLessonId(null);
                          setTopicName('');
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md appearance-none bg-white pr-8"
                        required
                      >
                        <option value="">Sınıf seçin</option>
                        {grades.map((grade) => (
                          <option key={grade.id} value={grade.id}>
                            {grade.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Ders Seçimi */}
                  {selectedGrade && (
                    <div className="space-y-2">
                      <Label htmlFor="lesson">Ders *</Label>
                      <div className="relative">
                        <select
                          id="lesson"
                          value={selectedLessonId || ''}
                          onChange={(e) => {
                            const lessonId = e.target.value ? parseInt(e.target.value) : null;
                            setSelectedLessonId(lessonId);
                            setTopicName('');
                          }}
                          className="w-full p-2 border border-gray-300 rounded-md appearance-none bg-white pr-8"
                          required
                        >
                          <option value="">Ders seçin</option>
                          {selectedGrade.lessons.map((lesson) => (
                            <option key={lesson.id} value={lesson.id}>
                              {lesson.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  )}

                  {/* Konu Input */}
                  {selectedLesson && (
                    <div className="space-y-2">
                      <Label htmlFor="topic">Konu *</Label>
                      <Input
                        id="topic"
                        type="text"
                        value={topicName}
                        onChange={(e) => setTopicName(e.target.value)}
                        placeholder="Konu adını yazın (örn: Kümeler, Türev, Atom)"
                        required
                      />
                      {availableTopics.length > 0 && (
                        <p className="text-xs text-gray-500">
                          Önerilen konular: {availableTopics.map(t => t.name).join(', ')}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Görsel URL */}
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">
                      <ImageIcon className="h-4 w-4 inline mr-1" />
                      Görsel URL (opsiyonel)
                    </Label>
                    <Input
                      id="imageUrl"
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* Dosya URL */}
                  <div className="space-y-2">
                    <Label htmlFor="fileUrl">
                      <Upload className="h-4 w-4 inline mr-1" />
                      Dosya URL (PDF, opsiyonel)
                    </Label>
                    <Input
                      id="fileUrl"
                      type="url"
                      value={fileUrl}
                      onChange={(e) => setFileUrl(e.target.value)}
                      placeholder="https://example.com/note.pdf"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Not İçeriği (opsiyonel)</Label>
                    <p className="text-xs text-gray-500 mb-2">
                      Başlık boyutları, görseller, listeler ve daha fazlasını ekleyebilirsiniz
                    </p>
                    <RichTextEditor
                      value={content}
                      onChange={setContent}
                      placeholder="Not içeriğinizi buraya yazın..."
                      className="bg-white"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isUploading}>
                    {isUploading ? 'Yükleniyor...' : 'Notu Yükle'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Notes List */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Tüm Notlar</CardTitle>
                    <CardDescription>
                      Toplam {notes.length} onaylanmış not bulundu
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="border rounded-lg p-5 hover:shadow-md transition-all bg-white hover:border-blue-300"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{note.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          note.status === 'APPROVED' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {note.status === 'APPROVED' ? 'Onaylandı' : 'Beklemede'}
                        </span>
                      </div>
                      
                      {note.content && (
                        <p className="text-gray-600 mb-3 text-sm">{note.content}</p>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div>
                          {note.topic?.lesson?.grade?.name && note.topic?.lesson?.name ? (
                            <>
                              <span className="font-medium">{note.topic.lesson.grade.name} - {note.topic.lesson.name}</span>
                              <span className="mx-2">•</span>
                            </>
                          ) : null}
                          <span>{note.topic?.name || 'Konu bilgisi yok'}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span>@{note.uploader.username}</span>
                          <span>👁 {note.viewCount}</span>
                          <span>❤️ {note.likeCount}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {notes.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Henüz not bulunmuyor. İlk notu siz yükleyin!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}