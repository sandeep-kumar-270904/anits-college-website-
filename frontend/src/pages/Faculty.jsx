import React from 'react';
import { Helmet } from 'react-helmet-async';

const Faculty = () => {
  const faculty = [
    { title: "PRINCIPAL", name: "Prof V Rajyalakshmi", desc: "Expert in Communication Systems and Antennas.", img: "https://via.placeholder.com/300" },
    { title: "IIC CONVENOR", name: "Dr P Murugapandiyan", desc: "Conducted many Workshops, hackathons, and competitions.", img: "https://via.placeholder.com/300" },
    { title: "HOD", name: "Prof M RekhaSundari", desc: "Leading the department with 20+ years of academic excellence.", img: "https://via.placeholder.com/300" }
  ];

  return (
    <>
      <Helmet>
        <title>Faculty | ANITS</title>
        <meta name="description" content="Meet the distinguished faculty at ANITS." />
      </Helmet>
      
      <div className="page-header">
        <div className="container animate-fade-in">
          <h1>Faculty Profiles</h1>
          <p>Learn from the Best in the Industry</p>
        </div>
      </div>

      <section className="section">
        <div className="container animate-fade-in delay-100">
          <div className="footer-grid">
            {faculty.map((f, i) => (
              <div key={i} className="card" style={{textAlign: 'center'}}>
                <div style={{
                  width: '150px', height: '150px', 
                  borderRadius: '50%', margin: '0 auto 1.5rem',
                  background: '#ddd', overflow: 'hidden'
                }}>
                  <img src={f.img} alt={f.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                </div>
                <h3>{f.title}</h3>
                <h4 style={{color: 'var(--primary)', marginBottom: '1rem'}}>{f.name}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Faculty;
