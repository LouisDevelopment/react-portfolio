import React from 'react';

interface AnimatedTextProps {
    text: string;
    className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text , className = ""}) => {
    return (
        <div className={`text-center items-center flex justify-center ${className}`}>
            <svg
                viewBox="0 0 500 100"
                className="w-full h-auto block text-center items-center bg-transparent"
            >
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="
                        fill-transparent
                        stroke-white
                        stroke-2
                        [stroke-dasharray:2000]
                        [stroke-dashoffset:2000]
                        font-light
                        mb-4
                        text-6xl
                        leading-none
                        text-white
                        select-none
                        animate-text-reveal
                    "
                >
                    {text}
                </text>
            </svg>
        </div>
    );
};

export default AnimatedText;
