/**
 * CSE_SUBJECTS — Computer Science and Engineering core subject data
 * Objectives, unit topics, and Course Outcomes taken from
 * Anna University R2021 / R2025 syllabus.
 *
 * Batch mapping:
 *   2027 → Semester 6  → CCS356, CS3691
 *   2028 → Semester 4  → CS3401, CS3451, CS3452, CS3491, Labs: CS3461, CS3481
 *   2029 → Semester 2  → MA25C02, EE25C01, CS25C06, PH25C03, CS25C07
 *
 * LABS — stored per-semester so the "Practicals" assignment type can list them.
 */
const CSE_SUBJECTS = {

    /* ══════════════════════════════════════════════════════════════════
     *  SEMESTER  6  —  BATCH 2027  (R2021)
     * ══════════════════════════════════════════════════════════════════ */

    "CCS356": {
        name: "Object Oriented Software Engineering",
        semester: 6,
        objective: "To understand software process models and agile development. To learn requirements engineering and analysis modelling. To understand design concepts and architectural design. To learn software testing strategies and techniques. To understand project management and DevOps.",
        units: {
            1: { title: "Software Process and Agile Development", desc: "Introduction to Software Engineering – Software Process – Perspective and Specialized Process Models – Introduction to Agility – Agile Process – Extreme Programming (XP) – XP Process." },
            2: { title: "Requirements Analysis and Modelling", desc: "Requirements Engineering – Eliciting Requirements – Developing Use Cases – Building the Analysis Model – Negotiating Requirements – Validating Requirements – UML – Class Diagrams – Sequence Diagrams – Activity Diagrams – Communication Diagrams." },
            3: { title: "Software Design", desc: "Design Process – Design Concepts – Coupling – Cohesion – Functional Independence – Design Patterns: Model-View-Controller, Publish-Subscribe, Adapter, Command, Strategy, Observer, Proxy, Facade – Architectural Styles: Layered, Client-Server, Tiered, Pipe and Filter – User Interface Design." },
            4: { title: "Testing and Quality Assurance", desc: "Software Testing Fundamentals – Internal and External Views of Testing – White Box Testing – Basis Path Testing – Control Structure Testing – Black Box Testing – Object-Oriented Testing Methods – Testing Methods Applicable at the Class Level – Interclass Test Case Design – Validation Testing – System Testing." },
            5: { title: "Project Management and DevOps", desc: "Software Project Management – Software Configuration Management – Project Scheduling – DevOps: Motivation – Cloud as a Platform – Operations – Deployment Pipeline: Overall Architecture, Building and Testing – Deployment – Tools." }
        },
        cos: {
            CO1: "Apply software process models and agile methodology for software development.",
            CO2: "Perform requirements analysis and develop analysis models using UML.",
            CO3: "Apply software design concepts and design patterns for system design.",
            CO4: "Apply testing strategies and techniques for software quality assurance.",
            CO5: "Apply project management practices and DevOps concepts."
        },
        topics: {
            presentation: [
                "Software Process Models – Waterfall vs Agile Comparison",
                "Extreme Programming (XP) – Values, Practices and Process",
                "UML Use Case Diagrams for Requirements Modelling",
                "UML Class Diagrams and Sequence Diagrams",
                "Coupling and Cohesion in Software Design",
                "Design Patterns – MVC, Observer and Strategy Patterns",
                "Architectural Styles – Layered and Client-Server Architecture",
                "White Box Testing – Basis Path and Control Structure Testing",
                "Black Box Testing – Equivalence Partitioning and Boundary Value",
                "Object-Oriented Testing Methods and Interclass Testing",
                "Software Configuration Management and Version Control",
                "DevOps Pipeline – CI/CD, Building, Testing and Deployment",
                "User Interface Design Principles and Guidelines",
                "Agile Scrum Framework – Roles, Events and Artifacts",
                "Validation Testing and System Testing Strategies"
            ],
            miniproject: [
                "Build a simple Student Management System using MVC pattern",
                "Design UML diagrams for an Online Shopping System",
                "Create a basic Bug Tracker web application with CRUD operations",
                "Implement Observer pattern in a simple Notification System",
                "Build a To-Do List app following Agile user stories",
                "Design and test a simple Calculator using White Box Testing",
                "Create a Library Management System with ER and Class Diagrams",
                "Build a CI/CD pipeline demo using GitHub Actions",
                "Implement a simple Chat Application using Client-Server architecture",
                "Design a Hospital Appointment Booking System with UML models",
                "Build a basic E-Commerce cart system with Strategy pattern",
                "Create automated test cases for a Login Module",
                "Implement a simple Blog platform with layered architecture",
                "Build a basic Inventory System with validation testing",
                "Design a simple DevOps deployment workflow using Docker"
            ]
        }
    },

    "CS3691": {
        name: "Embedded Systems and IoT",
        semester: 6,
        objective: "To understand the internal architecture and programming of embedded processors. To learn interfacing of I/O devices with embedded processors. To understand the evolution of IoT and its enabling technologies. To build low-cost embedded systems using Arduino and Raspberry Pi. To apply IoT concepts in real-world applications.",
        units: {
            1: { title: "8-Bit Embedded Processor", desc: "8-bit Microcontroller Architecture – Instruction Set and Programming – Programming Parallel Ports – Timers and Serial Port – Interrupt Handling." },
            2: { title: "Embedded C Programming", desc: "Memory and I/O Devices Interfacing – Programming Embedded Systems in C – Need for RTOS – Multiple Tasks and Processes – Context Switching – Priority-based Scheduling Policies." },
            3: { title: "IoT and Arduino Programming", desc: "Introduction to IoT – IoT Devices vs Computers – IoT Configurations – Basic Components – Introduction to Arduino – Arduino Types – Toolchain – Programming Structure (Sketches, Pins) – Input/Output from Pins – Arduino Shields – Sensors and Actuators with Arduino." },
            4: { title: "IoT Communication and Open Platforms", desc: "IoT Communication Models and APIs – Communication Protocols: Bluetooth, WiFi, ZigBee, GPS, GSM Modules – Open Platforms: Raspberry Pi – Architecture – Programming – Interfacing – GPIO Pins – Connecting to Cloud." },
            5: { title: "IoT Application Development", desc: "Design of Embedded Systems – IoT Application Development – Home Automation – Smart Agriculture – Smart City – Smart Healthcare Applications." }
        },
        cos: {
            CO1: "Explain the architecture and programming of embedded processors.",
            CO2: "Write embedded C programs for real-time applications.",
            CO3: "Design simple embedded applications using Arduino.",
            CO4: "Compare and apply communication models in IoT.",
            CO5: "Design IoT applications using Arduino and Raspberry Pi."
        },
        topics: {
            presentation: [
                "8051 Microcontroller Architecture and Pin Diagram",
                "Programming 8051 Timers and Interrupts",
                "Embedded C vs Assembly Language Programming",
                "Real-Time Operating Systems (RTOS) – Need and Features",
                "Introduction to Arduino – Types, IDE and Programming",
                "Interfacing Sensors with Arduino – Temperature, IR, Ultrasonic",
                "IoT Communication Protocols – Bluetooth, WiFi, ZigBee",
                "Raspberry Pi Architecture and GPIO Programming",
                "IoT Cloud Platforms – ThingSpeak, Blynk, AWS IoT",
                "Smart Home Automation Using IoT",
                "Smart Agriculture – Soil Moisture Monitoring System",
                "Context Switching and Priority Scheduling in RTOS",
                "GSM and GPS Module Interfacing with Microcontrollers",
                "Arduino Shields – Motor Shield, WiFi Shield, Ethernet Shield",
                "Smart Healthcare – Patient Monitoring Using IoT"
            ],
            miniproject: [
                "LED Blinking and Traffic Light simulation using Arduino",
                "Temperature and Humidity Monitor using DHT11 sensor and Arduino",
                "Ultrasonic Distance Measurement display on LCD with Arduino",
                "Simple Home Automation – Control LED and Fan via Bluetooth app",
                "Soil Moisture Monitoring System with buzzer alert using Arduino",
                "Smart Dustbin – Servo-operated lid using ultrasonic sensor",
                "Line Follower Robot using IR sensors and Arduino",
                "IoT Weather Station – Upload sensor data to ThingSpeak",
                "Smart Door Lock using Keypad and Servo with Arduino",
                "Fire and Gas Detection Alert System using MQ2 sensor",
                "Automatic Plant Watering System using soil moisture sensor",
                "Bluetooth Controlled Car using Arduino and HC-05 module",
                "Simple Attendance System using RFID and Arduino",
                "Heart Rate Monitor using Pulse Sensor with Arduino",
                "Smart Parking System indicator using IR sensors and LEDs"
            ]
        }
    },

    /* ══════════════════════════════════════════════════════════════════
     *  SEMESTER  4  —  BATCH 2028  (R2021)
     * ══════════════════════════════════════════════════════════════════ */

    "CS3452": {
        name: "Theory of Computation",
        semester: 4,
        objective: "To construct automata for formal languages. To understand the relation between regular languages and finite automata. To design context-free grammars and pushdown automata. To understand Turing machines and computability. To understand the concepts of decidability and complexity.",
        units: {
            1: { title: "Automata and Regular Expressions", desc: "Introduction to Formal Proof – Finite Automata (FA) – DFA – NFA – Equivalence of NFA and DFA – Finite Automata with Epsilon Transitions – Conversion of NFA into DFA – Minimization of DFAs." },
            2: { title: "Regular Languages", desc: "Regular Expressions – Regular Languages – Equivalence of Finite Automata and Regular Expressions – Pumping Lemma for Regular Languages – Closure Properties of Regular Languages." },
            3: { title: "Context-Free Grammar and PDA", desc: "Chomsky Hierarchy of Languages – Context-Free Grammar (CFG) – Derivations and Parse Trees – Ambiguity – Push Down Automata (PDA) – Languages of PDA – Equivalence of PDA and CFG – Deterministic PDA." },
            4: { title: "Normal Forms and Turing Machines", desc: "Simplification of CFG – Chomsky Normal Form (CNF) – Greibach Normal Form (GNF) – Pumping Lemma for CFL – Closure Properties of CFL – Turing Machine: Basic Model – Language Acceptance – TM as Computer of Integer Functions – Programming Techniques for TM." },
            5: { title: "Undecidability", desc: "Unsolvable Problems and Computable Functions – Recursive and Recursively Enumerable Languages – Universal Turing Machine – P and NP Completeness – Kruskal's Algorithm – Travelling Salesman Problem – 3-CNF SAT." }
        },
        cos: {
            CO1: "Construct DFA and NFA for given regular languages.",
            CO2: "Apply pumping lemma to prove languages are not regular.",
            CO3: "Design context-free grammars and pushdown automata.",
            CO4: "Construct Turing machines for given languages.",
            CO5: "Understand decidability and P vs NP concepts."
        },
        topics: {
            presentation: [
                "DFA and NFA – Construction and Equivalence",
                "NFA to DFA Conversion with Examples",
                "Regular Expressions and Their Applications",
                "Pumping Lemma for Regular Languages – Proof Technique",
                "Context-Free Grammars – Derivations and Parse Trees",
                "Pushdown Automata – Definition and Working",
                "Chomsky Normal Form – Conversion Steps",
                "Greibach Normal Form – Conversion Steps",
                "Turing Machine – Basic Model and Operations",
                "Recursive and Recursively Enumerable Languages",
                "P vs NP Problem – Significance in Computer Science",
                "Closure Properties of Regular and Context-Free Languages",
                "Ambiguity in Context-Free Grammars",
                "Chomsky Hierarchy of Languages",
                "Universal Turing Machine and Church-Turing Thesis"
            ],
            miniproject: [
                "DFA Simulator – Input a DFA and test string acceptance",
                "NFA to DFA Converter – Visual step-by-step conversion tool",
                "Regular Expression Tester – Match patterns against strings",
                "CFG Parser – Enter grammar rules and generate parse trees",
                "PDA Simulator – Simulate stack operations for input strings",
                "Turing Machine Simulator – Visual tape and head movement",
                "DFA Minimization Tool – Remove unreachable and equivalent states",
                "Pumping Lemma Checker – Interactive proof helper",
                "Grammar to CNF Converter – Step-by-step transformation",
                "Finite Automata Visualizer – Draw state diagrams from input",
                "String Generator from Regular Expression",
                "Language Membership Tester for DFA and NFA",
                "Simple Lexical Analyzer using Finite Automata",
                "Binary Number Divisibility Checker using DFA",
                "Palindrome Checker using PDA simulation"
            ]
        }
    },

    "CS3491": {
        name: "Artificial Intelligence and Machine Learning",
        semester: 4,
        objective: "To understand the concepts of AI and intelligent agents. To learn search algorithms and constraint satisfaction problems. To understand probabilistic reasoning and Bayesian networks. To learn supervised and unsupervised machine learning algorithms. To understand neural networks and deep learning basics.",
        units: {
            1: { title: "Problem Solving", desc: "Introduction to AI – AI Applications – Problem Solving Agents – Search Algorithms – Uninformed Search Strategies – Heuristic Search Strategies – Local Search and Optimization Problems – Adversarial Search – Constraint Satisfaction Problems." },
            2: { title: "Probabilistic Reasoning", desc: "Acting under Uncertainty – Bayesian Inference – Naive Bayes Models – Probabilistic Reasoning – Bayesian Networks – Exact Inference in BN – Approximate Inference in BN – Causal Networks." },
            3: { title: "Supervised Learning", desc: "Introduction to Machine Learning – Linear Regression: Least Squares, Multiple Variables, Gradient Descent – Linear Classification: Discriminant Function, Logistic Regression, Naive Bayes – Support Vector Machine – Decision Tree – Random Forests." },
            4: { title: "Ensemble Techniques and Unsupervised Learning", desc: "Combining Multiple Learners – Voting – Ensemble Learning: Bagging, Boosting, Stacking – Unsupervised Learning: K-Means Clustering – KNN – Gaussian Mixture Models – Expectation Maximization." },
            5: { title: "Neural Networks", desc: "Perceptron – Multilayer Perceptron – Activation Functions – Network Training – Gradient Descent Optimization – Error Backpropagation – Vanishing Gradient Problem – ReLU – Hyperparameter Tuning – Batch Normalization – Regularization – Dropout." }
        },
        cos: {
            CO1: "Apply search algorithms for problem solving.",
            CO2: "Solve problems using probabilistic reasoning and Bayesian networks.",
            CO3: "Apply supervised learning algorithms for classification and regression.",
            CO4: "Apply ensemble and unsupervised learning techniques.",
            CO5: "Design simple neural network models."
        },
        topics: {
            presentation: [
                "BFS and DFS – Uninformed Search Strategies",
                "A* Search Algorithm – Heuristic Search with Examples",
                "Constraint Satisfaction Problems – N-Queens and Map Colouring",
                "Bayesian Networks – Structure and Inference",
                "Naive Bayes Classifier – Working and Applications",
                "Linear Regression – Simple and Multiple Variable",
                "Logistic Regression for Binary Classification",
                "Decision Tree – ID3 Algorithm and Entropy Calculation",
                "Support Vector Machine – Maximum Margin Classifier",
                "K-Means Clustering Algorithm with Examples",
                "Random Forest – Ensemble of Decision Trees",
                "Bagging and Boosting – Ensemble Techniques Comparison",
                "Perceptron and Multilayer Perceptron Architecture",
                "Backpropagation Algorithm – Step by Step",
                "Activation Functions – Sigmoid, ReLU, Tanh Comparison"
            ],
            miniproject: [
                "Tic-Tac-Toe AI using Minimax Algorithm",
                "Spam Email Classifier using Naive Bayes",
                "House Price Predictor using Linear Regression",
                "Iris Flower Classifier using Decision Tree",
                "Student Grade Predictor using Logistic Regression",
                "Customer Segmentation using K-Means Clustering",
                "Handwritten Digit Recognizer using Simple Neural Network",
                "Movie Recommendation System using KNN",
                "Sentiment Analysis of Product Reviews using Naive Bayes",
                "Rock-Paper-Scissors game with AI using Random Forest",
                "Weather Prediction model using Decision Tree",
                "Image Classifier for Cats vs Dogs using MLP",
                "Credit Card Fraud Detection using SVM",
                "Simple Chatbot using Rule-Based AI",
                "Maze Solver using BFS and A* Search Algorithm"
            ]
        }
    },

    "CS3401": {
        name: "Algorithms",
        semester: 4,
        objective: "To understand algorithm analysis and asymptotic notations. To learn searching and sorting algorithms. To understand graph algorithms and their applications. To learn algorithm design techniques: Divide and Conquer, Dynamic Programming, Greedy. To understand NP-completeness and approximation algorithms.",
        units: {
            1: { title: "Introduction", desc: "Algorithm Analysis: Time and Space Complexity – Asymptotic Notations – Best, Worst, Average Case Analysis – Recurrence Relation: Substitution Method – Searching: Linear, Binary, Interpolation Search – Pattern Search: Naive, Rabin-Karp, KMP – Sorting: Insertion Sort, Heap Sort." },
            2: { title: "Graph Algorithms", desc: "Graph Representations – Graph Traversal: DFS, BFS – Connectivity, Bi-connectivity – Minimum Spanning Tree: Kruskal's and Prim's Algorithm – Shortest Path: Bellman-Ford, Dijkstra's, Floyd-Warshall – Network Flow: Ford-Fulkerson – Maximum Bipartite Matching." },
            3: { title: "Algorithm Design Techniques", desc: "Divide and Conquer: Finding Max and Min, Merge Sort, Quick Sort – Dynamic Programming: Matrix-Chain Multiplication, Multistage Graph, Optimal BST – Greedy Technique: Activity Selection, Optimal Merge Pattern, Huffman Trees." },
            4: { title: "State Space Search", desc: "Backtracking: N-Queens Problem, Hamiltonian Circuit, Subset Sum, Graph Colouring – Branch and Bound: 15-Puzzle, Assignment Problem, Knapsack Problem, Travelling Salesman Problem." },
            5: { title: "NP-Complete and Approximation", desc: "Tractable and Intractable Problems – NP-Hardness and NP-Completeness – Bin Packing – Problem Reduction: TSP, 3-CNF – Approximation Algorithms: TSP – Randomized Algorithms: Primality Testing, Randomized Quick Sort." }
        },
        cos: {
            CO1: "Analyse the time and space complexity of algorithms.",
            CO2: "Apply graph algorithms for shortest path and MST problems.",
            CO3: "Design algorithms using Divide and Conquer, DP, and Greedy techniques.",
            CO4: "Solve problems using Backtracking and Branch and Bound.",
            CO5: "Understand NP-completeness and approximation algorithms."
        },
        topics: {
            presentation: [
                "Asymptotic Notations – Big-O, Omega, Theta with Examples",
                "Binary Search and Interpolation Search Comparison",
                "KMP Pattern Matching Algorithm with Examples",
                "BFS and DFS Graph Traversal Techniques",
                "Dijkstra's Shortest Path Algorithm",
                "Kruskal's and Prim's MST Algorithms Comparison",
                "Merge Sort – Divide and Conquer Approach",
                "Quick Sort – Partitioning and Pivot Selection",
                "Dynamic Programming – Matrix Chain Multiplication",
                "Huffman Coding – Greedy Algorithm for Data Compression",
                "N-Queens Problem using Backtracking",
                "0/1 Knapsack Problem using Branch and Bound",
                "Travelling Salesman Problem – Approaches and Complexity",
                "P vs NP – Understanding Computational Complexity",
                "Floyd-Warshall All-Pairs Shortest Path Algorithm"
            ],
            miniproject: [
                "Sorting Algorithm Visualizer – Compare Bubble, Merge, Quick Sort",
                "Graph Visualizer with BFS and DFS Traversal Animation",
                "Dijkstra's Shortest Path Finder on a Map Grid",
                "Huffman Encoding and Decoding Tool",
                "N-Queens Solver with Visual Board Display",
                "Binary Search Visualizer with Step-by-Step Comparison",
                "MST Visualizer using Kruskal's and Prim's Algorithms",
                "Matrix Chain Multiplication Calculator with Optimal Parenthesization",
                "Knapsack Problem Solver – Compare Greedy vs DP Approach",
                "TSP Solver for Small Graphs with Brute Force and Approximation",
                "String Pattern Matcher using KMP Algorithm",
                "Activity Selection Scheduler using Greedy Algorithm",
                "Sudoku Solver using Backtracking",
                "Graph Colouring Visualizer using Backtracking",
                "Simple Spell Checker using Edit Distance (DP)"
            ]
        }
    },

    "CS3451": {
        name: "Introduction to Operating Systems",
        semester: 4,
        objective: "To understand the structure and functions of Operating Systems. To learn process management, scheduling, and synchronization. To understand memory management techniques. To learn file system implementation and I/O management. To understand virtualization and mobile operating systems.",
        units: {
            1: { title: "Operating System Overview", desc: "Computer System Elements and Organization – OS Objectives and Functions – Evolution of OS – OS Structures – OS Services – System Calls – System Programs – Design and Implementation – Structuring Methods." },
            2: { title: "Process Management", desc: "Process Concept – Process Scheduling – Operations on Processes – IPC – CPU Scheduling Algorithms – Threads – Multithread Models – Process Synchronization – Critical Section Problem – Semaphores – Mutex – Monitors – Deadlock: Prevention, Avoidance, Detection, Recovery." },
            3: { title: "Memory Management", desc: "Main Memory – Swapping – Contiguous Memory Allocation – Paging – Page Table Structure – Segmentation – Virtual Memory – Demand Paging – Copy on Write – Page Replacement Algorithms – Allocation of Frames – Thrashing." },
            4: { title: "Storage Management", desc: "Disk Structure – Disk Scheduling – File System Interface – File Concept – Access Methods – Directory Structure – File Sharing and Protection – File System Implementation – Allocation Methods – Free Space Management – I/O Systems." },
            5: { title: "Virtual Machines and Mobile OS", desc: "Virtual Machines: History, Benefits, Building Blocks, Types – Virtualization and OS Components – Mobile OS: iOS and Android Architecture." }
        },
        cos: {
            CO1: "Describe the structure, services and functions of an OS.",
            CO2: "Apply CPU scheduling algorithms and solve synchronization problems.",
            CO3: "Compare memory management and page replacement techniques.",
            CO4: "Explain file system implementation and disk scheduling.",
            CO5: "Understand virtualization and mobile OS concepts."
        },
        topics: {
            presentation: [
                "Evolution of Operating Systems – Batch to Real-Time",
                "System Calls – Types and Examples in Linux",
                "CPU Scheduling Algorithms – FCFS, SJF, Round Robin, Priority",
                "Process Synchronization – Critical Section and Semaphores",
                "Deadlock – Prevention, Avoidance using Banker's Algorithm",
                "Paging and Page Table Structure in Memory Management",
                "Virtual Memory and Demand Paging Concepts",
                "Page Replacement Algorithms – FIFO, LRU, Optimal",
                "File Allocation Methods – Contiguous, Linked, Indexed",
                "Disk Scheduling Algorithms – FCFS, SSTF, SCAN, C-SCAN",
                "Thread vs Process – Multithreading Models",
                "Thrashing – Causes and Solutions",
                "Virtualization – Types, Hypervisors and Containers",
                "Android OS Architecture and Components",
                "Inter-Process Communication – Shared Memory and Message Passing"
            ],
            miniproject: [
                "CPU Scheduling Simulator – Compare FCFS, SJF, RR algorithms",
                "Page Replacement Algorithm Visualizer – FIFO, LRU, Optimal",
                "Banker's Algorithm Simulator for Deadlock Avoidance",
                "Memory Allocation Simulator – First Fit, Best Fit, Worst Fit",
                "Disk Scheduling Algorithm Comparator – FCFS, SSTF, SCAN",
                "Simple Shell Implementation in C – Execute basic commands",
                "Producer-Consumer Problem simulator using Semaphores",
                "File System Simulator – Create, Read, Delete files",
                "Process Scheduler Visualizer with Gantt Chart output",
                "Dining Philosophers Problem simulator",
                "Virtual Memory Simulator with page fault tracking",
                "Thread Pool Implementation demo in Java or Python",
                "Simple Task Manager – List and kill processes",
                "Reader-Writer Problem simulator using Mutex",
                "Round Robin Scheduler with adjustable time quantum"
            ]
        }
    },

    "CS3492": {
        name: "Database Management Systems",
        semester: 4,
        objective: "To learn the fundamentals of data models and relational algebra. To represent a database system using ER diagrams and apply normalization techniques. To understand transaction processing, concurrency control, and recovery. To learn internal storage structures including file organization and indexing. To introduce distributed databases, NoSQL databases, and database security.",
        units: {
            1: { title: "Relational Databases", desc: "Purpose of Database Systems – Views of Data – Data Models – Database System Architecture – Relational Model – Keys – Relational Algebra – SQL Fundamentals – Advanced SQL – Embedded SQL – Dynamic SQL." },
            2: { title: "Database Design", desc: "Entity-Relationship (ER) Model – ER Diagrams – Enhanced-ER Model – ER-to-Relational Mapping – Functional Dependencies – Non-loss Decomposition – First, Second, Third Normal Forms – BCNF – Multi-valued Dependencies – Fourth Normal Form – Join Dependencies – Fifth Normal Form." },
            3: { title: "Transactions", desc: "Transaction Concepts – ACID Properties – Schedules – Serializability – Transaction Support in SQL – Concurrency Control: Two-Phase Locking, Timestamp-based, Multiversion, Validation, Snapshot Isolation, Multiple Granularity Locking – Deadlock Handling – Recovery Concepts: Deferred and Immediate Update, Shadow Paging, ARIES Algorithm." },
            4: { title: "Implementation Techniques", desc: "RAID – File Organization – Organization of Records in Files – Data Dictionary Storage – Column-Oriented Storage – Indexing and Hashing: Ordered Indices, B+ Tree Index, B Tree Index, Static Hashing, Dynamic Hashing – Query Processing Overview – Algorithms for Selection, Sorting, Join – Query Optimization: Heuristics, Cost Estimation." },
            5: { title: "Advanced Topics", desc: "Distributed Databases: Architecture, Data Storage, Transaction Processing, Query Processing and Optimization – NoSQL Databases: CAP Theorem, Document-Based, Key-Value Stores, Column-Based, Graph Databases – Database Security: Security Issues, Access Control, Role-Based Access Control, SQL Injection, Encryption." }
        },
        cos: {
            CO1: "Construct SQL queries using relational algebra.",
            CO2: "Design databases using ER model and apply normalization techniques.",
            CO3: "Construct queries to handle transaction processing and maintain database consistency.",
            CO4: "Understand internal storage structures and evaluate query processing and optimization techniques.",
            CO5: "Appreciate how advanced databases differ from relational databases and select suitable databases."
        },
        topics: {
            presentation: [
                "Relational Model – Keys, Constraints and Relational Algebra Operations",
                "SQL Fundamentals – DDL, DML, DCL Commands with Examples",
                "Entity-Relationship Model – ER Diagrams and Components",
                "Normalization – 1NF, 2NF, 3NF and BCNF with Examples",
                "ACID Properties of Transactions",
                "Concurrency Control – Two-Phase Locking Protocol",
                "Deadlock Handling – Detection, Prevention and Avoidance",
                "Recovery Techniques – Deferred Update and ARIES Algorithm",
                "B+ Tree Indexing – Structure, Insertion and Deletion",
                "Hashing Techniques – Static and Dynamic Hashing",
                "Query Processing – Selection, Sorting and Join Algorithms",
                "Query Optimization – Heuristic and Cost-Based Approaches",
                "Distributed Database Architecture and Transaction Processing",
                "NoSQL Databases – CAP Theorem, Types and Comparison with RDBMS",
                "Database Security – SQL Injection, Access Control and Encryption"
            ],
            miniproject: [
                "Library Management System with book issue, return and fine calculation",
                "Student Database System with enrollment, grades and attendance tracking",
                "Hospital Management System – Patient records, appointments and billing",
                "Inventory Management System with stock tracking and supplier details",
                "Railway Reservation System with seat booking and cancellation",
                "Online Banking System with account management and transaction history",
                "Employee Payroll System with salary calculation and pay slip generation",
                "E-Commerce Database – Products, orders, customers and payment tracking",
                "Hotel Room Booking System with availability check and billing",
                "Blood Bank Management System – Donor records and blood stock tracking",
                "Electricity Bill Management System with meter reading and payment",
                "Restaurant Order Management System with menu and billing",
                "Pharmacy Management System – Medicine stock and prescription tracking",
                "Simple SQL Query Builder – Visual interface to construct SQL queries",
                "ER Diagram to Relational Schema Converter tool"
            ]
        }
    },

    /* ══════════════════════════════════════════════════════════════════
     *  SEMESTER  2  —  BATCH 2029  (R2025)
     * ══════════════════════════════════════════════════════════════════ */

    "MA25C02": {
        name: "Linear Algebra",
        semester: 2,
        objective: "To impart foundational knowledge in linear algebra essential for analysing and solving problems in engineering applications. To provide the knowledge on computation using software and interpret key linear algebra concepts using software.",
        units: {
            1: { title: "Vector Spaces", desc: "Introduction to Vector Spaces, Examples, Subspaces, Linear Combinations, Span, Generating Sets, Linear Dependence and Independence, Basis and Dimension, Dimension of Subspaces." },
            2: { title: "Linear Transformations and Diagonalization", desc: "Null space, Range, Dimension Theorem (statement only), Matrix representation of a linear transformation, Eigenvalues & Eigenvectors, Diagonalizability." },
            3: { title: "Inner Product Spaces", desc: "Inner product, Norms, Cauchy, Schwarz inequality, Gram, Schmidt orthogonalization, Simple problems (up to R3)." },
            4: { title: "Matrix Decomposition", desc: "Orthogonal transformation of a symmetric matrix to diagonal form Positive definite matrices, QR decomposition, Singular Value Decomposition (SVD), Least squares solutions- simple problems (up to 3 × 3 matrices)." },
            5: { title: "Applications", desc: "Open-Source software exercises to compute the matrix representation of a linear transformation, find the null space and range of a matrix, and compute eigenvalues and eigenvectors of a matrix." }
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
                "Vector Spaces and Subspaces – Definition and Examples",
                "Linear Independence, Basis and Dimension",
                "Rank and Nullity Theorem with Applications",
                "Linear Transformations – Matrix Representation",
                "Eigenvalues and Eigenvectors – Computation Methods",
                "Cayley-Hamilton Theorem – Statement and Verification",
                "Diagonalization of Matrices – Step by Step",
                "Gram-Schmidt Orthogonalization Process",
                "Inner Product Spaces – Cauchy-Schwarz Inequality",
                "Singular Value Decomposition (SVD) – Steps and Examples",
                "QR Decomposition and Its Applications",
                "Least Squares Solutions Using SVD",
                "PCA Basics – Dimensionality Reduction Concept",
                "Applications of Linear Algebra in Data Science",
                "Change of Basis and Similarity of Matrices"
            ],
            miniproject: [
                "Matrix Calculator – Add, Multiply, Inverse, Determinant",
                "Eigenvalue and Eigenvector Calculator with step-by-step solution",
                "Gram-Schmidt Orthogonalization Visualizer",
                "Simple Image Compression using SVD",
                "Linear Equation Solver using Gaussian Elimination",
                "2D Transformation Visualizer – Rotation, Scaling, Reflection",
                "Rank Calculator for any m×n Matrix",
                "QR Decomposition step-by-step Calculator",
                "Simple PCA Demo on a 2D dataset with visualization",
                "Matrix Diagonalization checker and calculator",
                "Basis and Dimension Finder for given set of vectors",
                "Linear Transformation Visualizer in 2D plane",
                "Least Squares Curve Fitting tool",
                "Determinant Calculator using Cofactor Expansion",
                "Null Space and Column Space Finder for matrices"
            ]
        }
    },

    "EE25C01": {
        name: "Basic Electrical and Electronics Engineering",
        semester: 2,
        objective: "To impart foundational knowledge in principles and applications of electrical and electronics engineering.",
        units: {
            1: { title: "DC Fundamentals", desc: "Current and Voltage sources, Resistance, Inductance and Capacitance; Ohm’s law, Kirchhoff’s law, Series parallel combination of R, L and C components, Voltage Divider and Current Divider Rules." },
            2: { title: "AC Fundamentals", desc: "Faraday’s Laws of Electro-magnetic Induction, Definition of Self and Mutual Inductances, Generation of sinusoidal voltage, Instantaneous & RMS values of sinusoidal signals, Introduction to 3-phase systems, Electrical Safety, Fuses and Earthing." },
            3: { title: "Electric Machines", desc: "DC Machines, Transformers, Star and delta Connections, Three phase Induction motors, Synchronous Generators, Single Phase Induction Motors, Stepper Motor, Universal Motor and BLDC motor." },
            4: { title: "Semiconductor Devices", desc: "PN junction diodes, Zener Diode, Voltage regulator, BJT & FET Transistors, Timers, Operational Amplifiers." },
            5: { title: "Digital Electronics and Microcontrollers", desc: "Boolean algebra, Basic and Universal Gates, adders, multiplexers, demultiplexers and flip-flops. Microcontrollers: Introduction, Architecture, Potential Applications." }
        },
        cos: {
            CO1: "Understand and explain basic electrical and electronic concepts.",
            CO2: "Apply and analyse electrical circuits in real-time applications.",
            CO3: "Identify and utilise key electronic devices used in engineering applications"
        },
        topics: {
            presentation: [
                "Kirchhoff's Laws – KVL and KCL with Circuit Examples",
                "Star-Delta Transformation in AC Circuits",
                "Power Factor and Its Significance in AC Circuits",
                "DC Motor – Working Principle and Speed Control",
                "Single Phase Transformer – Construction and Working",
                "PN Junction Diode – Characteristics and Applications",
                "Zener Diode as Voltage Regulator",
                "BJT Common Emitter Configuration and Characteristics",
                "Op-Amp – Inverting and Non-Inverting Amplifier Circuits",
                "Boolean Algebra and Logic Gate Simplification",
                "Half Adder and Full Adder Design",
                "Flip-Flops – SR, JK, D, T Types and Applications",
                "Solar Energy – Photovoltaic Cell Working Principle",
                "Three Phase Induction Motor – Working Principle",
                "Electrical Safety and Earthing Systems"
            ],
            miniproject: [
                "Simple DC Circuit Simulator using Kirchhoff's Laws",
                "AC Power Factor Calculator for Single Phase Circuits",
                "LED Dimmer Circuit using PWM",
                "Zener Diode Voltage Regulator Circuit on Breadboard",
                "Half Adder and Full Adder using Logic Gate ICs",
                "4-bit Binary Counter using JK Flip-Flops",
                "Simple Audio Amplifier using Op-Amp IC 741",
                "DC Motor Speed Controller using Potentiometer",
                "Logic Gate Truth Table Verifier Circuit",
                "Simple Solar Cell Voltage and Current Measurement Setup",
                "BJT as a Switch – LED ON/OFF Controller",
                "Binary to Decimal Converter Circuit",
                "Simple Burglar Alarm using basic electronic components",
                "Star-Delta Starter Model Demonstration",
                "Transformer Turns Ratio Verification Experiment"
            ]
        }
    },

    "CS25C06": {
        name: "Digital Principles and Computer Organization",
        semester: 2,
        objective: "To impart knowledge on digital logic and provide functional concepts of computer systems with necessary illustrations.",
        units: {
            1: { title: "Digital Logic", desc: "Digital Systems, Integer Arithmetic, Addition and Subtraction of Signed Numbers, Boolean Algebra, Theorems and Postulates, Functions, Truth Table, Canonical and Standard Forms, Simplification using K-Maps, Digital Logic Gates, Universal gates, Implementation of Logic Gates, Integrated Circuits." },
            2: { title: "Computer System", desc: "Basic structure of a computer, Classes of Computer, Functional units - Interconnection of components, Von Neumann architecture and Harvard architecture - Instruction execution cycle, Performance metrics: MIPS, MFLOPS, CPI, throughput." },
            3: { title: "Arithmetic and Logic Unit", desc: "Combinational Circuits: Adders, Binary Adder, Binary Parallel Adder, Subtractor, Multiplexers, Decoders, Design of Fast Adder, Multiplication of Signed and Unsigned Numbers, Fast Multiplication - Integer Division, Floating Point Numbers and Operations, Booth’s algorithm for signed multiplication, Sequential Circuits: Flip-Flops, Registers, Counters." },
            4: { title: "Processing and Pipelining", desc: "Instruction Set Architecture: RISC vs CISC, Addressing modes, Hardwired control and Micro programmed control unit, Concepts of Pipelining, Pipeline stages and Timing diagram, Hazards: Structural, Data and Control Hazards, Instruction-level parallelism, Parallel processing concepts: SIMD, MIMD, Superscalar processors, Vector and Array Processor." },
            5: { title: "Memory and I/O Systems", desc: "Memory hierarchy: Registers, Cache, Main Memory, RAM, ROM, HDD, SSD, Cache Organization and replacement policies, NUMA, DMA, ECC. I/O Techniques: Programmed, Interrupt-Driven, DMA, I/O Devices and Interface Standards: PCI, USB, SATA, Interrupts, Buses, Arbitration." }
        },
        cos: {
            CO1: "Identify basic digital components and their functions in a computer system.",
            CO2: "Apply Boolean algebra and number systems to design simple digital circuits and simulate them using tools.",
            CO3: "Analyze instruction sets, arithmetic units, and performance metrics to evaluate processor design.",
            CO4: "Engage in continuous learning to update with advancements through evolving computing trends."
        },
        topics: {
            presentation: [
                "Boolean Algebra – Theorems and Simplification using K-Maps",
                "Logic Gates – AND, OR, NOT, Universal Gates (NAND, NOR)",
                "Von Neumann vs Harvard Architecture Comparison",
                "Instruction Execution Cycle – Fetch, Decode, Execute",
                "Adder and Subtractor Circuit Design",
                "Booth's Algorithm for Signed Multiplication",
                "Multiplexer and Decoder – Design and Applications",
                "RISC vs CISC Architecture – Comparison",
                "Pipelining – Stages, Hazards and Solutions",
                "Cache Memory – Direct, Associative, Set-Associative Mapping",
                "Virtual Memory – Page Table and TLB",
                "DMA – Direct Memory Access Concept and Working",
                "Flip-Flops – Types and Applications in Registers",
                "Addressing Modes – Immediate, Direct, Indirect, Register",
                "Performance Metrics – CPI, MIPS, Speedup with Pipelining"
            ],
            miniproject: [
                "Boolean Expression Simplifier using K-Map method",
                "Logic Gate Simulator – Build and test circuits visually",
                "Simple ALU Simulator – Add, Subtract, AND, OR Operations",
                "Booth's Multiplication Algorithm step-by-step Calculator",
                "Cache Memory Simulator – Direct and Set-Associative Mapping",
                "Instruction Cycle Simulator – Fetch-Decode-Execute Animation",
                "Binary Adder and Subtractor circuit using Logic Gates",
                "RISC vs CISC Instruction Comparison Tool",
                "Pipeline Hazard Detector – Identify data and control hazards",
                "Virtual Memory Page Replacement Simulator",
                "Multiplexer-based Function Generator",
                "Simple Counter Design using Flip-Flops (Mod-N Counter)",
                "Number System Converter – Binary, Octal, Decimal, Hex",
                "Addressing Mode Demonstrator with example instructions",
                "K-Map solver for up to 4 variables"
            ]
        }
    },

    "PH25C03": {
        name: "Applied Physics (CSIE) – II",
        semester: 2,
        objective: "To provide a comprehensive understanding of physics concepts in computer science and engineering applications.",
        units: {
            1: { title: "Magnetic Materials", desc: "Parameters, Ferromagnetic materials, Ferrites - Soft and Hard magnetic materials – GMR sensors - magnetic disk memories – Principle of magnetic recording – Magnetic data storage." },
            2: { title: "Logic Gates", desc: "Conversion of Binary to decimal - decimal to binary – binary coded decimal code-logic gates (OR, AND, NOT, NAND and NOR)–Exclusive OR gate- simplification based on basic Boolean theorems (sum of products, product of sums expression)- simplification by Karnaugh Map method (don’t care conditions)." },
            3: { title: "Nano-Devices", desc: "Introduction – electron density in bulk material – size dependence of Fermi energy-quantum confinement – quantum structures: quantum wells, wires and dots – band gap of nanomaterials. Tunneling- Coulomb blockade - single electron transistor - resonant-tunneling diode- Carbon nanotubes: Properties and applications." },
            4: { title: "Quantum Computing", desc: "Quantum system for information processing - quantum states – classical bits – quantum bits or qubits – Bloch sphere -CNOT gate – Single and multiple qubits – quantum gates (Pauli – X, Y and Z Gates, Hadamard Gate, Phase gate - T gate .CNOT Gate) – advantage of quantum computing over classical computing." },
            5: { title: "Emerging Technologies", desc: "Review of emergence of spin electronics in data storage and applications of quantum computing and nano-devices in modern computing systems." }
        },
        cos: {
            CO1: "Explain the concepts of physics in computer science stream.",
            CO2: "Apply appropriate techniques in physics to solve engineering problems.",
            CO3: "Analyse physical systems and interpret data from the virtual studies in the core branches in computer science and engineering."
        },
        topics: {
            presentation: [
                "de Broglie Hypothesis and Wave-Particle Duality",
                "Heisenberg Uncertainty Principle with Examples",
                "Particle in a Box – Energy Quantization",
                "Band Theory of Solids – Conductors, Semiconductors, Insulators",
                "Hall Effect – Principle and Applications",
                "PN Junction Diode – Working and V-I Characteristics",
                "LASER – Principle, Ruby and He-Ne Laser",
                "Semiconductor Laser and LED Working",
                "Fibre Optics – Total Internal Reflection and Types",
                "Carbon Nanotubes – Structure and Properties",
                "Graphene – Properties and Applications",
                "Solar Cell – Working Principle and Efficiency",
                "Piezoelectric Energy Harvesting Concept",
                "Quantum Tunnelling and Its Applications",
                "Nanomaterial Synthesis Methods – Top-Down and Bottom-Up"
            ],
            miniproject: [
                "Simple Photoelectric Effect demonstration setup",
                "LED characteristics measurement – V-I curve plotter",
                "Solar cell efficiency measurement under different light conditions",
                "Fibre optic light transmission demonstration model",
                "Simple laser pointer based communication demo",
                "Hall Effect measurement and carrier type identification",
                "Build a simple Thermoelectric Generator using Peltier module",
                "Carbon nanotube properties presentation model",
                "Solar powered LED light project",
                "Simple piezoelectric energy harvester demo (press to light LED)",
                "PN junction diode forward and reverse bias characteristic plotter",
                "Graphene properties study using literature review poster",
                "Simple wind energy model using DC motor as generator",
                "Optical fibre numerical aperture measurement setup",
                "Quantum tunnelling probability calculator for different barriers"
            ]
        }
    },

    "CS25C07": {
        name: "Object Oriented Programming",
        semester: 2,
        objective: "To impart the principles of object-oriented programming and their advantages over procedural programming. To develop problem-solving skills by creating real-world applications using OOP features.",
        units: {
            1: { title: "Principles of Object-Oriented Programming", desc: "Characteristics of object-oriented languages, C++ Program structure, Procedure Oriented Programming vs Object Oriented Programming, C++ constructs and syntax, tokens, variables, data-types, type conversion, operators, Expressions, Namespace, flow Control and decision, making statements." },
            2: { title: "Classes and Objects", desc: "Abstraction mechanism: Classes, Objects, member data, member functions - Constructors and types - destructors, inline function, friend function -- array of objects, objects as function arguments - memory allocation for objects, static members static data and static function." },
            3: { title: "Inheritance and Compile Time Polymorphism", desc: "Inheritance: Derived Classes – Single inheritance – Multilevel Inheritance – Multiple Inheritance - Hierarchical inheritance – Hybrid inheritance. Operator Overloading: Compile time Polymorphism – Overloading Functions, Overloading Operators, Overloading Unary Operators – Overloading Binary Operators – Operator Overloading with Friend Functions." },
            4: { title: "Pointers and Runtime Polymorphism", desc: "Pointers with arithmetic operations - this pointer – Pointers to Derived classes and Base classes - Compile time versus Runtime Polymorphism - Virtual functions - Late Binding - Abstract classes- Pure virtual functions and Virtual Destructors - Virtual base class." },
            5: { title: "Templates and Exception Handling, I/O Systems", desc: "Class Templates - Function Templates – Overloading of Template Functions - String, iterators, hashes, IO streams; Exception Handling. C++ Streams - Formatted and Unformatted I/O –File stream classes – File modes - File operations, Sequential Read / Write operations – Binary and ASCII Files - Error handling in file I/O." }
        },
        cos: {
            CO1: "Understand the core OOP concepts and applications",
            CO2: "Apply Object Oriented Paradigms to solve problems using C++",
            CO3: "Design and Analyze solutions involving code reusability and complexity management",
            CO4: "Demonstrate life-long learning skills through application development"
        },
        topics: {
            presentation: [
                "Object Oriented vs Procedure Oriented Programming Comparison",
                "Classes and Objects – Encapsulation and Abstraction",
                "Constructors – Default, Parameterized, Copy Constructors",
                "Destructors and Memory Management in C++",
                "Single and Multiple Inheritance with Examples",
                "Multilevel and Hierarchical Inheritance",
                "Function Overloading – Rules and Examples",
                "Operator Overloading – Unary and Binary Operators",
                "Pointers in C++ – this Pointer and Dynamic Allocation",
                "Virtual Functions and Late Binding (Runtime Polymorphism)",
                "Abstract Classes and Pure Virtual Functions",
                "Function Templates and Class Templates",
                "Exception Handling – try, catch, throw Mechanism",
                "File Handling in C++ – Read and Write Operations",
                "Friend Functions and Friend Classes"
            ],
            miniproject: [
                "Student Record Management System using Classes and File I/O",
                "Simple Bank Account System with Inheritance (Savings, Current)",
                "Calculator with Operator Overloading for Complex Numbers",
                "Library Book Management System using File Handling",
                "Shape Area Calculator using Virtual Functions and Inheritance",
                "Simple Phonebook Application using Class and Arrays",
                "Employee Payroll System with Multiple Inheritance",
                "Tic-Tac-Toe Game using OOP concepts in C++",
                "Simple Quiz Application with Exception Handling",
                "Matrix Operations Library using Class Templates",
                "Vehicle Rental System using Hierarchical Inheritance",
                "Simple ATM Simulator with File-based account storage",
                "Hospital Patient Record System using Classes",
                "Temperature Converter using Function Overloading",
                "Simple Inventory System with Binary File Operations"
            ]
        }
    }
};

/* ══════════════════════════════════════════════════════════════════════
 *  CSE_LABS — Lab experiments per semester
 * ══════════════════════════════════════════════════════════════════════ */
const CSE_LABS = {
    /* Semester 2 Labs (Batch 2029 - R2025) */
    2: [
        {
            code: "CS25L01", name: "Object Oriented Programming Laboratory", experiments: [
                "Basic C++ programs – Data types, operators, control structures",
                "Implement a class with constructors and destructors",
                "Demonstrate function overloading with different parameter types",
                "Implement single and multilevel inheritance",
                "Implement multiple and hierarchical inheritance",
                "Implement operator overloading for unary and binary operators",
                "Implement runtime polymorphism using virtual functions",
                "Implement abstract class with pure virtual functions",
                "Implement function templates and class templates",
                "File handling – Read and write student records to file",
                "Exception handling – Division by zero and array bounds checking",
                "Mini project – Student database management system using OOP"
            ]
        },
        {
            code: "CS25L02", name: "Digital Principles and Computer Organization Laboratory", experiments: [
                "Verification of truth tables for basic and universal logic gates",
                "Simplification of Boolean expressions using K-Maps",
                "Design and implementation of Half Adder and Full Adder",
                "Design and implementation of Half Subtractor and Full Subtractor",
                "Design and implementation of 4:1 Multiplexer using logic gates",
                "Design and implementation of 3-to-8 Decoder",
                "Verification of flip-flops – SR, JK, D and T flip-flops",
                "Design of 4-bit ripple counter using JK flip-flops",
                "Design of Mod-N counter (Mod-5, Mod-10)",
                "Simulation of basic computer operations using simulator",
                "Study of addressing modes using assembly language programs",
                "Cache memory mapping simulation – Direct and Set-Associative"
            ]
        }
    ],
    /* Semester 4 Labs (Batch 2028 - R2021) */
    4: [
        {
            code: "CS3461", name: "Operating Systems Laboratory", experiments: [
                "Installation of Windows operating system",
                "UNIX commands and shell programming",
                "Process management using system calls – fork, exit, getpid, wait",
                "Implementation of FCFS CPU scheduling algorithm",
                "Implementation of SJF CPU scheduling algorithm",
                "Implementation of Round Robin CPU scheduling algorithm",
                "Implementation of Priority CPU scheduling algorithm",
                "Inter-process communication using pipes",
                "Implementation of mutual exclusion using semaphores",
                "Deadlock avoidance using Banker's algorithm",
                "Deadlock detection algorithm implementation",
                "Implementation of threading and thread synchronization",
                "Implementation of paging technique for memory management",
                "Memory allocation methods – First Fit, Best Fit, Worst Fit",
                "Page replacement algorithms – FIFO, LRU, Optimal",
                "File organization techniques implementation",
                "File allocation strategies – Sequential, Indexed, Linked",
                "Disk scheduling algorithms – FCFS, SSTF, SCAN, C-SCAN",
                "Installation of Linux guest OS using VMware"
            ]
        },
        {
            code: "CS3481", name: "Database Management Systems Laboratory", experiments: [
                "DDL and DML commands – Create table, insert, update, delete",
                "Creating tables with primary key, foreign key, and constraints",
                "SQL queries with WHERE clause, LIKE, BETWEEN, IN operators",
                "Aggregate functions – COUNT, SUM, AVG, MIN, MAX with GROUP BY",
                "Sub-queries and correlated sub-queries",
                "Simple join operations – Inner join and cross join",
                "Natural join, equi join and outer joins (LEFT, RIGHT, FULL)",
                "User-defined functions and stored procedures",
                "DCL and TCL commands – GRANT, REVOKE, COMMIT, ROLLBACK",
                "SQL triggers – Before and After triggers for INSERT, UPDATE, DELETE",
                "Creating views and indexes for performance optimization",
                "PL/SQL programs – Cursors, loops and conditional statements",
                "Creating and validating XML database using XML Schema",
                "NoSQL database – Document-based data using MongoDB",
                "GUI-based database application mini project"
            ]
        }
    ],
    /* Semester 6 Labs (Batch 2027 - R2021) */
    6: [
        {
            code: "CS3691L", name: "Embedded Systems and IoT Laboratory", experiments: [
                "8051 Assembly language – Data transfer operations using simulator",
                "8051 Assembly language – Arithmetic and logical operations",
                "8051 Timer programming and interrupt handling",
                "Introduction to Arduino IDE and basic LED programs",
                "Interfacing push button and LED with Arduino",
                "Interfacing temperature sensor (LM35/DHT11) with Arduino",
                "Interfacing ultrasonic sensor with Arduino for distance measurement",
                "Interfacing LCD display with Arduino",
                "Interfacing servo motor with Arduino",
                "Serial communication between Arduino and PC",
                "IoT – Sending sensor data to ThingSpeak cloud platform",
                "IoT – Controlling devices through Blynk mobile app",
                "Interfacing Bluetooth module (HC-05) with Arduino",
                "Raspberry Pi GPIO programming – LED control",
                "Mini project – IoT based monitoring system"
            ]
        },
        {
            code: "CCS356L", name: "Object Oriented Software Engineering Laboratory", experiments: [
                "Identifying software requirements and writing SRS document",
                "Drawing UML Use Case diagrams for a given problem",
                "Drawing UML Class diagrams and Object diagrams",
                "Drawing UML Sequence diagrams for a scenario",
                "Drawing UML Activity diagrams and State diagrams",
                "Implementing software design using MVC architecture",
                "Implementing design patterns – Singleton and Factory",
                "Implementing design patterns – Observer and Strategy",
                "White box testing – Statement coverage and branch coverage",
                "Black box testing – Equivalence partitioning and boundary value analysis",
                "Unit testing using a testing framework (JUnit / pytest)",
                "Integration testing for a multi-module application",
                "Version control using Git – Branching, merging and pull requests",
                "Setting up CI/CD pipeline using GitHub Actions",
                "Software project development using Agile methodology"
            ]
        }
    ]
};
