import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import './AnimatedButton.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const projects = [
    {
        id: 1,
        imgURLs: ['/assets/RecordViewer1.png'],
        title: 'Patient Record Viewer',
        content: '<br/> The Record Viewer is a tool in development at my full-time Software Developer job at Voror Health Technologies. With ' +
            'health and social care professionals in mind, the record viewer gives medical professionals insight into a patient\'s records in a way not previously available.' +
            '<br/> <br/> My role on this project is as a full-stack developer (majority front-end) working with Java, MySQL, Vue.js with PrimeVue V3 and Typescript. ' +
            '<br/> <br/> This has been the first project in my role that has been \'my responsibility\'. Working on this product has given me experience identifying ' +
            ' requirements and making design choices on behalf of the team. I have also been demoing the product both internally and externally and writing the documentation' +
            ' which has given me experience selling both myself and a product, and this has gone down well throughout the company so far. ' +
            '<br/> <br/> Due to the nature of the Record Viewer tool I am unable to share screenshots on my personal portfolio. I can however link ' +
            'to the wiki: ',
        link: 'https://wiki.voror.co.uk/index.php?title=Record_Viewer'
    },
    {
        id: 2,
        title: 'Portobello Driver Training',
        content: '<br/> I recently began my driving journey and got very lucky with a great instructor. On one of our first lessons we were talking about' +
            'my work, and the idea of him commissioning a website from me came up. We spoke about the sort of things he\'d want on the website, and this is ' +
            'the result. <br/> <br/> I opted to develop this website with Vue.js and PrimeVue V4, as I had been using V3 for the Record Viewer tool at work,' +
            ' and wanted to get familiar with the latest additions. This was a chance for me to do some SEO and get an entry into freelance work.' +
            '<br/> <br/> It is a simple, one-page website with Google Places API integration to pull positive reviews directly from Google Maps. You ' +
            'can access the website at:', link: 'https://www.portobellodrivertraining.com',
        imgURLs: ['/assets/PortobelloDriverTraining1.png', '/assets/PortobelloDriverTraining2.png', '/assets/PortobelloDriverTraining3.png'] },
    { id: 3, title: 'Lost Bonds', content: '<br/> I began development of Lost Bonds in February 2024, and I intend for it to be my first Steam game release.' +
            '<br/> <br/> Lost Bonds is a \'play-it-in-a-day\' cozy adventure game built in Unity. You, the player, wash up on an island with no memory of how you got there.' +
            ' While on the island you discover that you\'re not the first to have washed up here, but you will be the last... You\'ll have to work with the people and, more importantly, the creatures on the island' +
            ' to get everyone home.' +
            '<br/> <br/> I\'m currently on a hiatus from developing Lost Bonds, but I am planning to go back to it and release it in 2025.',
            imgURLs: ['/assets/LostBonds1.png', '/assets/LostBonds2.png', '/assets/LostBonds3.png'] },
    { id: 4, title: 'Survival Game Concept', content: '<br/> This survival game concept was originally designed soley in Java but later ported to Java+LWJGL as I got more familiar with graphics and shaders.' +
            '<br/> <br/> I started this project when I was 16 and originally thought I would release it, but as scope increased I decided to stop and learn from the experience instead.' +
            ' The game was 2D with different biomes, cave generation, crafting, mining, smelting and building. It was my first real attempt and making something from scratch and I hope to one day complete what this game was supposed to be.' , imgURLs: ['/assets/SurvivalGame1.png', '/assets/SurvivalGame2.png', '/assets/SurvivalGame3.png']},
    { id: 5, title: 'Procedural Heightmap Generator', content: '<br/> This procedural heightmap generator tool was developed with game developers in mind. ' +
            'Built in Java and taking advantage of a simplex noise algorithm, the user sets the configuration and can update it live ' +
            'until they have their desired result. <br/> <br/> This project was inspired by something I build in Secondary School which ' +
            'I used for personal projects at the time. The original version was slow, lacked polish and all customization was done through changing variables in the code, so' +
            ' this version improved on those issues.' +
            '<br/> <br/> It can be downloaded in jar form from itch.io: ', link:'https://louis-braidwood.itch.io/simplex-noise', imgURLs: ['/assets/ProceduralGenerator.png']},
    { id: 6, title: 'Draw Dojo', content: 'I was part of the team behind Draw Dojo, a social media platform similar to twitter, but rather ' +
            'than typing your posts you draw them. The project is unfortunately no longer available, but was a good introduction to React ' +
            'and TypeScript. <br/> <br/> It had a drawing canvas built in Typescript with different colours, brushes and tools, as well as ' +
            'a live-updating feed on which a user could leave likes and comments. The feed would be continually populated for the user as new' +
            ' posts came through. <br/> <br/> Another unique quality was the mash-up feature. This allowed users to take another user\'s drawing' +
            ' and add to it and then post it themselves, tagging the original poster. ' +
            'Other features included: collaborative canvases, customizable profile pages and a robust log-in page.',
            link:'https://github.com/artcollab/ui/tree/master', imgURLs: ['/assets/DrawDojo1.png', '/assets/DrawDojo2.png', '/assets/DrawDojo3.png',
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

    const [carouselKey, setCarouselKey] = useState(0); // Key to force re-render

    useEffect(() => {
        setCarouselKey((prevKey) => prevKey + 1); // Increment key to force reload on selectedProject change
    }, [selectedProject]);

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
                    <div
                        className={`bg-blue-400 h-[90%] lg:h-[80%] flex-col flex items-center justify-center ${expanded ? 'lg:justify-start' : 'lg:justify-center'} lg:flex-row mb-8 lg:mb-0 text-white font-semibold rounded-3xl overflow-hidden
                    ${expanded ? 'aspect-auto w-[100%]' : 'aspect-square'}`}>
                        <div onClick={() => setExpanded(!expanded)}
                            className={`cursor-pointer ${expanded ? 'h-full w-[60%] lg:w-[50%]' : 'h-full lg:w-full '} flex flex-row justify-center items-center align-middle`}>
                            <Carousel
                                key={carouselKey} // Unique key for re-rendering
                                className="max-w-full max-h-full flex flex-col align-middle justify-center items-center"
                                autoPlay
                                infiniteLoop={true}
                                interval={3000}
                                showIndicators={false}
                                showArrows={false}
                                showThumbs={false}
                            >
                                {projects[selectedProject - 1].imgURLs.map((item) => (
                                    <div key={item}>
                                        <img src={item} />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div className={`bg-blue-500 cursor-default ${expanded ? 'flex justify-center flex-col lg:w-[50%] h-full p-4' : 'hidden'}`}>
                            <div className={`flex flex-col justify-center items-center align-middle`}>
                                <h1 className={`text-3xl pb-4 font-light`}>{projects[selectedProject-1].title}</h1>

                                <div>
                                    <p className={`text-sm lg:text-base text-left font-light`}>{projects[selectedProject - 1].content.split('<br/>').map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br/>
                                    </span>
                                ))}
                                <a className="text-violet-300 hover:text-indigo-100" href={projects[selectedProject-1].link} target={`_blank`}>{projects[selectedProject-1].link}</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AnimatedButton;