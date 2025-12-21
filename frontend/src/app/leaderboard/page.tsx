'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star, 
  Users, 
  FileText,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { xpApi, LeaderboardUser } from '@/lib/api';
import { Footer } from '@/components/footer';
import { SiteHeader } from '@/components/site-header';

// Rank ikonları ve renkleri
const getRankStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return {
        icon: Crown,
        bgColor: 'bg-gradient-to-r from-yellow-400 to-amber-500',
        textColor: 'text-yellow-600',
        borderColor: 'border-yellow-400',
        label: 'Altın',
        shadow: 'shadow-yellow-200',
      };
    case 2:
      return {
        icon: Medal,
        bgColor: 'bg-gradient-to-r from-gray-300 to-gray-400',
        textColor: 'text-gray-500',
        borderColor: 'border-gray-300',
        label: 'Gümüş',
        shadow: 'shadow-gray-200',
      };
    case 3:
      return {
        icon: Medal,
        bgColor: 'bg-gradient-to-r from-orange-400 to-orange-600',
        textColor: 'text-orange-600',
        borderColor: 'border-orange-400',
        label: 'Bronz',
        shadow: 'shadow-orange-200',
      };
    default:
      return {
        icon: Star,
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-600',
        borderColor: 'border-gray-200',
        label: '',
        shadow: '',
      };
  }
};

// Seviye hesaplama
const getLevel = (totalPoints: number) => {
  return Math.floor(totalPoints / 100) + 1;
};

const getRankTitle = (totalPoints: number) => {
  if (totalPoints < 100) return 'Yeni Başlayan';
  if (totalPoints < 300) return 'Öğrenci';
  if (totalPoints < 600) return 'Araştırmacı';
  if (totalPoints < 1000) return 'Uzman';
  if (totalPoints < 2000) return 'Master';
  if (totalPoints < 5000) return 'Grandmaster';
  return 'Efsane';
};

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState<'all' | 'monthly' | 'yearly'>('all');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        const data = await xpApi.getLeaderboard(100, period);
        setLeaderboard(data);
      } catch (error) {
        console.error('Liderlik tablosu yüklenemedi:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [period]);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <SiteHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Liderlik Tablosu
          </h1>
          <p className="text-gray-600">
            En çok XP kazanan öğrenciler burada! Sen de not paylaşarak sıralamaya gir.
          </p>
        </div>

        {/* Period Filter */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { key: 'all', label: 'Tüm Zamanlar' },
            { key: 'monthly', label: 'Bu Ay' },
            { key: 'yearly', label: 'Bu Yıl' },
          ].map((p) => (
            <Button
              key={p.key}
              variant={period === p.key ? 'default' : 'outline'}
              onClick={() => setPeriod(p.key as typeof period)}
              className={period === p.key ? 'bg-[#3B82F6]' : ''}
            >
              {p.label}
            </Button>
          ))}
        </div>

        {/* Top 3 Podium */}
        {!isLoading && leaderboard.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* 2nd Place */}
            <div className="flex flex-col items-center pt-8">
              <div className="relative">
                <div className={`w-20 h-20 rounded-full ${getRankStyle(2).bgColor} flex items-center justify-center shadow-lg ${getRankStyle(2).shadow}`}>
                  {leaderboard[1]?.profileImage ? (
                    <img
                      src={leaderboard[1].profileImage}
                      alt={leaderboard[1].username}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      {leaderboard[1]?.username?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold shadow-md">
                  2
                </div>
              </div>
              <p className="mt-3 font-semibold text-gray-900 text-center truncate max-w-full">
                {leaderboard[1]?.username}
              </p>
              <p className="text-sm text-gray-500">
                {(leaderboard[1]?.periodPoints ?? leaderboard[1]?.totalPoints)?.toLocaleString()} XP
              </p>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <Crown className="absolute -top-6 left-1/2 transform -translate-x-1/2 h-8 w-8 text-yellow-500" />
                <div className={`w-24 h-24 rounded-full ${getRankStyle(1).bgColor} flex items-center justify-center shadow-xl ${getRankStyle(1).shadow} ring-4 ring-yellow-300`}>
                  {leaderboard[0]?.profileImage ? (
                    <img
                      src={leaderboard[0].profileImage}
                      alt={leaderboard[0].username}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-white">
                      {leaderboard[0]?.username?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold shadow-md">
                  1
                </div>
              </div>
              <p className="mt-3 font-bold text-lg text-gray-900 text-center truncate max-w-full">
                {leaderboard[0]?.username}
              </p>
              <p className="text-sm font-medium text-yellow-600">
                {(leaderboard[0]?.periodPoints ?? leaderboard[0]?.totalPoints)?.toLocaleString()} XP
              </p>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center pt-12">
              <div className="relative">
                <div className={`w-18 h-18 rounded-full ${getRankStyle(3).bgColor} flex items-center justify-center shadow-lg ${getRankStyle(3).shadow}`} style={{ width: '72px', height: '72px' }}>
                  {leaderboard[2]?.profileImage ? (
                    <img
                      src={leaderboard[2].profileImage}
                      alt={leaderboard[2].username}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold text-white">
                      {leaderboard[2]?.username?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  3
                </div>
              </div>
              <p className="mt-3 font-semibold text-gray-900 text-center truncate max-w-full">
                {leaderboard[2]?.username}
              </p>
              <p className="text-sm text-gray-500">
                {(leaderboard[2]?.periodPoints ?? leaderboard[2]?.totalPoints)?.toLocaleString()} XP
              </p>
            </div>
          </div>
        )}

        {/* Full Leaderboard List */}
        <Card className="border-0 shadow-lg bg-white rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#3B82F6]" />
              Sıralama
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 animate-pulse">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            ) : leaderboard.length > 0 ? (
              <div className="space-y-2">
                {leaderboard.map((user, index) => {
                  const rank = index + 1;
                  const rankStyle = getRankStyle(rank);
                  const RankIcon = rankStyle.icon;
                  const points = user.periodPoints ?? user.totalPoints;

                  return (
                    <div
                      key={user.id}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-gray-50 ${
                        rank <= 3 ? `border-2 ${rankStyle.borderColor} ${rankStyle.shadow}` : 'border border-gray-100'
                      }`}
                    >
                      {/* Rank */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        rank <= 3 ? rankStyle.bgColor + ' text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {rank <= 3 ? <RankIcon className="h-5 w-5" /> : rank}
                      </div>

                      {/* Avatar */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        rank <= 3 ? rankStyle.bgColor : 'bg-[#3B82F6]'
                      }`}>
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={user.username}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-lg font-bold text-white">
                            {user.username?.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {user.username}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            Seviye {getLevel(user.totalPoints)}
                          </span>
                          <span>•</span>
                          <span>{getRankTitle(user.totalPoints)}</span>
                          {user._count?.notes && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                {user._count.notes} not
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Points */}
                      <div className="text-right">
                        <p className={`font-bold text-lg ${rank <= 3 ? rankStyle.textColor : 'text-gray-900'}`}>
                          {points?.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center justify-end gap-1">
                          <Sparkles className="h-3 w-3" />
                          XP
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Henüz sıralamada kimse yok.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Not paylaşarak ilk sen ol!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* XP Info Card */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl mt-8">
          <CardContent className="p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#3B82F6]" />
              XP Nasıl Kazanılır?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-[#3B82F6]">+30</p>
                <p className="text-sm text-gray-600">Not Yükleme</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-green-600">+1000</p>
                <p className="text-sm text-gray-600">Not Onaylanması</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-purple-600">+20</p>
                <p className="text-sm text-gray-600">Yorum Yapma</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-orange-600">+1</p>
                <p className="text-sm text-gray-600">30 dk Aktiflik</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
