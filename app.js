const express = require('express');
const path = require('path');
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

// İletişim ve Teklif Al Rotaları
app.get('/iletisim', (req, res) => {
  res.render('teklif-al', { title: 'CI & EM Yangın Kapıları - İletişim' });
});

app.get('/teklif-al', (req, res) => {
  res.render('teklif-al', { title: 'CI & EM Yangın Kapıları - Projeniz İçin Teklif Alın' });
});

// Geçici Veritabanı (İleride MongoDB'ye taşınacak)
const productsDb = {
  'ignis-pro-120': {
    name: 'Ignis Pro 120',
    badge1: 'Premium Seri',
    badge2: 'EI 120 Sertifikalı',
    image: '/images/yanginkapi.jpg',
    description: 'Sertifikalı panik bar mekanizması, intümesan yangın fitilleri ve ultra dayanıklı 2mm galvaniz sac kasasıyla donatılmış, ağır hizmet tipi yangın kapısı. İnsan hayatının söz konusu olduğu yüksek riskli alanlar için en üst düzey koruma sağlar.',
    features: [
      '120 Dakikaya Kadar Kesin Yangın ve Duman Dayanımı',
      'Avrupa Standartlarında (EN 1634-1) Test Edilmiştir',
      'Akıllı Bina ve Alarm Sistemleri ile Tam Entegrasyon'
    ],
    specs: [
      { title: 'Sertifikasyon', desc: 'EN 1634-1, EI 120 / CE Belgeli' },
      { title: 'Kasa Yapısı', desc: '2.0 mm kalınlığında elektrostatik boyalı galvaniz çelik, ayarlanabilir fitilli geçme kasa.' },
      { title: 'Kanat Dolgusu', desc: '150 yoğunluklu taşyünü ve özel alçıpan seramik levha destekli yüksek ısı yalıtımı.' },
      { title: 'Donanımlar', desc: 'İntümesan sıcak duman fitili, ağır hizmet tipi panik bar, hidrolik yaylı kapı kapatıcı, 3D menteşe.' },
      { title: 'Renk Seçeneği', desc: 'RAL Kataloğundaki tüm renklerde projeye özel fırın boya uygulaması.' }
    ]
  },
  'aegis-smart-door': {
    name: 'Aegis Smart Door',
    badge1: 'Lüks Seri',
    badge2: 'Biyometrik Kilit',
    image: '/images/celikkapi.jpg',
    description: 'Parmak izi okuyucu ve akıllı kilit teknolojisi ile zırhlandırılmış ultra lüks villa ve konut kapısı. Estetik ve güvenliği teknolojiyle buluşturur.',
    features: [
      'Parmak İzi ve Şifreli Lüks Kilit Sistemi',
      'Dışarıdan Görünmeyen 3D Gizli Menteşeler',
      'Aşılmaz Çelik Zırh ve Üstün Ses Yalıtımı'
    ],
    specs: [
      { title: 'Kilit Sistemi', desc: 'Motorlu, parmak izi ve şifre destekli biyometrik akıllı kilit.' },
      { title: 'Kasa Yapısı', desc: '2.5 mm güçlendirilmiş çelik, gizli montajlı lüks kasa.' },
      { title: 'Kanat Dolgusu', desc: 'Yüksek yoğunluklu taşyünü ve çelik güvenlik bariyerleri.' },
      { title: 'Donanımlar', desc: 'İtalyan 3D gizli menteşe, geniş açılı dijital dürbün.' },
      { title: 'Dış Yüzey', desc: 'Suya ve güneşe dayanıklı kompozit doğal ahşap giydirme.' }
    ]
  },
  'silva-acoustic': {
    name: 'Silva Acoustic',
    badge1: 'Prestij Seri',
    badge2: '38 dB Akustik',
    image: '/images/ahsapkapi.jpg',
    description: 'Otel odaları ve lüks ofisler için özel geliştirilmiş, ses yalıtımlı ve manyetik kilitli ahşap iç mekan kapısı.',
    features: [
      '38 dB\'e Kadar Yüksek Akustik İzolasyon (Ses Yalıtımı)',
      'Sessiz ve Pürüzsüz Kapanma Sağlayan Manyetik Kilitler',
      'Lüks Doğal Ahşap Kaplama Yüzeyler'
    ],
    specs: [
      { title: 'Sertifikasyon', desc: 'TSE Onaylı 38 dB Akustik Test Raporu' },
      { title: 'Kasa Yapısı', desc: 'Masif ahşap üzeri doğal kaplama, contalı özel yalıtım kasası.' },
      { title: 'Kanat Dolgusu', desc: 'Akustik yalıtımlı özel delikli sunta (tubular board).' },
      { title: 'Donanımlar', desc: 'İtalyan manyetik kilit, gizli menteşe, otomatik alt giyotin.' },
      { title: 'Yüzey', desc: 'Ceviz, meşe, lake veya projeye özel lüks doğal kaplamalar.' }
    ]
  },
  'ignis-lite-60': {
    name: 'Ignis Lite 60',
    badge1: 'Mimari Seri',
    badge2: 'EI 60 Sertifikalı',
    image: '/images/yanginkapi.jpg',
    description: 'İç mekan mimarisine uyum sağlayan, şık ve daha hafif tasarımlı sertifikalı yangın çıkış kapısı. İnce yapısına rağmen üstün koruma sunar.',
    features: [
      '60 Dakika Kesin Yangın ve Duman Dayanımı',
      'İç Mekan İçin Özel Geliştirilmiş İnce (Slim) Kasa Tasarımı',
      'Yangın Anında Otomatik Çalışan Akıllı Kapanma Sistemi'
    ],
    specs: [
      { title: 'Sertifikasyon', desc: 'EN 1634-1, EI 60 / CE Belgeli' },
      { title: 'Kasa Yapısı', desc: '1.5 mm kalınlığında galvaniz çelik, mimari ince kasa yapısı.' },
      { title: 'Kanat Dolgusu', desc: 'Yangına dayanıklı özel seramik yünü dolgu malzemesi.' },
      { title: 'Donanımlar', desc: 'Gizli kapı kapatıcı, yangın contası, paslanmaz çelik kol.' },
      { title: 'Renk Seçeneği', desc: 'Mimari konseptinize uygun elektrostatik fırın boya.' }
    ]
  },
  'aegis-classic': {
    name: 'Aegis Classic',
    badge1: 'Klasik Seri',
    badge2: '14 Noktadan Kilit',
    image: '/images/celikkapi.jpg',
    description: 'Zamana meydan okuyan klasik motiflerle bezenmiş, yüksek güvenlikli daire kapısı. Geleneksel çizgileri modern güvenlikle harmanlar.',
    features: [
      '14 Farklı Noktadan Kilitleme Yapan Zırhlı Sistem',
      'El İşçiliği ile Hazırlanmış Ahşap Yüzeyler',
      'Üstün Isı ve Ses Yalıtımı İçin Çift Conta Sistemi'
    ],
    specs: [
      { title: 'Kilit Sistemi', desc: 'Merkezi sistem, 14 noktadan kitleyen çelik mil mekanizması.' },
      { title: 'Kasa Yapısı', desc: '2.0 mm bükümlü çelik, dıştan ahşap pervaz kaplamalı.' },
      { title: 'Kanat Dolgusu', desc: 'Çelik kafes destekli poliüretan köpük yalıtımı.' },
      { title: 'Donanımlar', desc: 'Pirinç veya eskitme döküm kollar, geniş açılı dijital dürbün.' },
      { title: 'Dış Yüzey', desc: 'CNC işlemeli klasik motifli masif ahşap kaplama.' }
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