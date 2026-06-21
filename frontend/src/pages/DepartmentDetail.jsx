import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Users, FlaskConical, Award } from 'lucide-react';

const mockDepartmentData = {
  cse: {
    name: "Computer Science & Engineering",
    hod: "Dr. Mock Professor",
    established: "2001",
    vision: "To be a center of excellence in computer science and engineering education, research, and application.",
    mission: [
      "Provide high-quality education in computer science.",
      "Foster research and innovation in emerging technologies like AI and ML.",
      "Build strong industry-academia collaborations."
    ],
    facultyCount: 45,
    labs: ["AI & Deep Learning Lab", "IoT & Cloud Computing Lab", "Cybersecurity Lab"],
    achievements: ["NBA Accredited", "100% Placement Record", "Multiple hackathon victories at national level"]
  },
  ece: {
    name: "Electronics & Communication",
    hod: "Dr. Signal Processing",
    established: "2001",
    vision: "To produce globally competitive electronics and communication engineers.",
    mission: [
      "Impart strong theoretical foundation and practical skills.",
      "Encourage research in VLSI, IoT, and embedded systems."
    ],
    facultyCount: 38,
    labs: ["VLSI Design Lab", "Microwave Engineering Lab", "Microprocessor Lab"],
    achievements: ["Funded research projects by AICTE", "Active IEEE Student Branch"]
  },
  mech: {
    name: "Mechanical Engineering",
    hod: "Dr. Thermo Dynamics",
    established: "2005",
    vision: "To develop skilled mechanical engineers capable of solving global industrial challenges.",
    mission: [
      "Provide state-of-the-art manufacturing training.",
      "Promote research in robotics and thermal engineering."
    ],
    facultyCount: 30,
    labs: ["CAD/CAM Lab", "Heat Transfer Lab", "Robotics Lab"],
    achievements: ["SAE Baja National Participants", "Advanced 3D Printing Facility"]
  },
  eee: {
    name: "Electrical & Electronics",
    hod: "Dr. Power Systems",
    established: "2001",
    vision: "To excel in electrical engineering education with a focus on sustainable energy.",
    mission: [
      "Train students in smart grids and renewable energy.",
      "Collaborate with power industries for practical exposure."
    ],
    facultyCount: 28,
    labs: ["Power Electronics Lab", "Control Systems Lab", "Electrical Machines Lab"],
    achievements: ["Top energy audit initiatives", "Smart Grid Research Center"]
  },
  it: {
    name: "Information Technology",
    hod: "Dr. Cloud Architect",
    established: "2006",
    vision: "To empower students with cutting-edge IT skills for the global software industry.",
    mission: [
      "Deliver curriculum aligned with modern software practices.",
      "Encourage open-source contributions and entrepreneurship."
    ],
    facultyCount: 32,
    labs: ["Data Science Lab", "Web Tech Lab", "Mobile App Dev Lab"],
    achievements: ["Excellence in Enterprise Software Solutions", "High placement packages in top MNCs"]
  },
  civil: {
    name: "Civil Engineering",
    hod: "Dr. Structural Design",
    established: "2010",
    vision: "To build a foundation for sustainable infrastructure through quality civil engineering education.",
    mission: [
      "Impart knowledge in structural and environmental engineering.",
      "Promote smart city development methodologies."
    ],
    facultyCount: 25,
    labs: ["Concrete Tech Lab", "Surveying Lab", "Fluid Mechanics Lab"],
    achievements: ["Consultancy projects for local government", "Award-winning sustainable design projects"]
  }
};

const DepartmentDetail = () => {
  const { id } = useParams();
  const dept = mockDepartmentData[id];

  if (!dept) {
    return (
      <div className="section text-center" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <h2>Department Not Found</h2>
          <Link to="/departments" className="btn btn-primary" style={{marginTop: '1rem'}}>Go Back</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{dept.name} | ANITS</title>
      </Helmet>

      <div className="page-header" style={{ background: 'linear-gradient(135deg, var(--primary-dark), #1a365d)', paddingBottom: '80px' }}>
        <div className="container animate-fade-in">
          <Link to="/departments" style={{ color: 'rgba(255,255,255,0.8)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <ArrowLeft size={16} /> Back to Departments
          </Link>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{dept.name}</h1>
          <div style={{ display: 'flex', gap: '2rem', color: 'rgba(255,255,255,0.9)', flexWrap: 'wrap' }}>
            <span style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Users size={18}/> Head of Department: {dept.hod}</span>
            <span style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><BookOpen size={18}/> Established: {dept.established}</span>
            <span style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Award size={18}/> Faculty Members: {dept.facultyCount}</span>
          </div>
        </div>
      </div>

      <div className="section bg-light" style={{ marginTop: '-40px', paddingTop: '0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', position: 'relative', zIndex: 10 }}>
            
            {/* Left Column: Vision & Mission */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="card animate-fade-in delay-100">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                  <Globe size={24} /> Vision
                </h3>
                <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>"{dept.vision}"</p>
              </div>

              <div className="card animate-fade-in delay-200">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                  <Award size={24} /> Mission
                </h3>
                <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {dept.mission.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </div>

            {/* Right Column: Labs & Achievements */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="card animate-fade-in delay-200">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                  <FlaskConical size={24} /> Key Laboratories
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                  {dept.labs.map((lab, i) => (
                    <span key={i} style={{ background: 'rgba(0, 77, 153, 0.1)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '500' }}>
                      {lab}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card animate-fade-in delay-300">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                  <Award size={24} /> Key Achievements
                </h3>
                <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {dept.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

// Helper icon component since Globe wasn't imported at top
const Globe = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
);

export default DepartmentDetail;
