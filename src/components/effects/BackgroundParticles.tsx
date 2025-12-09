'use client';

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function BackgroundParticles() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options: ISourceOptions = useMemo(
        () => ({
            fullScreen: false,
            background: {
                color: { value: "transparent" },
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onClick: { enable: true, mode: "push" },
                    onHover: { enable: true, mode: "grab" },
                },
                modes: {
                    push: { quantity: 4 },
                    grab: { distance: 140, links: { opacity: 1 } },
                },
            },
            particles: {
                color: { value: ["#6366f1", "#a78bfa", "#ffffff"] },
                links: {
                    color: "#6366f1",
                    distance: 150,
                    enable: true,
                    opacity: 0.3,
                    width: 1,
                },
                move: {
                    direction: MoveDirection.none,
                    enable: true,
                    outModes: { default: OutMode.bounce },
                    random: false,
                    speed: 1,
                    straight: false,
                },
                number: {
                    density: { enable: true },
                    value: 200,
                },
                opacity: {
                    value: { min: 0.3, max: 0.7 },
                    animation: { enable: true, speed: 1, sync: false },
                },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
        }),
        [],
    );

    if (!init) return null;

    return (
        <Particles
            id="tsparticles"
            className="absolute inset-0 h-full w-full z-0 pointer-events-none"
            options={options}
        />
    );
}