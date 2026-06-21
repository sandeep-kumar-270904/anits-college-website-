import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Download } from 'lucide-react';

const Circulars = () => {
  const circulars = [
    { title: "Academic Calendar 2026-27", date: "June 10, 2026", size: "2.4 MB" },
    { title: "Hostel Fee Structure update", date: "May 25, 2026", size: "1.1 MB" },
    { title: "Mid-Term Examination Schedule", date: "May 15, 2026", size: "850 KB" },
    { title: "Guidelines for Mini Projects", date: "April 30, 2026", size: "3.2 MB" }
  ];

  return (
    <>
      <Helmet>
        <title>Circulars & Notices | ANITS</title>
        <meta name="description" content="Download official circulars, academic calendars, and notices from ANITS." />
      </Helmet>
      
      <div className="page-header">
        <div className="container animate-fade-in">
          <h1>Circulars & Notices</h1>
          <p>Official Announcements and Documents</p>
        </div>
      </div>

      <section className="section">
        <div className="container animate-fade-in delay-100">
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            {circulars.map((c, i) => (
              <div key={i} className="card" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '1.5rem'}}>
                <div>
                  <h3 style={{marginBottom: '0.5rem'}}>{c.title}</h3>
                  <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Published: {c.date} • Size: {c.size}</p>
                </div>
                <button className="btn btn-primary" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem'}}>
                  <Download size={18} /> Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Circulars;
