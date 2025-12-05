'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '@/data/projects';
import ProjectCard from './ProjectCard';
import Section from './Section';

export default function ProjectsSection() {
    const [selectedId, setSelectedId] = useState<number>(1);
    const selectedProject = projectsData.find(p => p.id === selectedId) || projectsData[0];

    return (
        <div id="3" className="bg-gray-900 mt-40 min-h-screen lg:h-screen lg:snap-start lg:shrink-0 w-full flex items-center justify-center border-t border-slate-800">
            <Section className="w-full h-full max-w-7xl mx-auto px-4" title="" content="">

                <div className="flex flex-col lg:flex-row w-full h-full lg:items-center gap-8 py-20 lg:py-0">

                    <div className="w-full lg:w-1/3 flex flex-col order-2 lg:order-1">
                        <h2 className="text-3xl font-bold text-white mb-6 border-b border-slate-700 pb-4">
                            Notable Projects
                        </h2>

                        <div className="flex flex-col space-y-2">
                            {projectsData.map((project) => {
                                const isSelected = selectedId === project.id;
                                return (
                                    <button
                                        key={project.id}
                                        onClick={() => setSelectedId(project.id)}
                                        className={`
                                            group w-full text-left p-4 rounded-xl transition-all duration-300
                                            border border-transparent
                                            ${isSelected
                                            ? 'bg-slate-800 border-slate-700 shadow-lg'
                                            : 'hover:bg-slate-800/50 hover:pl-5'}
                                        `}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className={`font-semibold text-lg ${isSelected ? 'text-indigo-400' : 'text-slate-300 group-hover:text-white'}`}>
                                                {project.title}
                                            </span>
                                            {isSelected && (
                                                <motion.div layoutId="active-dot" className="w-2 h-2 bg-indigo-500 rounded-full" />
                                            )}
                                        </div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">
                                            {project.type}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="w-full lg:w-2/3 h-full flex flex-col justify-center order-1 lg:order-2">
                        <ProjectCard project={selectedProject} />
                    </div>
                </div>

            </Section>
        </div>
    );
}