require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Setup Nodemailer transporter
let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    console.log('Nodemailer configured. Real emails will be sent.');
} else {
    console.warn('EMAIL_USER / EMAIL_PASS not set. OTPs will be logged to console only.');
}

// API Endpoints

// 1. Get all students
app.get('/api/students', (req, res) => {
    db.all('SELECT * FROM students', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// 2. Get students by department
app.get('/api/students/:dept', (req, res) => {
    db.all('SELECT * FROM students WHERE dept = ?', [req.params.dept], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// 3. Get all SACs
app.get('/api/sacs', (req, res) => {
    db.all('SELECT * FROM sacs', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// 4. Get subjects by department
app.get('/api/subjects/:dept', (req, res) => {
    db.all('SELECT * FROM subjects WHERE dept = ?', [req.params.dept], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// 5. Get structured app data (College/Batches/Departments)
app.get('/api/app-data', (req, res) => {
    const query = `
        SELECT 
            batch as year,
            dept as code,
            COUNT(*) as totalStudents,
            SUM(CASE WHEN gender = 'M' THEN 1 ELSE 0 END) as males,
            SUM(CASE WHEN gender = 'F' THEN 1 ELSE 0 END) as females
        FROM students
        GROUP BY batch, dept
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Group by batch
        const batches = {};
        rows.forEach(row => {
            if (!batches[row.year]) {
                batches[row.year] = {
                    year: row.year,
                    departments: [],
                    students: [] // Will fetch separately if needed or on demand
                };
            }
            batches[row.year].departments.push({
                code: row.code,
                totalStudents: row.totalStudents,
                males: row.males,
                females: row.females
            });
        });

        // Add students to each batch
        db.all('SELECT * FROM students', [], (err, students) => {
            if (err) return res.status(500).json({ error: err.message });

            students.forEach(s => {
                if (batches[s.batch]) {
                    batches[s.batch].students.push({
                        id: s.roll_no,
                        name: s.name,
                        department: s.dept,
                        batch: s.batch,
                        email: s.email
                    });
                }
            });

            res.json({
                college: "Government College of Engineering, Erode",
                batches: Object.values(batches)
            });
        });
    });
});

// 6. Authentication endpoint 
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (row) {
            // Simplified login
            res.json({ success: true, user: { username: row.username, role: row.role } });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// =============================================
// AUTH ENDPOINTS
// =============================================

// POST /api/auth/send-otp
// Validates student/alumni email, generates OTP, saves to DB, sends email.
app.post('/api/auth/send-otp', (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    // Generate a 6-digit OTP and set it to expire in 5 minutes
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    // Delete any old OTPs for this email, then insert the new one
    db.run('DELETE FROM otp_codes WHERE email = ?', [email], (err) => {
        if (err) return res.status(500).json({ error: 'Database error.' });

        db.run('INSERT INTO otp_codes (email, otp, expires_at) VALUES (?, ?, ?)', [email, otp, expiresAt], (err) => {
            if (err) return res.status(500).json({ error: 'Could not save OTP.' });

            // Always log the OTP to console for development/testing
            console.log(`[OTP] Email: ${email} | Code: ${otp} | Expires: ${new Date(expiresAt).toLocaleTimeString()}`);

            // Send real email if transporter is configured
            if (transporter) {
                const mailOptions = {
                    from: `"SAM Portal" <${process.env.EMAIL_USER}>`,
                    to: email,
                    subject: 'Your SAM Login Code',
                    html: `
                        <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;border:1px solid #eee;border-radius:12px;">
                            <h2 style="color:#4f46e5;">SAM Portal — Verification Code</h2>
                            <p>Your one-time login code is:</p>
                            <div style="font-size:2.5rem;font-weight:bold;letter-spacing:12px;color:#1e293b;padding:20px 0;">${otp}</div>
                            <p style="color:#64748b;font-size:0.9rem;">This code expires in 5 minutes. Do not share it with anyone.</p>
                        </div>
                    `
                };
                transporter.sendMail(mailOptions, (err) => {
                    if (err) console.error('Email send error:', err);
                });
                res.json({ success: true, message: 'OTP sent to email.' });
            } else {
                // Demo: no email, but OTP is in the console
                res.json({ success: true, message: 'OTP generated. Check server console (email not configured).' });
            }
        });
    });
});

// POST /api/auth/verify-otp
// Validates the submitted OTP against the database.
app.post('/api/auth/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required.' });

    db.get('SELECT * FROM otp_codes WHERE email = ? AND otp = ?', [email, otp], (err, row) => {
        if (err) return res.status(500).json({ error: 'Database error.' });

        if (!row) return res.status(401).json({ error: 'Invalid OTP code.' });

        if (Date.now() > row.expires_at) {
            db.run('DELETE FROM otp_codes WHERE id = ?', [row.id]);
            return res.status(401).json({ error: 'OTP has expired. Please request a new one.' });
        }

        // Cleanup used OTP
        db.run('DELETE FROM otp_codes WHERE id = ?', [row.id]);
        res.json({ success: true, message: 'OTP verified.' });
    });
});

// POST /api/auth/alumni-login
// Standard email + password login for alumni.
app.post('/api/auth/alumni-login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

    db.get('SELECT * FROM alumni WHERE email = ? AND password = ?', [email, password], (err, row) => {
        if (err) return res.status(500).json({ error: 'Database error.' });

        if (!row) return res.status(401).json({ error: 'Invalid email or password.' });

        res.json({
            success: true,
            user: {
                id: row.id,
                name: row.name,
                email: row.email,
                dept: row.dept,
                graduation_year: row.graduation_year,
                current_role: row.current_role
            }
        });
    });
});
