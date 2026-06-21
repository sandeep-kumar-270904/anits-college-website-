import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Calendar, CreditCard, FileText } from 'lucide-react';

const Admissions = () => {
  return (
    <>
      <Helmet>
        <title>Admissions | ANITS</title>
      </Helmet>
      
      <div className="page-header" style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))' }}>
        <div className="container animate-fade-in">
          <h1>Admissions 2026-27</h1>
          <p style={{fontSize: '1.2rem', opacity: 0.9}}>Join the next generation of global engineering leaders.</p>
        </div>
      </div>

      <div className="section bg-light">
        <div className="container">
          
          {/* Eligibility & Process */}
          <div className="features-grid" style={{ marginBottom: '4rem' }}>
            <div className="feature-card animate-fade-in delay-100">
              <div className="feature-icon"><CheckCircle size={30} /></div>
              <h3>Eligibility Criteria</h3>
              <ul style={{ textAlign: 'left', marginTop: '1rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                <li>• 10+2 with Physics, Mathematics, and Chemistry.</li>
                <li>• Minimum 60% aggregate in qualifying exam.</li>
                <li>• Valid rank in AP EAPCET / JEE Mains.</li>
              </ul>
            </div>
            
            <div className="feature-card animate-fade-in delay-200">
              <div className="feature-icon"><FileText size={30} /></div>
              <h3>Admission Process</h3>
              <ul style={{ textAlign: 'left', marginTop: '1rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                <li>• <b>Category-A:</b> 70% seats filled via AP EAPCET counseling.</li>
                <li>• <b>Category-B:</b> 30% seats filled under Management/NRI quota.</li>
                <li>• <b>Lateral Entry:</b> 10% supernumerary seats via AP ECET.</li>
              </ul>
            </div>
          </div>

          {/* Important Dates */}
          <div className="card animate-fade-in delay-300" style={{ marginBottom: '4rem', borderTop: '4px solid var(--accent)' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Calendar size={28} color="var(--accent)" /> Important Dates (Tentative)
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #eee' }}>
                    <th style={{ padding: '1rem' }}>Event</th>
                    <th style={{ padding: '1rem' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem' }}>AP EAPCET Notification</td>
                    <td style={{ padding: '1rem', fontWeight: '500' }}>February 2026</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem' }}>Entrance Examination</td>
                    <td style={{ padding: '1rem', fontWeight: '500' }}>May 2026</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem' }}>Counseling Process Begins</td>
                    <td style={{ padding: '1rem', fontWeight: '500' }}>July 2026</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1rem' }}>Commencement of Classes</td>
                    <td style={{ padding: '1rem', fontWeight: '500' }}>August 2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Fee Structure */}
          <div className="card animate-fade-in delay-400">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <CreditCard size={28} color="var(--primary)" /> Fee Structure
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              The fee structure is approved by the AP Higher Education Regulatory and Monitoring Commission (APHERMC).
            </p>
            <div style={{ background: 'rgba(0, 77, 153, 0.05)', padding: '1.5rem', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.1)', marginBottom: '1rem' }}>
                <span style={{ fontWeight: '600' }}>B.Tech Tuition Fee (Per Annum)</span>
                <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>₹ 76,300</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600' }}>Hostel Fee (Optional, Per Annum)</span>
                <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>₹ 80,000</span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '1rem', fontStyle: 'italic' }}>
              * Fees are subject to change based on government notifications. Scholarships are available for meritorious and reserved category students.
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Admissions;
