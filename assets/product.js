// Shared behaviour for product sites: menu, footer year, reveal, gallery lightbox.
document.documentElement.classList.add("js");

const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".p-links");
if (menuBtn && links) menuBtn.addEventListener("click", () => menuBtn.setAttribute("aria-expanded", links.classList.toggle("open")));

document.querySelectorAll("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));

const items = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.1 });
  items.forEach(el => io.observe(el));
} else items.forEach(el => el.classList.add("in"));

// lightbox for gallery + deep-dive images
const box = document.createElement("div");
box.className = "lightbox"; box.setAttribute("role", "dialog"); box.setAttribute("aria-label", "Screenshot");
box.innerHTML = '<img alt="">';
document.body.appendChild(box);
const open = src => { box.firstChild.src = src; box.classList.add("open"); };
box.addEventListener("click", () => box.classList.remove("open"));
document.addEventListener("keydown", e => { if (e.key === "Escape") box.classList.remove("open"); });
document.querySelectorAll(".gallery button, .row-media img").forEach(el =>
  el.addEventListener("click", () => open((el.querySelector("img") || el).src)));
