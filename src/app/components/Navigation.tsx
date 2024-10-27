import React from 'react';
import {Link} from 'react-scroll';

import './Navigation.css'


interface NavigationProps {
    activeId: string | null; // Active ID from parent
    setActiveId: (id: string) => void; // Function to set active ID
}

const Navigation: React.FC<NavigationProps> = ({activeId, setActiveId}) => {
    // Function to handle click events
    const handleSectionChange = (id: string) => {
        setActiveId(id); // Update the active ID state
        console.log(activeId)
    };

    return (
        <nav className="fixed flex text-white items-center w-screen justify-center top-10 lg:flex-col lg:right-4 z-50 lg:h-screen lg:w-32">
            <Link
                activeClass="active"
                to="1"
                smooth={true}
                spy={true}
                duration={500}
                className="link"
                onClick={() => handleSectionChange('1')}
            >
                LANDING
            </Link>
            <svg className="icon" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512">
                <path
                    d="M284.3 11.7c-15.6-15.6-40.9-15.6-56.6 0l-216 216c-15.6 15.6-15.6 40.9 0 56.6l216 216c15.6 15.6 40.9 15.6 56.6 0l216-216c15.6-15.6 15.6-40.9 0-56.6l-216-216z"/>
            </svg>
            <Link
                activeClass="active"
                to="2"
                smooth={true}
                spy={true}
                duration={500}
                className="link"
                onClick={() => handleSectionChange('2')}
            >
                ABOUT ME
            </Link>
            <svg className="icon" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512">
                <path
                    d="M284.3 11.7c-15.6-15.6-40.9-15.6-56.6 0l-216 216c-15.6 15.6-15.6 40.9 0 56.6l216 216c15.6 15.6 40.9 15.6 56.6 0l216-216c15.6-15.6 15.6-40.9 0-56.6l-216-216z"/>
            </svg>
            <Link
                activeClass="active"
                to="3"
                smooth={true}
                spy={true}
                duration={500}
                className="link"
                onClick={() => handleSectionChange('3')}
            >
                PROJECTS
            </Link>

            <svg className="icon" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512">
                <path
                    d="M284.3 11.7c-15.6-15.6-40.9-15.6-56.6 0l-216 216c-15.6 15.6-15.6 40.9 0 56.6l216 216c15.6 15.6 40.9 15.6 56.6 0l216-216c15.6-15.6 15.6-40.9 0-56.6l-216-216z"/>
            </svg>
            <Link
                activeClass="active"
                to="4"
                smooth={true}
                spy={true}
                duration={500}
                className="link"
                onClick={() => handleSectionChange('4')}
            >
                CONTACT
            </Link>
        </nav>
    );
};

export default Navigation;