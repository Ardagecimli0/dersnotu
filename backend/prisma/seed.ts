// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Tohumlama (Seeding) başlıyor...')

  // 1. SINIFLAR (Grades)
  const gradesData = [
    { name: '9. Sınıf', slug: '9-sinif' },
    { name: '10. Sınıf', slug: '10-sinif' },
    { name: '11. Sınıf', slug: '11-sinif' },
    { name: '12. Sınıf', slug: '12-sinif' },
    { name: 'TYT', slug: 'tyt' },
    { name: 'AYT', slug: 'ayt' },
  ]

  for (const g of gradesData) {
    // upsert: Varsa güncelle, yoksa yarat demek (Tekrar çalıştırınca hata vermez)
    const grade = await prisma.grade.upsert({
      where: { slug: g.slug },
      update: {},
      create: g,
    })
    console.log(`✅ Sınıf Hazır: ${grade.name}`)

    // 2. DERSLER (Her sınıf için Matematik ve Fizik ekleyelim örnek olarak)
    const lessonsData = [
      { name: 'Matematik', slug: 'matematik' },
      { name: 'Fizik', slug: 'fizik' },
      { name: 'Edebiyat', slug: 'edebiyat' }
    ]

    for (const l of lessonsData) {
      const lesson = await prisma.lesson.upsert({
        where: {
            // Lesson tablosunda @@unique([gradeId, slug]) yapmıştık
            gradeId_slug: {
                gradeId: grade.id,
                slug: l.slug
            }
        },
        update: {},
        create: {
            name: l.name,
            slug: l.slug,
            gradeId: grade.id
        }
      })
      console.log(`   -> Ders Eklendi: ${lesson.name} (${grade.name})`)
      
      // 3. KONULAR (Örnek: Matematiğe 'Kümeler' ekleyelim)
      if(l.slug === 'matematik') {
          await prisma.topic.upsert({
              where: {
                  lessonId_slug: {
                      lessonId: lesson.id,
                      slug: 'kumeler'
                  }
              },
              update: {},
              create: {
                  name: 'Kümeler',
                  slug: 'kumeler',
                  lessonId: lesson.id
              }
          })
          console.log(`      -> Konu Eklendi: Kümeler`)
      }
    }
  }

  console.log('🏁 Tohumlama tamamlandı.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })