// Little bits of magic: mobile menu, footer year, fireflies,
// wobbly title letters and fade-in on scroll.
document.documentElement.classList.add("js");
const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// mobile menu
const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".nav-links");
if (menuBtn && links) {
  menuBtn.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
}

// footer year
document.querySelectorAll("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));

// fireflies
document.querySelectorAll(".fireflies").forEach(box => {
  const count = Number(box.dataset.count || 26);
  const r = (a, b) => Math.round(a + Math.random() * (b - a));
  for (let i = 0; i < count; i++) {
    const f = document.createElement("i");
    f.style.left = r(2, 98) + "%";
    f.style.top = r(10, 95) + "%";
    const s = Math.random() < 0.3 ? 3 : r(4, 6);
    f.style.width = f.style.height = s + "px";
    f.style.setProperty("--d", r(10, 22) + "s");
    f.style.setProperty("--b", r(2, 5) + "s");
    ["x1", "x2", "x3"].forEach(k => f.style.setProperty("--" + k, r(-70, 70) + "px"));
    ["y1", "y2", "y3"].forEach(k => f.style.setProperty("--" + k, r(-120, 20) + "px"));
    f.style.animationDelay = `-${r(0, 20)}s, -${r(0, 5)}s`;
    box.appendChild(f);
  }
});

// wobbly letters in the big title (hover a letter and it hops)
document.querySelectorAll("[data-wobble]").forEach(h => {
  const text = h.textContent;
  h.setAttribute("aria-label", text);
  h.innerHTML = [...text].map(ch => ch === " " ? " " : `<span class="wob" aria-hidden="true">${ch}</span>`).join("");
});

// reveal on scroll
const items = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !calm) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));
} else {
  items.forEach(el => el.classList.add("in"));
}

// Page-view counter (assets/traffic.js): loaded from here so every studio page counts.
(function () { try { var s = document.createElement("script"); s.src = "assets/traffic.js"; s.defer = true; document.head.appendChild(s); } catch (e) {} })();
