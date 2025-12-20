import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Gizlilik Sözleşmesi",
  description: "DersNotu.net Gizlilik Sözleşmesi ve Kullanıcı Verilerinin Korunması",
};

export default function GizlilikPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Ana Sayfaya Dön
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Gizlilik Sözleşmesi
          </h1>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Genel Hükümler</h2>
              <p>
                Bu Gizlilik Sözleşmesi, DersNotu.net platformunu ("Platform") kullanırken toplanan 
                kişisel bilgilerinizin nasıl toplandığını, kullanıldığını, korunduğunu ve paylaşıldığını 
                açıklamaktadır. Platformu kullanarak, bu Gizlilik Sözleşmesi'ndeki şartları kabul etmiş 
                sayılırsınız.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Toplanan Bilgiler</h2>
              <p>Platform kullanımı sırasında aşağıdaki bilgiler toplanabilir:</p>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.1. Hesap Bilgileri</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ad ve soyad</li>
                <li>E-posta adresi</li>
                <li>Kullanıcı adı</li>
                <li>Şifre (şifrelenmiş olarak saklanır)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.2. Kullanım Bilgileri</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Yüklediğiniz ders notları ve içerikler</li>
                <li>Yaptığınız yorumlar ve etkileşimler</li>
                <li>Beğeniler ve favoriler</li>
                <li>Platform kullanım geçmişi</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.3. Teknik Bilgiler</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP adresi</li>
                <li>Tarayıcı türü ve versiyonu</li>
                <li>İşletim sistemi bilgileri</li>
                <li>Çerez (cookie) verileri</li>
                <li>Erişim logları</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Bilgilerin Kullanımı</h2>
              <p>Toplanan bilgiler aşağıdaki amaçlarla kullanılır:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Platform hizmetlerinin sağlanması ve iyileştirilmesi</li>
                <li>Kullanıcı hesaplarının yönetimi ve kimlik doğrulama</li>
                <li>Ders notlarının organize edilmesi ve paylaşılması</li>
                <li>Kullanıcı deneyiminin kişiselleştirilmesi</li>
                <li>Güvenlik önlemlerinin alınması ve kötüye kullanımın önlenmesi</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>İstatistiksel analizler ve raporlama</li>
                <li>Kullanıcı desteği sağlanması</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Bilgi Paylaşımı</h2>
              <p>
                Kişisel bilgileriniz, aşağıdaki durumlar dışında üçüncü taraflarla paylaşılmaz:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Yasal zorunluluklar gereği</li>
                <li>Platform hizmetlerinin sağlanması için gerekli olan hizmet sağlayıcılarla (bulut sunucular, analiz araçları vb.)</li>
                <li>Kullanıcının açık rızası ile</li>
                <li>Platform güvenliğinin korunması için gerekli durumlarda</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Veri Güvenliği</h2>
              <p>
                Bilgilerinizin güvenliğini sağlamak için aşağıdaki önlemler alınmaktadır:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>SSL/TLS şifreleme protokolleri kullanımı</li>
                <li>Güvenli sunucu altyapısı</li>
                <li>Düzenli güvenlik güncellemeleri</li>
                <li>Şifrelerin hash algoritmaları ile korunması</li>
                <li>Erişim kontrolleri ve yetkilendirme mekanizmaları</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Çerezler (Cookies)</h2>
              <p>
                Platform, kullanıcı deneyimini iyileştirmek ve platform işlevselliğini sağlamak için 
                çerezler kullanmaktadır. Çerezler hakkında detaylı bilgi için Çerez Politikamızı inceleyebilirsiniz.
              </p>
              <p className="mt-4">
                Çerezleri tarayıcı ayarlarınızdan yönetebilirsiniz, ancak bu durum platformun bazı 
                özelliklerinin düzgün çalışmamasına neden olabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Kullanıcı Hakları</h2>
              <p>Aşağıdaki haklara sahipsiniz:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Kişisel bilgilerinize erişim hakkı</li>
                <li>Yanlış veya eksik bilgilerin düzeltilmesini isteme hakkı</li>
                <li>Hesabınızın ve kişisel bilgilerinizin silinmesini isteme hakkı</li>
                <li>Veri işlemeye itiraz etme hakkı</li>
                <li>Verilerinizin taşınabilir formatda sağlanmasını isteme hakkı</li>
                <li>Bilgilendirilme hakkı</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Veri Saklama Süresi</h2>
              <p>
                Kişisel bilgileriniz, hesabınız aktif olduğu sürece ve yasal saklama süreleri çerçevesinde 
                saklanmaktadır. Hesabınızı silmeniz durumunda, bilgileriniz güvenli bir şekilde silinir 
                veya anonim hale getirilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Üçüncü Taraf Linkler</h2>
              <p>
                Platform üzerinde üçüncü taraf web sitelerine linkler bulunabilir. Bu sözleşme, üçüncü 
                taraf web sitelerinin gizlilik uygulamalarını kapsamamaktadır. Bu siteleri ziyaret etmeden 
                önce ilgili gizlilik politikalarını incelemenizi öneririz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Değişiklikler</h2>
              <p>
                Bu Gizlilik Sözleşmesi, yasal değişiklikler veya platform güncellemeleri nedeniyle 
                güncellenebilir. Önemli değişiklikler kullanıcılara bildirilecektir. Güncel sürümü 
                platform üzerinden takip edebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. İletişim</h2>
              <p>
                Gizlilik ile ilgili sorularınız, başvurularınız veya önerileriniz için bizimle iletişime geçebilirsiniz:
              </p>
              <p className="mt-4">
                <strong>E-posta:</strong> gizlilik@dersnotu.net
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
    </div>
  );
}

