'use client';

import { useState, useEffect } from 'react';

interface TypingEffectProps {
    textArray: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseTime?: number;
    className?: string;
}

export default function TypingEffect({
                                         textArray,
                                         typingSpeed = 100,
                                         deletingSpeed = 50,
                                         pauseTime = 1000,
                                         className = "",
                                     }: TypingEffectProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeedState, setTypingSpeedState] = useState(typingSpeed);

    useEffect(() => {

        const handleTyping = () => {
            const i = loopNum % textArray.length;
            const fullText = textArray[i];

            setDisplayedText(
                isDeleting
                    ? fullText.substring(0, displayedText.length - 1)
                    : fullText.substring(0, displayedText.length + 1)
            );

            setTypingSpeedState(isDeleting ? deletingSpeed : typingSpeed);

            if (!isDeleting && displayedText === fullText) {
                setTypingSpeedState(pauseTime);
                setIsDeleting(true);
            } else if (isDeleting && displayedText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                setTypingSpeedState(500);
            }
        };


        const timer: NodeJS.Timeout = setTimeout(handleTyping, typingSpeedState);

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, loopNum, textArray, typingSpeed, deletingSpeed, pauseTime, typingSpeedState]);

    return (
        <span className={`inline-flex items-center h-[4rem] ${className}`}>
      <span>{displayedText}</span>
      <span className="cursor ml-2 w-1 md:w-2 h-[2rem] md:h-[3rem] bg-indigo-500 rounded animate-pulse inline-block align-middle" />
    </span>
    );
}