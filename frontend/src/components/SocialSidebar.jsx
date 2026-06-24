import React from 'react';
import { useLocation } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const SocialSidebar = () => {
  const location = useLocation();
  
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-1">
      {/* Facebook */}
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-[#1877F2] text-white p-3 w-12 h-12 flex items-center justify-center shadow-md transform transition-transform hover:-translate-x-2 rounded-l-md"
        title="Facebook"
      >
        <Facebook size={20} />
      </a>
      
      {/* Twitter / X */}
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-[#1DA1F2] text-white p-3 w-12 h-12 flex items-center justify-center shadow-md transform transition-transform hover:-translate-x-2 rounded-l-md"
        title="Twitter"
      >
        <Twitter size={20} />
      </a>
      
      {/* Instagram */}
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white p-3 w-12 h-12 flex items-center justify-center shadow-md transform transition-transform hover:-translate-x-2 rounded-l-md"
        title="Instagram"
      >
        <Instagram size={20} />
      </a>
      
      {/* LinkedIn */}
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-[#0A66C2] text-white p-3 w-12 h-12 flex items-center justify-center shadow-md transform transition-transform hover:-translate-x-2 rounded-l-md"
        title="LinkedIn"
      >
        <Linkedin size={20} />
      </a>
      
      {/* YouTube */}
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-[#FF0000] text-white p-3 w-12 h-12 flex items-center justify-center shadow-md transform transition-transform hover:-translate-x-2 rounded-l-md"
        title="YouTube"
      >
        <Youtube size={20} />
      </a>
    </div>
  );
};

export default SocialSidebar;
