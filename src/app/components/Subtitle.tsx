import React from 'react';
import './Subtitle.css';

interface BouncingSubtitleProps {
    subtitle: string;
}

const Subtitle: React.FC<BouncingSubtitleProps> = ({ subtitle }) => {
    const words = subtitle.split(" ");

    return (
        <div className="flex justify-center flex-wrap text-center mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            {words.map((word, index) => (
                <span
                    key={index}
                    className="bounce-word"
                    style={{ animationDelay: `${index * 0.05}s` }}
                >
          {word}{index < words.length - 1 && " "}
        </span>
            ))}
        </div>
    );
};

export default Subtitle;