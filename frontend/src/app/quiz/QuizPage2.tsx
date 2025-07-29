'use client';

import React, { useEffect, useState } from 'react';
import RadioOption from '../../components/RadioOption';
import { AnswerType } from './QuizWrapper';

const questionsPage2 = [
    { id: 11, text: "Develop a new medicine" },
    { id: 12, text: "⁠Study ways to reduce water pollution" },
    { id: 13, text: "Conduct chemical experiments" },
    { id: 14, text: "Study the movement of planets" },
    { id: 15, text: "Examine blood samples using a microscope" },
    { id: 16, text: "Investigate the cause of a fire" },
    { id: 17, text: "Develop a way to better predict the weather" },
    { id: 18, text: "Work in a biology lab" },
    { id: 19, text: "⁠Invent a replacement for sugar" },
    { id: 20, text: "Do laboratory tests to identify diseases" },
];

const svgPaths = {
    '1': { unchecked: '/radio-unchecked-red.svg', checked: '/radio-checked-red.svg' },
    '2': { unchecked: '/radio-unchecked-yellow.svg', checked: '/radio-checked-yellow.svg' },
    '3': { unchecked: '/radio-unchecked-gray.svg', checked: '/radio-checked-gray.svg' },
    '4': { unchecked: '/radio-unchecked-green-light.svg', checked: '/radio-checked-green-light.svg' },
    '5': { unchecked: '/radio-unchecked-green-dark.svg', checked: '/radio-checked-green-dark.svg' },
};

const optionLabels = {
    '1': 'Strongly Dislike',
    '2': 'Dislike',
    '3': 'Neutral',
    '4': 'Like',
    '5': 'Strongly Like',
};

interface QuizPage2Props {
    answers: AnswerType[];
    allAnswers: AnswerType[];
    onAnswer: (index: number, value: AnswerType) => void;
    onNext: () => void;
    onBack: () => void;
}

const QuizPage2: React.FC<QuizPage2Props> = ({ answers, allAnswers, onAnswer, onNext, onBack }) => {
    const [showWarning, setShowWarning] = useState(false);

    const answeredOnThisPage = answers.filter((a) => Array.isArray(a) && a.length > 0).length;
    const allAnswered = answeredOnThisPage === 10;
    const currentAnswered = allAnswers.filter((a) => Array.isArray(a) && a.length > 0).length;
    const progressPercent = Math.round((currentAnswered / 64) * 100); // Updated to 60

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="bg-[#F5F7FA] text-black p-6 md:p-3 rounded-[32px] space-y-10">
            {/* Header & Progress */}
            <div className="text-center space-y-4">
                <p className="text-base md:text-lg text-gray-700">
                    Select how much you would enjoy doing each activity
                </p>

                <div className="flex justify-around items-center max-w-md mx-auto">
                    {Object.entries(svgPaths).map(([value, icons]) => (
                        <RadioOption
                            key={value}
                            label={optionLabels[value as keyof typeof optionLabels]}
                            svgSrc={icons.unchecked}
                            isSelected={false}
                            onClick={() => {}}
                            colorClass="text-black"
                        />
                    ))}
                </div>

                <div className="w-full max-w-md mx-auto">
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>Page 2 of 7</span>
                        <span>{progressPercent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
                        <div
                            className="bg-[#FFD000] h-3 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Soal */}
            <div className="space-y-6">
                {questionsPage2.map((q, i) => {
                    const selected = answers[i];
                    const selectedValue = Array.isArray(selected) ? selected[0] : null;
                    const isAnswered = selectedValue !== null;

                    return (
                        <div
                            key={q.id}
                            className={`rounded-xl p-6 transition-colors text-center ${
                                isAnswered ? 'bg-[#003E85] text-white' : 'bg-[#F5F7FA] shadow-sm'
                            }`}
                        >
                            <p className="mb-4 font-semibold">{q.text}</p>
                            <div className="flex justify-between gap-2 flex-wrap sm:flex-nowrap">
                                {Object.entries(svgPaths).map(([value, icons]) => {
                                    const numericVal = parseInt(value);
                                    const isSelected = selectedValue === numericVal;

                                    return (
                                        <RadioOption
                                            key={value}
                                            label=""
                                            svgSrc={isSelected ? icons.checked : icons.unchecked}
                                            isSelected={isSelected}
                                            onClick={() => onAnswer(i, isSelected ? null : [numericVal])}
                                            colorClass={isSelected ? 'text-white' : 'text-black'}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tombol Back & Next */}
            <div className="flex justify-between items-center pt-0">
                <button
                    onClick={onBack}
                    className="bg-transparent border-5 border-[#FFD000] text-gray-800 px-15 py-1 rounded-[10px] text-lg font-semibold transition duration-300 hover:bg-[#FFD000]"
                >
                    Back
                </button>

                <div className="flex flex-col items-end space-y-2">
                    {showWarning && (
                        <p className="text-red-600 text-sm text-right">
                            Silakan isi semua pertanyaan sebelum melanjutkan.
                        </p>
                    )}
                    <button
                        onClick={() => {
                            if (allAnswered) {
                                setShowWarning(false);
                                onNext();
                            } else {
                                setShowWarning(true);
                            }
                        }}
                        disabled={!allAnswered}
                        className={`px-15 py-2 rounded-[10px] text-lg font-semibold transition duration-300 ${
                            allAnswered
                                ? 'bg-[#FFD000] hover:brightness-110 text-[#161616]'
                                : 'bg-gray-400 text-white cursor-not-allowed'
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizPage2;
