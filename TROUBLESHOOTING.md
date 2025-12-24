# Heroku Troubleshooting Rehberi

## Backend MySQL Bağlantı Sorunları

### 1. Backend'in Çalışıp Çalışmadığını Kontrol Edin

Heroku loglarını kontrol edin:

```bash
heroku logs --tail
```

Backend'in başladığını görmek için şu log mesajını arayın:
```
✅ Backend listening on port 3001
```

### 2. DATABASE_URL Kontrolü

DATABASE_URL'in doğru ayarlandığından emin olun:

```bash
heroku config:get DATABASE_URL
```

Doğru format:
```
mysql://abguzell_dersnotuadmin:ardazay123@104.247.167.50:3306/abguzell_dersnotu?sslmode=disable
```

**ÖNEMLİ:** URL'de özel karakterler varsa (özellikle şifrede), URL encoding kullanılmalıdır.

### 3. MySQL Sunucusuna Heroku'dan Erişim

Heroku'dan remote MySQL sunucusuna bağlantı sorunları:

- **Firewall**: MySQL sunucusu (104.247.167.50) Heroku IP aralıklarına izin vermelidir
- **SSL**: `?sslmode=disable` parametresi eklendi
- **Port**: Port 3306 açık olmalı

MySQL sunucusunun firewall ayarlarını kontrol edin. Heroku dinamik IP kullanır, bu yüzden tüm IP'lere izin vermek gerekebilir (güvenlik açısından ideal değil) veya MySQL sunucusunu Heroku'ya erişime açık hale getirmek gerekir.

### 4. Prisma Migration Kontrolü

Migration'ların çalıştığını kontrol edin:

```bash
heroku run "cd backend && npx prisma migrate status"
```

Migration'ları manuel çalıştırmak için:

```bash
heroku run "cd backend && npx prisma migrate deploy"
```

### 5. Backend Port Kontrolü

Backend'in 3001 port'unda çalıştığını kontrol edin:

```bash
heroku run "netstat -an | grep 3001"
```

### 6. Environment Variables Kontrolü

Tüm gerekli environment variables'ları kontrol edin:

```bash
heroku config
```

Gerekli değişkenler:
- `DATABASE_URL` ✅ (zorunlu)
- `BACKEND_PORT` (opsiyonel, varsayılan: 3001)
- `JWT_SECRET` (opsiyonel)
- `NEXT_PUBLIC_API_URL` (opsiyonel)

### 7. Test: Backend'e Manuel Bağlantı

Heroku'da backend'in çalıştığını test etmek için:

```bash
heroku run bash
# Sonra:
cd backend
node dist/main.js
```

### 8. Prisma Client Kontrolü

Prisma Client'ın doğru generate edildiğini kontrol edin:

```bash
heroku run "cd backend && npx prisma generate"
```

### 9. Database Bağlantı Testi

Heroku'dan database'e bağlantıyı test edin:

```bash
heroku run "cd backend && npx prisma db pull"
```

Bu komut database şemasını çeker ve bağlantının çalıştığını gösterir.

## Yaygın Hata Mesajları ve Çözümleri

### "P1001: Can't reach database server"

**Sebep:** MySQL sunucusuna erişilemiyor (firewall, network)

**Çözüm:**
1. MySQL sunucusunun firewall ayarlarını kontrol edin
2. Heroku IP aralıklarına izin verin
3. MySQL sunucusunun 3306 port'unun açık olduğundan emin olun

### "P1000: Authentication failed"

**Sebep:** Yanlış kullanıcı adı/şifre

**Çözüm:**
1. DATABASE_URL'deki kullanıcı adı ve şifreyi kontrol edin
2. Özel karakterler varsa URL encoding kullanın

### "Backend listening on port..."

**Sebep:** Backend başlatılamıyor

**Çözüm:**
1. Logları kontrol edin: `heroku logs --tail`
2. Backend build'inin başarılı olduğundan emin olun
3. `backend/dist/main.js` dosyasının var olduğunu kontrol edin

## Hızlı Kontrol Listesi

- [ ] DATABASE_URL doğru ayarlanmış mı?
- [ ] Backend loglarında "Backend listening on port" görünüyor mu?
- [ ] Prisma migration'lar çalıştırıldı mı?
- [ ] MySQL sunucusu Heroku IP'lerine açık mı?
- [ ] Backend port 3001'de çalışıyor mu?
- [ ] Frontend backend'e bağlanabiliyor mu? (NEXT_PUBLIC_API_URL)

## Debug Komutları

```bash
# Tüm logları görüntüle
heroku logs --tail

# Sadece backend loglarını görüntüle
heroku logs --tail | grep backend

# Environment variables
heroku config

# Database bağlantısını test et
heroku run "cd backend && npx prisma db pull"

# Migration durumu
heroku run "cd backend && npx prisma migrate status"

# Backend'i manuel başlat
heroku run "cd backend && node dist/main.js"
```

