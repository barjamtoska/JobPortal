// ─── MOCK DATA ───────────────────────────────────────────
const JOBS = [
  { id:1,  title:'Senior Backend Developer',      company:'Alpha Bank Albania',    logo:'🏦', category:'IT',          location:'Tiranë',  contract:'Full-time',  experience:'Senior',  salaryMin:150000, salaryMax:200000, daysAgo:1,  featured:true,  urgent:false, remote:false, verified:true,  badges:['new','featured'] },
  { id:2,  title:'Digital Marketing Manager',     company:'Vodafone Albania',      logo:'📱', category:'Marketing',   location:'Tiranë',  contract:'Full-time',  experience:'Mid',     salaryMin:100000, salaryMax:140000, daysAgo:2,  featured:false, urgent:false, remote:false, verified:true,  badges:['hot'] },
  { id:3,  title:'UI/UX Designer',                company:'Techbit Solutions',     logo:'🌐', category:'Design',      location:'Remote',  contract:'Part-time',  experience:'Junior',  salaryMin:70000,  salaryMax:90000,  daysAgo:1,  featured:false, urgent:false, remote:true,  verified:true,  badges:['remote','new'] },
  { id:4,  title:'Inxhinier Civil – Projektime',  company:'Gjoka Konstruksion',    logo:'🏗️', category:'Engineering', location:'Durrës',  contract:'Full-time',  experience:'Mid',     salaryMin:90000,  salaryMax:130000, daysAgo:3,  featured:false, urgent:false, remote:false, verified:false, badges:['new'] },
  { id:5,  title:'Kontabilist i Lartë',           company:'KPMG Albania',          logo:'📊', category:'Finance',     location:'Tiranë',  contract:'Full-time',  experience:'Senior',  salaryMin:130000, salaryMax:170000, daysAgo:0,  featured:true,  urgent:false, remote:false, verified:true,  badges:['featured','hot'] },
  { id:6,  title:'Full Stack Developer (React)',  company:'Credins Bank',          logo:'💳', category:'IT',          location:'Tiranë',  contract:'Full-time',  experience:'Mid',     salaryMin:120000, salaryMax:160000, daysAgo:4,  featured:false, urgent:true,  remote:false, verified:true,  badges:['urgent'] },
  { id:7,  title:'Asistent/e Administrativ/e',    company:'Balfin Group',          logo:'🏢', category:'Admin',       location:'Tiranë',  contract:'Full-time',  experience:'Entry',   salaryMin:55000,  salaryMax:75000,  daysAgo:5,  featured:false, urgent:false, remote:false, verified:true,  badges:['new'] },
  { id:8,  title:'DevOps Engineer',               company:'One Telecommunications',logo:'📡', category:'IT',          location:'Tiranë',  contract:'Full-time',  experience:'Senior',  salaryMin:160000, salaryMax:220000, daysAgo:2,  featured:true,  urgent:false, remote:true,  verified:true,  badges:['featured','remote'] },
  { id:9,  title:'Specialist Marketing Digital',  company:'Neptun Electronics',    logo:'🖥️', category:'Marketing',   location:'Tiranë',  contract:'Full-time',  experience:'Junior',  salaryMin:65000,  salaryMax:85000,  daysAgo:6,  featured:false, urgent:false, remote:false, verified:false, badges:[] },
  { id:10, title:'Mjek i Përgjithshëm',           company:'American Hospital',     logo:'🏥', category:'Health',      location:'Tiranë',  contract:'Full-time',  experience:'Mid',     salaryMin:110000, salaryMax:150000, daysAgo:3,  featured:false, urgent:true,  remote:false, verified:true,  badges:['urgent'] },
  { id:11, title:'React Native Developer',        company:'Softup Technologies',   logo:'💻', category:'IT',          location:'Remote',  contract:'Full-time',  experience:'Mid',     salaryMin:130000, salaryMax:180000, daysAgo:1,  featured:false, urgent:false, remote:true,  verified:true,  badges:['new','remote'] },
  { id:12, title:'Jurist / Avokat i Brendshëm',   company:'Raiffeisen Bank',       logo:'⚖️', category:'Legal',       location:'Tiranë',  contract:'Full-time',  experience:'Senior',  salaryMin:140000, salaryMax:190000, daysAgo:7,  featured:false, urgent:false, remote:false, verified:true,  badges:[] },
  { id:13, title:'Data Analyst',                  company:'Intesa Sanpaolo Bank',  logo:'📈', category:'Finance',     location:'Tiranë',  contract:'Full-time',  experience:'Mid',     salaryMin:100000, salaryMax:135000, daysAgo:2,  featured:false, urgent:false, remote:false, verified:true,  badges:['hot'] },
  { id:14, title:'HR Manager',                    company:'Coca-Cola HBC Albania', logo:'🧃', category:'Admin',       location:'Tiranë',  contract:'Full-time',  experience:'Senior',  salaryMin:120000, salaryMax:160000, daysAgo:8,  featured:false, urgent:false, remote:false, verified:true,  badges:[] },
  { id:15, title:'Inxhinier Elektrik',            company:'OSHEE Albania',         logo:'⚡', category:'Engineering', location:'Durrës',  contract:'Full-time',  experience:'Mid',     salaryMin:85000,  salaryMax:115000, daysAgo:5,  featured:false, urgent:false, remote:false, verified:true,  badges:[] },
  { id:16, title:'Frontend Developer (Vue.js)',   company:'Digitalb',              logo:'📺', category:'IT',          location:'Tiranë',  contract:'Full-time',  experience:'Junior',  salaryMin:80000,  salaryMax:110000, daysAgo:0,  featured:false, urgent:false, remote:true,  verified:false, badges:['new','remote'] },
  { id:17, title:'Infermier/e',                   company:'Klinika ABC',           logo:'💊', category:'Health',      location:'Vlorë',   contract:'Full-time',  experience:'Entry',   salaryMin:50000,  salaryMax:65000,  daysAgo:9,  featured:false, urgent:false, remote:false, verified:false, badges:[] },
  { id:18, title:'Graphic Designer',              company:'Leo Burnett Albania',   logo:'🎨', category:'Design',      location:'Tiranë',  contract:'Freelance',  experience:'Junior',  salaryMin:60000,  salaryMax:90000,  daysAgo:4,  featured:false, urgent:false, remote:true,  verified:true,  badges:['remote'] },
  { id:19, title:'Product Manager',               company:'Tring Technology',      logo:'📦', category:'IT',          location:'Tiranë',  contract:'Full-time',  experience:'Senior',  salaryMin:170000, salaryMax:240000, daysAgo:6,  featured:true,  urgent:false, remote:false, verified:true,  badges:['featured','hot'] },
  { id:20, title:'Analiste Financiare',           company:'BKT – Banka Kombëtare', logo:'🏛️', category:'Finance',     location:'Tiranë',  contract:'Full-time',  experience:'Mid',     salaryMin:105000, salaryMax:140000, daysAgo:3,  featured:false, urgent:false, remote:false, verified:true,  badges:[] },
  { id:21, title:'Social Media Specialist',       company:'Telekom Albania',       logo:'📲', category:'Marketing',   location:'Tiranë',  contract:'Part-time',  experience:'Junior',  salaryMin:50000,  salaryMax:70000,  daysAgo:11, featured:false, urgent:false, remote:true,  verified:true,  badges:['remote'] },
  { id:22, title:'IT Support Specialist',         company:'Albtelekom',            logo:'🔧', category:'IT',          location:'Shkodër', contract:'Full-time',  experience:'Entry',   salaryMin:55000,  salaryMax:75000,  daysAgo:7,  featured:false, urgent:false, remote:false, verified:false, badges:[] },
  { id:23, title:'Inxhinier Ndërtimi',            company:'2 Brile Construction',  logo:'🏚️', category:'Engineering', location:'Tiranë',  contract:'Full-time',  experience:'Senior',  salaryMin:140000, salaryMax:185000, daysAgo:2,  featured:false, urgent:true,  remote:false, verified:true,  badges:['urgent','new'] },
  { id:24, title:'Python Developer (ML/AI)',      company:'AKSHI',                 logo:'🤖', category:'IT',          location:'Tiranë',  contract:'Full-time',  experience:'Mid',     salaryMin:145000, salaryMax:195000, daysAgo:1,  featured:true,  urgent:false, remote:true,  verified:true,  badges:['featured','new','remote'] },
];

// ─── STATE ──────────────────────────────────────────────
const state = {
  filters: { category:[], location:[], contract:[], experience:[], special:[], date: '' },
  salMin: '', salMax: '',
  search: '',
  topLocation: '', topCategory: '',
  sort: 'recent',
  view: 'list',
  page: 1,
  perPage: 8
};

// ─── RENDER ─────────────────────────────────────────────
function renderJobs() {
  let jobs = [...JOBS];

  // Text search
  const q = (state.search || '').toLowerCase().trim();
  if (q) jobs = jobs.filter(j =>
    j.title.toLowerCase().includes(q) ||
    j.company.toLowerCase().includes(q) ||
    j.category.toLowerCase().includes(q)
  );

  // Top location
  if (state.topLocation) jobs = jobs.filter(j => j.location === state.topLocation);
  // Top category
  if (state.topCategory) jobs = jobs.filter(j => j.category === state.topCategory);

  // Sidebar filters
  if (state.filters.category.length)   jobs = jobs.filter(j => state.filters.category.includes(j.category));
  if (state.filters.location.length)   jobs = jobs.filter(j => state.filters.location.includes(j.location));
  if (state.filters.contract.length)   jobs = jobs.filter(j => state.filters.contract.includes(j.contract));
  if (state.filters.experience.length) jobs = jobs.filter(j => state.filters.experience.includes(j.experience));
  if (state.filters.special.includes('remote'))   jobs = jobs.filter(j => j.remote);
  if (state.filters.special.includes('featured')) jobs = jobs.filter(j => j.featured);
  if (state.filters.special.includes('urgent'))   jobs = jobs.filter(j => j.urgent);
  if (state.filters.special.includes('verified')) jobs = jobs.filter(j => j.verified);

  // Salary
  if (state.salMin) jobs = jobs.filter(j => j.salaryMax >= parseInt(state.salMin));
  if (state.salMax) jobs = jobs.filter(j => j.salaryMin <= parseInt(state.salMax));

  // Date
  if (state.filters.date) jobs = jobs.filter(j => j.daysAgo <= parseInt(state.filters.date));

  // Sort
  if (state.sort === 'recent') jobs.sort((a,b) => a.daysAgo - b.daysAgo);
  else if (state.sort === 'salary') jobs.sort((a,b) => b.salaryMax - a.salaryMax);
  else if (state.sort === 'relevant') jobs.sort((a,b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  // Pagination
  const total = jobs.length;
  const totalPages = Math.max(1, Math.ceil(total / state.perPage));
  if (state.page > totalPages) state.page = totalPages;
  const start = (state.page - 1) * state.perPage;
  const paged = jobs.slice(start, start + state.perPage);

  // Count
  document.getElementById('resultsCount').textContent = `— ${total} rezultate`;

  // Render cards
  const list = document.getElementById('jobsList');
  const empty = document.getElementById('emptyState');
  if (paged.length === 0) {
    list.innerHTML = '';
    empty.classList.add('visible');
  } else {
    empty.classList.remove('visible');
    list.innerHTML = paged.map(j => renderCard(j)).join('');
    // Save btn logic
    list.querySelectorAll('.btn-save').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.classList.toggle('saved');
        btn.title = btn.classList.contains('saved') ? 'Hiq nga të ruajturit' : 'Ruaj punën';
      });
    });
  }
  if (state.view === 'grid') list.classList.add('grid-view');
  else list.classList.remove('grid-view');

  // Pagination
  renderPagination(totalPages, total, start, paged.length);
  renderActiveTags();
}

function renderCard(j) {
  const badgeMap = {
    new:      '<span class="badge badge-new">I Ri</span>',
    hot:      '<span class="badge badge-hot">🔥 Hot</span>',
    remote:   '<span class="badge badge-remote">Remote</span>',
    featured: '<span class="badge badge-featured">⭐ Featured</span>',
    urgent:   '<span class="badge badge-urgent">🔴 Urgjent</span>',
  };
  const badges = j.badges.map(b => badgeMap[b] || '').join('');
  const salFmt = n => n.toLocaleString('sq-AL');
  const postedText = j.daysAgo === 0 ? 'Sot' : j.daysAgo === 1 ? 'Dje' : `${j.daysAgo} ditë më parë`;
  const expLabel = {Entry:'Entry Level', Junior:'Junior', Mid:'Mid-level', Senior:'Senior', Manager:'Menaxher'}[j.experience] || j.experience;
  return `
    <div class="job-card${j.featured ? ' featured':''}" onclick="window.location='jobs.html${j.id}/'">
      <div class="company-logo">${j.logo}</div>
      <div class="job-info">
        <div class="job-top">
          <div>
            <div class="job-title">${j.title}</div>
            <div class="job-company-name">${j.company}</div>
          </div>
        </div>
        <div class="job-badges">${badges}</div>
        <div class="job-meta">
          <span class="meta-tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21c-4-4-7-7.5-7-10.5a7 7 0 1114 0C19 13.5 16 17 12 21z"/></svg>${j.location}</span>
          <span class="meta-tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>${j.contract}</span>
          <span class="meta-tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>${expLabel}</span>
        </div>
      </div>
      <div class="job-right">
        <div>
          <div class="job-salary">${salFmt(j.salaryMin)} – ${salFmt(j.salaryMax)}<small>ALL/muaj</small></div>
          <div class="job-posted">${postedText}</div>
        </div>
        <div style="display:flex; gap:6px; align-items:center; margin-top:8px;">
          <button class="btn-save" title="Ruaj punën" onclick="">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
          </button>
          <button class="btn-apply" onclick="event.stopPropagation(); window.location='jobs.html${j.id}/'">Apliko →</button>
        </div>
      </div>
    </div>`;
}

function renderPagination(totalPages, total, start, pageCount) {
  const pag = document.getElementById('pagination');
  const info = document.getElementById('pageInfo');
  if (totalPages <= 1) { pag.innerHTML = ''; info.textContent = ''; return; }
  let html = '';
  // Prev
  html += `<button class="page-btn" ${state.page===1?'disabled style="opacity:.4"':''} onclick="goPage(${state.page-1})">‹</button>`;
  // Pages
  for (let i = 1; i <= totalPages; i++) {
    if (i===1 || i===totalPages || (i>=state.page-1 && i<=state.page+1)) {
      html += `<button class="page-btn${i===state.page?' active':''}" onclick="goPage(${i})">${i}</button>`;
    } else if (i===state.page-2 || i===state.page+2) {
      html += `<button class="page-btn dots">…</button>`;
    }
  }
  // Next
  html += `<button class="page-btn" ${state.page===totalPages?'disabled style="opacity:.4"':''} onclick="goPage(${state.page+1})">›</button>`;
  pag.innerHTML = html;
  info.textContent = `Duke shfaqur ${start+1}–${start+pageCount} nga ${total} rezultate`;
}

function goPage(p) {
  state.page = p;
  renderJobs();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── FILTER HANDLERS ────────────────────────────────────
function applyFilters() {
  state.search = document.getElementById('topSearch').value;
  state.topLocation = document.getElementById('topLocation').value;
  state.topCategory = document.getElementById('topCategory').value;
  state.salMin = document.getElementById('salMin').value;
  state.salMax = document.getElementById('salMax').value;
  state.page = 1;
  renderJobs();
}

// Checkbox click (sidebar)
document.querySelectorAll('.check-item[data-filter]').forEach(item => {
  item.addEventListener('click', () => {
    const filter = item.dataset.filter;
    const value  = item.dataset.value;
    item.classList.toggle('checked');
    const arr = state.filters[filter];
    const idx = arr.indexOf(value);
    if (idx === -1) arr.push(value);
    else arr.splice(idx, 1);
    state.page = 1;
    renderJobs();
  });
});

// Radio click (date)
document.querySelectorAll('.radio-item[data-filter]').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.radio-item[data-filter="date"]').forEach(r => r.classList.remove('checked'));
    item.classList.add('checked');
    state.filters.date = item.dataset.value;
    state.page = 1;
    renderJobs();
  });
});
// Set "Çdo kohë" as default
document.querySelector('.radio-item[data-value=""]')?.classList.add('checked');

// ─── SORT ────────────────────────────────────────────────
function setSort(s, btn) {
  state.sort = s;
  document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.page = 1;
  renderJobs();
}

// ─── VIEW ────────────────────────────────────────────────
function setView(v) {
  state.view = v;
  document.getElementById('listViewBtn').classList.toggle('active', v==='list');
  document.getElementById('gridViewBtn').classList.toggle('active', v==='grid');
  renderJobs();
}

// ─── CLEAR HELPERS ──────────────────────────────────────
function clearSection(filter) {
  state.filters[filter] = [];
  document.querySelectorAll(`[data-filter="${filter}"]`).forEach(el => el.classList.remove('checked'));
  state.page = 1;
  renderJobs();
}
function clearSalary() {
  document.getElementById('salMin').value = '';
  document.getElementById('salMax').value = '';
  state.salMin = '';
  state.salMax = '';
  state.page = 1;
  renderJobs();
}
function clearAll() {
  ['category','location','contract','experience','special'].forEach(f => {
    state.filters[f] = [];
    document.querySelectorAll(`[data-filter="${f}"]`).forEach(el => el.classList.remove('checked'));
  });
  state.filters.date = '';
  document.querySelectorAll('.radio-item').forEach(r => r.classList.remove('checked'));
  document.querySelector('.radio-item[data-value=""]')?.classList.add('checked');
  clearSalary();
  document.getElementById('topSearch').value = '';
  document.getElementById('topLocation').value = '';
  document.getElementById('topCategory').value = '';
  state.search = ''; state.topLocation = ''; state.topCategory = '';
  state.page = 1;
  renderJobs();
}

// ─── ACTIVE TAGS ────────────────────────────────────────
function renderActiveTags() {
  const container = document.getElementById('tagContainer');
  const wrap = document.getElementById('activeTags');
  const tags = [];

  if (state.search) tags.push({ label: `"${state.search}"`, clear: () => { document.getElementById('topSearch').value=''; state.search=''; applyFilters(); }});
  if (state.topLocation) tags.push({ label: state.topLocation, clear: () => { document.getElementById('topLocation').value=''; state.topLocation=''; applyFilters(); }});
  if (state.topCategory) tags.push({ label: state.topCategory, clear: () => { document.getElementById('topCategory').value=''; state.topCategory=''; applyFilters(); }});

  const labelMap = {
    IT:'IT & Teknologji', Marketing:'Marketing', Finance:'Financë', Admin:'Administratë',
    Engineering:'Inxhinieri', Health:'Shëndetësi', Design:'Dizajn', Legal:'Juridik',
    'Full-time':'Full-time','Part-time':'Part-time','Freelance':'Freelance','Internship':'Praktikë',
    Entry:'Entry Level', Junior:'Junior', Mid:'Mid-level', Senior:'Senior', Manager:'Menaxher',
    remote:'🌍 Remote', featured:'⭐ Featured', urgent:'🔴 Urgjente', verified:'✅ Verifikuara',
  };
  ['category','location','contract','experience','special'].forEach(f => {
    state.filters[f].forEach(v => {
      tags.push({ label: labelMap[v]||v, clear: () => {
        const idx = state.filters[f].indexOf(v);
        if (idx !== -1) state.filters[f].splice(idx, 1);
        document.querySelectorAll(`[data-filter="${f}"][data-value="${v}"]`).forEach(el => el.classList.remove('checked'));
        state.page = 1; renderJobs();
      }});
    });
  });
  if (state.filters.date) tags.push({ label: `Brenda ${state.filters.date} ditëve`, clear: () => { state.filters.date=''; document.querySelectorAll('.radio-item').forEach(r=>r.classList.remove('checked')); document.querySelector('.radio-item[data-value=""]')?.classList.add('checked'); state.page=1; renderJobs(); }});
  if (state.salMin || state.salMax) {
    const l = state.salMin ? `${parseInt(state.salMin).toLocaleString()}` : '0';
    const r = state.salMax ? `${parseInt(state.salMax).toLocaleString()}` : '∞';
    tags.push({ label: `Paga ${l}–${r}`, clear: clearSalary });
  }

  if (tags.length === 0) { wrap.classList.add('hidden'); return; }
  wrap.classList.remove('hidden');
  container.innerHTML = tags.map((t,i) => `
    <span class="filter-tag" data-idx="${i}">
      ${t.label}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </span>`).join('');
  container.querySelectorAll('.filter-tag').forEach((el, i) => {
    el.addEventListener('click', tags[i].clear);
  });
}

// ─── CHECKBOX SEARCH ────────────────────────────────────
function filterCheckboxes(listId, query) {
  document.querySelectorAll(`#${listId} .check-item`).forEach(item => {
    const label = item.querySelector('.check-label').textContent.toLowerCase();
    item.style.display = label.includes(query.toLowerCase()) ? '' : 'none';
  });
}

// ─── MOBILE DRAWER ──────────────────────────────────────
function openDrawer() { document.getElementById('sidebarOverlay').classList.add('open'); document.getElementById('sidebarDrawer').classList.add('open'); }
function closeDrawer() { document.getElementById('sidebarOverlay').classList.remove('open'); document.getElementById('sidebarDrawer').classList.remove('open'); }

// ─── URL PARAMS (Django integration) ────────────────────
function readUrlParams() {
  const p = new URLSearchParams(window.location.search);
  if (p.get('q')) { document.getElementById('topSearch').value = p.get('q'); state.search = p.get('q'); }
  if (p.get('location')) { document.getElementById('topLocation').value = p.get('location'); state.topLocation = p.get('location'); }
  if (p.get('category')) { document.getElementById('topCategory').value = p.get('category'); state.topCategory = p.get('category'); }
}

// ─── INIT ────────────────────────────────────────────────
readUrlParams();
renderJobs();