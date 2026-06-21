import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, MessageSquare, LogOut, CheckCircle, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
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
