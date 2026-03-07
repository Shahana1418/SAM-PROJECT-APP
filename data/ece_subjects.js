/**
 * ECE_SUBJECTS — Syllabus details for ECE core subjects
 */

const ECE_SUBJECTS = {

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
                "Matrix Applications in ECE"
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

    "EC25C01": {
        name: "Electron Devices",
        semester: 2,
        objective: "To acquaint with the construction, theory and operation of the basic electronic devices such as PN junction diode, Bipolar and Field Effect Transistors, Power control devices, LED, LCD and other Optoelectronic devices.",
        units: {
            1: { title: "Semiconductor", desc: "Types, Conductivity, Electron energy levels, Carrier concentration, Drift and diffusion, Current density, Continuity equation." },
            2: { title: "PN Junction Diodes", desc: "Energy band diagram, Forward and reverse bias, Diode resistance, Capacitance. Special Diodes: Zener, Varactor, Tunnel, Photo diode." },
            3: { title: "Bipolar Junction Transistors", desc: "Construction, working, CB, CE, CC configurations, Early effect, Multi-emitter transistor." },
            4: { title: "Field Effect Transistors", desc: "JFET construction, MOSFET (depletion and enhancement), CMOS introduction." },
            5: { title: "Thyristors and Optoelectronic Devices", desc: "SCR, TRIAC, DIAC, UJT. LED, LCD, Photo transistor, Opto-coupler, Power MOSFETs." }
        },
        cos: {
            CO1: "Explain the behavior of Semiconductor physics and its applications in electron devices.",
            CO2: "Apply the concepts and compare the different configuration of various electron devices.",
            CO3: "Analyze and interpret the characteristics of various electron devices.",
            CO4: "Perform experiments to evaluate and compare the characteristics of electronic components."
        },
        topics: {
            presentation: [
                "Semiconductor Drift and Diffusion",
                "Tunnel Diode and Negative Resistance",
                "BJT Configurations and Early Effect",
                "MOSFET Enhancement vs Depletion",
                "CMOS Technology Basics",
                "SCR Working Principle",
                "UJT as Relaxation Oscillator",
                "Optocoupler Applications",
                "Zener Diode as a Voltage Regulator",
                "Differences between BJT and FET"
            ],
            miniproject: [
                "Zener Voltage Regulator Circuit",
                "UJT Relaxation Oscillator Demo",
                "BJT Common Emitter Amplifier",
                "LED Dimmer using MOSFET",
                "Optoisolator Relay Control",
                "Simple Light Detector using Photodiode",
                "Transistor as a Switch",
                "SCR Power Control Circuit",
                "MOSFET Motor Driver",
                "Diode Clipping and Clamping Circuits"
            ]
        }
    },

    "EC25C02": {
        name: "Circuits and Network Analysis",
        semester: 2,
        objective: "To impart the fundamental principles of circuit laws, network theorems, and analysis techniques for DC and AC circuits.",
        units: {
            1: { title: "Circuit Laws and Network Theorems", desc: "Mesh and Nodal Analysis, Source transformation, Star delta, Thevenin’s, Norton’s, Superposition, Maximum power, Reciprocity." },
            2: { title: "Steady-State and Transient Analysis", desc: "Phasor relationship, Natural and forced response, Steady-state and Transient analysis of RL, RC, RLC circuits using Laplace Transform." },
            3: { title: "Resonance and Coupled Circuits", desc: "Series and Parallel resonance, Quality factor, Bandwidth. Self and Mutual inductance, Ideal Transformer." },
            4: { title: "Linear Two-Port Network Analysis", desc: "Impedance, admittance, hybrid, and transmission parameters, interconnection of two-port networks." }
        },
        cos: {
            CO1: "Explain basic circuit laws, network theorems, and the behavior of circuit components.",
            CO2: "Apply network analysis methods, such as mesh analysis and nodal analysis, for solving DC circuits.",
            CO3: "Analyze and evaluate the steady-state and transient behaviors of RL RC, RLC circuits and two-port networks."
        },
        topics: {
            presentation: [
                "Thevenin's and Norton's Theorems",
                "Superposition and Maximum Power Transfer",
                "Transient Response of RC Circuits",
                "Laplace Transform in Circuit Analysis",
                "Series and Parallel Resonance",
                "Quality Factor and Bandwidth",
                "Mutual Inductance and Dot Convention",
                "Z and Y Parameters of Two-Port Networks",
                "ABCD Transmission Parameters",
                "Mesh vs Nodal Analysis"
            ],
            miniproject: [
                "Thevenin Equivalent Circuit Solver App",
                "RLC Resonance Calculator",
                "Circuit Simulation using Open-Source Tools",
                "Transient Response Graph Plotter",
                "Two-Port Parameter Converter",
                "Maximum Power Transfer Demonstrator",
                "Star-Delta Transformation Tool",
                "AC Phasor Diagram Visualizer",
                "Low Pass and High Pass Filter Analysis",
                "Coupled Inductor Circuit Analyzer"
            ]
        }
    },

    "CS25C05": {
        name: "Data Structures using C++",
        semester: 2,
        objective: "To provide an understanding of object-oriented programming principles using C++ and data structures.",
        units: {
            1: { title: "Data Abstraction & Overloading", desc: "C++ Structures, Classes, Constructors, Dynamic Memory Allocation, Function and Operator Overloading." },
            2: { title: "Inheritance & Polymorphism", desc: "Base/Derived Classes, Overriding, Virtual functions, Abstract Classes, Dynamic Binding." },
            3: { title: "Linear Data Structures", desc: "Asymptotic Notations, Arrays, Stacks, Queues, Linked lists, Evaluation of Expressions." },
            4: { title: "Non-Linear Data Structures", desc: "Trees, Binary Trees, Traversals, Graph and representations, Connected components, STL." },
            5: { title: "Searching, Sorting and Complexity Analysis", desc: "Insertion sort, Merge sort, Quicksort, Heapsort, Linear and Binary Search." }
        },
        cos: {
            CO1: "Explain the concepts and applications of Data Structure in various engineering applications.",
            CO2: "Apply various Data Structure in real time.",
            CO3: "Develop suitable and interrupt the data in real world applications."
        },
        topics: {
            presentation: [
                "Operator Overloading in C++",
                "Virtual Functions and Polymorphism",
                "Big-Oh Asymptotic Notation",
                "Stack vs Queue Applications",
                "Linked List Operations",
                "Binary Tree Traversals",
                "Graph Search Algorithms (BFS/DFS)",
                "Merge Sort vs Quick Sort",
                "Hash Tables and Collision Resolution",
                "Standard Template Library (STL)"
            ],
            miniproject: [
                "Student Database using Linked Lists",
                "Infix to Postfix Converter",
                "Bank Queue Simulation",
                "Binary Search Tree Visualizer",
                "Graph Shortest Path Finder",
                "Sorting Algorithm Comparator",
                "Polynomial Addition using Linked Lists",
                "Simple C++ String Class Implementation",
                "Dictionary using Hash Maps",
                "File Compression using Huffman Coding"
            ]
        }
    }
};

/* ══════════════════════════════════════════════════════════════════════
 *  ECE_LABS — Lab experiments per semester
 * ══════════════════════════════════════════════════════════════════════ */
const ECE_LABS = {
    /* Semester 2 Labs (Batch 2029 - R2025) */
    2: [
        {
            code: "EC25C01", name: "Electron Devices (Practical)", experiments: [
                "Input and Output characteristics of BJT",
                "Input and Output characteristics of JFET",
                "Input and Output characteristics of MOSFET",
                "VI characteristics of SCR and UJT"
            ]
        },
        {
            code: "EC25C02", name: "Circuits and Network Analysis (Practical)", experiments: [
                "Verifications of KVL & KCL",
                "Verification of Mesh and Nodal analysis of DC circuits",
                "Verification of Thevenin’s and Norton’s theorems",
                "Create a physical model of RL, RC, or RLC circuit to observe transient/steady-state behaviour using LTspice",
                "Determination of Resonance Frequency of Series & Parallel RLC Circuits",
                "Transient analysis of RL and RC circuits",
                "Measurement of Impedance Parameters (Z-Parameters)",
                "Explore behavior of two interconnected two-port networks (symmetry/reciprocity)"
            ]
        },
        {
            code: "CS25C05", name: "Data Structures using C++ (Practical)", experiments: [
                "Program to Implement Constructors and Destructors",
                "Program to implement Member Functions, Classes and Friend Functions",
                "Program to Implement Dynamic Memory Allocation and Overloading",
                "Program to Implement various inheritances and virtual functions",
                "Implementation of method overriding and operator overloading",
                "Program to implement various operations on arrays and linked lists",
                "Program to implement operations on stacks and queues",
                "Evaluate Infix Expressions by converting into Prefix and Postfix",
                "Implement Binary Tree Traversal and Graph Traversal Algorithm",
                "Implement Single Source Shortest Path and All Pair Shortest Path",
                "Find Minimal Spanning Tree for a Graph",
                "Implement Linear Search, Binary Search, Merge, Quick, and Heap Sort"
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
