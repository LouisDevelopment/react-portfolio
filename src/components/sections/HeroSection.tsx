'use client';

import React from 'react';
import Link from 'next/link';
import Section from './Section';
import BackgroundParticles from "@/components/effects/BackgroundParticles";
import AnimatedText from "@/components/effects/AnimatedText";
import TypingEffect from "@/components/effects/TypingEffect";
import Subtitle from "@/components/effects/Subtitle";

interface HeroSectionProps {
    onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
    return (
        <section id="1" className="relative min-h-screen lg:h-screen lg:snap-start lg:shrink-0 w-full">
            <Section className="h-full w-full" title="" content="">
                <div className="bg-center h-full flex flex-col justify-center items-center relative w-full">
                    <div className="absolute inset-0 pointer-events-none">
                        <BackgroundParticles />
                    </div>
                    <div className="z-10 w-full px-4 pt-20 lg:pt-0 text-center pointer-events-auto">
                        <AnimatedText text="Louis Braidwood" />
                        <div className="flex justify-center items-center text-slate-300 text-2xl md:text-5xl mt-4 font-bold">
                            <span className="mr-3">Your</span>
                            <TypingEffect
                                textArray={['Full Stack', 'Vue', 'React', 'Java', 'Unity']}
                                className="text-indigo-500"
                            />
                            <span className="ml-3">Developer</span>
                        </div>
                        <Subtitle subtitle="Passionate about all things game, software and web development" />
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 mt-8">
                            <Link
                                href="/CV_Q4_2025_NO_PHONE.pdf"
                                target="_blank"
                                className="select-none inline-flex justify-center items-center py-3 px-8 text-base font-semibold text-center text-white rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95"
                            >
                                My CV
                            </Link>

                            <button
                                onClick={onContactClick}
                                className="select-none inline-flex justify-center items-center py-3 px-8 text-base font-semibold text-center text-white rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-700/50 active:scale-95"
                            >
                                Contact
                            </button>
                        </div>
                    </div>
                </div>
            </Section>
        </section>
    );
};
