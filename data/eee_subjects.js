/**
 * EEE_SUBJECTS — Syllabus details for EEE core subjects
 */

const EEE_SUBJECTS = {

    /* ══════════════════════════════════════════════════════════════════
     *  SEMESTER  2  —  BATCH 2029  (R2025)
     * ══════════════════════════════════════════════════════════════════ */

    "MA25C03": {
        name: "Transforms and its Applications",
        semester: 2,
        objective: "To provide a strong foundation in Fourier Series, Laplace, Fourier and Z-Transforms. To develop the ability to analyze and solve engineering problems.",
        units: {
            1: { title: "Laplace Transforms", desc: "Properties of Laplace transform, Unit step function and Dirac delta function; Inverse Laplace transform: Partial fraction, Convolution theorem." },
            2: { title: "Z-Transform", desc: "Z-transform of standard functions, properties; Inverse Z – transform: Partial fraction technique, Convolution theorem." },
            3: { title: "Fourier Series", desc: "Dirichlet’s conditions, General Fourier series, Convergence, Odd/even functions; Half range sine/cosine series, Root mean square value, Parseval’s identity." },
            4: { title: "Fourier Transform", desc: "Complex Fourier transform, Properties, Relation between Fourier and Laplace transform, Fourier sine and cosine transforms, Parseval’s identity." }
        },
        cos: {
            CO1: "Explain the concept of various transform functions in engineering applications",
            CO2: "Apply Laplace and inverse Laplace transforms for solving differential equations.",
            CO3: "Apply Z-transform methods to solve problems and analyze the results",
            CO4: "Apply Fourier series to express functions and analyze the convergence behavior of the series.",
            CO5: "Select and apply appropriate software for applying transform functions"
        },
        topics: {
            presentation: [
                "Applications of Laplace Transforms in Circuit Analysis",
                "Solving Difference Equations using Z-Transforms",
                "Fourier Series Representation of Periodic Signals",
                "Convergence of Fourier Series",
                "Relationship between Laplace and Fourier Transforms",
                "Parseval's Theorem and Signal Energy",
                "Dirac Delta Function and Impulse Response",
                "Convolution Theorem in System Analysis",
                "Half-Range Fourier Series Extensions",
                "Discrete-time Control Systems using Z-Transforms"
            ],
            miniproject: [
                "MATLAB Simulator for Laplace Transforms",
                "Fourier Series Visualizer App",
                "Digital Filter Design using Z-Transforms",
                "Image Compression Basics (Fourier Concept)",
                "Audio Signal Analysis Demo"
            ]
        }
    },

    "GE25C01": {
        name: "Basic Civil and Mechanical Engineering",
        semester: 2,
        objective: "To impart major fundamental concept of civil & mechanical engineering & provide the insight with regard to applications.",
        units: {
            1: { title: "Historical Evaluation of Engineering", desc: "Structural, Construction, Geotechnical, Environmental, Transportation and Water Resources Engineering. Buildings Terminology." },
            2: { title: "Building Materials", desc: "Bricks and Blocks, Fly ash brick, FRP bricks, Cements, Mortar, Thermal and Acoustic Insulating Materials, Water Proofing." },
            3: { title: "Building Components", desc: "Foundations, Types, Bearing capacity, Masonry, Beams, Columns, Lintels, Rain Water Harvesting, Green Buildings." },
            4: { title: "Power Plants", desc: "Working principle of steam, Gas, Diesel, Hydro, electric and Nuclear Power plants. Renewable energy scenario." },
            5: { title: "Thermal Systems and Manufacturing", desc: "Working of IC Engines, Turbines and Pumps. HVAC systems. Welding, Machining, Forming and Additive manufacturing." }
        },
        cos: {
            CO1: "Understand the scope and significance of civil and mechanical engineering in societal and industrial development.",
            CO2: "Apply basic technical knowledge in the field of civil and mechanical engineering.",
            CO3: "Develop an appreciation for interdisciplinary roles of civil and mechanical engineers in solving real-world problems."
        },
        topics: {
            presentation: [
                "Evolution of Construction Materials",
                "Green Building Concepts and Certifications",
                "Types of Foundations in Building Construction",
                "Rainwater Harvesting Systems",
                "Nuclear Power Plant Operations",
                "Renewable Energy Power Plants",
                "Internal Combustion Engines (2-stroke vs 4-stroke)",
                "HVAC Systems in Modern Buildings",
                "Additive Manufacturing (3D Printing)",
                "Acoustic Insulation Materials"
            ],
            miniproject: [
                "Model of a Green Building",
                "Simple Rainwater Harvesting Prototype",
                "3D Model Demonstration of IC Engine",
                "Comparative Study of Cement Brands",
                "DIY Acoustic Panel Testing"
            ]
        }
    },

    "PH25C04": {
        name: "Applied Physics (EE) – II",
        semester: 2,
        objective: "To impart knowledge on physics concepts and explore the potential applications in the field of electrical engineering.",
        units: {
            1: { title: "Semiconductor Materials", desc: "Intrinsic and Extrinsic Semiconductors, Fermi level, Carrier generation, Drift/diffusion, Hall Effect, Ohmic/Schottky junctions." },
            2: { title: "Dielectrics Materials", desc: "Polarizations, Clausius-Mossotti equation, Behavior in alternating fields, Transformers/Capacitor materials, Ferro/piezo materials." },
            3: { title: "Magnetic Materials", desc: "Ferromagnetic materials, Ferrites, Hard/Soft magnetic materials, GMR sensors, magnetic disk memories." },
            4: { title: "Advanced Materials", desc: "Thermocouple, bimetals, leads soldering and fuses Materials – their applications." }
        },
        cos: {
            CO1: "Explain the concepts of physics in electrical engineering stream.",
            CO2: "Apply appropriate techniques in physics to solve engineering problems.",
            CO3: "Analyse physical systems and interpret data from the virtual studies in the core branches in electrical engineering."
        },
        topics: {
            presentation: [
                "Hall Effect and Its Applications",
                "Schottky vs Ohmic Contacts",
                "Dielectric Polarization Mechanisms",
                "Piezoelectric Materials in Sensors",
                "Magnetic Recording and Data Storage",
                "Giant Magnetoresistance (GMR) Sensors",
                "Thermocouples and Temperature Measurement",
                "Ferrites in High-Frequency Applications",
                "Clausius-Mossotti Equation Explained",
                "Advanced Soldering Materials"
            ],
            miniproject: [
                "Hall Effect Measurement Simulation",
                "Simple Thermocouple Thermometer",
                "Dielectric Constant Testing Kit",
                "Magnetic Memory Demonstrator",
                "Bimetallic Strip Fire Alarm"
            ]
        }
    },

    "ME25C01": {
        name: "Engineering Drawing",
        semester: 2,
        objective: "To impart knowledge on dimensions and drawing standards; explore orthographic, isometric and perspective views of solids.",
        units: {
            1: { title: "Fundamentals", desc: "Drawing standards (BIS), Sheet layout, System of dimensioning. Free hand sketching of 2D/3D objects, Conics – Ellipse, Parabola, Hyperbola." },
            2: { title: "Orthographic Projection", desc: "First angle projection, Projection of points, straight lines and planes." },
            3: { title: "Projection of Solids", desc: "Simple Solids, Section of Solids, Development of Surfaces." },
            4: { title: "Isometric Projection", desc: "Isometric Scale, Projection of Simple solids." },
            5: { title: "Perspective Projection", desc: "Simple solids perspective projection. Development of 2D/3D objects using CAD tools." }
        },
        cos: {
            CO1: "Explain the advantages of engineering drawing in engineering applications",
            CO2: "Apply the concepts of projections in formulating various solid parts",
            CO3: "Analyse the various view and interpret the engineering drawings.",
            CO4: "Use CAD tools for creation of various models.",
            CO5: "Critically think and develop innovative models."
        },
        topics: {
            presentation: [
                "BIS Standards in Engineering Drawing",
                "Constructing Ellipse, Parabola, and Hyperbola",
                "First Angle vs Third Angle Projection",
                "Projection of Planes on Auxiliary Planes",
                "Section of Solids and True Shapes",
                "Development of Surfaces in Sheet Metal",
                "Isometric vs Perspective Projection",
                "Evolution of CAD Software",
                "Reading Complex Engineering Blueprints",
                "Applications of Solid Modeling"
            ],
            miniproject: [
                "CAD Model of a Gear Box",
                "Sheet Metal Pattern for a Funnel",
                "3D Printed Simple Solid Profiles",
                "Drafting a Basic House Plan in AutoCAD",
                "Perspective View Demonstration Model"
            ]
        }
    },

    "CS25C04": {
        name: "Data Structures and Algorithms",
        semester: 2,
        objective: "To provide the fundamentals of data organization and algorithms.",
        units: {
            1: { title: "Data Types", desc: "Abstract Data Types (ADTs), Object-Oriented Programming (Python), Classes, Inheritance, Shallow/Deep Copying." },
            2: { title: "Linear Structures", desc: "List ADT, Array implementation, Singly/Doubly/Circular linked lists, Stacks, Queues." },
            3: { title: "Tree Structures", desc: "Binary Tree ADT, Traversals, BST, AVL trees, Heaps, Multi-way search trees." },
            4: { title: "Graph Structures", desc: "Graph ADT, Traversals, DAG, Shortest paths, MST, Introduction to complexity classes." },
            5: { title: "Algorithm, Sorting and Searching", desc: "Asymptotic notations, Divide & Conquer, Recursion. Bubble, Selection, Insertion, Merge, Quick sort. Hashing." }
        },
        cos: {
            CO1: "Explain fundamental concepts of data structures and Algorithms.",
            CO2: "Implement the data structures in different Applications.",
            CO3: "Evaluate and compare different searching and sorting algorithms",
            CO4: "Demonstrate in continuous learning in interdisciplinary projects involving AI, ML, Data Science."
        },
        topics: {
            presentation: [
                "Shallow vs Deep Copying in Python",
                "Applications of Doubly Linked Lists",
                "Stack vs Queue - Real World Analogies",
                "Binary Search Tree Balancing (AVL)",
                "Heap Data Structure Applications",
                "Dijkstra's Shortest Path Algorithm",
                "Divide and Conquer Strategy",
                "Merge Sort vs Quick Sort Analysis",
                "Hash Collisions and Handling Techniques",
                "Graph Traversals (BFS and DFS)"
            ],
            miniproject: [
                "Task Management using Queue",
                "Expression Evaluator using Stack",
                "Dictionary Implementation using Hash Tables",
                "Shortest Path Visualizer for City Map",
                "Employee Hierarchy using Trees"
            ]
        }
    },

    /* ══════════════════════════════════════════════════════════════════
     *  SEMESTER  4  —  BATCH 2028  (R2021)
     * ══════════════════════════════════════════════════════════════════ */

    "EE3401": {
        name: "Transmission and Distribution",
        semester: 4,
        objective: "To impart knowledge about the configuration of the electrical power systems, line parameters, mechanical design, and performance analysis of transmission lines and distribution systems.",
        units: {
            1: { title: "Transmission Line Parameters", desc: "Structure of electric power systems, parameters of single/three phase transmission lines, single/double circuits, conductor types, symmetrical/unsymmetrical spacing, transposition, GMD, skin and proximity effects, effect of earth." },
            2: { title: "Modelling and Performance of Transmission Lines", desc: "Short, medium, and long transmission lines, equivalent circuits, phasor diagrams, attenuation constant, surge impedance, transmission efficiency, voltage regulation, Power Circle diagrams, Ferranti effect, Corona." },
            3: { title: "Sag Calculation and Line Supports", desc: "Mechanical design of overhead lines, line supports, tension/sag calculations, methods of grounding, insulators (types, voltage distribution, string efficiency improvement, testing)." },
            4: { title: "Underground Cables", desc: "Underground cables types, construction of single-core/3-core belted cables, insulation resistance, potential gradient, capacitance of cables, grading of cables, power factor and heating." },
            5: { title: "Distribution Systems", desc: "General aspects of distribution systems, Kelvin's Law, AC and DC distributions, techniques for voltage control and power factor improvement, types of substations, introduction to EHVAC, HVDC, and FACTS." }
        },
        cos: {
            CO1: "Understand the structure of power systems and compute transmission line parameters.",
            CO2: "Analyze the performance of short, medium, and long transmission lines.",
            CO3: "Evaluate the mechanical design of transmission lines and insulators.",
            CO4: "Analyze the characteristics of underground cables.",
            CO5: "Understand and design effective power distribution systems."
        },
        topics: {
            presentation: [
                "Skin Effect and Proximity Effect in Transmission Lines",
                "Ferranti Effect and its Mitigation",
                "Corona Discharge in Overhead Lines",
                "Methods to Improve String Efficiency of Insulators",
                "Grading of Underground Cables",
                "Smart Grid Distribution Systems",
                "HVDC vs EHVAC Transmission Systems",
                "Flexible AC Transmission Systems (FACTS)",
                "Kelvin's Law for Conductor Size Optimization",
                "Types and Applications of Electrical Substations"
            ],
            miniproject: [
                "Sag and Tension Calculation App",
                "Transmission Line Parameter Calculator",
                "Power Circle Diagram Plotter in Python",
                "String Efficiency Simulator",
                "Underground Cable Grading Analysis Tool"
            ]
        }
    },

    "EE3402": {
        name: "Linear Integrated Circuits",
        semester: 4,
        objective: "To provide knowledge on IC fabrication, signal analysis using Op-amps, applications of Op-amps, functional blocks and applications of special ICs (Timers, PLL, Regulators).",
        units: {
            1: { title: "IC Fabrication", desc: "IC classification, fundamental monolithic IC technology, epitaxial growth, masking, etching, diffusion, fabrication of diodes, capacitance, resistance, FETs, and PV cells." },
            2: { title: "Characteristics of Op-amp", desc: "Ideal and practical Op-amp characteristics, DC/AC characteristics, differential amplifiers, frequency response, voltage-shunt/series feedback, basic applications (summers, differentiators, integrators)." },
            3: { title: "Applications of Op-amp", desc: "Instrumentation amplifiers, log/antilog amplifiers, analog multipliers, active filters, comparators, multivibrators, waveform generators, clippers, clampers, peak detectors, S/H circuits, D/A and A/D converters." },
            4: { title: "Special ICs", desc: "555 Timer functional block and applications, Voltage Controlled Oscillator (VCO) IC 566, Phase-Locked Loop (PLL) circuits." },
            5: { title: "Application ICs", desc: "AD623 Instrumentation Amplifier (load cell measurement), IC voltage regulators (LM78XX, LM79XX, LM317), switching regulators (SMPS), ICL8038 function generator IC." }
        },
        cos: {
            CO1: "Explain the fabrication processes of integrated circuits.",
            CO2: "Analyze the DC and AC characteristics of operational amplifiers.",
            CO3: "Design signal conditioning circuits and converters using Op-amps.",
            CO4: "Understand the working and applications of Special ICs like Timers and PLLs.",
            CO5: "Design power supply and specialized application circuits using specific ICs."
        },
        topics: {
            presentation: [
                "Monolithic IC Fabrication Process",
                "Slew Rate and CMRR in Op-amps",
                "Instrumentation Amplifier in Transducer Bridges",
                "Successive Approximation A/D Converter",
                "Astable and Monostable Modes of 555 Timer",
                "Applications of Phase-Locked Loops (PLL)",
                "Switch Mode Power Supply (SMPS) Operation",
                "Active Filters vs Passive Filters",
                "Logarithmic and Anti-logarithmic Amplifiers",
                "ICL8038 Function Generator Capabilities"
            ],
            miniproject: [
                "Op-amp based Active Audio Filter",
                "555 Timer LED Flasher Circuit",
                "Precision Full-Wave Rectifier",
                "Voltage Regulator utilizing LM317",
                "Simple Digital to Analog Converter (R-2R)"
            ]
        }
    },

    "EE3403": {
        name: "Measurements and Instrumentation",
        semester: 4,
        objective: "To educate students on fundamental measurement concepts, functional aspects of measuring instruments, bridge circuits, sensors/transducers, and digital instrumentation.",
        units: {
            1: { title: "Concepts of Measurements", desc: "Classification and applications of instruments, elements of a generalized measurement system, static/dynamic characteristics, errors in measurement, statistical evaluation." },
            2: { title: "Measurement of Parameters in Electrical Systems", desc: "Moving coil/iron meters, induction and dynamometer type wattmeters, energy meters, Megger, Instrument transformers (CT & PT)." },
            3: { title: "AC/DC Bridges and Instrumentation Amplifiers", desc: "Wheatstone, Kelvin double bridge, Maxwell, Hay, Wien, and Schering bridges. Errors and compensation in AC bridges, instrumentation amplifiers." },
            4: { title: "Transducers for Measurement of Non-Electrical Parameters", desc: "Classification of transducers, measurement of pressure, temperature, displacement, flow, angular velocity, digital transducers, smart sensors." },
            5: { title: "Digital Instrumentation", desc: "A/D converters, measurement of voltage/current/frequency, D/A converters, Digital Storage Oscilloscope (DSO), Data Loggers, basics of PLC programming, Virtual Instrumentation." }
        },
        cos: {
            CO1: "Understand measurement errors and evaluate measurement data statistically.",
            CO2: "Comprehend the working principles of various electrical measuring instruments.",
            CO3: "Analyze and balance various AC/DC bridge circuits.",
            CO4: "Select and apply appropriate transducers for non-electrical parameter measurements.",
            CO5: "Utilize digital instrumentation and virtual instrumentation tools."
        },
        topics: {
            presentation: [
                "Static vs Dynamic Characteristics of Instruments",
                "Error Analysis in Measurements",
                "Working of Dynamometer Type Wattmeter",
                "Current Transformers (CT) and Potential Transformers (PT)",
                "Anderson and Schering Bridges",
                "Linear Variable Differential Transformer (LVDT)",
                "Piezoelectric Transducers and Applications",
                "Digital Storage Oscilloscope (DSO) Operations",
                "Introduction to Virtual Instrumentation (LabVIEW)",
                "Smart Sensors in Modern Industry"
            ],
            miniproject: [
                "Digital Multimeter Simulation App",
                "Wheatstone Bridge Balance Calculator",
                "Temperature Measurement System using LM35",
                "Distance Measurement using Ultrasonic Sensor",
                "Simple PLC Logic Simulator"
            ]
        }
    },

    "EE3404": {
        name: "Microprocessor and Microcontroller",
        semester: 4,
        objective: "To study the architecture, addressing modes, and instruction sets of 8085 and 8051, develop assembly language programming skills, and introduce peripheral interfacing ICs.",
        units: {
            1: { title: "Introduction to 8085 Architecture", desc: "Block diagram of 8085 microprocessor, memory interfacing, I/O ports, data transfer concepts, timing diagrams, interrupt structure." },
            2: { title: "8085 Instruction Set and Programming", desc: "Instruction formats, addressing modes, assembly language format, data transfer, arithmetic, control instructions. Loop structures, look-up tables, subroutines, stacks." },
            3: { title: "Interfacing Basics and ICs", desc: "Architecture and programming of interfacing ICs: 8255 PPI, 8259 PIC, 8251 USART, 8279 Keyboard display controller, 8254 Timer/Counter. Interfacing with A/D and D/A converters." },
            4: { title: "Introduction to 8051 Microcontroller", desc: "Block diagram of 8051, instruction format, addressing modes, interrupt structure, timers, I/O ports, serial communication. Keyboard/display interfacing, IDE usage." },
            5: { title: "Introduction to RISC Based Architecture", desc: "RISC architecture basics, PIC16/18 microcontrollers, memory organization, addressing modes, instruction sets, timers, I/O ports, interrupt programming." }
        },
        cos: {
            CO1: "Understand the architecture and interrupt structure of the 8085 microprocessor.",
            CO2: "Write and analyze assembly language programs for the 8085 microprocessor.",
            CO3: "Design interfacing circuits using peripheral ICs with the 8085.",
            CO4: "Understand the architecture and program the 8051 microcontroller.",
            CO5: "Gain knowledge on basic RISC architectures like the PIC microcontroller."
        },
        topics: {
            presentation: [
                "8085 Microprocessor Architecture and Pin Diagram",
                "Timing Diagrams for 8085 Instructions",
                "Interrupt Structure of 8085",
                "8255 Programmable Peripheral Interface Modes",
                "Serial Communication using 8251 USART",
                "8051 Timer/Counter Operations",
                "A/D Converter Interfacing with 8255",
                "CISC vs RISC Architectures",
                "PIC Microcontroller Memory Organization",
                "Stepper Motor Control Sequence using 8051"
            ],
            miniproject: [
                "8085 Instruction Simulator",
                "Traffic Light Controller using 8051",
                "Simple Calculator using 8085 Assembly",
                "DAC Interfacing for Waveform Generation",
                "LCD Display Interfacing with Microcontroller"
            ]
        }
    },

    "EE3405": {
        name: "Electrical Machines – II",
        semester: 4,
        objective: "To impart knowledge on the construction, operating principles, performance characteristics, and control methods of synchronous machines and induction motors.",
        units: {
            1: { title: "Synchronous Generator", desc: "Construction, EMF equation, armature reaction, phasor diagrams (non-salient), synchronizing/parallel operation, voltage regulation (EMF, MMF, ZPF, ASA), two-reaction theory, capability curves." },
            2: { title: "Synchronous Motor", desc: "Principle of operation, torque equation, infinite bus bars operation, V and inverted V curves, starting methods, hunting, synchronous condensers." },
            3: { title: "Three-Phase Induction Motor", desc: "Construction, principle of operation, slip, cogging and crawling, equivalent circuits, torque-slip characteristics, circle diagrams, double cage motors, induction generators." },
            4: { title: "Starting and Speed Control of Three-Phase Induction Motor", desc: "Starters (DOL, rotor resistance, autotransformer, star-delta). Speed control (voltage, frequency, pole changing, cascaded, V/f). Slip power recovery, braking methods." },
            5: { title: "Single-Phase Induction Motors and Special Machines", desc: "Single-phase induction motor construction, double field revolving theory, equivalent circuit, starting methods (capacitor, shaded pole, repulsion). Servo, stepper motors, magnetic levitation." }
        },
        cos: {
            CO1: "Analyze the performance characteristics of synchronous generators and compute voltage regulation.",
            CO2: "Understand the operation and draw the performance curves of synchronous motors.",
            CO3: "Evaluate the equivalent circuit parameters and performance of three-phase induction motors.",
            CO4: "Analyze different starting, speed control, and braking methods for three-phase induction motors.",
            CO5: "Understand the operation of single-phase induction motors and special electrical machines."
        },
        topics: {
            presentation: [
                "Voltage Regulation Methods of Alternator (ZPF vs MMF)",
                "Parallel Operation of Synchronous Generators",
                "V and Inverted V Curves of Synchronous Motor",
                "Hunting in Synchronous Machines and Damper Windings",
                "Torque-Slip Characteristics of 3-Phase Induction Motor",
                "Cogging and Crawling in Induction Motors",
                "Circle Diagram of Induction Motor",
                "V/f Speed Control Technique",
                "Double Field Revolving Theory in Single Phase Motors",
                "Applications of Stepper and Servo Motors"
            ],
            miniproject: [
                "Alternator Voltage Regulation Calculator",
                "V-Curve Simulation for Synchronous Motor",
                "Induction Motor Equivalent Circuit Solver",
                "V/f Control Logic Simulator",
                "Stepper Motor Sequence Visualizer"
            ]
        }
    },

    /* ══════════════════════════════════════════════════════════════════
     *  SEMESTER  6  —  BATCH 2027  (R2021)
     * ══════════════════════════════════════════════════════════════════ */

    "EE3601": {
        name: "Protection and Switchgear",
        semester: 6,
        objective: "To impart knowledge on various protective schemes, relay operating principles, power system faults, static/numerical relays, and circuit breaker functionalities.",
        units: {
            1: { title: "Protection Schemes", desc: "Significance of protective schemes, nature/causes of faults, zones of protection, essential qualities of protection, protection scheme types, power system grounding." },
            2: { title: "Basics of Relays", desc: "Operating principles of relays, universal torque equation, R-X diagrams, electromagnetic relays (overcurrent, directional, distance, differential, negative sequence, under-frequency)." },
            3: { title: "Overview of Equipment Protection", desc: "Current and potential transformers for protection. Protection of transformers, generators, motors, bus bars, and transmission lines." },
            4: { title: "Static Relays and Numerical Protection", desc: "Static relays, phase and amplitude comparators, block diagram of numerical relays, application in overcurrent, transformer differential, and distance protection." },
            5: { title: "Circuit Breakers", desc: "Arcing phenomena, arc interruption (DC and AC), re-striking/recovery voltage, current chopping, resistance switching. Circuit breakers (air blast, oil, SF6, vacuum), HVDC breakers." }
        },
        cos: {
            CO1: "Analyze the causes of faults and the necessity of different protection schemes.",
            CO2: "Understand the operating principles and characteristics of various electromagnetic relays.",
            CO3: "Apply suitable protection schemes for different power system apparatus/equipment.",
            CO4: "Evaluate the architecture and operation of static and numerical relays.",
            CO5: "Understand the physics of arc interruption and select appropriate circuit breakers."
        },
        topics: {
            presentation: [
                "Zones of Protection and Primary/Backup Relaying",
                "Methods of Power System Grounding",
                "Universal Torque Equation of Relays",
                "Distance Protection of Transmission Lines",
                "Differential Protection associated with Transformers",
                "Advantages of Numerical Relays over Electromagnetic Relays",
                "Current Chopping Phenomenon in Circuit Breakers",
                "SF6 Circuit Breaker Principle and Advantages",
                "Vacuum Circuit Breaker Operation",
                "HVDC Circuit Breaking Challenges"
            ],
            miniproject: [
                "Relay Coordination Time Calculator",
                "Fault Current Level Estimation Script",
                "Transformer Differential Protection Simulator",
                "Arc Interruption Voltage Graph Plotter",
                "Circuit Breaker Selection Tool based on MVA Rating"
            ]
        }
    },

    "EE3602": {
        name: "Power System Operation and Control",
        semester: 6,
        objective: "To impart knowledge on power-frequency interaction, reactive power-voltage interaction, generation scheduling, economic operation of power systems, and SCADA applications.",
        units: {
            1: { title: "Introduction to Power System Operation", desc: "Necessity of voltage/frequency regulation, load variation, load curves, load forecasting computational methods, load shedding, islanding, deregulation, energy tariffs." },
            2: { title: "Real Power - Frequency Control", desc: "Real power vs frequency control loops, ALFC, speed governing systems, load frequency control of single and two-area systems, static/dynamic analysis, tie-line bias control." },
            3: { title: "Reactive Power - Voltage Control", desc: "Reactive power vs voltage control loops, exciter types, AVR models, static/dynamic analysis of AVR, generation/absorption of reactive power, compensators (STATCOM)." },
            4: { title: "Economic Operation of Power Systems", desc: "Generation scheduling, incremental cost curve, economic dispatch problem without/with losses, exact coordination equation, Unit Commitment problem methods." },
            5: { title: "Computer Control of Power Systems", desc: "Energy control centers, PMU system monitoring, SCADA and EMS functions, state estimation, measurements/errors, WLS estimation, security analysis, state transition diagrams." }
        },
        cos: {
            CO1: "Analyze load curves and understand the basics of load forecasting and power tariffs.",
            CO2: "Model and analyze load frequency control (ALFC) in single and multi-area systems.",
            CO3: "Model and analyze automatic voltage regulators (AVR) and voltage control methods.",
            CO4: "Formulate and solve economic dispatch and unit commitment problems.",
            CO5: "Understand SCADA, Energy Management Systems, and power system state estimation."
        },
        topics: {
            presentation: [
                "Load Curve Analysis and Load Factoring",
                "Spinning Reserve and Load Shedding",
                "Automatic Load Frequency Control (ALFC) Block Diagram",
                "Tie-Line Bias Control in Interconnected Systems",
                "Automatic Voltage Regulator (AVR) Dynamics",
                "Methods of Reactive Power Compensation",
                "Economic Dispatch vs Unit Commitment",
                "Incremental Fuel Cost Optimization",
                "SCADA Architecture in Power Systems",
                "Phasor Measurement Units (PMU) in Grid Monitoring"
            ],
            miniproject: [
                "Load Factor and Diversity Factor Calculator",
                "Single Area ALFC Simulation Script",
                "Economic Dispatch Lambda Iteration Solver",
                "Unit Commitment Priority List Generator",
                "Simple SCADA Dashboard UI Mockup"
            ]
        }
    }
};

/* ══════════════════════════════════════════════════════════════════════
 *  EEE_LABS — Lab experiments per semester
 * ══════════════════════════════════════════════════════════════════════ */
const EEE_LABS = {
    /* Semester 2 Labs (Batch 2029 - R2025) */
    2: [
        {
            code: "ME25C01", name: "Engineering Drawing (Practical)", experiments: [
                "Virtual Demonstration of Conics and Cycloids",
                "Development of models of various solids and virtual demonstration of sectioning",
                "CAD modelling of 2D objects",
                "Conversion of 3D into 2D orthographic views",
                "CAD modelling of 3D objects",
                "Virtual demonstration of perspective views"
            ]
        },
        {
            code: "CS25C04", name: "Data Structures and Algorithms (Practical)", experiments: [
                "Implement simple ADTs as Python classes",
                "List ADT using Python arrays, Linked list",
                "Stack and Queue ADTs and Applications",
                "Tree representation and traversal algorithms, Binary Search Trees, Heaps",
                "Graph representation and Traversal algorithms",
                "Single source shortest path algorithm",
                "Minimum spanning tree algorithms",
                "Implement recursive algorithms in Python",
                "Sorting and searching algorithms",
                "Hash tables implementation"
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
