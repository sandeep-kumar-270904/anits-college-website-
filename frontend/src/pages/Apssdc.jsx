import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const Apssdc = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="font-sans min-h-screen bg-white pt-[80px]">
      <Helmet>
        <title>APSSDC | ANITS</title>
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-[#333] mb-4 uppercase tracking-wide font-['Oswald',sans-serif]">APSSDC</h1>
        <div className="w-full border-b border-dashed border-gray-400 mb-8"></div>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('home')}
            className={`px-10 py-3 text-[14px] font-medium rounded-md border ${activeTab === 'home' ? 'border-gray-200 shadow-sm bg-white text-gray-800' : 'border-gray-100 bg-white text-gray-500 hover:bg-gray-50'}`}
          >
            APSSDC Home
          </button>
          <button 
            onClick={() => setActiveTab('events')}
            className={`px-10 py-3 text-[14px] font-medium rounded-md border ${activeTab === 'events' ? 'border-gray-200 shadow-sm bg-white text-gray-800' : 'border-gray-100 bg-white text-gray-500 hover:bg-gray-50'}`}
          >
            APSSDC Events
          </button>
          <button 
            onClick={() => setActiveTab('mous')}
            className={`px-10 py-3 text-[14px] font-medium rounded-md border ${activeTab === 'mous' ? 'border-gray-200 shadow-sm bg-white text-gray-800' : 'border-gray-100 bg-white text-gray-500 hover:bg-gray-50'}`}
          >
            APSSDC Mous
          </button>
        </div>

        {/* Content */}
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            <h2 className="text-[22px] font-bold text-[#333] mb-4 uppercase tracking-wide font-['Oswald',sans-serif]">ABOUT SKILL DEVELOPMENT:</h2>
            <div className="w-full border-b border-dashed border-gray-400 mb-6"></div>
            
            <p className="text-gray-600 text-[15px] leading-relaxed mb-6">
              The main objective of the skill development program is to provide adequate training in industry relevant skills and industry
              readiness. Skill development is the time one invests in to improve their proficiency and to stay future-ready, any agilities that one
              follows as a passion judi togel, and the ability to complete a task with higher rates of success at the right time. ANITS is associated
              with Andhra Pradesh State Skill Development Corporation (APSSDC)to train students on latest technologies. The training improve
              their critical thinking, problem solving skills to get placed in various skilled jobs and entrepreneurialism. As part of skill
              development center, the lab is established with 37 high configured computers.
              readiness. Skill development is the time one invests in to improve their proficiency and to stay future-ready, any agilities that one
              follows as a passion judi togel, and the ability to complete a task with higher rates of success at the right time. ANITS is associated
              with Andhra Pradesh State Skill Development Corporation (APSSDC)to train students on latest technologies. The training improve
              their critical thinking, problem solving skills to get placed in various skilled jobs and entrepreneurialism. As part of skill
              development center, the lab is established with 37 high configured computers.
            </p>
          </div>
        )}
        
        {activeTab === 'events' && (
          <div className="animate-fade-in text-center py-12 text-gray-500">
            Events information will be updated soon.
          </div>
        )}
        
        {activeTab === 'mous' && (
          <div className="animate-fade-in text-center py-12 text-gray-500">
            MOUs information will be updated soon.
          </div>
        )}

      </div>
    </div>
  );
};

export default Apssdc;
