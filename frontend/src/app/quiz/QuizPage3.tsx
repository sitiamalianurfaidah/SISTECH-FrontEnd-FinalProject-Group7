'use client';

import React, { useEffect, useState } from 'react';
import RadioOption from '../../components/RadioOption';

const dummyQuestions = [
    { id: 21, text: 'Bidang pekerjaan yang paling menarik bagi saya:' },
    { id: 22, text: 'Topik yang sering saya cari atau baca:' },
    { id: 23, text: 'Aktivitas favorit saat waktu luang:' },
    { id: 24, text: 'Jenis tugas yang paling membuat saya antusias:' },
    { id: 25, text: 'Lingkungan kerja ideal bagi saya:' },
    { id: 26, text: 'Cara saya menyelesaikan masalah yang kompleks:' },
    { id: 27, text: 'Saya merasa puas ketika:' },
    { id: 28, text: 'Peran yang sering saya ambil dalam tim:' },
    { id: 29, text: 'Saya lebih suka belajar melalui:' },
    { id: 30, text: 'Saya merasa paling produktif saat:' },
];

const svgPaths = {
    '1': {
        unchecked: '/radio-unchecked-red.svg',
        checked: '/radio-checked-red.svg',
    },
    '2': {
        unchecked: '/radio-unchecked-yellow.svg',
        checked: '/radio-checked-yellow.svg',
    },
    '3': {
        unchecked: '/radio-unchecked-gray.svg',
        checked: '/radio-checked-gray.svg',
    },
    '4': {
        unchecked: '/radio-unchecked-green-light.svg',
        checked: '/radio-checked-green-light.svg',
    },
    '5': {
        unchecked: '/radio-unchecked-green-dark.svg',
        checked: '/radio-checked-green-dark.svg',
    },
};

const optionLabels = {
    '1': 'Strongly Disagree',
    '2': 'Disagree',
    '3': 'Neutral',
    '4': 'Agree',
    '5': 'Strongly Agree',
};

interface QuizPage3Props {
    answers: (string | number | null)[];
    allAnswers: (string | number | null)[];
    onAnswer: (index: number, value: string | number | null) => void;
    onSubmit: () => void;
    onBack: () => void;
}

const QuizPage3: React.FC<QuizPage3Props> = ({ answers, allAnswers, onAnswer, onSubmit, onBack }) => {
    const [showWarning, setShowWarning] = useState(false);

    const answeredOnThisPage = answers.filter((a) => a !== null && a !== undefined).length;
    const allAnswered = answeredOnThisPage === 10;
    const currentAnswered = allAnswers.filter((a) => a !== null && a !== undefined).length;
    const progressPercent = Math.round((currentAnswered / 30) * 100);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="bg-[#F5F7FA] text-black p-6 md:p-10 rounded-[32px] space-y-10">
        {/* Header & Progress */}
        <div className="text-center space-y-4">
            <p className="text-base md:text-lg text-gray-700">
            Select how well each statement reflects you
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
                <span>Halaman 3 dari 3</span>
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
            {dummyQuestions.map((q, i) => {
            const selectedValue = answers[i];
            const isAnswered = selectedValue !== null && selectedValue !== undefined;

            return (
                <div
                key={q.id}
                className={`rounded-xl p-6 transition-colors text-center ${
                    isAnswered ? 'bg-[#003E85] text-white' : 'bg-[#F5F7FA] shadow-sm'
                }`}
                >
                <p className="mb-4 font-semibold">{q.text}</p>
                <div className="flex justify-between gap-2 flex-wrap sm:flex-nowrap">
                    {Object.entries(svgPaths).map(([value, icons]) => (
                    <RadioOption
                        key={value}
                        label=""
                        svgSrc={String(selectedValue) === value ? icons.checked : icons.unchecked}
                        isSelected={String(selectedValue) === value}
                        onClick={() => {
                        onAnswer(i, selectedValue === parseInt(value) ? null : parseInt(value));
                        }}
                        colorClass={isAnswered ? 'text-white' : 'text-black'}
                    />
                    ))}
                </div>
                </div>
            );
            })}
        </div>

        {/* Tombol Back & Submit */}
        <div className="flex justify-between items-center pt-6">
            <button
            onClick={onBack}
            className="bg-transparent border border-gray-400 text-gray-800 px-6 py-3 rounded-[10px] text-lg font-semibold transition duration-300 hover:bg-gray-100"
            >
            ← Back
            </button>

            <div className="flex flex-col items-end space-y-2">
            {showWarning && (
                <p className="text-red-600 text-sm text-right">
                Silakan isi semua pertanyaan sebelum submit.
                </p>
            )}
            <button
                onClick={() => {
                if (allAnswered) {
                    setShowWarning(false);
                    onSubmit();
                } else {
                    setShowWarning(true);
                }
                }}
                disabled={!allAnswered}
                className={`px-6 py-3 rounded-[10px] text-lg font-semibold transition duration-300 ${
                allAnswered
                    ? 'bg-[#FFD000] hover:brightness-110 text-[#161616]'
                    : 'bg-gray-400 text-white cursor-not-allowed'
                }`}
            >
                Submit
            </button>
            </div>
        </div>
        </div>
    );
};

export default QuizPage3;
