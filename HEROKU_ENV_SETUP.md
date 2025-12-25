# Heroku Environment Variables Kurulumu

Bu dosya, Heroku'da gerekli environment variables'ların nasıl ayarlanacağını gösterir.

## Zorunlu Environment Variables

### DATABASE_URL
MySQL veritabanı bağlantı string'i. Port **3306** olmalıdır.

```bash
heroku config:set DATABASE_URL="mysql://abguzell_dersnotuadmin:ardazay123@104.247.167.50:3306/abguzell_dersnotu?sslmode=disable"
```

Format: `mysql://kullanici:sifre@host:3306/veritabani_adi?sslmode=disable`

## Opsiyonel Environment Variables

### NEXT_PUBLIC_API_URL
Frontend'in backend API'sine bağlanması için kullanılan URL. Domain kullanıyorsanız bunu ayarlayın.

```bash
heroku config:set NEXT_PUBLIC_API_URL="https://www.dersnotu.net"
```

Belirtilmezse default olarak `https://www.dersnotu.net` kullanılır.

### JWT_SECRET
JWT token şifreleme anahtarı. **Opsiyoneldir**, belirtilmezse default değer (`GIZLI_KELIME`) kullanılır.

```bash
heroku config:set JWT_SECRET="your-super-secret-jwt-key-here"
```

**Not:** Production için güvenli bir değer kullanmanız önerilir, ancak zorunlu değildir.

### BACKEND_PORT
Backend API'nin internal port'u. Varsayılan: `3001`

```bash
heroku config:set BACKEND_PORT=3001
```

## Tüm Environment Variables'ları Görüntüleme

```bash
heroku config
```

## Tek Bir Environment Variable'ı Görüntüleme

```bash
heroku config:get DATABASE_URL
heroku config:get NEXT_PUBLIC_API_URL
```

## Environment Variable Silme

```bash
heroku config:unset VARIABLE_NAME
```

## Örnek: Tüm Gerekli Ayarları Yapma

```bash
# Zorunlu
heroku config:set DATABASE_URL="mysql://abguzell_dersnotuadmin:ardazay123@104.247.167.50:3306/abguzell_dersnotu?sslmode=disable"

# Önerilen (Opsiyonel)
heroku config:set NEXT_PUBLIC_API_URL="https://www.dersnotu.net"
heroku config:set JWT_SECRET="your-super-secret-jwt-key-here"
heroku config:set BACKEND_PORT=3001

## Önemli Notlar

1. **DATABASE_URL** mutlaka port **3306** içermelidir ve `?sslmode=disable` parametresi eklenmelidir
2. **JWT_SECRET** belirtilmezse uygulama çalışmaya devam eder (default değer kullanılır)
3. **NEXT_PUBLIC_API_URL** belirtilmezse domain veya Heroku URL'i kullanılır
4. Environment variables değiştirildikten sonra uygulamayı yeniden başlatmanız gerekebilir:

```bash
heroku restart
```

