/* Page-view counter for the Mad Tea Party Development sites (studio pages, every product site and
   the Mimic Masters copy). Same rules and the same Google Sheet as the standalone Mimic Masters site
   (see the Traffic Tracking blueprint):
   - Sends exactly two fields: p = page, s = source. No cookies, no visitor ID.
   - Every page of the studio sites is counted (the SITES list below: the studio pages, each software
     site with all its pages, the dev kits, the games, Study Hall). p names the site as well as the page:
     studio.index.html, queens-court.pricing.html, dev-kits.admob.html ... (the standalone Mimic Masters
     site counts every page with its plain names: index.html, play.html ...)
   - s = ?src= / ?utm_source= tag, else "site" (from your own sites), "from:<host>" or "direct".
   - Skips localhost, Do Not Track / Global Privacy Control, bots and prerendering, and any device
     opted out with ?notrack=1 (?notrack=0 counts it again). Counts each page once per tab visit.
   - Also counts clicks on links marked data-track (assets/app.js marks them): Buy buttons
     (queens-court.buy.html), the Looking Glass demo download (looking-glass.demo-download.html), the
     affiliate Apply button (studio.affiliate-apply.html) and dev kit store buttons
     (dev-kits.admob-fab.html). */
(function () {
  var send = null;   // set below once the checks pass; used for page views and tracked clicks
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
    var site = (!folder || folder === REPO) ? "studio" : /^study-hall/.test(folder) ? "study-hall"   // never the private address
      : folder.replace(/[^a-z0-9_-]/g, "");
    var page = (site + "." + file).slice(-65);

    // The studio sites whose pages are counted (a page in any other folder isn't).
    var SITES = ["studio", "queens-court", "looking-glass", "revenue-simulator", "asset-logger", "dnd-combat-balancer",
      "dev-kits", "mimic-masters", "scorchlet", "hero-impervious", "we-built-this-city", "study-hall"];
    var src = (q.get("src") || q.get("utm_source") || "").toLowerCase();
    if (!src) {
      try {
        var h = new URL(document.referrer).hostname.replace(/^www\./, "");
        src = !h ? "direct" : h === L.hostname.replace(/^www\./, "") ? "site" : "from:" + h;
      } catch (e) { src = "direct"; }
    }
    src = src.replace(/[^a-z0-9:._-]/g, "").slice(0, 40) || "direct";

    send = function (pg, from) {
      var body = new URLSearchParams({ p: pg, s: from });
      if (navigator.sendBeacon && navigator.sendBeacon(U, body)) return;
      fetch(U, { method: "POST", body: body, mode: "no-cors", keepalive: true }).catch(function () {});
    };

    // Tracked clicks: any link with data-track="<site>.<name>" is counted as "<site>.<name>.html"
    // (e.g. looking-glass.demo-download.html). Every click counts; repeat clicks within 3 seconds don't.
    var lastClick = {};
    document.addEventListener("click", function (ev) {
      var a = ev.target && ev.target.closest && ev.target.closest("[data-track]");
      if (!a || a.getAttribute("aria-disabled") === "true") return;
      var key = String(a.getAttribute("data-track") || "").toLowerCase().replace(/[^a-z0-9._-]/g, "").slice(0, 55);
      if (!key) return;
      var now = Date.now();
      if (lastClick[key] && now - lastClick[key] < 3000) return;
      lastClick[key] = now;
      send(key + ".html", src);
    }, true);

    if (SITES.indexOf(site) < 0) return;
    try { var k = "mm_v_" + page; if (sessionStorage.getItem(k)) return; sessionStorage.setItem(k, "1"); } catch (e) {}
    send(page, src);
  } catch (e) {}
})();
