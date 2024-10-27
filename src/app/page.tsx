'use client';

import Link from "next/link";
import emailjs from '@emailjs/browser'
import React, {ReactNode, useEffect, useMemo, useState} from "react";
import Particles, { initParticlesEngine} from "@tsparticles/react";
import {
  type Container,
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

export default function Home() {
  const contactRef = useRef<HTMLDivElement | null>(null);;

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  let selectedProject=1;

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

  // Handler to disable text selection on mouse down
  const handleMouseDown = () => {
    document.body.style.userSelect = 'none';
  };

  // Handler to re-enable text selection on mouse up
  const handleMouseUp = () => {
    document.body.style.userSelect = 'auto';
  };

  interface CardProps {
    title: string;
    footer: string;
    children: ReactNode;
    className: string;
  }
  const Card: React.FC<CardProps> = ({ title, footer, children, className}) => {
    return (
        <div className={`shadow m-4 bg-slate-800 rounded-2xl text-slate-200 ${className}`}>
          {title && (<div className="pt-8 text-xl">
            <h2 className={`text-center`}>{title}</h2>
          </div>)}
          <div className="px-8 py-6">
            {children}
          </div>
          {footer && <div className="px-8 pb-6 text-right">{footer}</div>}
        </div>
    );
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
        await loadSlim(engine);
        //await loadBasic(engine);
      }).then(() => {
        setInit(true);
      });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {

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
      <div className={`bg-slate-900`}>
        <div id="1">
          <Section className="" title="" content="">
            <section
                className="bg-center h-screen bg-no-repeat flex justify-center items-center bg-blend-multiply">
              <div
                  onMouseUp={handleMouseUp}>
                <div
                    onMouseDown={handleMouseDown}>
                    <ParticleEngine />
                </div>
              </div>
              <div className="z-10 px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                <AnimatedText text="Louis Braidwood"/>
                <Subtitle subtitle="Passionate about all things game, software and web development"></Subtitle>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">

                  <Link href="/projects"
                        className="select-none inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-full bg-indigo-700 hover:bg-indigo-600 focus:ring-5 focus:ring-indigo-900 dark:focus:ring-indigo-900">
                    Projects
                  </Link>
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
        <div id="2">
          <Section className="bg-slate-700" title="" content="">
            <section className="bg-slate-700 md:p-32 lg:p-64">
                <div className="flex items-center justify-center">
                  <Card className="" title="About Me" footer="">
                    <p>
                      I started programming when I was 11, making video games in Java at first, and then branching out
                      into
                      more
                      languages,
                      and working on larger, more varied projects. <br/>
                      <br/>I’ve always known I wanted to be in software or game development, and once I graduated,
                      I immediately landed a job at Voror Health Technologies as a Software Engineer where I have
                      grown
                      and
                      picked up essential skills that you can
                      only get by working in a professional development team. <br/>
                      <br/> In my free time I like gaming and I used to compete at an amateur level in a game series
                      called
                      Counter-Strike.
                    </p>
                  </Card>
                </div>
            </section>
          </Section>
        </div>
        <div id="3">
          <Section className="bg-gray-800 w-screen flex flex-col lg:flex-row lg:justify-center" title="" content="">
            <div className="flex flex-col w-screen lg:flex-row">
              <AnimatedButton className=""/>
              <div className="h-[50vh] lg:h-screen lg:w-[50vw] flex flex-col justify-start items-center lg:justify-center lg:items-start">
                <h2 className="text-4xl pb-2 border-b-2 border-slate-600 lg:w-[80%]">Projects</h2>
                <ul className="w-[80%] text-left">
                  <motion.div
                      whileHover={{scaleX: 1.05, background: "#1c2634"}}
                      onHoverStart={() => selectedProject = 1}
                      whileTap={{scaleX: 0.95}}
                  >
                    <li className="listItem">
                      <p className="xl:pl-8 pl-2 pr-2 text-sm xl:text-base">Draw Dojo</p>
                      <p className="xl:pr-8 pl-2 pr-2 text-sm xl:text-base">Front-End</p>
                    </li>
                  </motion.div>
                  <motion.div
                      whileHover={{scaleX: 1.05, background: "#1c2634"}}
                      onHoverStart={() => selectedProject = 1}
                      whileTap={{scaleX: 0.95}}
                  >
                    <li className="listItem">
                      <p className="xl:pl-8 pl-2 pr-2 text-sm xl:text-base">Patient Record Viewer</p>
                      <p className="xl:pr-8 pl-2 pr-2 text-sm xl:text-base">Full-Stack</p>
                    </li>
                  </motion.div>
                  <motion.div
                      whileHover={{scaleX: 1.05, background: "#1c2634"}}
                      onHoverStart={() => selectedProject = 1}
                      whileTap={{scaleX: 0.95}}
                  >
                    <li className="listItem">
                      <p className="xl:pl-8 pl-2 pr-2 text-sm xl:text-base">Portobello Driver Training</p>
                      <p className="xl:pr-8 pl-2 pr-2 text-sm xl:text-base">Full-Stack (Independent)</p>
                    </li>
                  </motion.div>
                  <motion.div
                      whileHover={{scaleX: 1.05, background: "#1c2634"}}
                      onHoverStart={() => selectedProject = 1}
                      whileTap={{scaleX: 0.95}}
                  >
                    <li className="listItem">
                      <p className="xl:pl-8 pl-2 pr-2 text-sm xl:text-base">Survival Game</p>
                      <p className="xl:pr-8 pl-2 pr-2 text-sm xl:text-base">Java/LWJGL (Independent)</p>
                    </li>
                  </motion.div>
                  <motion.div
                      whileHover={{scaleX: 1.05, background: "#1c2634"}}
                      onHoverStart={() => selectedProject = 1}
                      whileTap={{scaleX: 0.95}}
                  >
                    <li className="listItem">
                      <p className="xl:pl-8 pl-2 pr-2 text-sm xl:text-base">Procedural Generator</p>
                      <p className="xl:pr-8 pl-2 pr-2 text-sm xl:text-base">Java (University)</p>
                    </li>
                  </motion.div>
                  <li className="border border-b-1 -mt-0.5 border-slate-600"/>
                </ul>
              </div>
            </div>
          </Section>
        </div>
        <div id="4">
          <Section className="bg-slate-700" title="" content="">
            <section className="bg-slate-700">
              <div className="flex items-center justify-center">
                <Card className="" title="Contact" footer="">
                  <div ref={contactRef} className="mx-auto md:max-w-[650px]">
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
