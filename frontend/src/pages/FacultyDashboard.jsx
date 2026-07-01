import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Users, LogOut, Send, Mail, Briefcase, GraduationCap } from 'lucide-react';

const FacultyDashboard = () => {
  const [facultyData, setFacultyData] = useState(null);
  const [subject, setSubject] = useState('');
  const [htmlBody, setHtmlBody] = useState('');
  const [targetYear, setTargetYear] = useState('');
  const [targetBranch, setTargetBranch] = useState('');
  const [broadcastStatus, setBroadcastStatus] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

  useEffect(() => {
    const token = localStorage.getItem('facultyToken');
    const data = localStorage.getItem('facultyData');
    if (!token || !data) {
      navigate('/faculty/login');
      return;
    }
    setFacultyData(JSON.parse(data));
    setTargetBranch(JSON.parse(data).department);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('facultyToken');
    localStorage.removeItem('facultyData');
    window.location.href = '/faculty/login';
  };

  const handleBroadcast = async (e) => {
    e.preventDefault();
    if (!subject || !htmlBody) {
      setBroadcastStatus('❌ Please fill in subject and message body');
      return;
    }
    setIsBroadcasting(true);
    setBroadcastStatus('Sending emails via Gmail SMTP...');
    try {
      const response = await fetch(`${API_URL}/api/faculty/email-broadcast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('facultyToken')}`
        },
        body: JSON.stringify({
          subject,
          html_body: htmlBody,
          target_year: targetYear,
          target_branch: targetBranch
        })
      });
      const data = await response.json();
      if (response.ok) {
        setBroadcastStatus('✅ ' + data.message);
        setSubject('');
        setHtmlBody('');
      } else {
        if (response.status === 401 || response.status === 403) {
          handleLogout();
        }
        setBroadcastStatus('❌ ' + (data.error || 'Broadcast failed'));
      }
    } catch (err) {
      setBroadcastStatus('❌ Error connecting to server.');
    }
    setIsBroadcasting(false);
  };

  if (!facultyData) return <div className="min-h-screen bg-gray-50 pt-[52px]">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-[52px] font-sans pb-16">
      <Helmet>
        <title>Dashboard | Faculty Portal</title>
      </Helmet>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-[52px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">Welcome, {facultyData.name}</h1>
                <p className="text-gray-500 font-medium text-sm flex items-center gap-2">
                  <Briefcase size={14} /> {facultyData.department}
                </p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-semibold"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Email Broadcast Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden relative mb-8 max-w-4xl mx-auto">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
          <div className="border-b border-gray-100 p-6 bg-emerald-50/30 flex items-center gap-3">
            <Mail className="text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">Email Mass Broadcast</h2>
          </div>
          
          <div className="p-8 space-y-6">
            <p className="text-gray-600 text-sm">Send personalized emails to students. Emails are routed via your configured Gmail SMTP server.</p>
            
            <form onSubmit={handleBroadcast} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Target Branch (Optional)</label>
                  <input
                    type="text"
                    value={targetBranch}
                    onChange={(e) => setTargetBranch(e.target.value)}
                    placeholder="e.g. Computer Science Engineering"
                    className="w-full p-3 border border-gray-200 bg-gray-50 text-gray-900 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Target Year (Optional)</label>
                  <select
                    value={targetYear}
                    onChange={(e) => setTargetYear(e.target.value)}
                    className="w-full p-3 border border-gray-200 bg-gray-50 text-gray-900 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="">All Years</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Rescheduled Lab Timings"
                  className="w-full p-3 border border-gray-200 bg-white text-gray-900 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Body (HTML Supported)</label>
                <textarea
                  required
                  value={htmlBody}
                  onChange={(e) => setHtmlBody(e.target.value)}
                  placeholder="<h1>Hello Students...</h1>"
                  className="w-full h-48 p-4 border border-gray-200 bg-white text-gray-900 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none font-mono text-sm"
                />
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className={`text-sm font-medium ${broadcastStatus.includes('❌') ? 'text-red-500' : 'text-emerald-600'}`}>
                  {broadcastStatus}
                </span>
                <button 
                  type="submit" 
                  disabled={isBroadcasting}
                  className={`flex items-center gap-2 px-8 py-3 font-bold rounded-xl transition-all shadow-sm ${isBroadcasting ? 'bg-emerald-300 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:-translate-y-0.5'}`}
                >
                  <Send size={18} /> {isBroadcasting ? 'Sending...' : 'Broadcast Emails'}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FacultyDashboard;
