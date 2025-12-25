# Heroku Build Hatası Çözümü

React Quill'in React 19 ile uyumluluk sorunu nedeniyle Heroku build hatası alıyorsunuz.

## Hızlı Çözüm

Heroku'da şu config var'ı ekleyin:

```bash
heroku config:set npm_config_legacy_peer_deps=true
```

Bu komut, npm'in peer dependency çakışmalarını görmezden gelmesini sağlar ve build'in başarılı olmasını sağlar.

## Alternatif: Heroku Dashboard'dan

1. Heroku Dashboard'a gidin
2. Uygulamanızı seçin
3. Settings sekmesine gidin
4. Config Vars bölümünde "Reveal Config Vars" butonuna tıklayın
5. Şu değerleri ekleyin:
   - **KEY:** `npm_config_legacy_peer_deps`
   - **VALUE:** `true`

## Deploy Sonrası

Config var'ı ekledikten sonra tekrar deploy edin:

```bash
git push heroku main
```

## Not

Bu çözüm geçicidir. React Quill resmi olarak React 19'u desteklediğinde bu config var'ı kaldırabilirsiniz.

