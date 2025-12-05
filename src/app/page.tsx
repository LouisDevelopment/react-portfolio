'use client';

import React, { useRef } from "react";
import Link from "next/link";

import AnimatedText from './components/AnimatedText';
import Subtitle from './components/Subtitle';
import Section from './components/Section';
import CustomScroll from "@/app/components/CustomScroll";
import ContactForm from "@/app/components/ContactForm";
import BackgroundParticles from "@/app/components/BackgroundParticles";
import TypingEffect from "@/app/components/TypingEffect";
import CareerTimeline from "@/app/components/CareerTimeline";
import ProjectsSection from "@/app/components/ProjectsSection";

export default function Home() {
  const contactRef = useRef<HTMLDivElement | null>(null);

  const scrollToContact = () => {
    const contactSection = document.getElementById('4');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  interface CardProps {
    title: string;
    footer: string;
    children: React.ReactNode;
    className?: string;
  }

  const Card: React.FC<CardProps> = ({ title, footer, children, className = "" }) => {
    return (
        <div className={`shadow w-[100%] m-4 bg-slate-800 rounded-2xl text-slate-200 ${className}`}>
          {title && (
              <div className="pt-2 md:pt-8 md:text-xl">
                <h2 className={`text-center`}>{title}</h2>
              </div>
          )}
          <div className="px-2 md:px-8 py-2 md:py-6">
            {children}
          </div>
          {footer && <div className="px-8 pb-6 text-right">{footer}</div>}
        </div>
    );
  };

  return (
      <div className="w-full bg-gray-900 h-screen overflow-y-scroll overflow-x-hidden lg:snap-y lg:snap-mandatory scroll-smooth">

        {/* 1. LANDING SECTION */}
        <div id="1" className="relative min-h-screen lg:h-screen lg:snap-start lg:shrink-0 w-full">
          <Section className="h-full w-full" title="" content="">
            <section className="bg-center h-full flex flex-col justify-center items-center relative w-full">
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
                      className="select-none inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-full bg-indigo-700 hover:bg-indigo-600 focus:ring-5 focus:ring-indigo-900"
                  >
                    My CV
                  </Link>
                  <button
                      onClick={scrollToContact}
                      className="select-none inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-full border border-white hover:bg-gray-100 focus:ring-5 focus:ring-indigo-500"
                  >
                    Contact
                  </button>
                </div>
              </div>
            </section>
          </Section>
        </div>

        {/* 2. JOURNEY SECTION */}
        <div id="2" className="bg-slate-900 relative z-10 border-t border-slate-800 min-h-screen lg:h-screen lg:snap-start lg:shrink-0 w-full flex flex-col justify-center">
          <Section className="h-full 2xl:mx-4 w-full 2xl:w-[90%]" title="" content="">
            <div className="w-full h-full flex flex-col justify-center items-center">
              <div className="text-center shrink-0">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">My Journey</h2>
                <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
                  From custom game engines to critical healthcare infrastructure.
                </p>
              </div>
              <div className="w-full pl-12 pr-48 2xl:px-0 mt-0 mb-20 lg:mb-0">
                <CareerTimeline />
              </div>
            </div>
          </Section>
        </div>

        {/* 3. PROJECT SECTION */}
        <ProjectsSection />

        {/* 4. CONTACT SECTION */}
        <div id="4" className="min-h-screen lg:h-screen lg:snap-start lg:shrink-0 w-full flex items-center justify-center bg-slate-900 border-t border-slate-800">
          <Section className="w-full" title="" content="">
            <div className="w-full flex items-center justify-center py-20 lg:py-0">
              <Card className="max-w-[812px]" title="Contact" footer="">
                <div ref={contactRef}>
                  <ContactForm />
                </div>
              </Card>
            </div>
          </Section>
        </div>

        <CustomScroll />
      </div>
  );
}