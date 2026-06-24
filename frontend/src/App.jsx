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
import Principal from './pages/Principal';
import Team from './pages/Team';
import Committees from './pages/Committees';
import AcademicCouncil from './pages/AcademicCouncil';
import OrganizationChart from './pages/OrganizationChart';
import Library from './pages/Library';
import Syllabus from './pages/Syllabus';
import Nss from './pages/Nss';
import Facilities from './pages/Facilities';
import HealthCentre from './pages/HealthCentre';
import Atm from './pages/Atm';
import ComputerCentre from './pages/ComputerCentre';
import YogaCentre from './pages/YogaCentre';
import RainwaterHarvesting from './pages/RainwaterHarvesting';
import Ncc from './pages/Ncc';
import Transport from './pages/Transport';
import Canteen from './pages/Canteen';
import Hostel from './pages/Hostel';
import Gymnasium from './pages/Gymnasium';
import Policies from './pages/Policies';
import WomenEmpowerment from './pages/WomenEmpowerment';
import WomenGrievance from './pages/WomenGrievance';
import Iqac from './pages/Iqac';
import Research from './pages/Research';
import Gallery from './pages/Gallery';
import Blogs from './pages/Blogs';
import Alumni from './pages/Alumni';
import GenericAcademicPage from './pages/GenericAcademicPage';
import Apssdc from './pages/Apssdc';
import ProfessionalBodies from './pages/ProfessionalBodies';
import SwayamNptel from './pages/SwayamNptel';
import ExamSection from './pages/ExamSection';
import ELearning from './pages/ELearning';
import AcademicCalendar from './pages/AcademicCalendar';
import TimeTables from './pages/TimeTables';
import IsoCertificate from './pages/IsoCertificate';
import ScrollToTop from './components/ScrollToTop';
import SocialSidebar from './components/SocialSidebar';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <SocialSidebar />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/about/glance" element={<About />} />
              <Route path="/about/principal" element={<Principal />} />
              <Route path="/about/team" element={<Team />} />
              <Route path="/about/committees" element={<Committees />} />
              <Route path="/about/academic-council" element={<AcademicCouncil />} />
              <Route path="/about/organization-chart" element={<OrganizationChart />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/academics/syllabus" element={<Syllabus />} />
              <Route path="/academics/calendar" element={<AcademicCalendar />} />
              <Route path="/academics/timetable" element={<TimeTables />} />
              <Route path="/academics/e-learning" element={<ELearning />} />
              <Route path="/academics/exams" element={<ExamSection />} />
              <Route path="/academics/iso-certificate" element={<IsoCertificate />} />
              <Route path="/academics/apssdc" element={<Apssdc />} />
              <Route path="/academics/swayam-nptel" element={<SwayamNptel />} />
              <Route path="/academics/professional-bodies" element={<ProfessionalBodies />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/iqac" element={<Iqac />} />
              <Route path="/rd" element={<Research />} />
              <Route path="/women-cell/empowerment" element={<WomenEmpowerment />} />
              <Route path="/women-cell/grievance" element={<WomenGrievance />} />
              <Route path="/library" element={<Library />} />
              <Route path="/facilities/nss" element={<Nss />} />
              <Route path="/training" element={<Placements />} />
              <Route path="/placements" element={<Placements />} />
              <Route path="/facilities" element={<Facilities />} />
              <Route path="/facilities/health-centre" element={<HealthCentre />} />
              <Route path="/facilities/atm" element={<Atm />} />
              <Route path="/facilities/computer-centre" element={<ComputerCentre />} />
              <Route path="/facilities/yoga" element={<YogaCentre />} />
              <Route path="/facilities/rainwater-harvesting" element={<RainwaterHarvesting />} />
              <Route path="/facilities/ncc" element={<Ncc />} />
              <Route path="/facilities/transport" element={<Transport />} />
              <Route path="/facilities/canteen" element={<Canteen />} />
              <Route path="/facilities/hostel" element={<Hostel />} />
              <Route path="/facilities/gymnasium" element={<Gymnasium />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/alumni" element={<Alumni />} />
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
