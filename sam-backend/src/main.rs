mod db;
mod handlers;
mod models;

use actix_cors::Cors;
use actix_web::{web, App, HttpServer};
use std::env;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Determine paths
    let db_path = env::var("SAM_DB_PATH").unwrap_or_else(|_| "sam.db".to_string());
    let seed_path = env::var("SAM_SEED_PATH").unwrap_or_else(|_| "../data/students.json".to_string());
    let host = env::var("SAM_HOST").unwrap_or_else(|_| "127.0.0.1".to_string());
    let port: u16 = env::var("SAM_PORT")
        .unwrap_or_else(|_| "8080".to_string())
        .parse()
        .expect("SAM_PORT must be a number");

    println!("╔═══════════════════════════════════════════╗");
    println!("║     SAM Backend — Rust + SQLite           ║");
    println!("╚═══════════════════════════════════════════╝");
    println!("  Database: {}", db_path);
    println!("  Seed file: {}", seed_path);

    // Initialize database
    let pool = db::init_pool(&db_path);
    db::seed_if_empty(&pool, &seed_path);

    println!("\n🚀 SAM Backend running on http://{}:{}", host, port);
    println!("   API docs:");
    println!("   GET /api/stats                     — College stats");
    println!("   GET /api/data                      — Full data (STUDENT_DATA format)");
    println!("   GET /api/batches                   — All batches");
    println!("   GET /api/batches/{{year}}             — Single batch");
    println!("   GET /api/students                  — All students (?batch=&dept=)");
    println!("   GET /api/students/{{id}}              — Student by ID");
    println!("   GET /api/departments               — All departments");
    println!("   GET /api/batches/{{y}}/departments/{{d}}/students");
    println!();

    let pool_data = web::Data::new(pool);

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

        App::new()
            .wrap(cors)
            .app_data(pool_data.clone())
            // API routes
            .route("/api/stats", web::get().to(handlers::get_stats))
            .route("/api/data", web::get().to(handlers::get_full_data))
            .route("/api/batches", web::get().to(handlers::get_batches))
            .route("/api/batches/{year}", web::get().to(handlers::get_batch))
            .route(
                "/api/batches/{year}/departments/{dept}/students",
                web::get().to(handlers::get_batch_dept_students),
            )
            .route("/api/students", web::get().to(handlers::get_all_students))
            .route("/api/students/{id}", web::get().to(handlers::get_student_by_id))
            .route("/api/departments", web::get().to(handlers::get_departments))
    })
    .bind((host.as_str(), port))?
    .run()
    .await
}
