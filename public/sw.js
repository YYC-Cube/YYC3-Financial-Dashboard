/**
 * YYC³ 金融仪表盘 Service Worker
 * @description PWA 离线缓存策略：预缓存核心资源 + 运行时缓存
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-15
 */

const CACHE_VERSION = "yyc3-fd-v1"
const STATIC_CACHE = `${CACHE_VERSION}-static`
const PAGE_CACHE = `${CACHE_VERSION}-pages`
const IMAGE_CACHE = `${CACHE_VERSION}-images`

/** 预缓存的核心资源 */
const PRECACHE_URLS = [
  "/",
  "/dashboard",
  "/manifest.json",
  "/yyc3/Web App/android-chrome-192.png",
  "/yyc3/Web App/android-chrome-512.png",
]

// ============ 安装阶段：预缓存 ============
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  )
})

// ============ 激活阶段：清理旧缓存 ============
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => !name.startsWith(CACHE_VERSION))
          .map((name) => caches.delete(name)),
      ),
    ).then(() => self.clients.claim()),
  )
})

// ============ 请求拦截：缓存策略 ============
self.addEventListener("fetch", (event) => {
  const { request } = event

  // 仅处理 GET 请求
  if (request.method !== "GET") return

  const url = new URL(request.url)

  // 同源资源处理
  if (url.origin === self.location.origin) {
    // 页面请求：Network First（优先网络，降级缓存）
    if (request.mode === "navigate") {
      event.respondWith(networkFirstStrategy(request, PAGE_CACHE))
      return
    }

    // 图片请求：Cache First（优先缓存，减少带宽）
    if (request.destination === "image") {
      event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE))
      return
    }

    // 静态资源（JS/CSS/字体）：Stale While Revalidate
    if (
      request.destination === "script" ||
      request.destination === "style" ||
      request.destination === "font"
    ) {
      event.respondWith(staleWhileRevalidateStrategy(request, STATIC_CACHE))
      return
    }
  }
})

// ============ 缓存策略实现 ============

/** Network First：优先网络，失败时回退缓存 */
async function networkFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName)
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (_error) {
    const cachedResponse = await cache.match(request)
    if (cachedResponse) return cachedResponse
    // 离线时回退到仪表盘缓存
    return cache.match("/dashboard")
  }
}

/** Cache First：优先缓存，无缓存时请求网络 */
async function cacheFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cachedResponse = await cache.match(request)
  if (cachedResponse) return cachedResponse
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (_error) {
    // 图片无缓存且离线，返回空响应
    return new Response("", { status: 404, statusText: "Offline" })
  }
}

/** Stale While Revalidate：立即返回缓存，同时后台更新 */
async function staleWhileRevalidateStrategy(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cachedResponse = await cache.match(request)
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone())
      }
      return networkResponse
    })
    .catch(() => cachedResponse)
  return cachedResponse || fetchPromise
}

// ============ 消息通信：接收 SKIP_WAITING 指令 ============
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting()
  }
})
