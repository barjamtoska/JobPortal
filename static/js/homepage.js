/* ═══════════════════════════════════════════════════════
   INDEX.JS  –  JobPortal  |  Homepage
   ═══════════════════════════════════════════════════════ */

/* ─── NAVBAR: transparent → white on scroll ─────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ─── ADVANCED SEARCH: pill toggle ──────────────────── */
function togglePill(checkbox) {
  const pill = checkbox.closest('.check-pill');
  pill.classList.toggle('checked', checkbox.checked);
  updateActiveCount();
}

/* ─── ADVANCED SEARCH: count active filters ─────────── */
function updateActiveCount() {
  const form    = document.getElementById('advForm');
  const selects = form.querySelectorAll('select');
  const inputs  = form.querySelectorAll('input[type="text"], input[type="number"]');
  const checks  = form.querySelectorAll('input[type="checkbox"]:checked');

  let count = checks.length;
  selects.forEach(s => { if (s.value) count++; });
  inputs.forEach(i  => { if (i.value.trim()) count++; });

  const badge   = document.getElementById('activeFilters');
  const countEl = document.getElementById('filterCount');

  if (count > 0) {
    badge.style.display = 'flex';
    countEl.textContent = count;
  } else {
    badge.style.display = 'none';
  }
}

/* ─── ADVANCED SEARCH: reset all ────────────────────── */
function resetForm() {
  document.querySelectorAll('.check-pill').forEach(p => p.classList.remove('checked'));
  document.getElementById('activeFilters').style.display = 'none';
}

/* ─── ADVANCED SEARCH: live counter on change ───────── */
const advForm = document.getElementById('advForm');
if (advForm) {
  advForm.addEventListener('change', updateActiveCount);
  advForm.addEventListener('input',  updateActiveCount);
}

/* ─── SCROLL FADE-IN (IntersectionObserver) ─────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      observer.unobserve(el.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));