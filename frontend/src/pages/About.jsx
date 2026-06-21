import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Building, Target, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="font-sans text-gray-800 pt-[52px]">
      <Helmet>
        <title>About Us | ANITS</title>
        <meta name="description" content="Learn about Anil Neerukonda Institute of Technology & Sciences (ANITS), its history, vision, and mission." />
      </Helmet>
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 py-24 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight animate-fade-in">About ANITS</h1>
          <p className="text-xl text-blue-100 font-medium animate-fade-in">Excellence in Engineering Education</p>
        </div>
      </div>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-10 md:p-16">
            
            {/* History Section */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Building size={28} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our History</h2>
              </div>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p className="mb-6 leading-relaxed">
                  Anil Neerukonda Institute of Technology & Sciences (ANITS), Visakhapatnam is owned by <strong className="text-gray-900">Megha Engineering and Infrastructure Limited (MEIL)</strong> which is one of the top infrastructure and manufacturing companies in India with headquarters at Hyderabad. 
                </p>
                <p className="leading-relaxed">
                  The institute was established in the academic year 2001-02 by Anil Neerukonda Educational Society (ANES) which was founded by Dr. N.B.R. Prasad, an NRI Philanthropist from the USA, with industrialists and eminent educationists in memory of Late Anil Neerukonda.
                </p>
              </div>
            </div>

            <hr className="border-gray-100 mb-16" />
            
            {/* Vision & Mission Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
                    <Globe size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To emerge as a premier institute of engineering and science, imparting quality education and promoting research and innovation to create global leaders.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                    <Target size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To train young minds to be competent professionals by providing a conducive academic environment, industry-relevant curriculum, and holistic personal development.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
