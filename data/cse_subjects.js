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

    /* ══════════════════════════════════════════════════════════════════
     *  SEMESTER  2  —  BATCH 2029  (R2025)
     * ══════════════════════════════════════════════════════════════════ */

    "MA25C02": {
        name: "Linear Algebra",
        semester: 2,
        objective: "To understand vector spaces and linear transformations. To learn eigenvalues, eigenvectors and diagonalization. To understand inner product spaces and orthogonalization. To learn singular value decomposition (SVD). To apply linear algebra in solving systems of equations.",
        units: {
            1: { title: "Vector Spaces", desc: "Vector Spaces – Subspaces – Linear Combinations – Linear Independence – Bases and Dimension – Row Space and Column Space – Rank and Nullity." },
            2: { title: "Linear Transformations", desc: "Linear Transformations – Null Space and Range – Dimension Theorem – Matrix Representation of Linear Transformations – Change of Basis – Similarity." },
            3: { title: "Eigenvalues and Diagonalization", desc: "Eigenvalues and Eigenvectors – Characteristic Polynomial – Cayley-Hamilton Theorem – Diagonalizability – Diagonalization of Symmetric Matrices." },
            4: { title: "Inner Product Spaces", desc: "Inner Products – Norms – Cauchy-Schwarz Inequality – Gram-Schmidt Orthogonalization Process – Orthogonal Complements – QR Decomposition." },
            5: { title: "SVD and Applications", desc: "Singular Value Decomposition (SVD) – Pseudoinverse – Least Squares Solutions – Principal Component Analysis (PCA) Basics – Applications of SVD." }
        },
        cos: {
            CO1: "Understand vector spaces, subspaces and their properties.",
            CO2: "Apply linear transformations and find matrix representations.",
            CO3: "Compute eigenvalues, eigenvectors and perform diagonalization.",
            CO4: "Apply Gram-Schmidt process and inner product space concepts.",
            CO5: "Perform SVD and apply it for solving least squares problems."
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
        objective: "To understand the fundamentals of DC and AC circuits. To learn the working principles of electrical machines. To understand basic electronic devices and circuits. To learn digital electronics fundamentals. To understand the basics of power systems.",
        units: {
            1: { title: "DC and AC Circuits", desc: "Kirchhoff's Laws – Mesh and Node Analysis – Star-Delta Transformation – AC Fundamentals – Impedance – Power Factor – Single Phase and Three Phase Systems – Power Measurement." },
            2: { title: "Electrical Machines", desc: "Principle and Working of DC Motor and Generator – Single Phase Transformer – Load Test – Speed Control of DC Motor – Three Phase Induction Motor." },
            3: { title: "Electronic Devices", desc: "PN Junction Diode Characteristics – Zener Diode – BJT – Common Emitter Configuration – MOSFET Characteristics – Op-Amp: Inverting and Non-Inverting Amplifiers." },
            4: { title: "Digital Electronics", desc: "Number Systems – Boolean Algebra – Logic Gates – Half Adder and Full Adder – Flip-Flops: SR, JK, D, T – Registers and Counters." },
            5: { title: "Power Systems Basics", desc: "Power Generation – Transmission and Distribution – Renewable Energy Sources – Solar and Wind Energy Basics – Electrical Safety." }
        },
        cos: {
            CO1: "Apply Kirchhoff's laws and network theorems for circuit analysis.",
            CO2: "Explain the working principle of electrical machines.",
            CO3: "Describe the characteristics of electronic devices.",
            CO4: "Design simple combinational and sequential digital circuits.",
            CO5: "Understand the basics of power generation and distribution."
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
        objective: "To understand digital logic fundamentals and Boolean algebra. To learn the basic structure and functioning of a computer. To understand arithmetic and logic unit design. To learn instruction set architecture and pipelining concepts. To understand memory hierarchy and I/O organization.",
        units: {
            1: { title: "Digital Logic", desc: "Digital Systems – Boolean Algebra – Theorems and Postulates – Canonical Forms – K-Maps – Logic Gates – Universal Gates – Integrated Circuits." },
            2: { title: "Computer System Overview", desc: "Basic Structure of a Computer – Functional Units – Interconnection – Von Neumann and Harvard Architectures – Instruction Execution Cycle – Performance Metrics: MIPS, MFLOPS, CPI." },
            3: { title: "ALU and Sequential Circuits", desc: "Combinational Circuits: Adders, Subtractors, Multiplexers, Decoders – Signed and Unsigned Multiplication – Booth's Algorithm – Floating Point Operations – Flip-Flops – Registers – Counters." },
            4: { title: "Processing and Pipelining", desc: "Instruction Set Architecture – RISC vs CISC – Addressing Modes – Control Unit: Hardwired and Microprogrammed – Pipelining Concepts – Pipeline Hazards – Instruction-Level Parallelism." },
            5: { title: "Memory and I/O", desc: "Memory Hierarchy – Cache Memory: Mapping Techniques – Virtual Memory – I/O Organization – Programmed I/O – Interrupt-Driven I/O – DMA." }
        },
        cos: {
            CO1: "Simplify Boolean expressions and design combinational circuits.",
            CO2: "Explain the basic structure and operation of a computer system.",
            CO3: "Design arithmetic circuits and sequential circuits.",
            CO4: "Compare RISC and CISC architectures and explain pipelining.",
            CO5: "Describe memory hierarchy and I/O organization."
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
        objective: "To understand the principles of quantum mechanics and its applications. To learn about semiconductor physics and devices. To understand the basics of photonics and fibre optics. To learn about nanoscience and nanotechnology. To understand the physics of energy harvesting.",
        units: {
            1: { title: "Quantum Mechanics", desc: "Wave-Particle Duality – de Broglie Hypothesis – Heisenberg Uncertainty Principle – Schrödinger Wave Equation – Particle in a Box – Quantum Tunnelling." },
            2: { title: "Semiconductor Physics", desc: "Band Theory of Solids – Intrinsic and Extrinsic Semiconductors – Hall Effect – PN Junction Diode – Zener Breakdown – LED and Solar Cell." },
            3: { title: "Photonics and Fibre Optics", desc: "Laser: Principle, Types (Ruby, He-Ne, Semiconductor) – Applications – Fibre Optics: Principle, Types, Numerical Aperture – Fibre Optic Communication System." },
            4: { title: "Nanoscience and Nanotechnology", desc: "Basics of Nanoscience – Quantum Confinement – Carbon Nanostructures: Fullerene, Carbon Nanotubes, Graphene – Synthesis Methods – Applications of Nanomaterials." },
            5: { title: "Energy Harvesting", desc: "Solar Energy – Photovoltaic Cells – Wind Energy – Piezoelectric Energy Harvesting – Thermoelectric Energy Harvesting – Hydrogen and Fuel Cells." }
        },
        cos: {
            CO1: "Apply quantum mechanical concepts to simple systems.",
            CO2: "Explain semiconductor physics and device characteristics.",
            CO3: "Describe laser principles and fibre optic communication.",
            CO4: "Understand nanomaterials and their applications.",
            CO5: "Explain energy harvesting techniques and their applications."
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
        objective: "To understand the principles of object-oriented programming. To learn classes, objects, constructors and destructors. To understand inheritance, polymorphism and operator overloading. To learn virtual functions and abstract classes. To understand templates, exception handling and file handling.",
        units: {
            1: { title: "OOP Principles and C++ Basics", desc: "Characteristics of OOP Languages – C++ Program Structure – Tokens, Variables, Data Types – Operators, Expressions – Namespaces – Control Flow Statements." },
            2: { title: "Classes and Objects", desc: "Abstraction – Class and Object Definitions – Member Data and Functions – Constructors (types) – Destructors – Inline and Friend Functions – Arrays of Objects – Static Members." },
            3: { title: "Inheritance and Compile-Time Polymorphism", desc: "Types of Inheritance: Single, Multiple, Multilevel, Hierarchical, Hybrid – Function Overloading – Operator Overloading: Unary and Binary Operators." },
            4: { title: "Pointers and Runtime Polymorphism", desc: "Pointers and Pointer Arithmetic – this Pointer – Pointers to Derived and Base Classes – Virtual Functions – Late Binding – Abstract Classes – Pure Virtual Functions – Virtual Destructors." },
            5: { title: "Templates, Exception Handling and File I/O", desc: "Class Templates – Function Templates – Template Overloading – Exception Handling: try, catch, throw – I/O Streams – File Modes – Binary and ASCII File Handling." }
        },
        cos: {
            CO1: "Understand OOP concepts and C++ program structure.",
            CO2: "Implement classes, objects, constructors, and destructors.",
            CO3: "Apply inheritance and operator overloading.",
            CO4: "Implement runtime polymorphism using virtual functions.",
            CO5: "Use templates, exception handling and file operations."
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
