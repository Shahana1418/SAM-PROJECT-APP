/**
 * CVE_SUBJECTS — Syllabus details for Civil Engineering core subjects
 * Format: 
 *   code: { name, semester, objective, units: { 1: {title, desc}, ... }, cos: { CO1: ... }, topics: { presentation: [], miniproject: [] } }
 */

const CVE_SUBJECTS = {

    /* ══════════════════════════════════════════════════════════════════
     *  SEMESTER  2  —  BATCH 2029  (R2025)
     * ══════════════════════════════════════════════════════════════════ */

    "MA25C02": {
        name: "Linear Algebra",
        semester: 2,
        objective: "To understand the fundamental concepts of linear algebra, vector spaces, and linear transformations, and apply them to civil engineering problems involving systems of equations and structural matrices.",
        units: {
            1: { title: "Matrices and Systems of Linear Equations", desc: "Rank of a Matrix, Consistency of linear systems, LU Decomposition, Echelon form, Applications to structural networks." },
            2: { title: "Vector Spaces", desc: "Subspaces, Linear combination, Span, Linear independence, Basis and dimension of vector spaces." },
            3: { title: "Linear Transformations", desc: "Linear mapping, Kernel and image, Rank-Nullity theorem, Matrix representation of a linear transformation." },
            4: { title: "Inner Product Spaces", desc: "Inner products, Norm, Orthogonality, Gram-Schmidt orthogonalization process, Least square approximations." },
            5: { title: "Eigenvalues and Eigenvectors", desc: "Characteristic equation, Diagonalization of matrices, Cayley-Hamilton theorem, Applications to dynamic structural problems." }
        },
        cos: {
            CO1: "Solve systems of linear equations using matrix operations.",
            CO2: "Analyze vector spaces and find basis and dimensions.",
            CO3: "Understand and apply linear transformations through matrix representation.",
            CO4: "Perform orthogonalization and solve least square problems.",
            CO5: "Calculate eigenvalues and eigenvectors for engineering applications."
        },
        topics: {
            presentation: [
                "Matrix Applications in Structural Analysis",
                "LU Decomposition for Solving Linear Systems",
                "Concept of Basis and Dimension in Vector Spaces",
                "Linear Independence and its Engineering Significance",
                "Rank-Nullity Theorem Explained",
                "Matrix Representation of Linear Transformations",
                "Gram-Schmidt Orthogonalization Process",
                "Least Square Approximations in Surveying",
                "Eigenvalues in Determining Structural Frequency",
                "Diagonalization of Matrices",
                "Cayley-Hamilton Theorem and its Uses",
                "Symmetric Matrices and Quadratic Forms",
                "Orthogonal Matrices in 3D Transformations",
                "Vector Deflection in Beam Analysis",
                "The Role of Linear Algebra in Civil Engineering Software"
            ],
            miniproject: [
                "Matrix Solver Tool for 3-Variable Equations",
                "LU Decomposition Calculator using JavaScript",
                "Simple 2D Transformation Visualizer",
                "Vector Addition and Subtraction Graphic Tool",
                "Least Squares Regression Plotter for Survey Data",
                "Eigenvalue Calculator for 2x2 Matrices",
                "Structural Truss Matrix Generator Program",
                "Determinant and Inverse Matrix Calculator",
                "Orthogonalization Step-by-Step Teaching App",
                "Beam Deflection Equation Solver Interface",
                "Conic Section Classifier using Matrices",
                "Linear Combination Visualizer",
                "Rank Nullity Verification Tool",
                "Linear Transformation Animation Script",
                "Quadratic Form to Canonical Form Converter"
            ]
        }
    },

    "ME25C02": {
        name: "Engineering Mechanics",
        semester: 2,
        objective: "To impart the fundamental concepts of statics related to forces acting on particles and rigid bodies, and develop the ability to apply equilibrium equations.",
        units: {
            1: { title: "Statics of Particles", desc: "Resultant of forces in a plane, Equilibrium of a particle in a plane, Addition of concurrent forces in space, Equilibrium of a particle in space." },
            2: { title: "Statics of Rigid Bodies", desc: "Free Body Diagram, Equivalent systems of forces, Transmissibility, Moment of a force, Couples, Equilibrium of rigid bodies in 2D and 3D." },
            3: { title: "Properties of Surfaces and Solids", desc: "Centroids of composite areas and lines, Theorems of Pappus-Guldinus, Center of gravity of 3D bodies." },
            4: { title: "Moments of Inertia", desc: "Second moment of area, Parallel axis theorem, Polar moments of inertia, Radius of gyration, Mass moments of inertia of thin plates." },
            5: { title: "Friction", desc: "Laws of friction, Coefficients of friction, Angles of friction, Wedges, Ladder friction, Belt friction." }
        },
        cos: {
            CO1: "Formulate and solve equilibrium equations for particles.",
            CO2: "Draw Free Body Diagrams and calculate equilibrium of rigid bodies.",
            CO3: "Determine centroids and center of gravity for various shapes.",
            CO4: "Compute moment of inertia and radius of gyration.",
            CO5: "Analyze and evaluate friction in mechanical and structural systems."
        },
        topics: {
            presentation: [
                "Resolution and Resultant of Concurrent Forces",
                "Importance of Free Body Diagrams in Civil Engineering",
                "Varignon’s Theorem and Moment of a Force",
                "Equilibrium of Rigid Bodies in 2D Space",
                "Centroid vs. Center of Gravity",
                "Theorems of Pappus-Guldinus and Volume Generation",
                "Parallel Axis Theorem for Moment of Inertia",
                "Polar Moment of Inertia for Circular Shafts",
                "Laws of Dry Friction (Coulomb Friction)",
                "Ladder Friction Analysis",
                "Wedge Friction and its Applications",
                "Belt Friction in Power Transmission",
                "Analyzing Support Reactions for Beams",
                "Equilibrium in 3D Space",
                "Radius of Gyration and Structural Columns"
            ],
            miniproject: [
                "Force Vector Resultant Calculator",
                "Interactive Free Body Diagram Drawer",
                "Centroid Calculator for Basic Geometric Shapes",
                "Moment of Inertia Calculator for I-Beams and T-Beams",
                "Friction Force Simulator on an Inclined Plane",
                "Ladder Friction Stability Analyzer Program",
                "Wedge Force Multiplier Calculator",
                "Belt Tension Formula App",
                "Beam Reaction Calculator for Point Loads",
                "Virtual Truss Joint Analyzer",
                "Pappus-Guldinus Volume Estimator Tool",
                "Static Equilibrium Checker Applet",
                "Radius of Gyration Calculator for Columns",
                "Force Polygon Generator",
                "Coefficient of Friction Testing Simulation"
            ]
        }
    },

    "PH25C02": {
        name: "Applied Physics (CE) – II",
        semester: 2,
        objective: "To impart fundamental knowledge of thermal physics, acoustics, new engineering materials, and NDT techniques applicable to Civil Engineering.",
        units: {
            1: { title: "Thermal Performance of Buildings", desc: "Heat transfer mechanisms, Thermal conductivity, Factors affecting thermal performance, U-value, Thermal insulation materials." },
            2: { title: "Acoustics of Buildings", desc: "Characteristics of sound, Reverberation and reverberation time, Sabine's formula, Sound absorption coefficient, Acoustics of auditoriums." },
            3: { title: "Lighting and Illumination", desc: "Principles of lighting, Luminous flux, Illuminance, Natural and artificial lighting, Glare and architectural lighting design." },
            4: { title: "New Engineering Materials", desc: "Composites, Fiber reinforced plastics, Shape memory alloys, Metallic glasses, Applications in modern construction." },
            5: { title: "Non-Destructive Testing", desc: "Principles of NDT, Liquid penetrant test, Ultrasonic flaw detector, X-ray radiography, Acoustic emission in concrete testing." }
        },
        cos: {
            CO1: "Analyze thermal performance and select appropriate insulation.",
            CO2: "Apply acoustic principles to design structurally sound auditoriums.",
            CO3: "Calculate lighting requirements for architectural spaces.",
            CO4: "Understand the properties of advanced composite materials.",
            CO5: "Employ NDT methods to evaluate structural health."
        },
        topics: {
            presentation: [
                "Thermal Conductivity of Building Materials",
                "U-Value and Energy Efficient Building Design",
                "Sabine's Formula and Reverberation Control",
                "Acoustic Design Principles for Concert Halls",
                "Natural vs Artificial Illumination Techniques",
                "Measurement of Luminous Intensity and Lux",
                "Fiber Reinforced Plastics in Construction",
                "Shape Memory Alloys in Smart Structures",
                "Metallic Glasses and their Properties",
                "Ultrasonic Testing of Concrete Quality",
                "Liquid Penetrant Testing for Micro-Cracks",
                "X-Ray Radiography in Weld Inspection",
                "Acoustic Emission Technique for Structural Monitoring",
                "Heat Transfer through Building Envelopes",
                "Sound Absorbing Materials and their Coefficients"
            ],
            miniproject: [
                "Building U-Value Estimator Calculator",
                "Reverberation Time (Sabine) Calculator App",
                "Room Illuminance Level Recommender Program",
                "Thermal Conductivity Comparison Database",
                "Sound Absorption Coefficient Lookup Tool",
                "Virtual Liquid Penetrant Testing Simulation",
                "Ultrasonic Pulse Velocity Graph Plotter",
                "Composite Material Strength Estimator",
                "Energy Saving Calculator based on Insulation",
                "Smart Window Heat Transmission Model",
                "Acoustics Material Selector for Auditoriums",
                "Lighting Glare Rating Estimator",
                "NDT Method Decision Tree Software",
                "Shape Memory Alloy Deflection Simulator",
                "Building Heat Loss Chart Generator"
            ]
        }
    },

    "EE25C01": {
        name: "Basic Electrical and Electronics Engineering",
        semester: 2,
        objective: "To introduce the basics of electrical circuits, electrical machines, measuring instruments, and electronics for civil engineering applications.",
        units: {
            1: { title: "Electrical Circuits", desc: "Ohm's Law, Kirchhoff's Laws, DC Circuits, AC Fundamentals, Single-phase and Three-phase circuits, Power and Power factor." },
            2: { title: "Electrical Machines", desc: "Operating principle and characteristics of DC Motors, AC Single-phase and Three-phase induction motors, Transformers." },
            3: { title: "Measurements and Instrumentation", desc: "Moving coil and Moving iron instruments, Dynamometer type Wattmeter, Energy meter, Megger, Earth tester." },
            4: { title: "Analog and Digital Electronics", desc: "PN Junction diode, Zener diode, BJT, Half-wave and Full-wave rectifiers, Logic gates, Boolean algebra." },
            5: { title: "Electrical Wiring and Safety", desc: "Types of wiring, Grounding, Earthing systems, Fuses, Circuit breakers (MCB, ELCB), Electrical safety precautions in construction." }
        },
        cos: {
            CO1: "Solve basic DC and AC electrical circuits.",
            CO2: "Understand the working of electrical machinery used in construction.",
            CO3: "Utilize measuring instruments for electrical surveying.",
            CO4: "Comprehend the function of basic electronic devices.",
            CO5: "Apply electrical safety and wiring standards in site works."
        },
        topics: {
            presentation: [
                "Kirchhoff’s Current and Voltage Laws",
                "Power Factor Correction in Industrial Sites",
                "Working Principle of a Single-Phase Transformer",
                "DC vs AC Motors in Construction Equipment",
                "Three-Phase AC Induction Motors",
                "Principle of Moving Coil Instruments",
                "Earth Resistance Testing using Earth Tester",
                "Logic Gates and their Truth Tables",
                "PN Junction Diodes and Rectification",
                "Different Types of Electrical Wiring Systems",
                "Importance of Earthing in Buildings",
                "Miniature Circuit Breakers (MCB) vs Fuses",
                "Earth Leakage Circuit Breakers (ELCB)",
                "Working Mechanism of an Energy Meter",
                "Electrical Safety Standards at Construction Sites"
            ],
            miniproject: [
                "Ohm's Law and Circuit Resistance Calculator",
                "Logic Gate Simulator and Truth Table Generator",
                "Power Factor and Active/Reactive Power Calculator",
                "Transformer Turns Ratio Estimator",
                "Simple AC Motor RPM Calculator",
                "House Wiring Layout Drawer Tool",
                "Energy Bill Estimation App based on Load",
                "Virtual MCB and Fuse Trigger Simulator",
                "Half-Wave Rectifier Graph Visualizer",
                "Boolean Algebra Expression Simplifier",
                "Resistor Color Code Identifier Program",
                "Earthing Resistance Rule Check Program",
                "Three-Phase Current to Power Converter",
                "Building Electrical Load Estimator",
                "Virtual Multimeter Interface App"
            ]
        }
    },

    "CY25C02": {
        name: "Applied Chemistry (CE) – II",
        semester: 2,
        objective: "To study chemical properties of building materials, composites, and sustainable materials, and learn analytical methods for material testing.",
        units: {
            1: { title: "Building Materials", desc: "Chemistry of Bricks, Glass manufacturing, Cement composition and hydration, Special cements, Concrete chemistry, Steel reinforcement." },
            2: { title: "Composites", desc: "Types of composites, Matrix materials, Polymer Matrix (PMC), Metal Matrix (MMC), Ceramic Matrix (CMC), Civil engineering applications." },
            3: { title: "Adhesives and Protective Coatings", desc: "Synthetic adhesives, Paints, Constituents of paints, Varnishes, Enamels, Corrosion protection, Metallic coatings." },
            4: { title: "Sustainable Materials", desc: "Bio-based materials, Chemical admixtures, Environmental aspects of construction materials, Calculation of carbon footprint." },
            5: { title: "Analytical Methods", desc: "Thermal conductivity analysis, Porosity and absorption tests, Emission characteristics of building materials, Spectroscopic techniques." }
        },
        cos: {
            CO1: "Explain the chemical composition and setting of cement and concrete.",
            CO2: "Evaluate different composite matrices for structural applications.",
            CO3: "Select appropriate protective coatings against corrosion.",
            CO4: "Assess sustainable materials and their carbon footprint.",
            CO5: "Apply analytical chemistry methods for testing building materials."
        },
        topics: {
            presentation: [
                "Hydration Process and Chemistry of Portland Cement",
                "Manufacturing and Chemical Properties of Glass",
                "Polymer Matrix Composites in Structural Rehabilitation",
                "Types and Ingredients of Building Paints",
                "Chemical Action of Rusting and Corrosion of Steel",
                "Galvanization and Metallic Coatings for Reinforcement",
                "Bio-based Construction Materials and Sustainability",
                "Carbon Footprint Calculation for Concrete Production",
                "Chemical Admixtures: Plasticizers and Retarders",
                "Chemistry of Refractory Bricks",
                "Ceramic Matrix Composites",
                "Epoxy Resins and Structural Adhesives",
                "Porosity Testing of Concrete Materials",
                "Spectroscopy for Material Characterization",
                "Role of Fly Ash in Blended Cements"
            ],
            miniproject: [
                "Carbon Footprint Calculator for Concrete Mixes",
                "Cement Hydration Heat Estimator Graph",
                "Paint constituent Database and Selector",
                "Corrosion Rate Predictor based on pH levels",
                "Composite Material Weight/Strength Comparison Tool",
                "Virtual Spectrometer Material Identifier",
                "Building Material Toxicity/Emission Checker",
                "Chemical Admixture Dosage Calculator",
                "Glass Transmittance and Reflectance Simulator",
                "Interactive Rust Formation Visualizer",
                "Brick Water Absorption Percentage Calculator",
                "Green Material Scoring App for Buildings",
                "Epoxy Cure Time Estimator based on Temperature",
                "Galvanization Zinc Coating Thickness Analyzer",
                "Porosity vs Compressive Strength Plotter"
            ]
        }
    },

    "CE25201": {
        name: "Construction Materials and Technology",
        semester: 2,
        objective: "To introduce traditional and modern building materials, their properties, masonry construction methods, formwork, plastering, and joints.",
        units: {
            1: { title: "Stones, Bricks and Concrete Blocks", desc: "Stones as building material, Preservation of stonework, Clay bricks manufacturing, Tests for compressive strength and water absorption, Concrete blocks." },
            2: { title: "Lime, Cement, Aggregates and Mortar", desc: "Types of lime, Cement manufacturing process, Hydration of cement, Fine and coarse aggregates, Gradation, Mortar proportions." },
            3: { title: "Timber, Metals and Other Materials", desc: "Types of timber, Plywood, Steel and Aluminum properties, Paints, Varnishes, Sealants, Insulating materials, Damp-proofing materials." },
            4: { title: "Construction Technology and Masonry", desc: "Brick and stone masonry, Types of bonds, Cavity walls, Diaphragm walls, Composite masonry." },
            5: { title: "Construction Practices", desc: "Formwork (centering and shuttering), Scaffolding, Shoring, Underpinning, Plastering, Pointing, Construction expansion joints." }
        },
        cos: {
            CO1: "Identify and test quality stones, bricks, and blocks.",
            CO2: "Understand the properties and mix ratios of cement and mortar.",
            CO3: "Select appropriate timber, metals, and finishes for buildings.",
            CO4: "Supervise masonry works and implement correct bonding patterns.",
            CO5: "Plan and execute formwork, scaffolding, and plastering."
        },
        topics: {
            presentation: [
                "Tests on Building Bricks: Compressive Strength and Water Absorption",
                "Manufacturing Process of Portland Cement",
                "Grading of Coarse and Fine Aggregates",
                "Types of Mortar and Their Specific Uses",
                "Seasoning and Preservation of Timber",
                "Aluminum vs Steel as a Modern Building Material",
                "English Bond vs Flemish Bond in Brick Masonry",
                "Rubble and Ashlar Stone Masonry Differences",
                "Design and Components of Scaffolding",
                "Shoring and Underpinning Techniques for Repairs",
                "Formwork for Columns and Slabs",
                "Types of Construction Joints in Concrete",
                "Plastering Techniques and Defects",
                "Damp Proof Courses (DPC) in Foundations",
                "Thermal and Acoustic Insulation Materials"
            ],
            miniproject: [
                "Brick Quantity and Mortar Calculator for a Wall",
                "Aggregate Sieve Analysis Graph Generator",
                "Brick Bond Pattern Visualizer 2D",
                "Formwork Area Estimator for Concrete Columns",
                "Building Material Cost Estimation Spreadsheet",
                "Timber Seasoning Time and Moisture Calculator",
                "Scaffolding load capacity estimator",
                "Plastering Area and Cement Bag Calculator",
                "Wall Dampness Risk Predictor App",
                "Concrete Block vs Brick Weight/Cost Comparator",
                "Virtual Slump Test Simulator",
                "Expansion Joint Spacer Calculator",
                "Mortar Mix Ratio Guide Database",
                "Construction Material Library App",
                "Stone Masonry Type Classifier Game"
            ]
        }
    },

    /* ══════════════════════════════════════════════════════════════════
     *  SEMESTER  4  —  BATCH 2028  (R2021)
     * ══════════════════════════════════════════════════════════════════ */

    "CE3401": {
        name: "Applied Hydraulics Engineering",
        semester: 4,
        objective: "To impart basic knowledge about open channel flows, including uniform flow, gradually varied flow, and rapidly varied flow, and to analyze hydraulic machinery.",
        units: {
            1: { title: "Uniform Flow", desc: "Definition of open channel flow, Sub-critical and Super-critical flow, Velocity distribution, Chezy's and Manning's equations, Best hydraulic sections, Specific energy." },
            2: { title: "Varied Flows", desc: "Dynamic equations of gradually varied flow, Water surface profiles, Direct step method, Standard step method, Change in Grades." },
            3: { title: "Rapidly Varied Flows", desc: "Momentum equation for RVF, Hydraulic jumps, Energy dissipation, Positive and Negative surges." },
            4: { title: "Turbines", desc: "Impact of Jets, Classification of turbines, Pelton wheel, Francis turbine, Kaplan turbine, Draft tube, Cavitation, Specific speed." },
            5: { title: "Pumps", desc: "Centrifugal pumps, Minimum speed, NPSH, Characteristic curves, Multistage pumps, Reciprocating pumps, Indicator diagrams, Air vessels." }
        },
        cos: {
            CO1: "Analyze uniform flow in open channels and design economical sections.",
            CO2: "Compute water surface profiles in gradually varied channels.",
            CO3: "Evaluate energy dissipation across hydraulic jumps.",
            CO4: "Analyze the performance of impulse and reaction turbines.",
            CO5: "Understand the working and characteristics of centrifugal and reciprocating pumps."
        },
        topics: {
            presentation: [
                "Differences between Pipe Flow and Open Channel Flow",
                "Specific Energy Curve and Critical Depth",
                "Most Economical Rectangular and Trapezoidal Channel Sections",
                "Manning's and Chezy's Formulae Applications",
                "Classification of Water Surface Profiles in GVF",
                "Direct Step Method for Profile Length Calculation",
                "Types and Uses of the Hydraulic Jump",
                "Energy Dissipation Basins at Spillways",
                "Working Principle of the Pelton Wheel Turbine",
                "Francis Turbine vs Kaplan Turbine",
                "Cavitation in Turbines and Pumps",
                "Specific Speed of Hydraulic Machines",
                "Working Principle of Centrifugal Pumps",
                "Net Positive Suction Head (NPSH) Significance",
                "Role of Air Vessels in Reciprocating Pumps"
            ],
            miniproject: [
                "Manning's Equation Flow Calculator Tool",
                "Specific Energy Curve Plotter based on Flow Rate",
                "Most Economical Channel Section Dimension Calculator",
                "Hydraulic Jump Sequent Depth Calculator",
                "Froude Number Analyzer for Flow Classification",
                "Direct Step Method Iteration Spreadsheet",
                "Pelton Wheel Power and Efficiency Calculator",
                "Pump NPSH and Cavitation Checker App",
                "Centrifugal Pump Characteristic Curve Generator",
                "Turbine Specific Speed Classifier",
                "Open Channel Velocity Profile Visualizer",
                "Surge Wave Height Estimator",
                "Piping System Friction Loss Calculator",
                "Draft Tube Efficiency Tool",
                "Interactive Reciprocating Pump Indicator Diagram"
            ]
        }
    },

    "CE3402": {
        name: "Strength of Materials",
        semester: 4,
        objective: "To learn the concepts of simple, compound, and principal stresses, and to analyze bending and shear in determinate and indeterminate beams.",
        units: {
            1: { title: "Simple and Compound Stresses", desc: "Thermal stresses, Elastic constants, Thin cylindrical shells, Biaxial state of stress, Principal stresses, Mohr's circle, Torsion on circular shafts." },
            2: { title: "Bending of Beams", desc: "Types of beams, Shear force and bending moment diagrams, Theory of simple bending, Bending and shear stress distribution." },
            3: { title: "Deflection of Beams", desc: "Double Integration method, Macaulay's method, Area moment method, Conjugate beam method, Strain energy method." },
            4: { title: "Indeterminate Beams", desc: "Propped Cantilever, Fixed Beams, Continuous beams, Theorem of three moments, SFD and BMD for indeterminate beams." },
            5: { title: "Advanced Topics", desc: "Unsymmetrical bending, Shear center, Thick cylinders, Theories of failure (Principal stress, Principal strain, Shear stress, Strain energy)." }
        },
        cos: {
            CO1: "Evaluate main stresses, strains, and Mohr’s circle parameters.",
            CO2: "Draw shear force and bending moment diagrams for determinate beams.",
            CO3: "Calculate slope and deflection using Macaulay's and Moment-Area methods.",
            CO4: "Analyze continuous and fixed beams using the Theorem of Three Moments.",
            CO5: "Apply theories of failure and calculate stresses in thick cylinders."
        },
        topics: {
            presentation: [
                "Hooke's Law and Elastic Constants Relationships",
                "Stresses in Thin vs Thick Cylindrical Shells",
                "Mohr's Circle for Biaxial Stress Analysis",
                "Torsion Equation for Solid and Hollow Shafts",
                "Shear Force and Bending Moment Concepts",
                "Assumptions in the Theory of Simple Bending",
                "Shear Stress Distribution across I-sections",
                "Double Integration vs Macaulay's Method",
                "Conjugate Beam Method for Deflection",
                "Clapeyron's Theorem of Three Moments",
                "Analysis of Propped Cantilever Beams",
                "Concept of Shear Center in Channel Sections",
                "Unsymmetrical Bending in Lame's Equations",
                "Maximum Principal Stress Theory (Rankine's Theory)",
                "Von Mises Strain Energy Failure Theory"
            ],
            miniproject: [
                "Simple Mohr's Circle Plotter Tool",
                "Simply Supported Beam SFD & BMD Generator",
                "Cantilever Beam Deflection Calculator",
                "Torsional Shear Stress Calculator for Shafts",
                "Thin Cylinder Hoop and Longitudinal Stress App",
                "Elastic Constants Conversion Calculator",
                "Theorem of Three Moments Equation Setup Tool",
                "Macaulay's Method Equation Parser",
                "Beam Cross-Section Area Moment of Inertia Calculator",
                "Fixed Beam End Moment Estimator",
                "Failure Theory Comparator Dashboard",
                "Shear Center Locator for C-Channels",
                "Strain Energy Calculator for Axial Loading",
                "Thick Cylinder Lame’s Equation Plotter",
                "Thermal Stress Estimator for Constrained Bars"
            ]
        }
    },

    "CE3403": {
        name: "Concrete Technology",
        semester: 4,
        objective: "To study properties of concrete materials, learn IS method of mix design, understand fresh and hardened properties of concrete, and special concretes.",
        units: {
            1: { title: "Constituent Materials", desc: "Types of Cement, Chemical composition, Tests on cement, Classification of Aggregates, Grading requirements, Quality of water." },
            2: { title: "Chemical and Mineral Admixtures", desc: "Accelerators, Retarders, Plasticizers, Super plasticizers, Fly Ash, Silica Fume, GGBS, Metakaoline." },
            3: { title: "Proportioning of Concrete Mix", desc: "Principles of Mix Proportioning, Design Mix, Nominal Mix, BIS Method of Mix Design." },
            4: { title: "Fresh and Hardened Properties", desc: "Workability (Slump, Compacting factor), Segregation and Bleeding, Compressive and Flexural strength tests, Modulus of elasticity." },
            5: { title: "Special Concretes", desc: "Lightweight concrete, High strength concrete, Fibre reinforced concrete, Ready mix concrete, Shotcrete, Polymer concrete, Self-compacting concrete." }
        },
        cos: {
            CO1: "Test the quality parameters of cement, aggregates, and water.",
            CO2: "Select chemical and mineral admixtures for specific applications.",
            CO3: "Design concrete mixes according to IS 10262 standards.",
            CO4: "Evaluate workability, bleeding, compaction, and compressive strength.",
            CO5: "Identify uses for special concretes like shotcrete, FRC, and SCC."
        },
        topics: {
            presentation: [
                "Bogue's Compounds and Cement Hydration",
                "Tests on Cement: Fineness, Consistency and Soundness",
                "Impact of Aggregate Grading on Concrete Strength",
                "Water Reducing Admixtures: Plasticizers and Superplasticizers",
                "Mineral Admixtures: Fly Ash and Silica Fume",
                "Indian Standard (IS:10262) Method of Concrete Mix Design",
                "Workability of Concrete: Slump and Compaction Factor Tests",
                "Causes and Prevention of Segregation and Bleeding",
                "Non-Destructive Testing of Concrete (Rebound Hammer)",
                "Stress-Strain Curve for Hardened Concrete",
                "Fibre Reinforced Concrete (FRC) Properties",
                "Self-Compacting Concrete (SCC) Advantages",
                "Ready Mix Concrete (RMC) Transport and Quality Control",
                "Shotcrete and its Tunneling Applications",
                "Lightweight Concrete vs High Strength Concrete"
            ],
            miniproject: [
                "IS 10262 Concrete Mix Design Calculator App",
                "Water-Cement Ratio and Strength Predictor Plot",
                "Concrete Slump Class Identifier Tool",
                "Cement Transport & Storage Expiry Tracker",
                "Aggregate Fineness Modulus Calculator",
                "Amount of Admixture Estimator per Cubic Meter",
                "Compression Test Results Data Logger",
                "Target Mean Strength Calculator",
                "Concrete Volume and Material Cost Estimator",
                "Rebound Hammer Test Number to Strength Converter",
                "Bleeding and Segregation Risk Analyzer",
                "Fibre Reinforced Concrete Mix Ratio Guide",
                "Concrete Moisture Evaporation Rate Calculator",
                "Batching Plant Water Addition App",
                "Special Concrete Selector based on application"
            ]
        }
    },

    "CE3404": {
        name: "Soil Mechanics",
        semester: 4,
        objective: "To classify soil based on index properties, understand compaction, permeability, stress distribution, consolidation, shear strength, and slope stability.",
        units: {
            1: { title: "Soil Classification and Compaction", desc: "Phase relationship, Index properties, BIS and Unified classification, Compaction theories, Field and Laboratory tests, Proctor compaction." },
            2: { title: "Effective Stress and Permeability", desc: "Effective stress concepts, Capillary phenomena, Darcy's law, Constant/Falling head tests, Pumping out tests, Flow nets, Seepage calculation." },
            3: { title: "Stress Distribution and Settlement", desc: "Boussinesq theory, Newmark's influence chart, Immediate and consolidation settlement, Terzaghi's one-dimensional consolidation theory." },
            4: { title: "Shear Strength", desc: "Shear strength of cohesive and cohesionless soils, Mohr-Coulomb failure theory, Direct shear test, Triaxial compression, Vane shear test." },
            5: { title: "Slope Stability", desc: "Infinite and finite slopes, Total stress analysis, Friction circle method, Method of slices, Fellenious and Bishop's method, Slope protection." }
        },
        cos: {
            CO1: "Determine index properties and classify soils as per BIS.",
            CO2: "Calculate coefficient of permeability and analyze seepage via flow nets.",
            CO3: "Estimate stress distribution and calculate rate of consolidation settlement.",
            CO4: "Evaluate the shear strength parameters of soil using laboratory tests.",
            CO5: "Analyze the stability of slopes using Bishop's and friction circle methods."
        },
        topics: {
            presentation: [
                "Three-Phase Diagram and Soil Volumetric Relationships",
                "Indian Standard Soil Classification System",
                "Standard vs Modified Proctor Compaction Test",
                "Concept of Effective Stress and Pore Water Pressure",
                "Darcy's Law and Factors Affecting Soil Permeability",
                "Construction and Interpretation of Flow Nets",
                "Boussinesq's Equation for Point Load Stress Distribution",
                "Terzaghi's 1D Consolidation Theory",
                "Mohr-Coulomb Failure Criteria for Soils",
                "Direct Shear Test vs Triaxial Compression Test",
                "Unconfined Compression Test on Clay",
                "Failure Mechanisms in Infinite and Finite Slopes",
                "Swedish Slip Circle (Fellenius) Method",
                "Bishop's Simplified Method of Slices",
                "Methods for Improving Slope Stability"
            ],
            miniproject: [
                "Soil Phase Parameter Calculator (e, n, w, G)",
                "Sieve Analysis Particle Size Distribution Plotter",
                "Soil Classification Identifier (BIS based on input)",
                "Proctor Compaction Curve Plotter (MDD & OMC)",
                "Darcy's Law Permeability Coefficient Calculator",
                "Constant and Falling Head Test Calculator",
                "Vertical Stress Increment Calculator (Boussinesq)",
                "Consolidation Settlement Formula App",
                "Mohr-Coulomb Envelope Plotter",
                "Direct Shear Test Data Analyzer",
                "Factor of Safety Calculator for Infinite Slopes",
                "Flow Net Seepage Quantity Estimator",
                "Capillary Rise Calculator based on Soil Type",
                "Newmark's Chart Influence Value Tool",
                "Method of Slices Calculation Spreadsheet Matrix"
            ]
        }
    },

    "CE3405": {
        name: "Highway and Railway Engineering",
        semester: 4,
        objective: "To overview highway and railway engineering planning, design, geometric parameters, construction, and maintenance as per IRC standards.",
        units: {
            1: { title: "Highway Engineering", desc: "Classification of highways, Alignment factors, Cross-sections of Urban and Rural roads, Engineering surveys." },
            2: { title: "Design of Highway Elements", desc: "Horizontal curves, Super elevation, Transition curves, Sight distances, Vertical curves, Pavement components, Flexible and rigid design (IRC methods)." },
            3: { title: "Highway Construction and Maintenance", desc: "Materials testing (Bitumen, Aggregates), Construction practice of flexible/concrete pavements, Highway drainage, Pavement evaluation." },
            4: { title: "Railway Planning and Construction", desc: "Permanent way elements (Rails, Sleepers, Ballast), Track stress, Creep and coning of wheels, Route alignment, Geometric design of railway, Super elevation." },
            5: { title: "Railway Track Maintenance and Operation", desc: "Points and Crossings, Turnouts, Track circuiting, Maintenance materials, Stations and Yards, Rollings stock, Urban Transport (LRT & MRTS)." }
        },
        cos: {
            CO1: "Plan and align highway projects based on traffic and surveys.",
            CO2: "Design geometric elements and pavement thickness using IRC guidelines.",
            CO3: "Supervise highway construction and identify pavement distresses.",
            CO4: "Design railway geometric parameters like gradients and super elevation.",
            CO5: "Understand railway track junctions, signaling, and MRTS layouts."
        },
        topics: {
            presentation: [
                "Highway Development and Classification in India",
                "Factors Controlling Highway Alignment",
                "Stopping Sight Distance and Overtaking Sight Distance",
                "Design of Super Elevation on Horizontal Curves",
                "Flexible vs Rigid Pavements: Components and Load Transfer",
                "CBR Test and IRC Method of Flexible Pavement Design",
                "Tests on Road Aggregates: Impact, Abrasion and Shape",
                "Penetration and Ductility Tests on Bitumen",
                "Common Defects and Maintenance in Bituminous Roads",
                "Components of a Railway Permanent Way",
                "Coning of Wheels and Creep of Rails",
                "Cant Deficiency and Super Elevation in Railways",
                "Working Principle of Railway Points and Crossings",
                "Railway Signalling and Track Circuiting",
                "Mass Rapid Transit Systems (MRTS) in Urban Areas"
            ],
            miniproject: [
                "Stopping Sight Distance (SSD) Calculator",
                "Overtaking Sight Distance (OSD) Calculator",
                "Highway Super Elevation Design Tool (IRC)",
                "Curve Widening Estimator for Roads",
                "CBR Value thickness interpolation app",
                "Bitumen Test Value Library and Spec Checker",
                "Vertical Curve Length Calculator",
                "Railway Cant (Super Elevation) Calculator",
                "Railway Grade Compensation on Curves Tool",
                "Turnout Layout Dimension Calculator",
                "Equivalent Single Wheel Load (ESWL) App",
                "Pavement Distress Identification Visual Guide",
                "Railway Sleepers Density and Spacing Calculator",
                "Basic Traffic Volume Count Spreadsheet",
                "Cost Estimator per Kilometer of Road Construction"
            ]
        }
    },


    /* ══════════════════════════════════════════════════════════════════
     *  SEMESTER  6  —  BATCH 2027  (R2021)
     * ══════════════════════════════════════════════════════════════════ */

    "CE3601": {
        name: "Design of Steel Structural Elements",
        semester: 6,
        objective: "To apply limit state design to structural steel members, connections, tension & compression members, beams, roof trusses, and plastic analysis.",
        units: {
            1: { title: "Connections", desc: "Limit state design, Properties of steel, Bolted and Welded connections, Types of failure, Prying action, HSFG bolts." },
            2: { title: "Tension and Compression Members", desc: "Design of tension members with bolted/welded connections, Slenderness ratio, Column design, Lacing and Battening, Column bases." },
            3: { title: "Design of Beams", desc: "Laterally supported and unsupported beams, Bending strength, Shear strength, Web buckling, Web crippling, Built-up beams." },
            4: { title: "Industrial Buildings and Roof Trusses", desc: "Loads on roof trusses, Wind load calculation, Design of purlins, Design of gantry girders." },
            5: { title: "Plastic Analysis and Design", desc: "Theory of plastic bending, Shape factor, Plastic hinges, Collapse mechanisms for beams and portal frames, Moment redistribution." }
        },
        cos: {
            CO1: "Design bolted and welded connections for structural joints.",
            CO2: "Design tension members and built-up columns with lacings.",
            CO3: "Evaluate bending and shear capacities of laterally supported/unsupported beams.",
            CO4: "Estimate wind loads and design components of industrial roof trusses.",
            CO5: "Determine the collapse load of steel structures using plastic analysis."
        },
        topics: {
            presentation: [
                "Limit State Design Philosophy in IS 800:2007",
                "Failure Modes of Bolted Connections",
                "High Strength Friction Grip (HSFG) Bolts vs Ordinary Bolts",
                "Design Principles for Fillet and Groove Welds",
                "Shear Lag Effect in Tension Members",
                "Design Rules for Lacing and Battening in Columns",
                "Slab Base vs Gusseted Base for Steel Columns",
                "Web Buckling and Web Crippling in Steel Beams",
                "Design of Laterally Unsupported Steel Beams",
                "Calculation of Wind Loads on Roof Trusses (IS 875)",
                "Design Considerations for Gantry Girders",
                "Concept of Plastic Hinge Formation",
                "Shape Factor and Plastic Section Modulus",
                "Mechanism Method vs Statical Method in Plastic Analysis",
                "Collapse Load Analysis of Portal Frames"
            ],
            miniproject: [
                "Bolted Connection Strength Calculator",
                "Fillet Weld Throat Thickness and Length Analyzer",
                "Tension Member Net Area Calculator",
                "Steel Column Slenderness Ratio Checker",
                "Lacing Spacing and Angle Design Tool",
                "Beam Shear and Web Crippling Quick Check",
                "IS 800 Steel Table Lookup Interface",
                "Wind Load Pressure Calculator (IS 875 Part 3)",
                "Roof Truss Nodal Load Estimator",
                "Gantry Girder Impact Load Calculator",
                "Shape Factor Calculator for I and T Sections",
                "Plastic Moment Capacity Formula App",
                "Simple Beam Collapse Load Calculator",
                "Column Base Plate Dimension Estimator",
                "Beam Deflection Check against IS 800 limits"
            ]
        }
    },

    "CE3602": {
        name: "Structural Analysis II",
        semester: 6,
        objective: "To draw influence lines for determinate and indeterminate structures, and analyze arches, suspension bridges, and frames using approximate methods.",
        units: {
            1: { title: "Influence Lines for Determinate Structures", desc: "Moving loads, ILD for reactions, shear, and moment in beams, Absolute maximum bending moment, ILD for pin-jointed plane frames." },
            2: { title: "Influence Lines for Indeterminate Beams", desc: "Muller-Breslau's principle, ILD for reactions and moments in propped cantilevers, fixed beams, and continuous beams." },
            3: { title: "Arches", desc: "Eddy's theorem, Three-hinged and Two-hinged arches, Fixed arches, Rib shortening, Effects of settlement and temperature." },
            4: { title: "Suspension Bridges and Space Trusses", desc: "Cable analysis, Suspension bridges with three-hinged stiffening girders, Influence lines for stiffening girders, Space trusses (tension coefficients)." },
            5: { title: "Approximate Analysis of Frames", desc: "Substitute frame method for gravity loads, Portal method and Cantilever method for lateral loads, Frame bending moment diagrams." }
        },
        cos: {
            CO1: "Draw influence line diagrams for moving loads on determinate beams.",
            CO2: "Apply Muller-Breslau's principle for indeterminate beams.",
            CO3: "Analyze internal forces, temperature, and settlement effects in arches.",
            CO4: "Analyze cable tensions and stiffening girders in suspension bridges.",
            CO5: "Perform approximate analysis of multi-story frames for wind/seismic loads."
        },
        topics: {
            presentation: [
                "Concept and Uses of Influence Line Diagrams (ILD)",
                "Locating Absolute Maximum Bending Moment under Moving Loads",
                "Muller-Breslau's Principle for Indeterminate Structures",
                "ILD for Continuous Beams",
                "Eddy's Theorem and the Line of Thrust in Arches",
                "Analysis of Three-Hinged Parabolic Arches",
                "Temperature and Settlement Stresses in Two-Hinged Arches",
                "Mechanics of Suspension Cables under UDL",
                "Three-Hinged Stiffening Girders in Suspension Bridges",
                "Method of Tension Coefficients for Space Trusses",
                "Need for Approximate Analysis in Multi-Story Frames",
                "Substitute Frame Method for Gravity Loading",
                "Portal Method Assumptions and Analysis",
                "Cantilever Method for Lateral Wind Loads",
                "Comparison: Portal Method vs Cantilever Method"
            ],
            miniproject: [
                "Moving Single Load ILD Point Calculator",
                "Two Point Loads Max Moment Analyzer",
                "Muller-Breslau Curve Visualizer Sketch tool",
                "Three-Hinged Arch Horizontal Thrust Calculator",
                "Arch Parabola/Circle Equation Generator",
                "Temperature Stress Calculator in Fixed Arches",
                "Suspension Cable Tension Calculator (Sag/Span)",
                "Stiffening Girder Max Moment Locator App",
                "Space Truss Tension Coefficient Setup Matrix",
                "Portal Frame Base Shear Distribution Tool",
                "Cantilever Method Centroidal Axis Finder",
                "Substitute Frame Floor Moment Estimator",
                "ILD Ordinate Value Extraction Spreadsheet",
                "Multi-story Frame Lateral Load Summation Tool",
                "Arch Rib Shortening Deflection Calculator"
            ]
        }
    },

    "AG3601": {
        name: "Engineering Geology",
        semester: 6,
        objective: "To impart knowledge on geomorphology, petrology, structural geology, hydrogeology, geo-prospecting techniques, and natural hazards analysis.",
        units: {
            1: { title: "Physical Geology and Geomorphology", desc: "Internal structure of Earth, Weathering, Fluvial/Marine/Glacial landforms, Plate tectonics, Groundwater aquifers." },
            2: { title: "Mineralogy and Petrology", desc: "Physical properties of minerals, Study of rock-forming minerals, Classification of Igneous, Sedimentary, and Metamorphic rocks, Engineering properties of rocks." },
            3: { title: "Structural Geology and Rock Mechanics", desc: "Strike and Dip, Folds, Faults, Joints, Fractures, Rock Quality Designation (RQD), Rock Mass Rating (RMR), Geological Strength Index (GSI)." },
            4: { title: "Geo-Prospecting", desc: "Reconnaissance surveys, Geophysical methods (Electrical resistivity, Seismic refraction), Core logging, Subsurface investigations." },
            5: { title: "Geological Considerations and Geo-Hazards", desc: "Geology of dam sites, tunnels, road cuttings. Landslides causes and mitigation, Earthquakes, Tsunamis mitigation." }
        },
        cos: {
            CO1: "Understand weathering, earth structure, and landform formation.",
            CO2: "Identify minerals and rocks and evaluate their use in construction.",
            CO3: "Interpret geological structures (folds/faults) and assess rock mass quality.",
            CO4: "Apply geophysical methods for subsurface investigations.",
            CO5: "Evaluate geological site suitability for dams and mitigate geo-hazards."
        },
        topics: {
            presentation: [
                "Relevance of Plate Tectonics to Civil Engineering",
                "Process of Weathering and Soil Formation",
                "Groundwater Aquifers: Unconfined, Confined and Perched",
                "Physical Properties Used for Mineral Identification",
                "Formation and Engineering Properties of Igneous Rocks",
                "Sedimentary Rocks as Building Stones",
                "Geological Strike and Dip Measurement",
                "Types of Faults and their Impact on Foundations",
                "Rock Quality Designation (RQD) and Core Logging",
                "Rock Mass Rating (RMR) System Explained",
                "Electrical Resistivity Method for Groundwater Detection",
                "Seismic Refraction Method for Bedrock Mapping",
                "Geological Site Selection for Dam Construction",
                "Tunneling through Folded and Faulted Strata",
                "Causes and Mitigation Measures for Landslides"
            ],
            miniproject: [
                "Mineral Property Database and Identification App",
                "Rock Type Classifier based on characteristics",
                "Strike and Dip 3D Visualizer",
                "Rock Quality Designation (RQD) Calculator",
                "Rock Mass Rating (RMR) Checklist Score Generator",
                "Earthquake Richter Scale Energy Equivalency App",
                "Geophysical Resistivity Graph Plotter",
                "Dam Site Suitability Weighted Scoring Tool",
                "Landslide Risk Factor Evaluator Spreadsheet",
                "Tunnel Support Requirement Estimator based on RMR",
                "Groundwater Velocity Calculator (Darcy's Law)",
                "Geological Time Scale Interactive Viewer",
                "Core Box Logging Log Sheet Template Generator",
                "Igneous vs Sedimentary Density Comparator",
                "Fault Type Identifier quiz"
            ]
        }
    }
};

/* ══════════════════════════════════════════════════════════════════
 *  CVE_LABS — Lab experiments per semester
 * ══════════════════════════════════════════════════════════════════ */
const CVE_LABS = {
    /* Semester 2 Labs (Batch 2029 - R2025) */
    2: [
        {
            code: "GE3271", name: "Engineering Practices Laboratory", experiments: [
                "Study and practice of basic carpentry joints",
                "Study and practice of sheet metal operations – Tray making",
                "Study and practice of fitting operations – V-fit and Dovetail fit",
                "Study and practice of plumbing joints and pipe connections",
                "Study and practice of welding – Arc welding butt and lap joints",
                "Study and practice of basic machining – Turning and facing",
                "Wiring practice – Staircase wiring and godown wiring",
                "Soldering practice – Simple electronic circuit assembly",
                "Study of power tools and measurement instruments",
                "Foundry practice – Moulding and casting of simple shapes",
                "Smithy practice – Forging operations",
                "Study and use of basic hand tools and their applications"
            ]
        },
        {
            code: "ME25C02", name: "Engineering Mechanics Laboratory", experiments: [
                "Verification of parallelogram law of forces",
                "Verification of triangle law and polygon law of forces",
                "Determination of reactions in simply supported beam",
                "Verification of principle of moments (Varignon's theorem)",
                "Determination of centroid of irregular lamina",
                "Determination of moment of inertia using oscillation method",
                "Verification of belt friction formula on flat and V-belt",
                "Coefficient of friction determination on inclined plane",
                "Simple and compound pendulum experiments",
                "Jib crane force analysis experiment",
                "Equilibrium of concurrent forces experiment",
                "Determination of modulus of rigidity using torsion test"
            ]
        }
    ],
    /* Semester 4 Labs (Batch 2028 - R2021) */
    4: [
        {
            code: "CE3401", name: "Applied Hydraulics Laboratory", experiments: [
                "Determination of coefficient of discharge using venturimeter",
                "Determination of coefficient of discharge of orifice",
                "Verification of Bernoulli's theorem",
                "Determination of Manning's roughness coefficient in open channel",
                "Measurement of velocity using current meter and pitot tube",
                "Determination of critical depth and specific energy in open channel",
                "Study of hydraulic jump and energy dissipation",
                "Performance test on centrifugal pump",
                "Performance test on reciprocating pump",
                "Performance test on Pelton wheel turbine",
                "Performance test on Francis turbine",
                "Calibration of rectangular and triangular notch"
            ]
        },
        {
            code: "CE3403", name: "Concrete Technology Laboratory", experiments: [
                "Tests on cement – Consistency, Initial and Final setting time",
                "Tests on cement – Fineness and Compressive strength",
                "Sieve analysis of fine and coarse aggregates",
                "Specific gravity and water absorption of aggregates",
                "Slump cone test and Compaction factor test for workability",
                "Mix design of concrete as per IS 10262",
                "Casting and testing of concrete cubes for compressive strength",
                "Flexural strength test on concrete beam specimens",
                "Non-destructive testing – Rebound hammer test on concrete",
                "Non-destructive testing – Ultrasonic pulse velocity test",
                "Split tensile strength test on cylindrical specimens",
                "Tests on bricks – Compressive strength and water absorption"
            ]
        },
        {
            code: "CE3404", name: "Soil Mechanics Laboratory", experiments: [
                "Determination of water content by oven drying method",
                "Determination of specific gravity of soil using pycnometer",
                "Grain size analysis – Sieve analysis and hydrometer analysis",
                "Determination of liquid limit and plastic limit (Atterberg limits)",
                "Standard Proctor compaction test – MDD and OMC",
                "Determination of coefficient of permeability – Constant head test",
                "Determination of coefficient of permeability – Falling head test",
                "Unconfined compression test on cohesive soil",
                "Direct shear test on soil sample",
                "Consolidation test using one-dimensional consolidometer",
                "Field density test using core cutter method",
                "CBR test on soil sample for pavement design"
            ]
        }
    ],
    /* Semester 6 Labs (Batch 2027 - R2021) */
    6: [
        {
            code: "CE3601", name: "Steel Structures Design Laboratory", experiments: [
                "Design of bolted lap joint for given load",
                "Design of fillet welded connection",
                "Design of tension member with bolted connections",
                "Design of compression member – built-up column with lacings",
                "Design of laterally supported steel beam",
                "Design of laterally unsupported steel beam",
                "Design of column base plate – slab base",
                "Wind load calculation on roof truss (IS 875 Part 3)",
                "Design of purlin for industrial building",
                "Design of gantry girder for overhead crane",
                "Plastic analysis – Collapse load of fixed beam",
                "Plastic analysis – Collapse load of portal frame"
            ]
        },
        {
            code: "CE3602", name: "Structural Analysis Laboratory", experiments: [
                "Drawing influence line diagrams for simply supported beam",
                "Determination of maximum BM under moving loads using ILD",
                "Verification of Muller-Breslau's principle for propped cantilever",
                "Analysis of three-hinged parabolic arch",
                "Analysis of two-hinged arch for horizontal thrust",
                "Determination of cable tension in suspension bridge model",
                "Approximate analysis of portal frame using Portal method",
                "Approximate analysis of multi-story frame using Cantilever method",
                "Space truss analysis using method of tension coefficients",
                "ILD for continuous beam using three moment equation",
                "Temperature stress analysis in fixed arch",
                "Model testing of a simple truss for deflection"
            ]
        }
    ]
};
