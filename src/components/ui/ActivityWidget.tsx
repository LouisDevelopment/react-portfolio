'use client';

import useSWR from 'swr';
import { FaMusic, FaGitAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from 'date-fns';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const glassStyle = {
    background: 'rgba(20, 20, 23, 0.3)',
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
};

const baseClasses = "rounded-2xl transition-all duration-300 hover:bg-[#141417]/50";

const MusicCard = () => {
    const { data, error } = useSWR('/api/music', fetcher, {
        refreshInterval: 30000
    });

    if (error || !data?.isPlaying) {
        return (
            <div
                className={`flex items-center gap-3 px-4 py-2 ${baseClasses}`}
                style={glassStyle}
            >
                <FaMusic className="text-slate-500" />
                <span className="text-xs font-medium text-slate-400">Offline</span>
            </div>
        );
    }

    return (
        <a
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 pr-4 pl-2 py-2 group hover:scale-105 hover:border-white/20 ${baseClasses}`}
            style={glassStyle}
        >
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/10 shadow-sm">
                <img
                    src={data.albumImageUrl}
                    alt={data.album}
                    className="w-full h-full object-cover animate-[spin_8s_linear_infinite]"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#141417] rounded-full" />
            </div>

            {/* Added max-w constraint to prevent widget from growing too wide on mobile */}
            <div className="flex flex-col overflow-hidden max-w-[120px] sm:max-w-[140px]">
                <span className="text-xs font-bold text-slate-200 truncate group-hover:text-[#1DB954] transition-colors">
                    {data.title}
                </span>
                <span className="text-[10px] text-slate-400 truncate">
                    {data.artist}
                </span>
            </div>

            <div className="flex gap-[2px] h-3 items-end ml-1">
                <span className="w-0.5 bg-[#1DB954] h-full animate-[pulse_1s_ease-in-out_infinite]" />
                <span className="w-0.5 bg-[#1DB954] h-2/3 animate-[pulse_1.2s_ease-in-out_infinite]" />
                <span className="w-0.5 bg-[#1DB954] h-1/3 animate-[pulse_0.8s_ease-in-out_infinite]" />
            </div>
        </a>
    );
};

const GithubCard = () => {
    const { data, error } = useSWR('/api/github', fetcher, {
        refreshInterval: 60000
    });

    if (error || !data?.hasCommit) {
        return null;
    }

    return (
        <AnimatePresence mode="wait">
            <motion.a
                key={data.sha}
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`flex items-center gap-3 px-3 py-2 mt-2 group hover:scale-105 hover:border-white/20 ${baseClasses}`}
                style={glassStyle}
            >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/40 border border-white/5 shrink-0">
                    <FaGitAlt className="text-orange-500 text-sm" />
                </div>

                {/* Added max-w constraint here too */}
                <div className="flex flex-col max-w-[140px] sm:max-w-[160px]">
                    <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                         <span className="text-indigo-400 truncate max-w-[80px]">{data.repo}</span>
                         <span>•</span>
                         <span>{formatDistanceToNow(new Date(data.date), { addSuffix: true })}</span>
                    </span>
                    <span className="text-xs font-bold text-slate-200 truncate w-full group-hover:text-indigo-400 transition-colors">
                        {data.message}
                    </span>
                </div>
            </motion.a>
        </AnimatePresence>
    );
};

export const ActivityWidget = () => {
    return (
        <div className="flex flex-col items-end">
            <MusicWidget />
            <GithubWidget />
        </div>
    );
};

const MusicWidget = MusicCard;
const GithubWidget = GithubCard;