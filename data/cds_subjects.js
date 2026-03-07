/**
 * CDS_SUBJECTS — Syllabus details for CSE-DS core subjects
 */

const CDS_SUBJECTS = {

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
                "Matrix Applications in Machine Learning"
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

    "CS25C06": {
        name: "Digital Principles and Computer Organization",
        semester: 2,
        objective: "To impart knowledge on digital logic and provide functional concepts of computer systems with necessary illustrations.",
        units: {
            1: { title: "Digital Logic", desc: "Integer Arithmetic, Signed Numbers, Boolean Algebra, Truth Table, Simplification using K-Maps, Logic Gates, Universal gates." },
            2: { title: "Computer System", desc: "Basic structure of a computer, Von Neumann architecture, Harvard architecture, Instruction execution cycle, Performance metrics: MIPS, MFLOPS, CPI." },
            3: { title: "Arithmetic and Logic Unit", desc: "Adders, Binary Parallel Adder, Subtractor, Multiplexers, Decoders, Fast Multiplication, Floating Point Numbers, Booth’s algorithm, Flip-Flops, Registers, Counters." },
            4: { title: "Processing and Pipelining", desc: "RISC vs CISC, Addressing modes, Control unit, Pipelining, Hazards, Instruction-level parallelism, SIMD, MIMD." },
            5: { title: "Memory and I/O Systems", desc: "Memory hierarchy, Cache Organization, replacement policies, NUMA, DMA, Programmed I/O, Interrupt-Driven I/O, Interrupt Priority." }
        },
        cos: {
            CO1: "Identify basic digital components and their functions in a computer system.",
            CO2: "Apply Boolean algebra and number systems to design simple digital circuits.",
            CO3: "Analyze instruction sets, arithmetic units, and performance metrics.",
            CO4: "Engage in continuous learning to update with advancements through evolving computing trends."
        },
        topics: {
            presentation: [
                "Instruction-Level Parallelism",
                "Cache Replacement Policies",
                "Von Neumann vs Harvard Architecture",
                "Pipelining Hazards and Solutions",
                "Logic Gate Implementations",
                "DMA Controller and Operations",
                "Floating Point Arithmetic",
                "RISC vs CISC Processors",
                "Superscalar Processors",
                "Karnaugh Map Simplification"
            ],
            miniproject: [
                "MIPS/CPI Calculator",
                "Logic Gate Simulator Tool",
                "Booth's Algorithm Visualizer",
                "Basic Processor Emulator",
                "Cache Policy Simulator"
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

    "CS25C07": {
        name: "Object Oriented Programming",
        semester: 2,
        objective: "To impart the principles of object-oriented programming and their advantages over procedural programming.",
        units: {
            1: { title: "Principles of Object-Oriented Programming", desc: "Characteristics of object-oriented languages, C++ Program structure, POP vs OOP, tokens, variables, operators, Namespace, flow Control statements." },
            2: { title: "Classes and Objects", desc: "Abstraction mechanism: Classes, Objects, member data, member functions, Constructors, destructors, inline function, friend function, static members." },
            3: { title: "Inheritance and Compile Time Polymorphism", desc: "Derived Classes, Single/Multilevel/Multiple/Hierarchical/Hybrid inheritance. Compile time Polymorphism, Overloading Functions, Overloading Operators." },
            4: { title: "Pointers and Runtime Polymorphism", desc: "Pointers, this pointer, Pointers to Derived/Base classes, Runtime Polymorphism, Virtual functions, Abstract classes, Pure virtual functions, Virtual Destructors." },
            5: { title: "Templates, Exception Handling and File I/O", desc: "Class/Function Templates, iterators, hashes, IO streams; Exception Handling. Formatted/Unformatted I/O, File stream classes, File modes, Sequential Read/Write." }
        },
        cos: {
            CO1: "Understand the core OOP concepts and applications.",
            CO2: "Apply Object Oriented Paradigms to solve problems using C++.",
            CO3: "Design and Analyze solutions involving code reusability and complexity management.",
            CO4: "Demonstrate life-long learning skills through application development."
        },
        topics: {
            presentation: [
                "Object Oriented vs Procedure Oriented Programming",
                "Constructors and Destructors in C++",
                "Operator Overloading Techniques",
                "Virtual Functions and Runtime Polymorphism",
                "Types of Inheritance in C++",
                "Exception Handling Mechanisms",
                "Function and Class Templates",
                "File I/O Operations in C++",
                "Memory Allocation and Pointers in C++",
                "Abstract Classes and Pure Virtual Functions"
            ],
            miniproject: [
                "Library Management System",
                "Student Database System",
                "Banking Application in C++",
                "File Handling Utility",
                "Matrix Operations library via Operator Overloading"
            ]
        }
    }
};

/* ══════════════════════════════════════════════════════════════════════
 *  CDS_LABS — Lab experiments per semester
 * ══════════════════════════════════════════════════════════════════════ */
const CDS_LABS = {
    /* Semester 2 Labs (Batch 2029 - R2025) */
    2: [
        {
            code: "CS25C07", name: "Object Oriented Programming (Practical)", experiments: [
                "Simple programs utilizing Operators, and type conversion",
                "Programs utilizing Conditional and Loop statements",
                "Programs utilizing in-line and friend functions",
                "Programs utilizing constructors and destructors",
                "Programs implementing inheritance and its types",
                "Programs utilizing friend function and operator overloading",
                "Programs for pointer manipulation and virtual functions",
                "Programs utilizing function and class templates",
                "Programs implementing exception handling",
                "Programs for error handling in file and I/O management",
                "Develop comprehensive applications utilizing OOP features"
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
