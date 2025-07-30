// components/RadioOption.tsx
import React from 'react';
import Image from 'next/image';

interface RadioOptionProps {
    label: string;
    svgSrc: string;
    onClick: () => void;
    colorClass?: string;
}

const RadioOption: React.FC<RadioOptionProps> = ({ label, svgSrc, onClick, colorClass }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center space-y-2 focus:outline-none`}
    >
        <Image src={svgSrc} alt={label} className="w-8 h-8" />
        <span className={`text-xs ${colorClass}`}>{label}</span>
    </button>
);

export default RadioOption;
