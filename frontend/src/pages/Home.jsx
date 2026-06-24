import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const images = [
    '/images/anits2.png',
    '/images/anits3.png',
    '/images/anits7.png'
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="font-sans text-gray-800 bg-white pt-[100px]">
      <Helmet>
        <title>ANITS | Anil Neerukonda Institute of Technology & Sciences</title>
      </Helmet>

      {/* Carousel */}
      <section className="relative w-full">
        <div className="relative h-[250px] md:h-[400px] lg:h-[500px] w-full overflow-hidden bg-gray-100">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img 
                src={img} 
                alt={`ANITS Campus ${index + 1}`} 
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80';
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Carousel Dots Below Image */}
        <div className="flex justify-center mt-6 gap-2 mb-12">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-sm transition-all ${currentSlide === index ? 'bg-[#1e5391] w-4' : 'bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>
      </section>

      {/* Welcome & Video Section */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="relative pt-[56.25%] rounded shadow-md overflow-hidden bg-gray-100 border border-gray-200">
            <iframe 
              className="absolute inset-0 w-full h-full" 
              src="https://www.youtube.com/embed/placeholder" 
              title="ANITS Campus Tour" 
              frameBorder="0" 
              allowFullScreen>
            </iframe>
          </div>
          <div>
            <h2 className="text-[28px] font-bold text-[#111] mb-6 font-['Oswald',sans-serif]">Welcome to ANITS</h2>
            <p className="text-gray-600 leading-relaxed text-[14px] text-justify">
              Anil Neerukonda Institute of Technology & Sciences (ANITS), Visakhapatnam is owned by Megha Engineering and Infrastructure Limited (MEIL) which is one of the top infrastructure and manufacturing company in India with headquarters at Hyderabad. The institute was established in the academic year 2001-02 by Anil Neerukonda Educational Society (ANES) which was founded by Dr. N.B.R. Prasad, an NRI Philanthropist from the USA, with industrialists and eminent educationists in memory of his late son, Anil Neerukonda.
            </p>
          </div>
        </div>
      </section>

      {/* ANITS at a Glance */}
      <section className="bg-[#fcfcfc] py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-[28px] font-bold text-[#111] mb-10 font-['Oswald',sans-serif]">ANITS at a Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#fbc02d] text-white py-8 rounded-md shadow-sm font-bold flex flex-col justify-center items-center">
              <div className="text-[28px] mb-1">5k+</div><div className="text-xs uppercase tracking-wide">Students Enrolled</div>
            </div>
            <div className="bg-[#7cb342] text-white py-8 rounded-md shadow-sm font-bold flex flex-col justify-center items-center">
              <div className="text-[28px] mb-1">20k+</div><div className="text-xs uppercase tracking-wide">Alumni</div>
            </div>
            <div className="bg-[#ff6e6e] text-white py-8 rounded-md shadow-sm font-bold flex flex-col justify-center items-center">
              <div className="text-[28px] mb-1">300</div><div className="text-xs uppercase tracking-wide">Faculty count</div>
            </div>
            <div className="bg-[#fbc02d] text-white py-8 px-2 rounded-md shadow-sm font-bold flex flex-col justify-center items-center">
              <div className="text-[28px] mb-1">90% +</div><div className="text-[10px] uppercase tracking-wide leading-tight mt-1">Faculty with Ph.D/M.Tech</div>
            </div>
            <div className="bg-[#7cb342] text-white py-8 rounded-md shadow-sm font-bold flex flex-col justify-center items-center">
              <div className="text-[28px] mb-1">50+</div><div className="text-xs uppercase tracking-wide">MoUs</div>
            </div>
            <div className="bg-[#ff6e6e] text-white py-8 rounded-md shadow-sm font-bold flex flex-col justify-center items-center">
              <div className="text-[28px] mb-1">37</div><div className="text-xs uppercase tracking-wide">Labs</div>
            </div>
            <div className="bg-[#fbc02d] text-white py-8 rounded-md shadow-sm font-bold flex flex-col justify-center items-center">
              <div className="text-[28px] mb-1">80+</div><div className="text-xs uppercase tracking-wide">Research projects</div>
            </div>
            <div className="bg-[#7cb342] text-white py-8 rounded-md shadow-sm font-bold flex flex-col justify-center items-center">
              <div className="text-[28px] mb-1">800+</div><div className="text-xs uppercase tracking-wide">Placements</div>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-16 bg-[#26629e]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-[28px] font-bold text-white mb-6 font-['Oswald',sans-serif]">Accreditations</h2>
          <p className="text-white text-[14px] mb-12 max-w-4xl mx-auto leading-relaxed opacity-90">
            Anil Neerukonda Institute of Technology & Sciences (ANITS), Visakhapatnam is approved by All India Council for Technical Education (AICTE), New Delhi and is affiliated to Andhra University (AU), Visakhapatnam.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white px-8 py-10 rounded-md w-full sm:w-64 text-center shadow-lg flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-2 border-[#1ca1a4] text-[#1ca1a4] rounded-full flex items-center justify-center font-bold text-2xl mb-4">NBA</div>
              <div className="font-bold text-[#222] text-[15px] leading-tight">NBA<br/>Accreditation</div>
            </div>
            <div className="bg-white px-8 py-10 rounded-md w-full sm:w-64 text-center shadow-lg flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-2 border-red-500 text-red-500 rounded-full flex items-center justify-center font-bold text-xl mb-4">NAAC</div>
              <div className="font-bold text-[#222] text-[15px] leading-tight">NAAC "A+"<br/>Accreditation</div>
            </div>
            <div className="bg-white px-8 py-10 rounded-md w-full sm:w-64 text-center shadow-lg flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-2 border-pink-500 text-pink-500 rounded-full flex items-center justify-center font-bold text-xl mb-4">UGC</div>
              <div className="font-bold text-[#222] text-[15px] leading-tight">UGC<br/>Autonomous</div>
            </div>
          </div>
        </div>
      </section>

      {/* Events and Notice Board */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden h-[350px]">
              <div className="bg-[#1e5391] text-white px-4 py-3 font-bold font-['Oswald',sans-serif] uppercase tracking-wider text-[17px]">Events</div>
              <div className="p-4 space-y-4 h-full overflow-y-auto">
                <div className="flex gap-4 border-b border-gray-100 pb-4">
                  <div className="bg-[#1e5391] text-white w-14 h-14 flex flex-col justify-center items-center rounded-sm font-bold flex-shrink-0">
                    <span className="text-xs">Feb</span><span className="text-[22px] leading-none">20</span>
                  </div>
                  <div>
                    <div className="font-bold text-[#222] text-sm">Tiriyananmidy?</div>
                    <div className="text-[13px] text-gray-500 mt-1">Special guest lecture series...</div>
                    <div className="text-[11px] text-[#3b82f6] mt-2 font-bold cursor-pointer">READ MORE &gt;</div>
                  </div>
                </div>
                <div className="flex gap-4 border-b border-gray-100 pb-4">
                  <div className="bg-[#1e5391] text-white w-14 h-14 flex flex-col justify-center items-center rounded-sm font-bold flex-shrink-0">
                    <span className="text-xs">Jan</span><span className="text-[22px] leading-none">28</span>
                  </div>
                  <div>
                    <div className="font-bold text-[#222] text-sm">REPUBLIC DAY CELEBRATIONS</div>
                    <div className="text-[13px] text-gray-500 mt-1">Flag hoisting at 8:30 AM...</div>
                    <div className="text-[11px] text-[#3b82f6] mt-2 font-bold cursor-pointer">READ MORE &gt;</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden h-[350px]">
              <div className="bg-[#1e5391] text-white px-4 py-3 font-bold font-['Oswald',sans-serif] uppercase tracking-wider text-[17px]">Notice Board</div>
              <div className="p-5 space-y-4 h-full overflow-y-auto">
                <ul className="list-disc pl-4 text-[13px] space-y-5 font-bold leading-relaxed">
                  <li className="text-blue-800"><span className="text-[#1e5391]">IV/IV B.Tech SEM-II MID-II INTERNAL LAB TIME TABLE (MARCH 2024)...</span></li>
                  <li className="text-blue-800"><span className="text-[#1e5391]">M.Tech & B.Tech 2024 Reg/Sup Exams APRIL 2024 (R20)...</span></li>
                  <li className="text-red-600"><span className="text-red-600">IV/IV B.TECH II-SEMESTER REGULAR & SUPPLEMENTARY EXAMINATIONS TIME TABLE (R20, R19 & R15) APRIL-2024 RESULTS</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top 6 Recruiters */}
      <section className="py-16 bg-[#fcfcfc] text-center border-t border-gray-100 overflow-hidden">
        <style>{`
          .perspective-1000 { perspective: 1000px; }
          .transform-style-3d { transform-style: preserve-3d; }
          .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
          .rotate-y-180 { transform: rotateY(180deg); }
          
          @keyframes flipLoop {
            0%, 15% { transform: rotateY(0deg); }
            20%, 65% { transform: rotateY(180deg); }
            70%, 100% { transform: rotateY(360deg); }
          }
          
          .animate-flip-0 { animation: flipLoop 12s infinite; animation-delay: 0s; }
          .animate-flip-1 { animation: flipLoop 12s infinite; animation-delay: 2s; }
          .animate-flip-2 { animation: flipLoop 12s infinite; animation-delay: 4s; }
          .animate-flip-3 { animation: flipLoop 12s infinite; animation-delay: 6s; }
          .animate-flip-4 { animation: flipLoop 12s infinite; animation-delay: 8s; }
          .animate-flip-5 { animation: flipLoop 12s infinite; animation-delay: 10s; }
        `}</style>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-[28px] font-bold text-[#111] mb-3 font-['Oswald',sans-serif]">Our Top 6 Recruiters</h2>
          <p className="text-gray-500 text-[13px] mb-12 max-w-3xl mx-auto leading-relaxed">We have grabbed the huge placements with stunning numbers who got placed in top MNCs with potential of our students. Our students achieved campus placements from Service-based to Product-based MNCs.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            
            {/* Card 1: Highest Package */}
            <div className="perspective-1000 h-[180px]">
              <div className="relative w-full h-full transform-style-3d animate-flip-0">
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-[#1e5391] text-white flex flex-col justify-center items-center p-4 rounded-md shadow-md">
                  <div className="font-bold text-[10px] uppercase tracking-wide mb-2 opacity-90">Highest Package</div>
                  <div className="text-3xl font-black mb-1">38 LPA</div>
                  <div className="text-[10px] uppercase opacity-80 mt-2">Amazon (SDE 2024)</div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#153f71] text-white flex flex-col justify-center items-center p-4 rounded-md shadow-md">
                  <div className="text-2xl font-black mb-1">Dream Big!</div>
                  <div className="text-[10px] uppercase opacity-80 mt-2 text-center">Join our top tier placement program</div>
                </div>
              </div>
            </div>

            {/* Logo Cards 2-6 */}
            {['Infosys', 'Verizon', 'CarWale', 'Amazon', 'TCS'].map((company, i) => (
              <div key={i} className="perspective-1000 h-[180px]">
                <div className={`relative w-full h-full transform-style-3d animate-flip-${i + 1}`}>
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden border border-gray-200 rounded-md flex justify-center items-center p-6 bg-white shadow-md">
                    <span className="font-extrabold text-gray-500 text-xl tracking-wider uppercase">{company}</span>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 border border-gray-200 rounded-md flex justify-center items-center p-6 bg-[#f8f9fa] shadow-md">
                    <span className="font-extrabold text-[#1e5391] text-xl tracking-wider uppercase">{company}</span>
                  </div>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </section>

      {/* Partner Companies */}
      <section className="py-16 bg-white text-center border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-[28px] font-bold text-[#111] mb-10 font-['Oswald',sans-serif]">Our Partner Companies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {num: '150', text: 'Recruiting Partners'},
              {num: '92', text: 'Placement Drives'},
              {num: '25', text: 'Fortune 500 Companies'},
              {num: '15', text: 'International Recruiters'}
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-md py-10 px-4 flex flex-col justify-center items-center">
                <div className="text-4xl font-bold text-[#1e5391] mb-3">{item.num}</div>
                <div className="text-[11px] font-bold text-gray-600 uppercase tracking-wide text-center">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Across Industries */}
      <section className="py-16 bg-[#fcfcfc] text-center border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-[28px] font-bold text-[#111] mb-10 font-['Oswald',sans-serif]">Partners Across Industries</h2>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {['Amazon', 'Infosys', 'TCS', 'Flipkart', 'Wipro', 'Cognizant', 'Accenture', 'MEIL'].map((name, i) => (
              <div key={i} className="border border-gray-200 rounded-md w-[130px] h-[60px] flex justify-center items-center text-[13px] font-bold text-gray-400 bg-white shadow-sm">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Our Students Say */}
      <section className="py-16 bg-white text-center border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-[28px] font-bold text-[#111] mb-16 font-['Oswald',sans-serif]">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <div key={i} className="relative bg-white border-t-[6px] border-[#26a69a] rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-8 pt-14 mt-8">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[76px] h-[76px] bg-gray-100 rounded-full border-4 border-white overflow-hidden shadow-sm flex justify-center items-center">
                  <div className="text-gray-300">👤</div>
                </div>
                <div className="flex justify-center text-[#ffc107] text-[15px] mb-5 gap-1">★★★★★</div>
                <p className="text-gray-600 text-[13.5px] italic mb-8 leading-relaxed">
                  "Anil Neerukonda Institute of Technology & Sciences is a wonderful institution. The faculty is very supportive and encouraging. I am proud to be a student here. The placement training provided here is top notch."
                </p>
                <div className="font-bold text-[#222] text-[15px]">Student Name</div>
                <div className="text-[12px] text-gray-500 mt-1">Computer Science, Batch of 2024</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
