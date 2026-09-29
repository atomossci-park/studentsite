// 앱 껍데기만 저장합니다. 학생/학부모 데이터, 사진, PDF, 인증 토큰은 캐시하지 않습니다.
const CACHE='atomos-shell-v01-googlecloud-20260929';
const SHELL=['./','./index.html','./style.css','./config.js','./app.js','./bank.js','./icon.svg','./icon-192.png','./icon-512.png','./manifest.webmanifest'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('atomos-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==location.origin)return;
 const base=new URL('./',self.registration.scope);const allowed=new Set(SHELL.map(p=>new URL(p,base).pathname));
 if(!allowed.has(url.pathname))return;
 event.respondWith(fetch(event.request).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));}return res;}).catch(()=>caches.match(event.request).then(c=>c||caches.match(new URL('./index.html',base).href))));
});
