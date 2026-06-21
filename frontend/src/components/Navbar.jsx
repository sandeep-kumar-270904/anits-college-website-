import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Dropdown Component Helper
  const NavItem = ({ title, to, children }) => {
    return (
      <div className="gh-nav-item">
        <Link to={to} className={`gh-nav-link ${location.pathname === to ? 'active' : ''}`}>
          {title} {children && <ChevronDown size={14} style={{marginLeft: '4px', opacity: 0.7}} />}
        </Link>
        {children && (
          <div className="gh-dropdown">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="site-header gh-header">
      <nav className="gh-navbar">
        <div className="gh-nav-container">
          
          <div className="gh-nav-left">
            <Link to="/" className="gh-logo">
              <span className="gh-logo-text">ANITS</span>
            </Link>
            
            <div className={`gh-links-container ${isOpen ? 'open' : ''}`}>
              <NavItem title="About Us" to="/about">
                <Link to="/about/glance">ANITS at a glance</Link>
                <Link to="/about/principal">Principal</Link>
                <Link to="/about/team">Our team</Link>
                <Link to="/about/committees">Committees</Link>
                <Link to="/about/academic-council">Academic council</Link>
                <Link to="/about/organization-chart">Organization chart</Link>
              </NavItem>
              <Link to="/admissions" className="gh-nav-link">Admissions</Link>
              <NavItem title="Academics" to="/academics">
                <Link to="/academics/calendar">Academic Calendar</Link>
                <Link to="/academics/timetable">Time Table</Link>
                <Link to="/academics/syllabus">Syllabus</Link>
                <Link to="/academics/exams">Exam Section</Link>
              </NavItem>
              <NavItem title="Departments" to="/departments">
                <Link to="/departments/cse">Computer Science and Eng.</Link>
                <Link to="/departments/it">Information Technology</Link>
                <Link to="/departments/ece">Electronics & Comm. Eng.</Link>
                <Link to="/departments/mech">Mechanical Engineering</Link>
              </NavItem>
              <Link to="/placements" className="gh-nav-link">Placements</Link>
              <NavItem title="More" to="#">
                <Link to="/faq">FAQ</Link>
                <Link to="/iqac">IQAC</Link>
                <Link to="/woman-cell">Woman Cell</Link>
                <Link to="/library">Library</Link>
                <Link to="/facilities">Facilities</Link>
              </NavItem>
            </div>
          </div>

          <div className="gh-nav-right">
            <div className="gh-contact-badge">
              <Phone size={14} style={{marginRight: '6px'}} /> 
              8712005599
            </div>
            {localStorage.getItem('adminToken') ? (
              <Link to="/admin/dashboard" className="gh-btn gh-btn-outline">Admin Panel</Link>
            ) : (
              <Link to="/admin/login" className="gh-btn gh-btn-outline">Sign in</Link>
            )}
            <button className="mobile-menu-btn" onClick={toggleMenu}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;
