/**
 * IMT_SUBJECTS — Syllabus details for IMT core subjects
 */

const IMT_SUBJECTS = {

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
                "Matrix Applications in IT"
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

    "PH25C03": {
        name: "Applied Physics (CSIE) – II",
        semester: 2,
        objective: "To provide a comprehensive understanding of physics concepts in computer science and engineering applications.",
        units: {
            1: { title: "Magnetic Materials", desc: "Magnetic Parameters, Ferromagnetic materials, Ferrites, Hard/Soft magnetic materials, GMR sensors, magnetic disk memories, Magnetic data storage." },
            2: { title: "Logic Gates", desc: "Binary/Decimal Conversion, logic gates (OR, AND, NOT, NAND, NOR, XOR), Karnaugh Map simplification." },
            3: { title: "Nano-Devices", desc: "Electron density, size dependence of Fermi energy, quantum confinement, quantum wells, wires, dots, Tunneling, single electron transistor, Carbon nanotubes." },
            4: { title: "Quantum Computing", desc: "Quantum states, classical bits vs qubits, Bloch sphere, CNOT gate, Pauli gates, Hadamard Gate, advantage of quantum computing." }
        },
        cos: {
            CO1: "Explain the concepts of physics in computer science stream.",
            CO2: "Apply appropriate techniques in physics to solve engineering problems.",
            CO3: "Analyse physical systems and interpret data from the virtual studies in the core branches."
        },
        topics: {
            presentation: [
                "GMR Sensors and Magnetic Data Storage",
                "Boolean Algebra and Karnaugh Maps",
                "Quantum Dots and Wires",
                "Single Electron Transistors",
                "Carbon Nanotubes and Applications",
                "Classical Bits vs Qubits",
                "Quantum Logic Gates",
                "Magnetic Memory Operations",
                "Tunneling and Coulomb Blockade",
                "Advantage of Quantum Computing over Classical Computing"
            ],
            miniproject: [
                "Logic Gate Simulator App",
                "Magnetic Memory Concept Demo",
                "Qubit State Visualizer",
                "Bloch Sphere Interactive Demo",
                "Carbon Nanotube Structure Model"
            ]
        }
    },

    "IT25201": {
        name: "Foundations of Data Science Using Python",
        semester: 2,
        objective: "To equip students with a strong foundational understanding of data science concepts and perform data operations using Python.",
        units: {
            1: { title: "Python Language Basics and Data Structures", desc: "Python Basics, Control Flow, Tuple, List, dict, set, Comprehensions, Functions, Scope, Files." },
            2: { title: "Numpy Basics", desc: "The NumPy ndarray, Fast Element-Wise Array Functions, Array-Oriented Programming, Linear Algebra, Pseudorandom Number Generation." },
            3: { title: "Pandas Basics and Data Loading", desc: "pandas Data Structures, Descriptive Statistics, Data Cleaning, Reading/Writing Data in Text Format, APIs, Databases." },
            4: { title: "Data Exploration and Wrangling", desc: "Data Transformation, String Manipulation, Hierarchical Indexing, Combining Datasets, Reshaping, Aggregation, GroupBy." },
            5: { title: "Data Visualization", desc: "Visualizing categorical and time series data, Distributions, Relationships, Multivariate Visualization." }
        },
        cos: {
            CO1: "Develop simple programs in Python with built-in data structures.",
            CO2: "Apply NumPy and Pandas libraries to organize and manipulate data efficiently.",
            CO3: "Design and analyze solutions involving APIs, databases, and real-world datasets.",
            CO4: "Enhance life-long learning skills to explore new data science tools."
        },
        topics: {
            presentation: [
                "Python Dictionary vs Set Performance",
                "Vectorization with NumPy",
                "Broadcasting in NumPy",
                "Handling Missing Data in Pandas",
                "Interacting with Web APIs using Python",
                "Data Aggregation Operations (GroupBy)",
                "Time Series Data Analysis",
                "Multivariate Data Visualization",
                "Cleaning Real-World Data",
                "Interactive Visualizations with Python"
            ],
            miniproject: [
                "CSV Data Analyzer CLI",
                "Basic Sales Dashboard Generator",
                "Automated Missing Value Imputer",
                "Weather Data API Fetcher & Plotter",
                "Matrix Operations library via NumPy"
            ]
        }
    },

    "IT25202": {
        name: "Digital Principles and System Design",
        semester: 2,
        objective: "To understand basics of number systems, boolean algebra, and design combinational/sequential logic circuits using HDL.",
        units: {
            1: { title: "Boolean Algebra", desc: "Number Systems, 1's and 2's Complements, Binary Codes, Truth Table, Logic Gates, Universal gates." },
            2: { title: "Canonical Functions", desc: "Standard Forms, Minterms and Maxterms, SOP and POS, Conversions and Expansion." },
            3: { title: "Combinational Logic Design", desc: "Karnaugh Map simplification, Adders, Subtractors, BCD Adder, Multiplier, Magnitude Comparator, Mux/Demux." },
            4: { title: "Sequential Logic Design", desc: "Latches, Flip flops (SR, JK, T, D), Shift Registers, Ripple/Synchronous/Ring/Johnson Counters." },
            5: { title: "System Design", desc: "Memory Systems, RAM, ROM, error detection and correction, Design using PROM, PLA, PAL, FPGA." }
        },
        cos: {
            CO1: "Identify number systems and basic logic gates.",
            CO2: "Apply Boolean algebra and K-maps to simplify circuits.",
            CO3: "Design and analyze digital systems with sequential components using HDL.",
            CO4: "Explore modern tools and resources to keep learning about digital system design."
        },
        topics: {
            presentation: [
                "Number System Conversions",
                "Universal Gates (NAND/NOR)",
                "K-Map Simplification Techniques",
                "Look-Ahead Carry Adder Design",
                "Multiplexer as a Universal Logic Element",
                "Race Around Condition in JK Flip-Flop",
                "Design of Synchronous vs Asynchronous Counters",
                "Error Detection (Hamming Code)",
                "Programmable Logic Devices (PLA/PAL)",
                "Introduction to Verilog HDL"
            ],
            miniproject: [
                "Digital Clock using Counters",
                "4-bit Binary Multiplier Circuit",
                "Traffic Light Controller Logic",
                "Programmable ROM Simulator",
                "Hardware Description Language (HDL) Parser"
            ]
        }
    }
};

/* ══════════════════════════════════════════════════════════════════════
 *  IMT_LABS — Lab experiments per semester
 * ══════════════════════════════════════════════════════════════════════ */
const IMT_LABS = {
    /* Semester 2 Labs (Batch 2029 - R2025) */
    2: [
        {
            code: "IT25201", name: "Foundations of Data Science Using Python (Practical)", experiments: [
                "Programs using Data Frames and pandas",
                "Programs using functions and files",
                "Programs using numpy array slicing and broadcasting",
                "Solving linear algebra problems with numpy functions",
                "Data Aggregation and Descriptive Statistics",
                "Interacting with databases and Web APIs",
                "String manipulations and Data wrangling",
                "Handle time series data",
                "Visualization of Different kinds of Data",
                "Distribution Analysis plotting"
            ]
        },
        {
            code: "IT25202", name: "Digital Principles and System Design (Practical)", experiments: [
                "Simple functions using logic gates",
                "Implementation of boolean functions",
                "Simplification and expansion of standard Boolean functions",
                "Implementation of combinational circuits using gates for arbitrary functions",
                "Implementation of Arithmetic circuits",
                "Combinational circuits using code converters",
                "BCD adder, encoder and decoder circuits",
                "Design of sequential circuits to solve practical problems",
                "Project demonstration and presentation using PROM/PLA/FPGA"
            ]
        },
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
