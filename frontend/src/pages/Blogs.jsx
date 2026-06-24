import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Clock, User, ArrowRight, FileText, Calendar } from 'lucide-react';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
      try {
        const response = await fetch(`${API_URL}/api/blogs`);
        const data = await response.json();
        // Sort descending by created_at date
        setBlogs(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="font-sans pt-[80px] min-h-screen bg-gray-50 pb-16">
      <Helmet>
        <title>News & Blogs | ANITS</title>
      </Helmet>

      {/* Hero Banner */}
      <div className="relative h-[250px] bg-[#112a46] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md">
            News & Blogs
          </h1>
          <p className="text-blue-100 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Stay updated with the latest happenings, student achievements, and academic articles.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-500 font-bold">Loading news...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <FileText className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No Articles Yet</h3>
            <p className="text-gray-500">Check back later for the latest news and blog posts.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col overflow-hidden group">
                
                {/* Image Section */}
                <div className="h-56 bg-gray-200 overflow-hidden relative">
                  {blog.image ? (
                    <img 
                      src={`${API_URL}/api/blog_image/${blog.image}`} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
                      <FileText size={48} className="text-indigo-200" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 text-xs font-bold text-indigo-700">
                    <Calendar size={14} />
                    {formatDate(blog.created_at)}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 font-medium">
                    <User size={16} className="text-indigo-500" />
                    <span>{blog.author}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {blog.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed flex-grow whitespace-pre-wrap text-sm">
                    {blog.content}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-100 mt-auto">
                    <button className="flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors text-sm uppercase tracking-wide">
                      Read Full Article <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
