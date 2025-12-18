'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { notesApi, gradesApi, Grade } from '@/lib/api';
import { Trash2, Edit, Check, X, Eye } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content?: string;
  fileUrl?: string;
  status: string;
  rejectionReason?: string;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  uploader: {
    username: string;
    email: string;
  };
  topic: {
    name: string;
    lesson: {
      name: string;
      grade: {
        name: string;
      };
    };
  };
}

export default function AdminPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editForm, setEditForm] = useState({ title: '', content: '', fileUrl: '' });
  const [grades, setGrades] = useState<Grade[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // JWT'den role bilgisini al
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role !== 'ADMIN') {
        router.push('/dashboard');
        return;
      }
    } catch {
      router.push('/dashboard');
      return;
    }

    const fetchData = async () => {
      try {
        const [fetchedNotes, fetchedGrades] = await Promise.all([
          notesApi.getAllForAdmin(),
          gradesApi.getAll(),
        ]);
        setNotes(fetchedNotes as Note[]);
        setGrades(fetchedGrades);
      } catch (error) {
        console.error('Veriler yüklenemedi:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleApprove = async (noteId: string) => {
    try {
      await notesApi.approve(noteId);
      setNotes(notes.map(note => 
        note.id === noteId ? { ...note, status: 'APPROVED' } : note
      ));
    } catch (error) {
      console.error('Not onaylanamadı:', error);
      alert('Not onaylanamadı. Lütfen tekrar deneyin.');
    }
  };

  const handleReject = async (noteId: string) => {
    const reason = prompt('Red sebebini belirtin:');
    if (reason && reason.trim()) {
      try {
        await notesApi.reject(noteId, reason);
        setNotes(notes.map(note => 
          note.id === noteId ? { ...note, status: 'REJECTED', rejectionReason: reason } : note
        ));
      } catch (error) {
        console.error('Not reddedilemedi:', error);
        alert('Not reddedilemedi. Lütfen tekrar deneyin.');
      }
    }
  };

  const handleDelete = async (noteId: string) => {
    if (!confirm('Bu notu silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) {
      return;
    }

    try {
      await notesApi.delete(noteId);
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (error) {
      console.error('Not silinemedi:', error);
      alert('Not silinemedi. Lütfen tekrar deneyin.');
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setEditForm({
      title: note.title,
      content: note.content || '',
      fileUrl: note.fileUrl || '',
    });
  };

  const handleSaveEdit = async () => {
    if (!editingNote) return;

    try {
      await notesApi.update(editingNote.id, editForm);
      setNotes(notes.map(note => 
        note.id === editingNote.id 
          ? { ...note, ...editForm }
          : note
      ));
      setEditingNote(null);
      setEditForm({ title: '', content: '', fileUrl: '' });
    } catch (error) {
      console.error('Not güncellenemedi:', error);
      alert('Not güncellenemedi. Lütfen tekrar deneyin.');
    }
  };

  const filteredNotes = filter === 'ALL' 
    ? notes 
    : notes.filter(note => note.status === filter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">ONAYLANDI</span>;
      case 'REJECTED':
        return <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800">REDDEDİLDİ</span>;
      case 'PENDING':
        return <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">BEKLEMEDE</span>;
      default:
        return <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B82F6] mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push('/dashboard')}
              >
                ← Geri
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <div className="text-sm text-gray-600">
              Toplam Notlar: {notes.length} | 
              Bekleyen: {notes.filter(n => n.status === 'PENDING').length} |
              Onaylanan: {notes.filter(n => n.status === 'APPROVED').length} |
              Reddedilen: {notes.filter(n => n.status === 'REJECTED').length}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <div className="mb-6 flex space-x-2 border-b">
          {[
            { key: 'ALL', label: 'Tümü' },
            { key: 'PENDING', label: 'Bekleyenler' },
            { key: 'APPROVED', label: 'Onaylananlar' },
            { key: 'REJECTED', label: 'Reddedilenler' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as typeof filter)}
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                filter === tab.key
                  ? 'border-b-2 border-[#3B82F6] text-[#3B82F6]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label} ({tab.key === 'ALL' ? notes.length : notes.filter(n => n.status === tab.key).length})
            </button>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {filter === 'ALL' ? 'Tüm Notlar' : 
               filter === 'PENDING' ? 'Onay Bekleyen Notlar' :
               filter === 'APPROVED' ? 'Onaylanmış Notlar' :
               'Reddedilmiş Notlar'}
            </CardTitle>
            <CardDescription>
              Notları yönetin, onaylayın, reddedin veya düzenleyin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow"
                >
                  {editingNote?.id === note.id ? (
                    // Edit Mode
                    <div className="space-y-4">
                      <Input
                        placeholder="Başlık"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      />
                      <textarea
                        placeholder="İçerik"
                        value={editForm.content}
                        onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] resize-y min-h-[100px]"
                      />
                      <Input
                        placeholder="Dosya URL (opsiyonel)"
                        value={editForm.fileUrl}
                        onChange={(e) => setEditForm({ ...editForm, fileUrl: e.target.value })}
                      />
                      <div className="flex space-x-2">
                        <Button onClick={handleSaveEdit} className="bg-green-600 hover:bg-green-700">
                          <Check className="h-4 w-4 mr-2" />
                          Kaydet
                        </Button>
                        <Button variant="outline" onClick={() => {
                          setEditingNote(null);
                          setEditForm({ title: '', content: '', fileUrl: '' });
                        }}>
                          <X className="h-4 w-4 mr-2" />
                          İptal
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-xl mb-2">{note.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <span className="font-medium">
                              {note.topic?.lesson?.grade?.name} - {note.topic?.lesson?.name}
                            </span>
                            <span>•</span>
                            <span>{note.topic?.name}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Yükleyen: @{note.uploader.username}</span>
                            <span>({note.uploader.email})</span>
                            <span>•</span>
                            <span>{new Date(note.createdAt).toLocaleDateString('tr-TR')}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {note.viewCount}
                            </span>
                          </div>
                        </div>
                        {getStatusBadge(note.status)}
                      </div>

                      {note.content && (
                        <div className="bg-gray-50 p-4 rounded-md mb-4">
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Açıklama:</h4>
                          <p className="text-gray-600">{note.content}</p>
                        </div>
                      )}

                      {note.rejectionReason && (
                        <div className="bg-red-50 p-4 rounded-md mb-4">
                          <h4 className="font-medium text-sm text-red-700 mb-2">Red Sebebi:</h4>
                          <p className="text-red-600">{note.rejectionReason}</p>
                        </div>
                      )}

                      {note.fileUrl && (
                        <div className="mb-4">
                          <a 
                            href={note.fileUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#3B82F6] hover:underline text-sm"
                          >
                            📎 Dosyayı Görüntüle
                          </a>
                        </div>
                      )}

                      <div className="flex space-x-3">
                        {note.status === 'PENDING' && (
                          <>
                            <Button
                              onClick={() => handleApprove(note.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Onayla
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleReject(note.id)}
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Reddet
                            </Button>
                          </>
                        )}
                        <Button
                          variant="outline"
                          onClick={() => handleEdit(note)}
                          className="text-blue-600 border-blue-600 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Düzenle
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleDelete(note.id)}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Sil
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {filteredNotes.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-5xl mb-4">📋</div>
                  <h3 className="text-lg font-medium mb-2">
                    {filter === 'ALL' ? 'Henüz not bulunmuyor' :
                     filter === 'PENDING' ? 'Onay bekleyen not bulunmuyor' :
                     filter === 'APPROVED' ? 'Onaylanmış not bulunmuyor' :
                     'Reddedilmiş not bulunmuyor'}
                  </h3>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
