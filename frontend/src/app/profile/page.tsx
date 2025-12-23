'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usersApi, UserProfile, Note, xpApi, UserRank } from '@/lib/api';
import { Footer } from '@/components/footer';
import { User, Edit2, Upload, Trophy, FileText, Eye, Heart, Calendar, BookOpen, GraduationCap, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, LogOut, Shield } from 'lucide-react';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userNotes, setUserNotes] = useState<Note[]>([]);
  const [userRank, setUserRank] = useState<UserRank | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [userRole, setUserRole] = useState<string | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const [editForm, setEditForm] = useState({
    username: '',
    bio: '',
    profileImage: '',
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Decode JWT to get user info
        let payload: any = null;
        try {
          payload = JSON.parse(atob(token.split('.')[1]));
          setUserRole(payload.role);
          setUserName(payload.username || payload.email || 'Kullanıcı');
        } catch (e) {
          console.error('JWT decode hatası:', e);
        }

        // Fetch profile data
        const profileData = await usersApi.getProfile();
        setProfile(profileData);
        
        // Update user info from profile if JWT decode failed
        if (!payload) {
          setUserRole(profileData.role);
          setUserName(profileData.username || profileData.email || 'Kullanıcı');
        }

        // Fetch user notes
        const notesData = await usersApi.getUserNotes();
        setUserNotes(notesData as Note[]);

        // Fetch user rank
        try {
          const rankData = await xpApi.getUserRank();
          setUserRank(rankData);
        } catch (e) {
          console.error('Sıralama alınamadı:', e);
        }
        
        setEditForm({
          username: profileData.username,
          bio: profileData.bio || '',
          profileImage: profileData.profileImage || '',
        });
      } catch (error: any) {
        // 401 Unauthorized hatası için sessizce login'e yönlendir
        if (error?.status === 401 || error?.message?.includes('401') || error?.message?.includes('Unauthorized')) {
          // Token zaten API client tarafından temizlendi, sadece yönlendir
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
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedProfile = await usersApi.updateProfile({
        username: editForm.username,
        bio: editForm.bio,
        profileImage: editForm.profileImage,
      });
      setProfile(updatedProfile);
      setIsEditing(false);
      setUserName(updatedProfile.username);
    } catch (error) {
      console.error('Profil güncellenemedi:', error);
      alert('Profil güncellenirken bir hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const getLevel = (totalPoints: number) => {
    // Her 100 puanda bir seviye
    return Math.floor(totalPoints / 100) + 1;
  };

  const getProgressToNextLevel = (totalPoints: number) => {
    const currentLevelPoints = (getLevel(totalPoints) - 1) * 100;
    const nextLevelPoints = getLevel(totalPoints) * 100;
    const progress = ((totalPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
    return Math.min(progress, 100);
  };

  const getRankTitle = (totalPoints: number) => {
    if (totalPoints < 100) return 'Yeni Başlayan';
    if (totalPoints < 300) return 'Öğrenci';
    if (totalPoints < 600) return 'Araştırmacı';
    if (totalPoints < 1000) return 'Uzman';
    if (totalPoints < 2000) return 'Master';
    return 'Efsane';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B82F6] mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Profil bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Glassmorphism Navbar - Homepage ile aynı */}
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

            {/* Auth Buttons / User Menu - Right */}
            <div className="flex-1 flex justify-end items-center space-x-4 ml-4">
              {userRole ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-[#3B82F6] flex items-center justify-center text-white font-semibold text-sm">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link 
                        href="/dashboard" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <FileText className="h-4 w-4" />
                        Not Yükle
                      </Link>
                      <Link 
                        href="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="h-4 w-4" />
                        Profil
                      </Link>
                      <Link 
                        href="/leaderboard" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Trophy className="h-4 w-4" />
                        Liderlik Tablosu
                      </Link>
                      {userRole === 'ADMIN' && (
                        <Link 
                          href="/admin" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Shield className="h-4 w-4" />
                          Admin Panel
                        </Link>
                      )}
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
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profil Kartı */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  {profile.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt={profile.username}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                      {profile.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <CardTitle className="text-3xl mb-2">{profile.username}</CardTitle>
                  <CardDescription className="text-base">{profile.email}</CardDescription>
                  {profile.bio && !isEditing && (
                    <p className="mt-2 text-gray-700">{profile.bio}</p>
                  )}
                </div>
              </div>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} variant="outline" className="flex items-center gap-2">
                  <Edit2 className="h-4 w-4" />
                  Düzenle
                </Button>
              )}
            </div>
          </CardHeader>
          {isEditing && (
            <CardContent className="space-y-4 pt-4 border-t">
              <div>
                <Label htmlFor="username">Kullanıcı Adı</Label>
                <Input
                  id="username"
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="bio">Açıklama</Label>
                <Input
                  id="bio"
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  placeholder="Kendiniz hakkında bir şeyler yazın..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="profileImage">Profil Resmi URL</Label>
                <Input
                  id="profileImage"
                  value={editForm.profileImage}
                  onChange={(e) => setEditForm({ ...editForm, profileImage: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={isSaving} className="bg-[#3B82F6] hover:bg-[#2563EB]">
                  {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="outline">
                  İptal
                </Button>
              </div>
            </CardContent>
          )}
        </Card>

        {/* XP ve Seviye Kartı */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Seviye ve XP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Seviye {getLevel(profile.totalPoints)}</span>
                    <span className="text-sm text-gray-500">{getRankTitle(profile.totalPoints)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] h-3 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressToNextLevel(profile.totalPoints)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>{profile.totalPoints} XP</span>
                    <span>{getLevel(profile.totalPoints) * 100} XP</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500">Toplam XP</p>
                    <p className="text-2xl font-bold text-[#3B82F6]">{profile.totalPoints.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Kullanılabilir</p>
                    <p className="text-2xl font-bold text-green-600">{profile.currentPoints.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Sıralama</p>
                    <p className="text-2xl font-bold text-yellow-600">#{userRank?.rank || '-'}</p>
                  </div>
                </div>
                <Link href="/leaderboard" className="block mt-4">
                  <Button variant="outline" className="w-full">
                    <Trophy className="h-4 w-4 mr-2" />
                    Liderlik Tablosunu Gör
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                İstatistikler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Toplam Not</p>
                  <p className="text-2xl font-bold text-[#3B82F6]">{userNotes.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Onaylanan</p>
                  <p className="text-2xl font-bold text-green-600">
                    {userNotes.filter((n) => n.status === 'APPROVED').length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bekleyen</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {userNotes.filter((n) => n.status === 'PENDING').length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Toplam Görüntülenme</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {userNotes.reduce((sum, n) => sum + (n.viewCount || 0), 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kullanıcının Notları */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-[#3B82F6]" />
              Notlarım ({userNotes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userNotes.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Henüz not eklemediniz</p>
                <Link href="/dashboard">
                  <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white">
                    <Upload className="h-4 w-4 mr-2" />
                    İlk Notunuzu Ekleyin
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userNotes.map((note) => (
                  <Link key={note.id} href={`/konu/${note.slug}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              note.status === 'APPROVED'
                                ? 'bg-green-100 text-green-800'
                                : note.status === 'PENDING'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {note.status === 'APPROVED' ? 'Onaylandı' : note.status === 'PENDING' ? 'Bekliyor' : 'Reddedildi'}
                          </span>
                        </div>
                        {note.topic && (
                          <CardDescription>
                            {note.topic.lesson?.grade?.name} - {note.topic.lesson?.name} - {note.topic.name}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {note.viewCount || 0}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {note.likeCount || 0}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(note.createdAt).toLocaleDateString('tr-TR')}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

