/* ═══════════════════════════════════════════════════════
   DASHBOARD.JS  –  JobPortal  |  Dashboard Kandidatit
   ═══════════════════════════════════════════════════════ */

/* ─── MOCK DATA ─────────────────────────────────────────── */
const applications = [
  { id:1,  logo:'🏦', title:'UX Designer',           company:'Alpha Bank Albania',         date:'12 Mar 2025', status:'interview' },
  { id:2,  logo:'📡', title:'Product Designer',       company:'Vodafone Albania',           date:'10 Mar 2025', status:'review'    },
  { id:3,  logo:'📊', title:'UI/UX Lead',             company:'KPMG Albania',              date:'8 Mar 2025',  status:'pending'   },
  { id:4,  logo:'🏗',  title:'Digital Designer',       company:'Balfin Group',              date:'5 Mar 2025',  status:'accepted'  },
  { id:5,  logo:'📱', title:'Mobile UX Designer',     company:'One Telecommunications',    date:'3 Mar 2025',  status:'rejected'  },
  { id:6,  logo:'🏥', title:'Healthcare UX',          company:'American Hospital Tirana',  date:'28 Feb 2025', status:'review'    },
  { id:7,  logo:'💳', title:'UX Researcher',          company:'Credins Bank',              date:'25 Feb 2025', status:'pending'   },
  { id:8,  logo:'🏦', title:'Senior UX Designer',     company:'Raiffeisen Bank',           date:'20 Feb 2025', status:'pending'   },
  { id:9,  logo:'📟', title:'Product Manager',        company:'BKT – Banka Kombëtare',     date:'15 Feb 2025', status:'rejected'  },
  { id:10, logo:'🧃', title:'Brand Designer',         company:'Coca-Cola HBC Albania',     date:'10 Feb 2025', status:'pending'   },
  { id:11, logo:'⚡', title:'UX Designer',            company:'OSHEE',                     date:'5 Feb 2025',  status:'review'    },
  { id:12, logo:'💻', title:'UX/UI Developer',        company:'Softup Technologies',       date:'1 Feb 2025',  status:'pending'   },
];

const savedJobs = [
  { id:1, logo:'📊', title:'Senior UX Designer',         company:'KPMG Albania',           tags:['Tiranë','Full-time','Senior'],  salary:'180K–220K' },
  { id:2, logo:'🏦', title:'Product Designer',           company:'Alpha Bank',             tags:['Tiranë','Full-time','Remote'],  salary:'170K–210K' },
  { id:3, logo:'📡', title:'UX Researcher',              company:'Vodafone Albania',       tags:['Tiranë','Full-time'],           salary:'150K–190K' },
  { id:4, logo:'🏗',  title:'Digital Creative Director', company:'Balfin Group',           tags:['Tiranë','Full-time','Senior'],  salary:'200K–250K' },
  { id:5, logo:'💻', title:'Lead Product Designer',      company:'Softup Technologies',    tags:['Remote','Full-time'],          salary:'160K–200K' },
  { id:6, logo:'🤖', title:'UX for AI Products',         company:'AKSHI',                  tags:['Tiranë','Full-time'],          salary:'145K–185K' },
  { id:7, logo:'📱', title:'Mobile UX Designer',         company:'One Telecommunications', tags:['Tiranë','Full-time'],          salary:'155K–195K' },
];

const recommended = [
  { logo:'🏥', title:'UX Designer – Health',     company:'American Hospital Tirana', meta:'Tiranë · Full-time', salary:'140K–180K' },
  { logo:'🏦', title:'Senior Product Designer',  company:'Credins Bank',             meta:'Tiranë · Full-time', salary:'170K–210K' },
  { logo:'📟', title:'UX Lead',                  company:'Posta Shqiptare',          meta:'Tiranë · Full-time', salary:'130K–160K' },
  { logo:'⚡', title:'Design Systems Lead',      company:'OSHEE',                    meta:'Tiranë · Hybrid',    salary:'160K–200K' },
];

/* ─── STATUS MAPS ───────────────────────────────────────── */
const statusLabel = {
  review:    'Në shqyrtim',
  interview: 'Intervistë',
  accepted:  'Pranuar',
  rejected:  'Refuzuar',
  pending:   'Në pritje',
};
const statusClass = {
  review:    'status-review',
  interview: 'status-interview',
  accepted:  'status-accepted',
  rejected:  'status-rejected',
  pending:   'status-pending',
};

/* ─── TAB SWITCHING ─────────────────────────────────────── */
function switchDashTab(tab, el) {
  document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.snav-item').forEach(i => i.classList.remove('active'));
  document.getElementById('tab-' + tab)?.classList.add('active');
  if (el) el.classList.add('active');
  if (tab === 'applications') renderApps();
  if (tab === 'saved')        renderSaved();
  event?.preventDefault();
}

/* ─── OVERVIEW ──────────────────────────────────────────── */
function renderOverview() {
  // Recent 4 applications
  const wrap = document.getElementById('recentApps');
  if (wrap) {
    wrap.innerHTML = applications.slice(0, 4).map(a => `
      <div class="app-item">
        <div class="app-logo">${a.logo}</div>
        <div>
          <div class="app-title">${a.title}</div>
          <div class="app-company">${a.company}</div>
        </div>
        <span class="app-status ${statusClass[a.status]}">${statusLabel[a.status]}</span>
      </div>`).join('');
  }

  // Recommended jobs
  const rWrap = document.getElementById('recJobs');
  if (rWrap) {
    rWrap.innerHTML = recommended.map(j => `
      <div class="rec-item" onclick="window.location='jobs.html'">
        <div class="rec-logo">${j.logo}</div>
        <div>
          <div class="rec-title">${j.title}</div>
          <div class="rec-meta">${j.company} · ${j.meta}</div>
        </div>
        <div class="rec-salary">${j.salary}</div>
      </div>`).join('');
  }
}

/* ─── APPLICATIONS TABLE ────────────────────────────────── */
let currentFilter = 'all';

function renderApps() {
  const filtered = currentFilter === 'all'
    ? applications
    : applications.filter(a => a.status === currentFilter);

  const wrap = document.getElementById('appTableWrap');
  if (!wrap) return;

  if (!filtered.length) {
    wrap.innerHTML = `<div class="empty-state-msg"><span>📭</span>Nuk ka aplikime për këtë kategori.</div>`;
    return;
  }

  wrap.innerHTML = `
    <table class="app-table">
      <thead>
        <tr>
          <th>Pozicioni</th>
          <th>Kompania</th>
          <th>Data</th>
          <th>Statusi</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map(a => `
          <tr>
            <td>
              <div style="display:flex;align-items:center;gap:10px">
                <div class="at-logo">${a.logo}</div>
                <div class="at-title">${a.title}</div>
              </div>
            </td>
            <td class="at-company">${a.company}</td>
            <td class="at-date">${a.date}</td>
            <td><span class="app-status ${statusClass[a.status]}">${statusLabel[a.status]}</span></td>
            <td><button class="at-action" onclick="window.location='job-detail.html'">Shiko →</button></td>
          </tr>`).join('')}
      </tbody>
    </table>`;
}

function filterApps(status, btn) {
  currentFilter = status;
  document.querySelectorAll('.apps-filter-bar .filter-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderApps();
}

/* ─── SAVED JOBS ────────────────────────────────────────── */
function renderSaved() {
  const wrap = document.getElementById('savedGrid');
  if (!wrap) return;

  if (!savedJobs.length) {
    wrap.innerHTML = `<div class="empty-state-msg" style="grid-column:1/-1"><span>🔖</span>Nuk ke punë të ruajtura akoma.<br><a href="jobs.html" style="color:var(--green);font-weight:600">Shfleto punët →</a></div>`;
    return;
  }

  wrap.innerHTML = savedJobs.map(j => `
    <div class="saved-card" onclick="window.location='job-detail.html'">
      <button class="saved-remove" onclick="event.stopPropagation(); removeSaved(${j.id})" title="Hiq nga të ruajtura">✕</button>
      <div class="saved-logo">${j.logo}</div>
      <div class="saved-title">${j.title}</div>
      <div class="saved-company">${j.company}</div>
      <div class="saved-meta">${j.tags.map(t => `<span class="saved-tag">${t}</span>`).join('')}</div>
      <div class="saved-footer">
        <div class="saved-salary">${j.salary} ALL/muaj</div>
        <button class="saved-apply" onclick="event.stopPropagation(); window.location='job-detail.html'">Apliko</button>
      </div>
    </div>`).join('');
}

function removeSaved(id) {
  const idx = savedJobs.findIndex(j => j.id === id);
  if (idx !== -1) savedJobs.splice(idx, 1);
  renderSaved();
}

/* ─── SKILLS ────────────────────────────────────────────── */
function addSkill() {
  const input = document.getElementById('skillInput');
  const val   = input.value.trim();
  if (!val) return;
  const list = document.getElementById('skillsList');
  const tag  = document.createElement('span');
  tag.className = 'skill-tag';
  tag.innerHTML = `${val} <button onclick="removeSkill(this)">×</button>`;
  list.appendChild(tag);
  input.value = '';
  input.focus();
}
function removeSkill(btn) { btn.closest('.skill-tag').remove(); }
document.getElementById('skillInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); addSkill(); }
});

/* ─── NOTIFICATIONS ─────────────────────────────────────── */
function toggleNotif() {
  document.getElementById('notifPanel').classList.toggle('open');
  document.getElementById('notifOverlay').classList.toggle('open');
  document.getElementById('userMenu')?.classList.remove('open');
}

/* ─── USER MENU ─────────────────────────────────────────── */
function toggleUserMenu() {
  document.getElementById('userMenu').classList.toggle('open');
  document.getElementById('notifPanel').classList.remove('open');
  document.getElementById('notifOverlay').classList.remove('open');
}
document.addEventListener('click', e => {
  if (!e.target.closest('.nav-avatar')) {
    document.getElementById('userMenu')?.classList.remove('open');
  }
});

/* ─── INIT ──────────────────────────────────────────────── */
renderOverview();
