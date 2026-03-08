/**
 * ATE_SUBJECTS — Automobile Engineering core subject data
 * Objectives, unit topics, and Course Outcomes taken VERBATIM from
 * B.E.Automobile.pdf (Anna University R2021 syllabus).
 *
 * Batch mapping:
 *   2027 → Semester 6  → AU3601, Labs: AU3611, AU3612
 *   2028 → Semester 4  → AU3401-AU3404, ML3391, Labs: AU3411, AU3412
 *   2029 → Semester 2  → MA3251, PH3251, BE3251, GE3251, HS3252, Labs: GE3271, BE3271
 *
 * LABS — stored per-semester so the "Practicals" assignment type can list them.
 */
const ATE_SUBJECTS = {

    /* ══════════════════════════════════════════════════════════════════
     *  SEMESTER  4  —  BATCH 2028  (R2021)
     * ══════════════════════════════════════════════════════════════════ */

    "AU3401": {
        name: "Fuels and Lubricants",
        semester: 4,
        objective: "The objective of this course is to prepare the students to understand the role, properties and testing of various fuels and lubricants in the design and operation of IC engines.",
        units: {
            1: { title: "Refinery of Fuels and Lubricants", desc: "Introduction to Structure of petroleum, refining Process-Distillation, cracking processes, Catalytic reforming, alkylation, isomerisation and polymerization, finishing process- blending, products of refining process. Manufacture of lubricating oil base stocks, manufacture of finished automotive lubricants." },
            2: { title: "Theory of Lubrication", desc: "Engine friction: introduction, total engine friction, effect of engine variables on friction, hydrodynamic lubrication, elastic hydrodynamic lubrication, boundary lubrication, bearing lubrication, functions of the lubrication system, introduction to design of a lubricating system." },
            3: { title: "Lubricants", desc: "Specific requirements for automotive lubricants, oxidation deterioration and degradation of lubricants, additives and additive mechanism, synthetic lubricants, classification of lubricating oils, properties of lubricating oils, tests on lubricants. Grease, classification, properties, test used in grease- lubricants for gearbox, brake, differential and steering systems." },
            4: { title: "Properties and Testing of Fuels", desc: "Properties and testing of fuels- density, calorific value, cetane and octane number, flash point, fire point, distillation, vapour pressure, spontaneous ignition temperature, viscosity, cloud and pour point, flammability, ignitability, diesel index, API gravity, aniline point, carbon residue, copper strip corrosion. Test on used lubricants. Biofuel-properties and testing." },
            5: { title: "Testing Instruments", desc: "Working principles and types – viscometers, calorimeters, flash and fire point apparatus, cloud and pour point apparatus, distillation apparatus, penetrometer, carbon residue apparatus, CFR engine, vapour pressure testing equipment, copper strip equipment, Aniline point apparatus, Ash content testing equipment, specifications of fuels. ASTM and SAE standards - FTIR- GCMS analysers." }
        },
        cos: {
            CO1: "Identify the fuels and lubricants for automotive applications.",
            CO2: "Understand the properties of fuels and lubricants and its testing equipment.",
            CO3: "Evaluate the properties of fuels and lubricants.",
            CO4: "Select suitable fuel and lubricant testing equipment.",
            CO5: "Analyse the behaviour of fuels and lubricants."
        },
        topics: {
            presentation: [
                "Structure of Petroleum and Refining Processes",
                "Catalytic Reforming, Alkylation and Polymerization",
                "Manufacture of Lubricating Oil Base Stocks",
                "Hydrodynamic and Boundary Lubrication",
                "Design of Automotive Lubrication Systems",
                "Classification and Properties of Lubricating Oils",
                "Additives in Automotive Lubricants",
                "Grease: Types, Properties and Applications",
                "Cetane and Octane Number – Fuel Quality Measurement",
                "Flash Point, Fire Point and Spontaneous Ignition Temperature",
                "Biofuels – Properties and Testing",
                "ASTM and SAE Standards for Fuel Testing Instruments"
            ],
            miniproject: [
                "Comparative Study of Viscosity of Engine Oils at Different Temperatures",
                "Design of a Lubrication System Circuit for a Multi-Cylinder Engine",
                "Flash and Fire Point Measurement Using Standard Apparatus",
                "Analysis of Cetane Number Effect on Diesel Engine Performance",
                "Testing Lubricating Oil Degradation Using FTIR Spectroscopy",
                "Evaluation of Biofuel Blend Properties and Engine Compatibility",
                "Grease Selection for Differential and Gearbox Applications",
                "CFR Engine Experiment for Octane Number Determination",
                "API Gravity and Aniline Point Measurement of Fuel Samples",
                "Study and Testing of Automotive Coolants and Antifreeze",
                "Carbon Residue Estimation Using Conradson Method",
                "Distillation Curve Analysis of Petrol and Diesel Samples"
            ]
        }
    },

    "AU3402": {
        name: "Automotive Chassis",
        semester: 4,
        objective: "The objective of this course is to prepare the students to understand the basics of various vehicle frames, front axles, steering, suspension and braking systems used in automobile.",
        units: {
            1: { title: "Introduction, Front Axle and Steering Systems", desc: "Types of Chassis layout, constructional details and materials for frames, Testing of frames; Types of Front Axles and Stub Axles, Front Wheel Geometry, Condition for True Rolling Motion of Wheels during Steering, Ackerman's and Davis Steering Mechanisms, Steering Error Curve, Steering Linkages, Different Types of Steering Gears, Slip Angle, Over-Steer and Under-Steer, Reversible and Irreversible Steering, EPAS." },
            2: { title: "Propeller Shaft and Final Drive", desc: "Effect of Driving Thrust, torque reactions and side thrust, Hotchkiss drive, torque tube drive, radius rods and stabilizers, Propeller Shaft, Universal Joints, Constant Velocity Universal Joints, Front Wheel drive, Final drive, different types, Double reduction and twin speed final drives, Multi-axled vehicles, Differential principle and types, Differential housings, limited speed differential, Differential locks." },
            3: { title: "Axles and Tyres", desc: "Construction and Design of Drive Axles, Types of Loads acting on drive axles, Full-Floating, Three-Quarter Floating and Semi-Floating Axles, Axle Housings and Types – Lift axle, Dead axle, Types and Constructional Details of Different Types of Wheels and Rims, Different Types of Tyres and their constructional details." },
            4: { title: "Suspension System", desc: "Need for Suspension System, Types of Suspension Springs, Constructional details and characteristics of Single Leaf, Multi-Leaf, Coil, and Torsion bar, Rubber, Pneumatic and Hydro-elastic Suspension Spring Systems, Independent Suspension System, Shock Absorbers, Types and Constructional details." },
            5: { title: "Braking System", desc: "Theory of Automobile Braking, Stopping Distance Time and Braking Efficiency, Effect of Weight Transfer during Braking, Theory of Drum Brakes, Loading and Trailing Shoes, Braking Torque, Constructional Details of Drum Brake and its Activators, Disc Brake Theory, Types and Construction, Hydraulic Braking System, Mechanical Braking System, Pneumatic Braking System, Power-Assisted Braking System, Anti-Lock Braking System, Constructional Details." }
        },
        cos: {
            CO1: "Identify the different types of frame and chassis used in Automotive.",
            CO2: "Classify the different types of drivelines and drives used in Automotive.",
            CO3: "Acquire knowledge about different types of front axle and rear axles used in motor vehicles.",
            CO4: "Examine the working principle of conventional and independent suspension systems.",
            CO5: "Apply knowledge on working principles of brake and its subsystems."
        },
        topics: {
            presentation: [
                "Types of Chassis Layouts and Frame Construction",
                "Ackerman's and Davis Steering Mechanisms",
                "Electronic Power Assisted Steering (EPAS) Systems",
                "Hotchkiss Drive and Torque Tube Drive",
                "Constant Velocity Universal Joints – Design and Application",
                "Differential Principle, Types and Differential Locks",
                "Full Floating, Semi Floating and Three-Quarter Floating Axles",
                "Types of Tyres and Wheel Constructional Details",
                "Independent Suspension Systems and Shock Absorbers",
                "Anti-Lock Braking System (ABS) – Working Principle",
                "Disc Brake vs Drum Brake – Comparative Study",
                "Power-Assisted and Pneumatic Braking Systems"
            ],
            miniproject: [
                "Design of Ackerman Steering Geometry for a Small Vehicle",
                "Fabrication of a Differential Mechanism Scale Model",
                "Analysis of Suspension Spring Stiffness and Damping Characteristics",
                "Study on ABS Working Using Simulation Software",
                "Tyre Selection and Load Rating Calculation for LMV",
                "Disc Brake Heat Dissipation Analysis Using Thermal Simulation",
                "Propeller Shaft Design for Rear-Wheel Drive Vehicle",
                "Front Wheel Geometry Measurement and Alignment Check",
                "Comparative Study of Leaf and Coil Spring Suspension Performance",
                "Design of Braking System for a Light Commercial Vehicle",
                "Testing of Shock Absorber Characteristics Using Test Rig",
                "Hydraulic Braking Circuit Design and Pressure Analysis"
            ]
        }
    },

    "AU3403": {
        name: "Vehicle Body Engineering",
        semester: 4,
        objective: "To prepare the students with the knowledge on the body construction details of light, heavy and commercial vehicles, along with the vehicle aerodynamics and body materials.",
        units: {
            1: { title: "Car Body Details", desc: "Types of Car body - Saloon, convertibles, Limousine, Estate Van, Racing and Sports car – car body terminology - Visibility- regulations, driver's visibility, improvement in visibility and tests for visibility. Driver seat design - Car Body Construction - Various panels in car bodies. Safety: Safety design, safety equipment for cars." },
            2: { title: "Bus Body Details", desc: "Types of bus body: based on capacity, distance travelled and based on construction. – Bus body layout, floor height, engine location, entrance and exit location. Types of metal sections used – Regulations – Constructional details: Conventional and integral." },
            3: { title: "Commercial Vehicle Details", desc: "Types of commercial vehicle bodies - Light commercial vehicle body. Construction details of Flat platform body, Tipper body and Tanker body – Dimensions of driver's seat in relation to controls – Driver's cab design." },
            4: { title: "Vehicle Aerodynamics", desc: "Objectives, Vehicle drag and types. Various types of forces and moments. Effects of forces and moments. Side wind effects on forces and moments. Various body optimization techniques for minimum drag. Wind tunnels – Principle of operation, Types. Wind tunnel testing such as: Flow visualization techniques, multi-point pressure measurement and full-scale testing." },
            5: { title: "Body Materials, Trim, Mechanisms and Body Repair", desc: "Types and properties of materials used in body construction and insulation - Such as steel sheet, timber, plastics and GRP, Insulation materials. Body trim items-body mechanisms. Hand tools-power tools for body repair. Vehicle corrosion-Anticorrosion methods-Modern painting process procedure." }
        },
        cos: {
            CO1: "Understand the different aspects of car body.",
            CO2: "Differentiate the bus and commercial vehicle bodies.",
            CO3: "Describe the role of various aerodynamic forces and moments, measuring instruments in vehicle body design.",
            CO4: "Identify the materials used in body building.",
            CO5: "Select hand tools for body repairs and maintenance."
        },
        topics: {
            presentation: [
                "Types of Car Bodies – Saloon, Convertible, Sports and Racing Cars",
                "Car Body Safety Design and Safety Equipment",
                "Driver Visibility Standards and Improvement Techniques",
                "Bus Body Types – Capacity-Based and Construction-Based Classification",
                "Integral vs Conventional Bus Body Construction",
                "Tipper Body and Tanker Body Construction Details",
                "Vehicle Aerodynamics – Drag Forces and Moments",
                "Body Optimization Techniques for Minimum Drag",
                "Wind Tunnel Testing Methods and Flow Visualization",
                "Body Materials – Steel, GRP, Plastics and Insulation",
                "Vehicle Corrosion and Anticorrosion Methods",
                "Modern Vehicle Painting Process and Body Repair Procedures"
            ],
            miniproject: [
                "Aerodynamic Drag Reduction Design for a Sedan Body Model",
                "Wind Tunnel Model Testing of Vehicle Body Shapes",
                "Design of Ergonomic Driver Cab for Light Commercial Vehicle",
                "Comparative Study of GRP and Steel Panels for Body Construction",
                "Body Repair and Panel Straightening Using Power Tools",
                "Safety Feature Analysis of Crumple Zones in Car Bodies",
                "Anticorrosion Coating Evaluation for Vehicle Underbody",
                "Tipper Body Mechanism Design and Hydraulic Analysis",
                "Study of Integral vs Conventional Bus Body Strength",
                "Car Body Panel Visibility Angle Measurement and Analysis",
                "Modern Painting Process Simulation Using CAD Software",
                "Driver Seat Ergonomic Design and Comfort Analysis"
            ]
        }
    },

    "AU3404": {
        name: "Automotive Transmission",
        semester: 4,
        objective: "To prepare the students to gain knowledge in the construction and principle of mechanical transmission components, hydrodynamic devices, hydrostatic devices, automatic transmission system, and Electric drive used in road vehicles.",
        units: {
            1: { title: "Clutch", desc: "Requirement of transmission system, Types of transmission system, Requirement of Clutches – Functions-Types of clutches, construction and operation of Single plate, multi plate and Diaphragm spring clutches. Centrifugal clutch, Electronic clutch." },
            2: { title: "Gear Box", desc: "Purpose of gear box. Construction and working principle of sliding, constant and synchromesh gear boxes, Automatic manual transmission. Introduction to epicycle gear trains, Numerical examples on performance of automobile such as Resistance to motion, Tractive effort, Engine speed & power and acceleration. Determination of gear ratios for different vehicle applications." },
            3: { title: "Hydrodynamic Transmission", desc: "Fluid coupling – principles - Performance characteristics – advantages – limitations – drag torque – reduction of drag torque. Torque converter - principles - Performance characteristics – advantages – limitations – multistage and polyphase torque converters." },
            4: { title: "Hydrostatic Drive", desc: "Hydrostatic drive; various types of hydrostatic systems – Principles of Hydrostatic drive system. Advantages and limitations. Comparison of hydrostatic drive with hydrodynamic drive, construction and working of typical Janny hydrostatic drive." },
            5: { title: "Automatic Transmission and Electric Drive", desc: "Wilson gear box- Cotal electric transmission. Chevrolet Turboglide transmission. – Four speeds longitudinally mounted automatic transmission -Hydraulic control systems of automatic transmission. Continuously Variable Transmission (CVT) — types — Operations. Electric drive- types- Principle of early and modified Ward Leonard Control system-Advantages & limitations - Automated Manual Transmission (AMT) - Modern electric drives." }
        },
        cos: {
            CO1: "Understand the construction and working of various types of clutches.",
            CO2: "Determine the gear ratio for different vehicle applications.",
            CO3: "Describe the types and principle of hydrodynamic transmission.",
            CO4: "Compare Hydrostatic and hydrodynamics drives.",
            CO5: "Identify the differences among various automatic transmissions."
        },
        topics: {
            presentation: [
                "Types of Clutches – Single Plate, Multi Plate and Diaphragm Spring",
                "Centrifugal and Electronic Clutches – Working Principle",
                "Synchromesh Gear Box – Construction and Working",
                "Gear Ratio Determination for LMV and HMV Applications",
                "Epicycle Gear Trains and Automatic Manual Transmission",
                "Fluid Coupling – Principles and Performance Characteristics",
                "Torque Converter – Types and Working Principle",
                "Hydrostatic Drive Systems – Advantages and Limitations",
                "Comparison of Hydrostatic and Hydrodynamic Drives",
                "Continuously Variable Transmission (CVT) – Types and Operations",
                "Automated Manual Transmission (AMT) Technology",
                "Modern Electric Drives and Ward Leonard Control System"
            ],
            miniproject: [
                "Design of Single Plate Clutch for Given Engine Specifications",
                "Gear Ratio Calculation and Power Flow Analysis Using Simulation",
                "Model of Synchromesh Gear Box with Gear Engagement Mechanism",
                "Performance Curve Analysis of Torque Converter",
                "Comparison of Fuel Efficiency: AMT vs Manual Transmission",
                "CVT Ratio Variation Study Using Pulley-Belt Mechanism Model",
                "Hydrostatic Drive Circuit Design for Agricultural Vehicle",
                "Tractive Effort vs Speed Characteristic Curves for LMV",
                "Fabrication of Epicycle Gear Train Demonstration Model",
                "Electric Drive Motor Selection for EV Application",
                "Study of Automatic Transmission Hydraulic Control System",
                "Drag Torque Reduction Techniques in Fluid Coupling Systems"
            ]
        }
    },

    "ML3391": {
        name: "Mechanics of Solids",
        semester: 4,
        objective: "To apply principle concepts behind stress, strain and deformation of solids, analyze transverse loading on beams, understand torsion principles in shafts, acquire knowledge on deflection of beams, and interpret thin and thick shell behavior.",
        units: {
            1: { title: "Stress, Strain and Deformation of Solids", desc: "Rigid and Deformable bodies – Strength, Stiffness and Stability – Stresses and Strains: Tensile, Compressive and Shear – Material Behaviour- Elastic Vs Plastic – Response of Real Materials: Tensile Test, Compressive Test, Shear Test, Cyclic Tests - strain gauges and rosettes – Deformation of Statically determinate and In-determinate bars of variable cross-section & Composite section under axial load – Thermal stress – Elastic constants – Plane Strain – Volumetric Strain." },
            2: { title: "Transverse Loading on Beams and Stresses in Beam", desc: "Beams – types transverse loading on beams – Shear force and bending moment in beams – Cantilevers – Simply supported beams and over-hanging beams. Theory of simple bending – Bending stress distribution – Flitched beams – Shear stress distribution." },
            3: { title: "Torsion", desc: "Torsion formulation stresses and deformation in circular and hollow shafts – Stepped shafts – Deflection in shafts fixed at both ends – Stresses in helical springs – Deflection of helical springs – Closed and Open Coiled helical springs – springs in series and parallel, carriage springs." },
            4: { title: "Deflection of Beams", desc: "Slope, Deflection and Radius of Curvature – Methods of Determination of Slope and Deflection- Double Integration method – Macaulay's method – Area moment Theorems for computation of slopes and deflections in beams - Conjugate beam and strain energy – Maxwell's reciprocal theorems." },
            5: { title: "Thick & Thin Shells & Principal Stresses", desc: "Stresses in thin cylindrical shell due to internal pressure, circumferential and longitudinal stresses and deformation in thin cylinders – spherical shells subjected to internal pressure – Deformation in spherical shells – Lame's theory – Application of theories of failure – Stresses on inclined planes – principal stresses and principal planes – Mohr's circle of stress." }
        },
        cos: {
            CO1: "Apply the principle concepts behind stress, strain and deformation of solids for various engineering applications.",
            CO2: "Analyze the transverse loading on beams and stresses in beam for various engineering applications.",
            CO3: "Solve problems based on the torsion principles involved in shafts and springs for various engineering applications.",
            CO4: "Interpret the results of the deflection of beams.",
            CO5: "Analyze the thin and thick shells and principal stresses in beam for various engineering applications."
        },
        topics: {
            presentation: [
                "Stress-Strain Diagrams and Material Behaviour – Elastic vs Plastic",
                "Strain Gauges and Rosettes – Measurement of Deformation",
                "Thermal Stress in Composite and Statically Indeterminate Bars",
                "Shear Force and Bending Moment Diagrams for Beams",
                "Theory of Simple Bending and Bending Stress Distribution",
                "Shear Stress Distribution in Beams – Rectangular and I-Sections",
                "Torsion in Circular and Hollow Shafts – Important Problems",
                "Helical Springs – Types, Stresses and Deflection",
                "Double Integration and Macaulay's Method for Beam Deflection",
                "Area Moment Theorem and Conjugate Beam Method",
                "Thin Cylindrical Shells – Circumferential and Longitudinal Stresses",
                "Mohr's Circle of Stress – Principal Planes and Stresses"
            ],
            miniproject: [
                "Material Testing: Tensile and Compression Test on Mild Steel",
                "Strain Gauge Calibration and Stress Measurement Experiment",
                "Bending Moment Verification Using Simply Supported Beam Test Rig",
                "Torsion Test on Circular Shaft – Experimental vs Theoretical Comparison",
                "Deflection Measurement of Cantilever Beam Under Point Load",
                "Spring Stiffness Testing – Closed and Open Coiled Helical Springs",
                "Thin Cylinder Pressure Vessel Stress Analysis",
                "Principal Stress Determination Using Photoelasticity Model",
                "Finite Element Analysis of I-Beam Under Transverse Loading",
                "Composite Section Stress Analysis Under Axial and Thermal Load",
                "Macaulay's Method Beam Deflection Calculator Application",
                "Mohr's Circle Stress Transformation Visualization Tool"
            ]
        }
    },

    /* ══════════════════════════════════════════════════════════════════
     *  SEMESTER  6  —  BATCH 2027  (R2021)
     * ══════════════════════════════════════════════════════════════════ */

    "AU3601": {
        name: "Automotive Pollution and Control",
        semester: 6,
        objective: "The objective of this course is to prepare the students to have knowledge on the harmful effects of major pollutants of IC engines, emission standards, various pollution measurement devices and control techniques.",
        units: {
            1: { title: "Emission from Automobiles", desc: "Sources of Pollution. Various emissions from Automobiles — Formation — Effects of pollutants on environment and human beings. Emission control techniques – Emission standards - National and international." },
            2: { title: "Emission from Spark Ignition Engine and Its Control", desc: "Emission formation in SI Engines - Carbon monoxide - Unburned hydrocarbon - NOx - Smoke - Lead emission - Crankcase emission — Effects of design and operating variables on emission formation — Control of evaporative emission: Charcoal Canister — Crankcase emission control: Positive Crankcase Ventilation (PCV) system — Control of exhaust emission: Secondary air injection — Two-way Catalytic converter — Three-way Catalytic converter — Performance and efficiency — Thermal reactor — Laser Assisted Combustion." },
            3: { title: "Emission from Compression Ignition Engine and Its Control", desc: "Formation of White, Blue, and Black Smokes, NOx, soot, sulphur particulate and Intermediate Compounds — Physical and Chemical delay — Significance Effect of Operating variables on Emission formation — Fumigation, EGR, HCCI, Particulate Traps, SCR — Cetane number Effect." },
            4: { title: "Noise Pollution from Automobiles", desc: "Sources of Noise — Engine Noise, Transmission Noise, vehicle structural Noise, aerodynamics noise, Exhaust Noise. Noise reduction in Automobiles — Encapsulation technique for noise reduction — Silencer Design." },
            5: { title: "Test Procedures and Emission Measurements", desc: "Constant Volume Sampling I and 3 (CVS1 & CVS3) Systems- Sampling Procedures — Chassis dyno - Seven mode and thirteen mode cycles for Emission Sampling — Sampling problems — world harmonized driving cycles - Emission analysers — NDIR, FID, Chemiluminescent, Smoke meters, Dilution Tunnel, SHED Test, Sound level meters. Particle counter." }
        },
        cos: {
            CO1: "Differentiate the various emissions formed in IC engines.",
            CO2: "Analyze the effects of pollution on human health and environment.",
            CO3: "Design the control techniques for minimizing emissions.",
            CO4: "Categorize the emission norms.",
            CO5: "Identify suitable methods to reduce the noise emissions."
        },
        topics: {
            presentation: [
                "Sources and Types of Automobile Emissions – HC, CO, NOx and PM",
                "National and International Emission Standards – Bharat Stage Norms",
                "Formation of CO and Unburned Hydrocarbons in SI Engines",
                "Three-Way Catalytic Converter – Working and Efficiency",
                "Evaporative Emission Control Techniques",
                "White, Blue and Black Smoke Formation in CI Engines",
                "EGR, HCCI and Selective Catalytic Reduction (SCR)",
                "Particulate Traps – Design and Working Principle",
                "Sources of Automotive Noise and Encapsulation Techniques",
                "Silencer Design for Exhaust Noise Reduction",
                "Chassis Dynamometer Testing – Seven and Thirteen Mode Cycles",
                "Emission Analysers – NDIR, FID, Chemiluminescent and Smoke Meters"
            ],
            miniproject: [
                "Exhaust Gas Analysis of a Petrol Engine Using NDIR Analyser",
                "Study of Three-Way Catalytic Converter Efficiency Under Varying Load",
                "Comparative Emission Analysis of BS4 and BS6 Vehicles",
                "Design of Silencer for Reduction of Exhaust Noise",
                "Noise Mapping of a Vehicle Using Sound Level Meters",
                "EGR Rate Optimization for NOx Reduction in Diesel Engine",
                "Particulate Filter Testing – Pressure Drop and Collection Efficiency",
                "CVS Sampling System Setup for Exhaust Gas Collection",
                "Smoke Opacity Measurement Using Smoke Meter",
                "Evaporative Emission Test (SHED Test) Procedure Study",
                "Diesel Engine Emission Reduction Using SCR Simulation",
                "World Harmonized Driving Cycle Analysis and Fuel Economy Study"
            ]
        }
    },

    /* ══════════════════════════════════════════════════════════════════
     *  SEMESTER  2  —  BATCH 2029  (R2025)
     * ══════════════════════════════════════════════════════════════════ */

    "MA25C02": {
        name: "Linear Algebra",
        semester: 2,
        objective: "To impart foundational knowledge in linear algebra essential for analysing and solving problems in engineering applications and to provide the knowledge on computation using software.",
        units: {
            1: { title: "Vector Spaces", desc: "Introduction to Vector Spaces, Examples, Subspaces, Linear Combinations, Span, Generating Sets, Linear Dependence and Independence, Basis and Dimension, Dimension of Subspaces." },
            2: { title: "Linear Transformations and Diagonalization", desc: "Null space, Range, Dimension Theorem (statement only), Matrix representation of a linear transformation, Eigenvalues & Eigenvectors, Diagonalizability." },
            3: { title: "Inner Product Spaces", desc: "Inner product, Norms, Cauchy, Schwarz inequality, Gram, Schmidt orthogonalization, Simple problems (up to R3)." },
            4: { title: "Matrix Decomposition", desc: "Orthogonal transformation of a symmetric matrix to diagonal form - Positive definite matrices, QR decomposition, Singular Value Decomposition (SVD), Least squares solutions- simple problems (up to 3x3 matrices)." },
            5: { title: "Applications", desc: "Applications of linear algebra in solving engineering problems using software (Implicit based on activities)." }
        },
        cos: {
            CO1: "Test linear dependence and compute span and basis of vectors.",
            CO2: "Compute matrix representations and find null space, range, and eigenvalues.",
            CO3: "Compute inner products, vector norms, and apply Gram-Schmidt process.",
            CO4: "Perform QR decomposition and Singular Value Decomposition (SVD).",
            CO5: "Solve least squares problems and apply linear algebra to structural networks."
        },
        topics: {
            presentation: [
                "Applications of Linear Transformations in 3D Automobile Modeling",
                "Eigenvalues in Vehicle Structural Frequency Analysis",
                "Singular Value Decomposition (SVD) in Engineering Data Compression",
                "Least Squares Solutions for Automotive Sensor Calibration",
                "Gram-Schmidt Orthogonalization Process Explained",
                "Matrix Representation of Robotic Arm Kinematics in Automobile Assembly",
                "Positive Definite Matrices in Vehicle Suspension Optimization",
                "Vector Spaces and Span in CAD Software Algorithms",
                "Understanding the Dimension Theorem and Null Space",
                "QR Decomposition for Solving Systems of Linear Equations",
                "Cayley-Hamilton Theorem Applications",
                "Diagonalization of Matrices in Dynamic Systems",
                "Cauchy-Schwarz Inequality in Inner Product Spaces",
                "Role of Linear Independence in Engine Control Mapping",
                "Matrix Computations in Autonomous Vehicle Path Planning"
            ],
            miniproject: [
                "Automobile Suspension Matrix Calculator using Python",
                "SVD Image Compression Visualizer Tool",
                "2D Kinematic Transformation Simulator",
                "Eigenvalue Calculator for Simple Vehicle Vibration Models",
                "Least Squares Regression Tool for Mileage Data",
                "Robotic Arm Joint Angle Matrix Solver",
                "QR Decomposition Step-by-Step App",
                "Gram-Schmidt Process Visualization Software",
                "Vehicle Center of Gravity Coordinate Matrix Program",
                "Linear Equation Solver Array Interface",
                "Subspace Basis Identifier Tool",
                "Dashboard for Matrix Norm Computations",
                "Interactive Matrix Diagonalization Tool",
                "Automotive Sensor Data Least Squares Filter",
                "Linear Algebra Visualization Game"
            ]
        }
    },

    "ME25C02": {
        name: "Engineering Mechanics",
        semester: 2,
        objective: "To introduce the fundamental concepts and principles of statics related to forces acting on particles and rigid bodies. To develop the ability to formulate and apply equilibrium equations.",
        units: {
            1: { title: "Statics of Particles", desc: "Resultant of forces in a plane, Equilibrium of a particle in a plane, Addition of concurrent forces in space, Equilibrium of a particle in space." },
            2: { title: "Statics of Rigid Bodies", desc: "Concept of Free Body Diagram, Equivalent systems of forces, Transmissibility, Moment of a force about a point and an axis, Couples and force-couple systems, Equilibrium of rigid bodies in two and three dimensions, Principle of virtual work." },
            3: { title: "Moments of Inertia", desc: "First moments of areas and lines, Centroids of composite areas and lines, Theorems of Pappus-Guldinus, Second moment of area, Parallel axis theorem, Rectangular and Polar Moments of inertia of composite areas, Radius of Gyration, Product of Inertia, Principal Axes and Principal Moments of Inertia, Mass moments of inertia of thin plates." },
            4: { title: "Friction", desc: "Laws of friction, Coefficients of Friction, Angles of Friction, Types of Friction Problems, Wedges and Ladder friction, Belt friction." },
            5: { title: "Applications of Statics", desc: "Solving GATE questions and practical applications of equilibrium, moments of inertia, and friction in mechanical systems." }
        },
        cos: {
            CO1: "Explain the principles of statics in determination of forces acting on particles and rigid bodies.",
            CO2: "Apply equilibrium conditions to predict the response of particles and rigid bodies.",
            CO3: "Calculate the centroid, center of gravity and moment of inertia of basic and composite areas.",
            CO4: "Analyze the effect of dry friction in various mechanical systems.",
            CO5: "Solve complex static problems using the principle of virtual work."
        },
        topics: {
            presentation: [
                "Free Body Diagrams in Automotive Chassis Design",
                "Belt Friction Principles in Engine Pulley Systems",
                "Moment of Inertia and its Impact on Vehicle Roll Over",
                "Equilibrium of Rigid Bodies in 3D Automobile Structures",
                "Wedge Friction Applications in Braking Mechanisms",
                "Theorems of Pappus-Guldinus for Complex Volume Generation",
                "Polar Moment of Inertia in Automotive Drive Shafts",
                "Calculations of Center of Gravity in Commercial Vehicles",
                "Principle of Virtual Work in Linkage Analysis",
                "Laws of Dry (Coulomb) Friction and Tire Grip",
                "Analysis of Concurrent Forces in Suspension Mounts",
                "Effect of Transmissibility on Load Bearing Components",
                "Force-Couple Systems in Steering Geometry",
                "Mass Moment of Inertia of a Flywheel",
                "Calculation of Support Reactions in Vehicle Frames"
            ],
            miniproject: [
                "Center of Gravity Calculator for Car Configurations",
                "Interactive Free Body Diagram Drawer Tool",
                "Belt Drive Tension and Friction Calculator",
                "Flywheel Mass Moment of Inertia Simulator",
                "Vehicle Roll-Over Angle Estimator",
                "Wedge Friction Multiplier Test Rig Model",
                "Truss / Frame Joint Reaction Force Calculator",
                "Static Equilibrium Simulator for 2D Objects",
                "Parallel Axis Theorem Visualizer App",
                "Centroid Locator for Composite Cross-Sections",
                "Drive Shaft Polar Moment of Inertia Calculator",
                "Virtual Work Linkage Displacement Calculator",
                "Tire-Road Friction Coefficient Data Logger",
                "Vector Addition and Resultant Force Graphic Tool",
                "Steering Force-Couple Simulator"
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
            5: { title: "Digital Electronics & Microcontrollers", desc: "Boolean algebra, Basic and Universal Gates, adders, multiplexers, demultiplexers and flip-flops. Microcontrollers: Introduction, Architecture, Potential Applications." }
        },
        cos: {
            CO1: "Understand and explain basic electrical and electronic concepts.",
            CO2: "Apply and analyze electrical DC and AC circuits in real-time applications.",
            CO3: "Understand the operation and applications of electrical machines like BLDC and Stepper motors.",
            CO4: "Identify and utilize key electronic semiconductor devices.",
            CO5: "Design simple digital electronic circuits and understand microcontroller architecture."
        },
        topics: {
            presentation: [
                "BLDC Motors in Modern Electric Vehicles",
                "Working Principle of Automotive Alternators (Synchronous Generators)",
                "Application of Stepper Motors in Automobile Instrumentation",
                "Kirchhoff's Laws Applied to Vehicle Wiring Harness",
                "Role of Fuses and Relays in Automotive Electrical Safety",
                "Zener Diode Voltage Regulators in Car Charging Systems",
                "Operational Amplifiers in Automotive Sensor Signal Conditioning",
                "Microcontrollers (ECUs) in Engine Management Systems",
                "Faraday’s Law of Induction in Ignition Coils",
                "Characteristics of PN Junction Diodes in Automotive Rectifiers",
                "Three-Phase AC vs DC Charging for EVs",
                "Logic Gates in Vehicle Alarm Logic Circuits",
                "BJT and FET Transistors as Electronic Switches",
                "Measurement of RMS Values in Vehicle AC Circuits",
                "Star and Delta Connections in EV Traction Motors"
            ],
            miniproject: [
                "Miniature BLDC Motor Speed Controller",
                "Automotive Relay and Fuse Fusebox Simulator",
                "Zener Diode 12V Voltage Regulator Circuit",
                "Simple ECU Logic Simulator using Logic Gates",
                "Arduino-based Stepper Motor Dashboard Needle Simulator",
                "Car Battery Voltage Divider Measurement Circuit",
                "Op-Amp Temperature Sensor Signal Amplifier",
                "Vehicle Headlight Switching BJT Circuit",
                "Alternator AC to DC Rectification Breadboard Model",
                "Kirchhoff's Law DC Circuit Current Solver",
                "Simple RC Delay Timer for Dome Lights",
                "Digital Multiplexer for Multiple Sensor Inputs",
                "Faraday Induction Flashlight Model",
                "Logic Gate Seatbelt Warning Chime Simulator",
                "Basic Microcontroller Traffic Light Controller"
            ]
        }
    },

    "PH25C05": {
        name: "Applied Physics (ME) – II",
        semester: 2,
        objective: "To impart fundamental knowledge of rigid body dynamics, thermal physics, phase transitions, and functional materials. To provide analytical abilities for evaluating physical phenomena in mechanical engineering applications.",
        units: {
            1: { title: "Rigid Body Dynamics", desc: "Centre of mass – Moment of inertia (circular disc, solid cylinder, hollow cylinder, solid sphere, hollow sphere), Gear, shaft, gyroscope." },
            2: { title: "Thermal Physics", desc: "Thermal conductivity –Transient plane source method, Transient Line Source method- Forbe’s method - conduction through compound media, Laws of Thermodynamics." },
            3: { title: "Phase Transitions", desc: "Solid solutions - single component system, binary phase diagrams - iron-carbon equilibrium diagram, T-T-T-diagram - heat treatment of steels – hardening techniques." },
            4: { title: "Functional Materials", desc: "Ceramics – Composites, Fiber Reinforced Plastics, Metallic Glasses, LED Characteristics." },
            5: { title: "Applications", desc: "Demonstrations and applications of gyroscopes, thermal insulators, steel hardening, and LED working in mechanical systems." }
        },
        cos: {
            CO1: "Explain the concepts of physics in mechanical engineering stream.",
            CO2: "Apply moment of inertia and rigid body dynamics to mechanical components.",
            CO3: "Evaluate thermal conductivity and apply laws of thermodynamics.",
            CO4: "Analyze phase diagrams and heat treatment techniques for steels.",
            CO5: "Understand the properties and applications of composites, metallic glasses, and LEDs."
        },
        topics: {
            presentation: [
                "Gyroscopic Effect on Two-Wheeler Stability",
                "Moment of Inertia of Automotive Shafts and Gears",
                "Thermal Conductivity in Engine Cylinder Walls",
                "Iron-Carbon Equilibrium Diagram for Automotive Steels",
                "Heat Treatment and Hardening of Gear Teeth",
                "Fiber Reinforced Plastics (FRP) in Car Body Panels",
                "Laws of Thermodynamics in Internal Combustion Engines",
                "Characteristics of LEDs in Automotive Lighting",
                "Metallic Glasses – Properties and Future Uses in Auto Parts",
                "T-T-T Diagram in Steel Quenching Processes",
                "Conduction through Compound Media in Exhaust Systems",
                "Automotive Ceramics – Catalytic Converters and Spark Plugs",
                "Transient Line Source Method for Thermal Conductivity",
                "Role of Solid Solutions in Alloy Wheels",
                "Dynamics of Solid Cylinders vs Hollow Cylinders in Drivetrains"
            ],
            miniproject: [
                "Gyroscopic Precession Demonstration Model",
                "Interactive Iron-Carbon Phase Diagram Explorer",
                "Thermal Conductivity Comparison of Heat Shield Materials",
                "LED Voltage-Current Characteristic Grapher",
                "Flywheel Moment of Inertia Calculator",
                "Engine Heat Conduction Simulator (1D)",
                "Virtual Steel Quenching and Hardness Estimator",
                "Center of Mass Calculator for Asymmetrical Vehicle Parts",
                "Composite Material Strength vs Weight Calculator",
                "Thermodynamics First Law Piston-Cylinder Simulator",
                "T-T-T Diagram Cooling Rate Plotter",
                "Shaft Rotational Kinetic Energy App",
                "Ceramics vs Metals Automotive Application Database",
                "Heat Loss Estimator for Compound Engine Walls",
                "Bicycle Wheel Gyroscope Stabilization Rig"
            ]
        }
    },

    "CY25C03": {
        name: "Applied Chemistry (ME) – II",
        semester: 2,
        objective: "To impart knowledge and expose to applications of chemistry in mechanical engineering stream. To explore the mechanisms and working principles of smart materials and coatings with real-world applications.",
        units: {
            1: { title: "Functional Materials", desc: "Types, Smart coatings, Mechanisms, Sustainable energy materials." },
            2: { title: "Fuels", desc: "Classification, Chemical Composition, natural resources, Calorific Value Alternative Fuels - Natural gas benefits." },
            3: { title: "Composites and Lubricants", desc: "Matrix materials – Reinforcements, Hybrid composites, Engineering applications. Lubricants: Types, Functions. Key properties, Synthetic lubricants, Mechanisms, Emerging lubricants." },
            4: { title: "Combustion", desc: "Reaction Kinetics, Stoichiometric combustion and air-fuel ratio calculations, Knocking and Anti-knocking agents, Hydrogen combustion, Flue Gas analysis." },
            5: { title: "Adhesives", desc: "Adhesives: Adhesion Mechanisms, Classification, Bond strength, Industrial adhesives." }
        },
        cos: {
            CO1: "Explain the major concepts of chemistry with regard to applications in mechanical systems.",
            CO2: "Analyze smart coatings and sustainable energy materials.",
            CO3: "Evaluate alternative fuels and calculate stoichiometric air-fuel ratios.",
            CO4: "Understand the properties and mechanisms of composites and synthetic lubricants.",
            CO5: "Assess combustion kinetics, knocking phenomena, and industrial adhesives."
        },
        topics: {
            presentation: [
                "Chemistry of Smart Coatings and Self-Cleaning Car Paint",
                "Stoichiometric Air-Fuel Ratio Calculations in IC Engines",
                "Knocking in Petrol Engines and Anti-Knocking Agents",
                "Synthetic Lubricants vs Mineral Oils for Engines",
                "Hydrogen Combustion – The Future of Automotive Fuels",
                "Flue Gas Analysis to Determine Combustion Efficiency",
                "Automotive Structural Adhesives for Chassis Bonding",
                "Alternative Fuels – Benefits of CNG and LNG",
                "Polymer Matrix Composites in Lightweight Vehicles",
                "Mechanism of Lubrication in Engine Bearings",
                "Sustainable Energy Materials in EV Battery Chemistry",
                "Calorific Value of Different Automotive Fuels",
                "Reaction Kinetics of Fuel Combustion",
                "Hybrid Composites in High-Performance Auto Parts",
                "Bond Strength Testing of Industrial Adhesives"
            ],
            miniproject: [
                "Stoichiometric Air-Fuel Ratio Calculator App",
                "Fuel Calorific Value to Engine Output Converter",
                "Smart Coating Hydrophobic Contact Angle Measurer",
                "Flue Gas Composition Analyzer Software",
                "Lubricant Viscosity Index Calculator",
                "Hydrogen vs Petrol Combustion Energy Comparison Tool",
                "Engine Knocking Threshold Predictor based on Octane",
                "Automotive Adhesive Curing Time Estimator",
                "Composite Material Weight Saving Calculator",
                "Alternative Fuel Cost/Mileage Comparison Dashboard",
                "Virtual Flame Ionization Detector for Emissions",
                "Reaction Kinetics Cooling Curve Plotter",
                "Lubricant Film Thickness Estimator for Bearings",
                "Natural Gas vs Diesel Emission Footprint Calculator",
                "Bond Strength vs Temperature Curve Generator"
            ]
        }
    }
};

/* ══════════════════════════════════════════════════════════════════
 *  SEMESTER LABS — used when user selects "Practicals" type
 *  Key = semester number, value = array of lab entries
 * ══════════════════════════════════════════════════════════════════ */
const ATE_LABS = {
    /* Semester 2 Labs (Batch 2029 - R2025) */
    2: [
        {
            code: "ME25C05", name: "Re-Engineering for Innovation", experiments: [
                "Bootcamp 1: Introduction to Product Development, Reverse Engineering",
                "Bootcamp 1: Overview of the product lifecycle and hands-on disassembly of simple products",
                "Bootcamp 1: Practice of basic measurements and sketching",
                "Bootcamp 1: Introduction to CAD modeling of disassembled parts and virtual assembly",
                "Bootcamp 2: Embedded System Programming (Open-source platforms)",
                "Bootcamp 2: Practice of interfacing sensors and reading data",
                "Bootcamp 2: Automation in home, healthcare and agriculture",
                "Reverse Engineering: Sketch and prototype alternative designs",
                "Reverse Engineering: Group brainstorming sessions for product improvement",
                "Reverse Engineering: Manufacture prototype parts using 3D printing and workshop tools",
                "Reverse Engineering: Assemble prototype product and test",
                "Reverse Engineering: Final project demonstration and documentation"
            ]
        }
    ],
    /* Semester 4 Labs (Batch 2028) */
    4: [
        {
            code: "AU3411", name: "Vehicle Components Laboratory", experiments: [
                "Dismantling, measurement and assembling of 1000cc, Bus, V8, CRDI and MPFI engines",
                "Dismantling, measurement and assembling of single plate and diaphragm clutches",
                "Dismantling, calculation of gear ratio and assembling of constant mesh gearbox",
                "Dismantling, calculation of gear ratio and assembling of sliding mesh gearbox",
                "Dismantling and assembling of transfer case",
                "Dismantling, calculation of gear ratio and assembling of differential assembly",
                "Dismantling, measurement and assembling of front axle assembly",
                "Dismantling, measurement and assembling of rear axle assembly",
                "Study of different chassis layouts and frame types",
                "Study of different braking systems — drum and disc brakes",
                "Study of steering system — types and components",
                "Study of suspension system — types and shock absorbers"
            ]
        },
        {
            code: "AU3412", name: "Fuels and Lubricants Laboratory", experiments: [
                "Determination of flash point and fire point of petrol samples",
                "Determination of flash point and fire point of diesel samples",
                "Determination of kinematic viscosity of lubricating oil",
                "Determination of kinematic viscosity of gear oil",
                "Determination of calorific value of solid fuels",
                "Determination of calorific value of liquid fuels",
                "Determination of cloud point and pour point of diesel",
                "Determination of cloud point and pour point of biodiesel",
                "Determination of carbon residue using Conradson apparatus",
                "Determination of aniline point of diesel",
                "Determination of aniline point of petrol blend",
                "Determination of cetane number and diesel index",
                "Determination of penetration point of grease sample A",
                "Determination of softening point of grease sample B",
                "Drop point test and consistency test on chassis grease",
                "Drop point test and consistency test on wheel bearing grease",
                "Copper strip corrosion test on petrol samples",
                "Copper strip corrosion test on diesel samples",
                "Distillation test characteristics of petrol",
                "Distillation test characteristics of diesel"
            ]
        }
    ],
    /* Semester 6 Labs (Batch 2027) */
    6: [
        {
            code: "AU3611", name: "Computer Aided Vehicle Design and Analysis Laboratory", experiments: [
                /* Engine Design Experiments */
                "Design and modelling of piston, piston pin and piston rings",
                "Design and modelling of connecting rod assembly",
                "Design and modelling of crankshaft assembly and balancing weight calculations",
                "Design and modelling of flywheel",
                "Design and modelling of cam and camshaft",
                "Design and drawing of inlet and exhaust valves",
                /* Chassis Design Experiments */
                "Design and modelling of vehicle frame",
                "Design and modelling of clutch assembly",
                "Design and modelling of sliding mesh gearbox",
                "Design and modelling of propeller shaft with universal joint",
                "Design and modelling of front axle assembly",
                "Design and modelling of rear axle assembly"
            ]
        },
        {
            code: "AU3612", name: "Engine Testing and Emission Measurement Laboratory", experiments: [
                "Study and use of IC engine testing dynamometers (eddy current and hydraulic)",
                "Study and use of pressure pickups, charge amplifier, storage oscilloscope and signal analyzers",
                "Performance test on petrol engine — brake power, thermal efficiency and BSFC",
                "Performance test on diesel engine — brake power, thermal efficiency and BSFC",
                "Determination of frictional power on petrol engines using Morse test / retardation test",
                "Heat balance test on automotive diesel engine",
                "Study of NDIR Gas Analyser and Flame Ionisation Detector (FID)",
                "Study of Chemiluminescent NOx analyser",
                "Measurement of HC, CO, O2 and NOx using exhaust gas analyser",
                "Diesel smoke measurement using smoke opacity meter / Hartridge smoke meter",
                "Study of Constant Volume Sampling (CVS) system for emission testing",
                "Study of chassis dynamometer and emission test cycles"
            ]
        }
    ]
};
