import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    const backendUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3002'
      : 'http://localhost:3001'; // Heroku'da backend 3001 port'unda çalışıyor
    
    return [
      // Backend API route'larını backend'e proxy et
      {
        source: '/auth/:path*',
        destination: `${backendUrl}/auth/:path*`,
      },
      {
        source: '/notes',
        destination: `${backendUrl}/notes`,
      },
      {
        source: '/notes/:path*',
        destination: `${backendUrl}/notes/:path*`,
      },
      {
        source: '/users/:path*',
        destination: `${backendUrl}/users/:path*`,
      },
      {
        source: '/grades',
        destination: `${backendUrl}/grades`,
      },
      {
        source: '/grades/:path*',
        destination: `${backendUrl}/grades/:path*`,
      },
      {
        source: '/xp/:path*',
        destination: `${backendUrl}/xp/:path*`,
      },
    ];
  },
};

export default nextConfig;
