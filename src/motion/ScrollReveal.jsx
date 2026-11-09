import { useEffect } from "react";

// Quiet motion for the whole site, applied automatically inside <main>:
//  - headings, grid cards and figures fade up gently the first time they scroll into view
//  - photos fade in once loaded instead of popping in
// Nothing is hidden for visitors who prefer reduced motion.
const TARGETS = "h1, h2, figure, .MuiGrid-container > .MuiGrid-root";

export default function ScrollReveal() {
  useEffect(() => {
    const root = document.getElementById("main");
    if (!root || !("IntersectionObserver" in window)) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("rv-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    const fadeImage = (img) => {
      img.dataset.fade = "1";
      if (img.complete && img.naturalWidth) return; // already there: no flicker
      img.classList.add("img-fade");
      const done = () => img.classList.add("img-in");
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true });
    };

    const scan = () => {
      root.querySelectorAll("img:not([data-fade])").forEach(fadeImage);
      if (reduce) return;
      root.querySelectorAll(TARGETS).forEach((el) => {
        if (el.hasAttribute("data-reveal")) return;
        // Layout columns that hold their own grid: let the inner cards animate instead.
        if (el.classList.contains("MuiGrid-root") && el.querySelector(".MuiGrid-container")) {
          el.setAttribute("data-reveal", "skip");
          return;
        }
        if (el.parentElement?.closest("[data-reveal]:not([data-reveal='skip'])")) {
          el.setAttribute("data-reveal", "skip");
          return;
        }
        // Small stagger across a row of cards.
        const sibs = el.parentElement ? [...el.parentElement.children] : [];
        el.style.setProperty("--rv-i", String(Math.max(0, sibs.indexOf(el)) % 4));
        el.setAttribute("data-reveal", "");
        io.observe(el);
      });
    };

    let raf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    });
    scan();
    mo.observe(root, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
