/**
 * SAM System — Hierarchical Drill-Down Navigation
 * College → Department → Batch → Teams → Students
 */

// ===== Global State =====
let appData = null;
let currentUser = null; // null or { role: string, dept: string|null, canGenerate: boolean }

// Default passwords generated using SHA-256
const ROLE_PASSWORDS = {
    'principal': '69e03750027e6b1e9f95bd21d227613c0024ec799ebfb7fe281371e1153f9bda', // 'principal'
    'alumni': 'aa388760daaa3ebb1ee7ae48b315a39f48b4e30dd84b4b169b68d0bdfcb699da', // 'alumni'
    'hod_ATE': 'fc1bacb25bdde7fcf0612e7f93e2c64f1bb4d329f8426f279ab7c1093dc99f2d', // 'hod_ATE'
    'hod_CSE': '2782c72176f264ce01dfbcdcedc19b5061fe7ffbe399d9fbf0ccd6ae274c2dc1', // 'hod_CSE'
    'hod_CVE': 'a21737838929f1403a5b4b6dd6ed838ff8ebbf9ee4c0a2739e348ddca219bd4b', // 'hod_CVE'
    'hod_CDS': '99728753a4de90a4edb10905b5452c42a5107d8d9b9984f2fec87c6891ff45de', // 'hod_CDS'
    'hod_ECE': '8f59017762321c34e60bda175c81564ebbe03a0ca38efbba8fab4edefa5341dd', // 'hod_ECE'
    'hod_EEE': '6f159dfd3d148acd83a01a8a48f477a29773e05853743798486ccbbf401f7045', // 'hod_EEE'
    'hod_IMT': '63263137bcff3b61ce68a51e62686b47fc425ff8a8b52a9f7683220ba6ab4e59', // 'hod_IMT'
    'hod_MCE': 'c9f3f2f691786fc18b146da88e8e625634e8f7a8b82f88f26fd4073f0f617d85', // 'hod_MCE'
    'faculty_ATE': '7d35eed06900d90fc88120a76154e7e1693b07a22cdecfdd57c96e7a40171cfd', // 'faculty_ATE'
    'faculty_CSE': 'ac530d67401747f89f8aefe8b7cda0477bc0dd3c4bfd3dd4f6c60b92705a1970', // 'faculty_CSE'
    'faculty_CVE': 'a3e2a9f2c434032e0febdb4ac09c01fa829bde3a775abd47109c527331c37ae8', // 'faculty_CVE'
    'faculty_CDS': '823a5f274c9b041258f03946de83fc654de399aa2244208a089520a4083484cb', // 'faculty_CDS'
    'faculty_ECE': '38afa4e0fccd6700f08d7804bb391cb0c5db2499352c7a0172b4e9954df1a2fb', // 'faculty_ECE'
    'faculty_EEE': '5f9b7dae6333120301a258c095a3a8ab952a387b64a88f2ec90e4a9eeef10396', // 'faculty_EEE'
    'faculty_IMT': '762c2e1ca22cf7ade73ebf89926c39bcc77ebf8d5175b1e28f2c752065a587c6', // 'faculty_IMT'
    'faculty_MCE': 'b49dc2b874403892a1c26026f8d6143bdae9b0881c2ff02215d6a3a01da87d93'  // 'faculty_MCE'
};

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
        currentUser = {
            role: loginState.role,
            dept: loginState.dept,
            canGenerate: true // All users can generate teams according to request
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
            < div class="page-header" >
            <h2 class="page-title">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                ${deptName}
            </h2>
            <p class="page-subtitle">${deptCode} · ${totalStudents} students across ${batchesWithDept.length} batch${batchesWithDept.length > 1 ? 'es' : ''}</p>
        </div >

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
        card.style.animationDelay = `${i * 0.06} s`;
        card.onclick = () => navigateTo('batch', deptCode, batch.year);
        card.innerHTML = `
            < div class="dept-card-accent-left" style = "background: var(--gradient-${color})" ></div >
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
            < div class="admin-actions" >
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
        </div >
            ` : '';

    container.innerHTML = `
            < div class="page-header" >
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
        </div >

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
            < tr >
            <td>${i + 1}</td>
            <td><strong>${s.id}</strong></td>
            <td>${s.name}</td>
            <td><span class="gender-badge gender-${s.gender.toLowerCase()}">${s.gender === 'M' ? '♂ Male' : '♀ Female'}</span></td>
            <td>${s.email || '—'}</td>
        </tr >
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

    // Strict Round-Robin: Total sessions = Number of Teams (N)
    const numSessions = teams.length;
    const audienceTeamsPerSession = Math.max(0, teams.length - 3);

    // Session timing calculation — 30 min per round
    const presenterMin = 15;
    const reviewerMin = 5;
    const feedbackMin = 4;
    const audienceMin = 6;
    const perRoundMin = 30; // Fixed 30 min per round
    const totalSessionMin = numSessions * perRoundMin;
    const totalSessionHrs = Math.floor(totalSessionMin / 60);
    const totalSessionRemMin = totalSessionMin % 60;

    const editBtnLabel = navState.editMode ? '✅ Done Editing' : '✏️ Edit Teams';
    const editBtnStyle = navState.editMode
        ? 'background:var(--gradient-green);width:auto;padding:10px 20px'
        : 'background:var(--gradient-orange);width:auto;padding:10px 20px';

    const adminBtns = (currentUser && currentUser.canGenerate) ? `
        <button class="btn-primary" style="${editBtnStyle}" onclick="toggleEditMode()">
            ${editBtnLabel}
        </button>
        <button class="btn-primary" style="width:auto;padding:10px 20px;margin-left:auto" onclick="exportCSV()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export CSV
        </button>
    ` : '';

    // Build role rotation schedule (Strict Mathematically Complete Logic)
    let rotationHTML = '';
    const N = teams.length;

    for (let s = 0; s < numSessions; s++) {
        const pt = s;                     // Presenter Team
        const rt = (s + 1) % N;           // Reviewer Team
        const ft = (s + 2) % N;           // Feedback Team

        const audienceTeams = [];
        for (let i = 0; i < N; i++) {
            if (i !== pt && i !== rt && i !== ft) {
                audienceTeams.push(i + 1); // Team numbers are 1-indexed
            }
        }

        let audienceStr = audienceTeams.length > 0 ? `Teams ${audienceTeams.join(', ')}` : 'None';

        rotationHTML += `
            <div class="rotation-round">
                <div class="round-header" style="background:#f8fafc; border-bottom:1px solid #e2e8f0; padding:10px 16px; font-weight:700; color:#1e293b;">Session ${String(s + 1).padStart(3, '0')}</div>
                <div class="round-roles" style="display:grid; grid-template-columns: repeat(3, 1fr); gap:12px; padding:16px;">
                    <div class="round-role role-presenter" style="background:rgba(37,99,235,0.05); border:1px solid rgba(37,99,235,0.1); border-radius:8px; padding:12px; text-align:center;">
                        <div class="round-role-icon" style="font-size:1.5rem; margin-bottom:4px;">🎤</div>
                        <div class="round-role-label" style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--text-muted);">Presenter Team (PT)</div>
                        <div class="round-role-team" style="font-size:1.1rem; font-weight:800; color:#1e293b; margin:4px 0;">Team ${pt + 1}</div>
                    </div>
                    <div class="round-role role-reviewer" style="background:rgba(16,185,129,0.05); border:1px solid rgba(16,185,129,0.1); border-radius:8px; padding:12px; text-align:center;">
                        <div class="round-role-icon" style="font-size:1.5rem; margin-bottom:4px;">🔍</div>
                        <div class="round-role-label" style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--text-muted);">Review Team (RT)</div>
                        <div class="round-role-team" style="font-size:1.1rem; font-weight:800; color:#1e293b; margin:4px 0;">Team ${rt + 1}</div>
                    </div>
                    <div class="round-role role-feedback" style="background:rgba(139,92,246,0.05); border:1px solid rgba(139,92,246,0.1); border-radius:8px; padding:12px; text-align:center;">
                        <div class="round-role-icon" style="font-size:1.5rem; margin-bottom:4px;">💬</div>
                        <div class="round-role-label" style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--text-muted);">Feedback Team (FT)</div>
                        <div class="round-role-team" style="font-size:1.1rem; font-weight:800; color:#1e293b; margin:4px 0;">Team ${ft + 1}</div>
                    </div>
                </div>
                <div class="round-audience" style="background:#f1f5f9; padding:12px 16px; font-size:0.95rem; color:#475569; display:flex; align-items:center; gap:8px;">
                    <span class="audience-icon" style="font-size:1.2rem;">👥</span>
                    <strong style="color:#1e293b;">Audience (A):</strong>
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
            <p class="page-subtitle">${teams.length} teams · ${totalStudents} students · ${numSessions} Strict Round-Robin Sessions</p>
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
                    <span class="stat-label">Rotation Sessions</span>
                    <span class="stat-value">${numSessions}</span>
                    <span class="stat-detail">Strict 1-Turn-Per-Team</span>
                </div>
                <div class="stat-icon">🔄</div>
            </div>
            <div class="stat-card stat-orange">
                <div class="stat-info">
                    <span class="stat-label">Est. Completion Time</span>
                    <span class="stat-value">${totalSessionHrs > 0 ? totalSessionHrs + 'h ' : ''}${totalSessionRemMin}m</span>
                    <span class="stat-detail">Fixed ${perRoundMin} min per session</span>
                </div>
                <div class="stat-icon">⏱️</div>
            </div>
        </div>

        <!--Session Role Structure-->
        <div class="info-section">
            <h3 class="info-section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
                SAM Session Structure (30 minutes total)
            </h3>
            <div class="session-role-overview">
                <div class="role-overview-card role-presenter-bg">
                    <div class="role-overview-emoji">🎤</div>
                    <div class="role-overview-info">
                        <div class="role-overview-name">Presenter Team (PT)</div>
                        <div class="role-overview-time">${presenterMin} min</div>
                    </div>
                    <div class="role-overview-desc">Presents the central topic to the audience.</div>
                </div>
                <div class="role-overview-card role-reviewer-bg">
                    <div class="role-overview-emoji">🔍</div>
                    <div class="role-overview-info">
                        <div class="role-overview-name">Review Team (RT)</div>
                        <div class="role-overview-time">${reviewerMin} min</div>
                    </div>
                    <div class="role-overview-desc">Questions the presentation & validates claims.</div>
                </div>
                <div class="role-overview-card role-feedback-bg">
                    <div class="role-overview-emoji">💬</div>
                    <div class="role-overview-info">
                        <div class="role-overview-name">Feedback Team (FT)</div>
                        <div class="role-overview-time">${feedbackMin} min</div>
                    </div>
                    <div class="role-overview-desc">Provides actionable, constructive input.</div>
                </div>
                <div class="role-overview-card role-audience-bg">
                    <div class="role-overview-emoji">👥</div>
                    <div class="role-overview-info">
                        <div class="role-overview-name">Audience (A)</div>
                        <div class="role-overview-time">${audienceMin} min</div>
                    </div>
                    <div class="role-overview-desc">All other teams observe & participate in open Q&A.</div>
                </div>
            </div>
            <div class="session-note">
                <strong>🔄 Round-Robin Protocol:</strong> There are exactly as many sessions as there are teams (${numSessions}). Every team will serve as PT exactly once, RT exactly once, and FT exactly once.
            </div>
        </div>

        <!--Role Rotation Schedule-->
        <div class="info-section">
            <h3 class="info-section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Strict Rotation Schedule
            </h3>
            <div class="rotation-schedule" id="rotation-schedule" style="display:flex; flex-direction:column; gap:16px;">
                ${rotationHTML}
            </div>
        </div>

        <div class="section-title-row">
            <h3 class="section-title">Team Rosters</h3>
            ${adminBtns}
        </div>

        <div class="teams-container" id="teams-container"></div>
    `;

    const tc = document.getElementById('teams-container');
    teams.forEach((team, i) => {
        const color = colors[i % colors.length];

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

// ===== Team Generation Algorithm =====
// Teams must be divisible by 3 for role rotation
// Each team must have EXACTLY 3 or 4 members (never < 3 or > 4)
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
