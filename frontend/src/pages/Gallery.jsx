import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Image as ImageIcon, Maximize2, X, Filter } from 'lucide-react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['All', 'Campus', 'Events', 'Workshops', 'Sports', 'Hostel'];

  useEffect(() => {
    const fetchGallery = async () => {
      const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
      try {
        const response = await fetch(`${API_URL}/api/gallery`);
        const data = await response.json();
        // Sort descending by upload date
        setImages(data.sort((a, b) => new Date(b.upload_date) - new Date(a.upload_date)));
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

  return (
    <div className="font-sans pt-[80px] min-h-screen bg-gray-50 pb-16">
      <Helmet>
        <title>Photo Gallery | ANITS</title>
      </Helmet>

      {/* Hero Banner */}
      <div className="relative h-[250px] bg-[#112a46] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/images/campus-banner.jpg" 
            alt="Campus" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md">
            Photo Gallery
          </h1>
          <p className="text-blue-100 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Explore the vibrant life, events, and infrastructure at ANITS.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <div className="flex items-center gap-2 mr-4 text-gray-500 font-bold uppercase tracking-wider text-sm">
            <Filter size={18} />
            Filter:
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm ${
                activeCategory === cat
                  ? 'bg-pink-500 text-white shadow-pink-200 border-transparent'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-pink-300 hover:text-pink-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-500 font-bold">Loading gallery...</p>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <ImageIcon className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No Images Found</h3>
            <p className="text-gray-500">There are no images in the "{activeCategory}" category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[250px]">
            {filteredImages.map((img) => (
              <div 
                key={img.id} 
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-200"
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={`${API_URL}/api/gallery_file/${img.filename}`} 
                  alt={img.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop";
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-pink-500 text-white text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
                      {img.category}
                    </span>
                    <h3 className="text-white font-bold text-lg leading-tight drop-shadow-md">
                      {img.title}
                    </h3>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 hover:bg-white/40">
                    <Maximize2 size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 animate-fade-in">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 p-3 rounded-full transition-colors backdrop-blur-md z-[101]"
          >
            <X size={28} />
          </button>
          
          <div className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center">
            <img 
              src={`${API_URL}/api/gallery_file/${selectedImage.filename}`} 
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-6 text-center">
              <span className="inline-block px-3 py-1 bg-pink-500 text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                {selectedImage.category}
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                {selectedImage.title}
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
