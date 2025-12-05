import React from 'react';

interface NavigationProps {
    activeId: string | null;
    onNavigate: (id: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({activeId, onNavigate}) => {

    const NavLink = ({ id, label }: { id: string, label: string }) => (
        <button
            onClick={() => onNavigate(id)}
            className={`
                relative z-10 cursor-pointer transition-all duration-300 text-xs md:text-sm font-medium
                lg:px-4 lg:py-2 lg:rounded-full 
                
                ${activeId === id
                ? 'text-indigo-400 font-bold scale-110 lg:bg-white/5 lg:shadow-sm lg:ring-1 lg:ring-white/10 backdrop-blur-sm'
                : 'text-slate-400 hover:text-white'
            }
            `}
        >
            {label}
        </button>
    );

    const NavIcon = () => (
        <svg className="hidden lg:block my-2 w-3 h-3 text-slate-700 relative z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/>
        </svg>
    );

    return (
        <nav className="
            fixed z-50

            top-0 left-0 w-full h-16
            flex flex-row items-center justify-evenly
            border-b border-white/10 shadow-lg

            lg:w-32 lg:h-screen lg:flex-col lg:justify-center lg:right-8 lg:left-auto lg:top-0
            lg:border-none lg:shadow-none
        ">

            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md -z-10 lg:hidden" />

            <NavLink id="1" label="LANDING" />
            <NavIcon />
            <NavLink id="2" label="ABOUT" />
            <NavIcon />
            <NavLink id="3" label="PROJECTS" />
            <NavIcon />
            <NavLink id="4" label="CONTACT" />
        </nav>
    );
};

export default Navigation;