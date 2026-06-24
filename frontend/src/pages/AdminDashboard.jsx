import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, MessageSquare, LogOut, CheckCircle, AlertCircle, BookOpen, FileText } from 'lucide-react';

const AdminDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  
  // Syllabus state
  const [syllabusYear, setSyllabusYear] = useState('Academic Year 2025-26');
  const [syllabusProgram, setSyllabusProgram] = useState('');
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [syllabusUploadStatus, setSyllabusUploadStatus] = useState('');

  // Policy state
  const [policyName, setPolicyName] = useState('Research and Development Policy');
  const [policyFile, setPolicyFile] = useState(null);
  const [policyUploadStatus, setPolicyUploadStatus] = useState('');

  // Academic Calendar state
  const [calendarYearHeader, setCalendarYearHeader] = useState('Academic Year 2025-26');
  const [calendarYear, setCalendarYear] = useState('2025-26');
  const [calendarProgram, setCalendarProgram] = useState('');
  const [calendarFile, setCalendarFile] = useState(null);
  const [calendarUploadStatus, setCalendarUploadStatus] = useState('');

  // Time Table state
  const [timeTableDept, setTimeTableDept] = useState('Chemical Engineering');
  const [timeTableFile, setTimeTableFile] = useState(null);
  const [timeTableUploadStatus, setTimeTableUploadStatus] = useState('');

  const policiesList = [
    "Research and Development Policy", "Innovation and Entrepreneurship Policy", "Institutional Ethics Policy",
    "IPR Policy", "IT Policy", "Maintenance Policy", "Placement Policy", "Non-Teaching Staff Welfare Policy",
    "E- Governance Policy", "Recruitment Policy", "Promotion Policy", "Maternity Leave Policy",
    "E- Waste Management Policy", "Waste management Policy", "Energy Policy", "Environmental Policy",
    "Green Campus Policy", "Code of Conduct", "Divyangjan Policy", "Anti-Ragging Policy", "RTI Policy"
  ];

  const deptsList = [
    "Chemical Engineering", "Civil Engineering", "Computer Science Engineering",
    "Electrical and Electronics Engineering", "Electronics and Communications Engineering",
    "Information Technology", "Mechanical Engineering"
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchLogs(token);
  }, [navigate]);

  const fetchLogs = async (token) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/logs', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setLogs(data);
      } else {
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }
      }
    } catch (err) {
      console.error('Failed to fetch logs', err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus('Please select a PDF file first.');
      return;
    }
    
    setUploadStatus('Uploading...');
    const formData = new FormData();
    formData.append('file', file);
    
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch('http://127.0.0.1:5000/api/upload_circular', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await response.json();
      
      if (response.ok) {
        setUploadStatus('Upload successful! The Chatbot is now aware of this document.');
        setFile(null);
      } else {
        setUploadStatus(data.error || 'Upload failed');
      }
    } catch (err) {
      setUploadStatus('Upload error');
    }
  };

  const handleSyllabusFileChange = (e) => {
    setSyllabusFile(e.target.files[0]);
  };

  const handleSyllabusUpload = async (e) => {
    e.preventDefault();
    if (!syllabusFile) {
      setSyllabusUploadStatus('Please select a PDF file first.');
      return;
    }
    if (!syllabusProgram) {
      setSyllabusUploadStatus('Please enter a program name.');
      return;
    }
    
    setSyllabusUploadStatus('Uploading...');
    const formData = new FormData();
    formData.append('academic_year', syllabusYear);
    formData.append('program', syllabusProgram);
    formData.append('file', syllabusFile);
    
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch('http://127.0.0.1:5000/api/upload_syllabus', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await response.json();
      
      if (response.ok) {
        setSyllabusUploadStatus(`Upload successful! Added to ${syllabusYear}.`);
        setSyllabusFile(null);
        setSyllabusProgram('');
      } else {
        setSyllabusUploadStatus(data.error || 'Upload failed');
      }
    } catch (err) {
      setSyllabusUploadStatus('Upload error');
    }
  };

  const handlePolicyFileChange = (e) => {
    setPolicyFile(e.target.files[0]);
  };

  const handlePolicyUpload = async (e) => {
    e.preventDefault();
    if (!policyFile) {
      setPolicyUploadStatus('Please select a PDF file first.');
      return;
    }
    
    setPolicyUploadStatus('Uploading...');
    const formData = new FormData();
    formData.append('policy_name', policyName);
    formData.append('file', policyFile);
    
    const token = localStorage.getItem('adminToken');
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
    
    try {
      const response = await fetch(`${API_URL}/api/upload_policy`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await response.json();
      
      if (response.ok) {
        setPolicyUploadStatus(`Upload successful! ${policyName} updated.`);
        setPolicyFile(null);
      } else {
        setPolicyUploadStatus(data.error || 'Upload failed');
      }
    } catch (err) {
      setPolicyUploadStatus('Upload error');
    }
  };

  const handleCalendarUpload = async (e) => {
    e.preventDefault();
    if (!calendarFile) {
      setCalendarUploadStatus('Please select a PDF file first.');
      return;
    }
    if (!calendarProgram) {
      setCalendarUploadStatus('Please enter a program name.');
      return;
    }
    
    setCalendarUploadStatus('Uploading...');
    const formData = new FormData();
    formData.append('academic_year_header', calendarYearHeader);
    formData.append('year', calendarYear);
    formData.append('program', calendarProgram);
    formData.append('file', calendarFile);
    
    const token = localStorage.getItem('adminToken');
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
    try {
      const response = await fetch(`${API_URL}/api/upload_academic_calendar`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await response.json();
      
      if (response.ok) {
        setCalendarUploadStatus(`Upload successful! Added to ${calendarYearHeader}.`);
        setCalendarFile(null);
        setCalendarProgram('');
      } else {
        setCalendarUploadStatus(data.error || 'Upload failed');
      }
    } catch (err) {
      setCalendarUploadStatus('Upload error');
    }
  };

  const handleTimeTableUpload = async (e) => {
    e.preventDefault();
    if (!timeTableFile) {
      setTimeTableUploadStatus('Please select a PDF file first.');
      return;
    }
    
    setTimeTableUploadStatus('Uploading...');
    const formData = new FormData();
    formData.append('department', timeTableDept);
    formData.append('file', timeTableFile);
    
    const token = localStorage.getItem('adminToken');
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
    try {
      const response = await fetch(`${API_URL}/api/upload_time_table`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await response.json();
      
      if (response.ok) {
        setTimeTableUploadStatus(`Upload successful! Time Table updated for ${timeTableDept}.`);
        setTimeTableFile(null);
      } else {
        setTimeTableUploadStatus(data.error || 'Upload failed');
      }
    } catch (err) {
      setTimeTableUploadStatus('Upload error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/';
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-[52px] font-sans pb-16">
      <Helmet>
        <title>Dashboard | Admin Portal</title>
      </Helmet>

      {/* Header */}
      <header className="bg-gray-900 text-white py-12 px-6 shadow-md mb-12">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-400 font-medium mt-1">Manage ANITS Chatbot Knowledge & Logs</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-colors font-medium border border-red-600/30"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>
      
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        
        {/* Upload Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 p-6 bg-gray-50/50 flex items-center gap-3">
            <UploadCloud className="text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Upload Circulars</h2>
          </div>
          <div className="p-8">
            <p className="text-gray-600 mb-6 font-medium">Upload a PDF circular. The chatbot will instantly process the text and be able to answer questions regarding it.</p>
            
            <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <input 
                type="file" 
                accept=".pdf" 
                onChange={handleFileChange} 
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer border border-gray-200 rounded-xl"
              />
              <button 
                type="submit" 
                className="whitespace-nowrap px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-md"
              >
                Upload Document
              </button>
            </form>

            {uploadStatus && (
              <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 font-medium animate-fade-in ${uploadStatus.includes('successful') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                {uploadStatus.includes('successful') ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                {uploadStatus}
              </div>
            )}
          </div>
        </div>

        {/* Syllabus Upload Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 p-6 bg-gray-50/50 flex items-center gap-3">
            <BookOpen className="text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900">Manage Syllabus Downloads</h2>
          </div>
          <div className="p-8">
            <p className="text-gray-600 mb-6 font-medium">Upload syllabus PDFs. They will immediately appear on the public Syllabus & Downloads page under the selected Academic Year.</p>
            
            <form onSubmit={handleSyllabusUpload} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Academic Year</label>
                  <select 
                    value={syllabusYear}
                    onChange={(e) => setSyllabusYear(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="Academic Year 2025-26">Academic Year 2025-26</option>
                    <option value="Academic Year 2024-25">Academic Year 2024-25</option>
                    <option value="Academic Year 2023-24">Academic Year 2023-24</option>
                    <option value="Academic Year 2022-23">Academic Year 2022-23</option>
                    <option value="Academic Year 2021-22">Academic Year 2021-22</option>
                    <option value="Academic Year 2020-21">Academic Year 2020-21</option>
                    <option value="Academic Year 2019-20">Academic Year 2019-20</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Program Name</label>
                  <input 
                    type="text" 
                    value={syllabusProgram}
                    onChange={(e) => setSyllabusProgram(e.target.value)}
                    placeholder="e.g. First Year UG Courses"
                    className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mt-2">
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={handleSyllabusFileChange} 
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-all cursor-pointer border border-gray-200 rounded-xl"
                />
                <button 
                  type="submit" 
                  className="whitespace-nowrap px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors shadow-md"
                >
                  Upload Syllabus
                </button>
              </div>
            </form>

            {syllabusUploadStatus && (
              <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 font-medium animate-fade-in ${syllabusUploadStatus.includes('successful') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                {syllabusUploadStatus.includes('successful') ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                {syllabusUploadStatus}
              </div>
            )}
          </div>
        </div>

        {/* Policy Upload Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 p-6 bg-gray-50/50 flex items-center gap-3">
            <FileText className="text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">Manage College Policies</h2>
          </div>
          <div className="p-8">
            <p className="text-gray-600 mb-6 font-medium">Upload policy PDFs. They will immediately appear on the public Policies page as clickable View links.</p>
            
            <form onSubmit={handlePolicyUpload} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Select Policy</label>
                  <select 
                    value={policyName}
                    onChange={(e) => setPolicyName(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  >
                    {policiesList.map((policy, idx) => (
                      <option key={idx} value={policy}>{policy}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mt-2">
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={handlePolicyFileChange} 
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-all cursor-pointer border border-gray-200 rounded-xl"
                />
                <button 
                  type="submit" 
                  className="whitespace-nowrap px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-md"
                >
                  Upload Policy
                </button>
              </div>
            </form>

            {policyUploadStatus && (
              <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 font-medium animate-fade-in ${policyUploadStatus.includes('successful') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                {policyUploadStatus.includes('successful') ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                {policyUploadStatus}
              </div>
            )}
          </div>
        </div>

        {/* Academic Calendar Upload Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 p-6 bg-gray-50/50 flex items-center gap-3">
            <BookOpen className="text-teal-600" />
            <h2 className="text-xl font-bold text-gray-900">Manage Academic Calendar</h2>
          </div>
          <div className="p-8">
            <p className="text-gray-600 mb-6 font-medium">Upload Academic Calendar PDFs. They will appear dynamically on the Academic Calendar page.</p>
            
            <form onSubmit={handleCalendarUpload} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Year Header</label>
                  <select 
                    value={calendarYearHeader}
                    onChange={(e) => setCalendarYearHeader(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="Academic Year 2025-26">Academic Year 2025-26</option>
                    <option value="Academic Year 2024-25">Academic Year 2024-25</option>
                    <option value="Academic Year 2023-24">Academic Year 2023-24</option>
                    <option value="Academic Year 2022-23">Academic Year 2022-23</option>
                    <option value="Academic Year 2021-22">Academic Year 2021-22</option>
                    <option value="Academic Year 2020-21">Academic Year 2020-21</option>
                    <option value="Academic Year 2019-20">Academic Year 2019-20</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Year (Row)</label>
                  <input 
                    type="text" 
                    value={calendarYear}
                    onChange={(e) => setCalendarYear(e.target.value)}
                    placeholder="e.g. 2025-26"
                    className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Program Name</label>
                  <input 
                    type="text" 
                    value={calendarProgram}
                    onChange={(e) => setCalendarProgram(e.target.value)}
                    placeholder="e.g. First Year UG Courses"
                    className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mt-2">
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={(e) => setCalendarFile(e.target.files[0])} 
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 transition-all cursor-pointer border border-gray-200 rounded-xl"
                />
                <button 
                  type="submit" 
                  className="whitespace-nowrap px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors shadow-md"
                >
                  Upload Calendar
                </button>
              </div>
            </form>

            {calendarUploadStatus && (
              <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 font-medium animate-fade-in ${calendarUploadStatus.includes('successful') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                {calendarUploadStatus.includes('successful') ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                {calendarUploadStatus}
              </div>
            )}
          </div>
        </div>

        {/* Time Tables Upload Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 p-6 bg-gray-50/50 flex items-center gap-3">
            <FileText className="text-orange-600" />
            <h2 className="text-xl font-bold text-gray-900">Manage Time Tables</h2>
          </div>
          <div className="p-8">
            <p className="text-gray-600 mb-6 font-medium">Upload Time Tables for each department. They will update on the Time Tables page.</p>
            
            <form onSubmit={handleTimeTableUpload} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Select Department</label>
                  <select 
                    value={timeTableDept}
                    onChange={(e) => setTimeTableDept(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  >
                    {deptsList.map((dept, idx) => (
                      <option key={idx} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mt-2">
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={(e) => setTimeTableFile(e.target.files[0])} 
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 transition-all cursor-pointer border border-gray-200 rounded-xl"
                />
                <button 
                  type="submit" 
                  className="whitespace-nowrap px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-colors shadow-md"
                >
                  Upload Time Table
                </button>
              </div>
            </form>

            {timeTableUploadStatus && (
              <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 font-medium animate-fade-in ${timeTableUploadStatus.includes('successful') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                {timeTableUploadStatus.includes('successful') ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                {timeTableUploadStatus}
              </div>
            )}
          </div>
        </div>

        {/* Logs Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 p-6 bg-gray-50/50 flex items-center gap-3">
            <MessageSquare className="text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">Live Chatbot Logs</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider font-bold border-b border-gray-200">
                  <th className="p-4 pl-8">Timestamp</th>
                  <th className="p-4 w-1/3">User Message</th>
                  <th className="p-4 w-1/3">Bot Reply</th>
                  <th className="p-4 pr-8">Lang</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors text-sm">
                    <td className="p-4 pl-8 text-gray-500 font-medium whitespace-nowrap">{log.timestamp}</td>
                    <td className="p-4 text-gray-900 font-medium">{log.user_message}</td>
                    <td className="p-4 text-gray-600">{log.bot_reply}</td>
                    <td className="p-4 pr-8">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                        {log.language}
                      </span>
                    </td>
                  </tr>
                ))}
                {logs.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-12 text-center text-gray-500 font-medium">
                      No chat logs recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
