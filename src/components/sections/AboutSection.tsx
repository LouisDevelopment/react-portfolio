'use client';

import React from 'react';
import Section from './Section';
import CareerTimeline from "@/components/ui/CareerTimeline";

export const AboutSection: React.FC = () => {
    return (
        <section id="2" className="bg-slate-900 relative z-10 border-t border-slate-800 min-h-screen lg:h-screen lg:snap-start lg:shrink-0 w-full flex flex-col justify-center">
            <Section className="h-full px-16 w-full" title="" content="">
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="text-center shrink-0">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">About Me</h2>
                        <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
                            From custom game engines to critical healthcare infrastructure.
                        </p>
                    </div>
                    <div className="w-full  md:px-12 2xl:px-0 mt-0 mb-20 sm:px-0 lg:mb-0">
                        <CareerTimeline />
                    </div>
                </div>
            </Section>
        </section>
    );
};
