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
                color: { value: "#111827" }, // bg-gray-900
            },
            fpsLimit: 120,
            particles: {
                color: { value: "#6265ef" }, // indigo-300
                links: {
                    color: "#4446a8", // indigo-500
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 1,
                },
                move: {
                    direction: MoveDirection.none,
                    enable: true,
                    outModes: { default: OutMode.out },
                    random: false,
                    speed: 2,
                    straight: false,
                },
                number: {
                    density: { enable: true },
                    value: 80,
                },
                opacity: { value: 0.5 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 5 } },
            },
            detectRetina: true,
        }),
        [],
    );

    if (!init) return null;

    return (
        <Particles
            id="tsparticles"
            className="absolute left-0 top-0 h-screen w-full z-0"
            options={options}
        />
    );
}