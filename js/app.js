/**
 * SAM System — Hierarchical Drill-Down Navigation
 * College → Department → Batch → Teams → Students
 */

// ===== Global State =====
let appData = null;
let currentUser = null; // null or { role: string, dept: string|null, canGenerate: boolean }

// Passwords are role-based (4 distinct passwords, one per role type):
//   Principal : SAMprincipal@2025
//   Alumni    : SAMalumni@2025
//   HOD       : SAMhod@2025      (same for all departments)
//   Faculty   : SAMfaculty@2025  (same for all departments)
const ROLE_PASSWORDS = {
    'principal': '4badb13274dcc4c23f3f9cb4509b1dde43d90feef06d776ac1f9435d276e183e', // SAMprincipal@2025
    'alumni': '2e3609a4b8d4d2b1cb83520a36849c5b7dbd9663be1a5fc3094ecb2d8b2c9c15', // SAMalumni@2025
    'hod_ATE': 'e707783f0ff76484e62ae0f0049b077e83e8afed385a76516bb948472212d4ce', // SAMhod@2025
    'hod_CSE': 'e707783f0ff76484e62ae0f0049b077e83e8afed385a76516bb948472212d4ce', // SAMhod@2025
    'hod_CVE': 'e707783f0ff76484e62ae0f0049b077e83e8afed385a76516bb948472212d4ce', // SAMhod@2025
    'hod_CDS': 'e707783f0ff76484e62ae0f0049b077e83e8afed385a76516bb948472212d4ce', // SAMhod@2025
    'hod_ECE': 'e707783f0ff76484e62ae0f0049b077e83e8afed385a76516bb948472212d4ce', // SAMhod@2025
    'hod_EEE': 'e707783f0ff76484e62ae0f0049b077e83e8afed385a76516bb948472212d4ce', // SAMhod@2025
    'hod_IMT': 'e707783f0ff76484e62ae0f0049b077e83e8afed385a76516bb948472212d4ce', // SAMhod@2025
    'hod_MCE': 'e707783f0ff76484e62ae0f0049b077e83e8afed385a76516bb948472212d4ce', // SAMhod@2025
    'faculty_ATE': '7abff1d92220e081d7960fd0edf94bcc090a461a824374bb21942fbbffd56ffe', // SAMfaculty@2025
    'faculty_CSE': '7abff1d92220e081d7960fd0edf94bcc090a461a824374bb21942fbbffd56ffe', // SAMfaculty@2025
    'faculty_CVE': '7abff1d92220e081d7960fd0edf94bcc090a461a824374bb21942fbbffd56ffe', // SAMfaculty@2025
    'faculty_CDS': '7abff1d92220e081d7960fd0edf94bcc090a461a824374bb21942fbbffd56ffe', // SAMfaculty@2025
    'faculty_ECE': '7abff1d92220e081d7960fd0edf94bcc090a461a824374bb21942fbbffd56ffe', // SAMfaculty@2025
    'faculty_EEE': '7abff1d92220e081d7960fd0edf94bcc090a461a824374bb21942fbbffd56ffe', // SAMfaculty@2025
    'faculty_IMT': '7abff1d92220e081d7960fd0edf94bcc090a461a824374bb21942fbbffd56ffe', // SAMfaculty@2025
    'faculty_MCE': '7abff1d92220e081d7960fd0edf94bcc090a461a824374bb21942fbbffd56ffe', // SAMfaculty@2025
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
        // Logout
        currentUser = null;
        updateUserBadge();
        navState = { level: 'college', dept: null, batch: null, teams: null };
        render();
        return;
    }
    document.getElementById('admin-modal').style.display = 'flex';
    loginState = { role: null, dept: null };
    showLoginStep(1);
    document.getElementById('login-error').style.display = 'none';
}

function showLoginStep(step) {
    document.getElementById('login-step-1').style.display = step === 1 ? 'block' : 'none';
    document.getElementById('login-step-2').style.display = step === 2 ? 'block' : 'none';
    document.getElementById('login-step-3').style.display = step === 3 ? 'block' : 'none';
    document.getElementById('login-step-indicator').textContent = `Step ${step} of 3`;
}

function selectRole(role) {
    loginState.role = role;
    if (role === 'Principal' || role === 'Alumni') {
        loginState.dept = null; // No dept needed
        document.getElementById('login-final-text').textContent = `Enter ${role} password:`;
        showLoginStep(3);
        document.getElementById('login-step-indicator').textContent = 'Step 2 of 2';
    } else {
        document.getElementById('login-dept').value = '';
        showLoginStep(2);
    }
}

function selectDept() {
    const d = document.getElementById('login-dept').value;
    if (!d) return;
    loginState.dept = d;
    document.getElementById('login-final-text').textContent = `Enter ${loginState.role} password for ${d}:`;
    showLoginStep(3);
}

function loginBackTo(step) {
    showLoginStep(step);
    document.getElementById('login-error').style.display = 'none';
}

async function attemptLogin() {
    const pw = document.getElementById('admin-password').value;
    const hash = await sha256(pw);

    let key = '';
    if (loginState.role === 'Principal') key = 'principal';
    else if (loginState.role === 'Alumni') key = 'alumni';
    else if (loginState.role === 'HOD') key = 'hod_' + loginState.dept;
    else if (loginState.role === 'Faculty') key = 'faculty_' + loginState.dept;

    if (hash === ROLE_PASSWORDS[key]) {
        // Role-based permission matrix:
        // Principal  → All departments, can generate teams & view all
        // Alumni     → All departments, READ ONLY (cannot generate teams)
        // HOD        → Own department only, can generate teams
        // Faculty    → Own department only, READ ONLY (cannot generate teams)
        const role = loginState.role;
        const canGenerate = (role === 'Principal' || role === 'HOD');
        const allDepts = (role === 'Principal' || role === 'Alumni');

        currentUser = {
            role: role,
            dept: allDepts ? null : loginState.dept, // null = access to all depts
            canGenerate: canGenerate
        };
        updateUserBadge();
        closeAdminLogin();

        // If they are HOD or Faculty, take them straight to their dept
        if (currentUser.dept) {
            navigateTo('department', currentUser.dept);
        } else {
            navigateTo('college');
        }
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

function closeAdminLogin() {
    document.getElementById('admin-modal').style.display = 'none';
    document.getElementById('admin-password').value = '';
    // Reset eye to hidden
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
        // Eye-off icon
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
        let text = '';
        let emoji = '';
        if (currentUser.role === 'Principal') { text = 'Principal'; emoji = '🏛️'; }
        if (currentUser.role === 'Alumni') { text = 'Alumni'; emoji = '👤'; }
        if (currentUser.role === 'HOD') { text = `HOD · ${currentUser.dept}`; emoji = '🏫'; }
        if (currentUser.role === 'Faculty') { text = `Faculty · ${currentUser.dept}`; emoji = '👩‍🏫'; }

        badge.innerHTML = `<span>${emoji}</span> ${text}`;
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
        items.push(`<span class="breadcrumb-item active">Assessment Assignment</span>`);
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
function renderSessions(container) {
    const teams = navState.teams;
    if (!teams || teams.length === 0) { navigateBackToTeams(); return; }

    const deptCode = navState.dept;
    const batchYear = navState.batch;
    const N = teams.length;
    const numSessions = N;
    const perRoundMin = 30;
    const totalMin = numSessions * perRoundMin;
    const hrs = Math.floor(totalMin / 60);
    const remMin = totalMin % 60;
    const sessionColors = ['blue', 'green', 'purple', 'orange', 'cyan'];

    let tableRows = '';
    let sessionCards = '';

    for (let s = 0; s < numSessions; s++) {
        const pt = s;
        const rt = (s + 1) % N;
        const ft = (s + 2) % N;
        const sColor = sessionColors[s % sessionColors.length];

        const audienceTeams = [];
        for (let i = 0; i < N; i++) {
            if (i !== pt && i !== rt && i !== ft) audienceTeams.push(i + 1);
        }

        const audChipsSm = audienceTeams.length > 0
            ? audienceTeams.map(n => `<span class="rt-aud-chip">T${n}</span>`).join('')
            : '<span style="color:var(--text-muted);font-style:italic;font-size:0.75rem">—</span>';

        const audChipsLg = audienceTeams.length > 0
            ? audienceTeams.map(n => `<span class="sess-aud-chip">T${n}</span>`).join('')
            : '<span style="color:var(--text-muted);font-style:italic">None</span>';

        tableRows += `
            <tr class="rt-row">
                <td><span class="rt-sess-badge rt-badge-${sColor}">${String(s + 1).padStart(2, '0')}</span></td>
                <td><span class="rt-team-chip rt-presenter">🎤 Team ${pt + 1}</span></td>
                <td><span class="rt-team-chip rt-reviewer">🔍 Team ${rt + 1}</span></td>
                <td><span class="rt-team-chip rt-feedback">💬 Team ${ft + 1}</span></td>
                <td class="rt-aud-cell">${audChipsSm}</td>
            </tr>
        `;

        sessionCards += `
            <div class="sess-detail-card" style="animation-delay:${s * 0.05}s">
                <div class="sess-detail-header sess-dh-${sColor}">
                    <div class="sess-detail-num">${String(s + 1).padStart(2, '0')}</div>
                    <div class="sess-detail-title">Session ${s + 1}</div>
                    <div class="sess-detail-time">⏱ ${perRoundMin} min</div>
                </div>
                <div class="sess-detail-roles">
                    <div class="sess-detail-role sdr-presenter">
                        <span class="sdr-icon">🎤</span>
                        <div class="sdr-info">
                            <div class="sdr-label">Presenter</div>
                            <div class="sdr-team">Team ${pt + 1}</div>
                        </div>
                    </div>
                    <div class="sess-detail-role sdr-reviewer">
                        <span class="sdr-icon">🔍</span>
                        <div class="sdr-info">
                            <div class="sdr-label">Reviewer</div>
                            <div class="sdr-team">Team ${rt + 1}</div>
                        </div>
                    </div>
                    <div class="sess-detail-role sdr-feedback">
                        <span class="sdr-icon">💬</span>
                        <div class="sdr-info">
                            <div class="sdr-label">Feedback</div>
                            <div class="sdr-team">Team ${ft + 1}</div>
                        </div>
                    </div>
                </div>
                ${audienceTeams.length > 0 ? `
                <div class="sess-detail-aud">
                    <span class="sess-aud-label-sm">👥 Audience</span>
                    <div class="sess-aud-chips-row">${audChipsLg}</div>
                </div>` : ''}
            </div>
        `;
    }

    container.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                </svg>
                Session Schedule — ${getDeptShortName(deptCode)} · ${batchYear}
            </h2>
            <p class="page-subtitle">${numSessions} sessions · ${hrs > 0 ? hrs + 'h ' : ''}${remMin}m total · Every team presents exactly once</p>
        </div>

        <!-- Compact Table Overview -->
        <div class="rt-section">
            <div class="rt-section-header">
                <div class="rt-section-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <rect x="3" y="4" width="18" height="18" rx="2"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                    </svg>
                    At a Glance
                </div>
                <div class="rt-legend">
                    <span class="rt-legend-chip rt-presenter">🎤 Presenter</span>
                    <span class="rt-legend-chip rt-reviewer">🔍 Reviewer</span>
                    <span class="rt-legend-chip rt-feedback">💬 Feedback</span>
                    <span class="rt-legend-chip rt-aud-leg">👥 Audience</span>
                </div>
            </div>
            <div class="rt-table-wrap">
                <table class="rt-table">
                    <thead>
                        <tr>
                            <th>Session</th>
                            <th>🎤 Presenter</th>
                            <th>🔍 Reviewer</th>
                            <th>💬 Feedback</th>
                            <th>👥 Audience</th>
                        </tr>
                    </thead>
                    <tbody>${tableRows}</tbody>
                </table>
            </div>
        </div>

        <!-- Assessment CTA Banner -->
        <div class="assess-cta-banner" onclick="navigateToAssessments()">
            <div class="cta-left">
                <div class="cta-icon">📋</div>
                <div class="cta-text">
                    <div class="cta-title">View Assessment Assignment</div>
                    <div class="cta-sub">Each team has been automatically assigned a unique syllabus topic unit-wise</div>
                </div>
            </div>
            <div class="cta-arrow">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
            </div>
        </div>

    `;
}


function buildTeams(students, teamSize, mode) {
    if (students.length === 0) return [];
    if (!teamSize || teamSize < 3) teamSize = 4;
    if (teamSize > 5) teamSize = 5;
    mode = mode || 'random';

    const MIN_PER_TEAM = 3;
    const MAX_PER_TEAM = 4; // Hard cap: max 4 members per team

    const allStudents = [...students];
    shuffle(allStudents);

    const males = allStudents.filter(s => s.gender === 'M');
    const females = allStudents.filter(s => s.gender === 'F');
    shuffle(males);
    shuffle(females);

    // Calculate number of teams:
    // Must be multiple of 3, and all teams must have 3-4 members.
    // minTeams: ceil(n / MAX_PER_TEAM) — ensures no team exceeds 4
    // maxTeams: floor(n / MIN_PER_TEAM) — ensures no team falls below 3
    // We pick numTeams as the highest multiple-of-3 that is <= maxTeams
    // and >= minTeams (rounded up to next mult of 3 if needed).
    const minTeams = Math.ceil(allStudents.length / MAX_PER_TEAM);
    const maxTeams = Math.floor(allStudents.length / MIN_PER_TEAM);

    // Start at minTeams, round up to multiple of 3
    let numTeams = minTeams;
    if (numTeams % 3 !== 0) numTeams = Math.ceil(numTeams / 3) * 3;

    // If after rounding up we exceed maxTeams, step down by 3
    while (numTeams > maxTeams && numTeams >= 3) numTeams -= 3;

    // Absolute minimum: 3 teams
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
            const validTeams = teams.filter(t => t.members.length < MAX_PER_TEAM);
            if (validTeams.length > 0) {
                const smallest = validTeams.reduce((a, b) => a.members.length < b.members.length ? a : b);
                smallest.members.push(s);
            }
        });
        return enforceMinSize(teams, MIN_PER_TEAM, MAX_PER_TEAM);
    }

    // Default: Random gender-balanced (also used for 'manual' mode)
    const pool = [];
    let mi = 0, fi = 0;
    const maleRatio = males.length / (allStudents.length || 1);
    for (let i = 0; i < allStudents.length; i++) {
        const targetMales = Math.round((i + 1) * maleRatio);
        if (mi < males.length && (mi < targetMales || fi >= females.length)) {
            pool.push(males[mi++]);
        } else if (fi < females.length) {
            pool.push(females[fi++]);
        }
    }

    // Distribute evenly: base fill, then spread extras one per team
    const baseSize = Math.floor(pool.length / numTeams);
    const leftover = pool.length - (baseSize * numTeams);
    const teams = [];
    let idx = 0;
    for (let t = 0; t < numTeams; t++) {
        // Give extra 1 student to the first `leftover` teams
        const extra = t < leftover ? 1 : 0;
        const size = baseSize + extra;
        teams.push({ id: t + 1, members: pool.slice(idx, idx + size) });
        idx += size;
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

    // Try to absorb orphans into teams that still have room
    orphans.forEach(s => {
        const room = ok.filter(t => t.members.length < max);
        if (room.length > 0) {
            const smallest = room.reduce((a, b) => a.members.length < b.members.length ? a : b);
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
            assessId: `ASSESS_${String((i % 12) + 1).padStart(3, '0')}`,
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
    const teams = navState.teams || [];
    const numTeams = teams.length || 12;

    const pdfPath = getSyllabusPdfPath(deptCode, batchYear);
    const assignments = getAutoAssignedAssessments(deptCode, batchYear, numTeams);

    const complexityColors = {
        'Easy': 'background:rgba(5,150,105,0.12);color:#059669',
        'Medium': 'background:rgba(245,158,11,0.12);color:#d97706',
        'Hard': 'background:rgba(220,38,38,0.12);color:#dc2626'
    };

    const unitColors = [
        'background:rgba(37,99,235,0.1);color:#1d4ed8',
        'background:rgba(5,150,105,0.1);color:#047857',
        'background:rgba(217,119,6,0.1);color:#b45309',
        'background:rgba(220,38,38,0.1);color:#b91c1c',
        'background:rgba(124,58,237,0.1);color:#6d28d9'
    ];

    let assessmentRows = assignments.map((a, i) => {
        const cStyle = complexityColors[a.complexity] || complexityColors['Medium'];
        const unitNum = parseInt(a.unit.replace('Unit ', '')) || 1;
        const uStyle = unitColors[(unitNum - 1) % unitColors.length];
        return `
            <tr>
                <td class="assess-team-cell">
                    <div class="assess-team-label">Session ${i + 1}</div>
                    <div class="assess-team-name">Team ${i + 1}</div>
                    <div class="assess-team-id">${a.assessId}</div>
                </td>
                <td>
                    <div class="assess-topic-title">${a.title}</div>
                    <div class="assess-meta">
                        <span class="assess-pill" style="${uStyle}">${a.unit}</span>
                        <span class="assess-pill" style="${cStyle}">${a.complexity}</span>
                        <span class="assess-meta-text">${a.co} &middot; ${a.duration}</span>
                    </div>
                </td>
                <td>
                    <span class="assess-type-badge">${a.type}</span>
                </td>
            </tr>
        `;
    }).join('');

    container.innerHTML = `
        <div class="page-header" style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
            <div>
                <h2 class="page-title">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px;">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    Assessment Assignment
                </h2>
                <p class="page-subtitle">${getDeptName(deptCode)} · ${batchYear} Batch · ${regulation} Regulation</p>
                <p class="page-subtitle" style="margin-top:4px;">
                    Each team is automatically assigned a unique presentation topic from the syllabus, distributed unit-wise.
                </p>
            </div>
            <a href="${pdfPath}" target="_blank" class="btn-primary" style="background:var(--gradient-cyan);text-decoration:none;display:inline-flex;width:auto;padding:10px 20px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="12" y1="18" x2="12" y2="12"></line>
                    <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
                View ${regulation} Syllabus PDF
            </a>
        </div>

        <div class="info-section" style="margin-bottom:1.5rem;">
            <div class="info-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Auto-Assignment Rules
            </div>
            <div style="display:flex;gap:24px;flex-wrap:wrap;font-size:0.85rem;color:var(--text-secondary);">
                <span>✅ Topics drawn from <strong>${regulation} Syllabus</strong></span>
                <span>✅ <strong>${numTeams} teams</strong> · <strong>12 topics</strong> mapped unit-wise</span>
                <span>✅ 5 units · ~2–3 topics per unit</span>
                <span>✅ Each team presents <strong>once</strong></span>
            </div>
        </div>

        <div class="table-container" style="overflow-x:auto;">
            <table class="assess-table" id="assessment-table">
                <thead>
                    <tr>
                        <th style="width:160px;">TEAM / SESSION</th>
                        <th>PRESENTATION TOPIC &amp; DETAILS</th>
                        <th style="width:140px;">TYPE</th>
                    </tr>
                </thead>
                <tbody>
                    ${assessmentRows}
                </tbody>
            </table>
        </div>

        <div style="margin-top: 24px; display:flex; justify-content: flex-end; gap:12px;">
            <button class="btn-primary" style="padding: 12px 32px;width:auto;" onclick="exportAssessmentsCSV()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Export as CSV
            </button>
        </div>
    `;
}

function exportAssessmentsCSV() {
    const deptCode = navState.dept;
    const batchYear = navState.batch;
    const teams = navState.teams || [];
    const assignments = getAutoAssignedAssessments(deptCode, batchYear, teams.length || 12);

    let csv = 'Assessment ID,Team,Topic,Unit,Complexity,Course Outcome,Duration,Type\n';
    assignments.forEach((a, i) => {
        csv += `${a.assessId},Team ${i + 1},"${a.title}",${a.unit},${a.complexity},${a.co},${a.duration},${a.type}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `assessments_${deptCode}_${batchYear}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
}


