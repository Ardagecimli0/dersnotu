import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    // Development'ta localhost:3002'ye proxy yap
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3002/:path*',
        },
      ];
    }
    // Production'da rewrites yok, frontend NEXT_PUBLIC_API_URL kullanacak
    return [];
  },
};

export default nextConfig;
