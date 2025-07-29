import React, { useState } from 'react';
import Image from 'next/image';

interface QuestionCardProps {
    question: string;
    selectedValue: number | null;
    onAnswer: (value: number | null) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    selectedValue,
    onAnswer,
    }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (index: number) => {
        onAnswer(index);
        setIsOpen(false);
    };

    const isAnswered = selectedValue !== null;

    const arrowIcon = isOpen
        ? `/svg/arrow-up-${isAnswered ? 'white' : 'black'}.svg`
        : `/svg/arrow-down-${isAnswered ? 'white' : 'black'}.svg`;

    return (
        <div className="w-full bg-white p-4 rounded-md shadow-md mb-4 relative">
        <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-800">{question}</p>
            <button onClick={() => setIsOpen(!isOpen)}>
            <Image src={arrowIcon} alt="Toggle Dropdown" width={20} height={20} />
            </button>
        </div>

        {isOpen && (
            <div className="mt-4 flex flex-col gap-2">
            {Array.from({ length: 7 }).map((_, index) => {
                const isSelected = selectedValue === index;
                return (
                <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-md text-left transition-colors ${
                    isSelected ? 'bg-[#003E85] text-white' : 'bg-gray-100 text-black'
                    }`}
                >
                    <Image
                    src={`/svg/${isSelected ? 'radio-checked' : 'radio-unchecked'}.svg`}
                    alt="radio icon"
                    width={16}
                    height={16}
                    />
                    <span>Choice {index + 1}</span>
                </button>
                );
            })}
            </div>
        )}
        </div>
    );
};

export default QuestionCard;
