const CSE_SUBJECTS = {
    "CCS356": {
        "name": "Object Oriented Software Engineering",
        "semester": 6,
        "objective": "To understand software process models and agile development. To learn requirements engineering and analysis modelling. To understand design concepts and architectural design. To learn software testing strategies and techniques. To understand project management and DevOps.",
        "units": {
            "1": {
                "title": "Software Process and Agile Development",
                "desc": "Introduction to Software Engineering – Software Process – Perspective and Specialized Process Models – Introduction to Agility – Agile Process – Extreme Programming (XP) – XP Process."
            },
            "2": {
                "title": "Requirements Analysis and Modelling",
                "desc": "Requirements Engineering – Eliciting Requirements – Developing Use Cases – Building the Analysis Model – Negotiating Requirements – Validating Requirements – UML – Class Diagrams – Sequence Diagrams – Activity Diagrams – Communication Diagrams."
            },
            "3": {
                "title": "Software Design",
                "desc": "Design Process – Design Concepts – Coupling – Cohesion – Functional Independence – Design Patterns: Model-View-Controller, Publish-Subscribe, Adapter, Command, Strategy, Observer, Proxy, Facade – Architectural Styles: Layered, Client-Server, Tiered, Pipe and Filter – User Interface Design."
            },
            "4": {
                "title": "Testing and Quality Assurance",
                "desc": "Software Testing Fundamentals – Internal and External Views of Testing – White Box Testing – Basis Path Testing – Control Structure Testing – Black Box Testing – Object-Oriented Testing Methods – Testing Methods Applicable at the Class Level – Interclass Test Case Design – Validation Testing – System Testing."
            },
            "5": {
                "title": "Project Management and DevOps",
                "desc": "Software Project Management – Software Configuration Management – Project Scheduling – DevOps: Motivation – Cloud as a Platform – Operations – Deployment Pipeline: Overall Architecture, Building and Testing – Deployment – Tools."
            }
        },
        "cos": {
            "CO1": "Apply software process models and agile methodology for software development.",
            "CO2": "Perform requirements analysis and develop analysis models using UML.",
            "CO3": "Apply software design concepts and design patterns for system design.",
            "CO4": "Apply testing strategies and techniques for software quality assurance.",
            "CO5": "Apply project management practices and DevOps concepts."
        }
    },
    "CS3691": {
        "name": "Embedded Systems and IoT",
        "semester": 6,
        "objective": "To understand the internal architecture and programming of embedded processors. To learn interfacing of I/O devices with embedded processors. To understand the evolution of IoT and its enabling technologies. To build low-cost embedded systems using Arduino and Raspberry Pi. To apply IoT concepts in real-world applications.",
        "units": {
            "1": {
                "title": "8-Bit Embedded Processor",
                "desc": "8-bit Microcontroller Architecture – Instruction Set and Programming – Programming Parallel Ports – Timers and Serial Port – Interrupt Handling."
            },
            "2": {
                "title": "Embedded C Programming",
                "desc": "Memory and I/O Devices Interfacing – Programming Embedded Systems in C – Need for RTOS – Multiple Tasks and Processes – Context Switching – Priority-based Scheduling Policies."
            },
            "3": {
                "title": "IoT and Arduino Programming",
                "desc": "Introduction to IoT – IoT Devices vs Computers – IoT Configurations – Basic Components – Introduction to Arduino – Arduino Types – Toolchain – Programming Structure (Sketches, Pins) – Input/Output from Pins – Arduino Shields – Sensors and Actuators with Arduino."
            },
            "4": {
                "title": "IoT Communication and Open Platforms",
                "desc": "IoT Communication Models and APIs – Communication Protocols: Bluetooth, WiFi, ZigBee, GPS, GSM Modules – Open Platforms: Raspberry Pi – Architecture – Programming – Interfacing – GPIO Pins – Connecting to Cloud."
            },
            "5": {
                "title": "IoT Application Development",
                "desc": "Design of Embedded Systems – IoT Application Development – Home Automation – Smart Agriculture – Smart City – Smart Healthcare Applications."
            }
        },
        "cos": {
            "CO1": "Explain the architecture and programming of embedded processors.",
            "CO2": "Write embedded C programs for real-time applications.",
            "CO3": "Design simple embedded applications using Arduino.",
            "CO4": "Compare and apply communication models in IoT.",
            "CO5": "Design IoT applications using Arduino and Raspberry Pi."
        }
    },
    "CS3452": {
        "name": "Theory of Computation",
        "semester": 4,
        "objective": "To construct automata for formal languages. To understand the relation between regular languages and finite automata. To design context-free grammars and pushdown automata. To understand Turing machines and computability. To understand the concepts of decidability and complexity.",
        "units": {
            "1": {
                "title": "Automata and Regular Expressions",
                "desc": "Introduction to Formal Proof – Finite Automata (FA) – DFA – NFA – Equivalence of NFA and DFA – Finite Automata with Epsilon Transitions – Conversion of NFA into DFA – Minimization of DFAs."
            },
            "2": {
                "title": "Regular Languages",
                "desc": "Regular Expressions – Regular Languages – Equivalence of Finite Automata and Regular Expressions – Pumping Lemma for Regular Languages – Closure Properties of Regular Languages."
            },
            "3": {
                "title": "Context-Free Grammar and PDA",
                "desc": "Chomsky Hierarchy of Languages – Context-Free Grammar (CFG) – Derivations and Parse Trees – Ambiguity – Push Down Automata (PDA) – Languages of PDA – Equivalence of PDA and CFG – Deterministic PDA."
            },
            "4": {
                "title": "Normal Forms and Turing Machines",
                "desc": "Simplification of CFG – Chomsky Normal Form (CNF) – Greibach Normal Form (GNF) – Pumping Lemma for CFL – Closure Properties of CFL – Turing Machine: Basic Model – Language Acceptance – TM as Computer of Integer Functions – Programming Techniques for TM."
            },
            "5": {
                "title": "Undecidability",
                "desc": "Unsolvable Problems and Computable Functions – Recursive and Recursively Enumerable Languages – Universal Turing Machine – P and NP Completeness – Kruskal's Algorithm – Travelling Salesman Problem – 3-CNF SAT."
            }
        },
        "cos": {
            "CO1": "Construct DFA and NFA for given regular languages.",
            "CO2": "Apply pumping lemma to prove languages are not regular.",
            "CO3": "Design context-free grammars and pushdown automata.",
            "CO4": "Construct Turing machines for given languages.",
            "CO5": "Understand decidability and P vs NP concepts."
        }
    },
    "CS3491": {
        "name": "Artificial Intelligence and Machine Learning",
        "semester": 4,
        "objective": "To understand the concepts of AI and intelligent agents. To learn search algorithms and constraint satisfaction problems. To understand probabilistic reasoning and Bayesian networks. To learn supervised and unsupervised machine learning algorithms. To understand neural networks and deep learning basics.",
        "units": {
            "1": {
                "title": "Problem Solving",
                "desc": "Introduction to AI – AI Applications – Problem Solving Agents – Search Algorithms – Uninformed Search Strategies – Heuristic Search Strategies – Local Search and Optimization Problems – Adversarial Search – Constraint Satisfaction Problems."
            },
            "2": {
                "title": "Probabilistic Reasoning",
                "desc": "Acting under Uncertainty – Bayesian Inference – Naive Bayes Models – Probabilistic Reasoning – Bayesian Networks – Exact Inference in BN – Approximate Inference in BN – Causal Networks."
            },
            "3": {
                "title": "Supervised Learning",
                "desc": "Introduction to Machine Learning – Linear Regression: Least Squares, Multiple Variables, Gradient Descent – Linear Classification: Discriminant Function, Logistic Regression, Naive Bayes – Support Vector Machine – Decision Tree – Random Forests."
            },
            "4": {
                "title": "Ensemble Techniques and Unsupervised Learning",
                "desc": "Combining Multiple Learners – Voting – Ensemble Learning: Bagging, Boosting, Stacking – Unsupervised Learning: K-Means Clustering – KNN – Gaussian Mixture Models – Expectation Maximization."
            },
            "5": {
                "title": "Neural Networks",
                "desc": "Perceptron – Multilayer Perceptron – Activation Functions – Network Training – Gradient Descent Optimization – Error Backpropagation – Vanishing Gradient Problem – ReLU – Hyperparameter Tuning – Batch Normalization – Regularization – Dropout."
            }
        },
        "cos": {
            "CO1": "Apply search algorithms for problem solving.",
            "CO2": "Solve problems using probabilistic reasoning and Bayesian networks.",
            "CO3": "Apply supervised learning algorithms for classification and regression.",
            "CO4": "Apply ensemble and unsupervised learning techniques.",
            "CO5": "Design simple neural network models."
        }
    },
    "CS3401": {
        "name": "Algorithms",
        "semester": 4,
        "objective": "To understand algorithm analysis and asymptotic notations. To learn searching and sorting algorithms. To understand graph algorithms and their applications. To learn algorithm design techniques: Divide and Conquer, Dynamic Programming, Greedy. To understand NP-completeness and approximation algorithms.",
        "units": {
            "1": {
                "title": "Introduction",
                "desc": "Algorithm Analysis: Time and Space Complexity – Asymptotic Notations – Best, Worst, Average Case Analysis – Recurrence Relation: Substitution Method – Searching: Linear, Binary, Interpolation Search – Pattern Search: Naive, Rabin-Karp, KMP – Sorting: Insertion Sort, Heap Sort."
            },
            "2": {
                "title": "Graph Algorithms",
                "desc": "Graph Representations – Graph Traversal: DFS, BFS – Connectivity, Bi-connectivity – Minimum Spanning Tree: Kruskal's and Prim's Algorithm – Shortest Path: Bellman-Ford, Dijkstra's, Floyd-Warshall – Network Flow: Ford-Fulkerson – Maximum Bipartite Matching."
            },
            "3": {
                "title": "Algorithm Design Techniques",
                "desc": "Divide and Conquer: Finding Max and Min, Merge Sort, Quick Sort – Dynamic Programming: Matrix-Chain Multiplication, Multistage Graph, Optimal BST – Greedy Technique: Activity Selection, Optimal Merge Pattern, Huffman Trees."
            },
            "4": {
                "title": "State Space Search",
                "desc": "Backtracking: N-Queens Problem, Hamiltonian Circuit, Subset Sum, Graph Colouring – Branch and Bound: 15-Puzzle, Assignment Problem, Knapsack Problem, Travelling Salesman Problem."
            },
            "5": {
                "title": "NP-Complete and Approximation",
                "desc": "Tractable and Intractable Problems – NP-Hardness and NP-Completeness – Bin Packing – Problem Reduction: TSP, 3-CNF – Approximation Algorithms: TSP – Randomized Algorithms: Primality Testing, Randomized Quick Sort."
            }
        },
        "cos": {
            "CO1": "Analyse the time and space complexity of algorithms.",
            "CO2": "Apply graph algorithms for shortest path and MST problems.",
            "CO3": "Design algorithms using Divide and Conquer, DP, and Greedy techniques.",
            "CO4": "Solve problems using Backtracking and Branch and Bound.",
            "CO5": "Understand NP-completeness and approximation algorithms."
        }
    },
    "CS3451": {
        "name": "Introduction to Operating Systems",
        "semester": 4,
        "objective": "To understand the structure and functions of Operating Systems. To learn process management, scheduling, and synchronization. To understand memory management techniques. To learn file system implementation and I/O management. To understand virtualization and mobile operating systems.",
        "units": {
            "1": {
                "title": "Operating System Overview",
                "desc": "Computer System Elements and Organization – OS Objectives and Functions – Evolution of OS – OS Structures – OS Services – System Calls – System Programs – Design and Implementation – Structuring Methods."
            },
            "2": {
                "title": "Process Management",
                "desc": "Process Concept – Process Scheduling – Operations on Processes – IPC – CPU Scheduling Algorithms – Threads – Multithread Models – Process Synchronization – Critical Section Problem – Semaphores – Mutex – Monitors – Deadlock: Prevention, Avoidance, Detection, Recovery."
            },
            "3": {
                "title": "Memory Management",
                "desc": "Main Memory – Swapping – Contiguous Memory Allocation – Paging – Page Table Structure – Segmentation – Virtual Memory – Demand Paging – Copy on Write – Page Replacement Algorithms – Allocation of Frames – Thrashing."
            },
            "4": {
                "title": "Storage Management",
                "desc": "Disk Structure – Disk Scheduling – File System Interface – File Concept – Access Methods – Directory Structure – File Sharing and Protection – File System Implementation – Allocation Methods – Free Space Management – I/O Systems."
            },
            "5": {
                "title": "Virtual Machines and Mobile OS",
                "desc": "Virtual Machines: History, Benefits, Building Blocks, Types – Virtualization and OS Components – Mobile OS: iOS and Android Architecture."
            }
        },
        "cos": {
            "CO1": "Describe the structure, services and functions of an OS.",
            "CO2": "Apply CPU scheduling algorithms and solve synchronization problems.",
            "CO3": "Compare memory management and page replacement techniques.",
            "CO4": "Explain file system implementation and disk scheduling.",
            "CO5": "Understand virtualization and mobile OS concepts."
        }
    },
    "CS3492": {
        "name": "Database Management Systems",
        "semester": 4,
        "objective": "To learn the fundamentals of data models and relational algebra. To represent a database system using ER diagrams and apply normalization techniques. To understand transaction processing, concurrency control, and recovery. To learn internal storage structures including file organization and indexing. To introduce distributed databases, NoSQL databases, and database security.",
        "units": {
            "1": {
                "title": "Relational Databases",
                "desc": "Purpose of Database Systems – Views of Data – Data Models – Database System Architecture – Relational Model – Keys – Relational Algebra – SQL Fundamentals – Advanced SQL – Embedded SQL – Dynamic SQL."
            },
            "2": {
                "title": "Database Design",
                "desc": "Entity-Relationship (ER) Model – ER Diagrams – Enhanced-ER Model – ER-to-Relational Mapping – Functional Dependencies – Non-loss Decomposition – First, Second, Third Normal Forms – BCNF – Multi-valued Dependencies – Fourth Normal Form – Join Dependencies – Fifth Normal Form."
            },
            "3": {
                "title": "Transactions",
                "desc": "Transaction Concepts – ACID Properties – Schedules – Serializability – Transaction Support in SQL – Concurrency Control: Two-Phase Locking, Timestamp-based, Multiversion, Validation, Snapshot Isolation, Multiple Granularity Locking – Deadlock Handling – Recovery Concepts: Deferred and Immediate Update, Shadow Paging, ARIES Algorithm."
            },
            "4": {
                "title": "Implementation Techniques",
                "desc": "RAID – File Organization – Organization of Records in Files – Data Dictionary Storage – Column-Oriented Storage – Indexing and Hashing: Ordered Indices, B+ Tree Index, B Tree Index, Static Hashing, Dynamic Hashing – Query Processing Overview – Algorithms for Selection, Sorting, Join – Query Optimization: Heuristics, Cost Estimation."
            },
            "5": {
                "title": "Advanced Topics",
                "desc": "Distributed Databases: Architecture, Data Storage, Transaction Processing, Query Processing and Optimization – NoSQL Databases: CAP Theorem, Document-Based, Key-Value Stores, Column-Based, Graph Databases – Database Security: Security Issues, Access Control, Role-Based Access Control, SQL Injection, Encryption."
            }
        },
        "cos": {
            "CO1": "Construct SQL queries using relational algebra.",
            "CO2": "Design databases using ER model and apply normalization techniques.",
            "CO3": "Construct queries to handle transaction processing and maintain database consistency.",
            "CO4": "Understand internal storage structures and evaluate query processing and optimization techniques.",
            "CO5": "Appreciate how advanced databases differ from relational databases and select suitable databases."
        }
    },
    "MA25C02": {
        "name": "Linear Algebra",
        "semester": 2,
        "objective": "To impart foundational knowledge in linear algebra essential for analysing and solving problems in engineering applications. To provide the knowledge on computation using software and interpret key linear algebra concepts using software.",
        "units": {
            "1": {
                "title": "Vector Spaces",
                "desc": "Introduction to Vector Spaces, Examples, Subspaces, Linear Combinations, Span, Generating Sets, Linear Dependence and Independence, Basis and Dimension, Dimension of Subspaces."
            },
            "2": {
                "title": "Linear Transformations and Diagonalization",
                "desc": "Null space, Range, Dimension Theorem (statement only), Matrix representation of a linear transformation, Eigenvalues & Eigenvectors, Diagonalizability."
            },
            "3": {
                "title": "Inner Product Spaces",
                "desc": "Inner product, Norms, Cauchy, Schwarz inequality, Gram, Schmidt orthogonalization, Simple problems (up to R3)."
            },
            "4": {
                "title": "Matrix Decomposition",
                "desc": "Orthogonal transformation of a symmetric matrix to diagonal form Positive definite matrices, QR decomposition, Singular Value Decomposition (SVD), Least squares solutions- simple problems (up to 3 × 3 matrices)."
            },
            "5": {
                "title": "Applications",
                "desc": "Open-Source software exercises to compute the matrix representation of a linear transformation, find the null space and range of a matrix, and compute eigenvalues and eigenvectors of a matrix."
            }
        },
        "cos": {
            "CO1": "Explain the fundamental concepts of Linear Algebra.",
            "CO2": "Compute and interpret eigenvalues and eigenvectors.",
            "CO3": "Apply inner product concepts and perform orthogonalization.",
            "CO4": "Compute least squares solutions of linear system of equations.",
            "CO5": "Use MATLAB to implement and validate key linear algebra concepts."
        }
    },
    "EE25C01": {
        "name": "Basic Electrical and Electronics Engineering",
        "semester": 2,
        "objective": "To impart foundational knowledge in principles and applications of electrical and electronics engineering.",
        "units": {
            "1": {
                "title": "DC Fundamentals",
                "desc": "Current and Voltage sources, Resistance, Inductance and Capacitance; Ohm’s law, Kirchhoff’s law, Series parallel combination of R, L and C components, Voltage Divider and Current Divider Rules."
            },
            "2": {
                "title": "AC Fundamentals",
                "desc": "Faraday’s Laws of Electro-magnetic Induction, Definition of Self and Mutual Inductances, Generation of sinusoidal voltage, Instantaneous & RMS values of sinusoidal signals, Introduction to 3-phase systems, Electrical Safety, Fuses and Earthing."
            },
            "3": {
                "title": "Electric Machines",
                "desc": "DC Machines, Transformers, Star and delta Connections, Three phase Induction motors, Synchronous Generators, Single Phase Induction Motors, Stepper Motor, Universal Motor and BLDC motor."
            },
            "4": {
                "title": "Semiconductor Devices",
                "desc": "PN junction diodes, Zener Diode, Voltage regulator, BJT & FET Transistors, Timers, Operational Amplifiers."
            },
            "5": {
                "title": "Digital Electronics and Microcontrollers",
                "desc": "Boolean algebra, Basic and Universal Gates, adders, multiplexers, demultiplexers and flip-flops. Microcontrollers: Introduction, Architecture, Potential Applications."
            }
        },
        "cos": {
            "CO1": "Understand and explain basic electrical and electronic concepts.",
            "CO2": "Apply and analyse electrical circuits in real-time applications.",
            "CO3": "Identify and utilise key electronic devices used in engineering applications"
        }
    },
    "CS25C06": {
        "name": "Digital Principles and Computer Organization",
        "semester": 2,
        "objective": "To impart knowledge on digital logic and provide functional concepts of computer systems with necessary illustrations.",
        "units": {
            "1": {
                "title": "Digital Logic",
                "desc": "Digital Systems, Integer Arithmetic, Addition and Subtraction of Signed Numbers, Boolean Algebra, Theorems and Postulates, Functions, Truth Table, Canonical and Standard Forms, Simplification using K-Maps, Digital Logic Gates, Universal gates, Implementation of Logic Gates, Integrated Circuits."
            },
            "2": {
                "title": "Computer System",
                "desc": "Basic structure of a computer, Classes of Computer, Functional units - Interconnection of components, Von Neumann architecture and Harvard architecture - Instruction execution cycle, Performance metrics: MIPS, MFLOPS, CPI, throughput."
            },
            "3": {
                "title": "Arithmetic and Logic Unit",
                "desc": "Combinational Circuits: Adders, Binary Adder, Binary Parallel Adder, Subtractor, Multiplexers, Decoders, Design of Fast Adder, Multiplication of Signed and Unsigned Numbers, Fast Multiplication - Integer Division, Floating Point Numbers and Operations, Booth’s algorithm for signed multiplication, Sequential Circuits: Flip-Flops, Registers, Counters."
            },
            "4": {
                "title": "Processing and Pipelining",
                "desc": "Instruction Set Architecture: RISC vs CISC, Addressing modes, Hardwired control and Micro programmed control unit, Concepts of Pipelining, Pipeline stages and Timing diagram, Hazards: Structural, Data and Control Hazards, Instruction-level parallelism, Parallel processing concepts: SIMD, MIMD, Superscalar processors, Vector and Array Processor."
            },
            "5": {
                "title": "Memory and I/O Systems",
                "desc": "Memory hierarchy: Registers, Cache, Main Memory, RAM, ROM, HDD, SSD, Cache Organization and replacement policies, NUMA, DMA, ECC. I/O Techniques: Programmed, Interrupt-Driven, DMA, I/O Devices and Interface Standards: PCI, USB, SATA, Interrupts, Buses, Arbitration."
            }
        },
        "cos": {
            "CO1": "Identify basic digital components and their functions in a computer system.",
            "CO2": "Apply Boolean algebra and number systems to design simple digital circuits and simulate them using tools.",
            "CO3": "Analyze instruction sets, arithmetic units, and performance metrics to evaluate processor design.",
            "CO4": "Engage in continuous learning to update with advancements through evolving computing trends."
        }
    },
    "PH25C03": {
        "name": "Applied Physics (CSIE) – II",
        "semester": 2,
        "objective": "To provide a comprehensive understanding of physics concepts in computer science and engineering applications.",
        "units": {
            "1": {
                "title": "Magnetic Materials",
                "desc": "Parameters, Ferromagnetic materials, Ferrites - Soft and Hard magnetic materials – GMR sensors - magnetic disk memories – Principle of magnetic recording – Magnetic data storage."
            },
            "2": {
                "title": "Logic Gates",
                "desc": "Conversion of Binary to decimal - decimal to binary – binary coded decimal code-logic gates (OR, AND, NOT, NAND and NOR)–Exclusive OR gate- simplification based on basic Boolean theorems (sum of products, product of sums expression)- simplification by Karnaugh Map method (don’t care conditions)."
            },
            "3": {
                "title": "Nano-Devices",
                "desc": "Introduction – electron density in bulk material – size dependence of Fermi energy-quantum confinement – quantum structures: quantum wells, wires and dots – band gap of nanomaterials. Tunneling- Coulomb blockade - single electron transistor - resonant-tunneling diode- Carbon nanotubes: Properties and applications."
            },
            "4": {
                "title": "Quantum Computing",
                "desc": "Quantum system for information processing - quantum states – classical bits – quantum bits or qubits – Bloch sphere -CNOT gate – Single and multiple qubits – quantum gates (Pauli – X, Y and Z Gates, Hadamard Gate, Phase gate - T gate .CNOT Gate) – advantage of quantum computing over classical computing."
            },
            "5": {
                "title": "Emerging Technologies",
                "desc": "Review of emergence of spin electronics in data storage and applications of quantum computing and nano-devices in modern computing systems."
            }
        },
        "cos": {
            "CO1": "Explain the concepts of physics in computer science stream.",
            "CO2": "Apply appropriate techniques in physics to solve engineering problems.",
            "CO3": "Analyse physical systems and interpret data from the virtual studies in the core branches in computer science and engineering."
        }
    },
    "CS25C07": {
        "name": "Object Oriented Programming",
        "semester": 2,
        "objective": "To impart the principles of object-oriented programming and their advantages over procedural programming. To develop problem-solving skills by creating real-world applications using OOP features.",
        "units": {
            "1": {
                "title": "Principles of Object-Oriented Programming",
                "desc": "Characteristics of object-oriented languages, C++ Program structure, Procedure Oriented Programming vs Object Oriented Programming, C++ constructs and syntax, tokens, variables, data-types, type conversion, operators, Expressions, Namespace, flow Control and decision, making statements."
            },
            "2": {
                "title": "Classes and Objects",
                "desc": "Abstraction mechanism: Classes, Objects, member data, member functions - Constructors and types - destructors, inline function, friend function -- array of objects, objects as function arguments - memory allocation for objects, static members static data and static function."
            },
            "3": {
                "title": "Inheritance and Compile Time Polymorphism",
                "desc": "Inheritance: Derived Classes – Single inheritance – Multilevel Inheritance – Multiple Inheritance - Hierarchical inheritance – Hybrid inheritance. Operator Overloading: Compile time Polymorphism – Overloading Functions, Overloading Operators, Overloading Unary Operators – Overloading Binary Operators – Operator Overloading with Friend Functions."
            },
            "4": {
                "title": "Pointers and Runtime Polymorphism",
                "desc": "Pointers with arithmetic operations - this pointer – Pointers to Derived classes and Base classes - Compile time versus Runtime Polymorphism - Virtual functions - Late Binding - Abstract classes- Pure virtual functions and Virtual Destructors - Virtual base class."
            },
            "5": {
                "title": "Templates and Exception Handling, I/O Systems",
                "desc": "Class Templates - Function Templates – Overloading of Template Functions - String, iterators, hashes, IO streams; Exception Handling. C++ Streams - Formatted and Unformatted I/O –File stream classes – File modes - File operations, Sequential Read / Write operations – Binary and ASCII Files - Error handling in file I/O."
            }
        },
        "cos": {
            "CO1": "Understand the core OOP concepts and applications",
            "CO2": "Apply Object Oriented Paradigms to solve problems using C++",
            "CO3": "Design and Analyze solutions involving code reusability and complexity management",
            "CO4": "Demonstrate life-long learning skills through application development"
        }
    }
};
