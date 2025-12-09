'use client';

import React, { useState, useEffect } from 'react';
import Navigation from "./Navigation";

const sections = ['1', '2', '3', '4'];

const ScrollManager: React.FC = () => {
    const [activeId, setActiveId] = useState<string>('1');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { threshold: 0.2 }
        );

        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <Navigation activeId={activeId} onNavigate={scrollToSection} />
    );
};

export default ScrollManager;