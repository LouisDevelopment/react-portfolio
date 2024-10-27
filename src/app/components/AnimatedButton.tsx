import React, {useState} from 'react';
import { motion } from 'framer-motion';
import './AnimatedButton.css'

const AnimatedButton: React.FC<{ label: string, className: string}> = ({ label, className }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="flex w-screen mt-[25vh] h-[50vh] lg:h-[100vh] lg:mt-0 lg:w-[50vw] justify-center">
            <motion.div
                className={`flex flex-col h-[100%] w-[100%] rounded-[22%] justify-end lg:justify-center ${className}`}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                animate={isHovered ? { y: -32, scaleY: 1.03 } : { y: 0, scaleY: 1}}

                whileTap={{ scale: 0.95 }}
            >

                <div className="w-[100%] h-[100%] text-white font-semibold relative overflow-hidden flex lg:items-center justify-center">
                    <button className="bg-violet-400 w-[80%] mb-8 aspect-square text-white  font-semibold rounded-[22%] relative overflow-hidden">
                        {label}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AnimatedButton;