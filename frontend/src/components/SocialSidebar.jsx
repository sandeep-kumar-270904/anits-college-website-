import React from 'react';
import { useLocation } from 'react-router-dom';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"></polygon>
  </svg>
);

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
        <FacebookIcon />
      </a>
      
      {/* Twitter / X */}
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-black text-white p-3 w-12 h-12 flex items-center justify-center shadow-md transform transition-transform hover:-translate-x-2 rounded-l-md"
        title="X"
      >
        <TwitterIcon />
      </a>
      
      {/* Instagram */}
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white p-3 w-12 h-12 flex items-center justify-center shadow-md transform transition-transform hover:-translate-x-2 rounded-l-md"
        title="Instagram"
      >
        <InstagramIcon />
      </a>
      
      {/* LinkedIn */}
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-[#0A66C2] text-white p-3 w-12 h-12 flex items-center justify-center shadow-md transform transition-transform hover:-translate-x-2 rounded-l-md"
        title="LinkedIn"
      >
        <LinkedinIcon />
      </a>
      
      {/* YouTube */}
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-[#FF0000] text-white p-3 w-12 h-12 flex items-center justify-center shadow-md transform transition-transform hover:-translate-x-2 rounded-l-md"
        title="YouTube"
      >
        <YoutubeIcon />
      </a>
    </div>
  );
};

export default SocialSidebar;
