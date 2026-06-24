import React from 'react';
import { useLocation } from 'react-router-dom';

const WhatsappIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.8 5.8 0 00-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
  </svg>
);

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
      {/* WhatsApp */}
      <a 
        href="https://wa.me/919000829049" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white p-3 w-12 h-12 flex items-center justify-center shadow-md transform transition-transform hover:-translate-x-2 rounded-l-md"
        title="WhatsApp"
      >
        <WhatsappIcon />
      </a>

      {/* Facebook */}
      <a 
        href="https://www.facebook.com/people/Anil-Neerukonda-Institute-of-Technology-Sciences/61579923250893/?rdid=UMJIK3HjpBBTDH2p&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AbZDYc9dT%2F" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-[#1877F2] text-white p-3 w-12 h-12 flex items-center justify-center shadow-md transform transition-transform hover:-translate-x-2 rounded-l-md"
        title="Facebook"
      >
        <FacebookIcon />
      </a>
      
      {/* Twitter / X */}
      <a 
        href="https://x.com/ANITS_Official?t=ov6KnEZCW6DrLfHcJqC5uw&s=08" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-black text-white p-3 w-12 h-12 flex items-center justify-center shadow-md transform transition-transform hover:-translate-x-2 rounded-l-md"
        title="X"
      >
        <TwitterIcon />
      </a>
      
      {/* Instagram */}
      <a 
        href="https://www.instagram.com/anits_official?igsh=MWVhbDVmaHpybnRwNg%3D%3D" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white p-3 w-12 h-12 flex items-center justify-center shadow-md transform transition-transform hover:-translate-x-2 rounded-l-md"
        title="Instagram"
      >
        <InstagramIcon />
      </a>
      
      {/* LinkedIn */}
      <a 
        href="https://www.linkedin.com/school/anil-neerukonda-institute-of-technology-&-sciences/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-[#0A66C2] text-white p-3 w-12 h-12 flex items-center justify-center shadow-md transform transition-transform hover:-translate-x-2 rounded-l-md"
        title="LinkedIn"
      >
        <LinkedinIcon />
      </a>
      
      {/* YouTube */}
      <a 
        href="https://www.youtube.com/@ANITS-VIZAG" 
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
