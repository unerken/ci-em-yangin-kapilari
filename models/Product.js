const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // URL için (örn: ignis-pro-120)
  category: { type: String, required: true, enum: ['fire', 'steel', 'wood'] },
  badge1: { type: String }, // Örn: Premium Seri
  badge2: { type: String }, // Örn: EI 120 Sertifikalı
  image: { type: String, required: true }, // Örn: /images/yanginkapi.jpg
  description: { type: String, required: true },
  features: [{ type: String }], // Özellikler listesi
  specs: [{                     // Teknik detaylar tablosu
    title: { type: String },
    desc: { type: String }
  }]
}, { 
  timestamps: true // Ürünün ne zaman eklendiğini/güncellendiğini otomatik tutar
});

module.exports = mongoose.model('Product', productSchema);