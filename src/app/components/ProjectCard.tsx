'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Project } from '@/data/projects';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[80vh] lg:h-[500px]"
                >
                    <div className="w-auto lg:w-1/2 h-64 lg:h-full bg-black relative">
                        <Carousel
                            showThumbs={false}
                            showStatus={false}
                            infiniteLoop
                            autoPlay
                            interval={4000}
                            className="h-full w-full"
                            renderItem={(item) => <div className="h-full flex items-center justify-center bg-slate-950">{item}</div>}
                        >
                            {project.images.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`${project.title} screenshot ${index + 1}`}
                                    className="object-contain max-h-full w-full"
                                />
                            ))}
                        </Carousel>
                    </div>

                    <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col bg-slate-800/50 backdrop-blur-sm overflow-y-auto">
                        <div className="mb-4">
                            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                                {project.type}
                            </span>
                            <h2 className="text-2xl lg:text-3xl font-bold text-white mt-1">
                                {project.title}
                            </h2>
                        </div>

                        <div className="prose prose-invert prose-sm lg:prose-base flex-grow text-slate-300 whitespace-pre-line mb-6">
                            {project.description}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tech.map((t) => (
                                <span key={t} className="px-3 py-1 bg-slate-700 text-slate-200 text-xs rounded-full border border-slate-600">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <div className="mt-auto pt-4 border-t border-slate-700">
                            {project.links.map((link) => (
                                <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                                >
                                    {link.label} <FaExternalLinkAlt className="ml-2 text-xs" />
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}