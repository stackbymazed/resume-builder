"use client";

import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Download, Save, Upload } from "lucide-react";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import { ResumeData } from "@/types/resume";

export default function ResumeBuilder() {
  const [data, setData] = useState<ResumeData>({
    personal: {
      name: "Mazedul Islam Nayem",
      role: "FRONTEND - WEB DEVELOPER",
      email: "majedulislam223311@gmail.com",
      phone: "+8801800000000",
      location: "Noakhali, Bangladesh",
      linkedin: "https://www.linkedin.com/in/mazedul-islam22",
      github: "https://github.com/stackbymazed",
      portfolio: "https://mazed-portfolio.vercel.app",
    },
    objective: "Passionate MERN Stack Developer with experience in React.js, Next.js, Node.js, Express, MongoDB, and Firebase. Eager to deliver innovative web solutions and grow as a Full Stack Developer.",
    skills: [
      { id: "1", category: "Frontend", items: "React.js, Next.js, React Router, HTML5, CSS3, Tailwind CSS, Bootstrap CSS" },
      { id: "2", category: "Backend", items: "Node.js, Express.js" },
      { id: "3", category: "Database", items: "MongoDB, MySQL" },
      { id: "4", category: "Tools & Platforms", items: "Git, GitHub, VS Code, Postman, Firebase, Netlify, Vercel, Stripe, Framer Motion" },
      { id: "5", category: "Programming Languages", items: "JavaScript (ES6+), TypeScript, Python" },
      { id: "6", category: "Others", items: "REST API Development, JWT Authentication, Deployment" },
      { id: "7", category: "Interpersonal Skills", items: "Critical Thinking & Problem-Solving, Time Management & Adaptability" },
    ],
    projects: [
      {
        id: "1",
        title: "EduSmart – Online Education System",
        type: "(Team Project)",
        liveSite: "https://edusmart.com",
        client: "https://github.com/client",
        server: "https://github.com/server",
        shortDesc: "A digital learning platform connecting students, teachers, and parents with online courses, live classes, and progress tracking.",
        features: "Role-based Dashboards & Smart Notifications, Real-time updates, live alerts, and personalized access for Admins, Teachers, and Students.\nAssignments, Quizzes & Digital Notice Board, Streamlined task management, evaluations, and important announcements in one system.\nSecure Payment System & AI Chatbot, Integrated subscription payments with intelligent chatbot assistance for user support.\nTech Stack : MERN Stack, Next.js, Firebase, Cloudinary, OpenAI API, Stripe, Tailwind CSS, Framer Motion, JWT.",
      },
      {
        id: "2",
        title: "BhromonBarta – Tourism Management System",
        type: "",
        liveSite: "https://bhromon.com",
        client: "https://github.com/client",
        server: "https://github.com/server",
        shortDesc: "A comprehensive tourism management platform featuring multi-role dashboards for tourists, guides, and admins — enabling secure tour bookings, payments, and real-time updates.",
        features: "Multi-role dashboards for tourists, guides, and admins.\nIntegrated secure booking functionality with Stripe API.\nTech Stack : MERN Stack, Firebase, Stripe, Tailwind CSS, Framer Motion.",
      },
      {
        id: "3",
        title: "Online Group Study",
        type: "",
        liveSite: "https://groupstudy.com",
        client: "https://github.com/client",
        server: "https://github.com/server",
        shortDesc: "An interactive educational platform enabling students to collaboratively create, submit, and review assignments in real time, fostering peer-to-peer learning and engagement.",
        features: "Collaborative assignment creation and peer grading.\nSubmission and review workflows with real-time updates.\nTech Stack : MERN Stack, Firebase, JWT, Tailwind CSS, Framer Motion.",
      }
    ],
    education: [
      {
        id: "1",
        degree: "Diploma in Engineering (Computer Science & Technology)",
        institution: "Institute of Computer Science & Technology (ICST), Feni",
        duration: "2022 – Present",
      }
    ],
    languages: [
      { id: "1", language: "Bangla", proficiency: "Native" },
      { id: "2", language: "English", proficiency: "Fluent" }
    ]
  });

  const [isClient, setIsClient] = useState(false);
  const componentRef = useRef(null);
  const [isChecking, setIsChecking] = useState(false);
  const [spellErrors, setSpellErrors] = useState<any[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [showSpellModal, setShowSpellModal] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const checkSpelling = async () => {
    setIsChecking(true);
    setHasChecked(false);
    
    // Aggregate text
    let textToCheck = `Objective:\n${data.objective}\n\n`;
    data.projects.forEach((p, i) => {
        textToCheck += `Project ${i+1}:\n${p.shortDesc}\n${p.features}\n\n`;
    });

    try {
        const res = await fetch('/api/spellcheck', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: textToCheck })
        });
        const json = await res.json();
        
        if (json.matches) {
           setSpellErrors(json.matches);
        } else {
           setSpellErrors([]);
        }
    } catch(e) {
        console.error(e);
        setSpellErrors([]);
        alert("Failed to connect to spell check service.");
    } finally {
        setIsChecking(false);
        setHasChecked(true);
        setShowSpellModal(true);
    }
  };

  const printDocument = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${data.personal.name || "Resume"}_Resume`
  });

  const handleSaveToLocal = () => {
    localStorage.setItem("resumeDataClassic", JSON.stringify(data));
    alert("Resume data saved automatically!");
  };

  const handleLoadFromLocal = () => {
    const savedData = localStorage.getItem("resumeDataClassic");
    if (savedData) {
      setData(JSON.parse(savedData));
      alert("Resume data loaded successfully!");
    } else {
      alert("No saved data found!");
    }
  };

  const updatePersonal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, personal: { ...data.personal, [e.target.name]: e.target.value } });
  };

  const handleAdd = (section: string, defaultObj: any) => {
    setData({ ...data, [section]: [...data[section as keyof typeof data] as any[], { id: Date.now().toString(), ...defaultObj }] });
  };
  const handleUpdate = (section: keyof ResumeData, id: string, field: string, value: string) => {
    const list = data[section] as any[];
    const updated = list.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    setData({ ...data, [section]: updated });
  };
  const handleRemove = (section: keyof ResumeData, id: string) => {
    const list = data[section] as any[];
    setData({ ...data, [section]: list.filter((item) => item.id !== id) });
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-pulse">Loading Workspace...</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      
      {/* Global Sticky Banner */}
      <div className="bg-amber-100 border-b-2 border-amber-300 px-4 py-2.5 text-center text-[13px] md:text-sm text-amber-900 shadow-sm z-50 flex justify-center items-center gap-3 flex-wrap">
        <span className="text-lg">📢</span>
        <span>
          <strong>Typo Check System:</strong> Let's make sure your resume is flawless before downloading!
        </span>
        <button 
          onClick={() => {
            if(hasChecked && !isChecking) setShowSpellModal(true);
            else checkSpelling();
          }} 
          className="ml-2 bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-md text-xs font-bold transition flex items-center gap-1 shadow-sm"
          disabled={isChecking}
        >
          {isChecking ? "Scanning..." : hasChecked ? `View Results (${spellErrors.length} found)` : "Scan Resume (AI)"}
        </button>
      </div>

      <div className="bg-slate-100 flex flex-col md:flex-row font-sans flex-1 overflow-hidden">
        
        {/* Left Sidebar - Form */}
        <div className="w-full md:w-1/2 lg:w-5/12 h-full overflow-y-auto bg-white border-r border-slate-200 p-6 shadow-md custom-scrollbar">
          <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 py-3 border-b shadow-sm -mx-6 px-6">
            <h1 className="text-xl font-bold text-slate-800">Resume Creator</h1>
            <div className="flex gap-2">
              <button onClick={handleSaveToLocal} className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100" title="Save Data">
                <Save size={20} />
              </button>
              <button onClick={handleLoadFromLocal} className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-100" title="Load Data">
                <Upload size={20} />
              </button>
            </div>
          </div>

          <ResumeForm
            data={data}
            setData={setData}
            updatePersonal={updatePersonal}
            handleAdd={handleAdd}
            handleUpdate={handleUpdate}
            handleRemove={handleRemove}
          />

        </div>

        {/* Right Sidebar - Live Preview */}
        <div className="w-full md:w-1/2 lg:w-7/12 bg-slate-200 h-full overflow-y-auto p-4 md:p-8 flex flex-col items-center custom-scrollbar">
          
          <div className="w-full max-w-[210mm] flex justify-between items-center mb-6 sticky top-0 z-10 bg-slate-200/90 backdrop-blur-sm py-2 px-1 rounded">
            <p className="text-slate-500 font-medium text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Classic ATS Template</p>
            <button onClick={printDocument} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all shadow-lg hover:shadow-indigo-500/30">
              <Download size={18} />
              Download PDF
            </button>
          </div>

          <ResumePreview data={data} contentRef={componentRef} />

        </div>
        
        {/* Scrollbar styling */}
        <style dangerouslySetInnerHTML={{
          __html: `
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        `}} />
      </div>
      {/* Spell Check Modal */}
      {showSpellModal && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-slate-50">
               <h3 className="font-bold text-lg flex items-center gap-2">
                 {spellErrors.length === 0 ? "✅ No Typos Found!" : `🚨 ${spellErrors.length} Typos / Grammar Issues Found`}
               </h3>
               <button onClick={() => setShowSpellModal(false)} className="text-gray-500 hover:text-black font-bold text-2xl px-2 leading-none">&times;</button>
            </div>
            <div className="p-4 overflow-y-auto custom-scrollbar flex-1 bg-slate-50">
               {spellErrors.length === 0 ? (
                 <div className="text-center py-10 text-emerald-600 font-medium bg-emerald-50 rounded-lg border border-emerald-200">Your resume text looks incredibly professional and error-free!</div>
               ) : (
                 <div className="space-y-4">
                   <p className="text-sm text-slate-700 bg-white p-3 rounded-lg shadow-sm border border-slate-200 font-medium">We found the following issues in your text. Review the suggestions and manually fix them in the left-side form!</p>
                   {spellErrors.map((err, i) => (
                     <div key={i} className="bg-white p-3 rounded-lg border-l-4 border-l-red-500 border-t border-r border-b border-gray-200 shadow-sm">
                        <p className="text-red-700 font-bold text-[14px] mb-1">{err.message}</p>
                        <p className="text-gray-600 text-[13px] bg-gray-50 p-2 rounded mb-2 font-mono">"...{err.context.text}..."</p>
                        {err.replacements && err.replacements.length > 0 && (
                          <div className="text-[13px] flex gap-2 items-center flex-wrap">
                             <span className="font-semibold text-emerald-700 flex items-center gap-1">✨ Suggestions: </span>
                             {err.replacements.slice(0,3).map((r:any, idx:number) => (
                               <span key={idx} className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium border border-emerald-200">{r.value}</span>
                             ))}
                          </div>
                        )}
                     </div>
                   ))}
                 </div>
               )}
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-3 bg-white">
               <button onClick={checkSpelling} className="px-5 py-2 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition">Re-scan</button>
               <button onClick={() => setShowSpellModal(false)} className="px-5 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition">Close & Fix Typos</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
