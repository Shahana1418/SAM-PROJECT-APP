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
    },

    "CS3452": {
        name: "Theory of Computation",
        semester: 4,
        objective: "To introduce the fundamental concepts of formal languages, automata theory, and computability, developing a foundation for compiler design and algorithm analysis.",
        units: {
            1: { title: "Automata and Regular Expressions", desc: "Need for automata theory, Finite Automata (FA), Deterministic (DFA) and Non-deterministic (NFA), Equivalence between NFA and DFA, FA with Epsilon transitions, Minimization of DFAs." },
            2: { title: "Regular Expressions and Languages", desc: "Regular expressions, Equivalence of Finite Automata and regular expressions, Proving languages to be non-regular (Pumping Lemma), Closure properties of regular languages." },
            3: { title: "Context Free Grammar and PDA", desc: "Chomsky's hierarchy, Context-Free Grammar (CFG), Derivations, Parse trees, Ambiguity, Push Down Automata (PDA), Equivalence of PDA and CFG, Deterministic PDA." },
            4: { title: "Normal Forms and Turing Machines", desc: "Simplification of CFG, Chomsky Normal Form (CNF), Greibach Normal Form (GNF), Pumping Lemma for CFL, Turing Machines (TM) basic model, TM as computer of integer functions." },
            5: { title: "Undecidability", desc: "Unsolvable problems, Post Correspondence Problem (PCP), Recursive and recursively enumerable languages, Universal Turing machine, Tractable and intractable problems, P and NP completeness." }
        },
        cos: {
            CO1: "Construct automata for any given pattern and find its equivalent regular expressions.",
            CO2: "Design and implement pushdown automata for context-free languages.",
            CO3: "Evaluate various normal forms for context-free grammars.",
            CO4: "Design Turing machines for various computational problems.",
            CO5: "Determine the decidability and intractability of computational problems."
        },
        topics: {
            presentation: [
                "Applications of Finite Automata in Network Protocols",
                "Regular Expressions in Text Processing and Lexical Analysis",
                "Pumping Lemma: Proving Non-Regularity",
                "Chomsky Hierarchy of Formal Languages",
                "Pushdown Automata vs Finite Automata",
                "Ambiguity in Context-Free Grammars",
                "The Halting Problem and Turing Machines",
                "Universal Turing Machine Architecture",
                "P vs NP Problem Overview",
                "Post Correspondence Problem (PCP)"
            ],
            miniproject: [
                "DFA Simulator matching Binary Strings",
                "Regular Expression to NFA Converter",
                "CFG Derivation Tree Generator",
                "Turing Machine Simulator in Python",
                "Context-Free Language Checker"
            ]
        }
    },

    "CS3491": {
        name: "Artificial Intelligence and Machine Learning",
        semester: 4,
        objective: "To understand the various characteristics of Intelligent agents, learn different search strategies in AI, and learn fundamentals of machine learning.",
        units: {
            1: { title: "Problem Solving", desc: "Introduction to AI, Problem-solving agents, Uninformed search, Heuristic search, Local search, Adversarial search, Constraint Satisfaction Problems (CSP)." },
            2: { title: "Probabilistic Reasoning", desc: "Acting under uncertainty, Bayesian inference, Naive Bayes models, Probabilistic reasoning, Bayesian networks, Exact and approximate inference, Causal networks." },
            3: { title: "Supervised Learning", desc: "Linear Regression (Least squares, gradient descent), Linear Classification (Logistic regression, Naive Bayes), Maximum margin classifiers (SVM), Decision Trees, Random Forests." },
            4: { title: "Ensemble Techniques and Unsupervised Learning", desc: "Model combination schemes, Voting, Ensemble learning (Bagging, Boosting, Stacking), Unsupervised learning (K-means, KNN, Gaussian mixture models, EM algorithm)." },
            5: { title: "Neural Networks", desc: "Perceptrons, Multilayer perceptrons, Activation functions, Network training (gradient descent, SGD), Backpropagation, Shallow to Deep networks, ReLU, Batch normalization, Dropout." }
        },
        cos: {
            CO1: "Use appropriate search algorithms for any AI problem.",
            CO2: "Represent a problem using probabilty and apply Bayesian inference.",
            CO3: "Apply supervised learning algorithms for classification and regression.",
            CO4: "Apply unsupervised learning and ensemble methods to datasets.",
            CO5: "Design and train basic Artificial Neural Networks."
        },
        topics: {
            presentation: [
                "A* Search Algorithm and Heuristics",
                "Minimax Algorithm and Alpha-Beta Pruning in Games",
                "Applications of Bayesian Networks in Medical Diagnosis",
                "Gradient Descent Optimization in Machine Learning",
                "Support Vector Machines (SVM) Kernels",
                "Decision Trees vs Random Forests",
                "Ensemble Methods: Bagging vs Boosting",
                "K-Means Clustering and determining 'K'",
                "The Vanishing Gradient Problem in Deep Networks",
                "Dropout and Regularization in Neural Networks"
            ],
            miniproject: [
                "Tic-Tac-Toe using Minimax Agent",
                "Spam Email Classifier using Naive Bayes",
                "House Price Prediction using Linear Regression",
                "Customer Segmentation using K-Means Clustering",
                "Digit Recognition using Multilayer Perceptron (MLP)"
            ]
        }
    },

    "CS3492": {
        name: "Database Management Systems",
        semester: 4,
        objective: "To learn the fundamentals of data models, database design, SQL querying, transaction processing, concurrency control, and database implementation techniques.",
        units: {
            1: { title: "Relational Databases", desc: "Purpose of database systems, data models, database architecture. Relational model, keys, relational algebra, SQL fundamentals, advanced SQL features, embedded and dynamic SQL." },
            2: { title: "Database Design", desc: "Entity-Relationship model, ER diagrams, ER to Relational mapping. Functional dependencies, non-loss decomposition, Normal forms (1NF, 2NF, 3NF, BCNF, 4NF, 5NF)." },
            3: { title: "Transactions", desc: "Transaction concepts, ACID properties, serializability, two-phase locking, timestamp validation, deadlock handling, recovery methods (Aries, shadow paging)." },
            4: { title: "Implementation Techniques", desc: "RAID technology, file organization, data dictionary, indexing and hashing (B+ trees, static/dynamic hashing), query processing, query optimization." },
            5: { title: "Advanced Topics", desc: "Distributed database management system architecture, types of distributed databases, data fragmentation, replication, and allocation techniques." }
        },
        cos: {
            CO1: "Construct ER models and write complex relational algebra and SQL queries.",
            CO2: "Design robust databases using normalization techniques (up to BCNF).",
            CO3: "Understand transaction properties, concurrency control, and deadlock resolution.",
            CO4: "Understand data storage, indexing structures, and query optimization.",
            CO5: "Gain knowledge on the architecture and concepts of Distributed Databases."
        },
        topics: {
            presentation: [
                "Database System Architecture vs File Systems",
                "Entity-Relationship Modeling for a Hospital System",
                "Boyce-Codd Normal Form (BCNF) vs 3NF",
                "ACID Properties of Database Transactions",
                "Two-Phase Locking (2PL) Protocol",
                "Deadlock Prevention and Detection in DBMS",
                "B+ Tree Indexing Mechanism",
                "RAID Levels and Data Redundancy",
                "Query Optimization Techniques",
                "Data Fragmentation in Distributed Databases"
            ],
            miniproject: [
                "Library Management System Schema Design",
                "Interactive SQL Query Executor App",
                "Transaction Log Simulator",
                "B+ Tree Visualizer Program",
                "Mini Distributed Database Node Communicator"
            ]
        }
    },

    "IT3401": {
        name: "Web Essentials",
        semester: 4,
        objective: "To comprehend and analyze basic web programming, understand the client-server model, utilize scripting languages, and create database-driven applications.",
        units: {
            1: { title: "Website Basics", desc: "Internet overview, network concepts, web protocols, URL, IP, Domain Name, web browsers/servers, working principle of a website, client-side and server-side scripting." },
            2: { title: "Web Designing", desc: "HTML5 (Form Elements, Input types, Media elements). CSS3 (Selectors, Box Model, Backgrounds, Borders, Text Effects, Animations, Multiple Column Layout)." },
            3: { title: "Client-Side Processing and Scripting", desc: "JavaScript variables, datatypes, operators, functions, objects, arrays, DOM, regular expressions, exception handling, event handling, form validation." },
            4: { title: "Server-Side Processing and Scripting – PHP", desc: "PHP variables, constants, operators, flow control, arrays, strings, functions, file handling, file uploading, email basics, integrating PHP and HTML." },
            5: { title: "Servlets and Database Connectivity", desc: "Java Servlet Architecture, Servlet Life cycle, Form GET/POST actions, sessions, cookies, database connectivity (JDBC), interactive database applications." }
        },
        cos: {
            CO1: "Understand the fundamentals of internet protocols and the client-server architecture.",
            CO2: "Design responsive web pages utilizing HTML5 and CSS3.",
            CO3: "Develop interactive web pages using JavaScript and DOM manipulation.",
            CO4: "Build dynamic server-side web applications using PHP.",
            CO5: "Develop database-driven web applications using Java Servlets and JDBC."
        },
        topics: {
            presentation: [
                "The Evolution of Web Protocols (HTTP/HTTPS)",
                "HTML5 Semantic Tags and Accessibility",
                "CSS3 Box Model and Flexbox Layout",
                "JavaScript Event Capturing vs Bubbling",
                "Client-Side Form Validation Techniques",
                "PHP File Uploads and Security Measures",
                "State Management: Cookies vs Sessions",
                "Java Servlet Life Cycle Explained",
                "Connecting Databases using JDBC",
                "Cross-Site Scripting (XSS) Prevention"
            ],
            miniproject: [
                "Responsive Portfolio Website",
                "Interactive Quiz App using JS",
                "PHP Based User Registration/Login System",
                "Servlet-based Feedback Form with DB Storage",
                "Simple E-commerce Cart utilizing Sessions"
            ]
        }
    },

    "CS3451": {
        name: "Introduction to Operating Systems",
        semester: 4,
        objective: "To understand the basics of operating systems, analyze scheduling algorithms, process synchronization, memory management, and file system implementation.",
        units: {
            1: { title: "Introduction", desc: "Elements of computer systems, OS overview, objectives, functions, evolution, OS structures, services, user interfaces, system calls, system programs." },
            2: { title: "Process Management", desc: "Process scheduling, IPC, CPU scheduling algorithms. Threads (multithreading), process synchronization (critical-section, semaphores, monitors), deadlock handling (avoidance, detection)." },
            3: { title: "Memory Management", desc: "Main memory, swapping, contiguous allocation, paging, segmentation. Virtual memory, demand paging, copy-on-write, page replacement algorithms, thrashing." },
            4: { title: "Storage Management", desc: "Mass storage, disk scheduling. File-system interface (concept, access methods, directory structure), file system implementation (allocation methods, free space management), I/O systems." },
            5: { title: "Virtual Machines and Mobile OS", desc: "Virtual machines (history, benefits, types, implementations). Introduction to mobile operating systems (iOS and Android architecture/components)." }
        },
        cos: {
            CO1: "Understand the basic structure, components, and system calls of an Operating System.",
            CO2: "Analyze various CPU scheduling algorithms and process synchronization mechanisms.",
            CO3: "Evaluate deadlock handling methods and memory management schemes.",
            CO4: "Understand file system implementation and mass storage management.",
            CO5: "Gain insight into virtual machines and mobile operating systems."
        },
        topics: {
            presentation: [
                "Types of System Calls in an OS",
                "A Comparative Study of CPU Scheduling Algorithms",
                "The Producer-Consumer Problem using Semaphores",
                "Banker's Algorithm for Deadlock Avoidance",
                "Paging vs Segmentation in Memory Management",
                "Page Replacement Algorithms (FIFO, LRU, Optimal)",
                "Disk Scheduling Algorithms (SCAN, C-SCAN, SSTF)",
                "File Allocation Methods (Contiguous, Linked, Indexed)",
                "Hypervisors and Virtual Machine Architecture",
                "Android OS Architecture Overview"
            ],
            miniproject: [
                "CPU Scheduling Algorithm Simulator (RR, SJF)",
                "Banker's Algorithm implementation in Python",
                "Page Replacement Strategy Analyzer",
                "Simple Linux Shell Interface Emulator",
                "Disk Scheduling Visualizer"
            ]
        }
    },

    /* ══════════════════════════════════════════════════════════════════
     *  SEMESTER  6  —  BATCH 2027  (R2021)
     * ══════════════════════════════════════════════════════════════════ */

    "CCS356": {
        name: "Object Oriented Software Engineering",
        semester: 6,
        objective: "To provide a solid foundation in software engineering principles, with a strict focus on object-oriented methodologies, UML design, testing, and modern agile project management.",
        units: {
            1: { title: "Software Process and Agile Development", desc: "Fundamentals of software engineering, iterative/incremental process models, agile development, extreme programming (XP), agile modeling." },
            2: { title: "Requirements Analysis and Specification", desc: "Requirements gathering, formal system specification, object modeling using UML. Use case models, class diagrams, interaction, activity, and state chart diagrams. DFDs." },
            3: { title: "Software Design", desc: "Design concepts, coupling, cohesion. Design patterns: MVC, Publish-Subscribe, Adapter, Command, Strategy, Observer. Architectural styles: Layered, Client-Server, Pipe and Filter." },
            4: { title: "Software Testing and Maintenance", desc: "Unit testing, black-box, white-box, integration, system, and regression testing. Debugging techniques, symbolic execution, model checking." },
            5: { title: "Project Management", desc: "Software configuration management, project scheduling. Introduction to DevOps: cloud platform, deployment pipeline (architecture, testing, deployment, tools)." }
        },
        cos: {
            CO1: "Understand contemporary agile software development processes.",
            CO2: "Gather requirements and document them using robust UML models.",
            CO3: "Apply appropriate design patterns and architectural styles to software design.",
            CO4: "Develop rigorous test cases using various software testing methodologies.",
            CO5: "Manage software projects using configuration management and DevOps practices."
        },
        topics: {
            presentation: [
                "Agile vs Waterfall Software Development",
                "Extreme Programming (XP) Core Practices",
                "Gathering Requirements: Use Cases vs User Stories",
                "UML Sequence Diagrams for System Interactions",
                "Coupling and Cohesion in Object-Oriented Design",
                "The Model-View-Controller (MVC) Pattern",
                "Behavioral Design Patterns: Observer and Command",
                "White-Box Testing vs Black-Box Testing",
                "The Role of Configuration Management Tools (Git)",
                "DevOps CI/CD Pipelines Explained"
            ],
            miniproject: [
                "UML Document Generator (SRS) for a Library System",
                "Design Pattern Implementation (MVC/Observer) App",
                "Automated Unit Testing Suite (JUnit/PyTest)",
                "Simple Bug Tracking and Version Control Simulator",
                "Basic CI/CD Script Mockup"
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
