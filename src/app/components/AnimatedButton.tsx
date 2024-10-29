import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import './AnimatedButton.css'

const projects = [
    { id: 1, imgURLs: ['/assets/RecordViewer1.png'], title: 'Patient Record Viewer', content: '<br/> The record viewer app is a tool designed with ' +
            'health and social care professionals in mind, giving them access to a patient\'s records in a way not previously available.' +
            '<br/> <br/> My role on this project is as a full-stack developer (majority front-end) working with Java, MySQL, Vue.js with PrimeVue and Typescript. ' +
            '<br/> <br/> This has been the first project in my role that has been \'my responsibility\'. It is part of my role developing this product to pass on work ' +
            'and make sure things are getting done. I have also been demoing the product both internally and externally and writing the documentation' +
            ' which has given me experience selling both myself and a product, and this has gone down well throughout the company so far. ' +
            '<br/> <br/> Due to the nature of the Record Viewer tool I am unable to share screenshots on my personal portfolio. I can however link ' +
            'to the wiki: <a class="text-indigo-600 hover:text-indigo-800" href="https://wiki.voror.co.uk/index.php?title=Record_Viewer" target="_blank">https://wiki.voror.co.uk/index.php?title=Record_Viewer</a>'},
    { id: 2, imgURLs: ['/assets/PortobelloDriverTraining1.png', '/assets/PortobelloDriverTraining2.png', '/assets/PortobelloDriverTraining3.png'] },
    { id: 3, imgURLs: ['/assets/LostBonds1.png', '/assets/LostBonds2.png', '/assets/LostBonds3.png'] },
    { id: 4, imgURLs: ['/assets/SurvivalGame1.png', '/assets/SurvivalGame2.png', '/assets/SurvivalGame3.png']},
    { id: 5, imgURLs: ['/assets/ProceduralGenerator.png']},
    { id: 6, imgURLs: ['/assets/DrawDojo1.png', '/assets/DrawDojo2.png', '/assets/DrawDojo3.png',
            '/assets/DrawDojo4.png', '/assets/DrawDojo5.png', '/assets/DrawDojo6.png']},

];
interface AnimatedButtonProps {
    onExpanded?: (expanded: boolean) => void;
    label: string;
    className: string;
    selectedProject: number;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ className, selectedProject, onExpanded}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [expanded, setExpanded] = useState(false);

    function animateDiv(){
        if(isHovered) {
            if(expanded) {
                if(window.innerWidth < 1024)
                    return { scaleY: 0.98, translateY: -8 }
                else
                    return { scaleX: 0.98, translateX: -8 }
            }
            if(window.innerWidth < 1024)
                return { scaleY: 1.03, translateY: 8 }
            else
                return { scaleX: 1.03, translateX: 8 }
        } else {
            if(window.innerWidth < 1024)
                return { y: 0, scaleY: 1}
            else
                return { x: 0, scaleX: 1}
        }
    }

    useEffect(() => {
        // Trigger the callback when `expanded` changes
        if (onExpanded) {
            onExpanded(expanded);
        }
    }, [expanded, onExpanded]);

    function tappedDiv(){
        if(expanded) {
            if(window.innerWidth < 1024)
                return {scaleY: 0.96, translateY: -12}
            else
                return {scaleX: 0.96, translateX: -12}
        } else {
            if(window.innerWidth < 1024)
                return {scaleY: 1.06, translateY: 12};
            else
                return {scaleX: 1.06, translateX: 12};
        }
    }

    return (
        <div className={`flex w-screen lg:h-[100vh] lg:mt-0 align-middle items-center justify-center ${expanded ? 'h-[90vh] w-[85vw] lg:w-[80vw]' : 'h-[40vh] lg:w-[50vw]'}`}>
            <motion.div
                className={`flex flex-col h-[100%] w-[100%] justify-center ${className}`}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                animate={animateDiv()}
                whileTap={tappedDiv()}
            >

                <div className={`w-[100%] h-[100%] text-white overflow-hidden flex flex-row items-center justify-center `}>
                    <button className={`bg-blue-400 h-[90%] lg:h-[80%] flex-col flex items-center justify-center ${expanded ? 'lg:justify-start' : 'lg:justify-center'} py-2 lg:flex-row lg:px-8 mb-8 text-white font-semibold rounded-3xl overflow-hidden
                    ${expanded ? 'aspect-auto w-[100%]' : 'aspect-square'}`}>
                        <div
                            onClick={() => setExpanded(!expanded)}
                            className={` ${expanded ? 'w-[60%] lg:w-[50%]' : 'lg:w-full flex flex-row justify-center items-center align-middle'}`}>
                            <img className={`justify-self-center w-[80%]`} src={`${projects[selectedProject-1].imgURLs[0]}`}/>
                        </div>
                        <div className={`cursor-default ${expanded ? 'flex flex-col lg:w-[50%] h-full p-4' : 'hidden'}`}>
                            <h1 className={`text-3xl font-light`}>{projects[selectedProject-1].title}</h1>
                            <p className={`text-sm md:text-base lg:text-lg text-left font-light`} dangerouslySetInnerHTML={{ __html: projects[selectedProject - 1].content}}></p>
                        </div>
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AnimatedButton;