import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "KVKK Aydınlatma Metni | DersNotu.net",
  description: "DersNotu.net Kişisel Verilerin Korunması Kanunu (KVKK) Aydınlatma Metni. Kişisel verilerinizin nasıl işlendiği, korunduğu ve haklarınız hakkında bilgi.",
};

export default function KVKKPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <SiteHeader />

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Kişisel Verilerin Korunması Kanunu (KVKK) Aydınlatma Metni
          </h1>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Veri Sorumlusu</h2>
              <p>
                DersNotu.net olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca 
                kişisel verilerinizi işlemekteyiz. Bu aydınlatma metni, kişisel verilerinizin hangi amaçlarla 
                işleneceği, kimlere aktarılabileceği, yasal haklarınız ve bu hakları nasıl kullanabileceğiniz 
                hakkında sizleri bilgilendirmek amacıyla hazırlanmıştır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. İşlenen Kişisel Veriler</h2>
              <p>
                Platformumuz üzerinden aşağıdaki kişisel verileriniz işlenmektedir:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Kimlik Bilgileri:</strong> Ad, soyad</li>
                <li><strong>İletişim Bilgileri:</strong> E-posta adresi</li>
                <li><strong>Kullanıcı İşlem Bilgileri:</strong> Yüklediğiniz ders notları, yorumlar, beğeniler</li>
                <li><strong>Oturum Bilgileri:</strong> IP adresi, çerez (cookie) bilgileri</li>
                <li><strong>Kullanım Bilgileri:</strong> Platform kullanım geçmişi, erişim logları</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Kişisel Verilerin İşlenme Amaçları</h2>
              <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Platform hizmetlerinin sunulması ve geliştirilmesi</li>
                <li>Kullanıcı hesaplarının oluşturulması ve yönetimi</li>
                <li>Ders notlarının paylaşılması ve organize edilmesi</li>
                <li>Kullanıcı iletişimi ve destek hizmetlerinin sağlanması</li>
                <li>Platform güvenliğinin sağlanması</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>İstatistiksel analizler ve raporlama</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Kişisel Verilerin İşlenme Hukuki Sebepleri</h2>
              <p>
                Kişisel verileriniz, KVKK'nın 5. ve 6. maddelerinde belirtilen aşağıdaki hukuki sebeplere 
                dayanarak işlenmektedir:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Açık rızanız</li>
                <li>Sözleşmenin kurulması veya ifası ile doğrudan ilgili olması</li>
                <li>Yasal yükümlülüğün yerine getirilmesi</li>
                <li>Meşru menfaatlerimiz</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Kişisel Verilerin Aktarılması</h2>
              <p>
                Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi için yurt içinde ve 
                yurt dışında bulunan hizmet sağlayıcılarımızla (bulut sunucular, analiz araçları vb.) 
                paylaşılabilir. Verileriniz, KVKK'nın 8. ve 9. maddelerinde belirtilen şartlara uygun 
                olarak aktarılmaktadır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Kişisel Verilerin Saklanma Süresi</h2>
              <p>
                Kişisel verileriniz, işlendikleri amaçla bağlantılı olarak gerekli olan süre boyunca ve 
                yasal saklama süreleri çerçevesinde saklanmaktadır. Bu süre sona erdiğinde, verileriniz 
                KVKK'nın 7. maddesi uyarınca silinmekte, yok edilmekte veya anonim hale getirilmektedir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. KVKK Kapsamındaki Haklarınız</h2>
              <p>KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
                <li>KVKK'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme</li>
                <li>Düzeltme, silme, yok etme işlemlerinin, kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
                <li>Münhasıran otomatik sistemler ile analiz edilmesi nedeniyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
                <li>Kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Başvuru Hakkı</h2>
              <p>
                Kişisel verilerinizin korunması kapsamındaki haklarınızın ihlali durumunda, KVKK'nın 14. 
                maddesi uyarınca Kişisel Verileri Koruma Kurulu'na şikayette bulunabilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. İletişim</h2>
              <p>
                KVKK kapsamındaki haklarınızı kullanmak için bizimle iletişime geçebilirsiniz. Başvurularınızı 
                yazılı olarak iletebilir veya e-posta yoluyla ulaştırabilirsiniz.
              </p>
              <p className="mt-4">
                <strong>E-posta:</strong> kvkk@dersnotu.net
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

