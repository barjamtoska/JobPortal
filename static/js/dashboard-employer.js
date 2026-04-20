/* ═══════════════════════════════════════════════════════
   DASHBOARD-EMPLOYER.JS  –  JobPortal
   ═══════════════════════════════════════════════════════ */

/* ─── TAB NAVIGATION ────────────────────────────────────── */
function switchTab(tabId, clickedEl) {
  document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.snav-item').forEach(i => i.classList.remove('active'));
  document.getElementById('tab-' + tabId)?.classList.add('active');
  if (clickedEl) clickedEl.classList.add('active');
  event?.preventDefault();
}

/* ─── NOTIFICATIONS ─────────────────────────────────────── */
function toggleNotif() {
  document.getElementById('notifPanel').classList.toggle('open');
  document.getElementById('notifOverlay').classList.toggle('open');
  document.getElementById('userMenu').classList.remove('open');
}

function toggleUserMenu() {
  document.getElementById('userMenu').classList.toggle('open');
  document.getElementById('notifPanel').classList.remove('open');
  document.getElementById('notifOverlay').classList.remove('open');
}

document.addEventListener('click', e => {
  if (!e.target.closest('.nav-avatar')) {
    document.getElementById('userMenu').classList.remove('open');
  }
});

/* ─── MOCK DATA ─────────────────────────────────────────── */
const JOBS = [
  { id:1, title:'Senior Backend Developer', category:'IT', location:'Tiranë', contract:'Full-time', level:'Senior', views:284, apps:34, days:3, expires:'27 Mars', status:'active' },
  { id:2, title:'UX Designer',              category:'Design', location:'Remote',  contract:'Full-time', level:'Mid', views:198, apps:21, days:5, expires:'22 Mars', status:'active' },
  { id:3, title:'Data Analyst',             category:'IT',   location:'Tiranë', contract:'Full-time', level:'Mid', views:145, apps:18, days:7, expires:'20 Mars', status:'expiring' },
  { id:4, title:'HR Manager',               category:'Admin', location:'Tiranë', contract:'Full-time', level:'Senior', views:89, apps:9, days:10, expires:'18 Mars', status:'expiring' },
  { id:5, title:'DevOps Engineer',          category:'IT',   location:'Remote',  contract:'Full-time', level:'Senior', views:210, apps:27, days:1, expires:'30 Mars', status:'active' },
  { id:6, title:'Marketing Specialist',     category:'Marketing', location:'Tiranë', contract:'Part-time', level:'Junior', views:67, apps:12, days:14, expires:'15 Mars', status:'expiring' },
  { id:7, title:'Kontabilist',              category:'Finance', location:'Tiranë', contract:'Full-time', level:'Mid', views:54, apps:6, days:30, expires:'1 Mars',  status:'closed' },
];

const APPLICANTS = [
  { name:'Artan Hoxha',   initials:'AH', role:'Senior Developer', job:'Senior Backend Developer', date:'5 min', status:'new',       color:'linear-gradient(135deg,#22A05A,#5EDA9E)' },
  { name:'Diana Morina',  initials:'DM', role:'UX Designer',       job:'UX Designer',              date:'2 orë',  status:'review',    color:'linear-gradient(135deg,#7C3AED,#A78BFA)' },
  { name:'Blerim Suli',   initials:'BS', role:'Data Analyst',       job:'Data Analyst',             date:'4 orë',  status:'interview', color:'linear-gradient(135deg,#D97706,#FCD34D)' },
  { name:'Elona Kelmendi',initials:'EK', role:'HR Manager',         job:'HR Manager',               date:'Dje',    status:'accepted',  color:'linear-gradient(135deg,#0D1B2A,#2d4a6e)' },
  { name:'Gentian Bala',  initials:'GB', role:'DevOps Engineer',    job:'DevOps Engineer',          date:'2 ditë', status:'review',    color:'linear-gradient(135deg,#3182CE,#63B3ED)' },
  { name:'Mirela Coku',   initials:'MC', role:'Marketing Manager',  job:'Marketing Specialist',     date:'3 ditë', status:'new',       color:'linear-gradient(135deg,#E53E3E,#FC8181)' },
  { name:'Joni Shehu',    initials:'JS', role:'Backend Developer',   job:'Senior Backend Developer', date:'3 ditë', status:'interview', color:'linear-gradient(135deg,#D69E2E,#F6E05E)' },
];

const CANDIDATES = [
  { initials:'SK', name:'Sara Krasniqi',   title:'UX Designer · 4 vjet',   tags:['Figma','Adobe XD','Prototyping'],    color:'linear-gradient(135deg,#22A05A,#5EDA9E)' },
  { initials:'AH', name:'Artan Hoxha',     title:'Backend Dev · 6 vjet',    tags:['Python','Django','PostgreSQL'],      color:'linear-gradient(135deg,#3182CE,#63B3ED)' },
  { initials:'DM', name:'Diana Morina',    title:'Marketing · 3 vjet',      tags:['SEO','Google Ads','Analytics'],      color:'linear-gradient(135deg,#7C3AED,#A78BFA)' },
  { initials:'GB', name:'Gentian Bala',    title:'DevOps · 5 vjet',         tags:['Docker','Kubernetes','AWS'],         color:'linear-gradient(135deg,#D97706,#FCD34D)' },
  { initials:'EK', name:'Elona Kelmendi',  title:'Data Analyst · 3 vjet',   tags:['Python','SQL','Tableau'],           color:'linear-gradient(135deg,#E53E3E,#FC8181)' },
  { initials:'BS', name:'Blerim Suli',     title:'HR Manager · 7 vjet',     tags:['Recruitment','HRIS','Training'],    color:'linear-gradient(135deg,#0D1B2A,#2d4a6e)' },
];

/* ─── STATUS LABEL ──────────────────────────────────────── */
const statusMap = {
  new:       '<span class="app-status status-new">I Ri</span>',
  review:    '<span class="app-status status-review">Shqyrtim</span>',
  interview: '<span class="app-status status-interview">Intervistë</span>',
  accepted:  '<span class="app-status status-accepted">Pranuar</span>',
  rejected:  '<span class="app-status status-rejected">Refuzuar</span>',
};

/* ─── RENDER JOBS ────────────────────────────────────────── */
function renderJobs(filter = 'all') {
  const list = document.getElementById('employerJobsList');
  if (!list) return;
  const filtered = filter === 'all' ? JOBS : JOBS.filter(j => j.status === filter);
  list.innerHTML = filtered.map(j => `
    <div class="emp-job-row">
      <div class="ejr-info">
        <div class="ejr-title">${j.title}</div>
        <div class="ejr-meta">${j.category} · ${j.location} · ${j.contract} · Skadon ${j.expires}</div>
      </div>
      <div class="ejr-stats">
        <div class="ejr-stat"><strong>${j.views}</strong><span>Shikime</span></div>
        <div class="ejr-stat"><strong>${j.apps}</strong><span>Aplikime</span></div>
      </div>
      <div class="ejr-actions">
        <button class="ejr-btn ejr-btn-edit">✏️ Ndrysho</button>
        <button class="ejr-btn ejr-btn-close">✕ Mbyll</button>
      </div>
    </div>
  `).join('');
}

function filterJobsTab(filter, btn) {
  document.querySelectorAll('.jobs-tab-filter .filter-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderJobs(filter);
}

/* ─── RENDER APPLICANTS ─────────────────────────────────── */
function renderApplicants(filter = 'all') {
  const table = document.getElementById('applicantsTable');
  if (!table) return;
  const filtered = filter === 'all' ? APPLICANTS : APPLICANTS.filter(a => a.status === filter);
  table.innerHTML = filtered.map(a => `
    <div class="at-row">
      <div class="at-avatar" style="background:${a.color}">${a.initials}</div>
      <div>
        <div class="at-name">${a.name}</div>
        <div class="at-role">${a.role}</div>
      </div>
      <div class="at-job">${a.job}</div>
      <div class="at-date">${a.date} më parë</div>
      ${statusMap[a.status] || ''}
      <div class="at-actions">
        <button class="mini-btn" title="Shiko CV">📄</button>
        <button class="mini-btn" title="Kontakto">✉️</button>
        <button class="mini-btn" title="Refuzo">✕</button>
      </div>
    </div>
  `).join('');
}

function filterApps(filter, btn) {
  document.querySelectorAll('.apps-filter-bar .filter-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderApplicants(filter);
}

/* ─── RENDER CANDIDATES ─────────────────────────────────── */
function renderCandidates() {
  const grid = document.getElementById('candidatesGrid');
  if (!grid) return;
  grid.innerHTML = CANDIDATES.map(c => `
    <div class="cand-card">
      <div class="cand-avatar" style="background:${c.color}">${c.initials}</div>
      <div class="cand-name">${c.name}</div>
      <div class="cand-title">${c.title}</div>
      <div class="cand-tags">${c.tags.map(t => `<span class="cand-tag">${t}</span>`).join('')}</div>
      <button class="cand-action">Shiko Profilin →</button>
    </div>
  `).join('');
}

/* ─── POST JOB MODAL ────────────────────────────────────── */
function openPostJob() {
  document.getElementById('postJobModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closePostJob() {
  document.getElementById('postJobModal').classList.remove('open');
  document.body.style.overflow = '';
}
function handleModalClick(e) {
  if (e.target === document.getElementById('postJobModal')) closePostJob();
}
function submitJob() {
  closePostJob();
  showToast('✓ Vendi i punës u publikua me sukses!');
}

/* ─── TAGS ──────────────────────────────────────────────── */
function removeTag(btn) { btn.closest('.skill-tag').remove(); }
function addValue() {
  const input = document.getElementById('valueInput');
  const val   = input.value.trim();
  if (!val) return;
  const tag = document.createElement('span');
  tag.className = 'skill-tag';
  tag.innerHTML = `${val} <button onclick="removeTag(this)">×</button>`;
  document.getElementById('valuesList').appendChild(tag);
  input.value = '';
}

/* ─── TOAST ─────────────────────────────────────────────── */
function showToast(msg) {
  let t = document.getElementById('empToast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'empToast';
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

const _s = document.createElement('style');
_s.textContent = '@keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(6px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }';
document.head.appendChild(_s);

/* ─── INIT ──────────────────────────────────────────────── */
renderJobs();
renderApplicants();
renderCandidates();
