import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { FiMinus } from 'react-icons/fi';

interface ExpandableTextAreaProps {
    text: string;
    expandDirection: 'left' | 'right'; // Allows choice of expansion direction
    isExpanded: boolean;
    onExpand: () => void;
    className?: string;
}

const ExpandableTextArea: React.FC<ExpandableTextAreaProps> = ({ text, expandDirection,
                                                                   isExpanded,
                                                                   onExpand, className}) => {

    // Toggle expansion state

    // Animation variants for the text (fade-in effect after expansion)
    const textVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { delay: 0.55 }, // Delay to match expansion animation
        },
    };

    // Animation variants for expanding from the origin point
    const containerVariants = {
        initial: {
            width: '50px',
            height: '50px', // Collapsed size
            minHeight:'50px',
            borderRadius: '50%',
        },
        expanded: {
            width: '300px',
            height: '200px',
            borderRadius: '20px',
        },
    };

    return (
        <motion.div
            onClick={onExpand}
            initial="initial"
            animate={isExpanded ? 'expanded' : 'initial'}
            variants={containerVariants}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className={`relative flex flex-col items-center justify-center bg-slate-600 cursor-pointer overflow-hidden ${
                expandDirection === 'right' ? 'origin-top-left' : 'origin-top-right'
            } ${className}`}
            style={{
                transformOrigin: expandDirection === 'right' ? 'top left' : 'top right',
            }}
        >
            {/* Positioned + icon in the corner */}
            <div className="absolute top-3.5 left-3.5">
                <FiPlus className={`text-white text-2xl ${isExpanded ? 'hidden' : ''}`}/>
                <FiMinus className={`text-white text-2xl ${isExpanded ? '' : 'hidden'}`}/>
            </div>

            {/* Content to display when expanded */}
            {isExpanded && (

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="p-4 text-white text-left w-full mt-8">
                    <p>{text}</p>
                </motion.div>
            )}
        </motion.div>
    );
};


export default ExpandableTextArea;