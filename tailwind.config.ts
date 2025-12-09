import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-nunito)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        draw: {
          'to': { strokeDashoffset: '0' },
        },
        fill: {
          'from': { fill: 'transparent' },
          'to': { fill: 'white' },
        },
      },
      animation: {
        'text-reveal': 'draw 20s ease forwards, fill 1s ease forwards 2s',
      },
    },
  },
  plugins: [],
};
export default config;
