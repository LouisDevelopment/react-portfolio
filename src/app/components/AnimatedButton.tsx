import React, {useState} from 'react';
import { motion } from 'framer-motion';
import './AnimatedButton.css'

const projects = [
    { id: 1, imgURLs: ['/assets/RecordViewer1.png', '/assets/RecordViewer2.png', '/assets/RecordViewer3.png', '/assets/RecordViewer4.png']},
    { id: 2, imgURLs: ['/assets/PortobelloDriverTraining1.png', '/assets/PortobelloDriverTraining2.png', '/assets/PortobelloDriverTraining3.png'] },
    { id: 3, imgURLs: ['/assets/LostBonds1.png', '/assets/LostBonds2.png', '/assets/LostBonds3.png'] },
    { id: 4, imgURLs: ['/assets/SurvivalGame1.png', '/assets/SurvivalGame2.png', '/assets/SurvivalGame3.png']},
    { id: 5, imgURLs: ['/assets/ProceduralGenerator.png']},
    { id: 6, imgURLs: ['/assets/DrawDojo1.png', '/assets/DrawDojo2.png', '/assets/DrawDojo3.png',
            '/assets/DrawDojo4.png', '/assets/DrawDojo5.png', '/assets/DrawDojo6.png']},

];

const AnimatedButton: React.FC<{ label: string, className: string, selectedProject: number}> = ({ label, className, selectedProject }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="flex w-screen h-[50vh] lg:h-[100vh] lg:mt-0 lg:w-[50vw] justify-center">
            <motion.div
                className={`flex flex-col h-[100%] w-[100%] rounded-[22%] justify-end lg:justify-center ${className}`}
                onHoverStart={() => setIsHovered(true)}
                onClick={() => setExpanded(!expanded)}
                onHoverEnd={() => setIsHovered(false)}
                animate={isHovered ? { y: -32, scaleY: 1.03 } : { y: 0, scaleY: 1}}

                whileTap={{ scale: 0.95 }}
            >

                <div className="w-[100%] h-[100%] text-white overflow-hidden flex lg:items-center justify-center">
                    <button className={`bg-violet-400  mb-8 aspect-square text-white font-semibold rounded-[22%] overflow-hidden
                    ${expanded ? 'aspect-auto h-[80vh] w-[100%]' : 'aspect-square w-[80%]'}`}>
                        <img className="shadow-violet-500  shadow-lg rounded-xl" src={`${projects[selectedProject-1].imgURLs[0]}`}/>
                        {label}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AnimatedButton;