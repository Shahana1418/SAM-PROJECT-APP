const fs = require('fs');
const path = require('path');
const db = require('./database');

const studentsPath = path.resolve(__dirname, '../data/students.json');
const sacsPath = path.resolve(__dirname, '../data/sacs.json');

function seedDatabase() {
    db.serialize(() => {
        // 1. Seed default user account
        db.run(`INSERT OR IGNORE INTO users (username, password, role) VALUES ('admin', 'admin', 'admin')`);
        console.log('Seeded admin user account.');

        // 2. Seed Students
        if (fs.existsSync(studentsPath)) {
            const data = JSON.parse(fs.readFileSync(studentsPath, 'utf8'));
            const stmt = db.prepare(`INSERT OR IGNORE INTO students (roll_no, name, gender, dept, batch, email, cgpa) VALUES (?, ?, ?, ?, ?, ?, ?)`);

            data.batches.forEach(batch => {
                batch.students.forEach(s => {
                    stmt.run(s.id, s.name, s.gender, s.department, s.batch, s.email || null, s.cgpa || null);
                });
            });
            stmt.finalize();
            console.log('Seeded students table.');
        }

        // 3. Seed SACs
        if (fs.existsSync(sacsPath)) {
            const sacs = JSON.parse(fs.readFileSync(sacsPath, 'utf8'));
            const stmt = db.prepare(`INSERT OR IGNORE INTO sacs (roll_no, name, dept, batch, phone, whatsapp, email) VALUES (?, ?, ?, ?, ?, ?, ?)`);

            sacs.forEach(s => {
                stmt.run(s.rollNo, s.name, s.dept, parseInt(s.batch), s.phone, s.whatsapp, s.email);
            });
            stmt.finalize();
            console.log('Seeded SACs table.');
        }

        console.log('Database seeding complete. Press Ctrl+C to exit.');
    });
}

// Give DB a second to initialize tables before seeding
setTimeout(seedDatabase, 1000);
