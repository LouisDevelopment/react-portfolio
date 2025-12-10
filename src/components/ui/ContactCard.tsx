import React from "react";

export interface CardProps {
    title?: string;
    footer?: string;
    children: React.ReactNode;
    className?: string;
}

export const ContactCard: React.FC<CardProps> = ({ title, footer, children, className = "" }) => {
    return (
        <div className={`shadow-xl w-[100%] m-4 bg-slate-800/50 border border-slate-700 backdrop-blur-sm rounded-3xl text-slate-200 ${className}`}>
            {title && (
                <div className="pt-6 md:pt-10 md:text-2xl font-bold pb-4 border-b border-slate-700/50 mx-8">
                    <h2 className="text-center text-white">{title}</h2>
                </div>
            )}
            <div className="px-6 md:px-12 py-6 md:py-10">
                {children}
            </div>
            {footer && <div className="px-8 pb-6 text-right">{footer}</div>}
        </div>
    );
};
