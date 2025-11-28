chrome.webRequest.onBeforeRequest.addListener(
	function (details) {
		const url = new URL(details.url);

		// If it's a normal watch-URL: /watch?v=…
		if (
			url.hostname.endsWith("youtube.com") &&
			url.pathname === "/watch" &&
			url.searchParams.has("v")
		) {
			const id = url.searchParams.get("v");
			return { redirectUrl: `https://icy-lava.github.io/yt-embed#${id}` };
		}

		// If it's a short youtu.be URL: https://youtu.be/ID
		if (url.hostname === "youtu.be") {
			// Path starts with /VIDEO_ID (maybe with extra params)
			const id = url.pathname.substring(1); // remove leading '/'
			if (id) {
				return {
					redirectUrl: `https://icy-lava.github.io/yt-embed#${id}`,
				};
			}
		}
	},
	{ urls: ["*://*.youtube.com/*", "*://youtu.be/*"] },
	["blocking"],
);
