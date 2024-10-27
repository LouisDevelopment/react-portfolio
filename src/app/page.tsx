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

import Navigation from './components/Navigation';
import Section from './components/Section';

export default function Home() {
  const contactRef = useRef<HTMLDivElement | null>(null);;

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sections = [
      '1',
      '2',
      '3',
      '4'
  ]

  const [activeId, setActiveId] = useState<string>('1');

  const handleWheel = (event: WheelEvent) => {
    // Prevent the default scroll behavior if needed
    event.preventDefault();
    console.log(event.deltaY > 0 ? 'Scrolling down' : 'Scrolling up');

    // Check the deltaY property to determine the scroll direction
    if (event.deltaY > 0) {

      const element = document.getElementById(sections[parseInt(activeId)%4])
      if(element)
        element.scrollIntoView({ behavior: 'smooth'});
      setActiveId(sections[parseInt(activeId)%4]);
    } else {
      let x = parseInt(activeId);
      if(x == 1){
        x = 5
      }
      const element = document.getElementById(sections[x - 2])
      console.log(element)
      if(element)
        element.scrollIntoView({ behavior: 'smooth'});
      setActiveId(sections[x - 2]);
    }
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

      window.addEventListener('wheel', handleWheel, { passive: false });

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

      // Cleanup function to remove the event listener
      return () => {
        window.removeEventListener('wheel', handleWheel);
      };
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

        <Navigation activeId={activeId} setActiveId={setActiveId}/>
        <div id="1">
          <Section className="" title="" content="">
            <section
                className="bg-center h-screen bg-no-repeat flex justify-center items-center bg-blend-multiply">
              <ParticleEngine/>
              <div className="z-10 px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                <AnimatedText text="Louis Braidwood"/>
                <Subtitle subtitle="Passionate about all things game, software and web development"></Subtitle>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">

                  <Link href="/projects"
                        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-full bg-indigo-700 hover:bg-indigo-600 focus:ring-5 focus:ring-indigo-900 dark:focus:ring-indigo-900">
                    Projects
                  </Link>
                  <Link
                      href="https://docs.google.com/document/d/1sDIcDwmlkOf2Qq-nimRUbnTzN3r6b22tJUZo7GRcZZ0/edit?tab=t.0"
                      target="_blank"
                      className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-full bg-indigo-700 hover:bg-indigo-600 focus:ring-5 focus:ring-indigo-900 dark:focus:ring-indigo-900">
                    My CV
                  </Link>
                  <button onClick={scrollToContact}
                          className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-full border border-white hover:bg-gray-100 focus:ring-5 focus:ring-indigo-500">
                    Contact
                  </button>
                </div>
              </div>
            </section>
          </Section>
        </div>
        <div id="2">
          <Section className="bg-slate-700" title="" content="">
            <section className="bg-slate-700 p-16">
              <div className="flex flex-col items-center justify-center  text-center">
                <Card className="max-w-[800px]" title="About Me" footer="">
                  <p>
                    I started programming when I was 11, making video games in Java at first, and then branching out
                    into
                    more
                    languages,
                    and working on larger, more varied projects. <br/>
                    <br/>I’ve always known I wanted to be in software or game development, and once I graduated,
                    I immediately landed a job at Voror Health Technologies as a Software Engineer where I have grown
                    and
                    picked up essential skills that you can
                    only get by working in a professional development team. <br/>
                    <br/> In my free time I like gaming and I used to compete at an amateur level in a game series
                    called
                    Counter-Strike.
                  </p>
                </Card>
                <Card title={`Work`} className="max-w-[800px]" footer="">
                  I am now a full time software developer at Voror Health Technologies, a company commited to improving
                  the
                  landscape of medical data and making it easy to understand through their Discovery Data System. They
                  currently store the data of over 38 million patient records throughout London, working with over 850
                  GP
                  practices within the region.
                </Card>
              </div>
            </section>
          </Section>
        </div>
        <div id="3">
          <Section className="bg-gray-800" title="Section 3" content="You're now in Section 3.">
            Projects
          </Section>
        </div>
        <div id="4">
          <Section className="bg-slate-700" title="" content="">
            <section className="bg-slate-700 p-16">
              <div className="flex items-center justify-center">
                <Card className="" title="Contact" footer="">
                  <div ref={contactRef} className="mx-auto w-full max-w-[550px]">
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


      </div>
  );
}
