import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Trophy } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import AdmissionPopup from '../components/AdmissionPopup';

const Home = () => {
  const images = [
    '/images/anits2.png',
    '/images/anits3.png',
    '/images/anits7.png',
    '/images/anits1.png',
    '/images/anits4.png',
    '/images/anits5.png',
    '/images/anits6.png'
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="font-sans text-gray-800 bg-gray-50 pt-[52px]">
      <Helmet>
        <title>ANITS | Anil Neerukonda Institute of Technology & Sciences</title>
        <meta name="description" content="Welcome to ANITS - Excellence in Engineering Education." />
      </Helmet>

      <AdmissionPopup />

      {/* Hero Carousel */}
      <section className="relative h-[600px] w-full overflow-hidden bg-gray-900 group">
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
              className="object-cover w-full h-full opacity-60 mix-blend-overlay"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80';
              }}
            />
          </div>
        ))}

        {/* Carousel Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg mb-6 animate-fade-in">
            Shaping the <span className="text-yellow-400">Future of Technology</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl drop-shadow-md">
            Join the legacy of excellence. ANITS is committed to producing world-class engineers through innovation, research, and holistic education.
          </p>
          <div className="flex gap-4">
            <Link to="/admissions" className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-300 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
              Apply Now 2025-26
            </Link>
            <Link to="/about" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all">
              Discover ANITS
            </Link>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-yellow-400 w-8' : 'bg-white/50 hover:bg-white'}`}
            />
          ))}
        </div>
      </section>

      {/* Accreditations Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center">
            <div className="p-6 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="text-5xl font-black text-blue-600 mb-2">A+</div>
              <div className="font-bold text-gray-900 text-lg">NAAC Accredited</div>
              <div className="text-gray-500 font-medium">CGPA 3.48</div>
            </div>
            <div className="p-6 rounded-2xl hover:bg-gray-50 transition-colors">
              <Trophy size={48} className="mx-auto text-blue-600 mb-4" />
              <div className="font-bold text-gray-900 text-lg">ISO 9001:2015</div>
              <div className="text-gray-500 font-medium">Certified Institution</div>
            </div>
            <div className="p-6 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="flex justify-center text-yellow-400 text-3xl mb-2 gap-1">
                ★★★★★
              </div>
              <div className="font-bold text-gray-900 text-lg">IIC 5-Star Rating</div>
              <div className="text-gray-500 font-medium">MoE's Innovation Cell</div>
            </div>
          </div>
        </div>
      </section>

      {/* Placement Highlights */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400 mb-4">Record Placements 2025-26</h2>
            <p className="text-xl text-slate-400 font-medium">Empowering Innovators, Building Futures</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Highest Package Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-10 text-gray-900 shadow-2xl hover:scale-[1.02] transition-transform">
              <Trophy size={180} className="absolute -top-6 -right-6 opacity-20 text-white" />
              <h3 className="text-xl font-bold mb-2 opacity-90">Highest Salary Package</h3>
              <div className="text-7xl font-black tracking-tighter mb-8">17 <span className="text-3xl font-bold">LPA</span></div>
              <div>
                <div className="font-bold text-2xl mb-1">P.V. Sai Deepak (CSE)</div>
                <div className="text-lg font-medium opacity-90">Cloud & AI Engineer at <span className="font-bold">Text Anything</span></div>
              </div>
            </div>

            {/* Total Offers Card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 flex flex-col justify-center items-center text-center backdrop-blur-sm hover:bg-white/10 transition-colors">
              <h3 className="text-2xl text-blue-400 font-bold mb-4">Total Campus Offers</h3>
              <div className="text-8xl font-black tracking-tighter text-white mb-4">1095+</div>
              <div className="text-xl text-slate-300 font-medium">Students placed in top global MNCs</div>
            </div>
          </div>

          {/* Branch Wise Stats */}
          <h3 className="text-center text-2xl font-bold mb-10 text-slate-200">Branch-wise Placement Highlights</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'MECH', count: 189, highest: '7.50 LPA' },
              { name: 'CSE', count: 141, highest: '12.00 LPA' },
              { name: 'EEE', count: 117, highest: '4.50 LPA' },
              { name: 'IT', count: 112, highest: '10.30 LPA' },
              { name: 'ECE', count: 77, highest: '9.50 LPA' },
              { name: 'CIVIL', count: 58, highest: '8.00 LPA' },
              { name: 'CSE-DS', count: 42, highest: '11.30 LPA' },
              { name: 'CHEM', count: 28, highest: '7.50 LPA' },
              { name: 'CSE-AI&ML', count: 25, highest: '9.50 LPA' }
            ].map((branch, i) => (
              <div key={i} className="bg-slate-800/50 p-5 rounded-xl border-l-4 border-yellow-400 hover:bg-slate-700 transition-colors">
                <div className="font-bold text-yellow-400 mb-2">{branch.name}</div>
                <div className="text-3xl font-black text-white mb-1">{branch.count} <span className="text-sm font-medium text-slate-400">Offers</span></div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wide">Highest: {branch.highest}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Recruiters */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Major Recruiters - 2025/26 Batch</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { company: 'MEIL', offers: 254, pkg: '4.50 LPA' },
              { company: 'Infosys', offers: 245, pkg: '3.6 - 9.5 LPA' },
              { company: 'Cognizant', offers: 75, pkg: '4.5 - 6.75 LPA' },
              { company: 'Deloitte', offers: 24, pkg: '4.50 LPA' },
              { company: 'Hetero', offers: 17, pkg: '3.20 LPA' },
              { company: 'VEM', offers: 9, pkg: '4.00 LPA' },
              { company: 'Deccan', offers: 8, pkg: '4.00 LPA' },
              { company: 'Reliance', offers: 5, pkg: '7.50 LPA' },
              { company: 'FactSet', offers: 4, pkg: '10.30 LPA' }
            ].map((rec, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 w-full sm:w-[260px] text-center group">
                <h3 className="text-lg font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">{rec.company}</h3>
                <div className="text-4xl font-black text-blue-600 mb-2">{rec.offers}</div>
                <div className="text-sm text-gray-500 font-medium">Offers at {rec.pkg}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/placements" className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl">
              View Full Placement Report <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ANITS?</h2>
            <p className="text-xl text-gray-500">Empowering students to achieve their highest potential.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-gray-50 p-10 rounded-3xl hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6"><BookOpen size={30} /></div>
              <h3 className="text-xl font-bold mb-4">Modern Curriculum</h3>
              <p className="text-gray-600">Industry-aligned courses focusing on AI, Cloud, and deep tech.</p>
            </div>
            <div className="bg-gray-50 p-10 rounded-3xl hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-6"><Users size={30} /></div>
              <h3 className="text-xl font-bold mb-4">Expert Faculty</h3>
              <p className="text-gray-600">Learn from highly qualified professors with real-world experience.</p>
            </div>
            <div className="bg-gray-50 p-10 rounded-3xl hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6"><Trophy size={30} /></div>
              <h3 className="text-xl font-bold mb-4">Innovation Hubs</h3>
              <p className="text-gray-600">Participate in hackathons, incubators, and cutting-edge research.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
