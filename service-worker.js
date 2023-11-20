// 캐시 이름
const CACHE_NAME = "cache-v1";

// 캐싱할 파일
const FILES_TO_CACHE = [
	"/",
	"/index.html",
	"/offline.html",
	"/shareTarget.html",
];

// 상술한 파일 캐싱
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => cache.addAll(FILES_TO_CACHE))
	);
});

// CACHE_NAME이 변경되면 오래된 캐시 삭제
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((keyList) =>
			Promise.all(
				keyList.map((key) => {
					if (CACHE_NAME !== key)
						return caches.delete(key);
				})
			)
		)
	);
});

// 요청에 실패하면 오프라인 페이지 표시
self.addEventListener("fetch", (event) => {
	if ("navigate" !== event.request.mode) return;

	event.respondWith(
		fetch(event.request).catch(() =>
			caches
				.open(CACHE_NAME)
				.then((cache) =>
					cache.match(
						"https://dev.dadamda.me/offline.html"
					)
				)
		)
	);
});

self.addEventListener("fetch", async (event) => {
	// If this is an incoming POST request for the
	// registered "action" URL, respond to it.
	if (
		event.request.method !== "POST" ||
		event.request.url !== "/bookmark"
	) {
		return;
	}

	const data = await event.request.formData();
	const url = data.get("url");

	event.respondWith(
		Response.redirect(`https://dev.dadamda.me/bookmark?url=${url}`)
	);
	// event.waitUntil(
	// 	(async function () {
	// 		const data = await event.request.formData();
	// 		const client = await self.clients.get(
	// 			event.resultingClientId || event.clientId
	// 		);
	// 		const url = data.get("url");
	// 		client.postMessage(url);
	// 	})()
	// );
});
