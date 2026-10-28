// App sites (Queens Court, Looking Glass): wires every Buy button to the Gumroad link in data/products.js.
(() => {
  const P = window.PRODUCTS || {};
  document.querySelectorAll("[data-buy]").forEach(btn => {
    const p = P[btn.dataset.buy]; if (!p) return;
    const label = btn.dataset.label || `Buy · ${p.price}`;
    if (p.buy) {
      btn.href = p.buy; btn.target = "_blank"; btn.rel = "noopener"; btn.textContent = label;
    } else {
      btn.removeAttribute("href"); btn.classList.add("soon"); btn.setAttribute("aria-disabled", "true");
      btn.textContent = `Coming soon · ${p.price}`;
    }
  });
  // Demo video: YouTube embed once an ID is set in data/products.js
  document.querySelectorAll("[data-demo]").forEach(box => {
    const p = P[box.dataset.demo]; const id = p && String(p.demo || "").replace(/[^\w-]/g, "");
    if (!id) return;
    const f = document.createElement("iframe");
    f.src = `https://www.youtube-nocookie.com/embed/${id}`; f.title = `${p.name} demo`; f.loading = "lazy";
    f.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture"; f.allowFullscreen = true;
    box.replaceChildren(f); box.classList.add("has-video");
  });
  // Screenshot slots: until the file exists, show what belongs there
  document.querySelectorAll(".shot img").forEach(img => {
    const miss = () => img.closest(".shot").classList.add("missing");
    if (img.complete && !img.naturalWidth) miss(); else img.addEventListener("error", miss);
  });
  document.querySelectorAll("video[data-optional]").forEach(v => {
    const gone = () => v.remove();
    v.addEventListener("error", gone, true); v.querySelectorAll("source").forEach(s => s.addEventListener("error", gone));
  });
  document.querySelectorAll("[data-support]").forEach(a => {
    if (P.supportEmail) { a.href = "mailto:" + P.supportEmail; if (!a.textContent.trim()) a.textContent = P.supportEmail; }
  });
})();
