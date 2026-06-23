export const standardPOs = [
  { id: 'PO1', title: 'Engineering Knowledge', text: 'Apply the knowledge of mathematics, science, engineering fundamentals to the solution of complex engineering problems.' },
  { id: 'PO2', title: 'Problem Analysis', text: 'Identify, formulate, review research literature, and analyze complex engineering problems.' },
  { id: 'PO3', title: 'Design/development of solutions', text: 'Design solutions for complex engineering problems and design system components.' },
  { id: 'PO4', title: 'Conduct investigations of complex problems', text: 'Use research-based knowledge and research methods.' },
  { id: 'PO5', title: 'Modern tool usage', text: 'Create, select, and apply appropriate techniques and modern engineering and IT tools.' },
  { id: 'PO6', title: 'The engineer and society', text: 'Apply reasoning informed by the contextual knowledge to assess societal, health, safety issues.' },
  { id: 'PO7', title: 'Environment and sustainability', text: 'Understand the impact of the professional engineering solutions in environmental contexts.' },
  { id: 'PO8', title: 'Ethics', text: 'Apply ethical principles and commit to professional ethics and responsibilities.' },
  { id: 'PO9', title: 'Individual and team work', text: 'Function effectively as an individual, and as a member or leader in diverse teams.' },
  { id: 'PO10', title: 'Communication', text: 'Communicate effectively on complex engineering activities with the engineering community.' },
  { id: 'PO11', title: 'Project management and finance', text: 'Demonstrate knowledge and understanding of the engineering and management principles.' },
  { id: 'PO12', title: 'Life-long learning', text: 'Recognize the need for, and have the preparation and ability to engage in independent life-long learning.' }
];

export const departmentData = {
  chemical: {
    name: "Chemical Engineering",
    shortName: "CHEM",
    hodName: "Dr. M. Shiva Naresh",
    hodTitle: "M.Tech., Ph.D",
    hodRole: "HOD, Dept of Chemical",
    hodMessage: "Welcome to the Department of Chemical Engineering at ANITS. Established in 2012, our department focuses strongly on sustainable processes, biochemical engineering, and modern chemical technologies. We offer B.Tech programs in Chemical Engineering to shape future leaders.",
    vision: "To achieve academic excellence in Chemical Engineering and seek global recognition in building sustainable and safe environment.",
    mission: [
      "To produce young and globally competitive chemical engineers.",
      "Promote research in sustainable technologies.",
      "Collaborate with chemical and pharma industries."
    ],
    admissions: { btech: 60, facultyStrength: 15, programs: "B.Tech" },
    programs: [{ level: "UG", name: "B.Tech - Chemical Engineering", duration: "4 Years", intake: 60 }],
    history: [{ year: "2012", text: "Chemical Engineering Department Established." }],
    highlights: [
      { title: "Academic Excellence", text: "Our students consistently achieve top university ranks and secure placements in core industries like Coromandel and Dr. Reddy's." }
    ],
    peos: { type: 'table' },
    hasGallery: false
  },
  'cse-ds': {
    name: "Computer Science and Engineering (Data Science)",
    shortName: "CSE (DS)",
    hodName: "Dr. P. E. S. N. Krishna Prasad",
    hodTitle: "M.Tech., Ph.D",
    hodRole: "HOD, Dept of CSE (DS)",
    hodMessage: "Welcome to CSE (Data Science). In the era of big data, our department equips students with skills in data analytics, machine learning, and statistical modeling to solve complex real-world data challenges.",
    vision: "To be a premier center of excellence in Data Science education and research.",
    mission: [
      "Provide strong foundation in Data Science.",
      "Promote research in AI and Big Data.",
      "Industry collaboration for real-time projects."
    ],
    admissions: { btech: 60, facultyStrength: 12, programs: "B.Tech" },
    programs: [{ level: "UG", name: "B.Tech - CSE (Data Science)", duration: "4 Years", intake: 60 }],
    history: [{ year: "2020", text: "B.Tech in CSE (Data Science) Introduced." }],
    highlights: [
      { title: "IT & CS Infrastructure", text: "State-of-the-art Data Analytics labs and curriculum aligned with modern data engineering practices." },
      { title: "Academic Activities", text: "Collaborations with IT giants for data science internships." }
    ],
    peos: { type: 'table' },
    hasGallery: false
  },
  'cse-aiml': {
    name: "Computer Science and Engineering (AI & ML)",
    shortName: "CSE (AI&ML)",
    hodName: "Dr. V. Usha Bala",
    hodTitle: "M.Tech., Ph.D",
    hodRole: "HOD, Dept of CSE (AI&ML)",
    hodMessage: "Welcome to CSE (AI & ML). Artificial Intelligence is shaping the future. Our department is dedicated to producing engineers who can design intelligent systems, neural networks, and advanced automation solutions.",
    vision: "To create globally competent AI & ML professionals.",
    mission: [
      "Impart quality education in AI & ML.",
      "Foster innovations in deep learning and robotics.",
      "Ethical AI development practices."
    ],
    admissions: { btech: 120, facultyStrength: 18, programs: "B.Tech" },
    programs: [{ level: "UG", name: "B.Tech - CSE (AI & ML)", duration: "4 Years", intake: 120 }],
    history: [{ year: "2020", text: "B.Tech in CSE (AI & ML) Introduced." }],
    highlights: [
      { title: "Student Community", text: "Students actively participate and win in national level AI hackathons." },
      { title: "Academic Activities", text: "Comprehensive curriculum covering NLP, Computer Vision, and Deep Learning." },
      { title: "Industry Connect", text: "MOU with leading AI startups for hands-on projects." }
    ],
    peos: { type: 'table' },
    hasGallery: false
  },
  cse: {
    name: "Computer Science and Engineering",
    shortName: "CSE",
    hodName: "Dr. R. Sivaranjani",
    hodTitle: "M.Tech., Ph.D",
    hodRole: "HOD, Dept of CSE",
    hodMessage: "Welcome to the CSE Department. We aim to shape the future tech leaders by providing cutting-edge knowledge in software development, cloud computing, and cyber security.",
    vision: "To be a center of excellence in computer science education and research.",
    mission: ["Deliver high-quality education.", "Foster innovation.", "Build strong industry ties."],
    admissions: { btech: 240, facultyStrength: 45, programs: "B.Tech, M.Tech" },
    programs: [{ level: "UG", name: "B.Tech - CSE", duration: "4 Years", intake: 240 }],
    history: [{ year: "2001", text: "CSE Department Established." }],
    highlights: [
      { title: "Academic Excellence", text: "NBA Accredited, high placement records, and top university ranks." },
      { title: "Student Achievements", text: "Multiple hackathon winners and open-source contributors." },
      { title: "Industry Tie-ups", text: "Strong alumni network and partnerships with top software firms." }
    ],
    peos: { type: 'list' },
    hasGallery: true
  },
  it: {
    name: "Information Technology",
    shortName: "IT",
    hodName: "Prof. P. Padmaja",
    hodTitle: "M.Tech., Ph.D",
    hodRole: "HOD, Dept of Information Technology",
    hodMessage: "Dear Student Members, Staff and Parents, Welcome to the Department of Information Technology.",
    vision: "Department of IT envisions building a continuous learning environment involving modern technological tools.",
    mission: [
      "Provide skill-oriented education to meet the global demands of the IT Industry.",
      "Imparting the best theoretical knowledge along with practical training.",
    ],
    admissions: { btech: 180, facultyStrength: 33, programs: "B.Tech (IT), M.Tech (IT)" },
    programs: [
      { level: "UG", name: "B.Tech - Information Technology", duration: "4 Years", intake: 180 },
      { level: "PG", name: "M.Tech - Data Science", duration: "2 Years", intake: 18 }
    ],
    history: [
      { year: "2001", text: "B.Tech (IT) started with an intake of 60 students." },
      { year: "2007", text: "Intake increased to 120 students." }
    ],
    highlights: [
      { title: "Academic Excellence", text: "The IT Department has achieved incredible academic milestones." }
    ],
    peos: { type: 'list' },
    hasGallery: true
  },
  ece: {
    name: "Electronics & Communication Engineering",
    shortName: "ECE",
    hodName: "Dr. V. Rajyalakshmi",
    hodTitle: "M.Tech., Ph.D",
    hodRole: "HOD, Dept of ECE",
    hodMessage: "Welcome to the ECE Department. We offer robust training in hardware and software design, preparing students for the telecom and VLSI sectors.",
    vision: "To produce globally competitive electronics engineers.",
    mission: ["Impart strong fundamentals.", "Encourage R&D in emerging areas."],
    admissions: { btech: 180, facultyStrength: 38, programs: "B.Tech, M.Tech" },
    programs: [{ level: "UG", name: "B.Tech - ECE", duration: "4 Years", intake: 180 }],
    history: [{ year: "2001", text: "ECE Department Established." }],
    highlights: [
      { title: "Academic Excellence", text: "Rank in top 10 positions in university examinations. Students regularly win top prizes at national level hackathons." },
      { title: "Research & Innovation", text: "The Department of Electronics and Communication Engineering (ECE) has established excellent research culture between the academia and industry." },
      { title: "Industry Connect", text: "MOU's with leading tech companies." }
    ],
    peos: "To be updated soon.",
    hasGallery: true
  },
  mech: {
    name: "Mechanical Engineering",
    shortName: "MECH",
    hodName: "Prof. B.N.D. Narasinga Rao",
    hodTitle: "M.Tech., Ph.D",
    hodRole: "HOD, Dept of MECH",
    hodMessage: "Welcome to the Mechanical Engineering Department. We focus on hands-on practical skills in robotics, thermal engineering, and manufacturing.",
    vision: "To develop skilled mechanical engineers for global challenges.",
    mission: ["Provide state-of-the-art training.", "Promote research."],
    admissions: { btech: 120, facultyStrength: 30, programs: "B.Tech" },
    programs: [{ level: "UG", name: "B.Tech - MECH", duration: "4 Years", intake: 120 }],
    history: [{ year: "2005", text: "MECH Department Established." }],
    highlights: [
      { title: "Academic Excellence", text: "Our students regularly rank top in University exams and secure placements in core mechanical sectors." },
      { title: "Research & Innovation", text: "The department has established excellent research infrastructure. Faculty members are actively involved in research." },
      { title: "Industry Connect", text: "Well-established industry-institute collaboration for student internships." }
    ],
    peos: "To be updated soon.",
    topBanner: "100% PLACEMENTS",
    hasGallery: false
  },
  eee: {
    name: "Electrical & Electronics Engineering",
    shortName: "EEE",
    hodName: "Dr. G. Jagadeesh",
    hodTitle: "M.Tech., Ph.D",
    hodRole: "HOD, Dept of EEE",
    hodMessage: "Welcome to EEE. We empower students to innovate in power systems, smart grids, and renewable energy technologies.",
    vision: "To excel in electrical engineering education.",
    mission: ["Train in renewable energy.", "Industry collaboration."],
    admissions: { btech: 120, facultyStrength: 28, programs: "B.Tech" },
    programs: [{ level: "UG", name: "B.Tech - EEE", duration: "4 Years", intake: 120 }],
    history: [{ year: "2001", text: "EEE Department Established." }],
    highlights: [
      { title: "Academic Excellence", text: "Excellent energy audit initiatives and smart grid research." }
    ],
    peos: { type: 'list' },
    hasGallery: true
  },
  civil: {
    name: "Civil Engineering",
    shortName: "CIVIL",
    hodName: "Dr. J. Vikranth",
    hodTitle: "M.Tech., Ph.D",
    hodRole: "HOD, Dept of Civil",
    hodMessage: "Welcome to Civil Engineering. We build the foundation of the future through sustainable infrastructure and smart city development.",
    vision: "To build sustainable infrastructure.",
    mission: ["Quality civil education.", "Smart city methodologies."],
    admissions: { btech: 60, facultyStrength: 25, programs: "B.Tech" },
    programs: [{ level: "UG", name: "B.Tech - CIVIL", duration: "4 Years", intake: 60 }],
    history: [{ year: "2010", text: "Civil Department Established." }],
    highlights: [
      { title: "Academic Excellence", text: "Award-winning structural design projects and consultancies." }
    ],
    peos: { type: 'list' },
    hasGallery: true
  },
  mba: {
    name: "MBA (Hospital Administration)",
    shortName: "MBA",
    hodName: "Dr. V. Bindu Neeharika",
    hodTitle: "MBA, M.Phil, Ph.D",
    hodRole: "HOD, Dept of MBA",
    hodMessage: "Greetings and welcome to the School of Management Studies at Anil Neerukonda Institute of Technology & Sciences. Our department offers graduate and postgraduate programs in Management, emphasizing experiential learning through internships, case studies, and holistic education. Our MBA program is a thoughtfully crafted two-year full-time degree that nurtures ethical, socially responsible, and resilient future managers.",
    vision: "The Department of Management Studies (Hospital Administration) envisions transforming into a center of excellence in management education dedicated to nurturing future leaders.",
    mission: [
      "To create resources matching the employability and management competencies of the students.",
      "Ensuring the stakeholders participation in every sphere of activity to uphold the tradition of inclusive growth."
    ],
    admissions: { btech: 60, facultyStrength: 10, programs: "MBA" },
    programs: [],
    history: [{ year: "2023", text: "ANITS proudly presents a distinctive postgraduate program in MBA (Hospital Administration), launched in 2023." }],
    highlights: [
      { title: "Department Highlights", text: "To be updated soon." }
    ],
    peos: null,
    hasGallery: false
  },
  'bsh-hod': {
    name: "Basic Sciences & Humanities - HOD",
    shortName: "BSH-HOD",
    hodName: "HOD, BS&H",
    hodTitle: "Ph.D",
    hodRole: "HOD, Dept of BS&H",
    hodMessage: "Welcome to the Department of Basic Sciences and Humanities. We lay the fundamental foundation for all engineering disciplines.",
    vision: "To build a strong foundation in basic sciences.",
    mission: ["Provide excellent fundamental education."],
    admissions: { btech: 0, facultyStrength: 40, programs: "First Year Engineering" },
    programs: [],
    history: [{ year: "2001", text: "Department established." }],
    highlights: [{ title: "Excellence", text: "Highly qualified faculty." }],
    peos: null,
    hasGallery: false
  },
  'bsh-chemistry': {
    name: "Chemistry",
    shortName: "CHEMISTRY",
    hodName: "Dr. Chemistry Head",
    hodTitle: "Ph.D",
    hodRole: "Head of Chemistry",
    hodMessage: "Welcome to the Chemistry division. Our focus is on applied engineering chemistry.",
    vision: "To excel in applied chemistry.",
    mission: ["Promote chemistry research."],
    admissions: { btech: 0, facultyStrength: 10, programs: "-" },
    programs: [],
    history: [{ year: "2001", text: "Division established." }],
    highlights: [{ title: "Labs", text: "State of the art chemistry labs." }],
    peos: null,
    hasGallery: false
  },
  'bsh-english': {
    name: "English and Humanities",
    shortName: "ENGLISH",
    hodName: "Dr. English Head",
    hodTitle: "Ph.D",
    hodRole: "Head of English",
    hodMessage: "Welcome to English & Humanities. We enhance the communication and soft skills of engineering students.",
    vision: "To improve professional communication.",
    mission: ["Train in soft skills and language proficiency."],
    admissions: { btech: 0, facultyStrength: 8, programs: "-" },
    programs: [],
    history: [{ year: "2001", text: "Division established." }],
    highlights: [{ title: "Language Lab", text: "Advanced digital language laboratories." }],
    peos: null,
    hasGallery: false
  },
  'bsh-maths': {
    name: "Mathematics",
    shortName: "MATHS",
    hodName: "Dr. Maths Head",
    hodTitle: "Ph.D",
    hodRole: "Head of Mathematics",
    hodMessage: "Welcome to Mathematics. Mathematics is the language of engineering. We provide strong analytical skills.",
    vision: "To cultivate analytical thinking.",
    mission: ["Provide strong mathematical foundation."],
    admissions: { btech: 0, facultyStrength: 12, programs: "-" },
    programs: [],
    history: [{ year: "2001", text: "Division established." }],
    highlights: [{ title: "Curriculum", text: "Applied mathematics for engineering applications." }],
    peos: null,
    hasGallery: false
  },
  'bsh-physics': {
    name: "Physics",
    shortName: "PHYSICS",
    hodName: "Dr. Physics Head",
    hodTitle: "Ph.D",
    hodRole: "Head of Physics",
    hodMessage: "Welcome to Physics. We explore the fundamental laws of nature that drive engineering innovations.",
    vision: "To understand and apply physical laws.",
    mission: ["Promote applied physics research."],
    admissions: { btech: 0, facultyStrength: 10, programs: "-" },
    programs: [],
    history: [{ year: "2001", text: "Division established." }],
    highlights: [{ title: "Research", text: "Active research in materials science." }],
    peos: null,
    hasGallery: false
  }
};
