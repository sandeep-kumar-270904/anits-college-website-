import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Briefcase, TrendingUp, Users, Building, Target } from 'lucide-react';

const mockRecruiters = [
  "Amazon", "TCS", "Infosys", "Wipro", "Cognizant", 
  "Capgemini", "Accenture", "Tech Mahindra", "IBM", "Deloitte"
];

const Placements = () => {
  return (
    <>
      <Helmet>
        <title>Placements | ANITS</title>
      </Helmet>
      
      <div className="page-header" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="container animate-fade-in">
          <h1>Training & Placements</h1>
          <p style={{fontSize: '1.2rem', opacity: 0.9}}>Empowering students with world-class career opportunities.</p>
        </div>
      </div>

      {/* Stats Section */}
      <section className="stats-section" style={{ background: 'var(--accent)', color: 'var(--primary-dark)' }}>
        <div className="container animate-fade-in delay-100">
          <div className="stats-grid">
            <div className="stat-card">
              <h2 className="stat-number" style={{color: 'var(--primary-dark)'}}>1200+</h2>
              <p style={{fontWeight: '600'}}>Offers in 2025-26</p>
            </div>
            <div className="stat-card">
              <h2 className="stat-number" style={{color: 'var(--primary-dark)'}}>44 LPA</h2>
              <p style={{fontWeight: '600'}}>Highest Package</p>
            </div>
            <div className="stat-card">
              <h2 className="stat-number" style={{color: 'var(--primary-dark)'}}>6.5 LPA</h2>
              <p style={{fontWeight: '600'}}>Average Package</p>
            </div>
            <div className="stat-card">
              <h2 className="stat-number" style={{color: 'var(--primary-dark)'}}>100+</h2>
              <p style={{fontWeight: '600'}}>Companies Visited</p>
            </div>
          </div>
        </div>
      </section>

      <div className="section bg-light">
        <div className="container">
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            {/* T&P Cell Info */}
            <div className="card animate-fade-in delay-200">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>
                <Target size={24} /> Training Methodology
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.7' }}>
                The Training and Placement Cell is a core area of ANITS. We believe in preparing students not just for their first job, but for their entire career.
              </p>
              <ul style={{ color: 'var(--text-muted)', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li>Intensive coding and algorithmic training from 2nd year.</li>
                <li>Aptitude, logical reasoning, and soft-skills workshops.</li>
                <li>Mock interviews conducted by industry experts.</li>
                <li>Company-specific training modules prior to recruitment drives.</li>
              </ul>
            </div>

            {/* Top Recruiters */}
            <div className="card animate-fade-in delay-300">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>
                <Building size={24} /> Top Recruiters
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {mockRecruiters.map((company, index) => (
                  <span key={index} style={{ 
                    padding: '0.5rem 1rem', 
                    background: 'white', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontWeight: '500',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Success Stories / Testimonials */}
          <div className="section-header animate-fade-in delay-400" style={{ marginBottom: '2rem' }}>
            <h2 className="section-title">Alumni Success Stories</h2>
          </div>
          
          <div className="features-grid">
            <div className="feature-card animate-fade-in delay-400" style={{ textAlign: 'left', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>A</div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Anjali Sharma</h4>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Software Development Engineer @ Amazon</p>
                </div>
              </div>
              <p style={{ fontStyle: 'italic', color: '#555' }}>"The rigorous coding culture and the mock interview sessions at ANITS were instrumental in helping me clear the tough technical rounds at Amazon."</p>
            </div>

            <div className="feature-card animate-fade-in delay-500" style={{ textAlign: 'left', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--accent)', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>R</div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Rahul Verma</h4>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Data Scientist @ Deloitte</p>
                </div>
              </div>
              <p style={{ fontStyle: 'italic', color: '#555' }}>"The hands-on projects and continuous support from the T&P cell prepared me perfectly for my role as a Data Scientist."</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Placements;
