import React from 'react';

interface NavigationProps {
    activeId: string | null;
    onNavigate: (id: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeId, onNavigate }) => {

    const links = [
        { id: '1', label: 'Home' },
        { id: '2', label: 'Journey' },
        { id: '3', label: 'Work' },
        { id: '4', label: 'Contact' },
    ];

    return (
        <>
            <nav className="lg:hidden fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
                <div className="flex items-center justify-between px-2 py-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-full shadow-2xl shadow-black/50">
                    {links.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => onNavigate(link.id)}
                            className={`
                                relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300
                                ${activeId === link.id
                                ? 'text-white bg-indigo-600 shadow-lg shadow-indigo-500/25'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }
                            `}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
            </nav>

            <nav className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-6">
                {links.map((link) => {
                    const isActive = activeId === link.id;
                    return (
                        <button
                            key={link.id}
                            onClick={() => onNavigate(link.id)}
                            className="group flex items-center justify-end relative pl-8 py-1"
                        >

                            <div
                                className={`
                                    relative z-10 w-3 h-3 rounded-full border-2 transition-all duration-300
                                    ${isActive
                                    ? 'bg-indigo-500 border-indigo-500 scale-125 shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                                    : 'bg-transparent border-slate-500 group-hover:border-slate-300'
                                }
                                `}
                            />

                            <div className={`absolute right-[5px] h-6 w-[1px] -top-6 bg-slate-800 -z-10 ${link.id === '1' ? 'hidden' : 'block'}`} />
                        </button>
                    );
                })}
            </nav>
        </>
    );
};

export default Navigation;