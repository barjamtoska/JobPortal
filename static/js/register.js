/* ═══════════════════════════════════════════════════════
   REGISTER.JS  –  JobPortal  |  Faqja Regjistrim
   ═══════════════════════════════════════════════════════ */

let currentStep = 1;
let selectedType = 'candidate'; // 'candidate' | 'employer'

/* ─── STEP NAVIGATION ───────────────────────────────────── */
function goStep(n) {
  if (n > currentStep && !validateStep(currentStep)) return;

  // Hide current, show next
  document.getElementById('step' + currentStep).classList.add('hidden');
  document.getElementById('step' + n).classList.remove('hidden');
  currentStep = n;

  updateStepIndicator(n);

  // Scroll to top of form
  document.querySelector('.reg-form-wrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateStepIndicator(n) {
  for (let i = 1; i <= 3; i++) {
    const dot  = document.querySelector('#rs' + i + ' .rs-dot');
    if (i < n)  { dot.textContent = '✓'; dot.className = 'rs-dot done'; }
    else if (i === n) { dot.textContent = i; dot.className = 'rs-dot active'; }
    else        { dot.textContent = i; dot.className = 'rs-dot'; }
  }
  // Lines
  for (let i = 1; i <= 2; i++) {
    const line = document.getElementById('rl' + i);
    line.classList.toggle('done', i < n);
  }
}

/* ─── TYPE SELECTION (Step 1) ───────────────────────────── */
function selectType(type) {
  selectedType = type;

  // Update cards
  document.getElementById('tc-candidate').classList.toggle('active', type === 'candidate');
  document.getElementById('tc-employer').classList.toggle('active', type === 'employer');
  document.getElementById('tcc-candidate').classList.toggle('hidden', type !== 'candidate');
  document.getElementById('tcc-employer').classList.toggle('hidden', type !== 'employer');
}

/* ─── VALIDATION ────────────────────────────────────────── */
function validateStep(n) {
  if (n === 1) return true; // type always selected

  if (n === 2) {
    if (selectedType === 'candidate') {
      if (!val('rFirstName', 'Shkruaj emrin')) return false;
      if (!val('rLastName',  'Shkruaj mbiemrin')) return false;
      if (!valEmail('rEmail')) return false;
      if (!val('rTitle', 'Shkruaj titullin profesional')) return false;
    } else {
      if (!val('rCompany',   'Shkruaj emrin e kompanisë')) return false;
      if (!valEmail('rCorpEmail')) return false;
      if (!val('rCorpPhone', 'Shkruaj numrin e kontaktit')) return false;
    }
    return true;
  }

  if (n === 3) {
    const pw   = document.getElementById('rPw').value;
    const pw2  = document.getElementById('rPwConfirm').value;
    if (pw.length < 8) { shake('rPw'); hint('Fjalëkalimi duhet të ketë minimum 8 karaktere'); return false; }
    if (pw !== pw2)     { shake('rPwConfirm'); hint('Fjalëkalimet nuk përputhen'); return false; }
    if (!document.getElementById('rTerms').checked) {
      alert('Ju lutemi pranoni Kushtet e Shërbimit.'); return false;
    }
    return true;
  }
  return true;
}

function val(id, msg) {
  const el = document.getElementById(id);
  if (!el || !el.value.trim()) { shake(id); el && (el.placeholder = msg); return false; }
  return true;
}
function valEmail(id) {
  const el = document.getElementById(id);
  if (!el || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
    shake(id); el && (el.placeholder = 'Email i pavlefshëm'); return false;
  }
  return true;
}
function shake(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.borderColor = '#EF4444';
  el.style.animation = 'shake .3s ease';
  el.addEventListener('input', () => {
    el.style.borderColor = '';
    el.style.animation = '';
  }, { once: true });
}
function hint(msg) {
  const el = document.getElementById('pwHint');
  if (el) { el.textContent = msg; el.style.color = '#EF4444'; }
}

// Shake animation
const s = document.createElement('style');
s.textContent = '@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }';
document.head.appendChild(s);

/* ─── SHOW/HIDE FIELDS based on type ───────────────────── */
// Called in step 2 when type is already set from step 1
document.getElementById('step2') && (() => {
  const observer = new MutationObserver(() => {
    if (!document.getElementById('step2').classList.contains('hidden')) {
      document.getElementById('s2-candidate').classList.toggle('hidden', selectedType === 'employer');
      document.getElementById('s2-employer').classList.toggle('hidden', selectedType === 'candidate');
    }
  });
  observer.observe(document.getElementById('step2'), { attributes: true, attributeFilter: ['class'] });
})();

/* ─── PASSWORD STRENGTH ─────────────────────────────────── */
function checkStrength(val) {
  let score = 0;
  if (val.length >= 8)         score++;
  if (/[A-Z]/.test(val))       score++;
  if (/[0-9]/.test(val))       score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  const colors = ['', '#EF4444', '#F97316', '#EAB308', '#22A05A'];
  const labels = ['', 'Shumë i dobët', 'I dobët', 'Mesatar', 'I fortë ✓'];

  for (let i = 1; i <= 4; i++) {
    const seg = document.getElementById('seg' + i);
    seg.style.background = i <= score ? colors[score] : 'var(--border)';
  }
  const hint = document.getElementById('pwHint');
  hint.textContent = val.length > 0 ? labels[score] : 'Minimum 8 karaktere, 1 numër dhe 1 shkronjë kapitale';
  hint.style.color = score >= 3 ? 'var(--green)' : score > 0 ? '#F97316' : 'var(--muted)';
}

/* ─── PASSWORD TOGGLE ───────────────────────────────────── */
function togglePwReg(inputId, btn) {
  const input = document.getElementById(inputId);
  const show  = input.type === 'password';
  input.type  = show ? 'text' : 'password';
  btn.style.color = show ? 'var(--green2)' : '';
}

/* ─── SUBMIT ────────────────────────────────────────────── */
function submitRegister() {
  if (!validateStep(3)) return;

  // Simulate API call
  const submitBtn = document.querySelector('#step3 .btn-submit');
  submitBtn.innerHTML = '<span style="display:inline-block;animation:spin .7s linear infinite">⏳</span> Duke krijuar…';
  submitBtn.disabled = true;

  setTimeout(() => {
    document.getElementById('step3').classList.add('hidden');
    document.getElementById('stepSuccess').classList.remove('hidden');
    document.getElementById('regSteps').style.display = 'none';

    // Redirect after animation
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 2400);
  }, 1400);
}

const s2 = document.createElement('style');
s2.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
document.head.appendChild(s2);
