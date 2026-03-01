/**
 * SAM System — Hierarchical Drill-Down Navigation
 * College → Department → Batch → Teams → Students
 */

// ===== Global State =====
let appData = null;
let currentUser = null; // null or { role: string, dept: string|null, canGenerate: boolean }

// Single admin password for all roles: sam@admin
const ADMIN_HASH = '460fed869984ad2465122a0841a35c62c493f5e92c07499fa9c0c57fe86cc146';
const ROLE_PASSWORDS = {
    'principal': ADMIN_HASH,
    'alumni': ADMIN_HASH,
    'hod_ATE': ADMIN_HASH,
    'hod_CSE': ADMIN_HASH,
    'hod_CVE': ADMIN_HASH,
    'hod_CDS': ADMIN_HASH,
    'hod_ECE': ADMIN_HASH,
    'hod_EEE': ADMIN_HASH,
    'hod_IMT': ADMIN_HASH,
    'hod_MCE': ADMIN_HASH,
    'faculty_ATE': ADMIN_HASH,
    'faculty_CSE': ADMIN_HASH,
    'faculty_CVE': ADMIN_HASH,
    'faculty_CDS': ADMIN_HASH,
    'faculty_ECE': ADMIN_HASH,
    'faculty_EEE': ADMIN_HASH,
    'faculty_IMT': ADMIN_HASH,
    'faculty_MCE': ADMIN_HASH,
};


// Navigation state
let navState = {
    level: 'college',   // college | department | batch | teams | sessions | assessments
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

// ===== Role-based Admin Auth =====
let loginState = { role: null, dept: null };

function toggleAdminLogin() {
    if (currentUser) {
        currentUser = null;
        updateUserBadge();
        navState = { level: 'college', dept: null, batch: null, teams: null };
        render();
        return;
    }
    document.getElementById('admin-modal').style.display = 'flex';
    document.getElementById('admin-password').value = '';
    document.getElementById('login-error').style.display = 'none';
}

async function attemptLogin() {
    const pw = document.getElementById('admin-password').value;
    const hash = await sha256(pw);

    if (hash === ADMIN_HASH) {
        currentUser = {
            role: 'Admin',
            dept: null,       // admin sees all departments
            canGenerate: true // admin can generate teams
        };
        updateUserBadge();
        closeAdminLogin();
        navigateTo('college');
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

function closeAdminLogin() {
    document.getElementById('admin-modal').style.display = 'none';
    document.getElementById('admin-password').value = '';
    const inp = document.getElementById('admin-password');
    if (inp) inp.type = 'password';
    const svg = document.getElementById('eye-icon');
    if (svg) svg.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
}

function togglePwEye() {
    const inp = document.getElementById('admin-password');
    const svg = document.getElementById('eye-icon');
    if (!inp || !svg) return;
    if (inp.type === 'password') {
        inp.type = 'text';
        svg.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>';
    } else {
        inp.type = 'password';
        svg.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
    }
}

function updateUserBadge() {
    const badge = document.getElementById('user-badge');
    const btnText = document.getElementById('admin-btn-text');
    const btn = document.getElementById('admin-toggle');

    if (currentUser) {
        badge.innerHTML = `<span>🔑</span> Admin`;
        badge.style.display = 'inline-flex';
        btnText.textContent = 'Logout';
        btn.classList.add('admin-active');
    } else {
        badge.style.display = 'none';
        btnText.textContent = 'Login';
        btn.classList.remove('admin-active');
    }
}

// ===== Navigation =====
function navigateTo(level, dept, batch) {
    navState.level = level;
    navState.dept = dept || null;
    navState.batch = batch || null;
    // Keep teams data when navigating to sessions or back to teams
    if (level !== 'sessions' && level !== 'teams') navState.teams = null;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToSessions() {
    navState.level = 'sessions';
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToAssessments() {
    navState.level = 'assessments';
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateBackToTeams() {
    navState.level = 'teams';
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
        const isOnBatch = navState.level === 'batch';
        items.push(`<span class="breadcrumb-item ${isOnBatch ? 'active' : 'clickable'}" 
            onclick="navigateTo('batch','${navState.dept}',${navState.batch})">${navState.batch} Batch</span>`);
    }

    if (navState.level === 'teams' || navState.level === 'sessions' || navState.level === 'assessments') {
        items.push(`<span class="breadcrumb-sep">›</span>`);
        items.push(`<span class="breadcrumb-item ${navState.level === 'teams' ? 'active' : 'clickable'}" 
            onclick="navigateBackToTeams()">Teams</span>`);
    }

    if (navState.level === 'sessions' || navState.level === 'assessments') {
        items.push(`<span class="breadcrumb-sep">›</span>`);
        items.push(`<span class="breadcrumb-item ${navState.level === 'sessions' ? 'active' : 'clickable'}" 
            onclick="navigateToSessions()">Session Schedule</span>`);
    }

    if (navState.level === 'assessments') {
        items.push(`<span class="breadcrumb-sep">›</span>`);
        items.push(`<span class="breadcrumb-item active">Assessment Generation</span>`);
    }

    bc.innerHTML = items.join('');
}

function getDeptName(code) {
    const names = {
        'ATE': 'Automobile Engineering',
        'CSE': 'Computer Science & Engineering',
        'CVE': 'Civil Engineering',
        'CDS': 'Data Science',
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
        'CDS': 'Data Science',
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
        case 'sessions': renderSessions(main); break;
        case 'assessments': renderAssessments(main); break;
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

    let activeDepts = Object.values(deptTotals).filter(d => d.students > 0);

    // Filter departments if user has department-level restriction (HOD/Faculty)
    if (currentUser && currentUser.dept) {
        activeDepts = activeDepts.filter(d => d.code === currentUser.dept);
    }

    // If user is restricted to a single department, go straight to it
    if (currentUser && currentUser.dept && activeDepts.length === 1) {
        navigateTo('department', activeDepts[0].code);
        return;
    }

    container.innerHTML = `
        <div class="hero-header">
            <h2 class="hero-title">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Government College of Engineering, Erode
            </h2>
            <p class="hero-subtitle">Student Alumni Mentorship (SAM) System</p>
            
            <div class="hero-stats-row">
                <div class="hero-stat-pill">
                    <span class="pill-value">${totalStudents}</span>
                    <span class="pill-label">Students</span>
                </div>
                <div class="hero-stat-pill">
                    <span class="pill-value">${activeDepts.length}</span>
                    <span class="pill-label">Departments</span>
                </div>
                <div class="hero-stat-pill">
                    <span class="pill-value">${appData.batches.length}</span>
                    <span class="pill-label">Batches</span>
                </div>
            </div>

            <button class="btn-primary" style="margin-top: 2rem; padding: 14px 32px; font-size: 1.05rem;" onclick="renderDepartmentGrid()">
                Browse Departments
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left:8px">
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
            </button>
        </div>

        <div id="dept-grid-container" style="display:none; margin-top:3rem;">
            <h3 class="section-title">Select a Department</h3>
            <div class="dept-grid" id="dept-grid"></div>
        </div>
    `;

    // Store activeDepts to window so renderDepartmentGrid can access it
    window.currentActiveDepts = activeDepts;
}

function renderDepartmentGrid() {
    const activeDepts = window.currentActiveDepts || [];
    const container = document.getElementById('dept-grid-container');
    const grid = document.getElementById('dept-grid');
    if (!container || !grid) return;

    container.style.display = 'block';
    grid.innerHTML = '';

    const colors = ['blue', 'green', 'purple', 'orange', 'cyan', 'blue', 'green', 'purple'];

    // Render department cards
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

    // Scroll down to show it
    window.scrollBy({ top: 400, behavior: 'smooth' });
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
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
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
                            <polyline points="9 18 15 12 9 6" />
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

    const adminActions = (currentUser && currentUser.canGenerate) ? `
            <div class="admin-actions">
            <h3 class="section-title">⚡ Admin: Generate Teams</h3>
            <div class="team-controls">
                <div class="filter-group">
                    <label>Members per Team</label>
                    <select id="team-size" class="filter-select">
                        <option value="3">3 members</option>
                        <option value="4" selected>4 members</option>
                        <option value="5">5 members</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Formation Mode</label>
                    <select id="formation-mode" class="filter-select">
                        <option value="random">🎲 Random Balanced</option>
                        <option value="cgpa">📊 CGPA Balanced</option>
                        <option value="manual">✏️ Manual Arrange</option>
                    </select>
                </div>
                <button class="btn-primary" style="width:auto;padding:10px 20px" 
                    onclick="generateAndShowTeams('${deptCode}',${batchYear}, parseInt(document.getElementById('team-size').value), document.getElementById('formation-mode').value)">
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
                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
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

// ===== Level 4: Teams View (Rosters only) =====
function renderTeams(container) {
    const teams = navState.teams;
    if (!teams || teams.length === 0) return;

    const deptCode = navState.dept;
    const batchYear = navState.batch;
    const totalStudents = teams.reduce((s, t) => s + t.members.length, 0);
    const colors = ['blue', 'green', 'purple', 'orange', 'cyan'];
    const numSessions = teams.length;
    const perRoundMin = 30;
    const totalMin = numSessions * perRoundMin;
    const hrs = Math.floor(totalMin / 60);
    const remMin = totalMin % 60;

    const editBtnLabel = navState.editMode ? '✅ Done Editing' : '✏️ Edit Teams';
    const editBtnStyle = navState.editMode
        ? 'background:var(--gradient-green);width:auto;padding:10px 20px'
        : 'background:var(--gradient-orange);width:auto;padding:10px 20px';

    const adminBtns = (currentUser && currentUser.canGenerate) ? `
        <button class="btn-primary" style="${editBtnStyle}" onclick="toggleEditMode()">
            ${editBtnLabel}
        </button>
        <button class="btn-primary" style="width:auto;padding:10px 20px" onclick="exportCSV()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
        </button>
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
                Team Rosters — ${getDeptShortName(deptCode)} · ${batchYear}
            </h2>
            <p class="page-subtitle">${teams.length} teams · ${totalStudents} students · ${numSessions} sessions</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card stat-purple">
                <div class="stat-info">
                    <span class="stat-label">Teams</span>
                    <span class="stat-value">${teams.length}</span>
                    <span class="stat-detail">${teams[0]?.members.length || 0} members/team</span>
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
                    <span class="stat-label">Sessions</span>
                    <span class="stat-value">${numSessions}</span>
                    <span class="stat-detail">Each team presents once</span>
                </div>
                <div class="stat-icon">🔄</div>
            </div>
            <div class="stat-card stat-orange">
                <div class="stat-info">
                    <span class="stat-label">Total Duration</span>
                    <span class="stat-value">${hrs > 0 ? hrs + 'h ' : ''}${remMin}m</span>
                    <span class="stat-detail">${perRoundMin} min per session</span>
                </div>
                <div class="stat-icon">⏱️</div>
            </div>
        </div>

        <!-- Team Rosters -->
        <div class="rt-section">
            <div class="rt-section-header">
                <div class="rt-section-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                        <path d="M16 3.13a4 4 0 010 7.75"/>
                    </svg>
                    Team Rosters
                </div>
                <div style="display:flex;gap:8px;flex-wrap:wrap">${adminBtns}</div>
            </div>
            <div class="teams-container" id="teams-container"></div>
        </div>

        <!-- Session CTA Banner -->
        <div class="session-cta-banner" onclick="navigateToSessions()">
            <div class="cta-left">
                <div class="cta-icon">📋</div>
                <div class="cta-text">
                    <div class="cta-title">View Session Schedule</div>
                    <div class="cta-sub">${numSessions} sessions · ${hrs > 0 ? hrs + 'h ' : ''}${remMin}m total · Round-Robin format</div>
                </div>
            </div>
            <div class="cta-arrow">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
            </div>
        </div>
    `;

    // Build a map: teamIndex -> presenter session number (1-indexed)
    const presenterSession = {};
    for (let s = 0; s < teams.length; s++) {
        presenterSession[s] = s + 1; // team s is presenter in session s+1
    }

    const tc = document.getElementById('teams-container');
    teams.forEach((team, i) => {
        const color = colors[i % colors.length];
        const maleCount = team.members.filter(m => m.gender === 'M').length;
        const femaleCount = team.members.filter(m => m.gender === 'F').length;
        const sessNum = String(presenterSession[i]).padStart(2, '0');
        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
        <div class="team-card-header" style="background: var(--gradient-${color})">
                <span class="team-card-title" style="color:#fff">Team ${i + 1}</span>
                <span class="team-sess-id">Session ${sessNum}</span>
                <span class="badge" style="background:rgba(255,255,255,0.2);color:#fff">${team.members.length} members</span>
            </div>
        <div class="team-card-role-row">
            <span class="team-gender-ratio" style="margin-left:auto;">♂${maleCount} ♀${femaleCount}</span>
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

// ===== Level 5: Session Schedule =====

// Period time slots (no Lab; Periods 3-4 are still morning in Indian college schedules)
const PERIOD_TYPES = {
    morning1: { label: 'Morning (Periods 1-2)', shortLabel: 'P1-2', startH: 9, startM: 0, durMins: 100, color: '#2563eb' },
    morning2: { label: 'Morning (Periods 3-4)', shortLabel: 'P3-4', startH: 11, startM: 0, durMins: 90, color: '#0891b2' },
    afternoon: { label: 'Afternoon (Periods 5-6)', shortLabel: 'P5-6', startH: 13, startM: 45, durMins: 90, color: '#7c3aed' },
    evening: { label: 'Evening (Periods 7-8)', shortLabel: 'P7-8', startH: 15, startM: 30, durMins: 90, color: '#d97706' },
};
const DAY_SLOTS = { 2: ['morning1', 'morning2'], 3: ['morning1', 'morning2', 'afternoon'] };
const DAY_NAMES_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_NAMES_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

function addMins(h, m, mins) {
    const t = h * 60 + m + mins;
    return String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0');
}

function generateSessionCalendar(teams, config) {
    const { startDate, endDate, sessionsPerDay, activeDays, revealMode, reviewerMap } = config;
    const N = teams.length;
    const reviewers = reviewerMap ? reviewerMap.reviewers : teams.map((_, i) => (i + 1) % N);
    const feedbacks = reviewerMap ? reviewerMap.feedbacks : teams.map((_, i) => (i + 2) % N);
    const slots = DAY_SLOTS[sessionsPerDay] || DAY_SLOTS[2];
    const sessions = [], todayStr = new Date().toISOString().slice(0, 10);
    let idx = 0;
    const cur = new Date(startDate + 'T00:00:00'), endD = new Date(endDate + 'T00:00:00');
    while (cur <= endD && idx < N) {
        const dow = cur.getDay();
        if (activeDays.includes(dow)) {
            const dateStr = cur.toISOString().slice(0, 10);
            const isPast = dateStr < todayStr, isToday = dateStr === todayStr;
            for (let s = 0; s < slots.length && idx < N; s++) {
                const pk = slots[s], pt = PERIOD_TYPES[pk];
                sessions.push({
                    sessNum: idx + 1, date: new Date(cur), dateStr,
                    dayName: DAY_NAMES_SHORT[dow], dayFull: DAY_NAMES_FULL[dow],
                    periodKey: pk,
                    startTime: String(pt.startH).padStart(2, '0') + ':' + String(pt.startM).padStart(2, '0'),
                    endTime: addMins(pt.startH, pt.startM, pt.durMins),
                    presenterIdx: idx, reviewerIdx: reviewers[idx], feedbackIdx: feedbacks[idx],
                    revealed: revealMode === 'all' || isPast || isToday,
                });
                idx++;
            }
        }
        cur.setDate(cur.getDate() + 1);
    }
    return sessions;
}

function buildRandomReviewerMap(N) {
    const rev = Array.from({ length: N }, (_, i) => (i + 1) % N);
    const fb = Array.from({ length: N }, (_, i) => (i + 2) % N);
    for (let i = N - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); if (rev[j] !== i && rev[i] !== j) [rev[i], rev[j]] = [rev[j], rev[i]]; }
    for (let i = N - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); if (fb[j] !== i && fb[i] !== j && rev[i] !== fb[j] && rev[j] !== fb[i]) [fb[i], fb[j]] = [fb[j], fb[i]]; }
    return { reviewers: rev, feedbacks: fb };
}

function renderSessions(container) {
    const teams = navState.teams;
    if (!teams || teams.length === 0) { navigateBackToTeams(); return; }
    const deptCode = navState.dept, batchYear = navState.batch, N = teams.length;
    const cal = navState.calendarConfig || null;
    const todayStr = new Date().toISOString().slice(0, 10);
    const defEnd = new Date(); defEnd.setMonth(defEnd.getMonth() + 3);
    const defEndStr = defEnd.toISOString().slice(0, 10);
    const savedSpd = cal ? (cal.sessionsPerDay || 2) : 2;

    /* ===== Config Panel ===== */
    const configPanel = `<div class="cal-config-panel">
        <div class="cal-config-title">⚙️ Schedule Configuration</div>
        <div class="cal-config-grid">
            <div class="cal-field"><label>Start Date</label>
                <input type="date" id="calStartDate" value="${cal ? cal.startDate : todayStr}"></div>
            <div class="cal-field"><label>End Date</label>
                <input type="date" id="calEndDate" value="${cal ? cal.endDate : defEndStr}"></div>
            <div class="cal-field"><label>Sessions per Day</label>
                <select id="calSessPerDay">
                    <option value="2" ${savedSpd === 2 ? 'selected' : ''}>2 sessions / day (P1-2 &amp; P3-4 Morning)</option>
                    <option value="3" ${savedSpd === 3 ? 'selected' : ''}>3 sessions / day (+ P5-6 Afternoon)</option>
                </select></div>
            <div class="cal-field"><label>Role Visibility</label>
                <select id="calRevealMode">
                    <option value="presenter" ${!cal || cal.revealMode === 'presenter' ? 'selected' : ''}>Reviewer &amp; Feedback hidden until session day</option>
                    <option value="all" ${cal && cal.revealMode === 'all' ? 'selected' : ''}>Show all roles immediately</option>
                </select></div>
        </div>
        <div style="font-size:.78rem;color:var(--text-muted);margin-bottom:8px;">
            <strong style="color:var(--text-secondary);">Active Days:</strong> Monday – Friday only (Sat &amp; Sun are leave days)
        </div>
        <div class="cal-actions">
            <button class="btn-primary" style="width:auto;padding:10px 28px;" onclick="applyCalendarConfig()">📅 Generate Schedule</button>
            ${cal ? '<button class="btn-primary" style="width:auto;padding:10px 20px;background:var(--gradient-orange);" onclick="randomiseCalendarRoles()">🔀 Randomise Roles</button>' : ''}
            <span style="font-size:.8rem;color:var(--text-muted);">${N} teams · ${N} sessions needed</span>
        </div>
    </div>`;

    /* ===== Schedule Table & Day Cards ===== */
    let scheduleHTML = '', dayCardsHTML = '';

    if (cal && cal.sessions && cal.sessions.length > 0) {
        const sessions = cal.sessions;
        const spd = cal.sessionsPerDay || 2;
        const slotKeys = DAY_SLOTS[spd] || DAY_SLOTS[2];

        // Group by day
        const byDay = {};
        sessions.forEach(s => { if (!byDay[s.dateStr]) byDay[s.dateStr] = []; byDay[s.dateStr].push(s); });
        const uniqueDays = [...new Map(sessions.map(s => [s.dateStr, s])).values()];

        // Header columns
        const hdrCells = slotKeys.map(pk => {
            const pt = PERIOD_TYPES[pk];
            return `<th class="sched-col-header" style="border-left:3px solid ${pt.color}40;">
                <div style="color:${pt.color};font-weight:800;font-size:.76rem;">${pt.shortLabel}</div>
                <div style="font-size:.68rem;color:var(--text-muted);">${pt.label}</div>
                <div style="font-size:.65rem;color:var(--text-muted);">${String(pt.startH).padStart(2, '0')}:${String(pt.startM).padStart(2, '0')} – ${addMins(pt.startH, pt.startM, pt.durMins)}</div>
            </th>`;
        }).join('');

        // Table rows
        const tRows = uniqueDays.map(fs => {
            const daySess = byDay[fs.dateStr];
            const isToday = fs.dateStr === todayStr, isPast = fs.dateStr < todayStr;
            const dl = fs.date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
            const cells = slotKeys.map(pk => {
                const s = daySess.find(x => x.periodKey === pk);
                if (!s) return '<td class="sched-empty-cell"><span class="sched-empty">—</span></td>';
                const pt = PERIOD_TYPES[pk];
                const p = `Team ${s.presenterIdx + 1}`, r = `Team ${s.reviewerIdx + 1}`, fb = `Team ${s.feedbackIdx + 1}`;
                return `<td class="sched-slot-cell" style="border-top:3px solid ${pt.color};">
                    <div class="sched-sess-num">#${String(s.sessNum).padStart(2, '0')}</div>
                    <div class="sched-role-row"><span class="sched-chip sched-presenter">🎤 ${p}</span></div>
                    ${s.revealed
                        ? `<div class="sched-role-row" style="margin-top:4px;"><span class="sched-chip sched-reviewer">🔍 ${r}</span><span class="sched-chip sched-feedback">💬 ${fb}</span></div>`
                        : `<div class="sched-role-row" style="margin-top:4px;"><span class="sched-chip sched-locked">🔒 Roles on day</span></div>`}
                </td>`;
            }).join('');
            return `<tr class="${isToday ? 'sched-today-row' : ''} ${isPast ? 'sched-past-row' : ''}">
                <td class="sched-date-cell">
                    <div class="sched-date-day">${fs.dayFull.slice(0, 3).toUpperCase()}</div>
                    <div class="sched-date-num ${isToday ? 'sched-date-today' : ''}">${dl}</div>
                    ${isToday ? '<div class="sched-today-badge">TODAY</div>' : ''}
                    ${isPast ? '<div class="sched-past-badge">DONE</div>' : ''}
                </td>${cells}</tr>`;
        }).join('');

        const legend = slotKeys.map(k => `<span style="font-size:.72rem;font-weight:700;padding:3px 10px;border-radius:10px;background:${PERIOD_TYPES[k].color}18;color:${PERIOD_TYPES[k].color};">${PERIOD_TYPES[k].shortLabel} ${PERIOD_TYPES[k].label}</span>`).join('');
        const statusOk = sessions.length >= N
            ? `<div class="sched-status-ok">✅ All ${N} sessions scheduled across ${uniqueDays.length} working days (Mon–Fri).</div>`
            : `<div class="sched-status-warn">⚠️ Only ${sessions.length}/${N} sessions fit. Extend the End Date to accommodate all teams.</div>`;

        scheduleHTML = `<div class="rt-section" style="margin-bottom:1.5rem;">
            <div class="rt-section-header">
                <div class="rt-section-title">📅 Session Timetable — ${sessions.length} sessions</div>
                <div style="display:flex;gap:6px;flex-wrap:wrap;">${legend}</div>
            </div>
            <div class="sched-table-wrap">
                <table class="sched-table">
                    <thead><tr><th class="sched-date-header">DATE</th>${hdrCells}</tr></thead>
                    <tbody>${tRows}</tbody>
                </table>
            </div>${statusOk}</div>`;

        // Day cards
        const dCards = uniqueDays.map((fs, di) => {
            const daySess = byDay[fs.dateStr];
            const isToday = fs.dateStr === todayStr, isPast = fs.dateStr < todayStr;
            const dl2 = fs.date.toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
            const sItems = daySess.map(s => {
                const pt = PERIOD_TYPES[s.periodKey];
                return `<div class="sched-sess-item">
                    <div class="sched-sess-item-header" style="border-left:3px solid ${pt.color};">
                        <div class="sched-sess-item-num" style="background:${pt.color}18;color:${pt.color};">#${String(s.sessNum).padStart(2, '0')}</div>
                        <div style="font-size:.82rem;font-weight:700;color:var(--text-primary);">${pt.label} &nbsp;·&nbsp; ${s.startTime} – ${s.endTime}</div>
                    </div>
                    <div class="sched-roles-inline">
                        <span class="sched-chip sched-presenter">🎤 Team ${s.presenterIdx + 1} — Presenter</span>
                        ${s.revealed
                        ? `<span class="sched-chip sched-reviewer">🔍 Team ${s.reviewerIdx + 1} — Reviewer</span><span class="sched-chip sched-feedback">💬 Team ${s.feedbackIdx + 1} — Feedback</span>`
                        : `<span class="sched-chip sched-locked">🔒 Reviewer &amp; Feedback revealed on ${s.dateStr}</span>`}
                    </div>
                </div>`;
            }).join('');
            return `<div class="sched-day-card ${isToday ? 'sched-day-today' : ''}" style="animation-delay:${di * .04}s">
                <div class="sched-day-header">
                    <div><div class="sched-day-name">${dl2}</div>
                        <div class="sched-day-meta">${daySess.length} session${daySess.length > 1 ? 's' : ''} scheduled</div></div>
                    ${isToday ? '<span class="sched-day-badge sched-badge-today">TODAY</span>' : ''}
                    ${isPast ? '<span class="sched-day-badge sched-badge-done">COMPLETED</span>' : ''}
                </div>
                <div class="sched-sess-list">${sItems}</div>
            </div>`;
        }).join('');

        dayCardsHTML = `<div class="rt-section" style="margin-bottom:1.5rem;">
            <div class="rt-section-header">
                <div class="rt-section-title">📋 Day-wise Session Details</div>
                <span style="font-size:.8rem;color:var(--text-muted);">${uniqueDays.length} working days</span>
            </div>
            <div class="sched-day-cards">${dCards}</div>
        </div>`;
    }

    /* ===== Round-Robin Reference ===== */
    const sessionColors = ['blue', 'green', 'purple', 'orange', 'cyan'];
    let rrRows = '';
    for (let s = 0; s < N; s++) {
        const pt = s, rt = (s + 1) % N, ft = (s + 2) % N, c = sessionColors[s % sessionColors.length];
        const aud = Array.from({ length: N }, (_, i) => i).filter(i => i !== pt && i !== rt && i !== ft);
        rrRows += `<tr class="rt-row">
            <td><span class="rt-sess-badge rt-badge-${c}">${String(s + 1).padStart(2, '0')}</span></td>
            <td><span class="rt-team-chip rt-presenter">🎤 Team ${pt + 1}</span></td>
            <td><span class="rt-team-chip rt-reviewer">🔍 Team ${rt + 1}</span></td>
            <td><span class="rt-team-chip rt-feedback">💬 Team ${ft + 1}</span></td>
            <td class="rt-aud-cell">${aud.map(n => `<span class="rt-aud-chip">T${n + 1}</span>`).join('') || '<span style="color:var(--text-muted);font-size:.75rem">—</span>'}</td>
        </tr>`;
    }

    container.innerHTML = `
    <div class="page-header">
        <h2 class="page-title">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
            </svg>
            Session Schedule
        </h2>
        <p class="page-subtitle">${getDeptShortName(deptCode)} · ${batchYear} Batch · ${N} teams · Mon–Fri only</p>
    </div>
    ${configPanel}
    ${scheduleHTML}
    ${dayCardsHTML}
    <div class="rt-section" style="margin-bottom:1.5rem;">
        <div class="rt-section-header">
            <div class="rt-section-title">🔄 Round-Robin Role Rotation Reference</div>
            <div class="rt-legend">
                <span class="rt-legend-chip rt-presenter">🎤 Presenter</span>
                <span class="rt-legend-chip rt-reviewer">🔍 Reviewer</span>
                <span class="rt-legend-chip rt-feedback">💬 Feedback</span>
            </div>
        </div>
        <div class="rt-table-wrap">
            <table class="rt-table">
                <thead><tr><th>Session</th><th>🎤 Presenter</th><th>🔍 Reviewer</th><th>💬 Feedback</th><th>👥 Audience</th></tr></thead>
                <tbody>${rrRows}</tbody>
            </table>
        </div>
    </div>
    <div class="assess-cta-banner" onclick="navigateToAssessments()">
        <div class="cta-left">
            <div class="cta-icon">📋</div>
            <div class="cta-text">
                <div class="cta-title">View Assignment Generation</div>
                <div class="cta-sub">Each team has been automatically assigned a unique syllabus topic unit-wise</div>
            </div>
        </div>
        <div class="cta-arrow"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></div>
    </div>`;
}

function applyCalendarConfig() {
    const startDate = document.getElementById('calStartDate')?.value;
    const endDate = document.getElementById('calEndDate')?.value;
    const spd = parseInt(document.getElementById('calSessPerDay')?.value || '2');
    const revealMode = document.getElementById('calRevealMode')?.value || 'presenter';
    if (!startDate || !endDate || endDate < startDate) {
        alert('Please set a valid start and end date.');
        return;
    }
    const teams = navState.teams;
    const reviewerMap = (navState.calendarConfig && navState.calendarConfig.reviewerMap)
        ? navState.calendarConfig.reviewerMap
        : buildRandomReviewerMap(teams.length);
    const config = { startDate, endDate, sessionsPerDay: spd, activeDays: [1, 2, 3, 4, 5], revealMode, reviewerMap };
    config.sessions = generateSessionCalendar(teams, config);
    navState.calendarConfig = config;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function randomiseCalendarRoles() {
    if (!navState.calendarConfig) return;
    navState.calendarConfig.reviewerMap = buildRandomReviewerMap(navState.teams.length);
    navState.calendarConfig.sessions = generateSessionCalendar(navState.teams, navState.calendarConfig);
    render();
}

function buildTeams(students, teamSize, mode) {
    if (students.length === 0) return [];
    mode = mode || 'random';

    // Constraints:
    // Minimum members per team = 4 (no teams of 2 or 3)
    // Maximum members per team = 5
    // Maximum number of teams = 15
    const MIN_PER_TEAM = 4;
    const MAX_PER_TEAM = 5;
    const MAX_TEAMS = 15;

    const allStudents = [...students];
    shuffle(allStudents);

    // 1. Calculate number of teams
    // Must not exceed MAX_TEAMS.
    // Must be able to fit all students such that no team has < MIN_PER_TEAM.
    let numTeams = Math.ceil(allStudents.length / MAX_PER_TEAM); // Absolute min teams to fit everyone
    
    // We want to maximize the number of teams up to MAX_TEAMS, 
    // BUT we cannot have teams smaller than MIN_PER_TEAM (4).
    // So the maximum possible teams is floor(students / 4)
    let possibleMaxTeams = Math.floor(allStudents.length / MIN_PER_TEAM);
    
    // Apply hard cap of 15 teams
    if (possibleMaxTeams > MAX_TEAMS) possibleMaxTeams = MAX_TEAMS;

    // Default to the max possible teams that still allow at least 4 members per team
    numTeams = possibleMaxTeams;
    
    // Safeguard: if there are very few students (e.g., 3), just put them in 1 team 
    // (though rule says no 3, we can't create teams out of thin air if total < 4)
    if (allStudents.length > 0 && numTeams < 1) numTeams = 1;

    // 2. Gender ratio preparation
    const males = allStudents.filter(s => s.gender === 'M');
    const females = allStudents.filter(s => s.gender === 'F');
    shuffle(males);
    shuffle(females);
    const maleRatio = males.length / (allStudents.length || 1);

    let teams = Array.from({ length: numTeams }, (_, i) => ({ id: i + 1, members: [] }));

    if (mode === 'cgpa') {
        const withCgpa = allStudents.filter(s => s.cgpa !== null && s.cgpa !== undefined);
        const withoutCgpa = allStudents.filter(s => s.cgpa === null || s.cgpa === undefined);
        withCgpa.sort((a, b) => (b.cgpa || 0) - (a.cgpa || 0));

        let teamIdx = 0, direction = 1;
        withCgpa.forEach(s => {
            if (teams[teamIdx].members.length < MAX_PER_TEAM) {
                teams[teamIdx].members.push(s);
            } else {
                // Find next available team
                const avail = teams.find(t => t.members.length < MAX_PER_TEAM);
                if (avail) avail.members.push(s);
            }
            teamIdx += direction;
            if (teamIdx >= numTeams) { teamIdx = numTeams - 1; direction = -1; }
            if (teamIdx < 0) { teamIdx = 0; direction = 1; }
        });
        shuffle(withoutCgpa);
        withoutCgpa.forEach(s => {
            const validTeams = teams.filter(t => t.members.length < MAX_PER_TEAM);
            if (validTeams.length > 0) {
                const smallest = validTeams.reduce((a, b) => a.members.length < b.members.length ? a : b);
                smallest.members.push(s);
            }
        });
    } else {
        // Strict gender-balanced distribution per team
        // Calculate exact target male/female count per team
        let mIdx = 0, fIdx = 0;
        
        // Distribute base sizes to all teams first
        for (let t = 0; t < numTeams; t++) {
            let targetSize = Math.floor(allStudents.length / numTeams);
            if (t < allStudents.length % numTeams) targetSize++; // distribute remainder
            
            let targetMales = Math.round(targetSize * maleRatio);
            
            // Fill team
            for (let i = 0; i < targetSize; i++) {
                if (teams[t].members.filter(m => m.gender === 'M').length < targetMales && mIdx < males.length) {
                    teams[t].members.push(males[mIdx++]);
                } else if (fIdx < females.length) {
                    teams[t].members.push(females[fIdx++]);
                } else if (mIdx < males.length) {
                    // Fallback if we run out of females
                    teams[t].members.push(males[mIdx++]);
                }
            }
        }
    }

    return enforceMinSize(teams, MIN_PER_TEAM, MAX_PER_TEAM);
}

// Ensures no team has fewer than MIN members by absorbing tiny teams into larger ones
function enforceMinSize(teams, min, max) {
    // Separate undersized teams
    const ok = teams.filter(t => t.members.length >= min);
    const tooSmall = teams.filter(t => t.members.length < min);

    // Collect members of undersized teams
    const orphans = [];
    tooSmall.forEach(t => orphans.push(...t.members));
    shuffle(orphans);

    // Try to absorb orphans into teams that still have room up to MAX (5)
    orphans.forEach(s => {
        const room = ok.filter(t => t.members.length < max);
        if (room.length > 0) {
            const smallest = room.reduce((a, b) => a.members.length < b.members.length ? a : b);
            smallest.members.push(s);
        } else if (ok.length > 0) {
            // Force push if strictly needed to avoid orphans, even if it exceeds max slightly
            const smallest = ok.reduce((a, b) => a.members.length < b.members.length ? a : b);
            smallest.members.push(s);
        }
    });

    // Re-number teams after potential merges
    ok.forEach((t, i) => t.id = i + 1);
    return ok;
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
            csv += `Team ${i + 1},${m.id}, "${m.name}", ${m.gender},${m.email || ''} \n`;
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

// ===== Syllabus Data (Unit-wise assessment topics per dept + regulation) =====
const SYLLABUS_DATA = {
    R2021: {
        ATE: [
            { unit: 1, title: 'Engine Components & Working Principles', co: 'CO1', complexity: 'Medium' },
            { unit: 1, title: 'Fuel Systems and Carburetion', co: 'CO1', complexity: 'Medium' },
            { unit: 1, title: 'Air Intake and Exhaust Systems', co: 'CO1', complexity: 'Hard' },
            { unit: 2, title: 'Power Transmission Systems', co: 'CO2', complexity: 'Medium' },
            { unit: 2, title: 'Clutch and Gearbox Mechanisms', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'Differential and Drive Shaft', co: 'CO2', complexity: 'Medium' },
            { unit: 3, title: 'Steering Geometry and Alignment', co: 'CO3', complexity: 'Medium' },
            { unit: 3, title: 'Suspension System Types', co: 'CO3', complexity: 'Easy' },
            { unit: 3, title: 'Braking Systems and ABS', co: 'CO3', complexity: 'Hard' },
            { unit: 4, title: 'Vehicle Dynamics and Handling', co: 'CO4', complexity: 'Hard' },
            { unit: 4, title: 'Automotive Electrical Systems', co: 'CO4', complexity: 'Medium' },
            { unit: 5, title: 'EV Technologies and Hybrid Vehicles', co: 'CO5', complexity: 'Hard' }
        ],
        CSE: [
            { unit: 1, title: 'Operating System Concepts & Process Management', co: 'CO1', complexity: 'Medium' },
            { unit: 1, title: 'CPU Scheduling Algorithms', co: 'CO1', complexity: 'Hard' },
            { unit: 1, title: 'Deadlock Detection and Prevention', co: 'CO1', complexity: 'Hard' },
            { unit: 2, title: 'Memory Management and Paging', co: 'CO2', complexity: 'Medium' },
            { unit: 2, title: 'Virtual Memory and Thrashing', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'File System Organization', co: 'CO2', complexity: 'Medium' },
            { unit: 3, title: 'Computer Networks – OSI Model', co: 'CO3', complexity: 'Medium' },
            { unit: 3, title: 'TCP/IP Protocol Stack', co: 'CO3', complexity: 'Medium' },
            { unit: 3, title: 'Routing Protocols (RIP, OSPF, BGP)', co: 'CO3', complexity: 'Hard' },
            { unit: 4, title: 'Database Normalization and ER Diagrams', co: 'CO4', complexity: 'Medium' },
            { unit: 4, title: 'SQL Queries and Transactions', co: 'CO4', complexity: 'Easy' },
            { unit: 5, title: 'Cloud Computing and Virtualization', co: 'CO5', complexity: 'Hard' }
        ],
        CVE: [
            { unit: 1, title: 'Stress, Strain and Elasticity Concepts', co: 'CO1', complexity: 'Medium' },
            { unit: 1, title: 'Types of Beams and Loads', co: 'CO1', complexity: 'Easy' },
            { unit: 1, title: 'Shear Force and Bending Moment Diagrams', co: 'CO1', complexity: 'Hard' },
            { unit: 2, title: 'Torsion in Circular Shafts', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'Columns and Struts – Euler\'s Theory', co: 'CO2', complexity: 'Medium' },
            { unit: 2, title: 'Slope and Deflection in Beams', co: 'CO2', complexity: 'Hard' },
            { unit: 3, title: 'Soil Classification and Compaction', co: 'CO3', complexity: 'Medium' },
            { unit: 3, title: 'Seepage and Permeability', co: 'CO3', complexity: 'Medium' },
            { unit: 3, title: 'Bearing Capacity of Soil', co: 'CO3', complexity: 'Hard' },
            { unit: 4, title: 'Design of RCC Beams and Slabs', co: 'CO4', complexity: 'Hard' },
            { unit: 4, title: 'Design of Columns and Footings', co: 'CO4', complexity: 'Hard' },
            { unit: 5, title: 'Surveying Techniques and Instruments', co: 'CO5', complexity: 'Medium' }
        ],
        CDS: [
            { unit: 1, title: 'Python for Data Science – NumPy & Pandas', co: 'CO1', complexity: 'Medium' },
            { unit: 1, title: 'Data Wrangling and Preprocessing', co: 'CO1', complexity: 'Medium' },
            { unit: 1, title: 'Exploratory Data Analysis (EDA)', co: 'CO1', complexity: 'Medium' },
            { unit: 2, title: 'Supervised Learning – Regression Models', co: 'CO2', complexity: 'Medium' },
            { unit: 2, title: 'Classification Algorithms (KNN, SVM, Trees)', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'Model Evaluation Metrics and Cross-Validation', co: 'CO2', complexity: 'Hard' },
            { unit: 3, title: 'Unsupervised Learning – Clustering', co: 'CO3', complexity: 'Medium' },
            { unit: 3, title: 'Dimensionality Reduction (PCA, t-SNE)', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: 'Association Rule Mining', co: 'CO3', complexity: 'Medium' },
            { unit: 4, title: 'Deep Learning Fundamentals and CNNs', co: 'CO4', complexity: 'Hard' },
            { unit: 4, title: 'Natural Language Processing Basics', co: 'CO4', complexity: 'Hard' },
            { unit: 5, title: 'Big Data Technologies – Hadoop & Spark', co: 'CO5', complexity: 'Hard' }
        ],
        ECE: [
            { unit: 1, title: 'Semiconductor Devices – Diodes and BJT', co: 'CO1', complexity: 'Medium' },
            { unit: 1, title: 'FET and MOSFET Characteristics', co: 'CO1', complexity: 'Medium' },
            { unit: 1, title: 'Amplifier Circuit Analysis', co: 'CO1', complexity: 'Hard' },
            { unit: 2, title: 'Op-Amp Configurations and Applications', co: 'CO2', complexity: 'Medium' },
            { unit: 2, title: 'Oscillators and Signal Generators', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'Filters – Active and Passive', co: 'CO2', complexity: 'Hard' },
            { unit: 3, title: 'Analog Modulation Techniques (AM, FM)', co: 'CO3', complexity: 'Medium' },
            { unit: 3, title: 'Digital Modulation (ASK, FSK, PSK)', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: 'Multiplexing and Spread Spectrum', co: 'CO3', complexity: 'Medium' },
            { unit: 4, title: 'Microprocessor Architecture (8085)', co: 'CO4', complexity: 'Medium' },
            { unit: 4, title: 'Microcontroller Programming (8051)', co: 'CO4', complexity: 'Hard' },
            { unit: 5, title: 'Embedded Systems and IoT Applications', co: 'CO5', complexity: 'Hard' }
        ],
        EEE: [
            { unit: 1, title: 'Circuit Analysis – KVL, KCL, Thevenin', co: 'CO1', complexity: 'Medium' },
            { unit: 1, title: 'AC Circuit Analysis and Phasors', co: 'CO1', complexity: 'Hard' },
            { unit: 1, title: 'Three Phase Circuits and Power', co: 'CO1', complexity: 'Hard' },
            { unit: 2, title: 'Transformers – Construction and Operation', co: 'CO2', complexity: 'Medium' },
            { unit: 2, title: 'DC Machines – Motors and Generators', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'Induction Motor Characteristics', co: 'CO2', complexity: 'Hard' },
            { unit: 3, title: 'Power Electronics – Rectifiers and Inverters', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: 'DC-DC Converters and Choppers', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: 'AC Drives and Variable Speed Control', co: 'CO3', complexity: 'Medium' },
            { unit: 4, title: 'Power Systems – Transmission and Distribution', co: 'CO4', complexity: 'Medium' },
            { unit: 4, title: 'Protection Systems and Circuit Breakers', co: 'CO4', complexity: 'Hard' },
            { unit: 5, title: 'Renewable Energy Systems and Smart Grid', co: 'CO5', complexity: 'Hard' }
        ],
        IMT: [
            { unit: 1, title: 'Web Technologies – HTML, CSS, JavaScript', co: 'CO1', complexity: 'Easy' },
            { unit: 1, title: 'React.js Fundamentals and Component Model', co: 'CO1', complexity: 'Medium' },
            { unit: 1, title: 'RESTful API Design and Integration', co: 'CO1', complexity: 'Medium' },
            { unit: 2, title: 'Database Design and SQL Optimization', co: 'CO2', complexity: 'Medium' },
            { unit: 2, title: 'NoSQL Databases – MongoDB', co: 'CO2', complexity: 'Medium' },
            { unit: 2, title: 'ORM Frameworks and Query Building', co: 'CO2', complexity: 'Hard' },
            { unit: 3, title: 'Network Security and Cryptography', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: 'Firewall, VPN and Intrusion Detection', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: 'Ethical Hacking Concepts', co: 'CO3', complexity: 'Medium' },
            { unit: 4, title: 'Cloud Platforms – AWS / GCP / Azure', co: 'CO4', complexity: 'Hard' },
            { unit: 4, title: 'DevOps – CI/CD Pipelines and Docker', co: 'CO4', complexity: 'Hard' },
            { unit: 5, title: 'Machine Learning Applications in IT', co: 'CO5', complexity: 'Hard' }
        ],
        MCE: [
            { unit: 1, title: 'Thermodynamics Laws and Applications', co: 'CO1', complexity: 'Medium' },
            { unit: 1, title: 'Properties of Steam and Rankine Cycle', co: 'CO1', complexity: 'Hard' },
            { unit: 1, title: 'Gas Cycles – Otto, Diesel, Brayton', co: 'CO1', complexity: 'Hard' },
            { unit: 2, title: 'Fluid Mechanics – Bernoulli and Flow', co: 'CO2', complexity: 'Medium' },
            { unit: 2, title: 'Pumps and Turbines – Selection & Analysis', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'Hydraulic Machines and Losses', co: 'CO2', complexity: 'Medium' },
            { unit: 3, title: 'Kinematics of Mechanisms', co: 'CO3', complexity: 'Medium' },
            { unit: 3, title: 'Gear Trains and Velocity Ratio', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: 'Balancing of Rotating Masses', co: 'CO3', complexity: 'Hard' },
            { unit: 4, title: 'Metal Cutting and Machining Processes', co: 'CO4', complexity: 'Medium' },
            { unit: 4, title: 'CNC Machining and CAD/CAM', co: 'CO4', complexity: 'Hard' },
            { unit: 5, title: 'Robotics and Automation in Manufacturing', co: 'CO5', complexity: 'Hard' }
        ]
    },
    R2025: {
        ATE: [
            { unit: 1, title: 'Advanced Engine Technologies – GDI & HCCI', co: 'CO1', complexity: 'Hard' },
            { unit: 1, title: 'Alternative Fuels and Combustion Analysis', co: 'CO1', complexity: 'Hard' },
            { unit: 1, title: 'Emission Control and EURO VI Norms', co: 'CO1', complexity: 'Medium' },
            { unit: 2, title: 'Advanced Transmission – CVT and DCT', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'Electronic Control Units in Drivetrain', co: 'CO2', complexity: 'Medium' },
            { unit: 2, title: 'AWD and Torque Vectoring Systems', co: 'CO2', complexity: 'Hard' },
            { unit: 3, title: 'ADAS – Lane Keeping and Collision Avoidance', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: 'Vehicle Telematics and V2X Communication', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: 'Automotive Cybersecurity', co: 'CO3', complexity: 'Medium' },
            { unit: 4, title: 'Battery Technology for EVs', co: 'CO4', complexity: 'Hard' },
            { unit: 4, title: 'Electric Motor Drives – BLDC and PMSM', co: 'CO4', complexity: 'Hard' },
            { unit: 5, title: 'Hydrogen Fuel Cell Vehicles', co: 'CO5', complexity: 'Hard' }
        ],
        CSE: [
            { unit: 1, title: 'Modern OS – Containerization with Docker', co: 'CO1', complexity: 'Hard' },
            { unit: 1, title: 'Real-Time Systems Scheduling', co: 'CO1', complexity: 'Hard' },
            { unit: 1, title: 'Distributed Computing Concepts', co: 'CO1', complexity: 'Hard' },
            { unit: 2, title: 'Advanced AI – Transformers and LLMs', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'Computer Vision and Object Detection', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'Reinforcement Learning Algorithms', co: 'CO2', complexity: 'Hard' },
            { unit: 3, title: 'Blockchain Technology and Smart Contracts', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: 'Quantum Computing Fundamentals', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: '5G Networks and Edge Computing', co: 'CO3', complexity: 'Medium' },
            { unit: 4, title: 'Software Architecture Patterns – Microservices', co: 'CO4', complexity: 'Hard' },
            { unit: 4, title: 'Agile Methodologies and DevOps', co: 'CO4', complexity: 'Medium' },
            { unit: 5, title: 'AI Ethics and Responsible Computing', co: 'CO5', complexity: 'Medium' }
        ],
        CVE: [
            { unit: 1, title: 'Finite Element Analysis Fundamentals', co: 'CO1', complexity: 'Hard' },
            { unit: 1, title: 'Advanced Structural Analysis Methods', co: 'CO1', complexity: 'Hard' },
            { unit: 1, title: 'Composite Materials in Construction', co: 'CO1', complexity: 'Medium' },
            { unit: 2, title: 'Geotechnical Earthquake Engineering', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'Deep Foundations and Pile Design', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'Ground Improvement Techniques', co: 'CO2', complexity: 'Medium' },
            { unit: 3, title: 'Smart Infrastructure and Digital Twin', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: 'BIM – Building Information Modelling', co: 'CO3', complexity: 'Medium' },
            { unit: 3, title: 'Green Building Design and LEED', co: 'CO3', complexity: 'Medium' },
            { unit: 4, title: 'Water Resource Management', co: 'CO4', complexity: 'Medium' },
            { unit: 4, title: 'Environmental Impact Assessment', co: 'CO4', complexity: 'Hard' },
            { unit: 5, title: 'Disaster Risk Reduction in Construction', co: 'CO5', complexity: 'Hard' }
        ],
        CDS: [
            { unit: 1, title: 'Advanced NLP – Transformers and BERT', co: 'CO1', complexity: 'Hard' },
            { unit: 1, title: 'Generative AI and Diffusion Models', co: 'CO1', complexity: 'Hard' },
            { unit: 1, title: 'Feature Engineering – Advanced Methods', co: 'CO1', complexity: 'Hard' },
            { unit: 2, title: 'Graph Neural Networks', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'Time Series Forecasting Models', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'Model Explainability and XAI', co: 'CO2', complexity: 'Medium' },
            { unit: 3, title: 'Real-Time Streaming Data with Kafka', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: 'Data Lakehouse Architecture', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: 'MLOps Pipelines and Model Deployment', co: 'CO3', complexity: 'Hard' },
            { unit: 4, title: 'AI-Powered Business Intelligence Tools', co: 'CO4', complexity: 'Medium' },
            { unit: 4, title: 'Recommender System Design', co: 'CO4', complexity: 'Hard' },
            { unit: 5, title: 'Ethics, Privacy and Bias in AI/ML', co: 'CO5', complexity: 'Medium' }
        ],
        ECE: [
            { unit: 1, title: 'Advanced VLSI Design and FinFET', co: 'CO1', complexity: 'Hard' },
            { unit: 1, title: 'FPGA Architecture and Programming', co: 'CO1', complexity: 'Hard' },
            { unit: 1, title: 'RF and Microwave Circuits', co: 'CO1', complexity: 'Hard' },
            { unit: 2, title: '5G Signal Processing and Beamforming', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'OFDM and Massive MIMO Systems', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'Channel Coding – LDPC and Turbo Codes', co: 'CO2', complexity: 'Medium' },
            { unit: 3, title: 'Image and Video Processing with DL', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: 'Radar and LIDAR Systems', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: 'Satellite Communication Systems', co: 'CO3', complexity: 'Medium' },
            { unit: 4, title: 'Wearable IoT Devices and Sensors', co: 'CO4', complexity: 'Medium' },
            { unit: 4, title: 'Edge AI for Embedded Devices', co: 'CO4', complexity: 'Hard' },
            { unit: 5, title: 'Quantum Communication and Cryptography', co: 'CO5', complexity: 'Hard' }
        ],
        EEE: [
            { unit: 1, title: 'Smart Grid Architecture and Technologies', co: 'CO1', complexity: 'Hard' },
            { unit: 1, title: 'Power Quality and Harmonics Mitigation', co: 'CO1', complexity: 'Hard' },
            { unit: 1, title: 'FACTS Devices – SVC and STATCOM', co: 'CO1', complexity: 'Hard' },
            { unit: 2, title: 'High Voltage Engineering and Insulation', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'Advanced Switchgear and Protection', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'Condition Monitoring of Electrical Equipment', co: 'CO2', complexity: 'Medium' },
            { unit: 3, title: 'Solar PV System Design and Optimization', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: 'Wind Energy Systems and Grid Integration', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: 'Battery Energy Storage Systems', co: 'CO3', complexity: 'Medium' },
            { unit: 4, title: 'IoT Applications in Energy Management', co: 'CO4', complexity: 'Medium' },
            { unit: 4, title: 'AI in Power Systems – Load Forecasting', co: 'CO4', complexity: 'Hard' },
            { unit: 5, title: 'Electric Vehicles and Charging Infrastructure', co: 'CO5', complexity: 'Hard' }
        ],
        IMT: [
            { unit: 1, title: 'Full Stack Development – MERN/MEAN', co: 'CO1', complexity: 'Hard' },
            { unit: 1, title: 'Microservices and API Gateway Patterns', co: 'CO1', complexity: 'Hard' },
            { unit: 1, title: 'GraphQL and Modern API Design', co: 'CO1', complexity: 'Medium' },
            { unit: 2, title: 'Advanced Cloud – Serverless and FaaS', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'Kubernetes and Container Orchestration', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'Site Reliability Engineering (SRE)', co: 'CO2', complexity: 'Medium' },
            { unit: 3, title: 'Zero Trust Security Architecture', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: 'Penetration Testing and Red Teaming', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: 'Compliance – GDPR, ISO 27001', co: 'CO3', complexity: 'Medium' },
            { unit: 4, title: 'AI Governance and Model Risk Management', co: 'CO4', complexity: 'Medium' },
            { unit: 4, title: 'Digital Transformation Strategies', co: 'CO4', complexity: 'Hard' },
            { unit: 5, title: 'Metaverse and Extended Reality (XR)', co: 'CO5', complexity: 'Hard' }
        ],
        MCE: [
            { unit: 1, title: 'Additive Manufacturing – 3D Printing', co: 'CO1', complexity: 'Hard' },
            { unit: 1, title: 'Advanced Materials and Nanotechnology', co: 'CO1', complexity: 'Hard' },
            { unit: 1, title: 'Design for Manufacturing and Assembly (DFMA)', co: 'CO1', complexity: 'Medium' },
            { unit: 2, title: 'Computational Fluid Dynamics (CFD)', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'Heat Transfer in Electronic Cooling', co: 'CO2', complexity: 'Hard' },
            { unit: 2, title: 'Renewable Energy Heat Transfer Applications', co: 'CO2', complexity: 'Medium' },
            { unit: 3, title: 'Industrial Robotics and Path Planning', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: 'Industry 4.0 and Cyber-Physical Systems', co: 'CO3', complexity: 'Hard' },
            { unit: 3, title: 'Autonomous Mobile Robots (AMR)', co: 'CO3', complexity: 'Medium' },
            { unit: 4, title: 'Smart Manufacturing and IIoT', co: 'CO4', complexity: 'Hard' },
            { unit: 4, title: 'Sustainable Manufacturing Practices', co: 'CO4', complexity: 'Medium' },
            { unit: 5, title: 'Electric Vehicle Thermal Management', co: 'CO5', complexity: 'Hard' }
        ]
    }
};

/**
 * Get auto-assigned assessments for all teams.
 * Distributes 12 assessment topics across N teams cyclically.
 * Each team index gets 1 assessment (their presentation topic).
 * @param {string} deptCode
 * @param {number} batchYear
 * @param {number} numTeams
 * @returns {Array} - array of assessment objects (length = numTeams)
 */
function getAutoAssignedAssessments(deptCode, batchYear, numTeams) {
    const regulation = batchYear >= 2029 ? 'R2025' : 'R2021';
    const topics = (SYLLABUS_DATA[regulation] && SYLLABUS_DATA[regulation][deptCode])
        ? SYLLABUS_DATA[regulation][deptCode]
        : [];

    const result = [];
    for (let i = 0; i < numTeams; i++) {
        const topic = topics[i % topics.length]; // cycle if more than 12 teams
        result.push({
            teamIndex: i,
            assessId: `ASSESS_${String(i + 1).padStart(3, '0')}`,
            unit: topic ? `Unit ${topic.unit}` : 'Unit 1',
            title: topic ? topic.title : `Presentation Topic ${i + 1}`,
            co: topic ? topic.co : 'CO1',
            complexity: topic ? topic.complexity : 'Medium',
            duration: '15–20 mins',
            type: 'Team Presentation'
        });
    }
    return result;
}

// ===== Level 6: Assessment Configuration =====
function getSyllabusPdfPath(deptCode, batchYear) {
    const isR2025 = batchYear >= 2029; // 2029 batch joins in 2025 (2029 - 4)
    const folder = isR2025 ? 'R2025' : 'R2021';

    // Mapping object to filenames based on observed folder structures
    let filename = '';

    if (folder === 'R2021') {
        const fileMap = {
            'ATE': 'B.E.Automobile.pdf',
            'CSE': 'B.E.CSE(R-2021).pdf',
            'CVE': 'BE.Civil.pdf regulation 2021.pdf',
            'CDS': 'B.E. CSE(Data Science).pdf',
            'ECE': 'B.E.ECE.pdf',
            'EEE': 'BE-EEE (21 reg).pdf',
            'IMT': 'B.Tech.IT.pdf',
            'MCE': 'B.E. Mechanical Engineering.pdf'
        };
        filename = fileMap[deptCode];
    } else {
        const fileMap = {
            'ATE': 'Padeepz App B.E. Automobile Engineering.pdf',
            'CSE': 'Padeepz App B.E. CSE.pdf',
            'CVE': 'Padeepz App B.E. Civil Engineering.pdf',
            'CDS': 'Padeepz App B.E. CSE (DS).pdf',
            'ECE': 'Padeepz App B.E. ECE.pdf',
            'EEE': 'Padeepz App B.E. EEE.pdf',
            'IMT': 'Padeepz App B.Tech. IT .pdf',
            'MCE': 'Padeepz App B.E. Mechanical Engineering.pdf'
        };
        filename = fileMap[deptCode];
    }

    return `Syllabus/${folder}/${filename}`;
}

function renderAssessments(container) {
    const deptCode = navState.dept;
    const batchYear = navState.batch;
    const isR2025 = batchYear >= 2029;
    const regulation = isR2025 ? 'R2025' : 'R2021';
    const admYear = batchYear - 4;
    const teams = navState.teams || [];
    const numTeams = teams.length || 12;
    const pdfPath = getSyllabusPdfPath(deptCode, batchYear);
    const step = navState.assignStep || 1;
    const cfg = navState.assignConfig || {};

    const syllTopics = (SYLLABUS_DATA[regulation] && SYLLABUS_DATA[regulation][deptCode])
        ? SYLLABUS_DATA[regulation][deptCode] : [];

    const unitMap = {};
    syllTopics.forEach(t => {
        if (!unitMap[t.unit]) unitMap[t.unit] = { title: '', topics: [] };
        unitMap[t.unit].topics.push(t.title);
    });
    const defaultUnitTitles = {
        1: 'Unit 1 - Fundamentals & Core Concepts',
        2: 'Unit 2 - Analysis & Design Principles',
        3: 'Unit 3 - Systems & Applications',
        4: 'Unit 4 - Advanced Topics & Technologies',
        5: 'Unit 5 - Emerging Trends & Case Studies'
    };

    const steps = [
        { n: 1, label: 'Step 1', title: 'Course Selection' },
        { n: 2, label: 'Step 2', title: 'Regulation' },
        { n: 3, label: 'Step 3', title: 'Syllabus & Units' },
        { n: 4, label: 'Step 4', title: 'Configure & Generate' },
    ];
    const stepperHTML = '<div class="wiz-stepper">' +
        steps.map(s => {
            const cls = s.n < step ? 'done' : s.n === step ? 'active' : '';
            const numIcon = s.n < step ? '&#10003;' : s.n;
            const click = s.n < step ? 'onclick="moveAssignStep(' + s.n + ')"' : '';
            return '<div class="wiz-step ' + cls + '" ' + click + '>' +
                '<div class="wiz-step-num">' + numIcon + '</div>' +
                '<div class="wiz-step-text"><span class="wiz-step-label">' + s.label + '</span>' +
                '<span class="wiz-step-title">' + s.title + '</span></div></div>';
        }).join('') + '</div>';

    let panelHTML = '';

    if (step === 1) {
        panelHTML = `<div class="wiz-panel">
            <div class="wiz-panel-title">&#128218; Step 1 &mdash; Course Selection</div>
            <div class="wiz-form-grid">
                <div class="wiz-field"><label>Department</label>
                    <input type="text" readonly value="${getDeptName(deptCode)}" class="wiz-prefill"></div>
                <div class="wiz-field"><label>Passing Year (Batch)</label>
                    <input type="text" readonly value="${batchYear}" class="wiz-prefill"></div>
                <div class="wiz-field"><label>Course Code</label>
                    <input type="text" id="wiz-course-code" placeholder="e.g. CS3492"
                        value="${cfg.courseCode || ''}"
                        oninput="navState.assignConfig=navState.assignConfig||{};navState.assignConfig.courseCode=this.value;"></div>
                <div class="wiz-field"><label>Course Name</label>
                    <input type="text" id="wiz-course-name" placeholder="e.g. Database Management Systems"
                        value="${cfg.courseName || ''}"
                        oninput="navState.assignConfig=navState.assignConfig||{};navState.assignConfig.courseName=this.value;"></div>
                <div class="wiz-field full"><label>Course Description (optional)</label>
                    <textarea id="wiz-course-desc" placeholder="Brief description..."
                        oninput="navState.assignConfig=navState.assignConfig||{};navState.assignConfig.courseDesc=this.value;">${cfg.courseDesc || ''}</textarea></div>
            </div>
            <div class="wiz-nav-row">
                <button class="btn-primary" style="width:auto;padding:10px 28px;" onclick="moveAssignStep(2)">Next &rarr;</button>
            </div>
        </div>`;
    }

    if (step === 2) {
        const baseReg = isR2025 ? 'R2021' : 'R2018';
        const type = isR2025 ? 'Incremental' : 'Standard';
        panelHTML = `<div class="wiz-panel">
            <div class="wiz-panel-title">&#9878;&#65039; Step 2 &mdash; Regulation Determination</div>
            <div class="wiz-reg-card">
                <div class="wiz-reg-title">${regulation} &#10003;</div>
                <div class="wiz-reg-grid">
                    <div class="wiz-reg-item"><label>Regulation</label><span>${regulation}</span></div>
                    <div class="wiz-reg-item"><label>Admission Year</label><span>${admYear}</span></div>
                    <div class="wiz-reg-item"><label>Passing Year</label><span>${batchYear}</span></div>
                    <div class="wiz-reg-item"><label>Type</label><span>${type}</span></div>
                </div>
                <div class="wiz-reg-logic">Admission Year = Passing Year &minus; 4 &nbsp;&middot;&nbsp; Admission ${admYear} &rarr; ${regulation} (based on ${baseReg})</div>
            </div>
            <div style="background:rgba(5,150,105,.06);border:1px solid rgba(5,150,105,.2);border-radius:var(--radius-sm);padding:10px 14px;font-size:.82rem;color:var(--text-secondary);">
                Syllabus topics for <strong>${getDeptName(deptCode)}</strong> under <strong>${regulation}</strong> have been pre-loaded for the next step.
            </div>
            <div class="wiz-nav-row">
                <button class="btn-secondary" style="width:auto;padding:10px 20px;" onclick="moveAssignStep(1)">&larr; Previous</button>
                <button class="btn-primary"   style="width:auto;padding:10px 28px;" onclick="moveAssignStep(3)">Next &rarr;</button>
            </div>
        </div>`;
    }

    if (step === 3) {
        const defaultCOs = {
            CO1: 'Understand and apply fundamental concepts of the subject.',
            CO2: 'Analyse and solve domain-specific problems using appropriate methods.',
            CO3: 'Design and implement solutions integrating relevant systems.',
            CO4: 'Evaluate and compare advanced techniques and technologies.',
            CO5: 'Demonstrate awareness of emerging trends and professional responsibility.'
        };
        const savedCOs = cfg.courseOutcomes || defaultCOs;
        const coHTML = Object.entries(savedCOs).map(([k, v]) =>
            '<div class="wiz-co-row"><span class="wiz-co-label">' + k + '</span>' +
            '<input type="text" id="co-' + k + '" value="' + v + '" data-co="' + k + '" ' +
            'oninput="(navState.assignConfig.courseOutcomes=navState.assignConfig.courseOutcomes||{})[this.dataset.co]=this.value;" ' +
            'placeholder="Course outcome..."></div>'
        ).join('');

        const savedUnits = cfg.units || {};
        const unitRows = [1, 2, 3, 4, 5].map(u => {
            const topics = unitMap[u] ? unitMap[u].topics : [];
            const savedTitle = (savedUnits[u] || {}).title || topics[0] || defaultUnitTitles[u];
            const savedDesc = (savedUnits[u] || {}).desc || topics.join(' - ');
            return '<div class="wiz-unit-row" id="unit-row-' + u + '">' +
                '<div class="wiz-unit-header" onclick="toggleWizUnit(' + u + ')">' +
                '<div class="wiz-unit-badge">U' + u + '</div>' +
                '<div class="wiz-unit-name" id="unit-name-preview-' + u + '">' + savedTitle + '</div>' +
                '<span class="wiz-unit-expand" id="unit-expand-' + u + '">&darr; ' + topics.length + ' topics</span>' +
                '</div>' +
                '<div class="wiz-unit-body" id="unit-body-' + u + '" style="display:none;">' +
                '<input type="text" id="unit-title-' + u + '" placeholder="Unit title" value="' + savedTitle + '" ' +
                'oninput="document.getElementById(\\"unit-name-preview-' + u + '\\").textContent=this.value;">' +
                '<textarea id="unit-desc-' + u + '" rows="3" placeholder="Describe key topics...">' + savedDesc + '</textarea>' +
                '<div style="font-size:.72rem;color:var(--text-muted);">Tip: More detail = richer assignments</div>' +
                '</div></div>';
        }).join('');

        panelHTML = `<div class="wiz-panel">
            <div class="wiz-panel-title">&#128218; Step 3 &mdash; Syllabus &amp; Units
                <button onclick="openSyllabusPdf('${pdfPath}')" style="margin-left:auto;background:none;border:1px solid rgba(37,99,235,.3);border-radius:6px;padding:4px 12px;font-size:.75rem;font-weight:600;color:var(--accent-blue);cursor:pointer;">
                    &#128196; Open ${regulation} Syllabus PDF
                </button>
            </div>
            <div style="font-size:.82rem;font-weight:700;color:var(--text-secondary);margin-bottom:8px;">
                Course: <span style="color:var(--accent-blue)">${cfg.courseCode || '—'}</span> &nbsp;&middot;&nbsp; ${cfg.courseName || getDeptName(deptCode) + ' Core Subject'}
            </div>
            <div style="font-size:.78rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px;">Course Outcomes (CO1–CO5)</div>
            <div class="wiz-co-grid">${coHTML}</div>
            <div style="font-size:.78rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px;margin-top:1rem;">Unit Details — click to expand &amp; edit</div>
            <div class="wiz-unit-list">${unitRows}</div>
            <div class="wiz-nav-row">
                <button class="btn-secondary" style="width:auto;padding:10px 20px;" onclick="moveAssignStep(2)">&larr; Previous</button>
                <button class="btn-primary"   style="width:auto;padding:10px 28px;" onclick="saveWizardUnitsAndProceed()">Next &rarr;</button>
            </div>
        </div>`;
    }

    if (step === 4) {
        const assignTypes = [
            { id: 'presentation', icon: '&#127908;', name: 'Team Presentation', desc: '15-20 min live presentation' },
            { id: 'assignment', icon: '&#128221;', name: 'Individual Assignment', desc: 'Written/typed submission' },
            { id: 'miniproject', icon: '&#128295;', name: 'Mini Project', desc: 'Working prototype or implementation' },
            { id: 'viva', icon: '&#128172;', name: 'Viva Voce', desc: 'Oral Q&A examination' },
        ];
        const savedType = cfg.assignType || 'presentation';
        const typeCards = assignTypes.map(t =>
            '<div><input type="radio" name="wiz-type" id="wt-' + t.id + '" value="' + t.id + '" class="wiz-type-option" ' + (savedType === t.id ? 'checked' : '') + '>' +
            '<label for="wt-' + t.id + '" class="wiz-type-label">' +
            '<span class="wiz-type-icon">' + t.icon + '</span>' +
            '<span class="wiz-type-name">' + t.name + '</span>' +
            '<span class="wiz-type-desc">' + t.desc + '</span>' +
            '</label></div>'
        ).join('');

        const unitOpts = [1, 2, 3, 4, 5].map(u =>
            '<option value="' + u + '" ' + ((cfg.focusUnits || []).includes(u) ? 'selected' : '') + '>Unit ' + u + '</option>'
        ).join('');

        let resultHTML = '';
        if (cfg.generatedAssignments && cfg.generatedAssignments.length > 0) {
            const cColors = {
                Easy: 'background:rgba(5,150,105,.12);color:#059669',
                Medium: 'background:rgba(245,158,11,.12);color:#d97706',
                Hard: 'background:rgba(220,38,38,.12);color:#dc2626'
            };
            const cards = cfg.generatedAssignments.map((a, i) =>
                '<div class="assign-card" style="animation-delay:' + (i * .03) + 's">' +
                '<div class="assign-card-header" onclick="toggleAssignCard(' + i + ')">' +
                '<div class="assign-team-badge">T' + (i + 1) + '</div>' +
                '<div class="assign-card-info">' +
                '<div class="assign-topic-title">' + a.title + '</div>' +
                '<div class="assign-meta-row">' +
                '<span class="assign-pill" style="background:rgba(37,99,235,.1);color:var(--accent-blue);">' + a.unit + '</span>' +
                '<span class="assign-pill" style="' + (cColors[a.complexity] || cColors.Medium) + '">' + a.complexity + '</span>' +
                '<span class="assign-pill" style="background:rgba(124,58,237,.1);color:#7c3aed;">' + a.type + '</span>' +
                '<span style="font-size:.72rem;color:var(--text-muted);">' + a.co + ' &middot; ' + a.duration + '</span>' +
                '</div></div>' +
                '<div class="assign-card-expand" id="assign-expand-' + i + '">&darr;</div>' +
                '</div>' +
                '<div class="assign-card-body" id="assign-body-' + i + '">' +
                '<h4>Learning Objective</h4><p>' + a.objective + '</p>' +
                '<h4>Assignment Description</h4><p>' + a.description + '</p>' +
                '<h4>Deliverables</h4><ul>' + a.deliverables.map(d => '<li>' + d + '</li>').join('') + '</ul>' +
                '<h4>Evaluation Criteria</h4><ol>' + a.criteria.map(c => '<li>' + c + '</li>').join('') + '</ol>' +
                '</div></div>'
            ).join('');
            resultHTML = '<div class="rt-section" style="margin-top:1.5rem;">' +
                '<div class="rt-section-header">' +
                '<div class="rt-section-title">Generated Assignments (' + cfg.generatedAssignments.length + ')</div>' +
                '<div style="display:flex;gap:8px;">' +
                '<button class="btn-primary" style="width:auto;padding:8px 18px;font-size:.82rem;" onclick="generateAssignments()">Regenerate</button>' +
                '<button class="btn-primary" style="width:auto;padding:8px 18px;font-size:.82rem;background:var(--gradient-green);" onclick="exportAssessmentsCSV()">Export CSV</button>' +
                '</div></div>' +
                '<div class="assign-result-grid">' + cards + '</div></div>';
        }

        const units = cfg.units || {};
        const unitList = [1, 2, 3, 4, 5].map(u => (units[u] || {}).title || 'Unit ' + u).join(', ');
        panelHTML = `<div class="wiz-panel">
            <div class="wiz-panel-title">&#9881;&#65039; Step 4 &mdash; Assignment Configuration</div>
            <div style="font-size:.78rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px;">Assignment Type</div>
            <div class="wiz-type-grid">${typeCards}</div>
            <div class="wiz-form-grid">
                <div class="wiz-field"><label>Complexity</label>
                    <select id="wiz-complexity">
                        <option value="mixed" ${(!cfg.complexity || cfg.complexity === 'mixed') ? 'selected' : ''}>Mixed (Easy/Medium/Hard)</option>
                        <option value="Easy"   ${cfg.complexity === 'Easy' ? 'selected' : ''}>All Easy</option>
                        <option value="Medium" ${cfg.complexity === 'Medium' ? 'selected' : ''}>All Medium</option>
                        <option value="Hard"   ${cfg.complexity === 'Hard' ? 'selected' : ''}>All Hard</option>
                    </select></div>
                <div class="wiz-field"><label>Duration per Assignment</label>
                    <select id="wiz-duration">
                        <option value="10 min"   ${cfg.duration === '10 min' ? 'selected' : ''}>10 minutes</option>
                        <option value="15-20 min" ${(!cfg.duration || cfg.duration === '15-20 min') ? 'selected' : ''}>15-20 minutes</option>
                        <option value="20-30 min" ${cfg.duration === '20-30 min' ? 'selected' : ''}>20-30 minutes</option>
                        <option value="30 min"   ${cfg.duration === '30 min' ? 'selected' : ''}>30 minutes</option>
                    </select></div>
                <div class="wiz-field"><label>Focus Units (Ctrl for multi-select)</label>
                    <select id="wiz-focus-units" multiple style="min-height:90px;">
                        <option value="all" ${!(cfg.focusUnits && cfg.focusUnits.length) ? 'selected' : ''}>All Units (recommended)</option>
                        ${unitOpts}
                    </select></div>
                <div class="wiz-field"><label>Include Practical Exercises</label>
                    <select id="wiz-practicals">
                        <option value="yes" ${cfg.practicals !== 'no' ? 'selected' : ''}>Yes - include lab/mini-project topics</option>
                        <option value="no"  ${cfg.practicals === 'no' ? 'selected' : ''}>No - theory topics only</option>
                    </select></div>
            </div>
            <div class="wiz-ready-card">
                <div class="wiz-ready-icon">&#9999;&#65039;</div>
                <div class="wiz-ready-title">Ready to Generate ${numTeams} Assignments</div>
                <ul class="wiz-ready-bullets">
                    <li>Based on ${regulation} syllabus</li>
                    <li>Topics drawn from unit descriptions you configured</li>
                    <li>Each team gets a unique topic with objectives &amp; deliverables</li>
                    <li>Export as CSV to share with faculty</li>
                </ul>
                <button class="btn-primary" style="width:auto;padding:12px 36px;font-size:1rem;" onclick="generateAssignments()">
                    Generate ${numTeams} Assignments
                </button>
            </div>
            <div class="wiz-nav-row" style="border-top:none;padding-top:0;">
                <button class="btn-secondary" style="width:auto;padding:10px 20px;" onclick="moveAssignStep(3)">&larr; Previous</button>
            </div>
        </div>
        ${resultHTML}`;
    }

    container.innerHTML = `<div class="wiz-header">
        <div>
            <div class="wiz-header-title">&#9999;&#65039; Assignment Configuration Wizard</div>
            <div class="wiz-header-sub">Generate assessments and map to sessions &middot; ${getDeptName(deptCode)} &middot; ${batchYear} Batch</div>
        </div>
        <button onclick="openSyllabusPdf('${pdfPath}')" style="background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:8px;color:#fff;padding:8px 16px;font-size:.8rem;font-weight:600;cursor:pointer;">
            &#128196; ${regulation} Syllabus PDF
        </button>
    </div>
    ${stepperHTML}
    ${panelHTML}`;
}

function moveAssignStep(n) {
    if (!navState.assignConfig) navState.assignConfig = {};
    navState.assignStep = n;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function saveWizardUnitsAndProceed() {
    if (!navState.assignConfig) navState.assignConfig = {};
    const units = {};
    for (let u = 1; u <= 5; u++) {
        units[u] = {
            title: document.getElementById('unit-title-' + u)?.value || 'Unit ' + u,
            desc: document.getElementById('unit-desc-' + u)?.value || ''
        };
    }
    navState.assignConfig.units = units;
    const cos = {};
    ['CO1', 'CO2', 'CO3', 'CO4', 'CO5'].forEach(co => {
        cos[co] = document.getElementById('co-' + co)?.value || '';
    });
    navState.assignConfig.courseOutcomes = cos;
    moveAssignStep(4);
}

function toggleWizUnit(u) {
    const body = document.getElementById('unit-body-' + u);
    const exp = document.getElementById('unit-expand-' + u);
    if (!body) return;
    if (body.style.display === 'none') {
        body.style.display = 'flex';
        if (exp) exp.innerHTML = '&uarr; collapse';
    } else {
        body.style.display = 'none';
        if (exp) exp.innerHTML = '&darr; expand';
    }
}

function toggleAssignCard(i) {
    const body = document.getElementById('assign-body-' + i);
    const expand = document.getElementById('assign-expand-' + i);
    if (!body) return;
    const isOpen = body.classList.toggle('open');
    if (expand) expand.style.transform = isOpen ? 'rotate(180deg)' : '';
}

function generateEnrichedAssignment(unitNum, unitTitle, unitDesc, config, coKey, teamIdx) {
    const { assignType } = config;
    const typeLabel = { presentation: 'Team Presentation', assignment: 'Individual Assignment', miniproject: 'Mini Project', viva: 'Viva Voce' }[assignType] || 'Team Presentation';
    const descMap = {
        presentation: 'Prepare and deliver a structured presentation on <strong>"' + unitTitle + '"</strong>. Cover theoretical foundations, real-world applications, and emerging developments with visual aids.',
        assignment: 'Write a detailed report on <strong>"' + unitTitle + '"</strong> including theoretical background, derivations or algorithmic steps, case studies, and your own analysis.',
        miniproject: 'Design and implement a small-scale project demonstrating principles of <strong>"' + unitTitle + '"</strong>. Document your design, implementation, and outcomes.',
        viva: 'Prepare for an oral examination on <strong>"' + unitTitle + '"</strong>. Expect questions on core concepts, problem-solving approaches, and practical implications.',
    };
    const objectives = [
        'To understand and articulate the key concepts in ' + unitTitle + '.',
        'To analyse and apply ' + unitTitle + ' principles to engineering problems.',
        'To evaluate and compare techniques related to ' + unitTitle + '.',
        'To demonstrate competence in ' + unitTitle + ' through structured presentation.',
        'To develop research and communication skills through ' + unitTitle + ' study.',
    ];
    const deliverableMap = {
        presentation: ['Slide deck (8-12 slides) covering overview, concepts, and applications.', 'Q&A session with evaluating team.', 'Reference list (min 3 peer-reviewed sources).'],
        assignment: ['Typed report (1500-2000 words) with introduction, body, and conclusion.', 'Diagrams or pseudocode where relevant.', 'IEEE references (min 4 sources).'],
        miniproject: ['Working prototype or implementation.', 'Project report: problem, design, results.', 'Live demo to evaluating team.'],
        viva: ['Oral responses to 5-8 questions.', '1-page concept note (before viva).', 'Short problem-solving on the spot.'],
    };
    const criteriaMap = {
        presentation: ['Content clarity and depth (30%)', 'Slides and visual aids (20%)', 'Delivery and time management (25%)', 'Q&A handling (25%)'],
        assignment: ['Accuracy and depth (35%)', 'Writing clarity and structure (25%)', 'Diagrams and examples (20%)', 'References (20%)'],
        miniproject: ['Functionality and completeness (40%)', 'Innovation and design (20%)', 'Documentation (20%)', 'Demo and explanation (20%)'],
        viva: ['Answer correctness (40%)', 'Depth of understanding (30%)', 'Follow-up questions (20%)', 'Communication (10%)'],
    };
    const complexityCycle = ['Easy', 'Medium', 'Hard', 'Medium', 'Easy', 'Hard', 'Medium', 'Easy', 'Hard', 'Medium', 'Hard', 'Easy'];
    const usedComplexity = config.complexity === 'mixed'
        ? complexityCycle[teamIdx % complexityCycle.length]
        : config.complexity;
    return {
        assessId: 'ASSIGN_' + String(teamIdx + 1).padStart(3, '0'),
        unit: 'Unit ' + unitNum, unitTitle, title: unitTitle,
        co: coKey, complexity: usedComplexity, duration: config.duration, type: typeLabel,
        objective: objectives[teamIdx % objectives.length],
        description: descMap[assignType] || descMap.presentation,
        deliverables: deliverableMap[assignType] || deliverableMap.presentation,
        criteria: criteriaMap[assignType] || criteriaMap.presentation,
    };
}

function generateAssignments() {
    if (!navState.assignConfig) navState.assignConfig = {};
    const cfg = navState.assignConfig;
    const typeEl = document.querySelector('input[name="wiz-type"]:checked');
    cfg.assignType = typeEl ? typeEl.value : (cfg.assignType || 'presentation');
    cfg.complexity = document.getElementById('wiz-complexity')?.value || cfg.complexity || 'mixed';
    cfg.duration = document.getElementById('wiz-duration')?.value || cfg.duration || '15-20 min';
    cfg.practicals = document.getElementById('wiz-practicals')?.value || cfg.practicals || 'yes';
    const focusEl = document.getElementById('wiz-focus-units');
    if (focusEl) {
        const sel = Array.from(focusEl.selectedOptions).map(o => parseInt(o.value)).filter(v => !isNaN(v));
        cfg.focusUnits = sel.length ? sel : [];
    }
    const teams = navState.teams || [];
    const numTeams = teams.length || 12;
    const deptCode = navState.dept;
    const batchYear = navState.batch;
    const regulation = batchYear >= 2029 ? 'R2025' : 'R2021';
    const syllTopics = (SYLLABUS_DATA[regulation] && SYLLABUS_DATA[regulation][deptCode]) ? SYLLABUS_DATA[regulation][deptCode] : [];
    const units = cfg.units || {};
    const cos = cfg.courseOutcomes || { CO1: 'CO1', CO2: 'CO2', CO3: 'CO3', CO4: 'CO4', CO5: 'CO5' };
    const coKeys = Object.keys(cos);
    const pool = [];
    const useUnits = cfg.focusUnits && cfg.focusUnits.length ? cfg.focusUnits : [1, 2, 3, 4, 5];
    useUnits.forEach(u => {
        const unitTopics = syllTopics.filter(t => t.unit === u);
        const unitTitle = (units[u] || {}).title || (unitTopics[0] || {}).title || 'Unit ' + u;
        if (unitTopics.length) {
            unitTopics.forEach(t => pool.push({ unitNum: u, title: t.title || unitTitle, co: coKeys[(u - 1) % coKeys.length] || 'CO1' }));
        } else {
            pool.push({ unitNum: u, title: unitTitle, co: coKeys[(u - 1) % coKeys.length] || 'CO1' });
        }
    });
    const generated = [];
    for (let i = 0; i < numTeams; i++) {
        const topic = pool[i % pool.length];
        generated.push(generateEnrichedAssignment(topic.unitNum, topic.title, (units[topic.unitNum] || {}).desc || '', cfg, topic.co, i));
    }
    cfg.generatedAssignments = generated;
    navState.assignStep = 4;
    render();
    setTimeout(() => {
        const res = document.querySelector('.assign-result-grid');
        if (res) res.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function exportAssessmentsCSV() {
    const cfg = navState.assignConfig || {};
    const assignments = cfg.generatedAssignments;
    if (!assignments || !assignments.length) { alert('Please generate assignments first.'); return; }
    const deptCode = navState.dept, batchYear = navState.batch;
    let csv = 'Assignment ID,Team,Course Code,Course Name,Topic Title,Unit,Complexity,Course Outcome,Duration,Type,Objective\n';
    assignments.forEach((a, i) => {
        csv += [a.assessId, 'Team ' + (i + 1), cfg.courseCode || '', '"' + (cfg.courseName || '') + '"', '"' + a.title + '"', a.unit, a.complexity, a.co, a.duration, a.type, '"' + a.objective + '"'].join(',') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'assignments_' + deptCode + '_' + batchYear + '_' + (cfg.courseCode || 'course') + '.csv'; a.click();
    URL.revokeObjectURL(url);
}




