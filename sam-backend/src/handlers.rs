use actix_web::{web, HttpResponse, Responder};
use rusqlite::params;

use crate::db::DbPool;
use crate::models::{BatchSummary, CollegeStats, DepartmentSummary, Student};

/// GET /api/stats — college-wide statistics with batch/department summaries
pub async fn get_stats(pool: web::Data<DbPool>) -> impl Responder {
    let conn = pool.get().expect("Failed to get DB connection");

    // Total counts
    let total_students: i32 = conn
        .query_row("SELECT COUNT(*) FROM students", [], |row| row.get(0))
        .unwrap_or(0);
    let total_males: i32 = conn
        .query_row(
            "SELECT COUNT(*) FROM students WHERE gender = 'M'",
            [],
            |row| row.get(0),
        )
        .unwrap_or(0);
    let total_females: i32 = conn
        .query_row(
            "SELECT COUNT(*) FROM students WHERE gender = 'F'",
            [],
            |row| row.get(0),
        )
        .unwrap_or(0);

    // Get batches
    let mut batch_stmt = conn
        .prepare("SELECT year FROM batches ORDER BY year")
        .unwrap();
    let batch_years: Vec<i32> = batch_stmt
        .query_map([], |row| row.get(0))
        .unwrap()
        .filter_map(|r| r.ok())
        .collect();

    let mut batches = Vec::new();
    for year in &batch_years {
        let mut dept_stmt = conn
            .prepare(
                "SELECT code, name, total_students, males, females FROM departments WHERE batch_year = ?1 ORDER BY code",
            )
            .unwrap();
        let departments: Vec<DepartmentSummary> = dept_stmt
            .query_map(params![year], |row| {
                Ok(DepartmentSummary {
                    code: row.get(0)?,
                    name: row.get(1)?,
                    total_students: row.get(2)?,
                    males: row.get(3)?,
                    females: row.get(4)?,
                })
            })
            .unwrap()
            .filter_map(|r| r.ok())
            .collect();

        batches.push(BatchSummary {
            year: *year,
            departments,
        });
    }

    // Count unique departments
    let dept_count: i32 = conn
        .query_row(
            "SELECT COUNT(DISTINCT code) FROM departments",
            [],
            |row| row.get(0),
        )
        .unwrap_or(0);

    let stats = CollegeStats {
        college: "Government College of Engineering, Erode".to_string(),
        total_students,
        total_males,
        total_females,
        total_batches: batch_years.len() as i32,
        total_departments: dept_count,
        batches,
    };

    HttpResponse::Ok().json(stats)
}

/// GET /api/batches — list of all batch years with department summaries
pub async fn get_batches(pool: web::Data<DbPool>) -> impl Responder {
    let conn = pool.get().expect("Failed to get DB connection");

    let mut batch_stmt = conn
        .prepare("SELECT year FROM batches ORDER BY year")
        .unwrap();
    let batch_years: Vec<i32> = batch_stmt
        .query_map([], |row| row.get(0))
        .unwrap()
        .filter_map(|r| r.ok())
        .collect();

    let mut batches = Vec::new();
    for year in &batch_years {
        let mut dept_stmt = conn
            .prepare(
                "SELECT code, name, total_students, males, females FROM departments WHERE batch_year = ?1 ORDER BY code",
            )
            .unwrap();
        let departments: Vec<DepartmentSummary> = dept_stmt
            .query_map(params![year], |row| {
                Ok(DepartmentSummary {
                    code: row.get(0)?,
                    name: row.get(1)?,
                    total_students: row.get(2)?,
                    males: row.get(3)?,
                    females: row.get(4)?,
                })
            })
            .unwrap()
            .filter_map(|r| r.ok())
            .collect();

        batches.push(BatchSummary {
            year: *year,
            departments,
        });
    }

    HttpResponse::Ok().json(batches)
}

/// GET /api/batches/{year} — single batch with department summaries
pub async fn get_batch(pool: web::Data<DbPool>, path: web::Path<i32>) -> impl Responder {
    let year = path.into_inner();
    let conn = pool.get().expect("Failed to get DB connection");

    // Check batch exists
    let exists: bool = conn
        .query_row(
            "SELECT COUNT(*) FROM batches WHERE year = ?1",
            params![year],
            |row| row.get::<_, i32>(0),
        )
        .map(|c| c > 0)
        .unwrap_or(false);

    if !exists {
        return HttpResponse::NotFound().json(serde_json::json!({"error": "Batch not found"}));
    }

    let mut dept_stmt = conn
        .prepare(
            "SELECT code, name, total_students, males, females FROM departments WHERE batch_year = ?1 ORDER BY code",
        )
        .unwrap();
    let departments: Vec<DepartmentSummary> = dept_stmt
        .query_map(params![year], |row| {
            Ok(DepartmentSummary {
                code: row.get(0)?,
                name: row.get(1)?,
                total_students: row.get(2)?,
                males: row.get(3)?,
                females: row.get(4)?,
            })
        })
        .unwrap()
        .filter_map(|r| r.ok())
        .collect();

    HttpResponse::Ok().json(BatchSummary { year, departments })
}

/// GET /api/batches/{year}/departments/{dept}/students — students in a specific batch+dept
pub async fn get_batch_dept_students(
    pool: web::Data<DbPool>,
    path: web::Path<(i32, String)>,
) -> impl Responder {
    let (year, dept) = path.into_inner();
    let conn = pool.get().expect("Failed to get DB connection");

    let mut stmt = conn
        .prepare(
            "SELECT id, name, gender, email, cgpa, dept_code, batch_year \
             FROM students WHERE batch_year = ?1 AND dept_code = ?2 ORDER BY id",
        )
        .unwrap();

    let students: Vec<Student> = stmt
        .query_map(params![year, dept], |row| {
            Ok(Student {
                id: row.get(0)?,
                name: row.get(1)?,
                gender: row.get(2)?,
                email: row.get(3)?,
                cgpa: row.get(4)?,
                department: row.get(5)?,
                batch: row.get(6)?,
            })
        })
        .unwrap()
        .filter_map(|r| r.ok())
        .collect();

    HttpResponse::Ok().json(students)
}

/// GET /api/students — all students, optionally filtered by ?batch=YEAR&dept=CODE
pub async fn get_all_students(
    pool: web::Data<DbPool>,
    query: web::Query<StudentQuery>,
) -> impl Responder {
    let conn = pool.get().expect("Failed to get DB connection");

    let (sql, query_params) = build_student_query(&query);

    let mut stmt = conn.prepare(&sql).unwrap();

    let students: Vec<Student> = stmt
        .query_map(rusqlite::params_from_iter(query_params.iter()), |row| {
            Ok(Student {
                id: row.get(0)?,
                name: row.get(1)?,
                gender: row.get(2)?,
                email: row.get(3)?,
                cgpa: row.get(4)?,
                department: row.get(5)?,
                batch: row.get(6)?,
            })
        })
        .unwrap()
        .filter_map(|r| r.ok())
        .collect();

    HttpResponse::Ok().json(students)
}

#[derive(serde::Deserialize)]
pub struct StudentQuery {
    pub batch: Option<i32>,
    pub dept: Option<String>,
}

fn build_student_query(query: &StudentQuery) -> (String, Vec<String>) {
    let mut sql =
        "SELECT id, name, gender, email, cgpa, dept_code, batch_year FROM students".to_string();
    let mut conditions = Vec::new();
    let mut params_vec: Vec<String> = Vec::new();

    if let Some(batch) = query.batch {
        conditions.push(format!("batch_year = ?{}", params_vec.len() + 1));
        params_vec.push(batch.to_string());
    }
    if let Some(dept) = &query.dept {
        conditions.push(format!("dept_code = ?{}", params_vec.len() + 1));
        params_vec.push(dept.clone());
    }

    if !conditions.is_empty() {
        sql.push_str(" WHERE ");
        sql.push_str(&conditions.join(" AND "));
    }
    sql.push_str(" ORDER BY id");

    (sql, params_vec)
}

/// GET /api/students/{id} — single student by ID
pub async fn get_student_by_id(
    pool: web::Data<DbPool>,
    path: web::Path<String>,
) -> impl Responder {
    let student_id = path.into_inner();
    let conn = pool.get().expect("Failed to get DB connection");

    let result = conn.query_row(
        "SELECT id, name, gender, email, cgpa, dept_code, batch_year FROM students WHERE id = ?1",
        params![student_id],
        |row| {
            Ok(Student {
                id: row.get(0)?,
                name: row.get(1)?,
                gender: row.get(2)?,
                email: row.get(3)?,
                cgpa: row.get(4)?,
                department: row.get(5)?,
                batch: row.get(6)?,
            })
        },
    );

    match result {
        Ok(student) => HttpResponse::Ok().json(student),
        Err(_) => HttpResponse::NotFound().json(serde_json::json!({"error": "Student not found"})),
    }
}

/// GET /api/departments — all unique departments
pub async fn get_departments(pool: web::Data<DbPool>) -> impl Responder {
    let conn = pool.get().expect("Failed to get DB connection");

    let mut stmt = conn
        .prepare("SELECT DISTINCT code, name FROM departments ORDER BY code")
        .unwrap();

    let departments: Vec<serde_json::Value> = stmt
        .query_map([], |row| {
            let code: String = row.get(0)?;
            let name: String = row.get(1)?;
            Ok(serde_json::json!({"code": code, "name": name}))
        })
        .unwrap()
        .filter_map(|r| r.ok())
        .collect();

    HttpResponse::Ok().json(departments)
}

/// GET /api/data — full STUDENT_DATA-compatible response for frontend backward compatibility
pub async fn get_full_data(pool: web::Data<DbPool>) -> impl Responder {
    let conn = pool.get().expect("Failed to get DB connection");

    // Get batches
    let mut batch_stmt = conn
        .prepare("SELECT year FROM batches ORDER BY year")
        .unwrap();
    let batch_years: Vec<i32> = batch_stmt
        .query_map([], |row| row.get(0))
        .unwrap()
        .filter_map(|r| r.ok())
        .collect();

    let mut batches = Vec::new();

    for year in &batch_years {
        // Departments for this batch
        let mut dept_stmt = conn
            .prepare("SELECT code, name, total_students, males, females FROM departments WHERE batch_year = ?1 ORDER BY code")
            .unwrap();
        let departments: Vec<serde_json::Value> = dept_stmt
            .query_map(params![year], |row| {
                Ok(serde_json::json!({
                    "code": row.get::<_, String>(0)?,
                    "name": row.get::<_, String>(1)?,
                    "totalStudents": row.get::<_, i32>(2)?,
                    "males": row.get::<_, i32>(3)?,
                    "females": row.get::<_, i32>(4)?
                }))
            })
            .unwrap()
            .filter_map(|r| r.ok())
            .collect();

        // Students for this batch
        let mut stu_stmt = conn
            .prepare("SELECT id, name, gender, email, cgpa, dept_code, batch_year FROM students WHERE batch_year = ?1 ORDER BY id")
            .unwrap();
        let students: Vec<serde_json::Value> = stu_stmt
            .query_map(params![year], |row| {
                Ok(serde_json::json!({
                    "id": row.get::<_, String>(0)?,
                    "name": row.get::<_, String>(1)?,
                    "gender": row.get::<_, String>(2)?,
                    "email": row.get::<_, String>(3)?,
                    "cgpa": row.get::<_, Option<f64>>(4)?,
                    "department": row.get::<_, String>(5)?,
                    "batch": row.get::<_, i32>(6)?
                }))
            })
            .unwrap()
            .filter_map(|r| r.ok())
            .collect();

        batches.push(serde_json::json!({
            "year": year,
            "departments": departments,
            "students": students
        }));
    }

    let data = serde_json::json!({
        "college": "Government College of Engineering, Erode",
        "batches": batches
    });

    HttpResponse::Ok().json(data)
}
