/* Faqet që NUK kanë navbar/footer standard (auth/dashboard) */
const NO_FOOTER = ['login.html', 'register.html'];
const NO_NAVBAR_STANDARD = ['login.html', 'register.html',
  'dashboard.html', 'dashboard-candidate.html', 'dashboard-employer.html'];

/* ─── HELPER: merr emrin e faqes nga URL ─────────────────── */
function currentPage() {
  const path = window.location.pathname;
  const file = path.split('/').pop() || 'index.html';
  return file === '' ? 'index.html' : file;
}

/* ─── INJECT NAVBAR ──────────────────────────────────────── */
async function injectNavbar() {
  const page = currentPage();
  if (NO_NAVBAR_STANDARD.includes(page)) return;

  /* Nëse faqja ka tashmë navbar, mos injekto */
  if (document.querySelector('nav.navbar')) {
    setActiveLink();
    return;
  }

  try {
    const res  = await fetch('/components/navbar.html');
    const html = await res.text();

    const placeholder = document.getElementById('navbar-placeholder');
    if (placeholder) {
      placeholder.outerHTML = html;
    } else {
      document.body.insertAdjacentHTML('afterbegin', html);
    }
    setActiveLink();
  } catch (e) {
    console.warn('Navbar component nuk u ngarkua:', e);
  }
}

/* ─── INJECT FOOTER ──────────────────────────────────────── */
async function injectFooter() {
  const page = currentPage();
  if (NO_FOOTER.includes(page)) return;

  /* Nëse faqja ka tashmë footer, mos injekto */
  if (document.querySelector('footer')) return;

  try {
    const res  = await fetch('/components/footer.html');
    const html = await res.text();

    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
      placeholder.outerHTML = html;
    } else {
      document.body.insertAdjacentHTML('beforeend', html);
    }
  } catch (e) {
    console.warn('Footer component nuk u ngarkua:', e);
  }
}

/* ─── SHËNO LINKUN AKTIV ─────────────────────────────────── */
function setActiveLink() {
  const page = currentPage();

  /* Hiqe klasën active nga të gjitha linqet */
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  /* Shëno linkun që përputhet me faqen aktuale */
  const link = document.querySelector(`.nav-links a[href="${page}"]`) ||
               document.querySelector(`.nav-links a[data-page="${page.replace('.html','')}"]`);
  if (link) link.classList.add('active');
}

/* ─── INIT ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  injectNavbar();
  injectFooter();
});