/**
 * SAM System — Hierarchical Drill-Down Navigation
 * College → Department → Batch → Teams → Students
 */


// ===== Premium Toast Notifications =====
function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    // Icons based on type
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'warning') icon = '⚠️';
    if (type === 'error') icon = '🚨';

    toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-message">${message}</span>`;
    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('toast-show'), 10);

    // Remove after 3.5s
    setTimeout(() => {
        toast.classList.remove('toast-show');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ===== Global State =====
let appData = null;
let currentUser = null; // null or { role: string, dept: string|null, canGenerate: boolean }

// Database Aggregation Helpers
function getSubjectSpec(code) {
    if (!code) return null;
    const dbs = [
        typeof ATE_SUBJECTS !== 'undefined' ? ATE_SUBJECTS : null,
        typeof CSE_SUBJECTS !== 'undefined' ? CSE_SUBJECTS : null,
        typeof CVE_SUBJECTS !== 'undefined' ? CVE_SUBJECTS : null,
        typeof ECE_SUBJECTS !== 'undefined' ? ECE_SUBJECTS : null,
        typeof EEE_SUBJECTS !== 'undefined' ? EEE_SUBJECTS : null,
        typeof IMT_SUBJECTS !== 'undefined' ? IMT_SUBJECTS : null,
        typeof MCE_SUBJECTS !== 'undefined' ? MCE_SUBJECTS : null,
        typeof CDS_SUBJECTS !== 'undefined' ? CDS_SUBJECTS : null
    ];
    for (const db of dbs) {
        if (db && db[code]) return db[code];
    }
    return null;
}

function getLabsGen(deptCode) {
    if (deptCode === 'ATE' && typeof ATE_LABS !== 'undefined') return ATE_LABS;
    if (deptCode === 'CSE' && typeof CSE_LABS !== 'undefined') return CSE_LABS;
    if (deptCode === 'CVE' && typeof CVE_LABS !== 'undefined') return CVE_LABS;
    if (deptCode === 'ECE' && typeof ECE_LABS !== 'undefined') return ECE_LABS;
    if (deptCode === 'EEE' && typeof EEE_LABS !== 'undefined') return EEE_LABS;
    if (deptCode === 'IMT' && typeof IMT_LABS !== 'undefined') return IMT_LABS;
    if (deptCode === 'MCE' && typeof MCE_LABS !== 'undefined') return MCE_LABS;
    if (deptCode === 'CDS' && typeof CDS_LABS !== 'undefined') return CDS_LABS;
    return null;
}

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
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.style.opacity = '0';
            setTimeout(() => splash.remove(), 500);
        }
    }, 600);

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
    // When moving to a different batch or department, reset the wizard state
    const batchChanging = (level === 'batch' && (dept !== navState.dept || batch !== navState.batch));
    const levelGoingBack = (level === 'college' || level === 'department' || level === 'batch');
    if (batchChanging || levelGoingBack) {
        navState.assignStep = 1;
        navState.assignConfig = {};
    }
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
    // Reset wizard to step 1 so it shows fresh for the current batch
    navState.assignStep = 1;
    navState.assignConfig = {};
    navState.level = 'assessments';
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateBackToTeams() {
    // Clear wizard state so re-entering starts fresh
    navState.assignStep = 1;
    navState.assignConfig = {};
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
            showToast('⚠️ CGPA data is not available for this batch. Falling back to Random Balanced mode.', 'warning');
            mode = 'random';
        }
    }

    navState.teams = buildTeams(students, teamSize || 5, mode, deptCode, batchYear);
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

    if (navState.level === 'assessments' || navState.level === 'sessions') {
        items.push(`<span class="breadcrumb-sep">›</span>`);
        items.push(`<span class="breadcrumb-item ${navState.level === 'assessments' ? 'active' : 'clickable'}" 
            onclick="navigateToAssessments()">Assignment Generation</span>`);
    }

    if (navState.level === 'sessions') {
        items.push(`<span class="breadcrumb-sep">›</span>`);
        items.push(`<span class="breadcrumb-item active">Session Schedule</span>`);
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

        <!-- Assignment Generation CTA Banner -->
        <div class="assess-cta-banner" onclick="navigateToAssessments()">
            <div class="cta-left">
                <div class="cta-icon">📋</div>
                <div class="cta-text">
                    <div class="cta-title">View Assignment Generation</div>
                    <div class="cta-sub">Proceed to auto-assign a unique syllabus topic unit-wise to each team</div>
                </div>
            </div>
            <div class="cta-arrow"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></div>
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
    const genAssign = (navState.assignConfig && navState.assignConfig.generatedAssignments) ? navState.assignConfig.generatedAssignments : null;
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
                const presTopicObj = genAssign && genAssign[s.presenterIdx] ? genAssign[s.presenterIdx] : null;
                const presTopicHTML = presTopicObj ? `<div class="sched-topic-row" style="margin-top:4px;font-size:.72rem;color:var(--accent-blue);font-weight:600;">📝 ${presTopicObj.title}</div>` : '';
                return `<td class="sched-slot-cell" style="border-top:3px solid ${pt.color};">
                    <div class="sched-sess-num">#${String(s.sessNum).padStart(2, '0')}</div>
                    <div class="sched-role-row"><span class="sched-chip sched-presenter">🎤 ${p}</span></div>
                    ${presTopicHTML}
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
                const dayTopicObj = genAssign && genAssign[s.presenterIdx] ? genAssign[s.presenterIdx] : null;
                const dayTopicHTML = dayTopicObj ? `<div style="margin-top:4px;font-size:.78rem;color:var(--accent-blue);font-weight:600;padding-left:4px;">📝 Topic: ${dayTopicObj.title}</div>` : '';
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
                    ${dayTopicHTML}
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
`;
}

function applyCalendarConfig() {
    const startDate = document.getElementById('calStartDate')?.value;
    const endDate = document.getElementById('calEndDate')?.value;
    const spd = parseInt(document.getElementById('calSessPerDay')?.value || '2');
    const revealMode = document.getElementById('calRevealMode')?.value || 'presenter';
    if (!startDate || !endDate || endDate < startDate) {
        showToast('⚠️ Please set a valid start and end date.', 'error');
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

function buildTeams(students, teamSize, mode, deptCode, batchYear) {
    if (students.length === 0) return [];

    const allStudents = [...students];
    shuffle(allStudents);

    const males = allStudents.filter(s => s.gender === 'M');
    const females = allStudents.filter(s => s.gender === 'F');
    shuffle(males);
    shuffle(females);

    const n = allStudents.length;
    let numTeams;

    if ((deptCode === 'ATE' && batchYear === 2029) || (deptCode === 'CVE' && batchYear === 2027)) {
        numTeams = 12;
    } else if (deptCode === 'CSE' && (batchYear === 2027 || batchYear === 2028)) {
        numTeams = 15;
    } else {
        // Dynamic team generation for other departments
        // Rules: team sizes must be 4 or 5, teams divisible by 3, max 15 teams
        let validT = [];
        for (let t = 3; t <= 15; t += 3) {
            if (n >= 4 * t && n <= 5 * t) validT.push(t);
        }
        if (validT.length > 0) {
            numTeams = Math.max(...validT); // Maximize T → mostly size-4 teams
        } else if (n > 75) {
            numTeams = 15;
        } else if (n < 12) {
            numTeams = 3;
        } else {
            // Fallback: find best T that avoids size 3 teams
            let minPenalty = Infinity;
            numTeams = 3;
            for (let t = 3; t <= 15; t += 3) {
                let base = Math.floor(n / t);
                let ext = n % t;
                let p1 = (base < 4) ? (4 - base) * 1000 : ((base > 5) ? (base - 5) * 10 : 0);
                let p2 = (base + 1 < 4) ? (4 - base) * 1000 : ((base + 1 > 5) ? (base - 4) * 10 : 0);
                if (base <= 3) p1 += 50000;
                if (base + 1 <= 3) p2 += 50000;
                let penalty = (p1 * (t - ext)) + (p2 * ext) - t * 0.1;
                if (penalty < minPenalty) { minPenalty = penalty; numTeams = t; }
            }
        }
        if (numTeams === 0) numTeams = 3;
    }

    const baseSize = Math.floor(n / numTeams);
    const extra = n % numTeams;

    // We will have `extra` teams of size `baseSize + 1` and `numTeams - extra` teams of size `baseSize`
    const sizes = [
        ...Array(extra).fill(baseSize + 1),
        ...Array(numTeams - extra).fill(baseSize)
    ];

    let teams = Array.from({ length: numTeams }, (_, i) => ({ id: i + 1, members: [] }));

    // Prepare gender pairs
    const pairsM = [];
    const pairsF = [];
    while (males.length >= 2) pairsM.push([males.pop(), males.pop()]);
    while (females.length >= 2) pairsF.push([females.pop(), females.pop()]);

    const leftovers = [...males, ...females];

    for (let t = 0; t < numTeams; t++) {
        let neededPairs = Math.floor(sizes[t] / 2);
        let pairsAdded = 0;

        while (pairsAdded < neededPairs) {
            if (pairsM.length > 0 && pairsF.length > 0) {
                // Balance genders by alternating pairs
                if (pairsAdded % 2 === 0) teams[t].members.push(...pairsM.pop());
                else teams[t].members.push(...pairsF.pop());
            } else if (pairsM.length > 0) {
                teams[t].members.push(...pairsM.pop());
            } else if (pairsF.length > 0) {
                teams[t].members.push(...pairsF.pop());
            } else {
                break;
            }
            pairsAdded++;
        }
    }

    // Flatten remaining pairs back into leftovers
    while (pairsM.length > 0) leftovers.push(...pairsM.pop());
    while (pairsF.length > 0) leftovers.push(...pairsF.pop());

    // Fill the remaining spots up to sizes[t] for each team
    for (let t = 0; t < numTeams; t++) {
        let needed = sizes[t] - teams[t].members.length;
        while (needed > 0 && leftovers.length > 0) {
            teams[t].members.push(leftovers.pop());
            needed--;
        }
    }

    // Safety fallback for math boundary conditions
    let overflowIdx = 0;
    while (leftovers.length > 0) {
        teams[overflowIdx % numTeams].members.push(leftovers.pop());
        overflowIdx++;
    }

    // If a class is very small, sizes could be 1 or 2 (or even 0). We allow that to preserve the multiple-of-3 rule.
    return enforceMinSize(teams, 0, 6);
}

function enforceMinSize(teams, min, max) {
    // Remove empty teams. Teams with 1–2 members have their students redistributed.
    const ok = teams.filter(t => t.members.length >= min);
    const tooSmall = teams.filter(t => t.members.length < min);
    const orphans = [];
    tooSmall.forEach(t => orphans.push(...t.members));
    shuffle(orphans);
    orphans.forEach(s => {
        if (ok.length > 0) {
            // Add to the smallest existing team (up to max size)
            const smallest = ok.reduce((a, b) => a.members.length <= b.members.length ? a : b);
            smallest.members.push(s);
        }
    });
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
        const batchInfo = getBatchAcademicInfo(batchYear);
        // Show Course Objective (not COs) after subject selection
        let objectiveHTML = '';
        if (cfg.courseCode && getSubjectSpec(cfg.courseCode)) {
            const spec = getSubjectSpec(cfg.courseCode);
            if (spec.objective) {
                objectiveHTML = `<div style="margin-top:1.2rem;background:linear-gradient(135deg,rgba(37,99,235,0.07),rgba(124,58,237,0.07));border:1px solid rgba(37,99,235,0.18);border-radius:12px;padding:16px 20px;">
                    <div style="font-size:.72rem;font-weight:800;color:var(--accent-blue);text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px;">&#127919; Course Objective</div>
                    <p style="font-size:.88rem;color:var(--text-secondary);line-height:1.6;margin:0;">${spec.objective}</p>
                </div>`;
            }
        }

        panelHTML = `<div class="wiz-panel">
            <div class="wiz-panel-title">&#128218; Step 1 &mdash; Course Selection</div>
            <div class="wiz-form-grid">
                <div class="wiz-field"><label>Department</label>
                    <input type="text" readonly value="${getDeptName(deptCode)}" class="wiz-prefill"></div>
                <div class="wiz-field"><label>Batch Year</label>
                    <input type="text" readonly value="${batchYear}" class="wiz-prefill"></div>
                <div class="wiz-field full"><label>Auto-detected Semester</label>
                    <input type="text" readonly value="Semester ${batchInfo.semester}" class="wiz-prefill"></div>
                <div class="wiz-field full"><label>Core Subject (Anna Univ Syllabus)</label>
                    <select id="wiz-core-subject" onchange="
                        if(!navState.assignConfig) navState.assignConfig={};
                        let opt = this.options[this.selectedIndex];
                        if(opt && opt.value) {
                            navState.assignConfig.courseCode = opt.value;
                            navState.assignConfig.courseName = opt.text.replace(opt.value + ' - ', '');
                            navState.assignConfig.customizedFor = null;
                        } else {
                            navState.assignConfig.courseCode = '';
                            navState.assignConfig.courseName = '';
                            navState.assignConfig.customizedFor = null;
                        }
                        render();
                    ">
                        <option value="" disabled ${!cfg.courseCode ? 'selected' : ''}>Select a subject...</option>
                        ${(function () {
                let list = (SUBJECTS_DATA[regulation] && SUBJECTS_DATA[regulation][deptCode] ? SUBJECTS_DATA[regulation][deptCode] : []);
                if (deptCode === 'ATE') {
                    if (batchYear == 2029) list = ["MA25C02", "ME25C02", "EE25C01", "PH25C05", "CY25C03"].map(c => ({ code: c, name: (typeof ATE_SUBJECTS !== 'undefined' && ATE_SUBJECTS[c]) ? ATE_SUBJECTS[c].name : c }));
                    else if (batchYear == 2028) list = ["AU3401", "AU3402", "AU3403", "AU3404", "ML3391"].map(c => ({ code: c, name: (typeof ATE_SUBJECTS !== 'undefined' && ATE_SUBJECTS[c]) ? ATE_SUBJECTS[c].name : c }));
                    else if (batchYear == 2027) list = ["AU3601"].map(c => ({ code: c, name: (typeof ATE_SUBJECTS !== 'undefined' && ATE_SUBJECTS[c]) ? ATE_SUBJECTS[c].name : c }));
                }
                if (deptCode === 'CSE') {
                    if (batchYear == 2029) list = ["MA25C02", "EE25C01", "CS25C06", "PH25C03", "CS25C07"].map(c => ({ code: c, name: (typeof CSE_SUBJECTS !== 'undefined' && CSE_SUBJECTS[c]) ? CSE_SUBJECTS[c].name : c }));
                    else if (batchYear == 2028) list = ["CS3452", "CS3491", "CS3492", "CS3401", "CS3451"].map(c => ({ code: c, name: (typeof CSE_SUBJECTS !== 'undefined' && CSE_SUBJECTS[c]) ? CSE_SUBJECTS[c].name : c }));
                    else if (batchYear == 2027) list = ["CCS356", "CS3691"].map(c => ({ code: c, name: (typeof CSE_SUBJECTS !== 'undefined' && CSE_SUBJECTS[c]) ? CSE_SUBJECTS[c].name : c }));
                }
                if (deptCode === 'CVE') {
                    if (batchYear == 2029) list = ["MA25C02", "ME25C02", "PH25C02", "EE25C01", "CY25C02", "CE25201"].map(c => ({ code: c, name: (typeof CVE_SUBJECTS !== 'undefined' && CVE_SUBJECTS[c]) ? CVE_SUBJECTS[c].name : c }));
                    else if (batchYear == 2028) list = ["CE3401", "CE3402", "CE3403", "CE3404", "CE3405"].map(c => ({ code: c, name: (typeof CVE_SUBJECTS !== 'undefined' && CVE_SUBJECTS[c]) ? CVE_SUBJECTS[c].name : c }));
                    else if (batchYear == 2027) list = ["CE3601", "CE3602", "AG3601"].map(c => ({ code: c, name: (typeof CVE_SUBJECTS !== 'undefined' && CVE_SUBJECTS[c]) ? CVE_SUBJECTS[c].name : c }));
                }
                if (deptCode === 'ECE') {
                    if (batchYear == 2029) list = ["MA25C02", "EE25C01", "EC25C01", "EC25C02", "CS25C05"].map(c => ({ code: c, name: (typeof ECE_SUBJECTS !== 'undefined' && ECE_SUBJECTS[c]) ? ECE_SUBJECTS[c].name : c }));
                    else if (batchYear == 2028) list = ["EC3452", "EC3401", "EC3451", "EC3492", "EC3491"].map(c => ({ code: c, name: (typeof ECE_SUBJECTS !== 'undefined' && ECE_SUBJECTS[c]) ? ECE_SUBJECTS[c].name : c }));
                    else if (batchYear == 2027) list = ["ET3491", "CS3491"].map(c => ({ code: c, name: (typeof ECE_SUBJECTS !== 'undefined' && ECE_SUBJECTS[c]) ? ECE_SUBJECTS[c].name : c }));
                }
                if (deptCode === 'EEE') {
                    if (batchYear == 2029) list = ["MA25C03", "GE25C01", "PH25C04", "ME25C01", "CS25C04"].map(c => ({ code: c, name: (typeof EEE_SUBJECTS !== 'undefined' && EEE_SUBJECTS[c]) ? EEE_SUBJECTS[c].name : c }));
                    else if (batchYear == 2028) list = ["EE3401", "EE3402", "EE3403", "EE3404", "EE3405"].map(c => ({ code: c, name: (typeof EEE_SUBJECTS !== 'undefined' && EEE_SUBJECTS[c]) ? EEE_SUBJECTS[c].name : c }));
                    else if (batchYear == 2027) list = ["EE3601", "EE3602"].map(c => ({ code: c, name: (typeof EEE_SUBJECTS !== 'undefined' && EEE_SUBJECTS[c]) ? EEE_SUBJECTS[c].name : c }));
                }
                if (deptCode === 'IMT') {
                    if (batchYear == 2029) list = ["MA25C02", "PH25C03", "IT25201", "IT25202", "ME25C05"].map(c => ({ code: c, name: (typeof IMT_SUBJECTS !== 'undefined' && IMT_SUBJECTS[c]) ? IMT_SUBJECTS[c].name : c }));
                    else if (batchYear == 2028) list = ["CS3452", "CS3491", "CS3492", "IT3401", "CS3451"].map(c => ({ code: c, name: (typeof IMT_SUBJECTS !== 'undefined' && IMT_SUBJECTS[c]) ? IMT_SUBJECTS[c].name : c }));
                    else if (batchYear == 2027) list = ["CCS356"].map(c => ({ code: c, name: (typeof IMT_SUBJECTS !== 'undefined' && IMT_SUBJECTS[c]) ? IMT_SUBJECTS[c].name : c }));
                }
                if (cfg.courseCode && !list.find(s => s.code === cfg.courseCode)) {
                    cfg.courseCode = '';
                    cfg.courseName = '';
                    cfg.customizedFor = null;
                }
                return list;
            })().map(s =>
                `<option value="${s.code}" ${(cfg.courseCode === s.code) ? 'selected' : ''}>${s.code} - ${s.name}</option>`
            ).join('')}
                    </select>
                </div>
            </div>
            ${objectiveHTML}
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
        let topicStatsHTML = '';
        if (cfg.courseCode && getSubjectSpec(cfg.courseCode)) {
            const spec = getSubjectSpec(cfg.courseCode);
            const totalUnits = Object.keys(spec.units || {}).length;
            const presTopics = spec.topics?.presentation?.length || 0;
            const miniprojTopics = spec.topics?.miniproject?.length || 0;

            topicStatsHTML = `<div style="margin: 1.2rem 0; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; display: flex; gap: 24px;">`;
        }
    }

    if (step === 3) {
        if (cfg.courseCode && getSubjectSpec(cfg.courseCode)) {
            const spec = getSubjectSpec(cfg.courseCode);
            let needsUpdate = (cfg.customizedFor !== cfg.courseCode);
            if (!needsUpdate && spec.unit_descs && (!cfg.units || !cfg.units[1] || !cfg.units[1].desc)) {
                needsUpdate = true;
            }
            if (needsUpdate) {
                cfg.courseOutcomes = Object.assign({}, spec.cos);
                cfg.units = {};
                for (let i = 1; i <= 5; i++) {
                    const uData = spec.units[String(i)] || spec.units[i] || {};
                    cfg.units[i] = {
                        title: (typeof uData === 'string') ? uData : (uData.title || 'Unit ' + i),
                        desc: (typeof uData === 'string') ? '' : (uData.desc || '')
                    };
                }
                if (spec.objective) cfg.courseDesc = spec.objective;
                cfg.customizedFor = cfg.courseCode;
            }
        }

        const defaultCOs = {
            CO1: 'Understand and apply fundamental concepts of the subject.',
            CO2: 'Analyse and solve domain-specific problems using appropriate methods.',
            CO3: 'Design and implement solutions integrating relevant systems.',
            CO4: 'Evaluate and compare advanced techniques and technologies.',
            CO5: 'Demonstrate awareness of emerging trends and professional responsibility.'
        };
        const savedCOs = cfg.courseOutcomes || defaultCOs;
        const coAccents = [
            { bg: '#2563eb', light: 'rgba(37,99,235,0.07)', border: 'rgba(37,99,235,0.18)' },
            { bg: '#7c3aed', light: 'rgba(124,58,237,0.07)', border: 'rgba(124,58,237,0.18)' },
            { bg: '#059669', light: 'rgba(5,150,105,0.07)', border: 'rgba(5,150,105,0.18)' },
            { bg: '#d97706', light: 'rgba(217,119,6,0.07)', border: 'rgba(217,119,6,0.18)' },
            { bg: '#dc2626', light: 'rgba(220,38,38,0.07)', border: 'rgba(220,38,38,0.18)' }
        ];
        const coHTML = Object.entries(savedCOs).map(([k, v], idx) => {
            const acc = coAccents[idx % 5];
            return '<div style="background:' + acc.light + ';border:1.5px solid ' + acc.border + ';border-radius:14px;padding:16px 20px;margin-bottom:12px;">' +
                '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">' +
                '<span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:' + acc.bg + ';color:#fff;font-size:.75rem;font-weight:900;flex-shrink:0;">' + (idx + 1) + '</span>' +
                '<span style="font-size:.78rem;font-weight:800;color:' + acc.bg + ';text-transform:uppercase;letter-spacing:.7px;">' + k + ' \u2014 Course Outcome ' + (idx + 1) + '</span>' +
                '</div>' +
                '<textarea id="co-' + k + '" data-co="' + k + '" rows="2" ' +
                'oninput="(navState.assignConfig.courseOutcomes=navState.assignConfig.courseOutcomes||{})[this.dataset.co]=this.value;" ' +
                'style="width:100%;border:1px solid ' + acc.border + ';border-radius:8px;padding:8px 12px;font-size:.82rem;line-height:1.55;color:var(--text-primary);background:rgba(255,255,255,0.6);resize:none;font-family:inherit;box-sizing:border-box;max-height:70px;overflow-y:auto;">' + v + '</textarea>' +
                '</div>';
        }).join('');


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
                'oninput="document.getElementById(\\"unit-name-preview-' + u + '\\").textContent=this.value;" style="font-weight:600;color:var(--accent-blue);">' +
                '<textarea id="unit-desc-' + u + '" rows="4" placeholder="Describe key topics...">' + savedDesc + '</textarea>' +
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

        // Focus Units as checkboxes (multi-select)
        const focusUnitsHTML = [1, 2, 3, 4, 5].map(u => {
            const unitTitle = (cfg.units && cfg.units[u]) ? cfg.units[u].title : ('Unit ' + u);
            const checked = (!cfg.focusUnits || !cfg.focusUnits.length || cfg.focusUnits.includes(u)) ? 'checked' : '';
            return `<label style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;cursor:pointer;background:var(--card-bg);border:1px solid var(--border);font-size:.85rem;">
                <input type="checkbox" class="focus-unit-cb" value="${u}" ${checked} style="width:16px;height:16px;accent-color:var(--accent-blue);">
                <span><strong>Unit ${u}</strong> — ${unitTitle}</span>
            </label>`;
        }).join('');

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
                '<button class="btn-primary" style="width:auto;padding:8px 18px;font-size:.82rem;background:var(--gradient-green);" onclick="exportAssignmentsCSV()">Export CSV</button>' +
                '</div></div>' +
                '<div class="assign-result-grid">' + cards + '</div></div>' +
                '<div class="session-cta-banner" style="margin-top: 1.5rem;" onclick="navigateToSessions()">' +
                '<div class="cta-left">' +
                '<div class="cta-icon">🗓️</div>' +
                '<div class="cta-text">' +
                '<div class="cta-title">Proceed to Session Schedule</div>' +
                '<div class="cta-sub">Organize your generated assignments into a round-robin presentation schedule</div>' +
                '</div>' +
                '</div>' +
                '<div class="cta-arrow">' +
                '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">' +
                '<polyline points="9 18 15 12 9 6"/>' +
                '</svg>' +
                '</div>' +
                '</div>';
        }

        const units = cfg.units || {};
        const unitList = [1, 2, 3, 4, 5].map(u => (units[u] || {}).title || 'Unit ' + u).join(', ');
        // Build lab dropdown HTML for ATE practicals (shows AU3611 / AU3612 / All)
        const spec = getSubjectSpec(cfg.courseCode);
        const _labsSource = getLabsGen(deptCode);
        const semLabs = (spec && spec.semester && _labsSource) ? (_labsSource[spec.semester] || []) : [];
        const showLabDropdown = (semLabs.length > 0 && (cfg.assignType === 'practicals' || savedType === 'practicals'));
        const labDropdownHTML = showLabDropdown ? `
            <div class="wiz-field" id="lab-select-field">
                <label>&#128203; Select Lab</label>
                <select id="wiz-lab-select" style="font-weight:600;">
                    <option value="all" ${(!cfg.selectedLab || cfg.selectedLab === 'all') ? 'selected' : ''}>All Labs (combined)</option>
                    ${semLabs.map(l => `<option value="${l.code}" ${cfg.selectedLab === l.code ? 'selected' : ''}>${l.code} — ${l.name}</option>`).join('')}
                </select>
            </div>` : '';

        panelHTML = `<div class="wiz-panel">
            <div class="wiz-panel-title">&#9881;&#65039; Step 4 &mdash; Assignment Configuration</div>
            <div class="wiz-form-grid">
                <div class="wiz-field"><label>Assignment Type</label>
                    <select id="wiz-type" onchange="if(!navState.assignConfig)navState.assignConfig={};navState.assignConfig.assignType=this.value;navState.assignConfig.selectedLab='all';render();">
                        <option value="presentation" ${savedType === 'presentation' ? 'selected' : ''}>&#127908; Team Presentation</option>
                        <option value="miniproject" ${savedType === 'miniproject' ? 'selected' : ''}>&#128295; Mini Project</option>
                        <option value="practicals" ${savedType === 'practicals' ? 'selected' : ''}>&#128203; Practicals</option>
                    </select>
                </div>
                ${labDropdownHTML}
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
            </div>
            <div style="margin-top:1rem;">
                <div style="font-size:.78rem;font-weight:800;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px;">&#9989; Focus Units (tick to include)</div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;" id="focus-units-grid">${focusUnitsHTML}</div>
            </div>
            <div class="wiz-ready-card">
                <div class="wiz-ready-icon">&#9999;&#65039;</div>
                <div class="wiz-ready-title">Ready to Generate ${numTeams} Assignments</div>
                <ul class="wiz-ready-bullets">
                    <li>${cfg.assignType === 'practicals' ? 'Lab experiments from official Anna University syllabus' : 'Curated topic list from official Anna University syllabus'}</li>
                    <li>${cfg.assignType === 'practicals' ? 'Semester lab experiments mapped to each team' : (cfg.assignType === 'miniproject' ? '12 distinct Mini Project ideas derived from unit content' : '12 distinct Presentation topics derived from unit content')}</li>
                    <li>Each team gets a unique ${cfg.assignType === 'practicals' ? 'experiment' : 'topic'} with objectives &amp; deliverables</li>
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
            <button onclick="navigateBackToTeams()" style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.25);border-radius:8px;color:#fff;padding:6px 14px;font-size:.8rem;font-weight:600;cursor:pointer;margin-bottom:10px;">&#8592; Back to Teams</button>
            <div class="wiz-header-title">&#9999;&#65039; Assignment Configuration Wizard</div>
            <div class="wiz-header-sub">Generate assignments and map to sessions &middot; ${getDeptName(deptCode)} &middot; ${batchYear} Batch</div>
        </div>
        <button onclick="openSyllabusPdf('${pdfPath}')" style="background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:8px;color:#fff;padding:8px 16px;font-size:.8rem;font-weight:600;cursor:pointer;">&#128196; ${regulation} Syllabus PDF</button>
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

function generateEnrichedAssignment(unitNum, unitTitle, unitDesc, config, coKey, teamIdx, courseName = '') {
    const { assignType } = config;
    const typeLabel = { presentation: 'Team Presentation', assignment: 'Individual Assignment', miniproject: 'Mini Project', viva: 'Viva Voce', practicals: 'Practicals' }[assignType] || 'Team Presentation';
    const descMap = {
        presentation: `Prepare and deliver a 12–15 minute structured presentation on <strong>"${unitTitle}"</strong> from <strong>${courseName}</strong>. Cover Anna University important questions, key formulae, diagrams, and real-world examples. Use minimum 10 slides with clear visuals.`,
        assignment: `Write a detailed analytical report on <strong>"${unitTitle}"</strong> from <strong>${courseName}</strong>. Include derivations, solved problems from previous Anna University question papers, diagrams and a summary. Minimum 1500 words.`,
        miniproject: `Design, build or simulate a mini project on <strong>"${unitTitle}"</strong> relevant to <strong>${courseName}</strong>. Demonstrate a working outcome (prototype, simulation or data analysis), prepare a project report and present findings to the team.`,
        practicals: `Perform laboratory experiments related to <strong>"${unitTitle}"</strong> in <strong>${courseName}</strong>. Record observations, analyse results, answer viva questions and submit a complete observation book entry.`,
    };
    const objectiveMap = {
        presentation: `To understand and communicate key concepts of "${unitTitle}" from ${courseName}, with emphasis on Anna University syllabus topics and exam-relevant questions.`,
        assignment: `To analyse and solve Anna University examination problems related to "${unitTitle}" from ${courseName}, developing problem-solving and technical writing skills.`,
        miniproject: `To apply theoretical knowledge of "${unitTitle}" from ${courseName} in a practical, hands-on mini project that demonstrates engineering principles.`,
        practicals: `To verify theoretical concepts of "${unitTitle}" through hands-on experiments in ${courseName} laboratory, building observation and analytical skills.`,
    };
    const deliverableMap = {
        presentation: [
            'PowerPoint/PDF slide deck (minimum 10 slides).',
            'Live 12–15 min presentation to the team with Q&A.',
            'Reference list citing syllabus textbooks and important question resources.'
        ],
        assignment: [
            'Typed report (minimum 1500 words) with derivations and step-by-step solutions.',
            'Solutions to at least 3 previous Anna University important questions.',
            'Diagrams, graphs or flowcharts as applicable.'
        ],
        miniproject: [
            'Working prototype, simulation output or experimental data.',
            'Project report: Abstract, Introduction, Design/Method, Results, Conclusion.',
            'Live demonstration and Q&A with evaluating team.'
        ],
        practicals: [
            'Completed observation book entry with aim, apparatus, procedure, result.',
            'Graphs and calculations as required by the experiment.',
            'Viva responses covering theory behind the experiment.'
        ],
    };
    const criteriaMap = {
        presentation: [
            'Coverage of Anna University syllabus topics (30%)',
            'Clarity of slides and visual aids (20%)',
            'Delivery, confidence and time management (25%)',
            'Handling of Q&A from reviewers (25%)'
        ],
        assignment: [
            'Correctness of problem solutions and derivations (35%)',
            'Writing clarity and report structure (25%)',
            'Diagrams, tables and examples (20%)',
            'Adherence to syllabus scope and references (20%)'
        ],
        miniproject: [
            'Working functionality and completeness (40%)',
            'Innovation and alignment with course theory (20%)',
            'Project report quality and documentation (20%)',
            'Demonstration and explanation to reviewing team (20%)'
        ],
        practicals: [
            'Successful execution of the experiment (40%)',
            'Knowledge of underlying concepts (viva) (30%)',
            'Observation book quality and calculations (20%)',
            'Debugging/troubleshooting skills shown (10%)'
        ],
    };
    const complexityCycle = ['Easy', 'Medium', 'Hard', 'Medium', 'Easy', 'Hard', 'Medium', 'Easy', 'Hard', 'Medium', 'Hard', 'Easy'];
    const usedComplexity = config.complexity === 'mixed'
        ? complexityCycle[teamIdx % complexityCycle.length]
        : config.complexity;
    return {
        assessId: 'ASSIGN_' + String(teamIdx + 1).padStart(3, '0'),
        unit: 'Unit ' + unitNum, unitTitle, title: unitTitle,
        co: coKey, complexity: usedComplexity, duration: config.duration, type: typeLabel,
        objective: objectiveMap[assignType] || objectiveMap.presentation,
        description: descMap[assignType] || descMap.presentation,
        deliverables: deliverableMap[assignType] || deliverableMap.presentation,
        criteria: criteriaMap[assignType] || criteriaMap.presentation,
    };
}

function generateAssignments() {
    if (!navState.assignConfig) navState.assignConfig = {};
    const cfg = navState.assignConfig;
    const typeEl = document.getElementById('wiz-type');
    cfg.assignType = typeEl ? typeEl.value : (cfg.assignType || 'presentation');
    cfg.complexity = document.getElementById('wiz-complexity')?.value || cfg.complexity || 'mixed';
    cfg.duration = document.getElementById('wiz-duration')?.value || cfg.duration || '15-20 min';

    // Read checked focus units (checkboxes)
    const cbAll = document.querySelectorAll('.focus-unit-cb');
    if (cbAll.length > 0) {
        const sel = Array.from(cbAll).filter(cb => cb.checked).map(cb => parseInt(cb.value));
        cfg.focusUnits = sel.length ? sel : [1, 2, 3, 4, 5];
    } else {
        cfg.focusUnits = cfg.focusUnits || [];
    }

    const teams = navState.teams || [];
    const numTeams = teams.length || 12;
    const deptCode = navState.dept;
    const batchYear = navState.batch;
    const units = cfg.units || {};
    const cos = cfg.courseOutcomes || { CO1: 'CO1', CO2: 'CO2', CO3: 'CO3', CO4: 'CO4', CO5: 'CO5' };
    const coKeys = Object.keys(cos);
    const useUnits = cfg.focusUnits && cfg.focusUnits.length ? cfg.focusUnits : [1, 2, 3, 4, 5];

    /* ── Try curated topic list from respective SUBJECTS first ── */
    const spec = getSubjectSpec(cfg.courseCode);

    /* ── If Practicals type → pull experiments from respective LABS, filtered by selected lab ── */
    let curatedList = null;
    const _labsGen = getLabsGen(deptCode);
    if (cfg.assignType === 'practicals' && _labsGen && spec && spec.semester) {
        const semLabs = _labsGen[spec.semester];
        if (semLabs && semLabs.length > 0) {
            // Read selected lab from dropdown (AU3611, AU3612, or 'all')
            const labSel = document.getElementById('wiz-lab-select');
            const selectedLab = labSel ? labSel.value : (cfg.selectedLab || 'all');
            cfg.selectedLab = selectedLab;

            curatedList = [];
            semLabs.forEach(lab => {
                if (selectedLab === 'all' || lab.code === selectedLab) {
                    (lab.experiments || []).forEach(exp => {
                        curatedList.push(lab.code + ': ' + exp);
                    });
                }
            });
            // Fallback: all labs if selection yields nothing
            if (curatedList.length === 0) {
                semLabs.forEach(lab => {
                    (lab.experiments || []).forEach(exp => curatedList.push(lab.code + ': ' + exp));
                });
            }
        }
    }

    /* ── For non-practicals: filter SYLLABUS_DATA by focusUnits AND complexity ── */
    if (!curatedList) {
        if (spec && spec.topics && spec.topics[cfg.assignType] && spec.topics[cfg.assignType].length > 0) {
            // First Priority: explicitly curated topics in ATE_SUBJECTS matching the assignType
            curatedList = spec.topics[cfg.assignType];
        } else {
            // Second Priority: use generic SYLLABUS_DATA topics
            const isR2025 = batchYear >= 2029;
            const regulation = isR2025 ? 'R2025' : 'R2021';
            let syllTopics = (typeof SYLLABUS_DATA !== 'undefined' &&
                SYLLABUS_DATA[regulation] && SYLLABUS_DATA[regulation][deptCode])
                ? SYLLABUS_DATA[regulation][deptCode] : [];

            // Keep only topics from checked/selected units
            syllTopics = syllTopics.filter(t => useUnits.includes(t.unit));

            // Filter by complexity when not 'mixed'
            if (cfg.complexity !== 'mixed' && syllTopics.length > 0) {
                const complexFiltered = syllTopics.filter(t => t.complexity === cfg.complexity);
                // Only apply filter if we get at least one match; otherwise keep all focusUnit topics
                if (complexFiltered.length > 0) syllTopics = complexFiltered;
            }

            if (syllTopics.length > 0) {
                curatedList = syllTopics.map(t => t.title);
            }
        }
    }

    let pool = [];

    if (curatedList && curatedList.length > 0) {
        const coUnits = [1, 2, 3, 4, 5];
        for (let i = 0; i < curatedList.length; i++) {
            const uIdx = Math.floor(i / curatedList.length * 5);
            const uNum = coUnits[uIdx] || 1;
            // Only include this topic if its mapped unit is among selected focus units
            if (useUnits.includes(uNum)) {
                pool.push({
                    unitNum: uNum,
                    title: curatedList[i],
                    co: coKeys[(uNum - 1) % coKeys.length] || 'CO1'
                });
            }
        }
    } else {
        /* ── Fallback: derive topics only from selected unit descriptions ── */
        const allTopics = [];
        useUnits.forEach(u => {
            const uObj = units[u] || {};
            const uTitle = uObj.title || 'Unit ' + u;
            const uDesc = uObj.desc || '';
            let subtopics = [];
            if (uDesc.trim().length > 10) {
                subtopics = uDesc.split(/[-—–.,;]+/).map(s => s.trim()).filter(s => s.length > 5 && s.toLowerCase() !== 'and');
            }
            if (subtopics.length === 0) subtopics = [uTitle];
            subtopics.forEach(sub => {
                allTopics.push({ unitNum: u, title: sub, co: coKeys[(u - 1) % coKeys.length] || 'CO1' });
            });
        });
        if (allTopics.length > numTeams) {
            const buckets = Array.from({ length: numTeams }, () => []);
            allTopics.forEach((t, i) => {
                const bIdx = Math.min(Math.floor(i / (allTopics.length / numTeams)), numTeams - 1);
                buckets[bIdx].push(t);
            });
            buckets.forEach(b => { if (b.length > 0) pool.push({ unitNum: b[0].unitNum, title: b.map(x => x.title).join(' & '), co: b[0].co }); });
        } else {
            pool = allTopics;
        }
        if (pool.length === 0) useUnits.forEach(u => pool.push({ unitNum: u, title: (units[u] || {}).title || 'Unit ' + u, co: coKeys[(u - 1) % coKeys.length] || 'CO1' }));
    }

    const generated = [];
    for (let i = 0; i < numTeams; i++) {
        const topic = pool[i % pool.length];
        generated.push(generateEnrichedAssignment(topic.unitNum, topic.title, (units[topic.unitNum] || {}).desc || '', cfg, topic.co, i, cfg.courseName));
    }
    cfg.generatedAssignments = generated;
    navState.assignStep = 4;
    render();
    setTimeout(() => {
        const res = document.querySelector('.assign-result-grid');
        if (res) res.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function exportAssignmentsCSV() {
    const cfg = navState.assignConfig || {};
    const assignments = cfg.generatedAssignments;
    if (!assignments || !assignments.length) { showToast('⚠️ Please generate assignments first.', 'warning'); return; }
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





function openSyllabusPdf(path) {
    if (!path) { showToast('⚠️ Syllabus PDF not available for this regulation.', 'error'); return; }
    window.open(path, '_blank');
}
