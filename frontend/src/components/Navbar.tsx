'use client';

import Image from 'next/image';
import React from 'react';

interface NavbarProps {
    showBorder?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showBorder = false }) => {
    return (
        <nav
        className={`w-full px-8 py-6 flex justify-between items-center ${
            showBorder ? 'border-b border-gray-300' : ''
        }`}
        >
        <Image src="/pathmatch-logo.svg" alt="PathMatch Logo" width={150} height={30} />
        </nav>
    );
};

export default Navbar;
