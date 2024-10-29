import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import './AnimatedButton.css'

const projects = [
    {
        id: 1,
        imgURLs: ['/assets/RecordViewer1.png'],
        title: 'Patient Record Viewer',
        content: '<br/> The record viewer app is a tool in development at my full-time Software Developer job at Voror Health Technologies. With ' +
            'health and social care professionals in mind, the record viewer gives medical professionals insight into a patient\'s records in a way not previously available.' +
            '<br/> <br/> My role on this project is as a full-stack developer (majority front-end) working with Java, MySQL, Vue.js with PrimeVue V3 and Typescript. ' +
            '<br/> <br/> This has been the first project in my role that has been \'my responsibility\'. It is part of my role developing this product to pass on work ' +
            'and make sure things are getting done. I have also been demoing the product both internally and externally and writing the documentation' +
            ' which has given me experience selling both myself and a product, and this has gone down well throughout the company so far. ' +
            '<br/> <br/> Due to the nature of the Record Viewer tool I am unable to share screenshots on my personal portfolio. I can however link ' +
            'to the wiki: ',
        link: 'https://wiki.voror.co.uk/index.php?title=Record_Viewer'
    },
    {
        id: 2,
        title: 'Portobello Driver Training',
        content: '<br/> I recently began my driving journey and got very lucky with a great instructor. On one of our first lessons we were talking about' +
            'my work and the idea of him commissioning a website from me came up. We spoke about the sort of things he\'d want on the website, and this is ' +
            'the result. <br/> <br/> I opted to develop this website with Vue.js and PrimeVue V4, as I had been using V3 for the Record Viewer tool at work,' +
            ' and wanted to get familiar with the latest additions. This was a chance for me to do some SEO and get an entry into freelance work.' +
            '<br/> <br/> It is a simple, one-page website with Google Places API integration to pull positive reviews directly from Google Maps. You ' +
            'can access the website at:', link: 'https://www.portobellodrivertraining.com',
        imgURLs: ['/assets/PortobelloDriverTraining1.png', '/assets/PortobelloDriverTraining2.png', '/assets/PortobelloDriverTraining3.png'] },
    { id: 3, title: 'Lost Bonds', content: '<br/> I began development of Lost Bonds in February 2024, and I intend for it to be my first Steam game release' +
            '<br/> <br/> Lost Bonds is a \'play-it-in-a-day\' cozy adventure game built in Unity. You, the player, wash up on an island with no memory of how you got there.' +
            ' While on the island you discover that you\'re not the first this has happened to, but you will be the last... You\'ll have to work with the people and, more importantly, the creatures on the island' +
            ' to get everyone off the island safely.' +
            '<br/> <br/> I\'m currently on a hiatus from developing Lost Bonds, but I am planning to go back to it and release it in 2025.' +
            '<br/> <br/> When I was more actively working on Lost Bonds, I was releasing some YouTube shorts to build some interest in it. You can view those here (Sorry in advance for my \'YouTuber voice\'):',
            link: 'https://www.youtube.com/@LouisPog', imgURLs: ['/assets/LostBonds1.png', '/assets/LostBonds2.png', '/assets/LostBonds3.png'] },
    { id: 4, title: 'Survival Game Concept', content: '', imgURLs: ['/assets/SurvivalGame1.png', '/assets/SurvivalGame2.png', '/assets/SurvivalGame3.png']},
    { id: 5, title: 'Procedural Generator', content: '', imgURLs: ['/assets/ProceduralGenerator.png']},
    { id: 6, title: 'Draw Dojo', content: '', imgURLs: ['/assets/DrawDojo1.png', '/assets/DrawDojo2.png', '/assets/DrawDojo3.png',
            '/assets/DrawDojo4.png', '/assets/DrawDojo5.png', '/assets/DrawDojo6.png']},

];
interface AnimatedButtonProps {
    onExpanded?: (expanded: boolean) => void;
    label: string;
    className: string;
    selectedProject: number | 1;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ className, selectedProject, onExpanded}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [windowWidth, setWindowWidth] = useState<number>(1920);

    useEffect(() => {
        setWindowWidth(window.innerWidth)
        // Update window width on resize
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        // Trigger the callback when `expanded` changes
        if (onExpanded) {
            onExpanded(expanded);
        }
        return () => window.removeEventListener("resize", handleResize);
    }, [expanded, onExpanded]);

    const animateDiv = () => {
        if(isHovered) {
            if(expanded) {
                if(windowWidth < 1024)
                    return { scaleY: 0.98, translateY: -8 }
                else
                    return { scaleX: 0.98, translateX: -8 }
            }
            if(windowWidth < 1024)
                return { scaleY: 1.03, translateY: 8 }
            else
                return { scaleX: 1.03, translateX: 8 }
        } else {
            if(windowWidth < 1024)
                return { y: 0, scaleY: 1}
            else
                return { x: 0, scaleX: 1}
        }
    }

    const tappedDiv = () => {
        if(expanded) {
            if(windowWidth < 1024)
                return {scaleY: 0.96, translateY: -12}
            else
                return {scaleX: 0.96, translateX: -12}
        } else {
            if(windowWidth < 1024)
                return {scaleY: 1.06, translateY: 12};
            else
                return {scaleX: 1.06, translateX: 12};
        }
    }

    return (
        <div className={`flex w-screen lg:h-[100vh] lg:mt-0 align-middle items-center justify-center ${expanded ? 'min-h-[90vh] w-[85vw] lg:w-[80vw]' : 'h-[40vh] lg:w-[50vw]'}`}>
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
                            <p className={`text-sm md:text-base lg:text-lg text-left font-light`}>{projects[selectedProject - 1].content.split('<br/>').map((line, index) => (
                                <span key={index}>
    {line}
                                    <br/>
  </span>
                            ))}
                            <a className="text-indigo-600 hover:text-indigo-800" href={projects[selectedProject-1].link} target={`_blank`}>{projects[selectedProject-1].link}</a></p>
                        </div>
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AnimatedButton;