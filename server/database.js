const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'sam.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to the SQLite database (sam.db).');
        initializeDb();
    }
});

function initializeDb() {
    db.serialize(() => {
        // Users Table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        )`);

        // Students Table
        db.run(`CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            roll_no TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            gender TEXT,
            dept TEXT NOT NULL,
            batch INTEGER NOT NULL,
            phone TEXT,
            whatsapp TEXT,
            email TEXT,
            cgpa REAL
        )`);

        // SACs Table
        db.run(`CREATE TABLE IF NOT EXISTS sacs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            roll_no TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            gender TEXT,
            dept TEXT NOT NULL,
            batch INTEGER NOT NULL,
            phone TEXT,
            whatsapp TEXT,
            email TEXT
        )`);

        // Subjects Table
        db.run(`CREATE TABLE IF NOT EXISTS subjects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            dept TEXT NOT NULL,
            semester INTEGER NOT NULL,
            code TEXT NOT NULL,
            name TEXT NOT NULL
        )`);

        // Teams Table
        db.run(`CREATE TABLE IF NOT EXISTS teams (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            dept TEXT NOT NULL,
            batch INTEGER NOT NULL,
            team_name TEXT NOT NULL
        )`);

        // Team Members Mapping
        db.run(`CREATE TABLE IF NOT EXISTS team_members (
            team_id INTEGER,
            student_roll_no TEXT,
            FOREIGN KEY(team_id) REFERENCES teams(id),
            FOREIGN KEY(student_roll_no) REFERENCES students(roll_no),
            PRIMARY KEY (team_id, student_roll_no)
        )`);

        // Alumni Table
        db.run(`CREATE TABLE IF NOT EXISTS alumni (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            graduation_year INTEGER,
            dept TEXT,
            current_role TEXT
        )`);

        // OTP Codes Table (for student & alumni email verification)
        db.run(`CREATE TABLE IF NOT EXISTS otp_codes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            otp TEXT NOT NULL,
            expires_at INTEGER NOT NULL
        )`);

        console.log('Database tables successfully initialized.');
    });
}

module.exports = db;
