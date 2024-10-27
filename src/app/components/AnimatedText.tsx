import React from 'react';
import './AnimatedText.css';

interface AnimatedTextProps {
    text: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
    return (
        <div className={`text-center items-center flex justify-center`}>
            <svg
                viewBox="0 0 500 100"
                className="w-4/5 max-w-lg b text-center items-center"
                style={{backgroundColor: "transparent"}} // Ensure transparency
            >
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="animated-text"
                >
                    {text}
                </text>
            </svg>
        </div>
    );
};

export default AnimatedText;