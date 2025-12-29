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

  /// 1. Önce ads.txt kontrolü (Yönlendirmeden bağımsız olarak dosyayı sun)
if (pathname === '/ads.txt') {
  return NextResponse.json('google.com, pub-2222061433846943, DIRECT, f08c47fec0942fa0', {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

// 2. Yönlendirme mantığı
const isNonWwwDomain = 
  hostname === 'dersnotu.net' ||
  hostname.startsWith('dersnotu.net:');

const shouldSkipRedirect = 
  hostname === 'www.dersnotu.net' ||
  hostname.startsWith('www.dersnotu.net:') ||
  hostname === 'localhost' ||
  hostname.startsWith('localhost:') ||
  hostname.includes('127.0.0.1');

// Eğer non-www ise ve skip edilmemeliyse yönlendir
if (isNonWwwDomain && !shouldSkipRedirect) {
  return NextResponse.redirect(`https://www.dersnotu.net${request.nextUrl.pathname}`, 301);
}
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

  // /ders-notlari/* URL'lerini homepage'e rewrite et (sayfa aynı kalacak, sadece URL değişecek)
  if (pathname.startsWith('/ders-notlari/')) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.rewrite(url);
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

