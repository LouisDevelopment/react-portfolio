import React, {ReactNode} from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
    title: string;
    content: string;
    children: ReactNode;
    className: string;
}

import SectionContent from './SectionContent';

const Section: React.FC<SectionProps> = ({ title, content , children, className}) => {
    return (
        <motion.div
            className={`flex flex-col items-center justify-center h-screen p-8 text-white ${className}`}
            initial={{ opacity: 0}}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            <h2 className="text-4xl font-bold mb-4">{title}</h2>
            <SectionContent text={content}/>
            <div>{children}</div>
        </motion.div>
    );
};

export default Section;