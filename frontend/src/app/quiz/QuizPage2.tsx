'use client';

import React, { useEffect, useState } from 'react';
import RadioOption from '../../components/RadioOption';
import { AnswerType } from './QuizWrapper'; // Pastikan path ini sesuai

const dummyQuestions = [
    { id: 11, text: 'Saya suka mencoba hal-hal baru yang menantang.' },
    { id: 12, text: 'Saya dapat mengelola emosi saya dalam situasi sulit.' },
    { id: 13, text: 'Saya percaya diri saat berbicara di depan umum.' },
    { id: 14, text: 'Saya dapat bekerja secara mandiri dengan baik.' },
    { id: 15, text: 'Saya terbuka terhadap kritik yang membangun.' },
    { id: 16, text: 'Saya merasa bertanggung jawab terhadap keputusan saya.' },
    { id: 17, text: 'Saya senang belajar hal-hal baru setiap hari.' },
    { id: 18, text: 'Saya mampu membuat rencana jangka panjang.' },
    { id: 19, text: 'Saya terbiasa mengevaluasi hasil pekerjaan saya.' },
    { id: 20, text: 'Saya menyadari pentingnya pengembangan diri.' },
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
                <span>Halaman 2 dari 3</span>
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
                        onClick={() =>
                            onAnswer(i, isSelected ? null : [numericVal])
                        }
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
                className={`px-6 py-3 rounded-[10px] text-lg font-semibold transition duration-300 ${
                allAnswered
                    ? 'bg-[#FFD000] hover:brightness-110 text-[#161616]'
                    : 'bg-gray-400 text-white cursor-not-allowed'
                }`}
            >
                Next →
            </button>
            </div>
        </div>
        </div>
    );
};

export default QuizPage2;
