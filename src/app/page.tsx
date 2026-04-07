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

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  if (!isClient) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans overflow-hidden">

      {/* Left Sidebar - Form */}
      <div className="w-full md:w-1/2 lg:w-5/12 h-screen overflow-y-auto bg-white border-r border-slate-200 p-6 shadow-md custom-scrollbar">
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
      <div className="w-full md:w-1/2 lg:w-7/12 bg-slate-200 h-screen overflow-y-auto p-4 md:p-8 flex flex-col items-center custom-scrollbar">

        <div className="w-full max-w-[210mm] flex justify-between items-center mb-6 sticky top-0 z-10 bg-slate-200/90 backdrop-blur-sm py-2 px-1">
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
  );
}
