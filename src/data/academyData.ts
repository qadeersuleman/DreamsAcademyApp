/**
 * Dreams Virtual Academy (DVA) - Complete Academy Data
 * Ported directly from the Web Application to Mobile App
 */

export interface FacultyMember {
  id: string;
  name: string;
  sindhiName: string;
  roleBadge: string;
  isCEO: boolean;
  title: string;
  education: string;
  photo: any; // Local asset require or URI
  subjects: string[];
  description: string;
  whatsappMsg: string;
  experience?: string;
  specialties?: string[];
}

export interface CourseBatch {
  id: string;
  title: string;
  sindhiTitle: string;
  category: string;
  fee: string;
  duration: string;
  overview: string;
  features: string[];
  schedule: string;
  instructorName: string;
  instructorRole: string;
  instructorPhoto: any;
  isFeatured?: boolean;
  thumbnailUrl?: string;
  rating?: number;
  studentsCount?: string;
  badge?: string;
}

export interface ScienceDiagram {
  id: string;
  title: string;
  sindhiTitle: string;
  category: string;
  image: any;
  description: string;
  labels: string[];
}

export interface STBBNote {
  id: string;
  title: string;
  sindhiTitle: string;
  category: string;
  description: string;
  pages: number;
  size: string;
  downloads: number;
  downloadUrl: string;
  isHot?: boolean;
}

export interface AcademyVideo {
  id: string;
  videoId: string;
  title: string;
  category: 'Pedagogy' | 'Biology' | 'Physics' | 'Chemistry';
  description: string;
  tags: string[];
}

export interface FeaturedTest {
  id: number;
  title: string;
  subject: string;
  level: 'easy' | 'medium' | 'hard';
  type: string;
  mcqs: number;
  time: number;
  difficultyPercentage: number;
}

export interface MockQuestion {
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

// ─── Faculty Data ────────────────────────────────────────────────────────────

export const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: "dilshad-murtaza",
    name: "Dilshad Murtaza",
    sindhiName: "سر دلشاد مرتضيٰ",
    roleBadge: "CEO & FOUNDER",
    isCEO: true,
    title: "Science Teacher (Physics & Biology)",
    education: "M.Sc Physics • Senior Educator",
    experience: "8+ Years Teaching STBB & STS Preparation",
    photo: require("../assets/faculty/dilshad-murtaza.jpg"),
    subjects: ["Physics", "Biology", "STBB Science 7-10", "STS Pedagogy"],
    description: "Lead Educator & CEO of Dreams Virtual Academy. Transforming science & test preparation for Sindhi students.",
    specialties: ["Physics (Class 9th-12th)", "Human Biology & Excretory System", "STS / JST Screening Prep"],
    whatsappMsg: "Salam Sir Dilshad! I want guidance on Science & Physics preparation.",
  },
  {
    id: "zaheer-ali",
    name: "Sir Zaheer Ali",
    sindhiName: "سر ظهير علي",
    roleBadge: "MATHS LEAD",
    isCEO: false,
    title: "Mathematics Teacher",
    education: "Graduate Engineer (B.E.)",
    experience: "6+ Years Engineering Math & Aptitude",
    photo: require("../assets/faculty/zaheer-ali.jpg"),
    subjects: ["Mathematics", "Algebra", "Calculus", "STS Quant Tricks"],
    description: "Graduate Engineer helping students master mathematics & numerical problem-solving without fear.",
    specialties: ["Algebra & Geometry", "IBA Sukkur Quantitative Shortcuts", "Analytical Reasoning"],
    whatsappMsg: "Salam Sir Zaheer Ali! I want guidance on Mathematics & Quantitative preparation.",
  },
  {
    id: "imran-ali",
    name: "Sir Imran Ali",
    sindhiName: "سر عمران علي",
    roleBadge: "CHEMISTRY SPECIALIST",
    isCEO: false,
    title: "Chemistry Teacher (9th - 12th)",
    education: "BS Chemistry / M.Sc Organic",
    experience: "6+ Years Board Coaching",
    photo: require("../assets/faculty/imran-ali.jpg"),
    subjects: ["Chemistry 9th", "Chemistry 10th", "Chemistry 11th", "Chemistry 12th"],
    description: "BS Chemistry expert with in-depth knowledge of Sindh Textbook Board chemical formulas & reactions.",
    specialties: ["Organic Reactions & Equations", "Periodic Table & Stoichiometry", "STBB Board Numerical MCQs"],
    whatsappMsg: "Salam Sir Imran Ali! I want guidance on Chemistry board exam coaching.",
  },
  {
    id: "sabbir-ali",
    name: "Sir Sabbir Ali",
    sindhiName: "سر صبير علي",
    roleBadge: "ENGLISH LEAD",
    isCEO: false,
    title: "English Teacher",
    education: "BS / M.A English Linguistics",
    experience: "7+ Years Coaching Competitive Exams",
    photo: require("../assets/faculty/sabbir-ali.jpg"),
    subjects: ["English Mastery", "Grammar Rules", "Vocabulary", "Spoken English"],
    description: "BS English educator leading the English Mastery Course to build strong grammar & communication through Sindhi.",
    specialties: ["English Grammar & Syntax", "Pedagogy & Teaching Methodology", "Vocabulary & Comprehension"],
    whatsappMsg: "Salam Sir Sabbir Ali! I want to enroll in the English Mastery Course.",
  },
];

// ─── Batches & Courses ───────────────────────────────────────────────────────

export const COURSES_DATA: CourseBatch[] = [
  {
    id: "english-mastery",
    title: "English Mastery Course (Grammar & Spoken)",
    sindhiTitle: "انگلش ماسٽري ڪورس: گرامر ۽ ڳالهائڻ جو مڪمل حل (سنڌي ذريعي)",
    category: "Language Mastery",
    fee: "Rs. 1,200",
    duration: "6 Weeks Comprehensive",
    overview: "Specially designed by Sir Sabbir Ali for Sindhi medium students to conquer English grammar, sentence structures, vocabulary, and confident everyday communication.",
    features: [
      "Master English Grammar Rules from basic to advanced",
      "Tenses, Active / Passive Voice & Direct / Indirect Speech",
      "High-frequency vocabulary for STS, IBA Sukkur & SPSC exams",
      "Daily practical sentence building & voice note feedback",
      "Downloadable PDF study sheets & exercise solutions",
      "Private VIP WhatsApp practice group with Sir Sabbir Ali",
    ],
    schedule: "Tue, Thu, Sat (7:00 PM - 8:00 PM)",
    instructorName: "Sir Sabbir Ali",
    instructorRole: "English Teacher (BS English)",
    instructorPhoto: require("../assets/faculty/sabbir-ali.jpg"),
    isFeatured: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    studentsCount: "1,420+ Enrolled",
    badge: "Bestseller",
  },
  {
    id: "sts-jst-prep",
    title: "STS / IBA Sukkur & JST Preparation Master Batch",
    sindhiTitle: "ايس ٽي ايس سکر آءِ بي اي ۽ جي ايس ٽي سپيشل آنلائن بيچ",
    category: "Job Test Preparation",
    fee: "Rs. 1,500",
    duration: "2 Months Complete Course",
    overview: "Targeted preparation for IBA Sukkur STS BPS-05 to 15, JST (Junior School Teacher), and SPSC educator exams with full Sindhi medium lectures and daily practice mock tests.",
    features: [
      "Complete Pedagogy & Teaching Methodology (Lecture, Discussion, Assessment)",
      "STBB Science Class 4th to 8th Concept Clearing",
      "Daily 20 MCQs Practice Test with Sindhi explanation",
      "500+ Solved Past Papers PDF & Notes included",
      "Private WhatsApp VIP Study Group access",
    ],
    schedule: "Mon - Fri (8:30 PM - 9:30 PM)",
    instructorName: "Dilshad Murtaza (CEO)",
    instructorRole: "Science Teacher (Physics, Biology)",
    instructorPhoto: require("../assets/faculty/dilshad-murtaza.jpg"),
    isFeatured: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    rating: 4.98,
    studentsCount: "3,850+ Enrolled",
    badge: "Top Choice",
  },
  {
    id: "chemistry-masterclass",
    title: "Chemistry Masterclass (Classes 9th, 10th, 11th & 12th)",
    sindhiTitle: "ڪيمسٽري مڪمل ڪورس: نائين کان ٻارهين ڪلاس تائين",
    category: "Sindh Board (STBB)",
    fee: "Rs. 1,200",
    duration: "Monthly Full Syllabus",
    overview: "Complete chemistry coaching covering Sindh Board syllabus for Matriculation and Intermediate. Organic reactions, equation balancing, and board numericals made simple.",
    features: [
      "Classes 9, 10, 11 & 12 Chemistry complete textbook coverage",
      "Chemical equations, formulas, periodic table & organic reactions",
      "Handwritten Sindhi & English chapter notes with diagrams",
      "Past 10 years solved Sindh Board exam questions",
      "Direct WhatsApp voice note consultation with Sir Imran Ali",
    ],
    schedule: "Mon, Wed, Fri (6:00 PM - 7:00 PM)",
    instructorName: "Sir Imran Ali",
    instructorRole: "BS Chemistry Specialist",
    instructorPhoto: require("../assets/faculty/imran-ali.jpg"),
    isFeatured: false,
    thumbnailUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    rating: 4.88,
    studentsCount: "980+ Enrolled",
    badge: "Board Exam",
  },
  {
    id: "mathematics-engineering",
    title: "Mathematics Foundation & Aptitude Problem Solving",
    sindhiTitle: "رياضي جو بنيادي ۽ ايڊوانس ڪورس (سنڌي ۾ آساني سان سِکو)",
    category: "Mathematics & Aptitude",
    fee: "Rs. 1,200",
    duration: "Monthly Live Sessions",
    overview: "Learn Mathematics without fear with Graduate Engineer Sir Zaheer Ali. Build strong fundamentals in Algebra, Geometry, Equations, and IBA Sukkur quantitative shortcuts.",
    features: [
      "Algebra, Equations, Geometry & Trigonometry from roots",
      "IBA Sukkur STS Quantitative Math tricks and quick methods",
      "Step-by-step solved textbook numericals and derivations",
      "Weekly speed practice tests with evaluation",
      "Direct guidance from Sir Zaheer Ali (@ZaheerAliOfficials)",
    ],
    schedule: "Mon - Thu (4:00 PM - 5:00 PM)",
    instructorName: "Sir Zaheer Ali",
    instructorRole: "Graduate Engineer",
    instructorPhoto: require("../assets/faculty/zaheer-ali.jpg"),
    isFeatured: false,
    thumbnailUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    rating: 4.92,
    studentsCount: "1,150+ Enrolled",
    badge: "Engineering",
  },
  {
    id: "matric-science-board",
    title: "Sindh Board Class 9th & 10th Science (Physics & Biology)",
    sindhiTitle: "سنڌ بورڊ نائين ۽ ڏهين جماعت: فزڪس ۽ حياتيات مڪمل تياري",
    category: "Sindh Board (STBB)",
    fee: "Rs. 1,200",
    duration: "Complete Board Season",
    overview: "Thorough coaching for Sindh Board Matric exams. Chapter-wise numericals, anatomical diagram mastery, and solved past 5 years papers to ensure A+ grades.",
    features: [
      "Full coverage of Sindh Textbook Board Physics & Biology",
      "Clear explanation of complex diagrams (Heart, Brain, Nephron, Lungs)",
      "Board numericals step-by-step solving techniques",
      "Chapter-wise revision test series every Sunday",
      "PDF notes, formula cheat-sheets & Urdu/Sindhi summaries",
    ],
    schedule: "Mon - Fri (5:00 PM - 6:00 PM)",
    instructorName: "Dilshad Murtaza (CEO)",
    instructorRole: "Lead Science Teacher",
    instructorPhoto: require("../assets/faculty/dilshad-murtaza.jpg"),
    isFeatured: false,
    thumbnailUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80",
    rating: 4.95,
    studentsCount: "2,300+ Enrolled",
    badge: "Matric A+",
  },
];

// ─── Science Anatomical Diagrams ─────────────────────────────────────────────

export const SCIENCE_DIAGRAMS: ScienceDiagram[] = [
  {
    id: "heart",
    title: "Structure of Human Heart",
    sindhiTitle: "انساني دل جي بناوٽ ۽ رت جي گردش جو سرشتو",
    category: "Biology & Human Anatomy",
    image: require("../assets/gallery/heart-structure.jpg"),
    description: "Detailed hand-drawn anatomical illustration showing atriums, ventricles, major vessels, and one-way valves regulating human blood circulation.",
    labels: [
      "Superior Vena Cava", "Aorta", "Pulmonary Artery", "Pulmonary Veins", 
      "Right Atrium", "Left Atrium", "Tricuspid Valve", "Mitral Valve", 
      "Right Ventricle", "Left Ventricle", "Pulmonary Valve", "Aortic Valve"
    ]
  },
  {
    id: "brain",
    title: "Structure of Human Brain",
    sindhiTitle: "انساني دماغ جي بناوٽ ۽ ان جا اهم حصا",
    category: "Class 8th STBB Science",
    image: require("../assets/gallery/brain-structure.jpg"),
    description: "Color-coded diagram of the human brain lobes and internal nervous system structures aligned with Sindh Textbook Board curriculum.",
    labels: [
      "Frontal Lobe", "Parietal Lobe", "Occipital Lobe", "Temporal Lobe", 
      "Cerebellum", "Spinal Cord", "Medulla Oblongata", "Pons", 
      "Midbrain", "Corpus Callosum", "Thalamus", "Hypothalamus", "Pituitary Gland"
    ]
  },
  {
    id: "kidney",
    title: "Structure of Human Kidney",
    sindhiTitle: "گردي جي اندروني بناوٽ ۽ نيفرون سرشتو",
    category: "Class 8th STBB Science",
    image: require("../assets/gallery/kidney-structure.jpg"),
    description: "Cross-section notebook diagram of the kidney explaining filtration, renal cortex, medullary pyramids, and urine passage into the ureter.",
    labels: [
      "Renal Cortex", "Renal Medulla", "Renal Pyramid", "Minor Calyx", 
      "Major Calyx", "Renal Pelvis", "Ureter", "Renal Capsule", 
      "Renal Hilum", "Renal Artery", "Renal Vein"
    ]
  },
  {
    id: "lungs",
    title: "Structure of Human Lungs & Alveoli",
    sindhiTitle: "ڦڦڙن ۽ ساهه کڻڻ جو مڪمل سرشتو",
    category: "Biology & Respiration",
    image: require("../assets/gallery/lungs-structure.jpg"),
    description: "Complete respiratory pathway illustration including trachea, bronchial tree, lung lobes, and microscopic alveolus gas exchange (O2 & CO2).",
    labels: [
      "Larynx (Voice Box)", "Trachea (Windpipe)", "Right Bronchus", "Left Bronchus", 
      "Right Lung (3 Lobes)", "Left Lung (2 Lobes)", "Diaphragm", "Bronchiole", 
      "Alveoli (Air Sacs)", "Capillary Network", "Gas Exchange"
    ]
  }
];

// ─── STBB Notes & Textbooks ──────────────────────────────────────────────────

export const STBB_NOTES_DATA: STBBNote[] = [
  {
    id: 'bio-10-ch1-gaseous-exchange',
    title: 'Class 10th Biology: Chapter 1 - Gaseous Exchange (STBB)',
    sindhiTitle: 'ڪلاس ڏهون حياتيات: باب 1 - گئسن جي مٽاسٽا (ساهه کڻڻ جو سرشتو)',
    category: 'Class 10th Biology',
    description: 'Complete high-quality chapter covering human respiratory system, mechanism of breathing, respiratory disorders (Bronchitis, Emphysema, Pneumonia), and gaseous exchange in plants.',
    pages: 32,
    size: '34 MB',
    downloads: 2850,
    downloadUrl: 'https://drive.google.com/file/d/19aqz9WMDoJAgz2yp1Bxy5rXZVMmM-gUQ/view?usp=sharing',
    isHot: true,
  },
  {
    id: 'bio-10-ch2-homeostasis',
    title: 'Class 10th Biology: Chapter 2 - Homeostasis & Kidneys (STBB)',
    sindhiTitle: 'ڪلاس ڏهون حياتيات: باب 2 - هوميوسٽاسس (جسماني توازن ۽ گردن جو ڪم)',
    category: 'Class 10th Biology',
    description: 'Detailed textbook chapter on osmoregulation, thermoregulation, human urinary system, nephron structure & functioning, kidney stones, and dialysis.',
    pages: 28,
    size: '36 MB',
    downloads: 3120,
    downloadUrl: 'https://drive.google.com/file/d/1wclBmnGIT6tnf-uh8ozudZX5Pe3PET2-/view?usp=sharing',
    isHot: true,
  },
  {
    id: 'bio-10-ch3-coordination-control',
    title: 'Class 10th Biology: Chapter 3 - Coordination and Control (STBB)',
    sindhiTitle: 'ڪلاس ڏهون حياتيات: باب 3 - رابطو ۽ ضابطو (دماغ، نيورون ۽ هارمونز)',
    category: 'Class 10th Biology',
    description: 'Full chapter notes on human nervous system, neuron structure, reflex actions, brain & spinal cord divisions, and endocrine glands with hormonal functions.',
    pages: 36,
    size: '38 MB',
    downloads: 3450,
    downloadUrl: 'https://drive.google.com/file/d/1GWNvvt4196gLz40gIR8RMpEEajUhZss2/view?usp=sharing',
    isHot: true,
  },
  {
    id: 'bio-10-ch4-support-movement',
    title: 'Class 10th Biology: Chapter 4 - Support and Movement (STBB)',
    sindhiTitle: 'ڪلاس ڏهون حياتيات: باب 4 - سھارو ۽ حرڪت (انساني ڍانچو ۽ جوڙ)',
    category: 'Class 10th Biology',
    description: 'Detailed coverage of human skeleton (axial & appendicular), joints types, cartilage & bone, and skeletal disorders (Arthritis & Osteoporosis).',
    pages: 30,
    size: '32 MB',
    downloads: 2190,
    downloadUrl: 'https://drive.google.com/file/d/1JRIr6tOKQdYcpT9Pm4UX413zIz6J1D7k/view?usp=sharing',
    isHot: true,
  },
  {
    id: 'bio-10-ch5-reproduction',
    title: 'Class 10th Biology: Chapter 5 - Reproduction in Plants & Animals',
    sindhiTitle: 'ڪلاس ڏهون حياتيات: باب 5 - پيدائشي عمل (ٻوٽن ۽ جانورن ۾ پيدائش)',
    category: 'Class 10th Biology',
    description: 'Asexual & sexual reproduction, pollination in plants, human reproductive systems, fertilization, and developmental stages in detail.',
    pages: 42,
    size: '41 MB',
    downloads: 2680,
    downloadUrl: 'https://drive.google.com/file/d/13fZBTzvcdrTifK4iC1ReXcC4S7gJWWb0/view?usp=sharing',
    isHot: true,
  },
  {
    id: 'bio-10-ch6-inheritance',
    title: 'Class 10th Biology: Chapter 6 - Inheritance and Genetics (STBB)',
    sindhiTitle: 'ڪلاس ڏهون حياتيات: باب 6 - وراثت ۽ جينيات (ڊي اين اي ۽ مينڊل جا قانون)',
    category: 'Class 10th Biology',
    description: 'Chromosomes, DNA structure and replication, Mendel’s laws of inheritance, genotypes, phenotypes, and genetic variations.',
    pages: 34,
    size: '35 MB',
    downloads: 3890,
    downloadUrl: 'https://drive.google.com/file/d/1EbJSRFcyE7jXH00DavNMTLcuYXsgGGTe/view?usp=sharing',
    isHot: true,
  },
  {
    id: 'stbb-8-brain',
    title: 'Class 8th Science: Human Brain & Nervous System (STBB)',
    sindhiTitle: 'ڪلاس اٺون: انساني دماغ ۽ اعصابي نظام جا مڪمل نوٽس',
    category: 'Class 8th STBB',
    description: 'Complete notes with diagrams on Cerebrum, Cerebellum, Brain Stem, and Peripheral Nervous System in easy Sindhi/English.',
    pages: 14,
    size: '2.4 MB',
    downloads: 1420,
    downloadUrl: 'https://drive.google.com',
    isHot: true,
  },
  {
    id: 'stbb-8-kidney',
    title: 'Class 8th Science: Kidney Structure & Excretory System',
    sindhiTitle: 'ڪلاس اٺون: گردا ۽ پيشاب وارو نظام تفصيلي وضاحت',
    category: 'Class 8th STBB',
    description: 'Detailed explanation of nephron structure, filtration process, kidney failure, and dialysis.',
    pages: 10,
    size: '1.8 MB',
    downloads: 980,
    downloadUrl: 'https://drive.google.com',
    isHot: false,
  },
  {
    id: 'stbb-7-light',
    title: 'Class 7th Science: Refraction & Total Internal Reflection',
    sindhiTitle: 'ڪلاس ستون: روشني جي موٽ ۽ مڪمل اندروني عڪس (سنڌي وضاحت)',
    category: 'Class 7th STBB',
    description: 'Laws of refraction, critical angle, and optical phenomenon explained with solved board questions.',
    pages: 12,
    size: '2.1 MB',
    downloads: 1150,
    downloadUrl: 'https://drive.google.com',
    isHot: true,
  },
  {
    id: 'sts-pedagogy-guide',
    title: 'Pedagogy & Teaching Methodology (JST / STS Syllabus)',
    sindhiTitle: 'تدريسي طريقا ۽ پيڊاگاجي: جي ايس ٽي / ايس ٽي ايس تياري نوٽس',
    category: 'STS / JST Prep',
    description: 'Comprehensive guide on Lecture Method, Discussion Method, Formative vs Summative Assessment, and Team Teaching.',
    pages: 28,
    size: '4.6 MB',
    downloads: 3200,
    downloadUrl: 'https://drive.google.com',
    isHot: true,
  },
  {
    id: 'sts-science-pastpapers',
    title: 'STS / IBA Sukkur Science 500 Solved MCQs with Explanations',
    sindhiTitle: 'ايس ٽي ايس سکر آءِ بي اي: 500 حل ٿيل سائنس ايم سي ڪيوز',
    category: 'STS / JST Prep',
    description: 'Past 5 years solved general science MCQs specifically asked in IBA Sukkur STS BPS-05 to 15 tests.',
    pages: 45,
    size: '5.2 MB',
    downloads: 4100,
    downloadUrl: 'https://drive.google.com',
    isHot: true,
  },
];

// ─── Video Lessons ───────────────────────────────────────────────────────────

export const ACADEMY_VIDEOS: AcademyVideo[] = [
  {
    id: 'VFVrHw5RR2o',
    videoId: 'VFVrHw5RR2o',
    title: 'Lecture #03 - Teaching Methodology | Lecture Method - JST Syllabus Based',
    category: 'Pedagogy',
    description: 'A complete explanation of the Lecture Method under Pedagogy for JST syllabus preparation.',
    tags: ['JST', 'Pedagogy', 'Teaching Method'],
  },
  {
    id: 'o7GIjpyL6qo',
    videoId: 'o7GIjpyL6qo',
    title: 'Teaching Methodology | Discussion Method | JST Syllabus Based',
    category: 'Pedagogy',
    description: 'Detailed explanation of the Discussion Method in teaching methodology for JST preparation.',
    tags: ['JST', 'Pedagogy', 'Discussion Method'],
  },
  {
    id: '8Jytg3kWzVw',
    videoId: '8Jytg3kWzVw',
    title: 'Case Studies | Pedagogy | Teaching Methodology | JST Syllabus Based',
    category: 'Pedagogy',
    description: 'Understanding Case Studies as a teaching methodology for JST, STS, IBA, NTS, SPSC exams.',
    tags: ['JST', 'Pedagogy', 'Case Studies'],
  },
  {
    id: 'CSv-SWnjbBE',
    videoId: 'CSv-SWnjbBE',
    title: 'Team Teaching | Teaching Methodology | Pedagogy | JST Syllabus Based',
    category: 'Pedagogy',
    description: 'Comprehensive look at Team Teaching as part of the pedagogy portion for JST syllabus.',
    tags: ['JST', 'Pedagogy', 'Team Teaching'],
  },
  {
    id: 'YDS0zSJjap4',
    videoId: 'YDS0zSJjap4',
    title: 'Assessment and Its Types | Pedagogy | JST Syllabus Preparation',
    category: 'Pedagogy',
    description: 'Types of assessment including formative and summative assessment explained for JST preparation.',
    tags: ['JST', 'Pedagogy', 'Assessment'],
  },
  {
    id: 'DLZ6h4QwgeQ',
    videoId: 'DLZ6h4QwgeQ',
    title: 'Class 8th Science - Chapter #01 - About Brain | Its Structure',
    category: 'Biology',
    description: 'Detailed explanation of the human brain and its structure from Class 8 Science (STBB).',
    tags: ['Science 8', 'Biology', 'Brain', 'STBB'],
  },
  {
    id: '_Eu-ZH1AAwQ',
    videoId: '_Eu-ZH1AAwQ',
    title: 'Temporal Lobe of Brain Discussed in Simple | Science Class 8',
    category: 'Biology',
    description: 'Simple explanation of the Temporal Lobe of the brain for Class 8 Science.',
    tags: ['Science 8', 'Biology', 'Brain'],
  },
  {
    id: 'Ajwt1uDXHF8',
    videoId: 'Ajwt1uDXHF8',
    title: "What's Peripheral Nervous System | All About Nerve Types | Simple",
    category: 'Biology',
    description: 'All about the Peripheral Nervous System and types of nerves explained simply.',
    tags: ['Science', 'Biology', 'Nervous System'],
  },
  {
    id: 'BfIFxPqyqdY',
    videoId: 'BfIFxPqyqdY',
    title: 'The Structure and Role of Kidney | Science 8th Book | STBB',
    category: 'Biology',
    description: 'Complete explanation of the kidney\'s structure and role from Class 8 Science STBB.',
    tags: ['Science 8', 'Biology', 'Kidney', 'STBB'],
  },
  {
    id: 'soazgsSAJME',
    videoId: 'soazgsSAJME',
    title: 'The Human Excretory System | Explained in Simple | Science 8th | STBB',
    category: 'Biology',
    description: 'Human Excretory System explained in simple terms for Class 8 Science.',
    tags: ['Science 8', 'Biology', 'Excretory System'],
  },
  {
    id: 'XnQ_OJix-c0',
    videoId: 'XnQ_OJix-c0',
    title: 'Blood Vessels | Artery, Veins, Capillaries | Science 7 | JST Preparation',
    category: 'Biology',
    description: 'Explanation of blood vessels — arteries, veins, and capillaries — for Science 7.',
    tags: ['Science 7', 'Biology', 'Blood Vessels'],
  },
  {
    id: 'Oiql1GU2ttU',
    videoId: 'Oiql1GU2ttU',
    title: 'Refraction in Simple Words | Science 7th | STBB',
    category: 'Physics',
    description: 'Refraction of light explained in simple words for Class 7 Science (STBB).',
    tags: ['Science 7', 'Physics', 'Light', 'STBB'],
  },
  {
    id: 'tfNyZX7-gf8',
    videoId: 'tfNyZX7-gf8',
    title: 'Acids, Bases & Chemical Reactions Solved MCQs in Sindhi',
    category: 'Chemistry',
    description: 'Comprehensive Sindh Textbook Board chemistry lecture on acids, bases, and salts.',
    tags: ['Chemistry', 'Acids', 'STBB'],
  },
];

// ─── Featured Mock Tests ─────────────────────────────────────────────────────

export const FEATURED_TESTS: FeaturedTest[] = [
  { id: 1, title: "STS / IBA Sukkur General Science Test", subject: "Science", level: "easy", type: "Mock Exams", mcqs: 10, time: 10, difficultyPercentage: 45 },
  { id: 2, title: "JST Pedagogy & Teaching Methodology", subject: "Science", level: "medium", type: "Topic Quizzes", mcqs: 10, time: 10, difficultyPercentage: 60 },
  { id: 3, title: "Physics Laws of Motion & Units Test", subject: "Physics", level: "medium", type: "Past Papers", mcqs: 10, time: 10, difficultyPercentage: 70 },
  { id: 4, title: "Chemistry Acids & Reactions Practice", subject: "Chemistry", level: "easy", type: "Topic Quizzes", mcqs: 10, time: 10, difficultyPercentage: 45 },
  { id: 5, title: "Class 9th & 10th Mathematics Test", subject: "Mathematics", level: "medium", type: "Topic Quizzes", mcqs: 10, time: 10, difficultyPercentage: 65 },
  { id: 6, title: "Computer Basics Fundamentals", subject: "Computer Basics", level: "easy", type: "Mock Exams", mcqs: 10, time: 10, difficultyPercentage: 35 }
];

// ─── Subject Questions (From mockTestsData.ts) ────────────────────────────────

export const SUBJECT_MOCK_QUESTIONS: Record<string, { easy: MockQuestion[]; medium: MockQuestion[]; hard: MockQuestion[] }> = {
  Science: {
    easy: [
      {
        questionText: "Which organelle is known as the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Body"],
        correctAnswer: 1,
        explanation: "Mitochondria produce ATP through cellular respiration, supplying energy for cellular processes."
      },
      {
        questionText: "What gas do humans need to breathe in order to survive?",
        options: ["Carbon Dioxide", "Nitrogen", "Oxygen", "Helium"],
        correctAnswer: 2,
        explanation: "Oxygen is vital for aerobic respiration in human cells."
      },
      {
        questionText: "What is the closest planet to the Sun?",
        options: ["Venus", "Earth", "Mars", "Mercury"],
        correctAnswer: 3,
        explanation: "Mercury is the smallest and innermost planet in the solar system."
      },
      {
        questionText: "Which part of the plant conducts photosynthesis?",
        options: ["Root", "Stem", "Leaf", "Flower"],
        correctAnswer: 2,
        explanation: "Leaves contain chloroplasts rich in chlorophyll where photosynthesis takes place."
      },
      {
        questionText: "How many bones are there in an adult human skeleton?",
        options: ["206", "300", "150", "250"],
        correctAnswer: 0,
        explanation: "An adult human has 206 bones, while infants are born with around 270-300."
      }
    ],
    medium: [
      {
        questionText: "Which pigment gives leaves their green color?",
        options: ["Carotene", "Chlorophyll", "Xanthophyll", "Anthocyanin"],
        correctAnswer: 1,
        explanation: "Chlorophyll absorbs red and blue light while reflecting green light."
      },
      {
        questionText: "What is the approximate speed of sound in dry air at 20 °C?",
        options: ["343 m/s", "1500 m/s", "300,000 km/s", "100 m/s"],
        correctAnswer: 0,
        explanation: "In dry air at 20°C (68°F), sound travels at approximately 343 meters per second."
      },
      {
        questionText: "Which blood cells are responsible for fighting infections?",
        options: ["Red blood cells", "White blood cells", "Platelets", "Plasma cells"],
        correctAnswer: 1,
        explanation: "Leukocytes (white blood cells) are the body's defense mechanism against pathogens."
      },
      {
        questionText: "What is the basic functional unit of the human kidney?",
        options: ["Neuron", "Nephron", "Alveoli", "Villi"],
        correctAnswer: 1,
        explanation: "Nephrons filter blood, regulate electrolyte balance, and produce urine in the kidneys."
      },
      {
        questionText: "Which part of the human brain controls balance and motor coordination?",
        options: ["Cerebrum", "Cerebellum", "Medulla Oblongata", "Hypothalamus"],
        correctAnswer: 1,
        explanation: "The cerebellum coordinates voluntary muscular movements and maintains posture and balance."
      }
    ],
    hard: [
      {
        questionText: "What is the primary function of ATP in biological systems?",
        options: ["Store genetic information", "Energy currency of the cell", "Form cell membranes", "Transport oxygen"],
        correctAnswer: 1,
        explanation: "Adenosine triphosphate (ATP) captures chemical energy from food and releases it to fuel cellular processes."
      },
      {
        questionText: "Which law states that pressure of a gas is inversely proportional to volume at constant temperature?",
        options: ["Charles's Law", "Boyle's Law", "Avogadro's Law", "Gay-Lussac's Law"],
        correctAnswer: 1,
        explanation: "Boyle's Law states P1V1 = P2V2 at constant temperature."
      },
      {
        questionText: "Which endocrine gland regulates human metabolic rate through thyroxine?",
        options: ["Adrenal", "Pancreas", "Thyroid", "Pituitary"],
        correctAnswer: 2,
        explanation: "The thyroid gland produces T3 and T4 hormones that govern metabolic pace."
      }
    ]
  },
  Physics: {
    easy: [
      {
        questionText: "What is the unit of Force in the International System of Units (SI)?",
        options: ["Joule", "Pascal", "Newton", "Watt"],
        correctAnswer: 2,
        explanation: "The SI unit of force is the Newton (N), named after Sir Isaac Newton."
      },
      {
        questionText: "What is the value of acceleration due to gravity (g) on Earth's surface?",
        options: ["8.9 m/s²", "9.8 m/s²", "10.5 m/s²", "6.7 m/s²"],
        correctAnswer: 1,
        explanation: "Standard acceleration due to gravity at sea level is approximately 9.8 m/s²."
      },
      {
        questionText: "Which of the following travels fastest in a vacuum?",
        options: ["Sound", "Light", "Electricity", "Heat waves"],
        correctAnswer: 1,
        explanation: "Light travels at ~300,000 km/s in vacuum; sound cannot travel through vacuum."
      }
    ],
    medium: [
      {
        questionText: "According to Newton's Second Law, what is the formula for Force?",
        options: ["F = m / a", "F = m × a", "F = m + a", "F = v × t"],
        correctAnswer: 1,
        explanation: "Force equals mass multiplied by acceleration (F = ma)."
      },
      {
        questionText: "What is the phenomenon of bending of light as it passes between different media?",
        options: ["Reflection", "Refraction", "Diffraction", "Dispersion"],
        correctAnswer: 1,
        explanation: "Refraction is the change in direction of light when transitioning between different optical densities."
      },
      {
        questionText: "What is the unit of Electrical Resistance?",
        options: ["Volt", "Ampere", "Ohm", "Coulomb"],
        correctAnswer: 2,
        explanation: "Electrical resistance is measured in Ohms (Ω) according to Ohm's Law (V = IR)."
      }
    ],
    hard: [
      {
        questionText: "What is the critical angle for total internal reflection dependent upon?",
        options: ["Light color only", "Refractive indices of both media", "Angle of incidence only", "Medium thickness"],
        correctAnswer: 1,
        explanation: "Critical angle sin(c) = n2 / n1 where light moves from denser (n1) to rarer (n2) medium."
      },
      {
        questionText: "Work done on an object is zero when the angle between force and displacement is:",
        options: ["0°", "45°", "90°", "180°"],
        correctAnswer: 2,
        explanation: "Work = F × d × cos(θ). Since cos(90°) = 0, no work is done perpendicularly."
      }
    ]
  },
  Chemistry: {
    easy: [
      {
        questionText: "What is the chemical formula of pure Water?",
        options: ["CO2", "H2O", "NaCl", "O2"],
        correctAnswer: 1,
        explanation: "Water consists of two Hydrogen atoms bonded to one Oxygen atom (H2O)."
      },
      {
        questionText: "What is the pH of a neutral solution at 25 °C?",
        options: ["0", "7", "14", "5"],
        correctAnswer: 1,
        explanation: "A neutral solution has a pH of 7.0 (neither acidic nor alkaline)."
      },
      {
        questionText: "What is the atomic symbol for Gold?",
        options: ["Ag", "Au", "Fe", "Cu"],
        correctAnswer: 1,
        explanation: "Au comes from the Latin word 'Aurum', meaning shining dawn."
      }
    ],
    medium: [
      {
        questionText: "Which gas is released when an acid reacts with an active metal?",
        options: ["Oxygen", "Carbon dioxide", "Hydrogen", "Nitrogen"],
        correctAnswer: 2,
        explanation: "Acid + Metal → Metal Salt + Hydrogen Gas (H2)."
      },
      {
        questionText: "What is the common name of Sodium Bicarbonate (NaHCO3)?",
        options: ["Baking Soda", "Washing Soda", "Common Salt", "Caustic Soda"],
        correctAnswer: 0,
        explanation: "NaHCO3 is baking soda; Na2CO3 is washing soda; NaCl is common table salt."
      }
    ],
    hard: [
      {
        questionText: "In the periodic table, elements in the same vertical column (group) share similar:",
        options: ["Atomic masses", "Number of valence electrons", "Number of neutrons", "Boiling points"],
        correctAnswer: 1,
        explanation: "Elements in the same group possess identical valence electron configurations."
      }
    ]
  },
  Mathematics: {
    easy: [
      {
        questionText: "What is the value of (15 × 4) + 20?",
        options: ["60", "70", "80", "90"],
        correctAnswer: 2,
        explanation: "15 × 4 = 60, and 60 + 20 = 80."
      },
      {
        questionText: "What is the square root of 144?",
        options: ["10", "11", "12", "14"],
        correctAnswer: 2,
        explanation: "12 × 12 = 144."
      }
    ],
    medium: [
      {
        questionText: "Solve for x: 3x - 7 = 14",
        options: ["x = 5", "x = 7", "x = 9", "x = 6"],
        correctAnswer: 1,
        explanation: "3x = 14 + 7 = 21 → x = 21 / 3 = 7."
      },
      {
        questionText: "What is the sum of interior angles of a triangle?",
        options: ["90°", "180°", "270°", "360°"],
        correctAnswer: 1,
        explanation: "The sum of the three interior angles of any triangle is always 180 degrees."
      }
    ],
    hard: [
      {
        questionText: "If the radius of a circle is 7 cm, what is its approximate circumference? (use π = 22/7)",
        options: ["22 cm", "44 cm", "154 cm", "88 cm"],
        correctAnswer: 1,
        explanation: "Circumference = 2πr = 2 × (22/7) × 7 = 44 cm."
      }
    ]
  },
  "Computer Basics": {
    easy: [
      {
        questionText: "What does CPU stand for?",
        options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Control Program Unit"],
        correctAnswer: 1,
        explanation: "The Central Processing Unit (CPU) is the primary component executing computer instructions."
      },
      {
        questionText: "Which of the following is an input device?",
        options: ["Monitor", "Printer", "Keyboard", "Speaker"],
        correctAnswer: 2,
        explanation: "A keyboard sends input signals from the user into the computer."
      }
    ],
    medium: [
      {
        questionText: "How many bits are in one Byte?",
        options: ["4", "8", "16", "32"],
        correctAnswer: 1,
        explanation: "1 Byte is composed of 8 binary bits (0s and 1s)."
      },
      {
        questionText: "Which type of memory is volatile and loses data when power is lost?",
        options: ["ROM", "RAM", "Hard Disk", "Flash Drive"],
        correctAnswer: 1,
        explanation: "Random Access Memory (RAM) requires electric power to hold its current data state."
      }
    ],
    hard: [
      {
        questionText: "In networking, what does IP stand for?",
        options: ["Internet Protocol", "Internal Program", "Interlink Port", "Information Process"],
        correctAnswer: 0,
        explanation: "Internet Protocol (IP) routes and addresses data packets so they can travel across networks."
      }
    ]
  }
};

// ─── Sindh Districts ─────────────────────────────────────────────────────────

export const SINDH_DISTRICTS = [
  "Sukkur",
  "Larkana",
  "Hyderabad",
  "Khairpur",
  "Nawabshah (Shaheed Benazirabad)",
  "Dadu",
  "Mirpurkhas",
  "Karachi",
  "Ghotki",
  "Shikarpur",
  "Badin",
  "Thatta",
  "Jacobabad",
  "Umerkot",
  "Sanghar",
  "Kashmore",
];

// ─── Testimonials ────────────────────────────────────────────────────────────

export const TESTIMONIALS = [
  {
    name: "Naveed Ali Soomro",
    role: "STS IBA Aspirant (Larkana)",
    text: "Sir Dilshad's pedagogy lectures and science MCQs helped me clear the STS screening test with 78 marks. The explanation in Sindhi makes concepts crystal clear!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
  },
  {
    name: "Dua Baloch",
    role: "Matric Science Student (Hyderabad)",
    text: "Physics was very difficult for me until I started watching Dreams Academy videos. Chapter-wise STBB notes and formulas saved my board exams.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
  },
  {
    name: "Farhan Jamali",
    role: "JST Candidate (Khairpur)",
    text: "The combination of live WhatsApp batch classes and daily quizzes on this website and app is unmatched in Sindh. Truly thankful to Sir Dilshad!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
  },
];

