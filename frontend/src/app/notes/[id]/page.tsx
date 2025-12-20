'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { notesApi, Note } from '@/lib/api';
import { Footer } from '@/components/footer';
import { 
  ArrowLeft, 
  Eye, 
  Heart, 
  FileText,
  Clock,
  GraduationCap,
  User
} from 'lucide-react';

// Konu ve derse göre görsel ve renk eşleştirmesi (anasayfadakiyle aynı)
const getLessonImage = (lessonName: string, topicName?: string) => {
  const lesson = lessonName?.toLowerCase() || '';
  const topic = topicName?.toLowerCase() || '';
  
  if (lesson.includes('matematik')) {
    if (topic.includes('küme') || topic.includes('kumeler')) {
      return {
        gradient: 'from-blue-400 via-purple-500 to-pink-500',
        icon: '📊',
        bgColor: 'bg-blue-500'
      };
    }
    if (topic.includes('türev') || topic.includes('trev')) {
      return {
        gradient: 'from-blue-600 via-indigo-600 to-purple-700',
        icon: '📈',
        bgColor: 'bg-blue-600'
      };
    }
    return {
      gradient: 'from-blue-500 to-purple-600',
      icon: '📐',
      bgColor: 'bg-blue-500'
    };
  }
  if (lesson.includes('fizik')) {
    return {
      gradient: 'from-purple-500 to-pink-600',
      icon: '💡',
      bgColor: 'bg-purple-500'
    };
  }
  if (lesson.includes('kimya')) {
    return {
      gradient: 'from-orange-500 to-red-600',
      icon: '⚗️',
      bgColor: 'bg-orange-500'
    };
  }
  if (lesson.includes('biyoloji')) {
    return {
      gradient: 'from-green-500 to-teal-600',
      icon: '🔬',
      bgColor: 'bg-green-500'
    };
  }
  if (lesson.includes('tarih')) {
    return {
      gradient: 'from-amber-600 to-orange-700',
      icon: '📜',
      bgColor: 'bg-amber-600'
    };
  }
  if (lesson.includes('coğrafya') || lesson.includes('cografya')) {
    return {
      gradient: 'from-blue-400 to-cyan-600',
      icon: '🌍',
      bgColor: 'bg-blue-400'
    };
  }
  if (lesson.includes('edebiyat')) {
    return {
      gradient: 'from-pink-500 to-rose-600',
      icon: '📖',
      bgColor: 'bg-pink-500'
    };
  }
  if (lesson.includes('din') || lesson.includes('kültür')) {
    return {
      gradient: 'from-green-600 to-emerald-700',
      icon: '🕌',
      bgColor: 'bg-green-600'
    };
  }
  if (lesson.includes('felsefe')) {
    return {
      gradient: 'from-indigo-500 to-blue-600',
      icon: '🤔',
      bgColor: 'bg-indigo-500'
    };
  }
  if (lesson.includes('ingilizce') || lesson.includes('english')) {
    return {
      gradient: 'from-red-500 to-pink-600',
      icon: '🇬🇧',
      bgColor: 'bg-red-500'
    };
  }
  
  return {
    gradient: 'from-gray-500 to-gray-700',
    icon: '📚',
    bgColor: 'bg-gray-500'
  };
};

export default function NoteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [reactions, setReactions] = useState({
    '❤️': 0,
    '😂': 0,
    '😆': 0,
    '😐': 0,
    '😒': 0,
    '😢': 0,
    '😡': 0,
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteId = params.id as string;
        const fetchedNote = await notesApi.getById(noteId);
        setNote(fetchedNote);
      } catch (error) {
        console.error('Not yüklenemedi:', error);
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchNote();
    }
  }, [params.id, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B82F6] mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Not bulunamadı</p>
          <Link href="/">
            <Button>Ana Sayfaya Dön</Button>
          </Link>
        </div>
      </div>
    );
  }

  const lessonImage = getLessonImage(
    note.topic?.lesson?.name || '',
    note.topic?.name || ''
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-3">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
              <span className="text-gray-700 hover:text-[#3B82F6]">Ana Sayfaya Dön</span>
            </Link>
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
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Note Header with Image */}
        <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden mb-8">
          {/* Görsel Header - Gradient Background */}
          <div className={`relative h-64 md:h-80 overflow-hidden bg-gradient-to-br ${lessonImage.gradient}`}>
            {note.imageUrl || note.fileUrl ? (
              <div className="relative w-full h-full">
                <img
                  src={note.imageUrl || note.fileUrl || ''}
                  alt={note.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${lessonImage.gradient} opacity-60`}></div>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10"></div>
                <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-30">
                  {lessonImage.icon}
                </div>
              </>
            )}
            
            {/* Labels */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {note.topic?.lesson?.grade?.name && (
                  <span className="px-3 py-1 bg-purple-500/90 backdrop-blur-sm text-white rounded-lg text-sm font-medium shadow-lg">
                    {note.topic.lesson.grade.name}
                  </span>
                )}
                {note.topic?.lesson?.name && (
                  <span className={`px-3 py-1 ${lessonImage.bgColor} text-white rounded-lg text-sm font-semibold shadow-lg`}>
                    {note.topic.lesson.name}
                  </span>
                )}
                {note.topic?.name && (
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-lg text-sm font-medium shadow-lg">
                    {note.topic.name}
                  </span>
                )}
              </div>
            </div>
          </div>

          <CardContent className="p-8">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {note.title}
            </h1>

            {/* Content */}
            {note.content && (
              <div className="prose max-w-none mb-6">
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                  {note.content}
                </p>
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center gap-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-gray-600">
                <Eye className="h-5 w-5" />
                <span className="font-medium">{note.viewCount}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Heart className="h-5 w-5" />
                <span className="font-medium">{note.likeCount}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <User className="h-5 w-5" />
                <span className="font-medium">@{note.uploader.username}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reactions Section */}
        <Card className="border-0 shadow-sm bg-white rounded-2xl mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">İçerik Nasıldı?</h2>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {Object.entries(reactions).map(([emoji, count]) => (
                <button
                  key={emoji}
                  onClick={() => {
                    setReactions(prev => ({
                      ...prev,
                      [emoji]: prev[emoji as keyof typeof prev] + 1
                    }));
                  }}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <span className="text-3xl">{emoji}</span>
                  <span className="text-sm font-medium text-gray-600">{count}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card className="border-0 shadow-sm bg-white rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Yorumlar (0)</h2>
            
            {/* Comment Form */}
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  İsim
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="İsim"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="örnek@bikifi.com"
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Yeni yorum yaz...
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Yorumunuzu buraya yazın..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] resize-y"
                />
              </div>
              
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="consent"
                  className="mt-1"
                />
                <label htmlFor="consent" className="text-sm text-gray-600">
                  Yorum göndererek{' '}
                  <a href="#" className="text-[#3B82F6] hover:underline">gizlilik sözleşmesi</a>
                  {' '}ve{' '}
                  <a href="#" className="text-[#3B82F6] hover:underline">KVKK kurallarını</a>
                  {' '}kabul etmiş sayılırsınız.
                </label>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => {
                    // TODO: Yorum gönderme işlemi
                    console.log('Yorum gönderiliyor...', { commentName, commentEmail, commentText });
                    setCommentName('');
                    setCommentEmail('');
                    setCommentText('');
                  }}
                  className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
                >
                  Yorumu Gönder
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

