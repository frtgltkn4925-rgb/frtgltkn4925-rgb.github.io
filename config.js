// ===== CÜZ TAKİP AYARLARI =====
// Kurulum rehberindeki adımlarla bu üç bölümü doldurun.
self.CUZ_AYAR = {
  // 1) Google Apps Script web uygulaması adresi (sonu /exec ile biter)
  API_ADRESI: "https://script.google.com/macros/s/AKfycbxwiUf0VWGiYKwFkjoQ5dLcYt9vsMlwY7H5ma-jI6tlta4QUYqRHe_cGnVkaUhDWqJEAQ/exec",

  // 2) Firebase → Proje ayarları → Genel → "Uygulamalarınız" altındaki firebaseConfig
  FIREBASE: {
    apiKey:"AIzaSyAY8tf7Cr7TPWja3lqnq3taAS2q-qYzmKw",
    authDomain:"cuz-takip.firebaseapp.com",
    projectId:"cuz-takip",
    storageBucket:"cuz-takip.firebasestorage.app",
    messagingSenderId:"193768265016",
    appId:"1:193768265016:web:7b29567b5158c426cc1dcd"
  },

  // 3) Firebase → Proje ayarları → Cloud Messaging → Web Push sertifikaları → Anahtar çifti
  VAPID_ANAHTARI: "BJOSarSG3GXysjMgmvIYt6C_AZol6_359MB7e3c4Tqw5DQ7Mm9xh5nivk-jH6uieGaA9he4PV1AH9vgLjxEodDs"
};
