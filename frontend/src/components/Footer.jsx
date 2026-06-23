import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  CreditCard, 
  Award, 
  Search, 
  Ban, 
  MessageCircle, 
  MapPin, 
  Phone, 
  Mail 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#2a5682] to-[#3679af] text-white pt-16 pb-6 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Vital Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 tracking-wide">Vital Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/admissions" className="flex items-center gap-3 hover:text-blue-200 transition-colors">
                  <GraduationCap size={18} />
                  <span>CAT-B Admissions</span>
                </Link>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 hover:text-blue-200 transition-colors">
                  <CreditCard size={18} />
                  <span>Online Payment</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 hover:text-blue-200 transition-colors">
                  <Award size={18} />
                  <span>NIRF</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 hover:text-blue-200 transition-colors">
                  <Search size={18} />
                  <span>NBA</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 hover:text-blue-200 transition-colors">
                  <Search size={18} />
                  <span>NAAC</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 tracking-wide">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/policies" className="flex items-center gap-3 hover:text-blue-200 transition-colors">
                  <Ban size={18} />
                  <span>Anti Ragging</span>
                </Link>
              </li>
              <li>
                <Link to="/women-cell/grievance" className="flex items-center gap-3 hover:text-blue-200 transition-colors">
                  <MessageCircle size={18} />
                  <span>Grievance</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="text-xl font-bold mb-6 tracking-wide">Get In Touch</h3>
            <ul className="space-y-5 text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-red-400 mt-1 flex-shrink-0" />
                <span>
                  Anil Neerukonda Institute of Technology & Sciences,<br />
                  Sangivalasa, Bheemunipatnam Mandal,<br />
                  Visakhapatnam Dist, AP, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-300 flex-shrink-0" />
                <span>8712005999, 8712008222 (Admissions)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-yellow-400 flex-shrink-0" />
                <a href="mailto:principal@anits.edu.in" className="hover:text-blue-200 transition-colors">
                  principal@anits.edu.in
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium">
          <p>&copy; 2025 Anil Neerukonda Institute of Technology & Sciences. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-blue-200 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-blue-200 transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-blue-200 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
