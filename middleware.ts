import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // /ads.txt isteği için yönlendirme yapma - dosyayı doğrudan servis et
  // Next.js public klasöründeki dosyalar otomatik olarak servis edilir,
  // ancak middleware'de açıkça belirtmek için kontrol ediyoruz
  if (pathname === '/ads.txt') {
    return NextResponse.next();
  }

  // www olmayan dersnotu.net trafiğini www'ye yönlendir
  // Production ortamında hostname kontrolü (port numaralarını da kontrol et)
  const isNonWwwDomain = 
    hostname === 'dersnotu.net' ||
    hostname.startsWith('dersnotu.net:');

  if (isNonWwwDomain) {
    const url = request.nextUrl.clone();
    url.hostname = 'www.dersnotu.net';
    url.protocol = 'https:';
    // Port numarasını kaldır (www için)
    if (url.port) {
      url.port = '';
    }
    return NextResponse.redirect(url, 301);
  }

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

