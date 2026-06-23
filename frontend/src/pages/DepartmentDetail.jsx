import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Plus, Minus, ChevronLeft } from 'lucide-react';

// Shared Mock Data for Departments
const departmentData = {
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
    ]
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
      { title: "Academic Excellence", text: "State-of-the-art Data Analytics labs and curriculum aligned with modern data engineering practices." },
      { title: "Industry Tie-ups", text: "Collaborations with IT giants for data science internships." }
    ]
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
      { title: "Academic Excellence", text: "Comprehensive curriculum covering NLP, Computer Vision, and Deep Learning." },
      { title: "Student Achievements", text: "Students actively participate and win in national level AI hackathons." },
      { title: "Industry Institute", text: "MOU with leading AI startups for hands-on projects." }
    ]
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
    ]
  },
  it: {
    name: "Information Technology",
    shortName: "IT",
    hodName: "Prof. P. Padmaja",
    hodTitle: "M.Tech., Ph.D",
    hodRole: "HOD, Dept of Information Technology",
    hodMessage: "Dear Student Members, Staff and Parents, Welcome to the Department of Information Technology. We strongly believe that you are going to experience a rewarding learning curve. Our department is committed to producing top-notch IT professionals. We constantly update our curriculum to meet the demands of the ever-changing IT sector. We encourage students to actively participate in coding competitions, hackathons, and technical symposiums to enhance their practical skills and team spirit.",
    vision: "Department of IT envisions building a continuous learning environment involving modern technological tools and software for maximum outcome for the emerging IT Professionals.",
    mission: [
      "Provide skill-oriented education to meet the global demands of the IT Industry.",
      "Imparting the best theoretical knowledge along with practical training.",
      "To produce professionals capable of applying logic to practical problems.",
      "To promote research and innovation among students and staff."
    ],
    admissions: {
      btech: 180,
      facultyStrength: 33,
      programs: "B.Tech (IT), M.Tech (IT)"
    },
    programs: [
      { level: "UG", name: "B.Tech - Information Technology", duration: "4 Years", intake: 180 },
      { level: "PG", name: "M.Tech - Data Science", duration: "2 Years", intake: 18 }
    ],
    history: [
      { year: "2001", text: "B.Tech (IT) started with an intake of 60 students." },
      { year: "2007", text: "Intake increased to 120 students." },
      { year: "2012", text: "B.Tech intake increased to 180 students." },
      { year: "2017", text: "Introduced M.Tech in Data Science." }
    ],
    highlights: [
      { title: "Academic Excellence", text: "The IT Department has achieved incredible academic milestones, including high pass percentages and top university ranks. Our students consistently secure high-paying jobs in top MNCs like TCS, Infosys, Amazon, and Wipro. The department regularly conducts workshops, seminars, and FDPs." }
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  },
  mba: {
    name: "MBA (Hospital Administration)",
    shortName: "MBA",
    hodName: "Dr. V. Bindu Neeharika",
    hodTitle: "MBA, M.Phil, Ph.D",
    hodRole: "HOD, Dept of MBA",
    hodMessage: "Greetings and welcome to the School of Management Studies at Anil Neerukonda Institute of Technology & Sciences. Our department offers graduate and postgraduate programs in Management, emphasizing experiential learning through internships, case studies, and holistic education.",
    vision: "The Department of Management Studies envisions transforming into a center of excellence in management education dedicated to nurturing future leaders.",
    mission: [
      "To create resources matching the employability and management competencies of the students.",
      "Ensuring the stakeholders participation in every sphere of activity to uphold the tradition of inclusive growth."
    ],
    admissions: { btech: 60, facultyStrength: 10, programs: "MBA" },
    programs: [{ level: "PG", name: "MBA (Hospital Administration)", duration: "2 Years", intake: 60 }],
    history: [{ year: "2023", text: "ANITS proudly presents a distinctive postgraduate program in MBA (Hospital Administration), launched in 2023." }],
    highlights: [
      { title: "Department Highlights", text: "To be updated soon." }
    ]
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
    highlights: [{ title: "Excellence", text: "Highly qualified faculty." }]
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
    highlights: [{ title: "Labs", text: "State of the art chemistry labs." }]
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
    highlights: [{ title: "Language Lab", text: "Advanced digital language laboratories." }]
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
    highlights: [{ title: "Curriculum", text: "Applied mathematics for engineering applications." }]
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
    highlights: [{ title: "Research", text: "Active research in materials science." }]
  }
};

const DepartmentDetail = () => {
  const { id } = useParams();
  const dept = departmentData[id] || departmentData['it']; // fallback to IT
  const [expandedMenus, setExpandedMenus] = useState(['Department Profile']);

  // Sidebar Menu Structure
  const sidebarMenus = [
    { 
      name: 'Department Profile', 
      hasSubs: true,
      subs: ['About Us', 'Vision & Mission', 'Message from HOD', 'PEOs, PSOs & POs', 'Board of Studies'] 
    },
    { name: 'Academics', hasSubs: true, subs: ['Syllabus', 'Timetable'] },
    { name: 'R&D', hasSubs: true, subs: ['Publications', 'Patents'] },
    { name: 'Student Activities', hasSubs: true, subs: ['Clubs', 'Events'] },
    { name: 'Placements', hasSubs: true, subs: ['Statistics', 'Recruiters'] },
    { name: 'Infrastructure & Facilities', hasSubs: true, subs: ['Labs', 'Classrooms'] },
    { name: 'Student Welfare', hasSubs: true, subs: ['Counseling', 'Grievance'] },
    { name: 'Self Learning', hasSubs: false },
    { name: 'Career Guidance', hasSubs: false },
    { name: 'Alumni', hasSubs: true, subs: ['Alumni Directory', 'Events'] },
    { name: 'Faculty', hasSubs: false },
    { name: 'Feedback', hasSubs: false },
    { name: 'Best Practices & Innovations', hasSubs: false },
    { name: 'Photo Gallery', hasSubs: false },
    { name: 'Contact', hasSubs: false },
  ];

  const toggleMenu = (menuName) => {
    setExpandedMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(item => item !== menuName)
        : [...prev, menuName]
    );
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -150; 
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  return (
    <div className="font-sans min-h-screen bg-[#f8f9fa] pt-[80px]">
      <Helmet>
        <title>{dept.name} | ANITS</title>
      </Helmet>

      {/* Blue Top Nav Bar */}
      <div className="w-full bg-[#e6f0fa] border-b border-[#c4d9f2] py-3 px-4 md:px-12 flex justify-between items-center sticky top-[80px] z-30 shadow-sm">
        <h2 className="text-[#1e3a8a] font-bold text-lg md:text-xl uppercase">{dept.name}</h2>
        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-1.5 rounded text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
          Explore {dept.shortName} <ChevronDown size={16} />
        </button>
      </div>

      {/* Main Image Carousel Placeholder */}
      <div className="w-full h-[250px] md:h-[450px] bg-gray-300 relative group overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/30">
          <span className="text-white font-bold text-xl md:text-3xl tracking-wider">[ CAROUSEL PLACEHOLDER ]</span>
        </div>
        {/* Carousel controls mock */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-black/40 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-black/60"><ChevronLeft /></div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-black/40 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-black/60"><ChevronRight /></div>
      </div>

      {/* Horizontal Quick Links Pill Menu */}
      <div className="w-full bg-white shadow-sm border-b border-gray-100 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex gap-4 px-4 py-4 min-w-max">
          <button onClick={() => scrollToSection('hod')} className="px-5 py-2 rounded-full border border-blue-200 text-blue-800 bg-blue-50 text-sm font-semibold hover:bg-blue-100 transition-colors">Message from HoD</button>
          <button onClick={() => scrollToSection('overview')} className="px-5 py-2 rounded-full border border-blue-200 text-blue-800 bg-blue-50 text-sm font-semibold hover:bg-blue-100 transition-colors">Vision & Mission</button>
          <button onClick={() => scrollToSection('peos')} className="px-5 py-2 rounded-full border border-blue-200 text-blue-800 bg-blue-50 text-sm font-semibold hover:bg-blue-100 transition-colors">PEOs, PSOs & POs</button>
          <button onClick={() => scrollToSection('programs')} className="px-5 py-2 rounded-full border border-blue-200 text-blue-800 bg-blue-50 text-sm font-semibold hover:bg-blue-100 transition-colors">Programs Offered</button>
          <button onClick={() => scrollToSection('history')} className="px-5 py-2 rounded-full border border-blue-200 text-blue-800 bg-blue-50 text-sm font-semibold hover:bg-blue-100 transition-colors">Dept. History</button>
          <button onClick={() => scrollToSection('highlights')} className="px-5 py-2 rounded-full border border-blue-200 text-blue-800 bg-blue-50 text-sm font-semibold hover:bg-blue-100 transition-colors">Dept. Highlights</button>
          <button onClick={() => scrollToSection('gallery')} className="px-5 py-2 rounded-full border border-blue-200 text-blue-800 bg-blue-50 text-sm font-semibold hover:bg-blue-100 transition-colors">Photo Gallery</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row mt-8 px-4 pb-16 gap-8">
        
        {/* Left Sidebar (Accordion) */}
        <div className="w-full md:w-1/4 flex-shrink-0">
          <div className="bg-[#f1f5f9] rounded-sm overflow-hidden border border-gray-200 shadow-sm md:sticky md:top-[160px]">
            {sidebarMenus.map((menu, idx) => {
              const isExpanded = expandedMenus.includes(menu.name);
              return (
                <div key={idx} className="border-b border-white last:border-b-0">
                  <button 
                    onClick={() => menu.hasSubs && toggleMenu(menu.name)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors ${isExpanded && menu.hasSubs ? 'bg-[#1e3a8a] text-white' : 'bg-[#e2e8f0] text-gray-800 hover:bg-[#cbd5e1]'}`}
                  >
                    <span>{menu.name}</span>
                    {menu.hasSubs && (
                      <span className={`p-1 rounded ${isExpanded ? 'bg-white/20' : 'bg-white'}`}>
                        {isExpanded ? <Minus size={14} className={isExpanded ? 'text-white' : 'text-[#1e3a8a]'} /> : <Plus size={14} className="text-[#1e3a8a]" />}
                      </span>
                    )}
                  </button>
                  
                  {/* Expanded Sub-menu Placeholders */}
                  {isExpanded && menu.hasSubs && menu.subs && (
                    <div className="bg-white px-4 py-2 flex flex-col">
                      {menu.subs.map((subItem, sIdx) => (
                        <Link key={sIdx} to="#" className={`text-sm text-gray-600 py-2 border-b border-gray-100 hover:text-blue-600 transition-colors pl-2 flex items-center gap-2 ${sIdx === menu.subs.length - 1 ? 'border-b-0' : ''}`}>
                          <ChevronRight size={14}/> {subItem}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="w-full md:w-3/4 flex flex-col gap-12">
          
          {/* HOD Section */}
          <section id="hod">
            <h2 className="text-[#1e3a8a] text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Message from Head of Department</h2>
            <div className="bg-white p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/4 flex flex-col items-center flex-shrink-0">
                <div className="w-40 h-48 bg-gray-200 mb-4 object-cover overflow-hidden border border-gray-300">
                   {/* We will load image later, placeholder for now */}
                   <img 
                    src={`/images/${dept.hodName}.png`} 
                    alt={dept.hodName} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                   />
                </div>
                <h4 className="font-bold text-gray-900 text-center text-sm">{dept.hodName}</h4>
                <p className="text-gray-500 text-xs text-center mt-1 font-medium">{dept.hodTitle}</p>
                <p className="text-gray-500 text-xs text-center">{dept.hodRole}</p>
              </div>
              <div className="w-full md:w-3/4">
                <p className="text-gray-600 text-sm leading-relaxed text-justify mb-4">
                  {dept.hodMessage}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed text-justify font-medium italic">
                  "Wishing you all a successful and rewarding journey ahead!"
                </p>
              </div>
            </div>
          </section>

          {/* Overview Section */}
          <section id="overview">
            <h2 className="text-[#1e3a8a] text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Department Overview</h2>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Vision & Mission */}
              <div className="w-full lg:w-2/3 bg-white shadow-sm border border-gray-100 p-6 flex flex-col gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-3">Vision</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{dept.vision}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-3">Mission</h3>
                  <ul className="list-disc pl-5 space-y-1.5">
                    {dept.mission.map((m, i) => (
                      <li key={i} className="text-gray-600 text-sm leading-relaxed">{m}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick Details Box */}
              <div className="w-full lg:w-1/3 flex flex-col gap-4">
                <div className="bg-white shadow-sm border border-gray-100 p-5 border-l-4 border-l-blue-600">
                  <h4 className="font-bold text-gray-900 mb-3 text-sm">Admissions</h4>
                  <ul className="space-y-2">
                    <li className="text-xs text-gray-600 flex items-center gap-2"><ChevronRight size={12} className="text-blue-500"/> Intake (B.Tech): {dept.admissions.btech}</li>
                    <li className="text-xs text-gray-600 flex items-center gap-2"><ChevronRight size={12} className="text-blue-500"/> Faculty Strength: {dept.admissions.facultyStrength}</li>
                    <li className="text-xs text-gray-600 flex items-center gap-2"><ChevronRight size={12} className="text-blue-500"/> Placements (Current): TBA</li>
                  </ul>
                </div>
                <div className="bg-white shadow-sm border border-gray-100 p-5 border-l-4 border-l-blue-600">
                  <h4 className="font-bold text-gray-900 mb-3 text-sm">Programmes</h4>
                  <ul className="space-y-2">
                    <li className="text-xs text-gray-600 flex items-center gap-2"><ChevronRight size={12} className="text-blue-500"/> {dept.admissions.programs}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* PEOs, PSOs and POs Section */}
          <section id="peos">
            <h2 className="text-[#1e3a8a] text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Department PEOs, PSOs and POs</h2>
            <div className="bg-white shadow-sm border border-gray-100 p-8 border-l-4 border-l-yellow-400">
              
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-3">Program Educational Objectives (PEOs)</h3>
                <ul className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
                  <li><strong>PEO 1:</strong> To produce graduates with a strong foundation in basic sciences and engineering.</li>
                  <li><strong>PEO 2:</strong> To equip students with the skills to design, develop, and solve complex problems in their respective fields.</li>
                  <li><strong>PEO 3:</strong> To instill professional ethics, teamwork, and leadership qualities for successful careers and continuous learning.</li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-3">Program Outcomes (POs)</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li><strong>1. Engineering Knowledge:</strong> Apply the knowledge of mathematics, science, engineering fundamentals to the solution of complex engineering problems.</li>
                  <li><strong>2. Problem Analysis:</strong> Identify, formulate, review research literature, and analyze complex engineering problems.</li>
                  <li><strong>3. Design/development of solutions:</strong> Design solutions for complex engineering problems and design system components.</li>
                  <li><strong>4. Conduct investigations of complex problems:</strong> Use research-based knowledge and research methods.</li>
                  <li><strong>5. Modern tool usage:</strong> Create, select, and apply appropriate techniques and modern engineering and IT tools.</li>
                  <li><strong>6. The engineer and society:</strong> Apply reasoning informed by the contextual knowledge to assess societal, health, safety issues.</li>
                  <li><strong>7. Environment and sustainability:</strong> Understand the impact of the professional engineering solutions in environmental contexts.</li>
                  <li><strong>8. Ethics:</strong> Apply ethical principles and commit to professional ethics and responsibilities.</li>
                  <li><strong>9. Individual and team work:</strong> Function effectively as an individual, and as a member or leader in diverse teams.</li>
                  <li><strong>10. Communication:</strong> Communicate effectively on complex engineering activities with the engineering community.</li>
                  <li><strong>11. Project management and finance:</strong> Demonstrate knowledge and understanding of the engineering and management principles.</li>
                  <li><strong>12. Life-long learning:</strong> Recognize the need for, and have the preparation and ability to engage in independent life-long learning.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">Program Specific Outcomes (PSOs)</h3>
                <ul className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
                  <li><strong>PSO 1:</strong> Apply modern tools, programming languages, and frameworks to develop efficient solutions for real-world applications.</li>
                  <li><strong>PSO 2:</strong> Design and implement scalable architectures that meet industry standards.</li>
                </ul>
              </div>

            </div>
          </section>

          {/* Programs Offered Section */}
          <section id="programs">
            <h2 className="text-[#1e3a8a] text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Programs Offered</h2>
            <div className="bg-white shadow-sm border border-gray-100 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-4 text-sm font-bold text-gray-700">S.No</th>
                    <th className="p-4 text-sm font-bold text-gray-700">Level</th>
                    <th className="p-4 text-sm font-bold text-gray-700">Program Name</th>
                    <th className="p-4 text-sm font-bold text-gray-700">Duration</th>
                    <th className="p-4 text-sm font-bold text-gray-700">Intake</th>
                  </tr>
                </thead>
                <tbody>
                  {dept.programs.map((prog, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 text-sm text-gray-600">{i + 1}</td>
                      <td className="p-4 text-sm text-gray-600">{prog.level}</td>
                      <td className="p-4 text-sm text-gray-600">{prog.name}</td>
                      <td className="p-4 text-sm text-gray-600">{prog.duration}</td>
                      <td className="p-4 text-sm text-gray-600">{prog.intake}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Department History Section */}
          <section id="history">
            <h2 className="text-[#1e3a8a] text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Department History</h2>
            <div className="bg-white shadow-sm border border-gray-100 p-8">
              <div className="relative border-l-2 border-blue-500 ml-3">
                {dept.history.map((event, i) => (
                  <div key={i} className="mb-8 ml-6 relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm"></div>
                    <h4 className="text-blue-600 font-bold text-sm mb-1">{event.year}</h4>
                    <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded border border-gray-100">{event.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Department Highlights */}
          <section id="highlights" className="scroll-mt-[150px]">
            <h2 className="text-[#1e3a8a] text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Department Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dept.highlights.map((highlight, i) => (
                <div key={i} className="bg-white shadow-sm border border-gray-100 p-6 border-l-4 border-l-blue-500">
                  <h3 className="font-bold text-gray-900 mb-2 text-sm">{highlight.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {highlight.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Department Gallery */}
          <section id="gallery">
            <h2 className="text-[#1e3a8a] text-2xl font-bold mb-6 pb-2 border-b border-gray-200 text-center">Department Gallery</h2>
            <div className="w-full bg-[#f8f9fa] py-8 border border-gray-100 shadow-sm flex items-center justify-center relative group overflow-hidden">
              <div className="w-4/5 h-[300px] md:h-[400px] bg-gray-200 relative flex items-center justify-center border border-gray-300">
                 <span className="text-gray-500 font-bold tracking-widest text-lg">[ GALLERY PLACEHOLDER ]</span>
              </div>
              <div className="absolute left-6 w-10 h-10 bg-black/20 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-black/40"><ChevronLeft /></div>
              <div className="absolute right-6 w-10 h-10 bg-black/20 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-black/40"><ChevronRight /></div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;
