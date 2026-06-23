import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Target, CheckCircle2, History, Building2, MapPin, Check } from 'lucide-react';

const About = () => {
  return (
    <div className="font-sans text-gray-800 bg-gray-50 pt-[52px]">
      <Helmet>
        <title>ANITS at a Glance | About Us</title>
        <meta name="description" content="Anil Neerukonda Institute of Technology & Sciences (ANITS) - About Us, Vision, Mission, History, Objectives, Governing Body, and Location." />
      </Helmet>
      
      {/* 1. About ANITS Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#195e8f] mb-4 uppercase tracking-wide">About ANITS</h1>
            <div className="w-16 h-1 bg-[#f1c40f] mx-auto rounded-full"></div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 text-gray-700 leading-relaxed text-justify">
              <p className="mb-4">
                <strong>Anil Neerukonda Institute of Technology and Sciences (ANITS)</strong> was established in the academic year <strong>2001-02</strong> with approval from the All India Council for Technical Education (AICTE), New Delhi, and the Government of Andhra Pradesh. It is permanently affiliated to Andhra University, Visakhapatnam. ANITS offers undergraduate and postgraduate programs in engineering and technology, management, focusing on academic excellence and industry readiness. 
              </p>
              <p>
                The institute promotes student development, experienced faculty, and state-of-the-art learning. Accredited by NBA and recognized by UGC. ANITS empowers innovation, technical thought, and creates professionals equipped to face global challenges.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-xl overflow-hidden shadow-xl border border-gray-200">
                <img 
                  src="/images/anits2.png" 
                  alt="ANITS Campus" 
                  className="w-full h-auto object-cover"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80'; }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Strategic Foundation Section */}
      <section className="py-16 bg-blue-50/50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#195e8f] mb-4 uppercase tracking-wide">Strategic Foundation</h2>
            <div className="w-16 h-1 bg-[#f1c40f] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto italic">
              "Building principles that define our commitment to excellence and innovation in technical education. Creating tomorrow's technical leaders through world-class education, research excellence, and unwavering commitment to the society."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-500 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To emerge as a world-class technical institution whose products represent a good blend of technological excellence and the best of human values.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-purple-500 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-4">To impart holistic technical education by providing:</p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2"><Check className="text-purple-500 mt-1 shrink-0" size={18} /> State-of-the-art infrastructure.</li>
                <li className="flex items-start gap-2"><Check className="text-purple-500 mt-1 shrink-0" size={18} /> Exceptional academic and teaching expertise.</li>
                <li className="flex items-start gap-2"><Check className="text-purple-500 mt-1 shrink-0" size={18} /> Best of human values.</li>
              </ul>
            </div>

            {/* Quality Policy Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-green-500 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Policy</h3>
              <p className="text-gray-600 mb-4">Constantly striving towards achieving:</p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2"><Check className="text-green-500 mt-1 shrink-0" size={18} /> High standards of teaching.</li>
                <li className="flex items-start gap-2"><Check className="text-green-500 mt-1 shrink-0" size={18} /> Training and development of human resources.</li>
                <li className="flex items-start gap-2"><Check className="text-green-500 mt-1 shrink-0" size={18} /> To match the needs of industry.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our History Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#195e8f] mb-4 uppercase tracking-wide">Our History</h2>
            <div className="w-16 h-1 bg-[#f1c40f] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col items-start hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4 text-blue-800 font-bold text-xl">
                <History size={24} /> Foundation
              </div>
              <p className="text-gray-600 leading-relaxed text-justify">
                Founded by Dr. N. B. R. Prasad, an NRI Philanthropist from USA, in memory of his son Late Anil Neerukonda. Dr. Prasad's vision inspired the construction of a $6 million cardiovascular hospital in Chicago and this campus of higher learning.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col items-start hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4 text-red-600 font-bold text-xl">
                <Building2 size={24} /> Present Day (MEIL)
              </div>
              <p className="text-gray-600 leading-relaxed text-justify">
                Megha Engineering and Infrastructure Limited (MEIL), one of India's leading infrastructure and manufacturing companies, has acquired the stewardship of the institute, continuing the legacy of dedication to society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Objectives Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#195e8f] mb-4 uppercase tracking-wide">Our Objectives</h2>
            <div className="w-16 h-1 bg-[#f1c40f] mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-blue-500 mt-1"><CheckCircle2 size={24} /></div>
              <p className="text-gray-700 leading-relaxed">
                To impart quality technical education and skills to the students, enabling them to excel in their profession without losing values of profit.
              </p>
            </div>
            <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-blue-500 mt-1"><CheckCircle2 size={24} /></div>
              <p className="text-gray-700 leading-relaxed">
                To train youths to be good and responsible citizens who contribute their value to the society and effectively resolve the society's challenges.
              </p>
            </div>
            <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-blue-500 mt-1"><CheckCircle2 size={24} /></div>
              <p className="text-gray-700 leading-relaxed">
                To promote international understanding in the educational and cultural spheres for development of co-operation among Peoples and Nations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Governing Body Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#195e8f] mb-4 uppercase tracking-wide">Governing Body</h2>
            <div className="w-16 h-1 bg-[#f1c40f] mx-auto rounded-full"></div>
          </div>

          <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0f4471] text-white">
                  <th className="p-4 text-center border-b border-r border-[#0a2e4d] font-semibold w-16">S.No</th>
                  <th className="p-4 border-b border-r border-[#0a2e4d] font-semibold">Name of the Member</th>
                  <th className="p-4 border-b border-r border-[#0a2e4d] font-semibold">Designation</th>
                  <th className="p-4 border-b border-[#0a2e4d] font-semibold">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { name: "Dr. N. B. R. Prasad", des: "Chairman, ANES", role: "Chairman, ANITS" },
                  { name: "Sri G. V. Rama Rao", des: "Director, MEIL", role: "Member (Management Nominee)" },
                  { name: "Sri P. V. Ramana", des: "Vice President, MEIL", role: "Member (Management Nominee)" },
                  { name: "Sri Adityaprasad R. Neerukonda", des: "Secretary, ANES", role: "Member (Management Nominee)" },
                  { name: "Dr. Neerukonda Sujata", des: "Member, ANES", role: "Member (Management Nominee)" },
                  { name: "Dr. K. Srinivas", des: "JNTUGV Nominee", role: "Member (University Nominee)" },
                  { name: "State Govt. Nominee", des: "DTE Nominee", role: "Member (State Govt. Nominee)" },
                  { name: "AICTE Nominee", des: "SRO, AICTE", role: "Member (AICTE Nominee)" },
                  { name: "Prof. T. V. Hanumantha Rao", des: "Principal", role: "Member Secretary" },
                  { name: "Prof. K. Siva Prasad", des: "Professor, ANITS", role: "Member (Faculty Nominee)" }
                ].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-3 text-center border-r border-gray-200 font-medium text-gray-500">{index + 1}</td>
                    <td className="p-3 border-r border-gray-200 text-gray-800 font-medium">{row.name}</td>
                    <td className="p-3 border-r border-gray-200 text-gray-600">{row.des}</td>
                    <td className="p-3 text-gray-600">{row.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. Location Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#195e8f] mb-4 uppercase tracking-wide">Location</h2>
            <div className="w-16 h-1 bg-[#f1c40f] mx-auto rounded-full"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <div className="md:w-1/2 flex flex-col justify-center">
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                ANITS is located in a <strong>12-acre campus</strong> in Sangivalasa Village, Bheemunipatnam Mandal. It is approximately <strong>300 meters</strong> from the Chennai-Kolkata Highway and 27 km from Visakhapatnam.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-700">
                  <MapPin className="text-red-500 shrink-0 mt-1" size={20} />
                  <span><strong>Distance from Bheemunipatnam:</strong> 5 km</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <MapPin className="text-red-500 shrink-0 mt-1" size={20} />
                  <span><strong>Distance from Tagarapuvalasa:</strong> 1 km</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <MapPin className="text-red-500 shrink-0 mt-1" size={20} />
                  <span><strong>Bus Service:</strong> RTC Bus No. 222 connects RTC Complex to Tagarapuvalasa.</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 h-80 rounded-xl overflow-hidden border border-gray-200 shadow-inner">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3796.8837130833924!2d83.42152867494498!3d17.92383288305716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3957ec41589d6b%3A0xcdafae9db8cfc5c7!2sAnil%20Neerukonda%20Institute%20of%20Technology%20%26%20Sciences!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="ANITS Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
