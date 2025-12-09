'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SubtitleProps {
    subtitle: string;
}

const Subtitle: React.FC<SubtitleProps> = ({ subtitle }) => {
    const words = subtitle.split(" ");
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    let globalCharIndex = 0;

    return (
        <div className="flex justify-center flex-wrap gap-x-1.5 gap-y-1 text-center mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48 cursor-default">
            {/* Screen reader text so that it reads as a sentence, not individual letters */}
            <span className="sr-only">{subtitle}</span>

            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="flex" aria-hidden="true">
                    {word.split("").map((letter, letterIndex) => {
                        const currentIndex = globalCharIndex++;

                        const distanceFromHover = hoveredIndex !== null
                            ? Math.abs(hoveredIndex - currentIndex)
                            : null;

                        return (
                            <motion.span
                                key={letterIndex}
                                className="relative inline-block"
                                initial="initial"
                                animate="animate"
                            >
                                <span
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] z-10"
                                    onMouseEnter={() => setHoveredIndex(currentIndex)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                />

                                <motion.span
                                    className="inline-block relative z-0"
                                    variants={{
                                        initial: { opacity: 0, y: 10 },
                                        animate: {
                                            opacity: 1,
                                            y: distanceFromHover === 0 ? -5
                                                : distanceFromHover === 1 ? -3
                                                    : distanceFromHover === 2 ? -1.5
                                                        : 0,
                                            scale: distanceFromHover === 0 ? 1.3
                                                : distanceFromHover === 1 ? 1.15
                                                    : distanceFromHover === 2 ? 1.05
                                                        : 1,
                                            color: distanceFromHover === 0 ? "#ffffff"
                                                : distanceFromHover === 1 ? "#e2e8f0"
                                                    : "#cbd5e1",
                                            transition: {
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 15,
                                                mass: 0.8,
                                            }
                                        }
                                    }}
                                    transition={{
                                        delay: wordIndex * 0.1 + letterIndex * 0.03,
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20
                                    }}
                                >
                                    {letter}
                                </motion.span>
                            </motion.span>
                        );
                    })}
                </span>
            ))}
        </div>
    );
};

export default Subtitle;
