import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://dersnotu.net';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/profile/',
          '/_next/',
          '/_error',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/profile/',
          '/_next/',
          '/_error',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

