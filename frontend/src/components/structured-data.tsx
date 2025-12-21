// JSON-LD Structured Data for SEO
// Bu component sayfaların <head> bölümüne structured data ekler

export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DersNotu.net",
    "alternateName": ["Ders Notu", "DersNotu", "Lise Ders Notları"],
    "url": "https://dersnotu.net",
    "description": "Ücretsiz lise ders notları platformu. 9, 10, 11, 12. sınıf ders notları, YKS hazırlık, TYT ve AYT notları.",
    "inLanguage": "tr-TR",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://dersnotu.net/?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DersNotu.net",
    "url": "https://dersnotu.net",
    "logo": "https://dersnotu.net/logo1.png",
    "description": "Türkiye'nin en kapsamlı ücretsiz lise ders notları platformu",
    "foundingDate": "2024",
    "sameAs": [
      "https://twitter.com/dersnotunet",
      "https://instagram.com/dersnotunet"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "dersnotu@gmail.com",
      "contactType": "customer service",
      "availableLanguage": "Turkish"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function EducationalOrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "DersNotu.net",
    "url": "https://dersnotu.net",
    "description": "Lise öğrencileri için ücretsiz ders notları ve YKS hazırlık materyalleri",
    "educationalCredentialAwarded": "Ders Notları",
    "areaServed": {
      "@type": "Country",
      "name": "Türkiye"
    },
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
      "audienceType": "Lise Öğrencileri"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function BreadcrumbStructuredData({ items }: { items: { name: string; url: string }[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function FAQStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "DersNotu.net nedir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "DersNotu.net, lise öğrencileri için ücretsiz ders notları sunan bir platformdur. 9, 10, 11 ve 12. sınıf ders notları ile YKS, TYT ve AYT hazırlık materyalleri bulabilirsiniz."
        }
      },
      {
        "@type": "Question",
        "name": "Hangi dersler için not bulabilirim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Matematik, Fizik, Kimya, Biyoloji, Türkçe, Tarih, Coğrafya, İngilizce, Felsefe ve daha birçok ders için kaliteli notlar bulabilirsiniz."
        }
      },
      {
        "@type": "Question",
        "name": "Ders notları ücretsiz mi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evet, DersNotu.net'teki tüm ders notları tamamen ücretsizdir. Kayıt olarak notları indirebilir ve kendi notlarınızı paylaşabilirsiniz."
        }
      },
      {
        "@type": "Question",
        "name": "YKS hazırlık için notlar var mı?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evet, TYT ve AYT sınavlarına hazırlık için özel olarak hazırlanmış ders notları ve konu özetleri mevcuttur."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
