// ─── SIMILAR JOBS ────────────────────────────────────────
const similar = [
  { id:8,  title:'DevOps Engineer',              company:'One Telecommunications', logo:'📡', location:'Tiranë·Remote', contract:'Full-time', salary:'160K–220K', daysAgo:2 },
  { id:24, title:'Python Developer (ML/AI)',     company:'AKSHI',                  logo:'🤖', location:'Tiranë·Remote', contract:'Full-time', salary:'145K–195K', daysAgo:1 },
  { id:11, title:'React Native Developer',       company:'Softup Technologies',    logo:'💻', location:'Remote',        contract:'Full-time', salary:'130K–180K', daysAgo:1 },
];
document.getElementById('similarGrid').innerHTML = similar.map(j => `
  <div class="sim-card" onclick="window.location='jobs.html${j.id}/'">
    <div class="sim-top">
      <div class="sim-logo">${j.logo}</div>
      <div>
        <div class="sim-title">${j.title}</div>
        <div class="sim-company">${j.company}</div>
      </div>
    </div>
    <div class="sim-meta">
      <span class="sim-tag">📍 ${j.location}</span>
      <span class="sim-tag">⏱ ${j.contract}</span>
      <span class="sim-tag">${j.daysAgo === 0 ? 'Sot' : j.daysAgo === 1 ? 'Dje' : j.daysAgo+' ditë'}</span>
    </div>
    <div class="sim-footer">
      <div class="sim-salary">${j.salary} <small style="font-size:0.68rem;color:var(--muted);font-weight:400">ALL/muaj</small></div>
      <button class="sim-apply" onclick="event.stopPropagation(); window.location='jobs.html${j.id}/'">Apliko →</button>
    </div>
  </div>`).join('');

// ─── SAVE TOGGLE ────────────────────────────────────────
let saved = false;
function toggleSave() {
  saved = !saved;
  const btn = document.getElementById('saveBtn');
  const txt = document.getElementById('saveText');
  btn.classList.toggle('saved', saved);
  txt.textContent = saved ? 'E Ruajtur ✓' : 'Ruaj Punën';
}

// ─── COPY LINK ───────────────────────────────────────────
function copyLink() {
  navigator.clipboard?.writeText(window.location.href).catch(()=>{});
  const btn = event.target.closest('button');
  const orig = btn.innerHTML;
  btn.innerHTML = '✓ U kopjua!';
  btn.style.color = 'var(--green)';
  setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
}

// ─── MODAL ──────────────────────────────────────────────
let currentStep = 1;
function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  currentStep = 1; renderStep();
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('successScreen').classList.remove('visible');
  document.getElementById('formWrap').style.display = '';
  currentStep = 1; renderStep();
}
function handleOverlayClick(e) { if (e.target === document.getElementById('modalOverlay')) closeModal(); }

function renderStep() {
  [1,2,3].forEach(i => {
    document.getElementById('stepContent'+i).style.display = i === currentStep ? '' : 'none';
  });
  // Indicators
  [1,2,3].forEach(i => {
    const ind = document.getElementById('step'+i+'Indicator');
    const num = document.getElementById('step'+i+'Num');
    ind.className = 'step' + (i === currentStep ? ' active' : i < currentStep ? ' done' : '');
    num.textContent = i < currentStep ? '✓' : i;
  });
  document.getElementById('line1').className = 'step-line' + (currentStep > 1 ? ' done' : '');
  document.getElementById('line2').className = 'step-line' + (currentStep > 2 ? ' done' : '');
  document.getElementById('backBtn').style.display = currentStep > 1 ? '' : 'none';
  const nxt = document.getElementById('nextBtn');
  if (currentStep === 3) {
    nxt.innerHTML = 'Dërgo Aplikimin <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
  } else {
    nxt.innerHTML = 'Vazhdo <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
  }
}

function nextStep() {
  if (currentStep < 3) {
    if (currentStep === 3) { submitApp(); return; }
    if (currentStep === 2) { buildConfirm(); }
    currentStep++; renderStep();
  } else {
    submitApp();
  }
}
function prevStep() { if (currentStep > 1) { currentStep--; renderStep(); } }

function buildConfirm() {
  const name = (document.getElementById('fName').value || '—') + ' ' + (document.getElementById('fLastName').value || '');
  const email = document.getElementById('fEmail').value || '—';
  const phone = document.getElementById('fPhone').value || '—';
  const exp   = document.getElementById('fExp').value || '—';
  const cv    = document.getElementById('cvFileName').textContent || 'Nuk u ngarkua';
  document.getElementById('confirmSummary').innerHTML = `
    <div style="display:flex; flex-direction:column; gap:8px; font-size:0.83rem;">
      <div style="display:flex; justify-content:space-between;"><span style="color:var(--muted);">Emri e Mbiemri</span><strong>${name}</strong></div>
      <div style="display:flex; justify-content:space-between;"><span style="color:var(--muted);">Email</span><strong>${email}</strong></div>
      <div style="display:flex; justify-content:space-between;"><span style="color:var(--muted);">Telefon</span><strong>${phone}</strong></div>
      <div style="display:flex; justify-content:space-between;"><span style="color:var(--muted);">Eksperienca</span><strong>${exp}</strong></div>
      <div style="display:flex; justify-content:space-between;"><span style="color:var(--muted);">CV</span><strong style="color:var(--green)">${cv}</strong></div>
    </div>`;
}

function submitApp() {
  document.getElementById('formWrap').style.display = 'none';
  const s = document.getElementById('successScreen');
  s.classList.add('visible');
  const now = new Date();
  document.getElementById('appDate').textContent = now.toLocaleDateString('sq-AL', { day:'2-digit', month:'long', year:'numeric' });
}

// ─── FILE UPLOAD ─────────────────────────────────────────
function handleFile(input, zoneId, nameId) {
  const file = input.files[0];
  if (!file) return;
  const zone = document.getElementById(zoneId);
  const nameEl = document.getElementById(nameId);
  zone.classList.add('has-file');
  nameEl.style.display = 'block';
  nameEl.textContent = '✓ ' + file.name;
}

// Date
document.getElementById('appDate') && (document.getElementById('appDate').textContent =
  new Date().toLocaleDateString('sq-AL', { day:'2-digit', month:'long', year:'numeric' }));