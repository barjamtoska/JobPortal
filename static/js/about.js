/* ═══════════════════════════════════════════════════════
   ABOUT.JS  –  JobPortal  |  Faqja Rreth Nesh
   ═══════════════════════════════════════════════════════ */

/* ─── SCROLL FADE-IN ────────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      observer.unobserve(el.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
