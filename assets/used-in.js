/* Renders "Used In" cards from data/used-in.js.
   Mount:  <div data-used-in="queens-court" data-root="../" data-limit="3" data-more="used-in.html" data-product="Queens Court"></div>
     data-root     prefix for local logos (assets/...)
     data-limit    how many cards to show (leave off to show all)
     data-more     link to the full "Used In" page (shown when there are more than the limit)
     data-product  product name, used in the "be the first" note
   Text is always inserted as text, never as HTML. */
(function () {
  var DATA = window.USED_IN || {};
  var P = window.PRODUCTS || {};
  var email = P.supportEmail || "madteapartydevelopment@outlook.com";
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  document.querySelectorAll("[data-used-in]").forEach(function (mount) {
    var slug = mount.getAttribute("data-used-in");
    var root = mount.getAttribute("data-root") || "";
    var limit = parseInt(mount.getAttribute("data-limit") || "0", 10);
    var more = mount.getAttribute("data-more");
    var product = mount.getAttribute("data-product") || "it";
    // Several slugs ("appodeal,levelplay") merge into one list; data-labels names each one ("Appodeal|LevelPlay").
    var slugs = slug.split(",").map(function (x) { return x.trim(); });
    var labels = (mount.getAttribute("data-labels") || "").split("|");
    var list = [];
    slugs.forEach(function (sl, i) { (DATA[sl] || []).forEach(function (it) { list.push(slugs.length > 1 && labels[i] ? Object.assign({ tool: labels[i] }, it) : it); }); });
    mount.classList.add("ui-mount");

    if (!list.length) {
      var empty = el("div", "ui-empty");
      empty.appendChild(el("b", null, "Your project could be first."));
      empty.appendChild(el("p", null, "Built something with " + product + "? Tell me about it and I'll add it here, with a link back to your game."));
      var a = el("a", "btn b2 small", "Tell me about your project");
      a.href = "mailto:" + email + "?subject=" + encodeURIComponent("Used In listing: " + product);
      empty.appendChild(a);
      mount.appendChild(empty);
      return;
    }

    var grid = el("div", "ui-grid");
    list.slice(0, limit || list.length).forEach(function (item) {
      var card = el(item.url ? "a" : "div", "ui-card");
      if (item.url) { card.href = item.url; if (/^https?:/i.test(item.url)) { card.target = "_blank"; card.rel = "noopener"; } }
      if (item.logo) { var img = el("img"); img.src = /^https?:/i.test(item.logo) ? item.logo : root + item.logo; img.alt = ""; img.loading = "lazy"; card.appendChild(img); }
      var body = el("div", "ui-body");
      body.appendChild(el("b", null, item.name));
      if (item.by || item.tool) body.appendChild(el("span", "ui-by", [item.by, item.tool ? "uses " + item.tool : ""].filter(Boolean).join(" · ")));
      if (item.how) body.appendChild(el("p", null, item.how));
      card.appendChild(body);
      grid.appendChild(card);
    });
    mount.appendChild(grid);

    var foot = el("div", "ui-foot");
    if (more && limit && list.length > limit) { var m = el("a", "btn b2 small", "See all " + list.length + " →"); m.href = more; foot.appendChild(m); }
    else if (more) { var m2 = el("a", "ui-link", "See the full list →"); m2.href = more; foot.appendChild(m2); }
    if (foot.childNodes.length) mount.appendChild(foot);
  });
})();
