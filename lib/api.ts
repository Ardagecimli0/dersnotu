// API URL'ini direkt hardcode ediyoruz (Heroku için)
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://ders-notu-app.herokuapp.com' 
  : 'http://localhost:3002';

// Debug: API URL'ini kontrol et
if (typeof window !== 'undefined') {
  console.log('API Base URL:', API_BASE_URL);
  console.log('NEXT_PUBLIC_API_URL env:', process.env.NEXT_PUBLIC_API_URL);
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    if (typeof window !== 'undefined') {
      console.log('ApiClient initialized with baseURL:', this.baseURL);
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    console.log('API Request URL:', url);
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const token = typeof window !== 'undefined' 
      ? localStorage.getItem('token') 
      : null;

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        
        // 401 Unauthorized hatası için özel işlem
        if (response.status === 401) {
          // Token'ı temizle
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
          }
          // Özel bir hata oluştur ki frontend'de yakalansın
          const error = new Error('Unauthorized');
          (error as any).status = 401;
          (error as any).response = errorText;
          throw error;
        }
        
        // Diğer hatalar için normal log
        console.error('API Error Response:', errorText);
        const error = new Error(`API Error: ${response.status} ${response.statusText}`);
        (error as any).status = response.status;
        (error as any).response = errorText;
        throw error;
      }

      return response.json();
    } catch (error) {
      // 401 hatası için detaylı log gösterme (zaten işlendi)
      if ((error as any)?.status !== 401) {
        console.error('Fetch Error Details:', {
          url,
          error: error instanceof Error ? error.message : String(error),
        });
      }
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();

// Types
export interface Note {
  id: string;
  title: string;
  slug: string;
  content?: string;
  fileUrl?: string;
  imageUrl?: string; // fileUrl için alias
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
      slug?: string;
      grade?: {
        name: string;
        slug?: string;
      };
    };
  };
}

// Auth API
export const authApi = {
  register: (data: { email: string; password: string; username: string }) =>
    apiClient.post('/auth/register', data),
  
  login: (data: { email: string; password: string }) =>
    apiClient.post<{ access_token: string }>('/auth/login', data),
};

// Notes API
export const notesApi = {
  getAll: (lesson?: string, grade?: string) => {
    const params = new URLSearchParams();
    if (lesson) params.append('lesson', lesson);
    if (grade) params.append('grade', grade);
    const queryString = params.toString();
    return apiClient.get<Note[]>(`/notes${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (id: string) =>
    apiClient.get<Note>(`/notes/${id}`),
  
  getBySlug: (slug: string) =>
    apiClient.get<Note>(`/notes/slug/${slug}`),
  
  getAllForAdmin: () =>
    apiClient.get<Note[]>('/notes/admin/all'),
  
  create: (data: { title: string; content?: string; topicId?: number; topicName?: string; lessonId?: number; fileUrl?: string }) =>
    apiClient.post('/notes', data),
  
  approve: (id: string) =>
    apiClient.patch(`/notes/${id}/approve`),
  
  reject: (id: string, reason: string) =>
    apiClient.patch(`/notes/${id}/reject`, { reason }),
  
  update: (id: string, data: { title?: string; content?: string; fileUrl?: string; topicId?: number }) =>
    apiClient.patch(`/notes/${id}`, data),
  
  delete: (id: string) =>
    apiClient.delete(`/notes/${id}`),
};

// Users API
export interface UserProfile {
  id: string;
  email: string;
  username: string;
  role: string;
  profileImage?: string;
  bio?: string;
  currentPoints: number;
  totalPoints: number;
  createdAt: string;
  updatedAt: string;
  _count?: {
    notes: number;
  };
}

export const usersApi = {
  getProfile: () => apiClient.get<UserProfile>('/users/profile'),
  updateProfile: (data: { profileImage?: string; bio?: string; username?: string }) =>
    apiClient.patch<UserProfile>('/users/profile', data),
  getUserNotes: () => apiClient.get<Note[]>('/users/profile/notes'),
};

// Grades API
export interface Grade {
  id: number;
  name: string;
  slug: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: number;
  name: string;
  slug: string;
  gradeId: number;
  topics?: Topic[];
}

export interface Topic {
  id: number;
  name: string;
  slug: string;
  lessonId: number;
}

export const gradesApi = {
  getAll: () => apiClient.get<Grade[]>('/grades'),
};

// XP/Leaderboard API
export interface LeaderboardUser {
  id: string;
  username: string;
  profileImage?: string;
  totalPoints: number;
  currentPoints: number;
  periodPoints?: number;
  _count?: {
    notes: number;
  };
}

export interface UserRank {
  rank: number;
  totalPoints: number;
}

export interface XPTransaction {
  id: string;
  amount: number;
  type: string;
  description?: string;
  createdAt: string;
}

export interface XPResult {
  user: {
    id: string;
    username: string;
    currentPoints: number;
    totalPoints: number;
  };
  xpAdded: number;
  type: string;
}

export const xpApi = {
  getLeaderboard: (limit: number = 100, period: 'all' | 'monthly' | 'yearly' = 'all') =>
    apiClient.get<LeaderboardUser[]>(`/xp/leaderboard?limit=${limit}&period=${period}`),
  
  getUserRank: () =>
    apiClient.get<UserRank>('/xp/rank'),
  
  getXPHistory: (limit: number = 20) =>
    apiClient.get<XPTransaction[]>(`/xp/history?limit=${limit}`),
  
  addSessionXP: () =>
    apiClient.post<XPResult>('/xp/session'),
};