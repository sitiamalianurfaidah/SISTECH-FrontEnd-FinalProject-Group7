'use client';

import React, { useEffect } from 'react';
import RadioOption from '../../components/RadioOption';
import { AnswerType } from './QuizWrapper'; // sesuaikan path-nya kalau beda

const dummyQuestions = [
    { id: 1, text: 'Saya merasa percaya diri dalam mengambil keputusan penting.' },
    { id: 2, text: 'Saya nyaman bekerja dalam kelompok.' },
    { id: 3, text: 'Saya memiliki tujuan karier yang jelas.' },
    { id: 4, text: 'Saya dapat mengatur waktu dengan baik.' },
    { id: 5, text: 'Saya mampu mengatasi tekanan dengan efektif.' },
    { id: 6, text: 'Saya memahami minat dan bakat saya.' },
    { id: 7, text: 'Saya mudah mempelajari hal baru.' },
    { id: 8, text: 'Saya suka mengeksplorasi bidang pekerjaan.' },
    { id: 9, text: 'Saya yakin dengan pilihan jurusan saya.' },
    { id: 10, text: 'Saya termotivasi untuk berkembang.' },
];

const svgPaths = {
    '1': { unchecked: '/radio-unchecked-red.svg', checked: '/radio-checked-red.svg' },
    '2': { unchecked: '/radio-unchecked-yellow.svg', checked: '/radio-checked-yellow.svg' },
    '3': { unchecked: '/radio-unchecked-gray.svg', checked: '/radio-checked-gray.svg' },
    '4': { unchecked: '/radio-unchecked-green-light.svg', checked: '/radio-checked-green-light.svg' },
    '5': { unchecked: '/radio-unchecked-green-dark.svg', checked: '/radio-checked-green-dark.svg' },
};


const optionLabels = {
    '1': 'Strongly Disagree',
    '2': 'Disagree',
    '3': 'Neutral',
    '4': 'Agree',
    '5': 'Strongly Agree',
};

interface QuizPage1Props {
    answers: AnswerType[];
    allAnswers: AnswerType[];
    onAnswer: (index: number, value: AnswerType) => void;
    onNext: () => void;
}

const QuizPage1: React.FC<QuizPage1Props> = ({ answers, allAnswers, onAnswer, onNext }) => {
    const currentAnswered = allAnswers.filter((a) => Array.isArray(a) ? a.length > 0 : a !== null).length;
    const progressPercent = Math.round((currentAnswered / 30) * 100);
    const allAnswered = answers.every((a) => Array.isArray(a) && a.length > 0);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="bg-[#F5F7FA] text-black p-6 md:p-3 rounded-[32px] space-y-10">
        {/* Petunjuk dan Progress */}
        <div className="text-center space-y-4">
            <p className="text-base md:text-lg text-gray-700">
            Select how well each statement reflects you
            </p>

            {/* Legend Scale */}
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

            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Halaman 1 dari 3</span>
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

        {/* Pertanyaan */}
        <div className="space-y-6">
            {dummyQuestions.map((q, index) => {
            const selected = answers[index] || null;
            const selectedValue = Array.isArray(selected) ? selected[0] : null;

            return (
                <div
                key={q.id}
                className={`rounded-xl p-6 transition-colors text-center ${
                    selectedValue !== null ? 'bg-[#003E85] text-white' : 'bg-[#F5F7FA] shadow-sm'
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
                        onClick={() => {
                            onAnswer(index, isSelected ? null : [numericVal]);
                        }}
                        colorClass={isSelected ? 'text-white' : 'text-black'}
                        />
                    );
                    })}
                </div>
                </div>
            );
            })}
        </div>

        {/* Tombol Next */}
        <div className="flex justify-center pt-0">
            <button
            onClick={onNext}
            disabled={!allAnswered}
            className={`px-15 py-2 rounded-[10px] text-lg font-semibold transition duration-300 
                ${
                allAnswered
                    ? 'bg-[#FFD000] hover:brightness-110 text-[#161616]'
                    : 'bg-gray-400 text-white cursor-not-allowed'
                }`}
            >
            Next
            </button>
        </div>
        </div>
    );
};

export default QuizPage1;
