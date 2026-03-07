/**
 * MCE_SUBJECTS — Syllabus details for Mechanical Engineering (MCE) core subjects
 */

const MCE_SUBJECTS = {

    /* ══════════════════════════════════════════════════════════════════
     *  SEMESTER  2  —  BATCH 2029  (R2025)
     * ══════════════════════════════════════════════════════════════════ */

    "MA25C02": {
        name: "Linear Algebra",
        semester: 2,
        objective: "To impart foundational knowledge in linear algebra essential for analysing and solving problems in engineering applications.",
        units: {
            1: { title: "Vector Spaces", desc: "Introduction to Vector Spaces, Examples, Subspaces, Linear Combinations, Span, Generating Sets, Linear Dependence and Independence, Basis and Dimension, Dimension of Subspaces." },
            2: { title: "Linear Transformations and Diagonalization", desc: "Null space, Range, Dimension Theorem, Matrix representation of a linear transformation, Eigenvalues & Eigenvectors, Diagonalizability." },
            3: { title: "Inner Product Spaces", desc: "Inner product, Norms, Cauchy, Schwarz inequality, Gram, Schmidt orthogonalization, Simple problems." },
            4: { title: "Matrix Decomposition", desc: "Orthogonal transformation of a symmetric matrix to diagonal form. Positive definite matrices, QR decomposition, Singular Value Decomposition (SVD), Least squares solutions." },
            5: { title: "Applications", desc: "Open-Source software exercises to compute matrix representation, null space, and eigenvalues." }
        },
        cos: {
            CO1: "Explain the fundamental concepts of Linear Algebra.",
            CO2: "Compute and interpret eigenvalues and eigenvectors.",
            CO3: "Apply inner product concepts and perform orthogonalization.",
            CO4: "Compute least squares solutions of linear system of equations.",
            CO5: "Use MATLAB to implement and validate key linear algebra concepts."
        },
        topics: {
            presentation: [
                "Vector Spaces and Subspaces",
                "Linear Independence and Basis",
                "Linear Transformations",
                "Eigenvalues and Eigenvectors",
                "Diagonalization of Matrices",
                "Gram-Schmidt Orthogonalization",
                "Singular Value Decomposition (SVD)",
                "QR Decomposition",
                "Least Squares Curve Fitting",
                "Matrix Applications in Mechanical Systems"
            ],
            miniproject: [
                "Matrix Calculator App",
                "Eigenvalue Solver",
                "SVD Image Compression Demo",
                "Least Squares Regression Tool",
                "Linear Transformation Visualizer"
            ]
        }
    },

    "ME25C02": {
        name: "Engineering Mechanics",
        semester: 2,
        objective: "To introduce the fundamental concepts and principles of statics related to forces acting on particles and rigid bodies.",
        units: {
            1: { title: "Statics of Particles", desc: "Resultant of forces in a plane, Equilibrium of a particle in a plane, Addition of concurrent forces in space, Equilibrium of a particle in space." },
            2: { title: "Statics of Rigid Bodies", desc: "Free Body Diagram, Transmissibility, Moment of a force, Couples, Equilibrium in 2D and 3D, Principle of virtual work." },
            3: { title: "Moments of Inertia", desc: "First moments of areas/lines, Centroids, Pappus-Guldinus theorem, Second moment of area, Parallel axis theorem, Polar Moments, Radius of Gyration, Principal Axes." },
            4: { title: "Friction", desc: "Laws of friction, Coefficients of Friction, Types of Friction Problems, Wedges and Ladder friction, Belt friction." }
        },
        cos: {
            CO1: "Explain the principles of statics in determination of forces acting on particles and rigid bodies.",
            CO2: "Apply equilibrium conditions to predict the behaviour of particles and rigid bodies.",
            CO3: "Analyse various systems through resolution of forces and moments.",
            CO4: "Demonstrate the ability to engage in adapting new techniques in the analysis of force and moments."
        },
        topics: {
            presentation: [
                "Free Body Diagrams in Real World",
                "Applications of the Principle of Virtual Work",
                "Calculating Centroids of Irregular Shapes",
                "Static vs Kinetic Friction in Machines",
                "Belt Friction and Power Transmission",
                "Ladder and Wedge Friction Examples",
                "Parallel and Perpendicular Axis Theorems",
                "Equilibrium of 3D Rigid Bodies",
                "Moment of Inertia of Composite Sections",
                "Real World Statics Case Studies"
            ],
            miniproject: [
                "Friction Coefficient Testing Setup",
                "Centroid Calculating Script",
                "Wedge Friction Demonstrator",
                "2D Truss Solver App",
                "Virtual Work Concept Model"
            ]
        }
    },

    "EE25C01": {
        name: "Basic Electrical and Electronics Engineering",
        semester: 2,
        objective: "To impart foundational knowledge in principles and applications of electrical and electronics engineering.",
        units: {
            1: { title: "DC Fundamentals", desc: "Current and Voltage sources, Resistance, Inductance and Capacitance; Ohm’s law, Kirchhoff’s law, Series parallel combination, Voltage/Current Divider Rules." },
            2: { title: "AC Fundamentals", desc: "Faraday’s Laws, Self/Mutual Inductances, Sinusoidal voltage, RMS values, 3-phase systems, Electrical Safety." },
            3: { title: "Electric Machines", desc: "DC Machines, Transformers, Induction motors, Synchronous Generators, Stepper Motor, BLDC motor." },
            4: { title: "Semiconductor Devices", desc: "PN junction diodes, Zener Diode, BJT & FET Transistors, Timers, Operational Amplifiers." },
            5: { title: "Digital Electronics and Microcontrollers", desc: "Boolean algebra, Logic Gates, adders, flip-flops. Microcontrollers Architecture." }
        },
        cos: {
            CO1: "Understand and explain basic electrical and electronic concepts.",
            CO2: "Apply and analyse electrical circuits in real-time applications.",
            CO3: "Identify and utilise key electronic devices used in engineering applications"
        },
        topics: {
            presentation: [
                "Kirchhoff's Laws",
                "Working of DC Motors",
                "Single Phase Transformer",
                "Operational Amplifiers",
                "Microcontroller Architecture"
            ],
            miniproject: [
                "Simple DC Circuit Simulator",
                "Zener Diode Voltage Regulator",
                "Basic Logic Gate Verifier",
                "Op-Amp Audio Amplifier",
                "Stepper Motor Controller"
            ]
        }
    },

    "PH25C05": {
        name: "Applied Physics (ME) – II",
        semester: 2,
        objective: "To impart fundamental knowledge of rigid body dynamics, thermal physics, phase transitions, and functional materials.",
        units: {
            1: { title: "Rigid Body Dynamics", desc: "Centre of mass, Moment of inertia (circular disc, solid/hollow cylinder, sphere), Gear, shaft, gyroscope." },
            2: { title: "Thermal Physics", desc: "Thermal conductivity, Transient plane source/Line Source methods, Forbe’s method, conduction through compound media, Laws of Thermodynamics." },
            3: { title: "Phase Transitions", desc: "Solid solutions, single component system, binary phase diagrams, Iron-carbon equilibrium diagram, T-T-T diagram, heat treatment of steels." },
            4: { title: "Functional Materials", desc: "Ceramics, Composites, Fiber Reinforced Plastics, Metallic Glasses, LED Characteristics." }
        },
        cos: {
            CO1: "Explain the concepts of physics in mechanical engineering stream.",
            CO2: "Apply appropriate techniques in physics to solve engineering problems.",
            CO3: "Analyse physical systems and interpret data from the virtual studies."
        },
        topics: {
            presentation: [
                "Gyroscopic Effects in Vehicles",
                "Thermal Conductivity of Composite Walls",
                "Iron-Carbon Phase Diagram",
                "T-T-T Diagram and Heat Treatment",
                "Fiber Reinforced Plastics in Aerospace",
                "Metallic Glasses Properties and Uses",
                "Laws of Thermodynamics in Engines",
                "Moment of Inertia of Rotating Shafts",
                "LED Characteristics and Efficiency",
                "Heat Conduction Measurements"
            ],
            miniproject: [
                "Simple Gyroscope Model",
                "Thermal Conductivity Tester",
                "Phase Diagram Visualizer",
                "Composite Material Strength Demo",
                "LED Dimming Circuit"
            ]
        }
    },

    "CY25C03": {
        name: "Applied Chemistry (ME) – II",
        semester: 2,
        objective: "To explore the mechanisms and working principles of smart materials and coatings with real-world applications.",
        units: {
            1: { title: "Functional Materials", desc: "Types, Smart coatings, Mechanisms, Sustainable energy materials." },
            2: { title: "Fuels", desc: "Classification, Chemical Composition, natural resources, Calorific Value, Alternative Fuels, Natural gas benefits." },
            3: { title: "Composites and Lubricants", desc: "Matrix materials, Reinforcements, Hybrid composites. Lubricant Types, Synthetic lubricants, Mechanisms." },
            4: { title: "Combustion", desc: "Reaction Kinetics, Stoichiometric combustion, Air-fuel ratio, Knocking and Anti-knocking agents, Flue Gas analysis." },
            5: { title: "Adhesives", desc: "Adhesion Mechanisms, Classification, Bond strength, Industrial adhesives." }
        },
        cos: {
            CO1: "Explain the major concepts of chemistry with regard to applications in mechanical systems.",
            CO2: "Apply the chemistry principles and evaluate the engineering materials.",
            CO3: "Analyse and evaluate the performance and efficiency of mechanical systems.",
            CO4: "Propose innovative solutions for real-world applications and challenges."
        },
        topics: {
            presentation: [
                "Smart Coatings in Automobiles",
                "Sustainable Energy Materials",
                "Alternative Fuels for Engines",
                "Knocking and Octane Number",
                "Flue Gas Analysis Techniques",
                "Synthetic Lubricants vs Mineral Oils",
                "Carbon Fiber Composites",
                "Industrial Adhesives in Manufacturing",
                "Calorific Value Calculation",
                "Hydrogen Fuel Combustion"
            ],
            miniproject: [
                "Air-Fuel Ratio Calculator",
                "Lubricant Viscosity Demonstrator",
                "Calorimeter Simulation App",
                "Adhesive Bond Strength Tester",
                "Fuel Efficiency Comparison Tool"
            ]
        }
    }
};

/* ══════════════════════════════════════════════════════════════════════
 *  MCE_LABS — Lab experiments per semester
 * ══════════════════════════════════════════════════════════════════════ */
const MCE_LABS = {
    /* Semester 2 Labs (Batch 2029 - R2025) */
    2: [
        {
            code: "ME25C05", name: "Re-Engineering for Innovation", experiments: [
                "Bootcamp 1: Disassembly of simple products and measurements",
                "Bootcamp 1: CAD modeling of disassembled parts and Virtual assembly",
                "Bootcamp 2: Embedded System Programming (interfacing sensors, reading data)",
                "Reverse Engineering: Sketch and prototype alternative designs",
                "Reverse Engineering: Manufacture prototype parts using 3D printing",
                "Reverse Engineering: Assemble prototype product"
            ]
        }
    ]
};
