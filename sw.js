"use strict";const CACHE_NAME="offline",OFFLINE_URL="offline.html";self.addEventListener("install",(e=>{e.waitUntil((async()=>{const e=await caches.open("offline");await e.add(new Request(OFFLINE_URL,{cache:"reload"}))})()),self.skipWaiting()})),self.addEventListener("activate",(e=>{e.waitUntil((async()=>{"navigationPreload"in self.registration&&await self.registration.navigationPreload.enable()})()),self.clients.claim()})),self.addEventListener("fetch",(e=>{"navigate"===e.request.mode&&e.respondWith((async()=>{try{const t=await e.preloadResponse;if(t)return t;return await fetch(e.request)}catch(e){console.log("Fetch failed; returning offline page instead.",e);const t=await caches.open("offline");return await t.match(OFFLINE_URL)}})())}));