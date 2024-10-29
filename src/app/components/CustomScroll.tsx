import React, { useState, useEffect, useRef } from 'react';
import Navigation from "@/app/components/Navigation";

const sections = ['1', '2', '3', '4'];

const CustomScroll: React.FC = () => {
    const [activeId, setActiveId] = useState<string>('1');
    const isScrolling = useRef(false);
    const [isAboveXs, setIsAboveXs] = useState(true);

    const handleWheel = (event: WheelEvent) => {
        if (event.ctrlKey) {
            return;
        }

        if (isScrolling.current) return; // Prevent multiple calls while scrolling
        if(!isAboveXs) return;
        event.preventDefault();
        isScrolling.current = true;

        if (event.deltaY > 0) {
            // Scroll down
            const nextIndex = (parseInt(activeId) % sections.length);
            const element = document.getElementById(sections[nextIndex]);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Scroll up
            let previousIndex = parseInt(activeId) - 2;
            if (previousIndex < 0) previousIndex = sections.length - 1;
            const element = document.getElementById(sections[previousIndex]);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };


    useEffect(() => {
        const handleResize = () => {
            setIsAboveXs(window.innerWidth >= 768);
        };
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        setActiveId(sectionId);
                        isScrolling.current = false; // Allow new scroll events once target is reached
                    }
                });
            },
            { threshold: 0.6 } // Trigger when 60% of the section is visible
        );

        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        window.addEventListener('resize', handleResize);
        window.addEventListener('wheel', handleWheel, { passive: false });

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('wheel', handleWheel);
            observer.disconnect();
        }
    }, [activeId, handleWheel]);

    return (
        <>
            {isAboveXs ? (
                <div>
                    <Navigation activeId={activeId} setActiveId={setActiveId}/>
                </div>
            ) : null}
        </>
    );
};

export default CustomScroll;