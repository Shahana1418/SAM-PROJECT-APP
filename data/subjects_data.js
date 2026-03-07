/**
 * SUBJECTS_DATA — Department × Regulation subject lists
 * Code and name for each subject appear in the Step 1 dropdown.
 */
const SUBJECTS_DATA = {

    /* ─── R2021 (Batches 2027, 2028) ─────────────────────────────── */
    "R2021": {

        "ATE": [
            // Batch-specific subjects are injected dynamically in renderAssessments.
            // This generic list applies when batch-specific override is not matched.
            { code: "AU3601", name: "Automotive Pollution and Control" },
            { code: "AU3401", name: "Fuels and Lubricants" },
            { code: "AU3402", name: "Automotive Chassis" },
            { code: "AU3403", name: "Vehicle Body Engineering" },
            { code: "AU3404", name: "Automotive Transmission" },
            { code: "ML3391", name: "Mechanics of Solids" }
        ],

        "MCE": [
            { code: "ME3301", name: "Fluid Mechanics and Machinery" },
            { code: "ME3302", name: "Manufacturing Technology – II" },
            { code: "ME3303", name: "Engineering Thermodynamics" },
            { code: "ME3401", name: "Applied Thermodynamics" },
            { code: "ME3402", name: "Design of Machine Elements" },
            { code: "ME3403", name: "Metrology and Measurements" },
            { code: "ME3501", name: "Computer Aided Design and Manufacturing" },
            { code: "ME3601", name: "Mechatronics" }
        ],

        "CSE": [
            /* Semester 4 subjects */
            { code: "CS3452", name: "Theory of Computation" },
            { code: "CS3491", name: "Artificial Intelligence and Machine Learning" },
            { code: "CS3492", name: "Database Management Systems" },
            { code: "CS3401", name: "Algorithms" },
            { code: "CS3451", name: "Introduction to Operating Systems" },
            /* Semester 6 subjects */
            { code: "CCS356", name: "Object Oriented Software Engineering" },
            { code: "CS3691", name: "Embedded Systems and IoT" }
        ],

        "CVE": [
            /* Semester 4 subjects */
            { code: "CE3401", name: "Applied Hydraulics Engineering" },
            { code: "CE3402", name: "Strength of Materials" },
            { code: "CE3403", name: "Concrete Technology" },
            { code: "CE3404", name: "Soil Mechanics" },
            { code: "CE3405", name: "Highway and Railway Engineering" },
            /* Semester 6 subjects */
            { code: "CE3601", name: "Design of Steel Structural Elements" },
            { code: "CE3602", name: "Structural Analysis II" },
            { code: "AG3601", name: "Engineering Geology" }
        ],

        "ECE": [
            { code: "EC3301", name: "Signals and Systems" },
            { code: "EC3302", name: "Electronic Circuits – I" },
            { code: "EC3351", name: "Digital Electronics" },
            { code: "EC3352", name: "Electronic Circuits – II" },
            { code: "EC3401", name: "Electromagnetic Fields" },
            { code: "EC3452", name: "Linear Integrated Circuits" },
            { code: "EC3501", name: "Digital Signal Processing" },
            { code: "EC3601", name: "VLSI Design" },
            { code: "EC3811", name: "Internet of Things" }
        ],

        "EEE": [
            { code: "EE3301", name: "Electric Circuits" },
            { code: "EE3302", name: "Electromagnetic Theory" },
            { code: "EE3303", name: "Electronic Devices and Circuits" },
            { code: "EE3401", name: "Electrical Machines – I" },
            { code: "EE3402", name: "Electrical Machines – II" },
            { code: "EE3405", name: "Power Systems" },
            { code: "EE3501", name: "Control Systems" },
            { code: "EE3512", name: "Power Electronics" },
            { code: "EE3601", name: "High Voltage Engineering" },
            { code: "EE3811", name: "Renewable Energy Systems" }
        ],

        "CVE": [
            { code: "CE3301", name: "Fluid Mechanics" },
            { code: "CE3302", name: "Building Materials and Construction" },
            { code: "CE3303", name: "Mechanics of Solids" },
            { code: "CE3351", name: "Structural Analysis" },
            { code: "CE3401", name: "Concrete Technology" },
            { code: "CE3501", name: "Design of Concrete Structures" },
            { code: "CE3601", name: "Environmental Engineering" },
            { code: "CE3811", name: "Traffic Engineering" }
        ],

        "IMT": [
            { code: "IT3301", name: "Data Structures and Algorithms" },
            { code: "CS3391", name: "Object Oriented Programming" },
            { code: "IT3401", name: "Database Management Systems" },
            { code: "IT3501", name: "Computer Networks" },
            { code: "IT3601", name: "Cloud Computing" },
            { code: "IT3811", name: "Cyber Security" },
            { code: "GE3792", name: "Disaster Relief Engineering" }
        ],

        "CDS": [
            { code: "MA3151", name: "Matrices and Calculus" },
            { code: "HS3152", name: "Professional English – I" },
            { code: "DS3301", name: "Statistics for Data Science" },
            { code: "DS3401", name: "Machine Learning" },
            { code: "DS3501", name: "Big Data Analytics" },
            { code: "DS3601", name: "Deep Learning" }
        ]
    },

    /* ─── R2025 (Batch 2029+, Semester 2 common subjects) ────────── */
    "R2025": {

        "ATE": [
            { code: "MA25C02", name: "Linear Algebra" },
            { code: "ME25C02", name: "Engineering Mechanics" },
            { code: "EE25C01", name: "Basic Electrical and Electronics Engineering" },
            { code: "PH25C05", name: "Applied Physics (ME) – II" },
            { code: "CY25C03", name: "Applied Chemistry (ME) – II" }
        ],

        "MCE": [
            { code: "MA25C02", name: "Linear Algebra" },
            { code: "ME25C02", name: "Engineering Mechanics" },
            { code: "EE25C01", name: "Basic Electrical and Electronics Engineering" },
            { code: "PH25C05", name: "Applied Physics (ME) – II" },
            { code: "CY25C03", name: "Applied Chemistry (ME) – II" }
        ],

        "CSE": [
            { code: "MA25C02", name: "Linear Algebra" },
            { code: "EE25C01", name: "Basic Electrical and Electronics Engineering" },
            { code: "CS25C06", name: "Digital Principles and Computer Organization" },
            { code: "PH25C03", name: "Applied Physics (CSIE) – II" },
            { code: "CS25C07", name: "Object Oriented Programming" }
        ],

        "CVE": [
            { code: "MA25C02", name: "Linear Algebra" },
            { code: "ME25C02", name: "Engineering Mechanics" },
            { code: "PH25C02", name: "Applied Physics (CE) – II" },
            { code: "EE25C01", name: "Basic Electrical and Electronics Engineering" },
            { code: "CY25C02", name: "Applied Chemistry (CE) – II" },
            { code: "CE25201", name: "Construction Materials and Technology" }
        ],

        "ECE": [
            { code: "MA25C02", name: "Linear Algebra" },
            { code: "EE25C01", name: "Basic Electrical and Electronics Engineering" },
            { code: "EC25C01", name: "Electron Devices" },
            { code: "EC25C02", name: "Circuits and Network Analysis" },
            { code: "CS25C05", name: "Data Structures using C++" }
        ],

        "EEE": [
            { code: "MA25C03", name: "Transforms and its Applications" },
            { code: "GE25C01", name: "Basic Civil and Mechanical Engineering" },
            { code: "PH25C04", name: "Applied Physics (EE) – II" },
            { code: "ME25C01", name: "Engineering Drawing" },
            { code: "CS25C04", name: "Data Structures and Algorithms" }
        ],

        "IMT": [
            { code: "MA25C02", name: "Linear Algebra" },
            { code: "PH25C03", name: "Applied Physics (CSIE) – II" },
            { code: "IT25201", name: "Foundations of Data Science Using Python" },
            { code: "IT25202", name: "Digital Principles and System Design" },
            { code: "ME25C05", name: "Re-Engineering for Innovation" }
        ],

        "CDS": [
            { code: "MA25C02", name: "Linear Algebra" },
            { code: "EE25C01", name: "Basic Electrical and Electronics Engineering" },
            { code: "CS25C06", name: "Digital Principles and Computer Organization" },
            { code: "PH25C03", name: "Applied Physics (CSIE) – II" },
            { code: "CS25C07", name: "Object Oriented Programming" }
        ]
    }
};
