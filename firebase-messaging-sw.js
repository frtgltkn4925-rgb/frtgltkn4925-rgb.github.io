// Cüz Takip — internetsiz çalışma ve bildirimler
importScripts("./config.js");
const SURUM = "ct-v1";
const KABUK = ["./", "./index.html", "./gizlilik.html", "./config.js", "./manifest.json", "./icon-192.png", "./icon-512.png"];
const VERI_SITELERI = ["api.alquran.cloud", "cdn.jsdelivr.net", "fonts.googleapis.com", "fonts.gstatic.com", "www.gstatic.com"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(SURUM).then(c => c.addAll(KABUK)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== SURUM && k !== "ct-veri").map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET") return;
  const u = new URL(r.url);
  if (u.origin === location.origin) {
    // Uygulama dosyaları: önce internet (güncel kalsın), yoksa önbellek
    e.respondWith(fetch(r).then(res => { const k = res.clone(); caches.open(SURUM).then(c => c.put(r, k)); return res; })
      .catch(() => caches.match(r).then(m => m || caches.match("./index.html"))));
    return;
  }
  if (VERI_SITELERI.some(h => u.hostname === h)) {
    // Kur'an metni ve yazı tipleri: önce önbellek (internetsiz okuma)
    e.respondWith(caches.open("ct-veri").then(c => c.match(r).then(m => m || fetch(r).then(res => { if (res.ok || res.type === "opaque") c.put(r, res.clone()); return res; }))));
  }
});

// Bildirimler (Firebase ayarı girildiyse)
const F = (self.CUZ_AYAR && self.CUZ_AYAR.FIREBASE) || {};
if (F.apiKey) {
  importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js", "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");
  firebase.initializeApp(F);
  firebase.messaging();
}
self.addEventListener("notificationclick", e => {
  const link = (e.notification.data && e.notification.data.FCM_MSG && e.notification.data.FCM_MSG.notification && e.notification.data.FCM_MSG.notification.click_action) || "./";
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window" }).then(ws => { for (const w of ws) { if ("focus" in w) return w.focus(); } return self.clients.openWindow(link); }));
});
