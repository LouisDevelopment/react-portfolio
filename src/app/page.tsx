'use client';

import React, { useRef } from "react";
import {AboutSection} from "@/components/sections/AboutSection";
import {HeroSection} from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import {Card} from "@/components/ui/Card";
import ContactForm from "@/components/ui/ContactForm";
import Section from "@/components/sections/Section";
import CustomScroll from "@/components/ui/CustomScroll";

export default function Home() {
  const contactRef = useRef<HTMLElement | null>(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
      <main className="w-full bg-gray-900 h-screen overflow-y-scroll overflow-x-hidden lg:snap-y lg:snap-mandatory scroll-smooth">

        {/* 1. HERO */}
        <HeroSection onContactClick={scrollToContact} />

        {/* 2. ABOUT */}
        <AboutSection />

        {/* 3. PROJECTS */}
        <ProjectsSection />

        {/* 4. CONTACT */}
        <section
            id="4"
            ref={contactRef}
            className="min-h-screen lg:h-screen lg:snap-start lg:shrink-0 w-full flex items-center justify-center bg-slate-900 border-t border-slate-800"
        >
          <Section className="w-full" title="" content="">
            <div className="w-full flex items-center justify-center py-20 lg:py-0">
              <Card className="border border-slate-700 max-w-5xl" title="" footer="">
                <ContactForm />
              </Card>
            </div>
          </Section>
        </section>

        <CustomScroll />
      </main>
  );
}
