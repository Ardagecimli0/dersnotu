# Heroku Deployment Rehberi

Bu dokümanda projenizi Heroku'ya deploy etme adımları anlatılmaktadır.

## Gereksinimler

- Heroku hesabı
- Heroku CLI kurulumu
- Git kurulumu

## Deployment Adımları

### 1. Heroku CLI ile Giriş Yapın

```bash
heroku login
```

### 2. Heroku Uygulaması Oluşturun

```bash
heroku create your-app-name
```

### 3. Environment Variables (Config Vars) Ayarlayın

Heroku Dashboard'dan veya CLI ile environment variables'ları ayarlayın:

```bash
# Database URL (MySQL) - Port: 3306
heroku config:set DATABASE_URL="mysql://abguzell_dersnotuadmin:ardazay123@104.247.167.50:3306/abguzell_dersnotu?sslmode=disable"

# JWT Secret (Opsiyonel - belirtilmezse default değer kullanılır)
# heroku config:set JWT_SECRET="your-super-secret-jwt-key-here"

# Backend Port (internal port)
heroku config:set BACKEND_PORT=3001

# Frontend API URL (Domain veya Heroku app URL'iniz)
heroku config:set NEXT_PUBLIC_API_URL="https://www.dersnotu.net"
```

**ÖNEMLİ:** 
- `DATABASE_URL` içindeki port 3306 olmalıdır ve `?sslmode=disable` parametresi eklenmelidir
- `NEXT_PUBLIC_API_URL` domain'iniz ile eşleşmeli (www.dersnotu.net)
- `JWT_SECRET` opsiyoneldir, belirtilmezse default değer kullanılır

### 4. Custom Domain Ayarlayın (Opsiyonel)

Eğer www.dersnotu.net domain'ini kullanmak istiyorsanız:

```bash
# Domain'i ekle
heroku domains:add www.dersnotu.net

# Domain'i doğrula (DNS ayarlarını yapmanız gerekecek)
```

DNS ayarları için Heroku Dashboard'dan alacağınız bilgileri DNS sağlayıcınıza eklemeniz gerekir.

### 5. Veritabanı Migration'larını Çalıştırın

Deploy sonrası migration'lar otomatik çalışacak, ancak manuel olarak çalıştırmak isterseniz:

```bash
heroku run "cd backend && npx prisma migrate deploy"
```

### 6. Projeyi Deploy Edin

```bash
git add .
git commit -m "Heroku deployment ready"
git push heroku main
```

Veya mevcut branch'inizi push edin:

```bash
git push heroku your-branch:main
```

### 7. Logları Kontrol Edin

```bash
heroku logs --tail
```

## Proje Yapısı

- **Backend**: Port 3001'de çalışır (internal)
- **Frontend**: Heroku'nun PORT environment variable'ını kullanır (genellikle 80 veya 443)
- **Database**: MySQL (uzak sunucu)

## Sorun Giderme

### Build Hatası

Build sırasında hata alırsanız:

```bash
heroku logs --tail
```

### Database Bağlantı Hatası

DATABASE_URL'in doğru ayarlandığından emin olun:

```bash
heroku config:get DATABASE_URL
```

### Port Hatası

Backend ve Frontend'in farklı portlarda çalıştığından emin olun. Heroku otomatik olarak PORT environment variable'ını set eder.

### Migration Hatası

Migration'lar heroku-postbuild script'inde otomatik çalışır. Manuel çalıştırmak için:

```bash
heroku run "cd backend && npx prisma migrate deploy"
```

## Önemli Notlar

1. **DATABASE_URL**: MySQL bağlantı string'i doğru formatta olmalı, port **3306** olmalıdır ve `?sslmode=disable` parametresi eklenmelidir
2. **JWT_SECRET**: Opsiyoneldir. Belirtilmezse default değer ('GIZLI_KELIME') kullanılır. Production için güvenli bir değer kullanmanız önerilir
3. **NEXT_PUBLIC_API_URL**: Frontend'in backend'e bağlanması için gerekli. Domain'iniz ile eşleşmeli (örn: https://www.dersnotu.net)
4. **BACKEND_PORT**: Backend'in internal port'u (varsayılan: 3001)

## Environment Variables Listesi

| Değişken | Açıklama | Zorunlu | Örnek |
|----------|----------|---------|-------|
| `DATABASE_URL` | MySQL bağlantı string'i (port: 3306, sslmode=disable) | **Evet** | `mysql://user:pass@host:3306/db?sslmode=disable` |
| `JWT_SECRET` | JWT token şifreleme anahtarı | Hayır (opsiyonel) | `your-secret-key` |
| `BACKEND_PORT` | Backend internal port | Hayır (varsayılan: 3001) | `3001` |
| `NEXT_PUBLIC_API_URL` | Frontend için API URL | Hayır (varsayılan: Heroku URL) | `https://www.dersnotu.net` |
| `PORT` | Heroku tarafından otomatik set edilir | Otomatik | `80` veya `443` |

