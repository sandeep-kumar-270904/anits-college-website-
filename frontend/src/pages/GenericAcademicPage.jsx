import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const GenericAcademicPage = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const pageId = pathParts[pathParts.length - 1];
  
  const titleMap = {
    'calendar': 'Academic Calendar',
    'timetable': 'Time Table',
    'e-learning': 'E-Learning',
    'exams': 'Exam Section',
    'iso-certificate': 'ISO Certificate',
    'apssdc': 'APSSDC',
    'swayam-nptel': 'SWAYAM-NPTEL',
    'professional-bodies': 'Professional Bodies'
  };

  const pageName = titleMap[pageId] || pageId.replace(/-/g, ' ').toUpperCase();

  return (
    <>
      <Helmet>
        <title>{pageName} | ANITS</title>
      </Helmet>
      
      <div className="page-header pt-[120px] pb-[60px] bg-[#1e3a8a] text-white text-center">
        <div className="container mx-auto px-4 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">{pageName}</h1>
          <p className="text-xl opacity-90">Information will be updated soon.</p>
        </div>
      </div>

      <div className="section bg-gray-50 min-h-[50vh] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl text-gray-400 font-bold tracking-widest mb-4">[ PLACEHOLDER FOR {pageName.toUpperCase()} ]</h2>
          <p className="text-gray-500">Please provide the screenshots or content for this page to build it out.</p>
        </div>
      </div>
    </>
  );
};

export default GenericAcademicPage;
