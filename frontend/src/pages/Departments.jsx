import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Cpu, Wrench, Zap, Database, Globe } from 'lucide-react';

const Departments = () => {
  const depts = [
    { id: 'cse', name: "Computer Science & Engineering", desc: "Focus on AI, Web Development, Cybersecurity, and LLM technologies.", icon: <Code size={40} /> },
    { id: 'ece', name: "Electronics & Communication", desc: "Specializing in VLSI, IoT, Embedded Systems, and Signal Processing.", icon: <Cpu size={40} /> },
    { id: 'mech', name: "Mechanical Engineering", desc: "Robotics, Thermal Engineering, and modern manufacturing processes.", icon: <Wrench size={40} /> },
    { id: 'eee', name: "Electrical & Electronics", desc: "Power systems, renewable energy, and smart grid technologies.", icon: <Zap size={40} /> },
    { id: 'it', name: "Information Technology", desc: "Cloud computing, data analytics, and enterprise software solutions.", icon: <Database size={40} /> },
    { id: 'civil', name: "Civil Engineering", desc: "Structural design, smart cities, and sustainable construction.", icon: <Globe size={40} /> }
  ];

  return (
    <>
      <Helmet>
        <title>Departments | ANITS</title>
      </Helmet>
      
      <div className="page-header">
        <div className="container animate-fade-in">
          <h1>Our Departments</h1>
          <p style={{fontSize: '1.2rem', opacity: 0.9}}>Explore the diverse engineering disciplines offered at ANITS.</p>
        </div>
      </div>

      <div className="section bg-light" style={{ minHeight: '60vh' }}>
        <div className="container">
          <div className="features-grid">
            {depts.map((dept, index) => (
              <div key={index} className={`feature-card animate-fade-in delay-${(index % 3 + 1) * 100}`}>
                <div className="feature-icon">{dept.icon}</div>
                <h3 style={{marginBottom: '1rem'}}>{dept.name}</h3>
                <p style={{marginBottom: '2rem', color: 'var(--text-muted)'}}>{dept.desc}</p>
                <Link to={`/departments/${dept.id}`} className="btn btn-primary" style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', width: '100%', justifyContent: 'center'}}>
                  View Details <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Departments;
