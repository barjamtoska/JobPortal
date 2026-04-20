/* ═══════════════════════════════════════════════════════
   CONTACT.JS  –  JobPortal  |  Faqja Kontakt
   ═══════════════════════════════════════════════════════ */

/* ─── TOPIC BUTTONS ─────────────────────────────────────── */
document.querySelectorAll('.topic-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* ─── FORM SUBMIT ───────────────────────────────────────── */
function submitContact() {
  const name    = document.getElementById('cName').value.trim();
  const email   = document.getElementById('cEmail').value.trim();
  const subject = document.getElementById('cSubject').value.trim();
  const message = document.getElementById('cMessage').value.trim();

  if (!name)    { showError('cName',    'Shkruaj emrin tënd'); return; }
  if (!email)   { showError('cEmail',   'Shkruaj emailin tënd'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('cEmail', 'Email i pavlefshëm'); return; }
  if (!subject) { showError('cSubject', 'Shkruaj subjektin'); return; }
  if (!message) { showError('cMessage', 'Shkruaj mesazhin'); return; }

  /* Simulate send */
  const btn = document.getElementById('sendBtn');
  btn.innerHTML = '<span style="display:inline-block;animation:spin 0.7s linear infinite">⏳</span> Duke dërguar...';
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById('formCard').style.display    = 'none';
    document.getElementById('formSuccess').classList.add('visible');
  }, 1200);
}

function resetContact() {
  document.getElementById('formCard').style.display = '';
  document.getElementById('formSuccess').classList.remove('visible');
  document.getElementById('cName').value    = '';
  document.getElementById('cLastName').value = '';
  document.getElementById('cEmail').value   = '';
  document.getElementById('cPhone').value   = '';
  document.getElementById('cSubject').value = '';
  document.getElementById('cMessage').value = '';
  const btn = document.getElementById('sendBtn');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg> Dërgo Mesazhin';
  btn.disabled = false;
}

function showError(id, msg) {
  const el = document.getElementById(id);
  el.style.borderColor = '#EF4444';
  el.focus();
  el.placeholder = msg;
  el.addEventListener('input', () => {
    el.style.borderColor = '';
  }, { once: true });
}

/* ─── FAQ ACCORDION ─────────────────────────────────────── */
function toggleFaq(btn) {
  const answer  = btn.nextElementSibling;
  const isOpen  = btn.classList.contains('open');

  /* Close all */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.classList.remove('open');
    q.nextElementSibling.classList.remove('open');
  });

  /* Open clicked if it was closed */
  if (!isOpen) {
    btn.classList.add('open');
    answer.classList.add('open');
  }
}

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

/* ─── SPIN ANIMATION ────────────────────────────────────── */
const style = document.createElement('style');
style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
document.head.appendChild(style);
