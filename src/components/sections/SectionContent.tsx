import { motion } from 'framer-motion';
import React from "react";

const SectionContent: React.FC<{ text: string}> = ({ text}) => {
    return (
        <motion.p
            className="text-lg text-center mb-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            {text}

        </motion.p>
    );
};
export default SectionContent;