import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(null); // 'submitting', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit enquiry.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error. Please try again later.');
    }
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen pb-16">
      <Helmet>
        <title>Contact Us | ANITS</title>
        <meta name="description" content="Get in touch with Anil Neerukonda Institute of Technology and Sciences." />
      </Helmet>
      
      <div className="bg-gray-900 text-white py-16 px-6 shadow-md mb-12">
        <div className="max-w-6xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Contact Us</h1>
          <p className="text-gray-400 font-medium max-w-2xl mx-auto text-lg">Have questions about admissions, placements, or academic programs? We're here to help.</p>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center animate-fade-in delay-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Campus</h3>
              <p className="text-gray-600 font-medium leading-relaxed">ANITS Campus, Sangivalasa,<br/>Bheemunipatnam Mandal,<br/>Visakhapatnam, AP, India - 531162</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center animate-fade-in delay-200 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <Phone size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Phone</h3>
              <p className="text-gray-600 font-medium mb-1">Main Office: +91-891-2841111</p>
              <p className="text-gray-600 font-medium">Admissions: +91-891-2841122</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center animate-fade-in delay-300 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-6">
                <Mail size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Email</h3>
              <p className="text-gray-600 font-medium mb-1">General: info@anits.edu.in</p>
              <p className="text-gray-600 font-medium">Admissions: admissions@anits.edu.in</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 animate-fade-in delay-200 h-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {status === 'success' ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-[400px]">
                  <CheckCircle size={64} className="text-green-500 mb-6" />
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-green-700 font-medium">Thank you for reaching out. Our team will get back to you shortly.</p>
                  <button 
                    onClick={() => setStatus(null)}
                    className="mt-8 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === 'error' && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3 border border-red-200 font-medium">
                      <AlertCircle size={20} />
                      {errorMessage}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                      <select 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select a Subject...</option>
                        <option value="Admissions">Admissions Enquiry</option>
                        <option value="Placements">Placements</option>
                        <option value="General">General Question</option>
                        <option value="Technical">Website/Technical Issue</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Your Message <span className="text-red-500">*</span></label>
                    <textarea 
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end pt-2">
                    <button 
                      type="submit" 
                      disabled={status === 'submitting'}
                      className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all shadow-md ${status === 'submitting' ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5'}`}
                    >
                      {status === 'submitting' ? 'Sending...' : (
                        <>
                          <Send size={18} /> Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
