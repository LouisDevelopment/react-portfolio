'use client';

import Link from "next/link";
import emailjs from '@emailjs/browser'
import React, {ReactNode, useEffect, useMemo, useState} from "react";
import Particles, { initParticlesEngine} from "@tsparticles/react";
import {
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"
import { useRef } from 'react';

import AnimatedText from './components/AnimatedText';
import Subtitle from './components/Subtitle';

import Section from './components/Section';
import CustomScroll from "@/app/components/CustomScroll";
import AnimatedButton from "@/app/components/AnimatedButton";
import { motion } from "framer-motion";
import ExpandableTextArea from "@/app/components/MapPinText";

export default function Home() {
  const contactRef = useRef<HTMLDivElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [aboutExpandedId, setAboutExpandedId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number>(1);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  // Function to toggle the expanded state of a component
  const handleAboutExpand = (id: number) => {
    setAboutExpandedId(aboutExpandedId === id ? null : id);
  };

  function initEmail() {
    emailjs.init({
      publicKey: "YozxMjPkPiXwVD_ZJ",
    });
  }

  function sendEmail(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    emailjs.sendForm('service_j2f20ev', 'portfolio_contact_form', e.currentTarget)
        .then(() => {
      console.log("SUCCESS")
    }, (error) => {
      console.log("FAILED...", error)
    })
  }

  const handleProjectLIClick = (id: number) => {
    console.log(id)
    setSelectedProject(id);
  }

  // Handler to disable text selection on mouse down
  const handleMouseDown = () => {
    document.body.style.userSelect = 'none';
  };

  // Handler to re-enable text selection on mouse up
  const handleMouseUp = () => {
    document.body.style.userSelect = 'auto';
  };

  const projects = [
    { id: 1, label: 'Patient Record Viewer', type: "Full-Stack (Full-Time Job)"},
    { id: 2, label: 'Portobello Driver Training', type: "Full-Stack (Independent)" },
    { id: 3, label: 'Lost Bonds (Game)', type: "C#/Unity (Independent)" },
    { id: 4, label: 'Survival Game Concept', type: "Java/LWJGL (Independent)" },
    { id: 5, label: 'Procedural Generator', type: "Java (University)" },
    { id: 6, label: 'Draw Dojo (Discontinued)', type: "Front-End (Team)" },
  ];

  interface CardProps {
    title: string;
    footer: string;
    children: ReactNode;
    className: string;
  }
  const Card: React.FC<CardProps> = ({ title, footer, children, className}) => {
    return (
        <div className={`shadow w-[100%] m-4 bg-slate-800 rounded-2xl text-slate-200 ${className}`}>
          {title && (<div className="pt-2 md:pt-8 md:text-xl">
            <h2 className={`text-center`}>{title}</h2>
          </div>)}
          <div className="px-2 md:px-8 py-2 md:py-6">
            {children}
          </div>
          {footer && <div className="px-8 pb-6 text-right">{footer}</div>}
        </div>
    );
  };

  const handleExpandedChange = (newExpandedValue: boolean) => {
    console.log("Expanded state changed:", newExpandedValue);
    setIsExpanded(newExpandedValue);
  };

  const ParticleEngine = () => {
    const [init, setInit] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {

      initParticlesEngine(async (engine) => {
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadAll(engine);
        //await loadFull(engine);
        if(selectedProject){

        }
        await loadSlim(engine);
        //await loadBasic(engine);
      }).then(() => {
        setInit(true);
      });
    }, []);

    const particlesLoaded = async (): Promise<void> => {

    };
    const options: ISourceOptions = useMemo(
        () => ({
          fullScreen: false,
          background: {
            color: {
              value: "#1f2937",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              push: {
                quantity: 3,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#c4b5fd",
            },
            links: {
              color: "#6366f1",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: MoveDirection.none,
              enable: true,
              outModes: {
                default: OutMode.out,
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }),
        [],
    );

    if (init) {
      return (
          <Particles className="absolute left-0 top-0 h-screen w-[100%] z-0"
              id="tsparticles"
              particlesLoaded={particlesLoaded}
              options={options}
          />
      );
    }
  }
  initEmail();
  return (
      <div className={`bg-gray-800`}>
        <div id="1">
          <Section className="" title="" content="">
            <section
                className="bg-center min-h-screen bg-no-repeat flex justify-center items-center bg-blend-multiply">
              <div
                  onMouseUp={handleMouseUp}>
                <div
                    onMouseDown={handleMouseDown}>
                    <ParticleEngine />
                </div>
              </div>
              <div className="z-10 px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                <AnimatedText text="Louis Braidwood"/>
                <Subtitle subtitle="Passionate about all things game, software and web development"/>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                  <Link
                      href="https://docs.google.com/document/d/1sDIcDwmlkOf2Qq-nimRUbnTzN3r6b22tJUZo7GRcZZ0/edit?tab=t.0"
                      target="_blank"
                      className="select-none inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-full bg-indigo-700 hover:bg-indigo-600 focus:ring-5 focus:ring-indigo-900 dark:focus:ring-indigo-900">
                    My CV
                  </Link>
                  <button onClick={scrollToContact}
                          className="select-none inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-full border border-white hover:bg-gray-100 focus:ring-5 focus:ring-indigo-500">
                    Contact
                  </button>
                </div>
              </div>
            </section>
          </Section>
        </div>
        <div id="2" className="p-0 m-0">
          <Section className="min-h-screen w-screen bg-slate-700 p-0 m-0 -z-10" title="" content="">
            <section className="flex flex-col justify-between py-8 pb-16">
              <div className="min-h-[86vh] flex flex-col align-middle items-center justify-between">
                  <ExpandableTextArea
                      isExpanded={aboutExpandedId === 0}
                      onExpand={() => handleAboutExpand(0)} text="I grew up in a rural part of Scotland but always loved gaming,
                         which led me to start programming in Game Maker Studio when I got my first computer in 2014 (Age 12)." expandDirection="right"/>
                  <ExpandableTextArea
                      isExpanded={aboutExpandedId === 1}
                      onExpand={() => handleAboutExpand(1)} text="Later I moved on to learning Java, and building my own game engines with LWJGL, and even later I tried some web development,
                        C++ and Unity (C#)." expandDirection="left"/>
                  <ExpandableTextArea
                      isExpanded={aboutExpandedId === 2}
                      onExpand={() => handleAboutExpand(2)} text="In 2019 I moved to Edinburgh to attend Heriot-Watt University, where
                        I graduated at 20 years old with a BSc (+ Honours) Computer Science Degree." expandDirection="right"/>
                  <ExpandableTextArea className={`text-sm`}
                      isExpanded={aboutExpandedId === 3}
                      onExpand={() => handleAboutExpand(3)} text="Towards the end of my degree I was offered a position at Voror Health Technologies and have been working there as
                        a full stack developer since April 2023. I have been working primarily with Java, Vue.js and MySQL and have progressed from a Junior to a Mid-level developer.
                        " expandDirection="left"/>
                  <ExpandableTextArea className={`text-sm`}
                      isExpanded={aboutExpandedId === 4}
                      onExpand={() => handleAboutExpand(4)} text="
                  I currently contribute to the maintenance of the Transform system and am
                  developing the Record Viewer tool, as the sole Front-end developer, and a contributor to the back-end I have had the chance to give demos both internally and externally,
                  and make key design decisions." expandDirection="right"/>

              </div>
            </section>
          </Section>
        </div>
        <div id="3" className="-scroll-mt-1">
          <Section className="min-h-screen bg-gray-800 w-screen flex flex-col lg:flex-row lg:justify-center" title=""
                   content="">
            <div className={`flex flex-col w-screen items-center lg:flex-row ${isExpanded ? "justify-center" : ""}`}>
              <AnimatedButton selectedProject={selectedProject} label="" className={``}
                              onExpanded={handleExpandedChange}/>
              <div
                  className={` lg:h-screen lg:w-[50vw] flex flex-col justify-start items-center lg:justify-center lg:items-start ${isExpanded ? "hidden" : ""}`}>
                <h2 className="lg:text-4xl pb-2 border-b-2 border-slate-600 lg:w-[80%]">Projects</h2>
                <ul className={`w-[80%] mb-4 text-left`}>
                  {projects.map((item) => (
                      <motion.div
                          key={item.id}
                          whileHover={{scaleX: 1.05, background: "#1c2634"}}
                          onClick={() => handleProjectLIClick(item.id)}
                          whileTap={{scaleX: 0.95}}
                      >
                        <li className={`flex justify-between py-3 border-y-2 -mt-0.5 border-slate-600 md:py-4 ${selectedProject === item.id ? 'bg-slate-700 ' : ''}`} key={item.id}

                            >
                          <p className="xl:pl-8 pl-2 pr-2 text-sm xl:text-base">{item.label}</p>
                          <p className="xl:pr-8 pl-2 pr-2 text-sm xl:text-base">{item.type}</p>
                        </li>
                      </motion.div>
                  ))}

                  <li className="border border-b-1 -mt-0.5 border-slate-600"/>
                </ul>
              </div>
            </div>
          </Section>
        </div>
        <div id="4">
          <Section className="min-h-screen bg-slate-700" title="" content="">
            <section className="w-full h-full">
              <div className="w-full h-full flex items-center justify-center">
                <Card className="max-w-[812px]" title="Contact" footer="">
                  <div ref={contactRef} className="mx-auto md:max-w-[650em]">
                    <form onSubmit={sendEmail}>
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
                          <div className="mb-5">
                            <label
                                htmlFor="user_name"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                            </label>
                            <input
                                type="text"
                                name="user_name"
                                id="user_name"
                                placeholder="Name"
                                className="w-full bg-slate-600 rounded-md border-2 border-indigo-300 py-3 px-6 text-base font-medium text-slate-300 outline-none focus:border-indigo-500 focus:shadow-md"
                            />
                          </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                          <div className="mb-5">
                            <label
                                htmlFor="user_email"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                            </label>
                            <input
                                type="email"
                                name="user_email"
                                id="user_email"
                                placeholder="Email"
                                className="w-full bg-slate-600 rounded-md border-2 border-indigo-300 py-3 px-6 text-base font-medium text-slate-300 outline-none focus:border-indigo-500 focus:shadow-md"
                            />
                          </div>
                        </div>

                        <div className="w-full px-3 sm:w">
                    <textarea name="message"
                              placeholder="Message"
                              className="w-full bg-slate-600 rounded-md border-2 border-indigo-300 py-3 px-6 text-base font-medium text-slate-300 outline-none focus:border-indigo-500 focus:shadow-md"/>
                        </div>
                      </div>

                      <div>
                        <button type="submit"
                                className="hover:shadow-form rounded-full bg-indigo-500 hover:bg-indigo-400 py-3 px-8 mt-4 text-center text-base font-semibold text-white outline-none"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </Card>
              </div>
            </section>
          </Section>
        </div>

        <CustomScroll/>
      </div>
  );
}
