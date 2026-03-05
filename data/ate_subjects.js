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
     *  SEMESTER  2  —  BATCH 2029  (R2021 Common)
     * ══════════════════════════════════════════════════════════════════ */

    "MA3251": {
        name: "Statistics and Numerical Methods",
        semester: 2,
        objective: "To acquaint the knowledge of testing of hypothesis for small and large samples, design of experiments and to introduce the basic concepts of numerical methods and their applications.",
        units: {
            1: { title: "Testing of Hypothesis", desc: "Sampling distributions – Estimation of parameters – Statistical Hypothesis – Large sample tests based on Normal distribution for single mean and difference of means – Tests based on t, F and Chi-square distributions for mean, variance and proportion – Goodness of fit." },
            2: { title: "Design of Experiments", desc: "One way and Two way classifications - Completely Randomized Design – Randomized Block Design – Latin Square Design – 2 power 2 Factorial Design." },
            3: { title: "Solution of Equations and Eigenvalue Problems", desc: "Solution of algebraic and transcendental equations – Fixed point iteration method – Newton Raphson method – Solution of linear system of equations – Gauss elimination method – Pivoting – Gauss Jordan method – Iterative methods of Gauss Jacobi and Gauss Seidel – Eigen values of a matrix by Power method and Jacobi's method." },
            4: { title: "Interpolation, Numerical Differentiation and Integration", desc: "Lagrange's and Newton's divided difference interpolations – Newton's forward and backward difference interpolation – Approximation of derivatives using interpolation polynomials – Numerical single and double integrations using Trapezoidal and Simpson's 1/3 rules." },
            5: { title: "Numerical Solution of Ordinary Differential Equations", desc: "Single step methods: Taylor's series method – Euler's method – Modified Euler's method – Fourth order Runge – Kutta method for solving first order equations – Multi step methods: Milne's and Adams – Bash forth predictor corrector methods for solving first order equations." }
        },
        cos: {
            CO1: "Apply the concept of testing of hypothesis for small and large samples in real life problems.",
            CO2: "Apply the concept of design of experiments in the field of agriculture and statistical quality control.",
            CO3: "Appreciate the numerical techniques of solving algebraic and transcendental equations.",
            CO4: "Apply numerical techniques in interpolation, differentiation and integration.",
            CO5: "Solve ordinary differential equations numerically using single and multi-step methods."
        },
        topics: {
            presentation: [
                "Sampling Distributions and Parameter Estimation",
                "Large Sample Tests – Z Test for Single and Difference of Means",
                "Small Sample Tests – t, F and Chi-Square Distributions",
                "One Way and Two Way ANOVA Classification",
                "Latin Square Design and Factorial Experiments",
                "Newton Raphson Method – Algorithm and Applications",
                "Gauss Elimination and Gauss Jordan Methods",
                "Iterative Methods – Gauss Jacobi and Gauss Seidel",
                "Lagrange's and Newton's Divided Difference Interpolation",
                "Simpson's 1/3 Rule and Trapezoidal Rule for Numerical Integration",
                "Runge-Kutta Fourth Order Method for ODE",
                "Adams-Bashforth Predictor Corrector Method"
            ],
            miniproject: [
                "Statistical Hypothesis Testing Tool Using Python",
                "ANOVA Calculator Application for Agricultural Data",
                "Root Finding Visualizer – Newton Raphson and Fixed Point Iteration",
                "Linear System Solver – Gauss Elimination with Pivoting",
                "Eigenvalue Calculator Using Power Method with GUI",
                "Interpolation Polynomial Plotter Using Lagrange's Method",
                "Numerical Differentiation and Integration Web Calculator",
                "ODE Solver Comparison – Euler vs Runge-Kutta Methods",
                "Statistical Quality Control Chart Generator",
                "Excel-Based Design of Experiments Tool",
                "Simpson's Rule Area Calculator for Engineering Curves",
                "Milne's Predictor-Corrector Method Step-by-Step Simulator"
            ]
        }
    },

    "PH3251": {
        name: "Materials Science",
        semester: 2,
        objective: "To introduce the essential principles of crystal structures, mechanical properties of materials, dielectric and magnetic properties, ceramics, composites and semiconducting materials.",
        units: {
            1: { title: "Crystal Physics", desc: "Lattice – Unit cell – Bravais lattices – Lattice planes – Miller indices – d spacing in cubic lattice – Calculation of number of atoms per unit cell – Atomic radius – Coordination number – Packing factor for SC, BCC, FCC and HCP structures – Diamond and graphite structures – Crystal imperfections: Point, line, surface and volume defects." },
            2: { title: "Properties of Materials and Testing", desc: "Stress and Strain – Stress-Strain diagram – Elastic modulus – Poisson's ratio – Relationship between elastic constants – Hardness – Types of hardness testing methods – Brinell, Vickers, Rockwell and Micro-hardness – Fatigue – Creep – Fracture – Types of fracture." },
            3: { title: "Dielectric and Magnetic Properties", desc: "Electrical susceptibility – Dielectric constant – Polarization - Types of polarization – Equation of internal field in liquids and solids – Clausius-Mosotti equation – Piezo – Ferro and Pyro electricity – Frequency dependence of dielectric constant – Classification of magnetic materials – Domain theory of ferromagnetism – Hysteresis – Applications." },
            4: { title: "Ceramics, Composites and Nanomaterials", desc: "Classification of ceramics – Properties and applications of ceramics – Classification of composites – Fibre reinforced composites – Particle reinforced composites – Applications – Nano materials – Properties and applications – Carbon nanotubes – Synthesis of nanomaterials: Top down approach – Ball milling, Bottom up approach – Sol-gel, CVD." },
            5: { title: "Semiconducting Materials", desc: "Intrinsic semiconductor – Carrier concentration derivation – Fermi level – Hall effect – Determination of Hall coefficient – Experimental determination of band gap – Direct band gap and indirect band gap – Elemental and compound semiconductors – Applications of Hall effect – Semiconductor devices." }
        },
        cos: {
            CO1: "Appreciate the knowledge of crystal structures and crystal imperfections.",
            CO2: "Understand the mechanical properties of materials in engineering applications.",
            CO3: "Explain the dielectric and magnetic properties of materials.",
            CO4: "Describe ceramics, composites, and nanomaterials with their applications.",
            CO5: "Relate the semiconductor properties and Hall effect for device applications."
        },
        topics: {
            presentation: [
                "Crystal Systems, Bravais Lattices and Miller Indices",
                "Packing Factor Calculation for SC, BCC, FCC and HCP",
                "Crystal Imperfections – Point, Line and Surface Defects",
                "Stress-Strain Diagram and Elastic Constants Relationship",
                "Hardness Testing Methods – Brinell, Vickers, Rockwell",
                "Polarization Types and Clausius-Mosotti Equation",
                "Piezoelectricity, Ferroelectricity and Pyroelectricity",
                "Domain Theory of Ferromagnetism and Hysteresis Loop",
                "Ceramics – Classification, Properties and Applications",
                "Composites – Fibre and Particle Reinforced Types",
                "Nanomaterials Synthesis – Ball Milling, Sol-Gel, CVD",
                "Hall Effect – Coefficient Determination and Applications"
            ],
            miniproject: [
                "Build a simple 3D unit cell model using craft materials",
                "Demonstrate point, line and surface defects using a physical model",
                "Conduct a simple hooke's law experiment using rubber bands",
                "Test and compare the scratch hardness of common household materials",
                "Create a simple homemade electromagnet and test its strength",
                "Visualize magnetic field lines using iron filings and magnets",
                "Test the thermal insulation properties of different ceramic materials",
                "Fabricate a simple composite material using paper and glue (papier-mâché)",
                "Build a simple water filter using activated carbon",
                "Measure the conductivity of different water solutions (salt, sugar)",
                "Create a simple LED circuit to demonstrate semiconductor behavior",
                "Demonstrate the Tyndall effect using common household colloidal solutions"
            ]
        }
    },

    "BE3251": {
        name: "Basic Electrical and Electronics Engineering",
        semester: 2,
        objective: "To introduce the basics of electric circuits, electrical machines, and electronic devices for understanding electrical and electronics engineering fundamentals.",
        units: {
            1: { title: "DC Circuits and AC Circuits", desc: "Ohm's law – Kirchhoff's laws – Series and parallel combinations of resistances – Mesh and Node analysis – Star-Delta transformation – AC fundamentals – Representation of sinusoidal waveforms – Peak, RMS and Average values – Form factor and peak factor – Impedance – Power factor – Power in AC circuits – Single phase and three phase balanced circuits." },
            2: { title: "Electrical Machines", desc: "Construction and principle of DC motors – Types of DC motors – Speed control of DC motors – Single phase transformer – EMF equation – Voltage regulation – Construction and principle of three phase induction motor – Slip – Applications." },
            3: { title: "Utilization of Electrical Energy", desc: "Renewable energy sources – Wind energy, Solar energy – Concept of domestic wiring – Staircase wiring – Godown wiring – Electrical safety – Fuses – MCB – ELCB – Earthing – Energy conservation and audit." },
            4: { title: "Electronic Devices and Circuits", desc: "PN junction diode – Zener diode – Bipolar Junction Transistor (BJT) – Operating point – Transistor as a switch – MOSFET – Operational amplifier – Inverting and Non-inverting amplifier – Applications: Adder, Subtractor, Integrator, Differentiator." },
            5: { title: "Digital Electronics", desc: "Number systems – Decimal, Binary, Octal and Hexadecimal – Boolean algebra – Logic gates – De Morgan's theorems – K-Map simplification – Half adder and Full adder – Flip-flops: SR, JK, D and T – Counters and Shift registers." }
        },
        cos: {
            CO1: "Analyze DC and AC circuits using network theorems.",
            CO2: "Understand the construction and working of electrical machines.",
            CO3: "Apply concepts of wiring and energy conservation in practical scenarios.",
            CO4: "Describe the working of electronic devices and op-amp circuits.",
            CO5: "Design simple combinational and sequential digital circuits."
        },
        topics: {
            presentation: [
                "Kirchhoff's Laws and Mesh-Node Analysis Methods",
                "Star-Delta Transformation and AC Impedance Circuits",
                "Single Phase and Three Phase Balanced AC Circuits",
                "DC Motor Types and Speed Control Methods",
                "Single Phase Transformer – EMF Equation and Regulation",
                "Three Phase Induction Motor – Construction and Slip",
                "Solar and Wind Energy Systems Overview",
                "Electrical Safety – Fuses, MCB, ELCB and Earthing",
                "PN Junction Diode and Zener Diode Characteristics",
                "Operational Amplifier – Inverting and Non-Inverting Circuits",
                "Boolean Algebra, Logic Gates and K-Map Simplification",
                "Flip-Flops, Counters and Shift Registers"
            ],
            miniproject: [
                "DC Circuit Simulator Using Kirchhoff's Laws",
                "AC Power Factor Calculator for Single and Three Phase Circuits",
                "DC Motor Speed Control Using Arduino",
                "Transformer Efficiency Test and EMF Equation Verification",
                "Solar Panel I-V Characteristic Measurement",
                "Home Wiring Model with Safety Devices (MCB, ELCB)",
                "PN Junction Diode Characteristic Curve Plotter",
                "Op-Amp Based Adder and Subtractor Circuit Breadboard Demo",
                "Logic Gate Tester Using LED Display",
                "K-Map Simplification Tool Web Application",
                "4-Bit Counter Design Using JK Flip-Flops",
                "Energy Audit Calculator for Domestic Consumption"
            ]
        }
    },

    "BE3271": {
        name: "Basic Electrical and Electronics Engineering Laboratory",
        semester: 2,
        objective: "To verify basic electrical and electronics theories through practical experiments and build foundational circuit skills.",
        units: {
            1: { title: "Basic Circuits", desc: "Basic electrical circuit verification" },
            2: { title: "Machines", desc: "Electrical individual machine tests" },
            3: { title: "Electronics", desc: "Basic electronic component characteristics" },
            4: { title: "Digital", desc: "Digital logic verifications" },
            5: { title: "AC Power", desc: "AC power characteristics" }
        },
        cos: {
            CO1: "-", CO2: "-", CO3: "-", CO4: "-", CO5: "-"
        },
        topics: {
            presentation: [
                "Verification of KVL and KCL – Theoretical vs Practical Accuracy",
                "Significance of Power Factor in AC Single Phase Circuits",
                "Load Characteristics of Single Phase Transformer",
                "Speed Control Techniques for DC Shunt Motors",
                "PN Junction Diode vs Zener Diode Characteristic Curves",
                "BJT Common Emitter Configuration – Practical Challenges",
                "Inverting vs Non-Inverting Op-Amp Applications",
                "Half Adder and Full Adder Implementation Hurdles",
                "MOSFET Characteristic Curves – Experimental Observations",
                "Two Wattmeter Method for Three Phase Power Measurement",
                "Differences in Flip-Flop Operation (SR, JK, D, T)",
                "Series RLC Circuit Resonance and Frequency Response"
            ],
            miniproject: [
                "Breadboard Implementation of KVL and KCL with Varying Resistors",
                "DIY AC Power Indicator Circuit",
                "Small Scale Transformer Step-Down Demonstration",
                "DC Motor Speed Controller Build Using PWM",
                "Zener Diode Voltage Regulator Circuit Build",
                "BJT Automatic Night Light Switch Project",
                "Simple Audio Amplifier Using Op-Amp",
                "Binary Addition Calculator Using Basic Logic Gates",
                "MOSFET Based Motor Driver Circuit",
                "Three Phase Load Miniature Simulator",
                "4-bit Binary Counter Circuit with LEDs",
                "Simple LC Oscillator / Resonance Project"
            ]
        }
    },

    "GE3251": {
        name: "Engineering Graphics",
        semester: 2,
        objective: "To develop the graphic skill for communication of concepts, ideas and design of engineering products through graphical representations and to develop the ability to create and interpret engineering drawings.",
        units: {
            1: { title: "Plane Curves and Freehand Sketching", desc: "Curves used in engineering practices: Conics – Construction of ellipse, parabola and hyperbola by eccentricity method – Construction of cycloid – Construction of involute of circle and square – Drawing of tangents and normals to curves – Freehand sketching: Sketching of machine parts." },
            2: { title: "Projection of Points, Lines and Plane Surfaces", desc: "Orthographic projection – First angle and third angle projection – Projection of points – Projection of straight lines inclined to both planes – Determination of true lengths and true inclinations – Projection of planes inclined to both planes." },
            3: { title: "Projection of Solids", desc: "Projection of simple solids such as prisms, pyramids, cylinders and cones – Axis inclined to one plane and parallel to the other – Axis inclined to both the planes." },
            4: { title: "Section of Solids and Development of Surfaces", desc: "Sectioning of above solids by planes inclined to one plane – Obtaining true shape of sections – Development of lateral surfaces of simple and truncated solids – Prisms, pyramids, cylinders and cones." },
            5: { title: "Isometric and Perspective Projections", desc: "Principles of isometric projection – Isometric scale – Isometric projections of simple solids and truncated solids – Prisms, pyramids, cylinders, cones – Perspective projection of prisms, pyramids and cylinders by visual ray method." }
        },
        cos: {
            CO1: "Construct conics, involutes and cycloid curves used in engineering.",
            CO2: "Draw the projection of points, lines and plane surfaces.",
            CO3: "Draw the projection of simple solids in various positions.",
            CO4: "Draw the section of solids and develop lateral surfaces.",
            CO5: "Draw isometric and perspective projections of simple solids."
        },
        topics: {
            presentation: [
                "Conic Sections – Ellipse, Parabola and Hyperbola Construction",
                "Cycloid and Involute Curve Construction Methods",
                "Orthographic Projection – First and Third Angle Systems",
                "Projection of Lines Inclined to Both Planes",
                "Projection of Plane Surfaces Inclined to Both Planes",
                "Projection of Prisms and Pyramids – Axis Inclined",
                "Projection of Cylinders and Cones – Various Orientations",
                "Sectioning of Solids by Inclined Cutting Planes",
                "True Shape of Sections – Methods and Applications",
                "Development of Lateral Surfaces – Truncated Solids",
                "Isometric Projection – Principles and Scale",
                "Perspective Projection – Visual Ray Method"
            ],
            miniproject: [
                "CAD Drawing of Conic Sections with Eccentricity Method",
                "AutoCAD Model of Orthographic Projections of Machine Part",
                "3D SolidWorks Model of Prism and Pyramid with Sections",
                "Development of Truncated Cylinder and Cone Sheet Metal Pattern",
                "Isometric Drawing of a Simple Assembly Using CAD Software",
                "Perspective View Generation of Building Block Using AutoCAD",
                "Engineering Drawing Standards – BIS vs ISO Comparison Study",
                "Freehand Sketching Portfolio of Common Machine Parts",
                "Section Drawing of Engine Piston and Connecting Rod",
                "3D Printed Model from Engineering Drawing",
                "True Length and Inclination Calculator Application",
                "Surface Development Template for Sheet Metal Workshop"
            ]
        }
    },

    "HS3252": {
        name: "Professional English - II",
        semester: 2,
        objective: "To enhance the communication skills of the students with emphasis on professional context and technical vocabulary for academic and career readiness.",
        units: {
            1: { title: "Printers and Publishers", desc: "Reading: Comprehension passages on printing and publishing industry. Vocabulary: Technical terms related to media and publishing. Grammar: Tenses – Active and Passive voice. Writing: Letter writing – Formal and informal. Speaking: Self-introduction and description." },
            2: { title: "Science and Technology", desc: "Reading: Comprehension passages on scientific discoveries and innovations. Vocabulary: Technical vocabulary in science and technology. Grammar: Subject-verb agreement – Prepositions. Writing: Report writing – Technical report format. Speaking: Presentation skills – Describing a process." },
            3: { title: "Art and Media", desc: "Reading: Comprehension passages on art, cinema and mass media. Vocabulary: Terms related to visual and performing arts. Grammar: Clauses – Relative and conditional. Writing: Review writing – Film and book reviews. Speaking: Group discussion techniques." },
            4: { title: "Business and Management", desc: "Reading: Comprehension passages on business, commerce and management. Vocabulary: Business and management terminology. Grammar: Transformation of sentences – Direct to indirect speech. Writing: Memo and circular writing. Speaking: Mock interview preparation." },
            5: { title: "Environment and Ecology", desc: "Reading: Comprehension passages on environment, pollution and ecology. Vocabulary: Environmental and ecological terms. Grammar: Error correction and sentence completion. Writing: Essay writing – Environmental topics. Speaking: Debate and extempore speaking." }
        },
        cos: {
            CO1: "Read and comprehend passages from various domains effectively.",
            CO2: "Use appropriate vocabulary and grammar in professional communication.",
            CO3: "Write formal letters, reports and reviews following standard formats.",
            CO4: "Deliver effective presentations and participate in group discussions.",
            CO5: "Demonstrate confidence in interviews and debate scenarios."
        },
        topics: {
            presentation: [
                "Evolution of Printing Technology – From Gutenberg to Digital",
                "Technical Report Writing – Structure and Best Practices",
                "Emerging Technologies in Science – AI, IoT and Robotics",
                "Impact of Mass Media and Social Media on Society",
                "Business Communication Skills for Engineers",
                "Environmental Awareness and Sustainability Practices",
                "Effective Presentation Techniques for Technical Topics",
                "Interview Skills and Resume Building for Freshers",
                "Active and Passive Voice in Technical Writing",
                "Review Writing – Analyzing Films and Technical Books",
                "Group Discussion Ethics and Team Communication",
                "Essay Writing on Current Environmental Challenges"
            ],
            miniproject: [
                "Technical Report on College Department – Structure and Analysis",
                "Business Letter Writing Portfolio for Engineering Professionals",
                "Mock Interview Practice Video Recording and Self-Assessment",
                "Group Discussion Evaluation Rubric Design",
                "Environmental Awareness Campaign Poster and Presentation",
                "Technical Vocabulary Flashcard App for Engineering Students",
                "Film Review Blog with Professional English Standards",
                "Resume and Cover Letter Design for Campus Placement",
                "Grammar Quiz Application – Tenses, Voice and Prepositions",
                "Science Communication Video on Recent Innovation",
                "Debate Script Writing on Technology vs Environment",
                "Publishing Process Infographic and Presentation"
            ]
        }
    }
};

/* ══════════════════════════════════════════════════════════════════
 *  SEMESTER LABS — used when user selects "Practicals" type
 *  Key = semester number, value = array of lab entries
 * ══════════════════════════════════════════════════════════════════ */
const ATE_LABS = {
    /* Semester 2 Labs (Batch 2029) */
    2: [
        {
            code: "GE3271", name: "Engineering Practices Laboratory", experiments: [
                "Plumbing: Connecting various pipe fittings — valves, taps, couplings, unions, reducers and elbows used in households",
                "Plumbing: Laying pipe connections to suction and delivery sides of a pump; connecting metal, plastic and flexible pipes",
                "Wood Work: Sawing and planing; making T-Joint, Mortise, Tenon and Dovetail joints; studying door panels and trusses",
                "Electrical: Basic switchboard wiring with lamp, fan and three-pin socket",
                "Electrical: Staircase wiring; fluorescent lamp (CFL and LED) wiring",
                "Electrical: Energy meter wiring, calculations and calibration",
                "Electrical: Study of iron box, emergency lamp and fan regulator wiring",
                "Welding: Butt joint, Lap joint and Tee joint using arc welding; gas welding practice",
                "Machining: Simple turning, drilling and tapping operations",
                "Assembly: Assembling centrifugal pump, household mixer and air conditioner",
                "Sheet Metal Work: Making square tray and funnel; basic foundry operations",
                "Soldering: Simple electronic circuit soldering; continuity check and PCB assembly"
            ]
        },
        {
            code: "BE3271", name: "Basic Electrical and Electronics Engineering Laboratory", experiments: [
                "Verification of KVL and KCL in DC circuits",
                "Measurement of power and power factor in single phase AC circuit",
                "Performance test on single phase transformer (load test)",
                "Speed control of DC shunt motor",
                "Study of characteristics of PN junction and Zener diode",
                "Characteristics of BJT in CE configuration",
                "Op-Amp circuits – Inverting and Non-inverting amplifier",
                "Half adder and Full adder circuit using logic gates",
                "Characteristics of MOSFET",
                "Measurement of three phase power using two wattmeter method",
                "Study of flip-flops – SR, JK, D and T",
                "Frequency response of series RLC circuit"
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
