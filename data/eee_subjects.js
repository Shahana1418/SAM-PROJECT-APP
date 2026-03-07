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
