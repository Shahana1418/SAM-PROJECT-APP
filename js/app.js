/**
 * SAM System — Hierarchical Drill-Down Navigation
 * College → Department → Batch → Teams → Students
 */

// ===== Global State =====
let appData = null;
let isAdmin = false;
const ADMIN_HASH = '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'; // 'admin'

// Navigation state
let navState = {
    level: 'college',   // college | department | batch | teams
    dept: null,
    batch: null,
    teams: null,
};

// ===== Academic Info Helper =====
function getBatchAcademicInfo(batchYear) {
    const joiningYear = batchYear - 4;
    const passingYear = batchYear;
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 1-12

    // Semester calculation (Aug = odd sem start, Jan = even sem start)
    let semester;
    if (currentMonth >= 7) {
        semester = (currentYear - joiningYear) * 2 + 1;
    } else {
        semester = (currentYear - joiningYear - 1) * 2 + 2;
    }
    semester = Math.max(1, Math.min(8, semester)); // Clamp 1-8

    const academicYear = Math.ceil(semester / 2); // 1st, 2nd, 3rd, 4th year
    const yearSuffix = ['', '1st', '2nd', '3rd', '4th'][academicYear] || `${academicYear}th`;

    return { joiningYear, passingYear, semester, academicYear, yearSuffix };
}

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    render();
});

// ===== Data Loading =====
function loadData() {
    if (typeof STUDENT_DATA !== 'undefined') {
        appData = STUDENT_DATA;
    } else {
        appData = { college: 'GCE Erode', batches: [] };
    }
}

// ===== SHA-256 hash =====
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ===== Admin Auth =====
function toggleAdminLogin() {
    if (isAdmin) {
        isAdmin = false;
        document.getElementById('admin-btn-text').textContent = 'Admin';
        document.getElementById('admin-toggle').classList.remove('admin-active');
        render();
        return;
    }
    document.getElementById('admin-modal').style.display = 'flex';
    document.getElementById('admin-password').value = '';
    document.getElementById('admin-password').focus();
    document.getElementById('login-error').style.display = 'none';
}

async function attemptLogin() {
    const pw = document.getElementById('admin-password').value;
    const hash = await sha256(pw);
    if (hash === ADMIN_HASH) {
        isAdmin = true;
        document.getElementById('admin-btn-text').textContent = 'Logout';
        document.getElementById('admin-toggle').classList.add('admin-active');
        closeModal();
        render();
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

function closeModal() {
    document.getElementById('admin-modal').style.display = 'none';
}

// ===== Navigation =====
function navigateTo(level, dept, batch) {
    navState.level = level;
    navState.dept = dept || null;
    navState.batch = batch || null;
    navState.teams = null;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function generateAndShowTeams(deptCode, batchYear, teamSize, mode) {
    const batchData = appData.batches.find(b => b.year === batchYear);
    if (!batchData) return;
    const students = batchData.students.filter(s => s.department === deptCode);

    mode = mode || 'random';

    // For CGPA mode: check if any student has CGPA data
    if (mode === 'cgpa') {
        const hasCgpa = students.some(s => s.cgpa !== null && s.cgpa !== undefined);
        if (!hasCgpa) {
            alert('⚠️ CGPA data is not available for this batch. Falling back to Random Balanced mode.');
            mode = 'random';
        }
    }

    navState.teams = buildTeams(students, teamSize || 5, mode);
    navState.level = 'teams';
    navState.dept = deptCode;
    navState.batch = batchYear;
    navState.editMode = (mode === 'manual'); // Auto-open edit mode for manual arrange
    navState.formationMode = mode;
    render();
}

// ===== Breadcrumb =====
function renderBreadcrumb() {
    const bc = document.getElementById('breadcrumb');
    let items = [];

    items.push(`<span class="breadcrumb-item ${navState.level === 'college' ? 'active' : 'clickable'}" 
        onclick="navigateTo('college')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        </svg>
        GCE Erode
    </span>`);

    if (navState.dept) {
        const deptName = getDeptName(navState.dept);
        items.push(`<span class="breadcrumb-sep">›</span>`);
        items.push(`<span class="breadcrumb-item ${navState.level === 'department' ? 'active' : 'clickable'}" 
            onclick="navigateTo('department','${navState.dept}')">${deptName}</span>`);
    }

    if (navState.batch) {
        items.push(`<span class="breadcrumb-sep">›</span>`);
        items.push(`<span class="breadcrumb-item ${navState.level === 'batch' || navState.level === 'teams' ? 'active' : 'clickable'}" 
            onclick="navigateTo('batch','${navState.dept}',${navState.batch})">${navState.batch} Batch</span>`);
    }

    if (navState.level === 'teams') {
        items.push(`<span class="breadcrumb-sep">›</span>`);
        items.push(`<span class="breadcrumb-item active">Teams</span>`);
    }

    bc.innerHTML = items.join('');
}

function getDeptName(code) {
    const names = {
        'ATE': 'Automobile Engineering',
        'CSE': 'Computer Science & Engineering',
        'CVE': 'Civil Engineering',
        'DSC': 'Data Science',
        'ECE': 'Electronics & Communication Engineering',
        'EEE': 'Electrical & Electronics Engineering',
        'IMT': 'Information Technology',
        'MCE': 'Mechanical Engineering',
    };
    return names[code] || code;
}

function getDeptShortName(code) {
    const names = {
        'ATE': 'Automobile Engg.',
        'CSE': 'Computer Science',
        'CVE': 'Civil Engg.',
        'DSC': 'Data Science',
        'ECE': 'ECE',
        'EEE': 'EEE',
        'IMT': 'Info. Technology',
        'MCE': 'Mechanical Engg.',
    };
    return names[code] || code;
}

// ===== Main Render =====
function render() {
    renderBreadcrumb();
    const main = document.getElementById('main-content');

    switch (navState.level) {
        case 'college': renderCollege(main); break;
        case 'department': renderDepartment(main); break;
        case 'batch': renderBatch(main); break;
        case 'teams': renderTeams(main); break;
    }
}

// ===== Level 1: College Overview =====
function renderCollege(container) {
    // Aggregate stats across all batches
    let totalStudents = 0, totalMales = 0, totalFemales = 0;
    const deptSet = new Set();

    appData.batches.forEach(b => {
        b.students.forEach(s => {
            totalStudents++;
            if (s.gender === 'M') totalMales++;
            if (s.gender === 'F') totalFemales++;
        });
        b.departments.forEach(d => {
            if (d.totalStudents > 0) deptSet.add(d.code);
        });
    });

    // Get unique dept list with total across batches
    const deptTotals = {};
    appData.batches.forEach(b => {
        b.departments.forEach(d => {
            if (!deptTotals[d.code]) deptTotals[d.code] = { code: d.code, name: d.name, students: 0, males: 0, females: 0, batches: 0 };
            if (d.totalStudents > 0) {
                deptTotals[d.code].students += d.totalStudents;
                deptTotals[d.code].males += d.males;
                deptTotals[d.code].females += d.females;
                deptTotals[d.code].batches++;
            }
        });
    });

    const activeDepts = Object.values(deptTotals).filter(d => d.students > 0);
    const colors = ['blue', 'green', 'purple', 'orange', 'cyan', 'blue', 'green', 'purple'];

    container.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Government College of Engineering, Erode
            </h2>
            <p class="page-subtitle">Student Alumni Mentorship (SAM) System</p>
        </div>

        <!-- Stats Cards -->
        <div class="stats-grid">
            <div class="stat-card stat-blue">
                <div class="stat-info">
                    <span class="stat-label">Departments</span>
                    <span class="stat-value">${activeDepts.length}</span>
                    <span class="stat-detail">Active departments</span>
                </div>
                <div class="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                </div>
            </div>
            <div class="stat-card stat-green">
                <div class="stat-info">
                    <span class="stat-label">Total Students</span>
                    <span class="stat-value">${totalStudents}</span>
                    <span class="stat-detail">M: ${totalMales} | F: ${totalFemales}</span>
                </div>
                <div class="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                    </svg>
                </div>
            </div>
            <div class="stat-card stat-orange">
                <div class="stat-info">
                    <span class="stat-label">Batches</span>
                    <span class="stat-value">${appData.batches.length}</span>
                    <span class="stat-detail">${appData.batches.map(b => b.year).join(', ')}</span>
                </div>
                <div class="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                </div>
            </div>
        </div>

        <h3 class="section-title">Select a Department</h3>
        <div class="dept-grid" id="dept-grid"></div>
    `;

    // Render department cards
    const grid = document.getElementById('dept-grid');
    activeDepts.forEach((dept, i) => {
        const color = colors[i % colors.length];
        const card = document.createElement('div');
        card.className = 'dept-card';
        card.style.animationDelay = `${i * 0.06}s`;
        card.onclick = () => navigateTo('department', dept.code);
        card.innerHTML = `
            <div class="dept-card-accent-left" style="background: var(--gradient-${color})"></div>
            <div class="dept-card-main">
                <div class="dept-card-body">
                    <div class="dept-card-icon" style="background: var(--gradient-${color})">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                    </div>
                    <div class="dept-card-info">
                        <div class="dept-card-name">${dept.name}</div>
                        <div class="dept-card-code">${dept.code} · ${dept.batches} batch${dept.batches > 1 ? 'es' : ''}</div>
                    </div>
                </div>
                <div class="dept-card-footer">
                    <div class="dept-card-stat-pills">
                        <span class="dept-pill dept-pill-total">${dept.students} Students</span>
                        <span class="dept-pill dept-pill-male">♂ ${dept.males}</span>
                        <span class="dept-pill dept-pill-female">♀ ${dept.females}</span>
                    </div>
                    <svg class="dept-card-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ===== Level 2: Department → Batch Cards =====
function renderDepartment(container) {
    const deptCode = navState.dept;
    const deptName = getDeptName(deptCode);

    // Find batches that have this department with students
    const batchesWithDept = [];
    let totalStudents = 0, totalMales = 0, totalFemales = 0;

    appData.batches.forEach(b => {
        const deptInfo = b.departments.find(d => d.code === deptCode);
        if (deptInfo && deptInfo.totalStudents > 0) {
            batchesWithDept.push({ year: b.year, ...deptInfo });
            totalStudents += deptInfo.totalStudents;
            totalMales += deptInfo.males;
            totalFemales += deptInfo.females;
        }
    });

    const colors = ['blue', 'green', 'purple', 'orange', 'cyan'];

    container.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                ${deptName}
            </h2>
            <p class="page-subtitle">${deptCode} · ${totalStudents} students across ${batchesWithDept.length} batch${batchesWithDept.length > 1 ? 'es' : ''}</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card stat-blue">
                <div class="stat-info">
                    <span class="stat-label">Total Students</span>
                    <span class="stat-value">${totalStudents}</span>
                    <span class="stat-detail">M: ${totalMales} | F: ${totalFemales}</span>
                </div>
                <div class="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                    </svg>
                </div>
            </div>
            <div class="stat-card stat-green">
                <div class="stat-info">
                    <span class="stat-label">Batches</span>
                    <span class="stat-value">${batchesWithDept.length}</span>
                    <span class="stat-detail">${batchesWithDept.map(b => b.year).join(', ')}</span>
                </div>
                <div class="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                </div>
            </div>
        </div>

        <h3 class="section-title">Select a Batch</h3>
        <div class="batch-grid" id="batch-grid"></div>
    `;

    const grid = document.getElementById('batch-grid');
    batchesWithDept.forEach((batch, i) => {
        const color = colors[i % colors.length];
        const info = getBatchAcademicInfo(batch.year);
        const card = document.createElement('div');
        card.className = 'dept-card';
        card.style.animationDelay = `${i * 0.06}s`;
        card.onclick = () => navigateTo('batch', deptCode, batch.year);
        card.innerHTML = `
            <div class="dept-card-accent-left" style="background: var(--gradient-${color})"></div>
            <div class="dept-card-main">
                <div class="dept-card-body">
                    <div class="dept-card-icon" style="background: var(--gradient-${color})">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                    </div>
                    <div class="dept-card-info">
                        <div class="dept-card-name">${batch.year} Batch — ${info.yearSuffix} Year</div>
                        <div class="dept-card-code">Joined ${info.joiningYear} · Passing ${info.passingYear} · Sem ${info.semester}</div>
                    </div>
                </div>
                <div class="dept-card-footer">
                    <div class="dept-card-stat-pills">
                        <span class="dept-pill dept-pill-total">${batch.totalStudents} Students</span>
                        <span class="dept-pill dept-pill-male">♂ ${batch.males}</span>
                        <span class="dept-pill dept-pill-female">♀ ${batch.females}</span>
                        <span class="dept-pill" style="background:rgba(234,88,12,0.08);color:#ea580c">Sem ${info.semester}</span>
                    </div>
                    <svg class="dept-card-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ===== Level 3: Batch → Student List + Team Generation =====
function renderBatch(container) {
    const deptCode = navState.dept;
    const batchYear = navState.batch;
    const batchData = appData.batches.find(b => b.year === batchYear);
    if (!batchData) return;

    const students = batchData.students.filter(s => s.department === deptCode);
    const males = students.filter(s => s.gender === 'M').length;
    const females = students.filter(s => s.gender === 'F').length;
    const batchInfo = getBatchAcademicInfo(batchYear);

    const adminActions = isAdmin ? `
        <div class="admin-actions">
            <h3 class="section-title">⚡ Admin: Generate Teams</h3>
            <div class="team-controls">
                <div class="filter-group">
                    <label>Formation Mode</label>
                    <select id="formation-mode" class="filter-select">
                        <option value="random">🎲 Random Balanced</option>
                        <option value="cgpa">📊 CGPA Balanced</option>
                        <option value="manual">✏️ Manual Arrange</option>
                    </select>
                </div>
                <button class="btn-primary" style="width:auto;padding:10px 20px" 
                    onclick="generateAndShowTeams('${deptCode}',${batchYear}, null, document.getElementById('formation-mode').value)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                    Generate Teams
                </button>
            </div>
        </div>
    ` : '';

    container.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                    <path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
                ${getDeptShortName(deptCode)} — ${batchYear} Batch (${batchInfo.yearSuffix} Year)
            </h2>
            <p class="page-subtitle">${students.length} students · ${deptCode} · Joined ${batchInfo.joiningYear} · Passing ${batchInfo.passingYear} · Semester ${batchInfo.semester}</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card stat-blue">
                <div class="stat-info">
                    <span class="stat-label">Students</span>
                    <span class="stat-value">${students.length}</span>
                    <span class="stat-detail">${deptCode} · ${batchYear}</span>
                </div>
                <div class="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                    </svg>
                </div>
            </div>
            <div class="stat-card stat-green">
                <div class="stat-info">
                    <span class="stat-label">Male</span>
                    <span class="stat-value">${males}</span>
                    <span class="stat-detail">${Math.round(males / students.length * 100)}%</span>
                </div>
                <div class="stat-icon">♂</div>
            </div>
            <div class="stat-card stat-purple">
                <div class="stat-info">
                    <span class="stat-label">Female</span>
                    <span class="stat-value">${females}</span>
                    <span class="stat-detail">${Math.round(females / students.length * 100)}%</span>
                </div>
                <div class="stat-icon">♀</div>
            </div>
            <div class="stat-card stat-orange">
                <div class="stat-info">
                    <span class="stat-label">Current Semester</span>
                    <span class="stat-value">Sem ${batchInfo.semester}</span>
                    <span class="stat-detail">${batchInfo.yearSuffix} Year · ${batchInfo.joiningYear}–${batchInfo.passingYear}</span>
                </div>
                <div class="stat-icon">📚</div>
            </div>
        </div>

        ${adminActions}

        <h3 class="section-title">Student Roster</h3>

        <div class="filter-bar">
            <div class="filter-group search-group">
                <label for="search-input">Search</label>
                <input type="text" id="search-input" class="filter-input" placeholder="Search by name or ID..." oninput="filterStudentTable()">
            </div>
            <div class="filter-group">
                <label for="gender-filter">Gender</label>
                <select id="gender-filter" class="filter-select" onchange="filterStudentTable()">
                    <option value="all">All</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
            </div>
            <div class="filter-stats">
                <span class="badge badge-blue" id="filter-count">${students.length} students</span>
            </div>
        </div>

        <div class="table-container">
            <table class="data-table" id="student-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody id="student-tbody"></tbody>
            </table>
        </div>
    `;

    renderStudentRows(students);
}

function renderStudentRows(students) {
    const tbody = document.getElementById('student-tbody');
    tbody.innerHTML = students.map((s, i) => `
        <tr>
            <td>${i + 1}</td>
            <td><strong>${s.id}</strong></td>
            <td>${s.name}</td>
            <td><span class="gender-badge gender-${s.gender.toLowerCase()}">${s.gender === 'M' ? '♂ Male' : '♀ Female'}</span></td>
            <td>${s.email || '—'}</td>
        </tr>
    `).join('');
}

function filterStudentTable() {
    const search = (document.getElementById('search-input')?.value || '').toLowerCase();
    const gender = document.getElementById('gender-filter')?.value || 'all';
    const batchData = appData.batches.find(b => b.year === navState.batch);
    if (!batchData) return;

    let students = batchData.students.filter(s => s.department === navState.dept);
    if (gender !== 'all') students = students.filter(s => s.gender === gender);
    if (search) students = students.filter(s => s.name.toLowerCase().includes(search) || s.id.toLowerCase().includes(search));

    renderStudentRows(students);
    const countEl = document.getElementById('filter-count');
    if (countEl) countEl.textContent = `${students.length} students`;
}

// ===== Level 4: Teams View =====
function renderTeams(container) {
    const teams = navState.teams;
    if (!teams || teams.length === 0) return;

    const deptCode = navState.dept;
    const batchYear = navState.batch;
    const totalStudents = teams.reduce((s, t) => s + t.members.length, 0);
    const colors = ['blue', 'green', 'purple', 'orange', 'cyan'];
    const numGroups = Math.floor(teams.length / 3);
    const totalRotations = teams.length; // Each team gets a turn as presenter
    const audienceTeams = teams.length - 3; // teams acting as audience per round

    // Session timing calculation — 30 min per round
    const presenterMin = 15;
    const reviewerMin = 5;
    const audienceMin = 6;
    const feedbackMin = 4;
    const perRoundMin = 30; // Fixed 30 min per round
    const totalSessionMin = numGroups * perRoundMin;
    const totalSessionHrs = Math.floor(totalSessionMin / 60);
    const totalSessionRemMin = totalSessionMin % 60;

    const editBtnLabel = navState.editMode ? '✅ Done Editing' : '✏️ Edit Teams';
    const editBtnStyle = navState.editMode
        ? 'background:var(--gradient-green);width:auto;padding:10px 20px'
        : 'background:var(--gradient-orange);width:auto;padding:10px 20px';

    const adminBtns = isAdmin ? `
        <button class="btn-primary" style="${editBtnStyle}" onclick="toggleEditMode()">
            ${editBtnLabel}
        </button>
        <button class="btn-primary" style="width:auto;padding:10px 20px;margin-left:auto" onclick="exportCSV()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
        </button>
    ` : '';

    // Build role rotation schedule
    let rotationHTML = '';
    for (let g = 0; g < numGroups; g++) {
        const t1 = g * 3;
        const t2 = g * 3 + 1;
        const t3 = g * 3 + 2;
        const otherTeams = [];
        for (let x = 0; x < teams.length; x++) {
            if (x !== t1 && x !== t2 && x !== t3) otherTeams.push(x + 1);
        }
        const audienceStr = otherTeams.length > 0 ? `Teams ${otherTeams.join(', ')}` : 'None';
        rotationHTML += `
            <div class="rotation-round">
                <div class="round-header">Round ${g + 1}</div>
                <div class="round-roles">
                    <div class="round-role role-presenter">
                        <span class="round-role-icon">🎤</span>
                        <span class="round-role-label">Presenter</span>
                        <span class="round-role-team">Team ${t1 + 1}</span>
                        <span class="round-role-time">15 min</span>
                    </div>
                    <div class="round-role role-reviewer">
                        <span class="round-role-icon">🔍</span>
                        <span class="round-role-label">Reviewer</span>
                        <span class="round-role-team">Team ${t2 + 1}</span>
                        <span class="round-role-time">4–5 min</span>
                    </div>
                    <div class="round-role role-feedback">
                        <span class="round-role-icon">💬</span>
                        <span class="round-role-label">Feedback</span>
                        <span class="round-role-team">Team ${t3 + 1}</span>
                        <span class="round-role-time">4 min</span>
                    </div>
                </div>
                <div class="round-audience">
                    <span class="audience-icon">👥</span>
                    <span class="audience-label">Audience (6 min):</span>
                    <span class="audience-teams">${audienceStr}</span>
                </div>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                </svg>
                Teams — ${getDeptShortName(deptCode)} · ${batchYear}
            </h2>
            <p class="page-subtitle">${teams.length} teams (divisible by 3) · ${totalStudents} students · ${numGroups} rotation rounds</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card stat-purple">
                <div class="stat-info">
                    <span class="stat-label">Teams</span>
                    <span class="stat-value">${teams.length}</span>
                    <span class="stat-detail">${teams[0]?.members.length || 0} per team</span>
                </div>
                <div class="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                    </svg>
                </div>
            </div>
            <div class="stat-card stat-blue">
                <div class="stat-info">
                    <span class="stat-label">Students</span>
                    <span class="stat-value">${totalStudents}</span>
                    <span class="stat-detail">${deptCode} · ${batchYear}</span>
                </div>
                <div class="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                    </svg>
                </div>
            </div>
            <div class="stat-card stat-green">
                <div class="stat-info">
                    <span class="stat-label">Rotation Rounds</span>
                    <span class="stat-value">${numGroups}</span>
                    <span class="stat-detail">3 roles per round</span>
                </div>
                <div class="stat-icon">🔄</div>
            </div>
            <div class="stat-card stat-orange">
                <div class="stat-info">
                    <span class="stat-label">Est. Session Time</span>
                    <span class="stat-value">${totalSessionHrs > 0 ? totalSessionHrs + 'h ' : ''}${totalSessionRemMin}m</span>
                    <span class="stat-detail">~${perRoundMin} min per round</span>
                </div>
                <div class="stat-icon">⏱️</div>
            </div>
        </div>

        <!-- Session Role Structure -->
        <div class="info-section">
            <h3 class="info-section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
                SAM Session Structure
            </h3>
            <div class="session-role-overview">
                <div class="role-overview-card role-presenter-bg">
                    <div class="role-overview-emoji">🎤</div>
                    <div class="role-overview-info">
                        <div class="role-overview-name">Presenter Team</div>
                        <div class="role-overview-time">15 min max</div>
                    </div>
                    <div class="role-overview-desc">Presents the topic to all teams</div>
                </div>
                <div class="role-overview-card role-reviewer-bg">
                    <div class="role-overview-emoji">🔍</div>
                    <div class="role-overview-info">
                        <div class="role-overview-name">Reviewer Team</div>
                        <div class="role-overview-time">4–5 min</div>
                    </div>
                    <div class="role-overview-desc">Reviews & questions the presentation</div>
                </div>
                <div class="role-overview-card role-feedback-bg">
                    <div class="role-overview-emoji">💬</div>
                    <div class="role-overview-info">
                        <div class="role-overview-name">Feedback Team</div>
                        <div class="role-overview-time">4 min</div>
                    </div>
                    <div class="role-overview-desc">Gives constructive feedback</div>
                </div>
                <div class="role-overview-card role-audience-bg">
                    <div class="role-overview-emoji">👥</div>
                    <div class="role-overview-info">
                        <div class="role-overview-name">Audience</div>
                        <div class="role-overview-time">6 min</div>
                    </div>
                    <div class="role-overview-desc">All other teams — observe, participate in Q&A</div>
                </div>
            </div>
            <div class="session-note">
                <strong>🔄 Role Rotation:</strong> Every round, 3 teams rotate through Presenter → Reviewer → Feedback. All remaining ${audienceTeams > 0 ? audienceTeams : ''} teams act as Audience. Total: <strong>${numGroups} rounds</strong> covering all ${teams.length} teams.
            </div>
        </div>

        <!-- Role Rotation Schedule -->
        <div class="info-section">
            <h3 class="info-section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Role Rotation Schedule
            </h3>
            <div class="rotation-schedule" id="rotation-schedule">
                ${rotationHTML}
            </div>
        </div>

        <div class="section-title-row">
            <h3 class="section-title">Generated Teams</h3>
            ${adminBtns}
        </div>

        <div class="teams-container" id="teams-container"></div>
    `;

    // Determine role labels for each team based on rotation
    const teamRoles = {}; // teamIndex -> [{round, role}]
    for (let g = 0; g < numGroups; g++) {
        const t1 = g * 3;
        const t2 = g * 3 + 1;
        const t3 = g * 3 + 2;
        if (!teamRoles[t1]) teamRoles[t1] = [];
        if (!teamRoles[t2]) teamRoles[t2] = [];
        if (!teamRoles[t3]) teamRoles[t3] = [];
        teamRoles[t1].push({ round: g + 1, role: 'Presenter', emoji: '🎤', cls: 'presenter' });
        teamRoles[t2].push({ round: g + 1, role: 'Reviewer', emoji: '🔍', cls: 'reviewer' });
        teamRoles[t3].push({ round: g + 1, role: 'Feedback', emoji: '💬', cls: 'feedback' });
    }

    const tc = document.getElementById('teams-container');
    teams.forEach((team, i) => {
        const color = colors[i % colors.length];
        const roles = teamRoles[i] || [];
        const roleBadge = roles.length > 0
            ? roles.map(r => `<span class="team-role-badge team-role-${r.cls}">${r.emoji} ${r.role} (R${r.round})</span>`).join('')
            : '<span class="team-role-badge team-role-audience">👥 Audience</span>';

        const maleCount = team.members.filter(m => m.gender === 'M').length;
        const femaleCount = team.members.filter(m => m.gender === 'F').length;

        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
            <div class="team-card-header" style="background: var(--gradient-${color})">
                <span class="team-card-title" style="color:#fff">Team ${i + 1}</span>
                <span class="badge" style="background:rgba(255,255,255,0.2);color:#fff">${team.members.length} members</span>
            </div>
            <div class="team-card-role-row">
                ${roleBadge}
                <span class="team-gender-ratio">♂${maleCount} ♀${femaleCount}</span>
            </div>
            ${team.members.map(m => {
            const moveDropdown = navState.editMode ? `
                    <select class="move-select" onchange="moveStudent('${m.id}', ${i}, parseInt(this.value))">
                        <option value="${i}">Team ${i + 1}</option>
                        ${teams.map((_, ti) => ti !== i ? `<option value="${ti}">→ Team ${ti + 1}</option>` : '').join('')}
                    </select>
                ` : '';
            return `
                <div class="team-member ${navState.editMode ? 'edit-mode' : ''}">
                    <div class="member-avatar avatar-${m.gender.toLowerCase()}">
                        ${m.gender === 'M' ? '♂' : '♀'}
                    </div>
                    <div class="member-info">
                        <div class="member-name">${m.name}</div>
                        <div class="member-id">${m.id}</div>
                    </div>
                    ${moveDropdown}
                </div>
                `;
        }).join('')}
        `;
        tc.appendChild(card);
    });
}

// ===== Team Generation Algorithm =====
// Teams must be divisible by 3 for role rotation
// Supports modes: random (gender-balanced), cgpa (CGPA-balanced), manual (random + edit)
function buildTeams(students, teamSize, mode) {
    if (students.length === 0) return [];
    if (!teamSize || teamSize < 2) teamSize = 5;
    if (teamSize > 6) teamSize = 6;
    mode = mode || 'random';

    const allStudents = [...students];
    shuffle(allStudents);

    const males = allStudents.filter(s => s.gender === 'M');
    const females = allStudents.filter(s => s.gender === 'F');
    shuffle(males);
    shuffle(females);

    // Determine the most optimal number of teams automatically.
    // Constraints: 
    // 1. Max members per team <= 6.
    // 2. Number of teams MUST be a multiple of 3 for role rotations.
    const minTeamsToKeepLimit6 = Math.ceil(allStudents.length / 6);
    let numTeams = minTeamsToKeepLimit6;

    // Always bump up to the nearest multiple of 3 to guarantee both constraints (divisible by 3 AND max size <= 6)
    if (numTeams % 3 !== 0) {
        numTeams = Math.ceil(numTeams / 3) * 3;
    }

    if (numTeams < 3) numTeams = 3;

    if (mode === 'cgpa') {
        // CGPA-balanced: snake draft so each team gets similar avg CGPA
        const withCgpa = allStudents.filter(s => s.cgpa !== null && s.cgpa !== undefined);
        const withoutCgpa = allStudents.filter(s => s.cgpa === null || s.cgpa === undefined);
        withCgpa.sort((a, b) => (b.cgpa || 0) - (a.cgpa || 0));

        const teams = Array.from({ length: numTeams }, (_, i) => ({ id: i + 1, members: [] }));
        let teamIdx = 0, direction = 1;
        withCgpa.forEach(s => {
            teams[teamIdx].members.push(s);
            teamIdx += direction;
            if (teamIdx >= numTeams) { teamIdx = numTeams - 1; direction = -1; }
            if (teamIdx < 0) { teamIdx = 0; direction = 1; }
        });
        shuffle(withoutCgpa);
        withoutCgpa.forEach(s => {
            const validTeams = teams.filter(t => t.members.length < 6);
            if (validTeams.length > 0) {
                const smallest = validTeams.reduce((a, b) => a.members.length < b.members.length ? a : b);
                smallest.members.push(s);
            }
        });
        return teams;
    }

    // Default: Random gender-balanced (also used for 'manual' mode)
    const pool = [];
    let mi = 0, fi = 0;
    const maleRatio = males.length / allStudents.length;
    for (let i = 0; i < allStudents.length; i++) {
        const targetMales = Math.round((i + 1) * maleRatio);
        if (mi < males.length && (mi < targetMales || fi >= females.length)) {
            pool.push(males[mi++]);
        } else if (fi < females.length) {
            pool.push(females[fi++]);
        }
    }

    const baseSize = Math.floor(pool.length / numTeams);
    const leftover = pool.length - (baseSize * numTeams);
    const teams = [];
    let idx = 0;
    for (let t = 0; t < numTeams; t++) {
        const members = pool.slice(idx, idx + baseSize);
        teams.push({ id: t + 1, members });
        idx += baseSize;
    }

    if (leftover > 0) {
        const extras = pool.slice(idx);
        shuffle(extras);
        extras.forEach(s => {
            const validTeams = teams.filter(t => t.members.length < 6);
            if (validTeams.length > 0) {
                const smallest = validTeams.reduce((a, b) => a.members.length < b.members.length ? a : b);
                smallest.members.push(s);
            }
        });
    }

    return teams;
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// ===== Manual Team Editing =====
function toggleEditMode() {
    navState.editMode = !navState.editMode;
    render();
}

function moveStudent(studentId, fromTeamIdx, toTeamIdx) {
    const teams = navState.teams;
    if (!teams || fromTeamIdx === toTeamIdx) return;
    const fromTeam = teams[fromTeamIdx];
    const toTeam = teams[toTeamIdx];
    const si = fromTeam.members.findIndex(m => m.id === studentId);
    if (si === -1) return;
    toTeam.members.push(fromTeam.members.splice(si, 1)[0]);
    render();
}

// ===== CSV Export =====
function exportCSV() {
    const teams = navState.teams;
    if (!teams) return;

    let csv = 'Team,Student ID,Name,Gender,Email\n';
    teams.forEach((team, i) => {
        team.members.forEach(m => {
            csv += `Team ${i + 1},${m.id},"${m.name}",${m.gender},${m.email || ''}\n`;
        });
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `teams_${navState.dept}_${navState.batch}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}
