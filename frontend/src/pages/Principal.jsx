import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, FileText, CheckCircle, GraduationCap, MapPin, Users, Activity, BookOpen, Presentation, IndianRupee } from 'lucide-react';

const Principal = () => {
  return (
    <div className="font-sans text-gray-800 bg-gray-50 pt-[52px]">
      <Helmet>
        <title>Principal's Profile | ANITS</title>
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-[#0a192f] text-white py-20 px-6 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute w-[800px] h-[800px] bg-[#112240] rounded-full -top-[400px] -right-[200px] opacity-50 blur-3xl"></div>
          <div className="absolute w-[600px] h-[600px] bg-blue-900/30 rounded-full -bottom-[200px] -left-[100px] opacity-50 blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="md:w-5/12 w-full max-w-sm mx-auto md:max-w-none">
            <div className="bg-white p-2 md:p-3 rounded-2xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <img 
                src="/images/principal.png" 
                alt="Dr. V. Rajyalakshmi" 
                className="w-full rounded-xl object-cover shadow-inner"
              />
            </div>
          </div>
          
          <div className="md:w-7/12 text-center md:text-left space-y-6">
            <div>
              <div className="inline-block px-3 py-1 bg-yellow-400/20 border border-yellow-400/50 text-yellow-300 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                Principal & Professor
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 text-white drop-shadow-md">
                Dr. V. Rajyalakshmi
              </h1>
              <p className="text-blue-200 font-semibold tracking-wide text-lg mt-2">
                B.E., M.E., Ph.D., MISTE, FIETE, SMIEEE
              </p>
            </div>
            
            <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg mt-4">
              <p className="text-2xl font-bold text-white mb-1">Anil Neerukonda Institute of Technology & Sciences</p>
              
              <div className="space-y-4 pt-4 mt-4 border-t border-white/10">
                <div className="flex items-start gap-3 justify-center md:justify-start text-blue-100">
                  <GraduationCap size={24} className="text-yellow-400 shrink-0 mt-0.5" />
                  <span className="text-left font-medium">Ph.D. in Electronics and Communication Engineering</span>
                </div>
                <div className="flex items-start gap-3 justify-center md:justify-start text-blue-100">
                  <MapPin size={24} className="text-yellow-400 shrink-0 mt-0.5" />
                  <span className="text-left font-medium">Visakhapatnam, Andhra Pradesh, India</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-[#0a192f] font-bold py-3.5 px-8 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
                <Mail size={18} /> Contact Principal
              </button>
              <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3.5 px-8 rounded-full transition-all flex items-center gap-2">
                <FileText size={18} /> View Research Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto py-10 px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100 text-center">
            <div>
              <p className="text-4xl font-extrabold text-[#0f4471] mb-2">18+</p>
              <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">Years of Experience</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-[#0f4471] mb-2">55</p>
              <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">Publications</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-[#0f4471] mb-2">44</p>
              <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">Conferences</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-[#0f4471] mb-2">3</p>
              <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">Sponsored Projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
        
        {/* About Me & Memberships Row */}
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-red-500 inline-block pb-1">About Me</h2>
            <div className="text-gray-600 leading-relaxed space-y-4 text-justify">
              <p>
                Dr. V. Rajyalakshmi is a distinguished academic leader currently serving as the Principal at Anil Neerukonda Institute of Technology and Sciences. With over two decades of dedicated service to ANITS, she has taken on several key responsibilities, including serving as the Nodal Officer for the Women's Cell, Chief Coordinator for NBA/NAAC, and Head of the Department of Electronics and Communication Engineering for six years. She played an instrumental role in guiding the institute towards successful NBA (twice Tier-1) and NAAC accreditations. In recognition of her outstanding contributions to academic excellence, she was honored with the Best Teacher Award in 2018.
              </p>
              <p>
                Dr. Rajyalakshmi has an outstanding research profile with 55 research articles published in reputed international and national journals and conferences. She has presented her work in several countries including Japan, China, Hong Kong, and the United States. Under her supervision, three research scholars have been awarded their Ph.D., and two students are currently pursuing their doctoral studies.
              </p>
              <p>
                She has also demonstrated strong capability in securing competitive research funding. Dr. Rajyalakshmi has successfully executed and completed multiple research projects with a cumulative grant of over ₹18.78 Lakhs from prominent agencies such as AICTE and DRDO.
              </p>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="bg-[#0f4471] text-white px-6 py-4 font-bold text-lg">
                Professional Memberships
              </div>
              <div className="p-6 space-y-6">
                <div className="flex gap-4 items-start">
                  <Users className="text-blue-600 mt-1 shrink-0" size={24} />
                  <div>
                    <p className="font-bold text-gray-900">ISTE (Life Member, LM-42284)</p>
                    <p className="text-gray-500 text-sm">Fellow</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <GraduationCap className="text-blue-600 mt-1 shrink-0" size={24} />
                  <div>
                    <p className="font-bold text-gray-900">Academic Evaluation</p>
                    <p className="text-gray-500 text-sm">FIETE, IEEE (Sr. Member), IEI (Life)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Experience */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-red-500 inline-block pb-1 mb-8">Professional Experience</h2>
          <div className="relative border-l-2 border-red-200 ml-3 md:ml-6 space-y-8">
            <div className="relative pl-8">
              <div className="absolute w-4 h-4 bg-red-500 rounded-full -left-[9px] top-1.5 border-4 border-white shadow"></div>
              <p className="font-bold text-[#0f4471] mb-1">2023 - Present</p>
              <p className="font-bold text-gray-900 text-lg">Principal</p>
              <p className="text-gray-500">Anil Neerukonda Institute of Technology and Sciences</p>
            </div>
            <div className="relative pl-8">
              <div className="absolute w-4 h-4 bg-gray-400 rounded-full -left-[9px] top-1.5 border-4 border-white shadow"></div>
              <p className="font-bold text-gray-500 mb-1">2007 - 2023</p>
              <p className="font-bold text-gray-900 text-lg">Professor, Dept. of ECE</p>
              <p className="text-gray-500">Anil Neerukonda Institute of Technology and Sciences, Visakhapatnam</p>
            </div>
          </div>
        </div>

        {/* Professor Qualifications Table */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-red-500 inline-block pb-1 mb-8">Professor Qualifications</h2>
          <div className="overflow-x-auto shadow-md rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0f4471] text-white">
                  <th className="p-4 border-r border-[#0a2e4d] font-semibold w-5/12">Institution</th>
                  <th className="p-4 border-r border-[#0a2e4d] font-semibold">University</th>
                  <th className="p-4 border-r border-[#0a2e4d] font-semibold">Designation</th>
                  <th className="p-4 font-semibold w-32">Date of Selection</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="p-4 border-r border-gray-200 text-gray-800">Anil Neerukonda Institute of Technology and Sciences, Visakhapatnam</td>
                  <td className="p-4 border-r border-gray-200 text-gray-600">Andhra University (AU)</td>
                  <td className="p-4 border-r border-gray-200 text-gray-600">Professor</td>
                  <td className="p-4 text-gray-600">2017</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Research & Innovation */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-red-500 inline-block pb-1 mb-8">Research & Innovation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Research Guidance */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col">
              <div className="bg-[#0f4471] text-white px-6 py-3 font-bold">Research Guidance</div>
              <div className="p-6 grid grid-cols-2 gap-6 flex-grow">
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-baseline gap-1 text-[#0f4471] font-bold text-3xl mb-2">
                    <GraduationCap /> 3
                  </div>
                  <p className="text-sm font-medium text-gray-600">Ph.D.s Completed</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-baseline gap-1 text-[#0f4471] font-bold text-3xl mb-2">
                    <FileText /> 2
                  </div>
                  <p className="text-sm font-medium text-gray-600">Ph.D.s Submitted</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-baseline gap-1 text-[#0f4471] font-bold text-3xl mb-2">
                    <Users /> 2
                  </div>
                  <p className="text-sm font-medium text-gray-600">M.Tech Guiding</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-baseline gap-1 text-[#0f4471] font-bold text-3xl mb-2">
                    <CheckCircle /> 32
                  </div>
                  <p className="text-sm font-medium text-gray-600">B.Tech Projects Guided</p>
                </div>
              </div>
            </div>

            {/* Projects Guided */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col">
              <div className="bg-[#0f4471] text-white px-6 py-3 font-bold">Projects Guided</div>
              <div className="p-6 grid grid-cols-2 gap-6 flex-grow">
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-baseline gap-1 text-[#0f4471] font-bold text-3xl mb-2">
                    <Activity /> 22
                  </div>
                  <p className="text-sm font-medium text-gray-600">M.Tech Projects</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-baseline gap-1 text-[#0f4471] font-bold text-3xl mb-2">
                    <BookOpen /> 44
                  </div>
                  <p className="text-sm font-medium text-gray-600">B.Tech Projects</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-baseline gap-1 text-[#0f4471] font-bold text-3xl mb-2">
                    <FileText /> 5
                  </div>
                  <p className="text-sm font-medium text-gray-600">Patents Filed / Published</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-baseline gap-1 text-[#0f4471] font-bold text-3xl mb-2">
                    <CheckCircle /> 1
                  </div>
                  <p className="text-sm font-medium text-gray-600">Module Journal Reviewer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Journal Publications */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="bg-[#0f4471] text-white px-6 py-3 font-bold">Journal Publications</div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-[#0f4471] text-white rounded-full flex items-center justify-center font-bold text-2xl shrink-0">
                    55
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Total Journal Publications</p>
                    <p className="text-sm text-gray-500">International: 44, National: 11</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  Published in reputed journals including IEEE Transactions, Elsevier, Springer, and other high-impact journals in the field of Electronics and Communication Engineering.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">Antenna Design</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">Signal Processing</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">Wireless Communication</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">Embedded Systems</span>
                </div>
              </div>
            </div>

            {/* Conference Proceedings */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="bg-[#0f4471] text-white px-6 py-3 font-bold">Conference Proceedings</div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-[#0f4471] text-white rounded-full flex items-center justify-center font-bold text-2xl shrink-0">
                    44
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Total Conference Publications</p>
                    <p className="text-sm text-gray-500">International: 35, National: 9</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  Presented research findings at prestigious conferences including IEEE international conferences, providing significant contributions to the academic community in the field of Electronics and Communication Engineering.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">Guest Lectures</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Research Projects */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-red-500 inline-block pb-1 mb-8">Research Projects</h2>
          
          <h3 className="font-bold text-gray-800 mb-6 text-lg">Completed Projects</h3>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 max-w-2xl">
              <div className="bg-[#0f4471] text-white px-5 py-3 font-semibold text-sm">
                Faculty Partner: AICTE Margdarshan Scheme
              </div>
              <div className="px-5 py-4 flex items-center gap-2 text-gray-800 font-bold">
                Amount: <span className="text-green-600 flex items-center"><IndianRupee size={16} /> 1250000</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 max-w-2xl">
              <div className="bg-[#0f4471] text-white px-5 py-3 font-semibold text-sm">
                Modernization of Antenna Design Lab (MODROBS)
              </div>
              <div className="px-5 py-4 flex items-center gap-2 text-gray-800 font-bold">
                Amount: <span className="text-green-600 flex items-center"><IndianRupee size={16} /> 1047000</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 max-w-2xl">
              <div className="bg-[#0f4471] text-white px-5 py-3 font-semibold text-sm">
                Engineering challenges for making digital india smart (AICTE and others)
              </div>
              <div className="px-5 py-4 flex items-center gap-2 text-gray-800 font-bold">
                Amount: <span className="text-green-600 flex items-center"><IndianRupee size={16} /> 100000</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Principal;
