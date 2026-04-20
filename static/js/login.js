/* ═══════════════════════════════════════════════════════
   LOGIN.JS  –  JobPortal  |  Hyrje & Regjistrim
   ═══════════════════════════════════════════════════════ */

/* ─── HAPI URL: ?tab=register e hap direkt regjistrim ── */
const params = new URLSearchParams(window.location.search);
if (params.get('tab') === 'register') switchTab('register');

/* ─── TAB SWITCHER ──────────────────────────────────────── */
function switchTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('formLogin').classList.toggle('hidden', !isLogin);
  document.getElementById('formRegister').classList.toggle('hidden', isLogin);
  document.getElementById('tabLogin').classList.toggle('active', isLogin);
  document.getElementById('tabRegister').classList.toggle('active', !isLogin);
  clearAllErrors();
}

/* ─── USER TYPE: Hyrje ──────────────────────────────────── */
function setLoginType(type, btn) {
  document.querySelectorAll('#formLogin .utype-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* ─── USER TYPE: Regjistrim ─────────────────────────────── */
function setRegType(type, btn) {
  document.querySelectorAll('#formRegister .utype-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const isEmployer = type === 'employer';
  // Kandidati: emër/mbiemër/email/titull  |  Punëdhënësi: kompani/email/industri/madhësi
  document.getElementById('reg-candidate-fields').classList.toggle('hidden', isEmployer);
  document.getElementById('reg-employer-fields').classList.toggle('hidden', !isEmployer);
  clearAllErrors();
}

/* ─── SHFAQJA E FJALËKALIMIT ────────────────────────────── */
function togglePw(inputId, btn) {
  const input = document.getElementById(inputId);
  const show  = input.type === 'password';
  input.type  = show ? 'text' : 'password';
  btn.style.color = show ? 'var(--green2)' : '';
}

/* ─── FORCA E FJALËKALIMIT ──────────────────────────────── */
document.getElementById('regPw')?.addEventListener('input', function () {
  const val = this.value;
  const bar = document.getElementById('pwBar');
  const lbl = document.getElementById('pwStrengthLabel');
  if (!bar || !lbl) return;

  let score = 0;
  if (val.length >= 8)            score++;
  if (/[A-Z]/.test(val))          score++;
  if (/[0-9]/.test(val))          score++;
  if (/[^A-Za-z0-9]/.test(val))   score++;

  const levels = [
    { w: '0%',   color: '',         text: '' },
    { w: '25%',  color: '#EF4444',  text: 'Shumë i dobët' },
    { w: '50%',  color: '#F97316',  text: 'I dobët' },
    { w: '75%',  color: '#EAB308',  text: 'Mesatar' },
    { w: '100%', color: '#22A05A',  text: 'I fortë ✓' },
  ];
  const lvl        = levels[score] || levels[0];
  bar.style.width      = lvl.w;
  bar.style.background = lvl.color;
  lbl.textContent      = lvl.text;
  lbl.style.color      = lvl.color;

  if (score >= 2) clearError('regPw');
});

/* ─── VALIDIM HELPERS ───────────────────────────────────── */
function setError(inputId, msg) {
  const el = document.getElementById(inputId);
  if (!el) return;
  el.style.borderColor = '#EF4444';
  el.style.boxShadow   = '0 0 0 3px rgba(239,68,68,0.1)';
  let errEl = el.closest('.form-group')?.querySelector('.field-error');
  if (!errEl) {
    errEl = document.createElement('span');
    errEl.className   = 'field-error';
    errEl.style.cssText = 'font-size:.72rem;color:#EF4444;font-weight:600;margin-top:3px;display:block;';
    el.closest('.form-group')?.appendChild(errEl);
  }
  errEl.textContent = msg;
  el.focus();
}

function clearError(inputId) {
  const el = document.getElementById(inputId);
  if (!el) return;
  el.style.borderColor = '';
  el.style.boxShadow   = '';
  el.closest('.form-group')?.querySelector('.field-error')?.remove();
}

function clearAllErrors() {
  document.querySelectorAll('.field-error').forEach(e => e.remove());
  document.querySelectorAll('.form-input').forEach(el => {
    el.style.borderColor = '';
    el.style.boxShadow   = '';
  });
}

function isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

/* ─── HYRJE ─────────────────────────────────────────────── */
function handleLogin() {
  clearAllErrors();
  const email = document.getElementById('loginEmail').value.trim();
  const pw    = document.getElementById('loginPw').value;
  let ok = true;

  if (!email)                  { setError('loginEmail', 'Shkruaj emailin tënd'); ok = false; }
  else if (!isValidEmail(email)) { setError('loginEmail', 'Email i pavlefshëm');   ok = false; }

  if (!pw)          { setError('loginPw', 'Shkruaj fjalëkalimin'); ok = false; }
  else if (pw.length < 6) { setError('loginPw', 'Minimum 6 karaktere');       ok = false; }

  if (!ok) return;

  setLoading('loginBtn', 'Duke u identifikuar…');
  setTimeout(() => showSuccess('Hyrja u krye me sukses. Po të ridrejtojmë…', 'dashboard.html'), 1200);
}

/* ─── REGJISTRIM ────────────────────────────────────────── */
function handleRegister() {
  clearAllErrors();
  const isEmployer = document.getElementById('reg-type-employer')?.classList.contains('active');
  let ok = true;

  if (!isEmployer) {
    /* ── Kandidat ── */
    const fn    = document.getElementById('regFirstName').value.trim();
    const ln    = document.getElementById('regLastName').value.trim();
    const email = document.getElementById('regEmailCandidate').value.trim();
    const title = document.getElementById('regTitle').value.trim();

    if (!fn)                   { setError('regFirstName',       'Shkruaj emrin');          ok = false; }
    if (!ln)                   { setError('regLastName',        'Shkruaj mbiemrin');        ok = false; }
    if (!email)                { setError('regEmailCandidate',  'Shkruaj emailin');         ok = false; }
    else if (!isValidEmail(email)) { setError('regEmailCandidate', 'Email i pavlefshëm');   ok = false; }
    if (!title)                { setError('regTitle',           'Shkruaj titullin');        ok = false; }

  } else {
    /* ── Punëdhënës ── */
    const company = document.getElementById('regCompany').value.trim();
    const email   = document.getElementById('regEmailEmployer').value.trim();
    const industry= document.getElementById('regIndustry').value;
    const size    = document.getElementById('regSize').value;

    if (!company)              { setError('regCompany',       'Shkruaj emrin e kompanisë'); ok = false; }
    if (!email)                { setError('regEmailEmployer', 'Shkruaj emailin korporativ'); ok = false; }
    else if (!isValidEmail(email)) { setError('regEmailEmployer', 'Email i pavlefshëm');    ok = false; }
    if (!industry)             { setError('regIndustry',      'Zgjidh industrinë');         ok = false; }
    if (!size)                 { setError('regSize',          'Zgjidh madhësinë');          ok = false; }
  }

  /* ── Fjalëkalimi (i përbashkët) ── */
  const pw = document.getElementById('regPw').value;
  if (!pw || pw.length < 8)  { setError('regPw', 'Minimum 8 karaktere'); ok = false; }

  /* ── Kushtet ── */
  if (!document.getElementById('termsCheck').checked) {
    showToast('Pranoni Kushtet e Shërbimit për të vazhduar');
    ok = false;
  }

  if (!ok) return;

  setLoading('registerBtn', 'Duke krijuar llogarinë…');
  setTimeout(() => showSuccess('Llogaria u krijua! Po të ridrejtojmë…', 'dashboard.html'), 1400);
}

/* ─── LOADING STATE ─────────────────────────────────────── */
function setLoading(btnId, msg) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.innerHTML = `<span style="display:inline-block;animation:spin .7s linear infinite">⏳</span> ${msg}`;
  btn.disabled  = true;
}

/* ─── EKRAN SUKSESI ─────────────────────────────────────── */
function showSuccess(msg, redirect) {
  document.getElementById('formLogin')?.classList.add('hidden');
  document.getElementById('formRegister')?.classList.add('hidden');
  document.querySelector('.auth-tabs').style.display = 'none';

  const s = document.getElementById('authSuccess');
  s.classList.remove('hidden');
  document.getElementById('successMsg').textContent = msg;

  const bar = document.getElementById('loaderBar');
  if (bar) {
    bar.style.transition = 'width 2s linear';
    requestAnimationFrame(() => bar.style.width = '100%');
  }
  setTimeout(() => window.location.href = redirect, 2200);
}

/* ─── TOAST ─────────────────────────────────────────────── */
function showToast(msg) {
  let t = document.getElementById('authToast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'authToast';
    t.style.cssText = `position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
      background:var(--navy);color:#fff;padding:11px 22px;border-radius:10px;
      font-size:.85rem;font-weight:500;box-shadow:0 8px 28px rgba(13,27,42,.2);
      z-index:9999;animation:toastIn .25s ease;white-space:nowrap;`;
    document.body.appendChild(t);
  }
  t.textContent = msg;
  clearTimeout(t._t);
  t._t = setTimeout(() => t.remove(), 3000);
}

/* ─── PASTRIM ERROR NË INPUT ────────────────────────────── */
['loginEmail','loginPw','regFirstName','regLastName','regEmailCandidate',
 'regTitle','regCompany','regEmailEmployer','regPw'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', () => clearError(id));
});

/* ─── ENTER KEY ─────────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  if (!document.getElementById('formLogin').classList.contains('hidden')) handleLogin();
  else if (!document.getElementById('formRegister').classList.contains('hidden')) handleRegister();
});

/* ─── ANIMATIONS ────────────────────────────────────────── */
const _s = document.createElement('style');
_s.textContent = `
  @keyframes spin    { to { transform: rotate(360deg); } }
  @keyframes toastIn { from { opacity:0; transform:translateX(-50%) translateY(6px); }
                       to   { opacity:1; transform:translateX(-50%) translateY(0); } }
`;
document.head.appendChild(_s);