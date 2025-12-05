'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Section from './Section';
import { projectsData, Project } from '@/data/projects';

const parseProjectType = (rawString: string) => {
    const match = rawString.match(/\((.*?)\)\s*(.*)/);
    if (match) {
        return { year: match[1], role: match[2] };
    }
    return { year: '', role: rawString };
};

const MobileProjectCard = ({ project }: { project: Project }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { year, role } = parseProjectType(project.type);

    return (
        <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-lg flex flex-col">
            {project.images && project.images.length > 0 && (
                <div className="h-48 relative w-full shrink-0">
                    <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            <div className="p-6 flex flex-col h-full">
                <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                    <div className="flex flex-wrap gap-2">
                        {year && (
                            <span className="px-2 py-1 rounded bg-indigo-600 text-white text-xs font-bold">
                        {year}
                    </span>
                        )}
                        <span className="px-2 py-1 rounded bg-slate-700 text-indigo-200 text-xs font-medium border border-slate-600">
                    {role}
                </span>
                    </div>
                </div>

                <div className={`text-slate-300 text-sm mb-4 transition-all duration-300 relative ${isExpanded ? '' : 'line-clamp-4'}`}>
                    {project.description}
                </div>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-indigo-400 text-sm font-semibold hover:text-indigo-300 self-start mb-6 focus:outline-none"
                >
                    {isExpanded ? 'Read Less' : 'Read More...'}
                </button>

                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.tech.slice(0, 4).map((t) => (
                        <span key={t} className="text-xs px-2 py-1 bg-slate-900 rounded text-slate-400 border border-slate-800">
                    {t}
                </span>
                    ))}
                    {project.tech.length > 4 && (
                        <span className="text-xs px-2 py-1 bg-slate-900 rounded text-slate-400 border border-slate-800">
                    +{project.tech.length - 4}
                </span>
                    )}
                </div>

                <div className="flex gap-3 mt-auto pt-4 border-t border-slate-700/50">
                    {project.links.map((link, i) => (
                        <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---
export default function ProjectsSection() {
    const [activeId, setActiveId] = useState<number>(projectsData[0].id);
    const activeProject = projectsData.find((p) => p.id === activeId) || projectsData[0];

    // Parse active project type for Desktop view
    const { year: activeYear, role: activeRole } = parseProjectType(activeProject.type);

    return (
        <div id="3" className="relative bg-slate-900 border-t border-slate-800 min-h-screen lg:h-screen lg:snap-start lg:shrink-0 w-full flex flex-col justify-center">
            <Section className="h-full w-full max-w-[1600px] mx-auto" title="" content="">
                <div className="flex flex-col h-full pt-20 pb-10 px-4 md:px-8 lg:pt-0 lg:pb-0 lg:px-12 lg:flex-row lg:items-center lg:gap-8 xl:gap-16">

                    <div className="flex flex-col w-full lg:w-1/3 lg:h-[70vh] lg:justify-center z-10">
                        <div className="mb-6 lg:mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                Selected Work
                            </h2>
                            <p className="text-slate-400 text-sm md:text-base">
                                A collection of professional and personal builds.
                            </p>
                        </div>

                        <div className="hidden lg:flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
                            {projectsData.map((project) => {
                                const { year, role } = parseProjectType(project.type);
                                return (
                                    <button
                                        key={project.id}
                                        onClick={() => setActiveId(project.id)}
                                        className={`group text-left p-4 rounded-xl transition-all duration-300 border ${
                                            activeId === project.id
                                                ? 'bg-slate-800 border-indigo-500 shadow-lg shadow-indigo-500/10'
                                                : 'bg-transparent border-transparent hover:bg-slate-800/50 hover:border-slate-700'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className={`font-bold text-lg ${activeId === project.id ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                                                {project.title}
                                            </h3>
                                            {year && (
                                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                                                    activeId === project.id ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-400'
                                                }`}>
                                {year}
                            </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wide">
                                            {role}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="hidden lg:flex w-full lg:w-2/3 h-full lg:h-[70vh] bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden relative shadow-2xl mr-12 xl:mr-24">

                        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-indigo-900/20 to-transparent pointer-events-none" />

                        <div className="flex flex-col h-full w-full p-8 xl:p-12 relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-3xl font-bold text-white mb-3">{activeProject.title}</h3>
                                    <div className="flex items-center gap-3">
                                        {activeYear && (
                                            <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-sm font-bold shadow-sm">
                                {activeYear}
                            </span>
                                        )}
                                        <span className="px-3 py-1 rounded-full bg-slate-700 text-indigo-200 text-sm font-medium border border-slate-600">
                            {activeRole}
                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    {activeProject.links.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-slate-700 hover:bg-indigo-600 text-white text-sm rounded-lg transition-colors font-medium"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                                <div className="prose prose-invert prose-slate max-w-none mb-8">
                                    <p className="whitespace-pre-line text-slate-300 leading-relaxed">
                                        {activeProject.description}
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <h4 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-3">Technologies</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {activeProject.tech.map((t) => (
                                            <span key={t} className="px-3 py-1 bg-slate-900 rounded-md text-slate-400 text-sm border border-slate-700">
                                {t}
                            </span>
                                        ))}
                                    </div>
                                </div>

                                {activeProject.images && activeProject.images.length > 0 && (
                                    <div className="w-full h-64 relative rounded-xl overflow-hidden border border-slate-700 group">
                                        <Image
                                            src={activeProject.images[0]}
                                            alt={activeProject.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="lg:hidden flex flex-col gap-8 pb-20">
                        {projectsData.map((project) => (
                            <MobileProjectCard key={project.id} project={project} />
                        ))}
                    </div>

                </div>
            </Section>
        </div>
    );
}