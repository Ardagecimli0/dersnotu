import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image 
                src="/logo1.png" 
                alt="DersNotu.net" 
                width={32} 
                height={32}
                className="object-contain"
              />
              <span className="text-xl font-bold text-gray-900">DersNotu.net</span>
            </Link>
            <p className="text-gray-600 text-sm mb-4">
              Öğrenciler için öğrenciler tarafından tasarlandı.
            </p>
            {/* Social Media Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://facebook.com/dersnotu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/dersnotu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/dersnotu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/dersnotu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/@dersnotu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/dersnotu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-900 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Bağlantılar
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Not Yükle
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Profil
                </Link>
              </li>
              <li>
                <Link href="/yks-sayac" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  YKS Sayaç
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Yasal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/kvkk" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  KVKK Aydınlatma Metni
                </Link>
              </li>
              <li>
                <Link href="/gizlilik" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Gizlilik Sözleşmesi
                </Link>
              </li>
              <li>
                <Link href="/yorum-politikasi" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Yorum Politikası
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              İletişim
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="mailto:info@dersnotu.net" className="hover:text-gray-900 transition-colors">
                  info@dersnotu.net
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8">
          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} DersNotu.net. Tüm hakları saklıdır.
          </div>
        </div>
      </div>
    </footer>
  );
}

