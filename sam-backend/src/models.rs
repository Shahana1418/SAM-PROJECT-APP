use serde::{Deserialize, Serialize};

/// A single student record
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Student {
    pub id: String,
    pub name: String,
    pub gender: String,
    pub email: String,
    pub cgpa: Option<f64>,
    pub department: String,
    pub batch: i32,
}

/// Department summary within a batch
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Department {
    pub code: String,
    pub name: String,
    #[serde(rename = "totalStudents")]
    pub total_students: i32,
    pub males: i32,
    pub females: i32,
}

/// A batch year with its department summaries and students
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Batch {
    pub year: i32,
    pub departments: Vec<Department>,
    pub students: Vec<Student>,
}

/// Top-level data structure matching students.json
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CollegeData {
    pub college: String,
    pub batches: Vec<Batch>,
}

/// API response for batch listing (without students)
#[derive(Debug, Serialize)]
pub struct BatchSummary {
    pub year: i32,
    pub departments: Vec<DepartmentSummary>,
}

/// API response for department info
#[derive(Debug, Serialize)]
pub struct DepartmentSummary {
    pub code: String,
    pub name: String,
    pub total_students: i32,
    pub males: i32,
    pub females: i32,
}

/// College-wide statistics
#[derive(Debug, Serialize)]
pub struct CollegeStats {
    pub college: String,
    pub total_students: i32,
    pub total_males: i32,
    pub total_females: i32,
    pub total_batches: i32,
    pub total_departments: i32,
    pub batches: Vec<BatchSummary>,
}
