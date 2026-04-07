import React from "react";
import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

export default function ResumePreview({ data, contentRef }: Props) {
  return (
    <div 
      ref={contentRef} 
      className="bg-white shadow-2xl max-w-[210mm] min-h-[297mm] w-full p-10 md:p-12 print:p-8 print:shadow-none mx-auto mb-10 text-black border border-gray-100"
      style={{ aspectRatio: "1/1.414", fontFamily: 'Arial, Helvetica, sans-serif' }}
    >
      {/* Header */}
      <div className="text-center mb-3">
        <h1 className="text-3xl font-bold pb-1">{data.personal.name}</h1>
        <h2 className="text-[14px] font-bold pb-1">{data.personal.role}</h2>
        
        <div className="text-[13px] font-medium text-blue-600 mb-0.5 flex justify-center items-center gap-1.5 flex-wrap">
          {data.personal.github && <><a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a> <span className="text-black mx-1 font-normal">|</span></>}
          {data.personal.portfolio && <><a href={data.personal.portfolio} target="_blank" rel="noopener noreferrer" className="hover:underline">Portfolio</a> <span className="text-black mx-1 font-normal">|</span></>}
          {data.personal.linkedin && <><a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a></>}
        </div>

        <div className="text-[13px] font-normal flex justify-center items-center gap-1.5 flex-wrap flex-row">
          {data.personal.phone && <span>{data.personal.phone} <span className="mx-1">|</span></span>}
          {data.personal.email && <span>{data.personal.email} <span className="mx-1">|</span></span>}
          {data.personal.location && <span>{data.personal.location}</span>}
        </div>
      </div>
      <hr className="border-t border-black mb-2" />

      {/* Career Objective */}
      {data.objective && (
        <div className="mb-2">
          <h3 className="text-[14px] font-bold mb-1 tracking-tight">Career Objective</h3>
          <p className="text-[13px] leading-snug text-justify whitespace-pre-wrap">{data.objective}</p>
        </div>
      )}
      <hr className="border-t border-gray-400 mb-2" />

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-2">
          <h3 className="text-[14px] font-bold mb-1 tracking-tight">Skills</h3>
          <ul className="list-disc text-[13px] leading-[1.35] space-y-0.5 ml-5">
            {data.skills.map((skill) => (
              <li key={skill.id} className="pl-1">
                <span className="font-bold">{skill.category}</span> : {skill.items}
              </li>
            ))}
          </ul>
        </div>
      )}
      <hr className="border-t border-gray-400 mb-2" />

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-2">
          <h3 className="text-[14px] font-bold mb-2 tracking-tight">Projects</h3>
          <div className="space-y-3 mt-1">
            {data.projects.map((proj, index) => (
              <div key={proj.id}>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-0.5 leading-snug">
                   <h4 className="text-[13px] font-bold tracking-tight">
                     {index + 1}.{proj.title} {proj.type && <span className="italic font-normal">{proj.type}</span>}
                   </h4>
                   <div className="text-[12px] text-blue-600 font-medium shrink-0">
                     {proj.liveSite && <><a href={proj.liveSite} target="_blank" rel="noopener noreferrer" className="hover:underline">Live Site</a> { (proj.client || proj.server) && <span className="text-black font-normal mx-1">|</span> } </>}
                     {proj.client && <><a href={proj.client} target="_blank" rel="noopener noreferrer" className="hover:underline ml-1">Client</a> { proj.server && <span className="text-black font-normal mx-1">|</span> } </>}
                     {proj.server && <><a href={proj.server} target="_blank" rel="noopener noreferrer" className="hover:underline ml-1">Server</a></>}
                   </div>
                </div>
                {proj.shortDesc && <p className="text-[13px] mb-1 leading-snug">{proj.shortDesc}</p>}
                <ul className="list-disc text-[13px] leading-[1.3] space-y-[3px] ml-5 pl-1">
                  {proj.features.split('\n').filter(l => l.trim().length > 0).map((line, i) => {
                    const colonIdx = line.indexOf(' : ');
                    if (colonIdx > -1) {
                       return (
                         <li key={i}>
                           <span className="font-bold">{line.substring(0, colonIdx).trim()}</span> : {line.substring(colonIdx + 3).trim()}
                         </li>
                       );
                    }
                    return <li key={i}>{line.trim()}</li>
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      {data.education.length > 0 && <hr className="border-t border-gray-400 mb-2" />}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-2">
          <h3 className="text-[14px] font-bold mb-1 tracking-tight">Education</h3>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="text-[13px] leading-snug">
                 <p className="font-bold">{edu.degree}</p>
                 <p><span className="font-bold">Institute:</span> {edu.institution}</p>
                 <p><span className="font-bold">Duration:</span> {edu.duration}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {data.languages.length > 0 && <hr className="border-t border-gray-400 mb-2" />}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div className="mb-2">
          <h3 className="text-[14px] font-bold mb-1 tracking-tight">Language Proficiency</h3>
          <ul className="list-disc text-[13px] leading-snug space-y-[2px] ml-5">
            {data.languages.map((lang) => (
              <li key={lang.id} className="pl-1">
                {lang.language} – {lang.proficiency}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
