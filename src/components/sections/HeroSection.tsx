'use client';

import React from 'react';
import Link from 'next/link';
import Section from './Section';
import BackgroundParticles from "@/components/effects/BackgroundParticles";
import AnimatedText from "@/components/effects/AnimatedText";
import TypingEffect from "@/components/effects/TypingEffect";
import Subtitle from "@/components/effects/Subtitle";
import { ActivityWidget } from "@/components/ui/ActivityWidget";

interface HeroSectionProps {
    onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
    return (
        <section id="1" className="relative min-h-[100dvh] lg:h-screen lg:snap-start lg:shrink-0 w-full flex flex-col">

            <div className="absolute inset-0 pointer-events-none z-0">
                <BackgroundParticles />
            </div>

            <div className="fixed bottom-6 left-4 z-50 md:absolute md:top-8 md:right-8 md:bottom-auto md:left-auto">
                <div className="origin-bottom-left md:origin-top-right transition-transform">
                    <ActivityWidget/>
                </div>
            </div>

            <Section className="h-full w-full flex-grow flex items-center justify-center" title="" content="">
                <div className="z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">

                    <AnimatedText className="z-10 w-full max-w-lg md:max-w-xl" text="Louis Braidwood"/>

                    <div
                        className="flex justify-center items-center text-slate-300 text-xl sm:text-3xl md:text-5xl mt-6 font-bold leading-tight">
                        <span className="mr-3">Your</span>
                        <TypingEffect
                            textArray={['Full Stack', 'Vue', 'React', 'Java', 'Unity']}
                            className="text-indigo-500 py-1 md:py-0"
                        />
                        <span className="ml-3">Developer</span>
                    </div>

                    <div className="mt-4 px-2">
                        <Subtitle subtitle="Passionate about all things game, software and web development"/>
                    </div>

                    <div
                        className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8 w-full sm:w-auto px-6 sm:px-0">
                        <Link
                            href="/CV_Q4_2025_NO_PHONE.pdf"
                            target="_blank"
                            className="select-none inline-flex justify-center items-center py-3 px-8 text-sm md:text-base font-semibold text-center text-white rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95 w-full sm:w-auto"
                        >
                            My CV
                        </Link>

                        <button
                            onClick={onContactClick}
                            className="select-none inline-flex justify-center items-center py-3 px-8 text-sm md:text-base font-semibold text-center text-white rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-700/50 active:scale-95 w-full sm:w-auto"
                        >
                            Contact
                        </button>
                    </div>
                </div>
            </Section>
        </section>
    );
};