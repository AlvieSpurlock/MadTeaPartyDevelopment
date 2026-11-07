/* Affiliate top 10, read live from the "Leaderboard" tab of the Google Sheet in data/products.js
   (leaderboardSheet, else tutorialsSheet). Columns: Name | Link (optional) | Sales (optional).
   Ranked by Sales when filled in, otherwise by row order. Only add people who said yes to being named.
   Put <div data-leaderboard></div> where the board goes. */
(function () {
  var boxes = document.querySelectorAll("[data-leaderboard]");
  if (!boxes.length) return;
  var P = window.PRODUCTS || {};
  var SHEET = P.leaderboardSheet || P.tutorialsSheet || "";
  var TAB = P.leaderboardTab || "Leaderboard";
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function paint(html) { boxes.forEach(function (b) { b.innerHTML = html; }); }
  var EMPTY = '<p class="lb-empty">The board is wide open. Your name could be the first one on it.</p>';
  paint('<p class="lb-empty">Fetching the leaderboard&hellip;</p>');
  if (!/^[\w-]{20,}$/.test(SHEET)) { paint(EMPTY); return; }
  var done = false;
  window.__lbSheet = function (res) {
    done = true;
    try {
      var t = res.table, cols = t.cols.map(function (c) { return String(c.label || "").trim().toLowerCase(); });
      var rows = t.rows.slice();
      if (cols.indexOf("name") < 0 && rows.length) { cols = rows.shift().c.map(function (c) { return String(c && c.v || "").trim().toLowerCase(); }); }
      var iN = cols.indexOf("name"), iL = cols.indexOf("link"), iS = cols.indexOf("sales");
      if (iN < 0) { paint(EMPTY); return; }   // no Leaderboard tab yet (Google may hand back another tab)
      var cell = function (r, i) { var c = i > -1 && r.c && r.c[i]; return c && c.v != null ? c.v : ""; };
      var list = rows.map(function (r, n) {
        var s = Number(cell(r, iS)), link = String(cell(r, iL)).trim();
        return { name: String(cell(r, iN)).trim().slice(0, 60), link: /^https:\/\//.test(link) ? link : "", sales: isFinite(s) && cell(r, iS) !== "" ? s : null, n: n };
      }).filter(function (x) { return x.name; });
      if (list.some(function (x) { return x.sales !== null; })) list.sort(function (a, b) { return (b.sales || 0) - (a.sales || 0) || a.n - b.n; });
      list = list.slice(0, 10);
      if (!list.length) { paint(EMPTY); return; }
      paint('<ol class="lb">' + list.map(function (x, i) {
        var nm = x.link ? '<a href="' + esc(x.link) + '" target="_blank" rel="noopener nofollow">' + esc(x.name) + "</a>" : esc(x.name);
        var medal = ["🥇", "🥈", "🥉"][i] || (i + 1);
        return '<li' + (i < 3 ? ' class="top"' : "") + '><span class="lb-rank">' + medal + '</span><span class="lb-name">' + nm + "</span>" +
          (x.sales !== null ? '<span class="lb-sales">' + x.sales + (x.sales === 1 ? " sale" : " sales") + "</span>" : "") + "</li>";
      }).join("") + "</ol>");
    } catch (e) { paint(EMPTY); }
  };
  var s = document.createElement("script");
  s.src = "https://docs.google.com/spreadsheets/d/" + SHEET + "/gviz/tq?headers=1&sheet=" + encodeURIComponent(TAB) + "&tqx=responseHandler:__lbSheet&_=" + Math.floor(Date.now() / 60000);
  s.onerror = function () { paint(EMPTY); };
  document.head.appendChild(s);
  setTimeout(function () { if (!done) paint(EMPTY); }, 12000);
})();
