/**
 * ATE_SUBJECTS — Subject database for SAM Assignment Generation
 * Contains: course name, unit titles, COs, objective, and
 *   curated topic lists for Presentation and Mini Project modes.
 */
const ATE_SUBJECTS = {

    /* ── ATE 2027 Batch – Semester 6 ───────────────────────────────── */
    "AU3601": {
        name: "Automotive Pollution and Control",
        objective: "To equip students with knowledge on harmful effects of major pollutants from IC engines, emission standards, pollution measurement devices, and control techniques.",
        units: {
            "1": "Emission From Automobiles",
            "2": "Emission From Spark Ignition Engines And Its Control",
            "3": "Emission From Compression Ignition Engines And Its Control",
            "4": "Noise Pollution From Automobiles",
            "5": "Test Procedures And Emission Measurements"
        },
        cos: {
            CO1: "Differentiate the various emissions formed in IC engines",
            CO2: "Analyze the effects of pollution on human health and environment",
            CO3: "Design the control techniques for minimizing emissions",
            CO4: "Categorize the emission norms",
            CO5: "Identify suitable methods to reduce the noise emissions"
        },
        unit_descs: {
            "1": "Sources of Pollution. Various emissions from Automobiles — Formation — Effects of pollutants on environment and human beings. Emission control techniques – Emission standards - National and international.",
            "2": "Emission formation in SI Engines - Carbon monoxide, Unburned hydrocarbon, NOx, Smoke — Effects of design and operating variables on emission formation — Controlling of pollutants — Catalytic converters, Charcoal Canister, Positive Crank case ventilation system, Secondary air injection, thermal reactor, Laser Assisted Combustion.",
            "3": "Formation of White, Blue, and Black Smokes, NOx, soot, sulphur particulate and Intermediate Compounds – Physical and Chemical delay — Significance Effect of Operating variables on Emission formation — Fumigation, EGR, HCCI, Particulate Traps, SCR — Cetane number Effect.",
            "4": "Sources of Noise — Engine Noise, Transmission Noise, vehicle structural Noise, aerodynamics noise, Exhaust Noise. Noise reduction in Automobiles — Encapsulation technique for noise reduction — Silencer Design.",
            "5": "Constant Volume Sampling (CVS1 & CVS3) Systems - Sampling Procedures — Chassis dyno - Seven mode and thirteen mode cycles for Emission Sampling — Sampling problems — World harmonized driving cycles — Emission analysers — NDIR, FID, Chemiluminescent, Smoke meters, Dilution Tunnel, SHED Test, Sound level meters. Particle counter."
        },
        topics: {
            presentation: [
                "Sources of Automobile Pollution and Their Environmental Impact",
                "Formation and Effects of Carbon Monoxide and Hydrocarbons in Vehicles",
                "National and International Emission Standards (BS6, Euro Norms)",
                "Pollutant Formation in Spark Ignition Engines",
                "Working Principle and Applications of Catalytic Converters",
                "Positive Crankcase Ventilation (PCV) and Charcoal Canister Systems",
                "Types of Smoke in Diesel Engines (White, Blue, Black)",
                "Exhaust Gas Recirculation (EGR) and Its Role in Emission Control",
                "Diesel Particulate Filter (DPF) and Selective Catalytic Reduction (SCR)",
                "Sources of Noise in Automobiles and Their Effects on Humans",
                "Methods for Noise Reduction in Vehicles (Silencer, Insulation, Encapsulation)",
                "Automobile Emission Testing Methods and Instruments (NDIR, FID, Smoke Meter)"
            ],
            miniproject: [
                "Comparative Study of BS6 and Euro VI Emission Standards",
                "Prototype Catalytic Converter for CO Reduction in SI Engines",
                "Charcoal Canister Model for Fuel Vapor Absorption",
                "Effect of Ignition Timing on Emission Levels in SI Engines (Simulation)",
                "EGR (Exhaust Gas Recirculation) Setup for NOx Reduction in CI Engines",
                "Particulate Trap Prototype for Diesel Soot Capture",
                "Fuel Quality vs. Smoke Formation: Diesel vs. Biodiesel Blends",
                "Noise Level Measurement of Different Vehicles Using Sound Meter Apps",
                "Silencer Design Experiment with Different Baffle Arrangements",
                "Encapsulation Technique for Engine Noise Reduction (Demo Box)",
                "Driving Cycle Emission Study: City vs. Highway Conditions",
                "Emission Analyzer Comparison: NDIR vs. FID vs. Smoke Meter"
            ]
        }
    },

    /* ── ATE 2028 Batch – Semester 4 ───────────────────────────────── */
    "AU3401": {
        name: "Fuels and Lubricants",
        objective: "To provide knowledge on refinery processes, properties and testing of fuels and lubricants used in automotive engines.",
        units: {
            "1": "Refinery Of Fuels And Lubricants",
            "2": "Theory Of Lubrication",
            "3": "Lubricants",
            "4": "Properties And Testing Of Fuels",
            "5": "Testing Instruments"
        },
        cos: {
            CO1: "Understand the role, properties and testing of various fuels",
            CO2: "Explain the refining process of petroleum",
            CO3: "Analyze the effects of engine friction and lubrication theory",
            CO4: "Compare different types of lubricants and additives",
            CO5: "Select appropriate fuels and lubricants for automotive applications"
        },
        unit_descs: {
            "1": "Petroleum refinery — Distillation — Cracking — Reforming — Blending — Properties of petrol and diesel — Alternative fuels.",
            "2": "Mechanisms of lubrication — Hydrodynamic, Hydrostatic, Elastohydrodynamic — Viscosity — Stribeck curve — Engine friction.",
            "3": "Types of lubricants — Engine oils — Gear oils — Greases — Additives — SAE grades — API classification.",
            "4": "Calorific value — Flash point — Fire point — Octane and Cetane numbers — Reid Vapor Pressure — Cloud and Pour point.",
            "5": "Bomb calorimeter — Pensky-Martens flash point tester — CFR engine — Viscometer — Spectrometer for fuel analysis."
        },
        topics: {
            presentation: [
                "Petroleum Refinery Processes: Distillation, Cracking & Reforming",
                "Properties of Petrol and Diesel: A Comparative Analysis",
                "Alternative Fuels in Automotive Industry (CNG, LPG, Hydrogen)",
                "Mechanisms of Lubrication: Hydrodynamic and EHD Lubrication",
                "Stribeck Curve and Engine Friction Analysis",
                "Types of Engine Oils and SAE/API Classification",
                "Lubricant Additives and Their Functions",
                "Octane Number and Knock in SI Engines",
                "Cetane Number and Ignition Delay in CI Engines",
                "Flash Point, Fire Point and Volatility of Fuels",
                "Calorific Value Measurement Using Bomb Calorimeter",
                "Fuel Testing Instruments: CFR Engine and Viscometer"
            ],
            miniproject: [
                "Comparative Analysis of Octane Ratings Using CFR Engine Data",
                "Biodiesel Blend Preparation and Calorific Value Measurement",
                "Flash Point Determination of Different Fuels (Lab Demo)",
                "Viscosity Measurement of Engine Oils at Different Temperatures",
                "Study of Grease vs. Oil Lubrication for Automotive Bearings",
                "Simulation of Petrol vs. Diesel Engine Efficiency",
                "Alternative Fuel Cost and Efficiency Comparison Chart",
                "Lubricant Degradation Study Under Simulated Engine Conditions",
                "Bomb Calorimeter Experiment: Fuel Calorific Value Testing",
                "Cloud and Pour Point Testing of Diesel Samples",
                "Stribeck Curve Plotting for Different Lubricant Grades",
                "Fuel Adulteration Detection Using Simple Test Methods"
            ]
        }
    },

    "AU3402": {
        name: "Automotive Chassis",
        objective: "To understand the design, construction and working principles of automotive chassis systems including steering, suspension, brakes and tyres.",
        units: {
            "1": "Introduction, Frame, Steering System",
            "2": "Propeller Shaft And Final Drive",
            "3": "Axles And Tyres",
            "4": "Suspension System",
            "5": "Braking System"
        },
        cos: {
            CO1: "Describe the layout and types of automotive chassis frames",
            CO2: "Explain the working of steering and propeller shaft systems",
            CO3: "Analyze axle configurations and tyre characteristics",
            CO4: "Describe different suspension system types and designs",
            CO5: "Explain braking systems and brake performance calculations"
        },
        unit_descs: {
            "1": "Types of frames — Conventional and integral frames — Steering geometry — Camber, Caster, KPI, Toe-in, Toe-out — Steering gearboxes — Power steering.",
            "2": "Propeller shaft — Universal joints — Hotchkiss drive — Final drive — Hypoid bevel gear — Differential — Limited slip differential.",
            "3": "front and rear axles — Stub axle — Axle loads — Tyre construction — Radial and Bias tyres — Tyre rotation — Wheel balancing.",
            "4": "Independent and dependent suspension — MacPherson strut — Double wishbone — Multi-link — Leaf spring — Coil spring — Air suspension — Anti-roll bar.",
            "5": "Drum brakes — Disc brakes — Hydraulic and pneumatic braking — ABS — EBD — Brake fade — Braking efficiency."
        },
        topics: {
            presentation: [
                "Types of Automotive Chassis Frames: Ladder, Monocoque and Backbone",
                "Steering Geometry: Camber, Caster, Toe-in and KPI Explained",
                "Power Steering Systems: Hydraulic vs. Electric Power Steering",
                "Universal Joints and Propeller Shaft: Working and Types",
                "Differential and Limited Slip Differential: Principle and Function",
                "Radial vs. Bias Ply Tyres: Construction and Performance Comparison",
                "Independent Suspension Systems: MacPherson Strut and Double Wishbone",
                "Leaf Spring and Coil Spring Suspension: Design and Application",
                "Drum Brakes vs. Disc Brakes: Construction and Performance",
                "Anti-lock Braking System (ABS) and Electronic Brakeforce Distribution (EBD)",
                "Air Suspension Systems in Commercial and Luxury Vehicles",
                "Tyre Rotation, Wheel Alignment and Balancing Procedures"
            ],
            miniproject: [
                "Steering Geometry Simulation Using CAD/GeoGebra",
                "Scale Model of MacPherson Strut Suspension",
                "Differential Assembly Study Using Toy/Scale Model",
                "Tyre Pressure vs. Fuel Economy: Data Analysis Study",
                "Hydraulic Brake Actuation Demonstration Setup",
                "Wheel Alignment Measurement Using String Method (Practical)",
                "Comparison of Braking Distance: ABS vs. Non-ABS (Simulation)",
                "Leaf Spring Deflection Experiment Under Loading",
                "DIY Rack and Pinion Steering Mechanism Model",
                "Universal Joint Angle vs. Speed Fluctuation Study",
                "Axle Load Distribution Analysis for a Given Vehicle",
                "Suspension Geometry Analysis Using Free-Body Diagrams"
            ]
        }
    },

    "AU3403": {
        name: "Vehicle Body Engineering",
        objective: "To provide knowledge of vehicle body construction, aerodynamics, materials and repair techniques for various types of vehicles.",
        units: {
            "1": "Car Body Details",
            "2": "Bus Body Details",
            "3": "Commercial Vehicle Details",
            "4": "Vehicle Aerodynamics",
            "5": "Body Materials, Trim, Mechanisms And Body Repair"
        },
        cos: {
            CO1: "Describe the construction and components of car and bus bodies",
            CO2: "Understand commercial vehicle body standards and construction",
            CO3: "Analyze aerodynamic forces acting on vehicle bodies",
            CO4: "Select appropriate body materials and evaluate their properties",
            CO5: "Apply body repair and restoration techniques correctly"
        },
        unit_descs: {
            "1": "Integral and non-integral construction — Body panels — Pillars — Roof structure — Floor pan — Doors and windows.",
            "2": "Bus body codes — AIS standards — Bus body framing — Seating layout — Gangway — Emergency exits.",
            "3": "Truck cab and body — Tipper body — Tanker body — Container body — Load body construction.",
            "4": "Aerodynamic drag coefficient — Lift and downforce — Air dam — Spoiler — Side skirts — Wind tunnel testing.",
            "5": "Steel, Aluminum, CFRP and plastics in body — Trim components — Hinges, latches, glass run channels — Dent repair — Panel beating — Painting."
        },
        topics: {
            presentation: [
                "Integral vs. Non-Integral Body Construction in Modern Vehicles",
                "Car Body Panels: Functions, Types and Manufacturing Processes",
                "AIS Standards and Bus Body Construction Requirements",
                "Bus Seating Layouts and Emergency Exit Regulations",
                "Commercial Vehicle Body Types: Tipper, Tanker and Container",
                "Aerodynamic Drag and Its Effect on Fuel Efficiency",
                "Aerodynamic Aids: Air Dam, Spoiler, Diffuser and Side Skirts",
                "Wind Tunnel Testing Methods for Vehicle Aerodynamics",
                "Advanced Body Materials: HSLA Steel, Aluminium and CFRP",
                "Vehicle Trim Components: Hinges, Latches and Glass Seals",
                "Dent Repair and Panel Beating Techniques",
                "Vehicle Painting Process: Primer, Base Coat and Clear Coat"
            ],
            miniproject: [
                "Clay Model of a Car Body with Aerodynamic Analysis",
                "Fabrication of a Simple Bus Body Frame Scale Model",
                "Wind Tunnel Experiment: Comparing Aerodynamic Shapes",
                "Drag Coefficient Calculation for Different Vehicle Models",
                "Study of CFRP vs. Steel in Light Vehicles: Weight Comparison",
                "Vehicle Body Colour and Heat Absorption Study",
                "Dent Removal Demo Using Heat Gun and Suction Cup",
                "Spoiler Effect on Rear Down-Force: Simple Experiment",
                "Door Hinge Mechanism and Anti-Intrusion Bar Design Study",
                "Emergency Exit Mechanism Prototype for Bus",
                "Tipper Truck Hydraulic Body Lifting Mechanism Model",
                "Paint Thickness Measurement on Different Body Panels"
            ]
        }
    },

    "AU3404": {
        name: "Automotive Transmission",
        objective: "To provide comprehensive knowledge of clutch, gearbox, hydrodynamic and automatic transmission systems in automobiles.",
        units: {
            "1": "Clutch",
            "2": "Gear Box",
            "3": "Hydrodynamic Transmission",
            "4": "Sustainability And Management",
            "5": "Automatic Transmission And Electric Drive"
        },
        cos: {
            CO1: "Describe the function and types of automotive clutch systems",
            CO2: "Analyze gear ratios and gearbox designs for different vehicles",
            CO3: "Explain hydrodynamic transmission principle and torque converter",
            CO4: "Evaluate sustainability measures in transmission design",
            CO5: "Describe automatic transmission and EV drive system components"
        },
        unit_descs: {
            "1": "Single plate and multi-plate clutch — Diaphragm spring clutch — Fluid coupling — Clutch actuation — Centrifugal clutch.",
            "2": "Sliding mesh, constant mesh, synchromesh — Planetary gearbox — Gear ratios — Transfer case — Four-wheel drive.",
            "3": "Torque converter — Turbine, pump and stator — Hydrodynamic clutch — Lock-up clutch — Fluid coupling applications.",
            "4": "Lightweight transmission — Recyclability — Energy-efficient lubricants — Noise reduction in gearboxes — Eco-friendly materials.",
            "5": "CVT — DCT — Automatic transmission controls — Electric motor basics — Battery management — Regenerative braking — Hybrid transmission."
        },
        topics: {
            presentation: [
                "Types of Clutches: Single Plate, Multi-Plate and Diaphragm Spring Clutch",
                "Sliding Mesh vs. Synchromesh Gearboxes: A Comparative Study",
                "Planetary Gearbox: Principle, Gear Ratios and Applications",
                "Four-Wheel Drive (4WD) and Transfer Case: Working and Types",
                "Torque Converter: Principle, Components and Performance",
                "Hydrodynamic vs. Mechanical Clutch: Differences and Applications",
                "Continuously Variable Transmission (CVT): Working and Advantages",
                "Dual Clutch Transmission (DCT): Fast Shifting Mechanism Explained",
                "Automatic Transmission Controls: Torque Converter + Planetary Gearset",
                "Electric Motor and Battery Management in EV Drivetrains",
                "Regenerative Braking: Energy Recovery in Hybrid and EV Systems",
                "Sustainability in Transmission: Lightweight Materials and Eco Lubricants"
            ],
            miniproject: [
                "Gear Ratio Calculation and Speed Chart for a 5-Speed Gearbox",
                "Clutch Slippage vs. Wear Analysis (Simulation Study)",
                "Torque Converter Performance Curve Plotting",
                "Scale Model of Planetary Gearbox with Multiple Gear Ratios",
                "CVT Belt and Pulley Demonstration Model",
                "Energy Recovery Efficiency Study: Regenerative Braking",
                "Hydrodynamic Coupling Fluid Velocity Analysis",
                "Automatic Transmission Control Logic Flowchart Design",
                "DCT Gear-Change Time Comparison vs. Manual Transmission",
                "Battery State-of-Charge vs. Range Calculator (EV Project)",
                "Lightweight Gearbox Material Comparison: Steel vs. Aluminium",
                "Manual to Automatic Transmission Retrofit: Feasibility Study"
            ]
        }
    },

    "ML3391": {
        name: "Mechanics of Solids",
        objective: "To understand the principles of solid mechanics including stress, strain, bending, torsion and deflection of structural elements.",
        units: {
            "1": "Stress, Strain And Deformation Of Solids",
            "2": "Transverse Loading On Beams And Stresses In Beam",
            "3": "Torsion",
            "4": "Deflection Of Beams",
            "5": "Thick And Thin Shells And Principal Stresses"
        },
        cos: {
            CO1: "Compute stresses and strains in simple and compound structural members",
            CO2: "Analyze bending stresses and shear forces in beams",
            CO3: "Calculate torsional stress and power transmission in shafts",
            CO4: "Determine deflection of beams using Macaulay and energy methods",
            CO5: "Analyze stresses in thick and thin cylinders and determine principal stresses"
        },
        unit_descs: {
            "1": "Simple stresses and strains — Elastic constants — Poisson's ratio — Compound bars — Thermal stresses — Strain energy.",
            "2": "Shear force and bending moment — Theory of simple bending — Bending stress — Shear stress in beams — Flitched beams.",
            "3": "Torsion of circular shafts — Power transmitted — Shear stress distribution — Close-coiled helical springs.",
            "4": "Deflection of simply supported and cantilever beams — Macaulay method — Moment area method — Conjugate beam method.",
            "5": "Thin cylinder and sphere — Lame's equation — Thick cylinders — Strain energy of dilation and distortion — Principal planes."
        },
        topics: {
            presentation: [
                "Stress-Strain Relationship and Hooke's Law: Theory and Applications",
                "Elastic Constants: Young's Modulus, Poisson's Ratio and Bulk Modulus",
                "Compound Bars and Thermal Stresses in Composite Members",
                "Shear Force and Bending Moment Diagram Construction",
                "Theory of Simple Bending and Flexural Formula Derivation",
                "Shear Stress Distribution in Rectangular and I-Sections",
                "Torsion of Solid and Hollow Circular Shafts",
                "Power Transmission in Shafts: Design for Torque and Angle of Twist",
                "Deflection of Beams: Macaulay's Method with Examples",
                "Moment Area and Conjugate Beam Methods for Deflection",
                "Thin Cylinders: Hoop Stress and Longitudinal Stress Analysis",
                "Principal Planes and Principal Stresses: Mohr's Circle Method"
            ],
            miniproject: [
                "Beam Deflection Measurement Setup Using Simple Loading Jig",
                "Stress-Strain Curve Plotting for Steel Specimen (Tensile Test Data)",
                "Compound Bar Thermal Stress Analysis Using FEM Simulation",
                "Shear Force and BM Diagram for Complex Loading (MATLAB/Python)",
                "Torsion Testing of Mild Steel Rod: Twist Angle vs. Torque Plot",
                "Spring Stiffness Determination Using UTM Test Data",
                "Mohr's Circle Plotting Program for Given Stress State",
                "Beam Bending Simulation Using Abaqus/SolidWorks FEA",
                "Thin Cylinder Pressure Test: Strain Gauge Measurement Study",
                "Principal Stress Determination Using Photoelastic Coating",
                "Deflection of Cantilever Beam: Experimental vs. Theoretical",
                "Helical Spring Design Project for Automotive Suspension Application"
            ]
        }
    },

    /* ── ATE 2029 Batch – Semester 2 (R2025) ──────────────────────── */
    "MA3251": {
        name: "Statistics and Numerical Methods",
        objective: "To equip students with statistical testing and numerical techniques for solving engineering problems.",
        units: {
            "1": "Testing Of Hypothesis",
            "2": "Design Of Experiments",
            "3": "Solution Of Equations And Eigenvalue Problems",
            "4": "Interpolation, Numerical Differentiation And Integration",
            "5": "Numerical Solution Of Ordinary Differential Equations"
        },
        cos: {
            CO1: "Apply hypothesis testing techniques including t, F and χ² tests",
            CO2: "Design and analyze experiments using ANOVA and factorial designs",
            CO3: "Solve linear systems and find eigenvalues using numerical methods",
            CO4: "Interpolate, differentiate and integrate using numerical techniques",
            CO5: "Solve ODEs numerically using Euler, Runge-Kutta and multistep methods"
        },
        unit_descs: {
            "1": "Large sample test — Small sample test — t test — F test — Chi-square test — Goodness of fit.",
            "2": "One-way and two-way ANOVA — Factorial 2² and 2³ designs — Latin square design.",
            "3": "Direct methods — Gauss-Jacobi — Gauss-Seidel — Eigenvalue: Power method — Jacobi method.",
            "4": "Lagrange — Newton's divided differences — Spline — Numerical differentiation — Trapezoidal — Simpson's rules — Gaussian quadrature.",
            "5": "Taylor's method — Euler's method — Modified Euler — Runge-Kutta 4th order — Predictor-Corrector: Milne and Adam's methods."
        },
        topics: {
            presentation: [
                "Hypothesis Testing: t-Test and F-Test with Automotive Data Examples",
                "Chi-Square Test: Goodness of Fit and Independence Testing",
                "One-Way and Two-Way ANOVA: Applications in Quality Control",
                "Factorial Experimental Design: 2² and 2³ Design Analysis",
                "Gauss-Jacobi and Gauss-Seidel Methods for Linear System Solution",
                "Eigenvalue Problems: Power Method and Engineering Applications",
                "Lagrange Interpolation and Newton's Divided Difference Formula",
                "Cubic Spline Interpolation: Smooth Curve Fitting in Engineering",
                "Numerical Integration: Trapezoidal Rule and Simpson's 1/3 Rule",
                "Gaussian Quadrature for High-Accuracy Numerical Integration",
                "Euler and Modified Euler Methods for ODE Solving",
                "Runge-Kutta 4th Order Method: Step-by-Step Derivation and Examples"
            ],
            miniproject: [
                "Statistical Analysis of Emission Data Using t-Test and F-Test",
                "ANOVA Study of Engine Performance Under Different Fuel Blends",
                "2² Factorial Design for Optimizing Engine Parameters",
                "Gauss-Seidel Solver for Structural Stiffness Matrix",
                "Eigenvalue Analysis of Vibrating Mechanical System",
                "Lagrange Interpolation Program for Experimental Data",
                "Spline Curve Fitting for Vehicle Speed Profile Data",
                "Numerical Integration of Thrust vs. Time Curve (Area Calculation)",
                "ODE Solution for Vehicle Dynamics Equation: Euler vs. RK4",
                "Runge-Kutta 4th Order Simulation of Oscillation System",
                "Statistical Quality Control Dashboard Using Excel/Python",
                "Predictor-Corrector Method for Solving Heat Transfer Equation"
            ]
        }
    },

    "PH3251": {
        name: "Materials Science",
        objective: "To develop understanding of crystal structure, electrical, magnetic, optical and nano-scale material properties for engineering applications.",
        units: {
            "1": "Crystallography",
            "2": "Electrical And Magnetic Properties Of Materials",
            "3": "Semiconductors And Transport Physics",
            "4": "Optical Properties Of Materials",
            "5": "Nanoelectronic Devices"
        },
        cos: {
            CO1: "Understand crystal structures, lattice parameters and X-ray diffraction",
            CO2: "Analyze electrical conductivity, magnetic domains and hysteresis",
            CO3: "Explain carrier concentration, mobility and Hall effect in semiconductors",
            CO4: "Describe optical absorption, emission and photonic phenomena",
            CO5: "Identify the properties and applications of nanomaterials and nanodevices"
        },
        unit_descs: {
            "1": "Crystal systems — Bravais lattices — Miller indices — X-ray diffraction — Bragg's law — Crystal imperfections.",
            "2": "Classical free electron theory — Band theory — Conductors, semiconductors and insulators — Magnetic materials — Hysteresis.",
            "3": "Intrinsic and extrinsic semiconductors — Fermi level — Carrier concentration — Mobility — Hall effect.",
            "4": "Optical absorption — Photoconductivity — Lasers — Optical fibres — LED working.",
            "5": "Quantum confinement — Quantum dots — Carbon nanotubes — MEMS — Nano sensors and applications."
        },
        topics: {
            presentation: [
                "Crystal Systems and Bravais Lattices: Classification and Examples",
                "Miller Indices and Crystallographic Directions in Cubic Systems",
                "X-Ray Diffraction and Bragg's Law: Crystal Structure Analysis",
                "Band Theory of Solids: Conductors, Semiconductors and Insulators",
                "Magnetic Materials: Ferromagnetism, Hysteresis and BH Curve",
                "Semiconductors: Intrinsic vs. Extrinsic and Fermi Level Shift",
                "Hall Effect: Principle, Setup and Applications in Sensing",
                "Optical Absorption and Photoconductivity in Materials",
                "LASER: Construction, Working Principle and Engineering Applications",
                "Optical Fibre: Principle of Total Internal Reflection and Data Transmission",
                "Quantum Confinement and Properties of Quantum Dots",
                "Carbon Nanotubes and MEMS: Properties and Applications"
            ],
            miniproject: [
                "Crystal Structure Modeling Using 3D Printed/Clay Models",
                "X-Ray Diffraction Data Analysis Using VESTA Software",
                "Hysteresis Loop Plotting for Soft and Hard Magnetic Materials",
                "Hall Effect Measurement Setup and Carrier Density Calculation",
                "Photoconductivity Demonstration Using LDR Circuit",
                "LED Emission Spectrum Analysis Using Diffraction Grating",
                "Optical Fibre Light Transmission Efficiency Test",
                "Nanoparticle Size vs. Optical Property Simulation",
                "MEMS Cantilever Deflection Simulation Using COMSOL",
                "Quantum Dot Fluorescence Demonstration (Literature Study)",
                "Carbon Nanotube Properties Comparison Chart: SWCNT vs. MWCNT",
                "Band Gap Estimation of Semiconductor Using Simple Circuit"
            ]
        }
    },

    "BE3251": {
        name: "Basic Electrical and Electronics Engineering",
        objective: "To provide foundational knowledge of electrical circuits, machines, analog and digital electronics, and measurements.",
        units: {
            "1": "Electrical Circuits",
            "2": "Electrical Machines",
            "3": "Analog Electronics",
            "4": "Digital Electronics",
            "5": "Measurements And Instrumentation"
        },
        cos: {
            CO1: "Analyze DC and AC electrical circuits using standard theorems",
            CO2: "Describe the working of transformers, DC and AC motors",
            CO3: "Explain the operation of diodes, transistors and amplifiers",
            CO4: "Design and analyze combinational and sequential digital circuits",
            CO5: "Apply measuring instruments and transducers for engineering parameters"
        },
        unit_descs: {
            "1": "Ohm's law — Kirchhoff's laws — Thevenin's and Norton's theorem — AC circuits — RLC — Power factor.",
            "2": "Transformer — DC motor — AC motor — Induction motor — Stepper motor.",
            "3": "PN junction diode — Rectifiers — Bipolar junction transistor — FET — Op-Amp applications.",
            "4": "Number systems — Logic gates — Boolean algebra — Combinational circuits — Flip-flops — Registers and counters.",
            "5": "CRO — Multimeter — Energy meter — Transducers — Strain gauge — Thermocouple — LVDT."
        },
        topics: {
            presentation: [
                "Ohm's Law and Kirchhoff's Laws: Analysis of DC Circuits",
                "Thévenin's and Norton's Theorems: Simplification of Complex Circuits",
                "AC Circuits: RLC Series and Parallel Resonance",
                "Transformer: Working Principle and Efficiency Calculation",
                "DC Motor: Types, Back EMF and Speed Control Methods",
                "Induction Motor: Rotating Magnetic Field and Slip Analysis",
                "PN Junction Diode: Working, V-I Characteristics and Rectification",
                "BJT Transistor: Configurations, Biasing and Amplifier Operation",
                "Operational Amplifier (Op-Amp): Ideal Characteristics and Applications",
                "Logic Gates and Boolean Algebra: Simplification Using K-Map",
                "Flip-Flops: SR, JK, D and T Types with Applications",
                "Instruments and Transducers: Strain Gauge, LVDT and Thermocouple"
            ],
            miniproject: [
                "Design and Build a Full-Wave Bridge Rectifier Circuit",
                "Thevenin Equivalent Circuit Verification (Breadboard Experiment)",
                "DC Motor Speed Control Using PWM (Arduino Project)",
                "Transformer Efficiency Measurement at Different Loads",
                "MOSFET as a Switch: LED Dimmer Circuit",
                "Op-Amp Inverting Amplifier Design and Testing",
                "4-Bit Binary Counter Using JK Flip-Flops",
                "7-Segment Display with BCD Decoder Circuit",
                "Digital Multimeter Usage and Error Analysis Project",
                "Thermocouple Temperature Logger Using Arduino",
                "LVDT Working Demonstration and Displacement Measurement",
                "Logic Gate Implementation Using NAND Gates (Universal Gate)"
            ]
        }
    },

    "GE3251": {
        name: "Engineering Graphics",
        objective: "To develop the ability to draw, read and interpret engineering drawings using standard projection methods.",
        units: {
            "1": "Plane Curves",
            "2": "Projection Of Points, Lines And Plane Surface",
            "3": "Projection Of Solids And Freehand Sketching",
            "4": "Projection Of Sectioned Solids And Development Of Surfaces",
            "5": "Isometric And Perspective Projections"
        },
        cos: {
            CO1: "Draw standard plane curves using geometric construction methods",
            CO2: "Project points, lines and plane surfaces in first and third angle projection",
            CO3: "Draw projections and freehand sketches of common solids",
            CO4: "Draw sectional views and develop surfaces of solids",
            CO5: "Produce isometric and perspective drawings of engineering objects"
        },
        unit_descs: {
            "1": "Curves — Ellipse, Parabola, Hyperbola, Cycloid, Involute, Spiral construction methods.",
            "2": "First and third angle projections — projection of points — lines inclined to planes — projection of plane figures.",
            "3": "Prism, cylinder, pyramid, cone, sphere projections — freehand sketching techniques.",
            "4": "Sections of solids — True shape — Development of cylinder, cone, prism surfaces.",
            "5": "Isometric scale — Isometric views of simple objects — Perspective projection by visual ray method."
        },
        topics: {
            presentation: [
                "Engineering Drawing Standards and Conventions (BIS/ISO)",
                "Construction of Ellipse: Concentric Circle, Oblong and Eccentricity Methods",
                "Cycloidal Curves: Epicycloid and Hypocycloid Applications",
                "First Angle vs. Third Angle Projection: International Standards",
                "Projection of Lines Inclined to Both Planes: Finding True Length",
                "Projection of Inclined Plane Surfaces: Practical Applications",
                "Orthographic Projection of Prism, Pyramid and Cylinder",
                "Freehand Sketching Techniques for Engineering Communication",
                "Sectional Views: Full Section, Half Section and Revolved Section",
                "Development of Lateral Surfaces: Cylinder and Cone Unfolding",
                "Isometric Drawing vs. Perspective Drawing: Key Differences",
                "Perspective Projection: Visual Ray Method for 3D Object Drawing"
            ],
            miniproject: [
                "3D Modeling of Mechanical Part Using SolidWorks/AutoCAD",
                "Drawing a Complete Set of Orthographic Views from a 3D Object",
                "Construction of Involute Gear Tooth Profile",
                "Pattern Layout for Sheet Metal Box Using Development Method",
                "Isometric Drawing of a Machine Component (Bracket/Flange)",
                "Engineering Drawing Portfolio: Projection Set of 5 Objects",
                "Comparison of Manual Drawing vs. CAD Drawing for a Component",
                "Cone Development: Pattern Cutting and Folding Exercise",
                "Ellipse Drawing Using String and Pins Method (Practical)",
                "Freehand Sketch Portfolio of Common Machine Parts",
                "Sectioned Assembly Drawing of Simple Machine (Vice/Clamp)",
                "Augmented Reality Engineering Drawing App Exploration Report"
            ]
        }
    },

    "GE3271": {
        name: "Engineering Practices Laboratory",
        objective: "To provide hands-on experience in basic electrical, electronics, workshop and measurement practices for engineering students.",
        units: {
            "1": "Electrical Experiments",
            "2": "Electronics Experiments",
            "3": "Workshop Practice - Fitting and Plumbing",
            "4": "Workshop Practice - Welding and Sheet Metal",
            "5": "Workshop Practice - Carpentry and Machine Shop"
        },
        cos: {
            CO1: "Perform basic electrical wiring and safety practices",
            CO2: "Assemble and test basic electronics circuits",
            CO3: "Perform fitting, plumbing and pipe work operations",
            CO4: "Execute welding, soldering and sheet metal operations",
            CO5: "Demonstrate carpentry and CNC machine operations"
        },
        unit_descs: {
            "1": "Wiring: staircase, go-down — Fluorescent lamp — Three-phase motor starter — Earth resistance measurement.",
            "2": "Rectifier — Amplifier — Oscillator — Soldering practice — PCB design.",
            "3": "Filing — Drilling — Tapping — Plumbing joints — Pipe fitting.",
            "4": "Arc welding — Gas welding — TIG/MIG — Tin smithy — Sheet metal cutting, bending, riveting.",
            "5": "Carpentry joints — Lathe operations — Drilling — Milling — CNC programming introduction."
        },
        topics: {
            presentation: [
                "Electrical Safety Practices and IS Codes for Building Wiring",
                "Staircase and Godown Wiring: Working and Circuit Diagram",
                "Three-Phase Motor Starter Wiring and Safety Interlocks",
                "PCB Design Process: From Schematic to Finished Board",
                "Soldering Techniques and Quality Inspection Methods",
                "Fitting Operations: Marking, Filing, Drilling and Tapping",
                "Plumbing Joints: Types and Best Practices",
                "Arc Welding and TIG Welding: Process Comparison",
                "Sheet Metal Operations: Cutting, Bending and Riveting",
                "Carpentry Joints: Mortise-Tenon, Lap Joint and Butt Joint",
                "Lathe Machine: Operations and Tool Geometry",
                "CNC Programming Basics: G-Codes and M-Codes Introduction"
            ],
            miniproject: [
                "Wiring a Staircase Lighting Control System (Physical Demo)",
                "Three-Phase DOL Starter Wiring and Testing",
                "PCB Fabrication for a Simple LED Blinker Circuit",
                "Soldering Workshop: Assemble a Basic FM Radio Kit",
                "Plumbing Pipe Joint Assembly and Leak Testing",
                "Fitting Exercise: Filing a Square/Hexagon Profile",
                "Welding Practice: Butt and Lap Joints Strength Comparison",
                "Sheet Metal Box Fabrication: Cutting, Bending and Riveting",
                "Woodworking Project: Making a Lap Joint Wooden Frame",
                "Lathe Turning: Step Turning and Taper Turning Exercise",
                "Basic CNC Part Programming: Machining a Simple Contour",
                "Workshop Safety Audit Checklist and Safety Equipment Report"
            ]
        }
    },

    "BE3271": {
        name: "Basic Electrical and Electronics Engineering Laboratory",
        objective: "To provide practical exposure to electrical circuits, electronic components and measurement techniques.",
        units: {
            "1": "Electrical Circuits Lab",
            "2": "Machines Lab",
            "3": "Electronics Lab",
            "4": "Digital Electronics Lab",
            "5": "Measurement Lab"
        },
        cos: {
            CO1: "Verify basic circuit theorems through laboratory experiments",
            CO2: "Determine performance characteristics of electrical machines",
            CO3: "Test diode, transistor and op-amp circuits experimentally",
            CO4: "Verify truth tables for logic gates and combinational circuits",
            CO5: "Use measuring instruments and transducers correctly"
        },
        unit_descs: {
            "1": "Verification of Thevenin, Norton, Superposition — RLC transient — Power factor measurement.",
            "2": "DC motor characteristics — Transformer OC and SC test — Speed control.",
            "3": "Rectifier characteristics — BJT amplifier — Op-Amp inverting/non-inverting.",
            "4": "Logic gate truth table — Half adder — Full adder — Flip-flop truth table.",
            "5": "Multimeter — CRO — Transducer calibration — Strain gauge bridge."
        },
        topics: {
            presentation: [
                "Verification of Thevenin's Theorem: Lab Procedure and Results",
                "Superposition Theorem Experiment: Analysis and Discussion",
                "DC Motor Speed Control: Lab Data Interpretation",
                "Transformer Open Circuit and Short Circuit Tests: Efficiency Calculation",
                "Half-Wave and Full-Wave Rectifier: V-I Characteristic Curves",
                "BJT Transistor Amplifier: Gain and Bandwidth Measurements",
                "Op-Amp Circuit Verification: Inverting and Non-Inverting Amplifier",
                "Logic Gates Truth Table Verification: NAND, NOR and XOR",
                "Half Adder and Full Adder Circuit Design and Testing",
                "JK Flip-Flop Truth Table and Timing Diagram Verification",
                "CRO Usage for Waveform Measurement: Demonstrations",
                "Strain Gauge Bridge Calibration and Measurement Lab"
            ],
            miniproject: [
                "Lab Report Compilation: DC Circuit Theorems Verification Series",
                "Transformer Efficiency Curve Plotting from Experimental Data",
                "Audio Amplifier Using BJT: Build and Test",
                "Op-Amp Function Generator: Square and Triangle Wave Output",
                "4-bit Adder Circuit on Breadboard: Add and Carry Logic",
                "Digital Clock Circuit Using Flip-Flop Counters",
                "CRO Lissajous Figures: Frequency and Phase Measurement",
                "Strain Gauge Load Cell: Weight Measurement System",
                "Speed Control of DC Motor Using Arduino PWM",
                "Rectifier Circuit Ripple Factor Reduction Using Capacitor Filter",
                "Lab Safety and Equipment Care: Comprehensive Guide Project",
                "Comparative Report: Analogue vs. Digital Measurement Instruments"
            ]
        }
    }
};
