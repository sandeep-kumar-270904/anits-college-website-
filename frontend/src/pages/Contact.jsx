import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | ANITS</title>
        <meta name="description" content="Get in touch with Anil Neerukonda Institute of Technology and Sciences." />
      </Helmet>
      
      <div className="page-header">
        <div className="container animate-fade-in">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </div>
      </div>

      <section className="section">
        <div className="container animate-fade-in delay-100">
          <div className="footer-grid">
            <div className="card text-center" style={{textAlign: 'center'}}>
              <MapPin size={40} color="var(--primary)" style={{margin: '0 auto 1rem'}} />
              <h3>Our Campus</h3>
              <p>ANITS Campus, Sangivalasa,<br/>Bheemunipatnam Mandal,<br/>Visakhapatnam, AP, India - 531162</p>
            </div>
            
            <div className="card text-center" style={{textAlign: 'center'}}>
              <Phone size={40} color="var(--primary)" style={{margin: '0 auto 1rem'}} />
              <h3>Phone</h3>
              <p>Main Office: +91-891-2841111</p>
              <p>Admissions: +91-891-2841122</p>
            </div>
            
            <div className="card text-center" style={{textAlign: 'center'}}>
              <Mail size={40} color="var(--primary)" style={{margin: '0 auto 1rem'}} />
              <h3>Email</h3>
              <p>General Enquiries: info@anits.edu.in</p>
              <p>Admissions: admissions@anits.edu.in</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
