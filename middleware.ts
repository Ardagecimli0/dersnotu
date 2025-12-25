import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // EN ÖNEMLİ: /ads.txt isteği için yönlendirme yapma - dosyayı doğrudan servis et
  // Bu kontrol EN BAŞTA olmalı, yönlendirme mantığından ÖNCE
  // Next.js public klasöründeki dosyalar otomatik olarak servis edilir
  if (pathname === '/ads.txt') {
    // Yönlendirme yapmadan dosyayı doğrudan servis et
    return NextResponse.next();
  }

  // Yönlendirme mantığı: Sadece www olmayan dersnotu.net trafiğini www'ye yönlendir
  // Yönlendirme döngüsünü önlemek için www.dersnotu.net veya localhost için yönlendirme yapma
  const isNonWwwDomain = 
    hostname === 'dersnotu.net' ||
    hostname.startsWith('dersnotu.net:');

  // Development ortamı (localhost) veya zaten www domain ise yönlendirme yapma
  const shouldSkipRedirect = 
    hostname === 'www.dersnotu.net' ||
    hostname.startsWith('www.dersnotu.net:') ||
    hostname === 'localhost' ||
    hostname.startsWith('localhost:') ||
    hostname.includes('127.0.0.1');

  // Sadece non-www domain için yönlendirme yap (döngüyü önle)
  if (isNonWwwDomain && !shouldSkipRedirect) {
    const url = request.nextUrl.clone();
    url.hostname = 'www.dersnotu.net';
    url.protocol = 'https:';
    // Port numarasını kaldır (www için)
    if (url.port) {
      url.port = '';
    }
    return NextResponse.redirect(url, 301);
  }

  // Diğer tüm istekler için normal akışa devam et
  return NextResponse.next();
}

// Middleware'in çalışacağı path'leri belirle
export const config = {
  matcher: [
    /*
     * Tüm request path'lerini eşleştir, ancak şunları hariç tut:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

