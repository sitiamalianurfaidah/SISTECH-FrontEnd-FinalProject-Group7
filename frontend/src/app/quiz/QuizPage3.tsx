'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const dummyQuestions = [
    { id: 21, text: 'Bidang pekerjaan yang paling menarik bagi saya' },
    { id: 22, text: 'Topik yang sering saya cari atau baca' },
    { id: 23, text: 'Aktivitas favorit saat waktu luang' },
    { id: 24, text: 'Jenis tugas yang paling membuat saya antusias' },
    { id: 25, text: 'Lingkungan kerja ideal bagi saya' },
    { id: 26, text: 'Cara saya menyelesaikan masalah yang kompleks' },
    { id: 27, text: 'Saya merasa puas ketika' },
    { id: 28, text: 'Peran yang sering saya ambil dalam tim' },
    { id: 29, text: 'Saya lebih suka belajar melalui' },
    { id: 30, text: 'Saya merasa paling produktif saat' },
];

interface QuizPage3Props {
    answers: (number[] | null)[];
    allAnswers: (number[] | null)[];
    onAnswer: (index: number, value: number[] | null) => void;
    onSubmit: () => void;
    onBack: () => void;
}

const QuizPage3: React.FC<QuizPage3Props> = ({
    answers,
    allAnswers,
    onAnswer,
    onSubmit,
    onBack,
    }) => {
    const [showWarning, setShowWarning] = useState(false);

    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const toggleDropdown = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    const handleSelect = (qIndex: number, val: number) => {
        const current = answers[qIndex] || [];
        const exists = current.includes(val);

        const updated = exists
        ? current.filter((v) => v !== val)
        : [...current, val];

        onAnswer(qIndex, updated.length > 0 ? updated : null);
    };

    const answeredOnThisPage = answers.filter((a) => a && a.length > 0).length;
    const allAnswered = answeredOnThisPage === 10;
    const currentAnswered = allAnswers.filter((a) =>Array.isArray(a) ? a.length > 0 : a !== null).length;
    const progressPercent = Math.round((currentAnswered / 30) * 100);


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="bg-[#F5F7FA] text-black p-6 md:p-3 rounded-[32px] space-y-10">
        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mt-0">
            <span>Halaman 3 dari 3</span>
            <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div
                className="bg-[#FFD000] h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
            />
            </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
            {dummyQuestions.map((q, i) => {
            const selectedValues = answers[i] || [];
            const isAnswered = selectedValues.length > 0;
            const isOpen = openIndex === i;

            const arrowIcon = `/arrow-${isOpen ? 'up' : 'down'}-${isAnswered ? 'white' : 'black'}.svg`;

            return (
                <div
                key={q.id}
                className={`rounded-xl px-6 py-4 transition-colors ${
                    isAnswered ? 'bg-[#003E85] text-white' : 'bg-white text-black shadow-sm'
                }`}
                >
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleDropdown(i)}
                >
                    <p className="font-semibold text-center w-full">{q.text}</p>
                    <Image src={arrowIcon} alt="Toggle" width={20} height={20} />
                </div>
                <div
                className={`transition-all duration-500 overflow-hidden mt-2 space-y-2 ${
                    isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
                >
                {Array.from({ length: 7 }).map((_, idx) => {
                    const isSelected = selectedValues.includes(idx);
                    return (
                    <button
                        key={idx}
                        onClick={() => handleSelect(i, idx)}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
                        isSelected ? 'bg-[#003E85] text-white' : 'bg-gray-100 text-black'
                        }`}
                    >
                        <Image
                        src={`/${isSelected ? 'radio-checked' : 'radio-unchecked'}.svg`}
                        alt="radio"
                        width={16}
                        height={16}
                        />
                        <span>Choice {idx + 1}</span>
                    </button>
                    );
                })}
                </div>
                </div>
            );
            })}
        </div>

        {/* Buttons */}
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
                className={`px-15 py-2 rounded-[10px] text-lg font-semibold transition duration-300 ${
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
