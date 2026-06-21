import React from 'react';
import { Helmet } from 'react-helmet-async';

const Events = () => {
  const events = [
    { title: "TechSession", desc: "A preparation session for upcoming hackathons and competitions.", date: "Oct 15, 2026" },
    { title: "SIH ANITS", desc: "Smart India Hackathon internal campus level competition.", date: "Nov 2, 2026" },
    { title: "Annual Sports Meet", desc: "Inter-departmental sports championship.", date: "Dec 10, 2026" }
  ];

  return (
    <>
      <Helmet>
        <title>Events | ANITS</title>
        <meta name="description" content="Upcoming events, hackathons, and tech sessions at ANITS." />
      </Helmet>
      
      <div className="page-header">
        <div className="container animate-fade-in">
          <h1>Upcoming Events</h1>
          <p>Discover what's happening at ANITS</p>
        </div>
      </div>

      <section className="section">
        <div className="container animate-fade-in delay-100">
          <div className="footer-grid">
            {events.map((e, i) => (
              <div key={i} className="card">
                <div style={{color: 'var(--accent-light)', fontWeight: 'bold', marginBottom: '0.5rem', background: 'var(--primary)', display: 'inline-block', padding: '0.2rem 0.8rem', borderRadius: '15px'}}>
                  {e.date}
                </div>
                <h3>{e.title}</h3>
                <p>{e.desc}</p>
                <button className="btn btn-primary" style={{marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '0.9rem'}}>Register Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
