'use client';

import React from 'react';
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import Link from 'next/link';

export default function YorumPolitikasiPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <SiteHeader />

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Yorum Politikası
          </h1>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Genel İlkeler</h2>
              <p>
                DersNotu.net platformu, öğrencilerin ders notlarını paylaştığı ve birbirleriyle 
                etkileşim kurduğu bir topluluk platformudur. Yorum politikamız, platformun 
                güvenli, saygılı ve eğitici bir ortam olarak kalmasını sağlamak için 
                oluşturulmuştur.
              </p>
              <p className="mt-4">
                Tüm kullanıcılar, platformu kullanırken bu yorum politikasını kabul etmiş 
                sayılır ve bu kurallara uymakla yükümlüdür.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Kabul Edilebilir Yorumlar</h2>
              <p>
                Platform üzerinde yapılan yorumlar aşağıdaki kriterlere uygun olmalıdır:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Eğitici ve yapıcı olmalıdır</li>
                <li>Saygılı bir dil kullanılmalıdır</li>
                <li>Ders notları ve konularla ilgili olmalıdır</li>
                <li>Diğer kullanıcılara yardımcı olmayı amaçlamalıdır</li>
                <li>Telif hakkı ihlali içermemelidir</li>
                <li>Kişisel bilgiler paylaşılmamalıdır</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Yasaklanan İçerikler</h2>
              <p>
                Aşağıdaki içerikler platform üzerinde kesinlikle yasaktır:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Hakaret, küfür veya aşağılayıcı ifadeler</li>
                <li>Irkçı, cinsiyetçi veya ayrımcı içerikler</li>
                <li>Spam, reklam veya ticari içerikler</li>
                <li>Yanlış bilgi veya yanıltıcı içerikler</li>
                <li>Kişisel saldırılar veya taciz</li>
                <li>Telif hakkı ihlali içeren içerikler</li>
                <li>Yasadışı faaliyetleri teşvik eden içerikler</li>
                <li>Kişisel bilgilerin paylaşılması</li>
                <li>Başka kullanıcıları taklit etme veya sahte hesap açma</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Yorum Moderasyonu</h2>
              <p>
                DersNotu.net ekibi, platform üzerindeki tüm yorumları moderasyon hakkını 
                saklı tutar. Yorumlar aşağıdaki durumlarda silinebilir veya düzenlenebilir:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Yorum politikasına aykırı içerik tespit edildiğinde</li>
                <li>Kullanıcı şikayeti alındığında</li>
                <li>Otomatik filtreleme sistemleri tarafından işaretlendiğinde</li>
                <li>Yasal gereklilikler nedeniyle</li>
              </ul>
              <p className="mt-4">
                Moderasyon kararları nihaidir ve platform yönetimi tarafından verilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Kullanıcı Sorumlulukları</h2>
              <p>
                Platform kullanıcıları aşağıdaki sorumluluklara sahiptir:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Yorumlarında doğru ve güvenilir bilgiler paylaşmak</li>
                <li>Diğer kullanıcılara saygı göstermek</li>
                <li>Yorum politikasına uygun davranmak</li>
                <li>Uygunsuz içerikleri bildirmek</li>
                <li>Hesap güvenliğini sağlamak</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. İhlal Durumunda Yaptırımlar</h2>
              <p>
                Yorum politikası ihlali durumunda aşağıdaki yaptırımlar uygulanabilir:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>İlgili yorumun silinmesi</li>
                <li>Kullanıcıya uyarı verilmesi</li>
                <li>Geçici hesap askıya alma</li>
                <li>Kalıcı hesap kapatma</li>
                <li>Yasal işlem başlatılması (gerekli durumlarda)</li>
              </ul>
              <p className="mt-4">
                Yaptırım kararları, ihlalin ciddiyetine göre platform yönetimi tarafından belirlenir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Şikayet ve İtiraz Süreci</h2>
              <p>
                Yorum politikası ile ilgili şikayetleriniz veya itirazlarınız için:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>E-posta yoluyla: info@dersnotu.net</li>
                <li>Platform üzerinden bildirim özelliğini kullanabilirsiniz</li>
                <li>Şikayetler en geç 48 saat içinde değerlendirilir</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Gizlilik ve Veri Koruma</h2>
              <p>
                Yorumlarınızda kişisel bilgiler paylaşmaktan kaçınmalısınız. Platform, 
                KVKK kapsamında kişisel verilerinizi korumaktadır. Detaylı bilgi için 
                <Link href="/kvkk" className="text-[#3B82F6] hover:underline"> KVKK Aydınlatma Metni</Link> ve 
                <Link href="/gizlilik" className="text-[#3B82F6] hover:underline"> Gizlilik Sözleşmesi</Link> sayfalarını inceleyebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Değişiklikler</h2>
              <p>
                Bu yorum politikası, platform gelişimine ve yasal gerekliliklere göre 
                güncellenebilir. Önemli değişiklikler kullanıcılara bildirilecektir. 
                Güncel sürümü platform üzerinden takip edebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. İletişim</h2>
              <p>
                Yorum politikası ile ilgili sorularınız için bizimle iletişime geçebilirsiniz:
              </p>
              <p className="mt-4">
                <strong>E-posta:</strong> info@dersnotu.net
              </p>
            </section>

            <section className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                <strong>Son Güncelleme:</strong> {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

