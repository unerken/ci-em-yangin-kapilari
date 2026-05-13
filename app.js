const express = require('express');
const path = require('path');
const fs = require('fs'); // Klasörleri okumak için eklendi
require('dotenv').config(); // Çevresel değişkenler (.env) için

const app = express();
const PORT = process.env.PORT || 3000;

// --- TEMEL AYARLAR (Config) ---
// View Engine olarak EJS ayarlanması
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- MİDDLEWARE'LER ---
// Statik dosyalar için 'public' klasörünün dışa açılması
app.use(express.static(path.join(__dirname, 'public')));
// Form verilerini ve JSON'ı işlemek için gerekli ayarlar
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- ROTALAR (Routes) ---
// Anasayfa Rotası
app.get('/', (req, res) => {
  res.render('index', { title: 'CI & EM Yangın Kapıları - Anasayfa' });
});

// Ürünler Rotası
app.get('/urunler', (req, res) => {
  res.render('urunler', { title: 'CI & EM Yangın Kapıları - Özel Koleksiyonlar' });
});

// Kurumsal Rotası
app.get('/kurumsal', (req, res) => {
  res.render('kurumsal', { title: 'CI & EM Yangın Kapıları - Kurumsal' });
});

// Ekibimiz Rotası
app.get('/ekibimiz', (req, res) => {
  res.render('ekibimiz', { title: 'CI & EM Yangın Kapıları - Uzman Kadromuz' });
});

// İletişim ve Teklif Al Rotaları
app.get('/iletisim', (req, res) => {
  res.render('teklif-al', { title: 'CI & EM Yangın Kapıları - İletişim' });
});

// Galeri Rotası (Otomatik Klasör Okuma Sistemi)
app.get('/galeri', (req, res) => {
  let images = [];
  const galeriPath = path.join(__dirname, 'public', 'galeri');
  
  try {
    // Eğer klasör varsa içindeki dosyaları oku
    if (fs.existsSync(galeriPath)) {
      const files = fs.readdirSync(galeriPath);
      // Sadece resim formatındaki dosyaları (jpg, jpeg, png, webp) filtrele
      images = files.filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file));
    }
  } catch (err) {
    console.error('Galeri klasörü okunamadı:', err);
  }

  res.render('galeri', { title: 'CI & EM Yangın Kapıları - Fotoğraf Galerisi', images });
});

app.get('/teklif-al', (req, res) => {
  res.render('teklif-al', { title: 'CI & EM Yangın Kapıları - Projeniz İçin Teklif Alın' });
});

// Geçici Veritabanı (İleride MongoDB'ye taşınacak)
const productsDb = {
  'yangin-kapilari': {
    name: 'Yangın Kapıları',
    badge1: 'Sertifikalı Seri',
    badge2: 'EI 60 / 120',
    image: '/images/yanginkapi.jpg',
    description: 'İnsan hayatını ve mekanları korumak için tasarlanmış, uluslararası testlerden geçmiş EI 60, EI 90 ve EI 120 dayanım sertifikalı profesyonel yangın kapıları.',
    features: [
      'EI 60, EI 90 ve EI 120 dakika dayanım seçenekleri',
      'Sertifikalı panik bar ve kapı kapatıcı mekanizmalar',
      'İntümesan (ısıyla genleşen) yangın ve duman contası'
    ],
    specs: [
      { title: 'Sertifikasyon', desc: 'EN 1634-1, EI 60 / EI 120 / CE Belgeli' },
      { title: 'Kasa Yapısı', desc: '1.5 - 2.0 mm galvaniz çelik, ayarlanabilir geçme kasa.' },
      { title: 'Kanat Dolgusu', desc: 'Yüksek yoğunluklu taşyünü ve özel alçıpan seramik destek.' },
      { title: 'Donanımlar', desc: 'Panik bar, hidrolik yay, intümesan fitil, yaylı menteşe.' }
    ],
    options: [
      '60 Dakika Yangın Dayanımı',
      '120 Dakika Yangın Dayanımı',
      'Panik Barlı Kullanım',
      'Dışarıdan Müdahale Kolu',
      'Yangına Dayanıklı Gözetleme Camı'
    ]
  },
  'ahsap-kapi': {
    name: 'Ahşap Kapı',
    badge1: 'Prestij Seri',
    badge2: 'Akustik Yalıtım',
    image: '/images/ahsapkapi.jpg',
    description: 'İç mekanlar için lüks, yüksek ses yalıtımlı ve uzun ömürlü doğal ahşap kapılar. Ev, ofis ve ticari projeler için mükemmel estetik çözüm.',
    features: [
      'Yüksek yoğunluklu dolgu ile 38 dB maksimum ses yalıtımı',
      'Sessiz ve pürüzsüz kapanma sağlayan İtalyan manyetik kilit',
      'Ceviz, meşe ve lake gibi geniş yüzey kaplama seçenekleri'
    ],
    specs: [
      { title: 'Kasa Yapısı', desc: 'Masif ahşap üzeri doğal kaplama, ses yalıtım contalı.' },
      { title: 'Kanat Dolgusu', desc: 'Akustik yalıtımlı özel delikli sunta (Tubular board).' },
      { title: 'Donanımlar', desc: 'İtalyan manyetik kilit, gizli menteşe, özel tasarım kollar.' },
      { title: 'Yüzey', desc: 'Ceviz, meşe, lake boya veya projeye özel doğal kaplamalar.' }
    ],
    options: [
      'Doğal Ahşap Kaplama (Ceviz/Meşe)',
      'Lake Boya (İstenilen RAL Rengi)',
      'Manyetik Sessiz Kilit',
      'Gizli Menteşe Sistemi',
      'Otomatik Alt Giyotin (Ses Kesici)'
    ]
  },
  'kart-girisli-ahsap-kapi': {
    name: 'Kart Girişli Ahşap Kapı',
    badge1: 'Otel & Proje',
    badge2: 'Elektronik Kilit',
    image: '/images/ahsapkapi.jpg',
    description: 'Oteller, hastaneler, rezidanslar ve ticari projeler için özel üretilen; elektronik kart okuyucu kilitlere tam entegre, yüksek güvenlikli ahşap kapı sistemleri.',
    features: [
      'Tüm popüler otel kartlı kilit sistemleri ile tam uyumlu altyapı',
      'Otel odası konforu için 38 dB üzeri akustik ses yalıtımı',
      'Enerji tasarruf cihazları (Energy Saver) ile entegre çalışabilme'
    ],
    specs: [
      { title: 'Kilit Altyapısı', desc: 'Kartlı kilit (RFID/Mifare) sistemleri için özel güçlendirilmiş seren.' },
      { title: 'Opsiyonel', desc: 'İsteğe bağlı 30 veya 60 dakika yangın dayanımı.' },
      { title: 'Kanat Dolgusu', desc: 'Yüksek yoğunluklu akustik yalıtımlı panel.' },
      { title: 'Donanımlar', desc: 'Gizli kapı kapatıcı (hidrolik yay), alt giyotin fitil.' }
    ],
    options: [
      'Kart Okuyuculu Otel Kilidi',
      'Gizli Hidrolik Kapı Kapatıcı',
      '30 Dakika Yangın Dayanımı',
      'Enerji Saver (Röle) Entegrasyonu',
      'Oda Numaratörü / DND Paneli'
    ]
  }
};

// Ürün Detay Rotası (Dinamik)
app.get('/urun/:slug', (req, res) => {
  const slug = req.params.slug;
  const product = productsDb[slug]; // Slug'a göre veritabanından ürünü bul

  if (!product) {
    return res.redirect('/urunler'); // Ürün bulunamazsa ürünler sayfasına geri yolla
  }

  res.render('urun-detay', { 
    title: `${product.name} - CI & EM Yangın Kapıları`,
    product: product 
  });
});

// --- SUNUCUYU BAŞLATMA ---
app.listen(PORT, () => {
  console.log(`🚀 Sunucu başarıyla başlatıldı: http://localhost:${PORT}`);
});

// Vercel Serverless Function yapısı için uygulamayı dışa aktarıyoruz
module.exports = app;