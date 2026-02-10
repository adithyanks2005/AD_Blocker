function removeAds() {
    if (!enabled) return;
    if (isWhitelisted()) return;

    const selectors = [
        ".ad",
        ".ads",
        ".advertisement",
        ".sponsored",
        ".promo",
        "[class*='ad-']",
        "[class*='ads-']",
        "[class*='advert']"
    ];

    let removed = 0;

    selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            el.remove();
            removed++;
        });
    });

    if (removed > 0) {
        chrome.storage.sync.get(["blocked"], d => {
            let count = d.blocked || 0;
            chrome.storage.sync.set({ blocked: count + removed });
        });
    }
}
