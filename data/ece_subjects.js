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
    },

    /* ══════════════════════════════════════════════════════════════════
     *  SEMESTER  4  —  BATCH 2028  (R2021)
     * ══════════════════════════════════════════════════════════════════ */

    "EC3452": {
        name: "Electromagnetic Fields",
        semester: 4,
        objective: "To impart knowledge on the basics of static electric and magnetic fields, their associated laws, and the propagation behavior of electromagnetic waves.",
        units: {
            1: { title: "Introduction / Electrostatics – I", desc: "Electromagnetic models, coordinate systems, Coulomb's Law, electric field intensity, Gauss's law and its applications." },
            2: { title: "Electrostatics – II", desc: "Electric potential, conductors and dielectrics, electric flux density, boundary conditions, Poisson's and Laplace's equations." },
            3: { title: "Magnetostatics", desc: "Lorentz force, Biot-Savart's Law, Ampere's Circuit Law, magnetic flux density, scalar and vector potential, magnetic force and torque." },
            4: { title: "Time-Varying Fields and Maxwell's Equations", desc: "Faraday's law, displacement current, Maxwell-Ampere law, Maxwell's equations in differential and integral forms, wave equations." },
            5: { title: "Electromagnetic Waves", desc: "Electromagnetic wave generation and equations, wave parameters, waves in free space, lossy and lossless dielectrics, Poynting vector, reflection and refraction." }
        },
        cos: {
            CO1: "Understand the fundamentals of static electric and magnetic fields.",
            CO2: "Analyze and apply Gauss's law, Poisson's and Laplace's equations in electrostatics.",
            CO3: "Evaluate magnetic fields using Ampere's and Biot-Savart's laws.",
            CO4: "Analyze time-varying fields using Maxwell's equations.",
            CO5: "Understand the propagation of electromagnetic waves in various media."
        },
        topics: {
            presentation: [
                "Applications of Gauss's Law",
                "Boundary Conditions in Dielectrics",
                "Biot-Savart's Law and its Applications",
                "Maxwell's Equations in Integral and Differential Form",
                "Displacement Current and its Significance",
                "Poynting Vector and Power Flow",
                "Electromagnetic Waves in Free Space",
                "Skin Effect and Skin Depth in Conductors",
                "Wave Propagation in Lossy Dielectrics",
                "Polarization of Electromagnetic Waves"
            ],
            miniproject: [
                "Electric Field Mapper Simulation",
                "Magnetic Field Plotter using Python",
                "Maxwell's Equations Visualizer",
                "Poynting Vector Calculation App",
                "Electromagnetic Wave Propagation Animation"
            ]
        }
    },

    "EC3401": {
        name: "Networks and Security",
        semester: 4,
        objective: "To learn network models, datalink layer functions, routing in the Network Layer, transport layer protocols, and Network Security Mechanisms.",
        units: {
            1: { title: "Network Models and Datalink Layer", desc: "OSI, TCP/IP models, addressing, error detection and correction, Ethernet (802.3), Wireless LAN, flow and error control protocols." },
            2: { title: "Network Layer Protocols", desc: "IPv4 Addressing, Network Layer Protocols (IP, ICMP, Mobile IP), Unicast/Multicast Routing, IPv6 Addresses and Datagram Format." },
            3: { title: "Transport and Application Layers", desc: "UDP and TCP, Congestion Control and Avoidance (DEC bit, RED), QoS, Client-Server Programming, DNS, WWW, HTTP, and Electronic Mail." },
            4: { title: "Network Security", desc: "OSI Security Architecture, attacks, security services, encryption (AES), Public Key Cryptosystems (RSA), Hash Functions (SHA), Digital Signature Algorithm." },
            5: { title: "Hardware Security", desc: "Hardware security, hardware Trojans, Side-Channel Attacks, Physical Attacks and Countermeasures, Design for Security, Blockchain Technology." }
        },
        cos: {
            CO1: "Explain the basic layers and their functions in computer networks.",
            CO2: "Understand and apply network layer routing protocols and IP addressing.",
            CO3: "Analyze transport layer protocols and congestion control mechanisms.",
            CO4: "Describe and apply cryptographic algorithms and network security protocols.",
            CO5: "Identify hardware vulnerabilities and understand countermeasures."
        },
        topics: {
            presentation: [
                "TCP vs UDP Protocols",
                "Distance Vector vs Link State Routing",
                "IPv4 vs IPv6 Addressing",
                "Advanced Encryption Standard (AES) Architecture",
                "RSA Public Key Cryptography",
                "Network Congestion Control Mechanisms",
                "Hardware Trojans and Countermeasures",
                "Blockchain Technology Fundamentals",
                "Secure Hash Algorithm (SHA) Process",
                "Error Detection using CRC"
            ],
            miniproject: [
                "Simple Networking Chat Client-Server",
                "RSA Encryption/Decryption Tool",
                "Network Packet Sniffer using Python",
                "Distance Vector Routing Simulation",
                "CRC Generator and Verifier"
            ]
        }
    },

    "EC3451": {
        name: "Linear Integrated Circuits",
        semester: 4,
        objective: "To introduce the basic building blocks of linear integrated circuits, the linear and non-linear applications of operational amplifiers, theory of analog multipliers, PLL, ADC, and DAC.",
        units: {
            1: { title: "Basics of Operational Amplifiers", desc: "Current mirrors, basic information about op-amps, Ideal Operational Amplifier, internal circuit of IC 741, DC/AC characteristics, slew rate, open/closed-loop configurations." },
            2: { title: "Applications of Operational Amplifiers", desc: "Sign changers, scale changers, V-I converters, adders, subtractors, instrumentation amplifiers, integrators, differentiators, comparators, Schmitt triggers, precision rectifiers, active filters." },
            3: { title: "Analog Multiplier and PLL", desc: "Analog multipliers, Gilbert Multiplier cell, variable transconductance techniques, basic PLL, closed-loop analysis, VCO, monolithic PLL IC 565, applications in AM/FM detection." },
            4: { title: "Analog to Digital and Digital to Analog Converters", desc: "D/A converter specifications, weighted resistor, R-2R Ladder, high-speed S/H circuits. A/D Converters: Flash, Successive Approximation, Dual Slope, Sigma-Delta converters." },
            5: { title: "Waveform Generators and Special Function ICs", desc: "IC voltage regulators (LM78XX, LM79XX, LM317), switching regulators (SMPS), function generator ICs (ICL 8038), special function ICs." }
        },
        cos: {
            CO1: "Understand the basic characteristics and internal structure of operational amplifiers.",
            CO2: "Design linear and non-linear circuits using operational amplifiers.",
            CO3: "Understand the operating principles of analog multipliers and PLLs.",
            CO4: "Analyze different types of ADCs and DACs.",
            CO5: "Acquire knowledge on waveform generators and special function ICs."
        },
        topics: {
            presentation: [
                "Slew Rate and Frequency Response of Op-Amps",
                "Instrumentation Amplifier and its Applications",
                "Active Filters (Low Pass and High Pass) using Op-Amp",
                "Schmitt Trigger Configuration and Hysteresis",
                "Phase Locked Loop (PLL) Working Principle",
                "Successive Approximation ADC vs Flash ADC",
                "R-2R Ladder Digital to Analog Converter",
                "Sigma-Delta Analog to Digital Converter",
                "Switch Mode Power Supply (SMPS) Basics",
                "Voltage Controlled Oscillator (VCO)"
            ],
            miniproject: [
                "Op-Amp based Audio Mixer",
                "Op-Amp Integrator and Differentiator Demonstration",
                "PLL based Frequency Multiplier",
                "Simple 4-bit R-2R DAC Implementation",
                "Adjustable Voltage Regulator using LM317"
            ]
        }
    },

    "EC3492": {
        name: "Digital Signal Processing",
        semester: 4,
        objective: "To learn discrete Fourier transform and its applications, characteristics and design of digital IIR and FIR filters, finite word length effects, and multirate signal processing.",
        units: {
            1: { title: "Discrete Fourier Transform", desc: "Sampling theorem, FT and DTFT, DFT derivation, properties of DFT, linear filtering using DFT, Radix-2 DIT and DIF FFT algorithms." },
            2: { title: "Infinite Impulse Response Filters", desc: "Characteristics of analog filters (Butterworth, Chebyshev), design of IIR filters utilizing impulse invariance and bilinear transformation methodologies, IIR filter structures." },
            3: { title: "Finite Impulse Response Filters", desc: "Design of symmetric and anti-symmetric FIR filters, design of linear phase FIR filters utilizing Fourier series and windowing techniques, frequency sampling method, FIR structures." },
            4: { title: "Finite Word Length Effects", desc: "Fixed and floating-point representations, ADC quantization, truncation/rounding, quantization noise, coefficient quantization error, overflow error, limit cycle oscillations." },
            5: { title: "DSP Applications", desc: "Multirate signal processing, decimation, interpolation, sampling rate conversion, adaptive filters, DSP architecture principles for fixed and floating-point systems." }
        },
        cos: {
            CO1: "Compute the Discrete Fourier Transform and Fast Fourier Transform of discrete-time signals.",
            CO2: "Design infinite impulse response (IIR) filters for given specifications.",
            CO3: "Design finite impulse response (FIR) filters and realize filter structures.",
            CO4: "Analyze the finite word length effects in digital filters.",
            CO5: "Understand multirate signal processing and basic DSP architectures."
        },
        topics: {
            presentation: [
                "Radix-2 DIT vs DIF Fast Fourier Transform",
                "Bilinear Transformation in IIR Filter Design",
                "Comparison of Butterworth and Chebyshev Filters",
                "Windowing Techniques in FIR Filter Design",
                "Limit Cycle Oscillations in IIR Filters",
                "Quantization Noise in Digital Systems",
                "Decimation and Interpolation Techniques",
                "Adaptive Filtering Concepts",
                "Linear vs Circular Convolution using DFT",
                "DSP Processor Architecture Overview"
            ],
            miniproject: [
                "FFT Calculation Implementation",
                "FIR Filter Design utilizing Windowing in Python",
                "IIR Filter Design and Frequency Response Plotting",
                "Audio Signal Noise Filtering Demo",
                "Signal Decimation/Interpolation Simulator"
            ]
        }
    },

    "EC3491": {
        name: "Communication Systems",
        semester: 4,
        objective: "To introduce analog modulation schemes, impart knowledge in random processes, and facilitate the study of various digital communication systems.",
        units: {
            1: { title: "Amplitude Modulation", desc: "Review of signals/systems, Amplitude Modulation Systems (DSB, SSB, VSB), Angle Modulation (FM, PM), Hilbert Transform, Superheterodyne Receiver." },
            2: { title: "Random Process & Sampling", desc: "Probability, random processes, Gaussian and white noise, Pre-emphasis and De-emphasis, low-pass sampling, aliasing, quantization, PCM, TDM and FDM." },
            3: { title: "Digital Techniques", desc: "Pulse modulation, differential pulse code modulation, delta modulation, digital multiplexers, channel coding theorems, Linear Block codes, Convolutional codes." },
            4: { title: "Digital Modulation Scheme", desc: "Geometric representation of signals, Coherent BPSK, BFSK, QPSK, QAM, Carrier Synchronization, Non-coherent modulation schemes." },
            5: { title: "Demodulation Techniques", desc: "Detection Theory, optimum detection of signals in noise, baseband pulse transmission, inter-symbol interference, optimum demodulation over band-limited channels." }
        },
        cos: {
            CO1: "Analyze various analog continuous wave modulation and demodulation techniques.",
            CO2: "Understand the mathematical fundamentals of random processes and noise.",
            CO3: "Evaluate the performance of various pulse modulation and channel coding techniques.",
            CO4: "Analyze different digital modulation schemes and their geometrical representations.",
            CO5: "Design optimum receivers for digital communication in the presence of noise."
        },
        topics: {
            presentation: [
                "Superheterodyne Receiver Architecture",
                "Frequency Modulation vs Amplitude Modulation",
                "Nyquist Sampling Theorem and Aliasing",
                "Pulse Code Modulation (PCM) Technique",
                "Delta Modulation and Slope Overload Error",
                "Quadrature Amplitude Modulation (QAM)",
                "Error Detection with Hamming Codes",
                "Viterbi Decoding Algorithm",
                "Inter-Symbol Interference (ISI) and Equalization",
                "Matched Filter Receiver Concept"
            ],
            miniproject: [
                "AM Modulation and Demodulation Simulation",
                "Sampling Theorem Visualizer",
                "Simple PCM Encoder/Decoder Simulator",
                "BPSK Constellation Diagram Plotter",
                "Hamming Code Error Correction Tool"
            ]
        }
    },

    /* ══════════════════════════════════════════════════════════════════
     *  SEMESTER  6  —  BATCH 2027  (R2021)
     * ══════════════════════════════════════════════════════════════════ */

    "ET3491": {
        name: "Embedded Systems and IoT Design",
        semester: 6,
        objective: "To learn the architecture and features of the 8051 microcontroller, study the design process of an embedded system, understand RTOS concepts, and design IoT-based applications.",
        units: {
            1: { title: "8051 Microcontroller", desc: "Architecture, addressing modes, instruction set, program and data memory, stacks, interrupts, timers/counters, serial ports, and programming." },
            2: { title: "Embedded System Design Principles", desc: "Design process of an embedded system, hardware/software co-design, computational models, processor and memory organization." },
            3: { title: "RTOS and Embedded Software", desc: "Processes and operating systems, real-time operating systems (RTOS), task assignment, scheduling, inter-process communication." },
            4: { title: "IoT System Architecture and Protocols", desc: "IoT enabling technologies, IoT reference architectures, standard IoT protocols (MQTT, CoAP, HTTP), sensor networks." },
            5: { title: "IoT Design and Case Studies", desc: "Basic building blocks of an IoT device (Raspberry Pi), Linux on Raspberry Pi, programming with Python, case studies in home automation, smart cities, and agriculture." }
        },
        cos: {
            CO1: "Explain the architecture and instruction set of the 8051 microcontroller.",
            CO2: "Develop the conceptual model of an embedded system.",
            CO3: "List and apply the concepts of real-time operating systems.",
            CO4: "Understand the architecture and protocols utilized in IoT.",
            CO5: "Design an IoT-based system for various real-world applications."
        },
        topics: {
            presentation: [
                "8051 Microcontroller Architecture",
                "Hardware/Software Partitioning in Embedded Systems",
                "Task Scheduling Algorithms in RTOS",
                "Inter-Process Communication Mechanisms",
                "MQTT Protocol for IoT",
                "Raspberry Pi Architecture for IoT node",
                "Edge Computing in IoT",
                "Sensors and Actuators Interfacing",
                "Smart Home Automation using IoT",
                "IoT Security Challenges"
            ],
            miniproject: [
                "Home Automation using Raspberry Pi",
                "8051 Embedded Clock Simulation",
                "MQTT Sensor Data Publisher",
                "Smart Weather Station Dashboard",
                "Automated Plant Watering System using IoT"
            ]
        }
    },

    "CS3491": {
        name: "Artificial Intelligence and Machine Learning",
        semester: 6,
        objective: "To equip students with knowledge and practical skills in Artificial Intelligence and Machine Learning, covering problem-solving, probabilistic reasoning, supervised/unsupervised learning, and neural networks.",
        units: {
            1: { title: "Problem Solving", desc: "AI applications, problem-solving agents. Uninformed and heuristic search algorithms, local search, optimization problems, adversarial search, constraint satisfaction problems (CSPs)." },
            2: { title: "Probabilistic Reasoning", desc: "Acting under uncertainty, Bayesian inference, naive Bayes models. Probabilistic reasoning using Bayesian networks, exact/approximate inference, causal networks." },
            3: { title: "Supervised Learning", desc: "Introduction to ML, linear regression models, gradient descent. Linear classification models: logistic regression, SVM, maximum margin classifier, Decision Trees, Random Forests." },
            4: { title: "Ensemble Techniques and Unsupervised Learning", desc: "Combining multiple learners, voting, bagging, boosting, stacking. Unsupervised learning: K-means, KNN, Gaussian mixture models, Expectation Maximization." },
            5: { title: "Neural Networks", desc: "Perceptrons, multilayer perceptrons, activation functions, gradient descent optimization, backpropagation, vanishing gradient, ReLU, hyperparameter tuning, batch normalization, dropout." }
        },
        cos: {
            CO1: "Implement various search algorithms for artificial intelligence problem solving.",
            CO2: "Apply probabilistic reasoning and Bayesian networks for decision making under uncertainty.",
            CO3: "Develop supervised learning models such as regression, SVM, and decision trees.",
            CO4: "Utilize ensemble learning and unsupervised learning techniques like clustering.",
            CO5: "Design and train deep neural networks utilizing modern backpropagation techniques."
        },
        topics: {
            presentation: [
                "A* Search Algorithm and Heuristics",
                "Constraint Satisfaction Problems",
                "Bayesian Networks and Exact Inference",
                "Support Vector Machines (SVM) Margin concept",
                "Decision Trees vs Random Forests",
                "K-Means Clustering Iteration Process",
                "Ensemble Methods: Bagging vs Boosting",
                "Backpropagation Algorithm Mathematics",
                "Vanishing Gradient Problem and ReLU",
                "Dropout and Regularization in Neural Networks"
            ],
            miniproject: [
                "Pathfinding Visualizer (A* and BFS)",
                "Spam Classifier utilizing Naive Bayes",
                "House Price Prediction via Linear Regression",
                "Customer Segmentation using K-Means",
                "Handwritten Digit Recognition with Neural Network"
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
