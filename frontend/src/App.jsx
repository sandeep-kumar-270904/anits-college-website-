import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import About from './pages/About';
import Departments from './pages/Departments';
import Faculty from './pages/Faculty';
import Events from './pages/Events';
import Circulars from './pages/Circulars';
import Contact from './pages/Contact';
import Admissions from './pages/Admissions';
import Placements from './pages/Placements';
import DepartmentDetail from './pages/DepartmentDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/placements" element={<Placements />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/departments/:id" element={<DepartmentDetail />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/events" element={<Events />} />
              <Route path="/circulars" element={<Circulars />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
