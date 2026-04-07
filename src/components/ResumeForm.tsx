import React from "react";
import { Plus, Trash2, AlertCircle } from "lucide-react";
import { ResumeData } from "@/types/resume";

const INPUT_CLASS = "w-full px-3 py-2 text-[14px] border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all";

interface Props {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  updatePersonal: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAdd: (section: string, defaultObj: any) => void;
  handleUpdate: (section: keyof ResumeData, id: string, field: string, value: string) => void;
  handleRemove: (section: keyof ResumeData, id: string) => void;
}

export default function ResumeForm({ data, setData, updatePersonal, handleAdd, handleUpdate, handleRemove }: Props) {
  return (
    <div className="space-y-6 pb-10">
      
      {/* Spell Check Alert Banner */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-3.5 rounded-r-lg shadow-sm text-amber-900 text-sm flex gap-3 items-start animate-pulse">
        <AlertCircle size={20} className="text-amber-500 shrink-0 mt-0.5" />
        <p className="leading-snug">
          <strong>Smart Typo Alert:</strong> Strict spell-checking is enabled. If you make a spelling mistake, the browser will <span className="underline decoration-red-500 decoration-wavy font-medium">underline it in red</span>. Right-click the red lines to fix errors before downloading!
        </p>
      </div>

      {/* Personal Info */}
      <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <h2 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">Personal Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input spellCheck={true} type="text" name="name" value={data.personal.name} onChange={updatePersonal} placeholder="Full Name" className={INPUT_CLASS} />
          <input spellCheck={true} type="text" name="role" value={data.personal.role} onChange={updatePersonal} placeholder="Role / Title" className={INPUT_CLASS} />
          <input spellCheck={true} type="email" name="email" value={data.personal.email} onChange={updatePersonal} placeholder="Email" className={INPUT_CLASS} />
          <input spellCheck={true} type="text" name="phone" value={data.personal.phone} onChange={updatePersonal} placeholder="Phone" className={INPUT_CLASS} />
          <input spellCheck={true} type="text" name="location" value={data.personal.location} onChange={updatePersonal} placeholder="Location" className={INPUT_CLASS} />
          <input spellCheck={false} type="text" name="linkedin" value={data.personal.linkedin} onChange={updatePersonal} placeholder="LinkedIn URL" className={INPUT_CLASS} />
          <input spellCheck={false} type="text" name="github" value={data.personal.github} onChange={updatePersonal} placeholder="GitHub URL" className={INPUT_CLASS} />
          <input spellCheck={false} type="text" name="portfolio" value={data.personal.portfolio} onChange={updatePersonal} placeholder="Portfolio URL" className={INPUT_CLASS} />
        </div>
      </section>

      {/* Career Objective */}
      <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <h2 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">Career Objective</h2>
        <textarea
          spellCheck={true}
          value={data.objective}
          onChange={(e) => setData({ ...data, objective: e.target.value })}
          className={`${INPUT_CLASS} min-h-[80px] resize-y`}
        />
      </section>

      {/* Skills */}
      <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Skills</h2>
          <button onClick={() => handleAdd("skills", { category: "", items: "" })} className="text-xs flex items-center bg-white px-2 py-1 border border-slate-300 rounded hover:bg-slate-100">
            <Plus size={14} className="mr-1" /> Add
          </button>
        </div>
        <div className="space-y-3">
          {data.skills.map((skill) => (
            <div key={skill.id} className="flex gap-2 items-start relative group">
              <input spellCheck={true} type="text" value={skill.category} onChange={(e) => handleUpdate("skills", skill.id, "category", e.target.value)} placeholder="Category (e.g. Frontend)" className="w-1/3 px-2 py-1.5 text-sm border border-slate-300 rounded" />
              <input spellCheck={true} type="text" value={skill.items} onChange={(e) => handleUpdate("skills", skill.id, "items", e.target.value)} placeholder="React, Next.js..." className="w-2/3 px-2 py-1.5 text-sm border border-slate-300 rounded" />
              <button onClick={() => handleRemove("skills", skill.id)} className="text-red-500 mt-1.5 hover:text-red-700">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Projects</h2>
          <button onClick={() => handleAdd("projects", { title: "", type: "", liveSite: "", client: "", server: "", shortDesc: "", features: "" })} className="text-xs flex items-center bg-white px-2 py-1 border border-slate-300 rounded hover:bg-slate-100">
            <Plus size={14} className="mr-1" /> Add
          </button>
        </div>
        <div className="space-y-4">
          {data.projects.map((proj) => (
            <div key={proj.id} className="p-3 bg-white border border-slate-200 rounded relative group">
              <button onClick={() => handleRemove("projects", proj.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                <Trash2 size={16} />
              </button>
              <div className="grid grid-cols-2 gap-2 mb-2 pr-6">
                <input spellCheck={true} type="text" value={proj.title} onChange={(e) => handleUpdate("projects", proj.id, "title", e.target.value)} placeholder="Project Title" className={`${INPUT_CLASS} col-span-2 font-medium`} />
                <input spellCheck={true} type="text" value={proj.type} onChange={(e) => handleUpdate("projects", proj.id, "type", e.target.value)} placeholder="Type e.g. (Team Project)" className={INPUT_CLASS} />
                <input spellCheck={false} type="text" value={proj.liveSite} onChange={(e) => handleUpdate("projects", proj.id, "liveSite", e.target.value)} placeholder="Live Site URL" className={INPUT_CLASS} />
                <input spellCheck={false} type="text" value={proj.client} onChange={(e) => handleUpdate("projects", proj.id, "client", e.target.value)} placeholder="Client Repo URL" className={INPUT_CLASS} />
                <input spellCheck={false} type="text" value={proj.server} onChange={(e) => handleUpdate("projects", proj.id, "server", e.target.value)} placeholder="Server Repo URL" className={INPUT_CLASS} />
              </div>
              <textarea spellCheck={true} value={proj.shortDesc} onChange={(e) => handleUpdate("projects", proj.id, "shortDesc", e.target.value)} placeholder="Short Description" className={`${INPUT_CLASS} min-h-[50px] mb-2`} />
              <textarea spellCheck={true} value={proj.features} onChange={(e) => handleUpdate("projects", proj.id, "features", e.target.value)} placeholder="Bullet Points (separated by new line)" className={`${INPUT_CLASS} min-h-[80px]`} />
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Education</h2>
          <button onClick={() => handleAdd("education", { degree: "", institution: "", duration: "" })} className="text-xs flex items-center bg-white px-2 py-1 border border-slate-300 rounded hover:bg-slate-100">
            <Plus size={14} className="mr-1" /> Add
          </button>
        </div>
        <div className="space-y-3">
          {data.education.map((edu) => (
            <div key={edu.id} className="p-3 bg-white border border-slate-200 rounded relative group">
              <button onClick={() => handleRemove("education", edu.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                <Trash2 size={16} />
              </button>
              <div className="grid grid-cols-1 gap-2 pr-6">
                <input spellCheck={true} type="text" value={edu.degree} onChange={(e) => handleUpdate("education", edu.id, "degree", e.target.value)} placeholder="Degree / Program" className={`${INPUT_CLASS} font-medium`} />
                <input spellCheck={true} type="text" value={edu.institution} onChange={(e) => handleUpdate("education", edu.id, "institution", e.target.value)} placeholder="Institute Name" className={INPUT_CLASS} />
                <input spellCheck={true} type="text" value={edu.duration} onChange={(e) => handleUpdate("education", edu.id, "duration", e.target.value)} placeholder="Duration (e.g. 2022 - Present)" className={INPUT_CLASS} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Language Proficiency */}
      <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
         <div className="flex justify-between items-center mb-3">
           <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Languages</h2>
          <button onClick={() => handleAdd("languages", { language: "", proficiency: "" })} className="text-xs flex items-center bg-white px-2 py-1 border border-slate-300 rounded hover:bg-slate-100">
            <Plus size={14} className="mr-1" /> Add
          </button>
        </div>
        <div className="space-y-3">
          {data.languages.map((lang) => (
            <div key={lang.id} className="flex gap-2 items-center">
              <input spellCheck={true} type="text" value={lang.language} onChange={(e) => handleUpdate("languages", lang.id, "language", e.target.value)} placeholder="Language (e.g. Bangla)" className="w-1/2 px-2 py-1.5 text-sm border border-slate-300 rounded" />
              <input spellCheck={true} type="text" value={lang.proficiency} onChange={(e) => handleUpdate("languages", lang.id, "proficiency", e.target.value)} placeholder="Proficiency (e.g. Native)" className="w-1/2 px-2 py-1.5 text-sm border border-slate-300 rounded" />
              <button onClick={() => handleRemove("languages", lang.id)} className="text-red-500 hover:text-red-700">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
