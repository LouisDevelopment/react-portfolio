'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaTerminal, FaGraduationCap, FaServer, FaChartLine, FaDraftingCompass } from 'react-icons/fa';

type TimelineEvent = {
    id: number;
    title: string;
    date: string;
    description: string;
    icon: React.ReactNode;
};

const timelineData: TimelineEvent[] = [
    {
        id: 1,
        title: "The Foundation",
        date: "2014 - 2019",
        description: "Began programming and built custom game engines in Java/LWJGL & C++. Learned fundamentals such as memory management.",
        icon: <FaTerminal />,
    },
    {
        id: 2,
        title: "CS Degree",
        date: "2019 - 2023",
        description: "Completed a BSc (Honours) at Heriot-Watt with a focus on algorithms, procedural generation, cellular automata and general software engineering.",
        icon: <FaGraduationCap />,
    },
    {
        id: 3,
        title: "Enterprise Scale",
        date: "2023",
        description: "Hired at Voror Health Technologies. Began working with Java/RabbitMQ pipelines for 38 million patient records.",
        icon: <FaServer />,
    },
    {
        id: 4,
        title: "Product Lead",
        date: "2024",
        description: "Led 'Record Viewer' greenfield development. Built efficient workflows estimated to save the healthcare sector £10 million / yr.",
        icon: <FaChartLine />,
    },
    {
        id: 5,
        title: "Architect",
        date: "Present",
        description: "Leading a platform-wide upgrade from legacy Angular 4 and 8 projects to Vue 3 & TypeScript and integrating a comprehensive e2e testing solution via Cypress.",
        icon: <FaDraftingCompass />,
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};

export default function CareerTimeline() {
    return (
        <div className="relative w-full h-full flex flex-col lg:justify-center">

            {/* MOBILE (VERTICAL) */}
            <div className="lg:hidden w-full relative flex flex-col items-center pl-4">
                <div className="absolute left-4 top-0 bottom-0 w-1 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="w-full h-full bg-gradient-to-b from-indigo-500 to-purple-500"
                    />
                </div>

                <motion.ul
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="w-full pl-10 py-4"
                >
                    {timelineData.map((event) => (
                        <motion.li key={event.id} variants={itemVariants} className="relative my-8 first:mt-2">
                            <div className="absolute top-1/2 -translate-y-1/2 -left-[54px] flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 shadow-lg ring-4 ring-slate-900 z-10">
                                <span className="text-white text-xs">{event.icon}</span>
                            </div>
                            <div className="absolute top-1/2 -translate-y-1/2 -left-[26px] w-[26px] h-[2px] bg-indigo-500/50"></div>
                            <div className="m-0 bg-slate-800 p-4 rounded-lg border border-slate-700/50 shadow-md relative">
                                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">{event.date}</span>
                                <h3 className="text-lg font-bold text-slate-100 mb-2">{event.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">{event.description}</p>
                            </div>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>

            {/* DESKTOP (HORIZONTAL) */}
            <div className="hidden lg:flex w-full items-center justify-center px-4">

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="
                        relative w-full
                        lg:max-w-7xl
                        xl:max-w-[90rem]
                        lg:h-[450px]
                        xl:h-[550px]
                        2xl:h-[600px]
                        grid grid-cols-5
                        gap-4
                    "
                >
                    <div className="absolute mt-50 top-1/2 left-0 right-0 h-[2px] bg-slate-700 -translate-y-1/2 rounded-full z-0">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                        />
                    </div>

                    {timelineData.map((event, index) => {
                        const isTop = index % 2 === 0;

                        return (
                            <motion.div
                                key={event.id}
                                variants={itemVariants}
                                className="relative flex flex-col w-full h-full z-10"
                            >
                                <div className={`h-1/2 w-full flex flex-col ${isTop ? 'justify-end pb-6' : 'justify-end'} items-center`}>
                                    {isTop && (
                                        <>
                                            <div className="
                                                w-[140%] min-w-[260px] max-w-[320px]
                                                p-4 xl:p-6
                                                rounded-xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-sm
                                                hover:border-indigo-500/50 transition-colors shadow-lg hover:bg-slate-800
                                                group cursor-default flex flex-col justify-center text-center
                                            ">
                                                <span className="text-[10px] xl:text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                                                    {event.date}
                                                </span>
                                                <h3 className="text-sm xl:text-lg font-bold text-slate-100 mb-2 leading-tight">
                                                    {event.title}
                                                </h3>
                                                <p className="text-xs xl:text-sm text-slate-400 leading-relaxed">
                                                    {event.description}
                                                </p>
                                            </div>

                                            <div className="w-[2px] h-6 bg-slate-700 group-hover:bg-indigo-500 transition-colors mt-[-1px]"></div>
                                        </>
                                    )}
                                </div>

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                    <div className="
                                        w-10 h-10 xl:w-14 xl:h-14
                                        rounded-full bg-slate-900 border-2 border-indigo-500
                                        shadow-[0_0_15px_rgba(99,102,241,0.4)]
                                        flex items-center justify-center
                                        transition-all duration-300
                                    ">
                                        <span className="text-indigo-400 text-sm xl:text-xl">{event.icon}</span>
                                    </div>
                                </div>

                                <div className={`h-1/2 w-full flex flex-col ${!isTop ? 'justify-start pt-6' : 'justify-start'} items-center`}>
                                    {!isTop && (
                                        <>
                                            <div className="w-[2px] h-6 bg-slate-700 group-hover:bg-indigo-500 transition-colors mb-[-1px]"></div>

                                            <div className="
                                                w-[140%] min-w-[260px] max-w-[320px]
                                                p-4 xl:p-6
                                                rounded-xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-sm
                                                hover:border-indigo-500/50 transition-colors shadow-lg hover:bg-slate-800
                                                group cursor-default flex flex-col justify-center text-center
                                            ">
                                                <span className="text-[10px] xl:text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                                                    {event.date}
                                                </span>
                                                <h3 className="text-sm xl:text-lg font-bold text-slate-100 mb-2 leading-tight">
                                                    {event.title}
                                                </h3>
                                                <p className="text-xs xl:text-sm text-slate-400 leading-relaxed">
                                                    {event.description}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}