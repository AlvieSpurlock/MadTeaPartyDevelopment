/* Page-view counter for the Mad Tea Party Development sites (studio pages, every product site and
   the Mimic Masters copy). Same rules and the same Google Sheet as the standalone Mimic Masters site
   (see the Traffic Tracking blueprint):
   - Sends exactly two fields: p = page, s = source. No cookies, no visitor ID.
   - p names the site as well as the page, so every site gets its own rows:
       studio.index.html, studio.games.html, queens-court.pricing.html, dev-kits.admob.html,
       mimic-masters.play.html ... (the standalone Mimic Masters site keeps its plain names: index.html ...)
   - s = ?src= / ?utm_source= tag, else "site" (from your own sites), "from:<host>" or "direct".
   - Skips localhost, Do Not Track / Global Privacy Control, bots and prerendering, and any device
     opted out with ?notrack=1 (?notrack=0 counts it again). Counts each page once per tab visit. */
(function () {
  try {
    // The TrafficReceiver web app URL (ends in /exec). Leave blank to count nothing.
    var U = "https://script.google.com/macros/s/AKfycbxQPRHkJw_xzJ2kGwJy28oEKJ_15cpd4gmDQOzhY_d9waQCcfOylBdEOehHd9ji-ihB/exec";
    var REPO = "madteapartydevelopment";   // the repo folder in the GitHub Pages address

    if (!/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(U)) return;
    var L = location, q = new URLSearchParams(L.search);
    if (L.protocol === "file:" || /^(localhost|127\.|0\.0\.0\.0)/.test(L.hostname)) return;
    if (q.has("notrack")) { try { q.get("notrack") === "0" ? localStorage.removeItem("mm_notrack") : localStorage.setItem("mm_notrack", "1"); } catch (e) {} }
    try { if (localStorage.getItem("mm_notrack")) return; } catch (e) {}
    if (navigator.doNotTrack === "1" || window.doNotTrack === "1" || navigator.globalPrivacyControl || document.prerendering) return;
    if (navigator.webdriver || /bot|crawl|spider|slurp|headless|lighthouse|preview/i.test(navigator.userAgent)) return;

    // Which site and page: /MadTeaPartyDevelopment/queens-court/pricing.html -> queens-court.pricing.html
    var segs = L.pathname.toLowerCase().split("/").filter(Boolean);
    var file = /\.html$/.test(segs[segs.length - 1] || "") ? segs.pop() : "index.html";
    var folder = segs[segs.length - 1] || "";
    var site = (!folder || folder === REPO) ? "studio" : folder.replace(/[^a-z0-9_-]/g, "");
    var page = (site + "." + file).slice(-65);

    var src = (q.get("src") || q.get("utm_source") || "").toLowerCase();
    if (!src) {
      try {
        var h = new URL(document.referrer).hostname.replace(/^www\./, "");
        src = !h ? "direct" : h === L.hostname.replace(/^www\./, "") ? "site" : "from:" + h;
      } catch (e) { src = "direct"; }
    }
    src = src.replace(/[^a-z0-9:._-]/g, "").slice(0, 40) || "direct";

    try { var k = "mm_v_" + page; if (sessionStorage.getItem(k)) return; sessionStorage.setItem(k, "1"); } catch (e) {}
    var body = new URLSearchParams({ p: page, s: src });
    if (navigator.sendBeacon && navigator.sendBeacon(U, body)) return;
    fetch(U, { method: "POST", body: body, mode: "no-cors", keepalive: true }).catch(function () {});
  } catch (e) {}
})();
