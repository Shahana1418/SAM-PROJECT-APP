use r2d2::Pool;
use r2d2_sqlite::SqliteConnectionManager;
use rusqlite::params;
use std::fs;
use std::path::Path;

use crate::models::CollegeData;

pub type DbPool = Pool<SqliteConnectionManager>;

/// Create a connection pool and initialize the schema
pub fn init_pool(db_path: &str) -> DbPool {
    let manager = SqliteConnectionManager::file(db_path);
    let pool = Pool::builder()
        .max_size(10)
        .build(manager)
        .expect("Failed to create DB pool");

    // Create tables
    let conn = pool.get().expect("Failed to get DB connection");
    conn.execute_batch(
        "
        CREATE TABLE IF NOT EXISTS batches (
            year INTEGER PRIMARY KEY
        );

        CREATE TABLE IF NOT EXISTS departments (
            batch_year    INTEGER NOT NULL,
            code          TEXT NOT NULL,
            name          TEXT NOT NULL,
            total_students INTEGER NOT NULL DEFAULT 0,
            males         INTEGER NOT NULL DEFAULT 0,
            females       INTEGER NOT NULL DEFAULT 0,
            PRIMARY KEY (batch_year, code),
            FOREIGN KEY (batch_year) REFERENCES batches(year)
        );

        CREATE TABLE IF NOT EXISTS students (
            id         TEXT PRIMARY KEY,
            name       TEXT NOT NULL,
            gender     TEXT NOT NULL,
            email      TEXT NOT NULL DEFAULT '',
            cgpa       REAL,
            dept_code  TEXT NOT NULL,
            batch_year INTEGER NOT NULL,
            FOREIGN KEY (batch_year, dept_code) REFERENCES departments(batch_year, code)
        );

        CREATE INDEX IF NOT EXISTS idx_students_batch ON students(batch_year);
        CREATE INDEX IF NOT EXISTS idx_students_dept ON students(dept_code);
        CREATE INDEX IF NOT EXISTS idx_students_batch_dept ON students(batch_year, dept_code);
        ",
    )
    .expect("Failed to create tables");

    pool
}

/// Seed the database from a JSON file if it's empty
pub fn seed_if_empty(pool: &DbPool, json_path: &str) {
    let conn = pool.get().expect("Failed to get DB connection");

    // Check if data already exists
    let count: i32 = conn
        .query_row("SELECT COUNT(*) FROM students", [], |row| row.get(0))
        .unwrap_or(0);

    if count > 0 {
        println!("Database already has {} students, skipping seed.", count);
        return;
    }

    // Read the JSON file
    let json_file = Path::new(json_path);
    if !json_file.exists() {
        eprintln!("Seed file not found: {}", json_path);
        return;
    }

    let json_str = fs::read_to_string(json_file).expect("Failed to read seed JSON");
    let data: CollegeData = serde_json::from_str(&json_str).expect("Failed to parse seed JSON");

    println!("Seeding database from {}...", json_path);

    let mut total_students = 0;

    for batch in &data.batches {
        // Insert batch
        conn.execute("INSERT OR IGNORE INTO batches (year) VALUES (?1)", params![batch.year])
            .expect("Failed to insert batch");

        // Insert departments
        for dept in &batch.departments {
            conn.execute(
                "INSERT OR IGNORE INTO departments (batch_year, code, name, total_students, males, females) VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
                params![batch.year, dept.code, dept.name, dept.total_students, dept.males, dept.females],
            )
            .expect("Failed to insert department");
        }

        // Insert students
        for student in &batch.students {
            conn.execute(
                "INSERT OR IGNORE INTO students (id, name, gender, email, cgpa, dept_code, batch_year) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
                params![
                    student.id,
                    student.name,
                    student.gender,
                    student.email,
                    student.cgpa,
                    student.department,
                    student.batch,
                ],
            )
            .expect("Failed to insert student");
            total_students += 1;
        }
    }

    println!(
        "✅ Seeded {} batches, {} students into database.",
        data.batches.len(),
        total_students
    );
}
