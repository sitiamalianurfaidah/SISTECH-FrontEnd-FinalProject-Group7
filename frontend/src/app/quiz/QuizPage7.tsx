'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export const questionsPage7 = [
    {
        id: 60,
        text: 'What is your current major?',
        options: [
        'Science / STEM (e.g., Biology, Physics, Mathematics)',
        'Social Sciences / Humanities (e.g., Sociology, History, Philosophy)',
        'Language & Literature (e.g., English, Linguistics, etc.)',
        'Arts & Design (e.g., Visual Arts, DKV, Music, etc.)',
        'Business & Management (e.g., Marketing, Accounting, Finance)',
        'Engineering & Technology (e.g., Mechanical, Civil, Informatics)',
        'Health & Medicine (e.g., Nursing, Pharmacy, Public Health)',
        'Education (e.g., Teaching, Guidance Counseling)',
        'Law & Political Science',
        'Computer Science / Information Systems',
        'Psychology',
        'Agriculture, Forestry, or Marine Sciences',
        'Tourism, Hospitality, or Culinary',
        'Actuarial science',
        'Other',
        ],
        multiple: false,
    },
    {
        id: 61,
        text: 'Which areas or fields are you most interested in exploring?',
        options: [
        'Creative fields (film, art, design, music, etc.)',
        'Technology (AI, coding, software, etc.)',
        'Business & finance (startups, marketing, investing, etc.)',
        'Science & research (biology, chemistry, environment, space, etc.)',
        'Social & humanitarian fields (psychology, education, advocacy, etc.)',
        'Practical & technical work (automotive, construction, field work, etc.)',
        'Healthcare (medicine, pharmacy, therapy, etc.)',
        'Communication (public speaking, writing, media, etc.)',
        'Nature & animals (agriculture, marine life, conservation, etc.)',
        'Not sure yet / Still exploring',
        'Other',
        ],
        multiple: false,
    },
    {
        id: 62,
        text: 'What skills or abilities do you feel you have?',
        options: [
        'Communication (presenting, public speaking, writing)',
        'Creativity (design, illustration, content creation, new ideas)',
        'Logic & problem-solving',
        'Data or number analysis',
        'Leadership & team management',
        'Organization & time management',
        'Technology or programming skills',
        'Social / interpersonal skills (teamwork, empathy, listening)',
        'Practical skills (engineering, automotive, hands-on work)',
        'Foreign languages',
        'Cooking or making food products',
        'Research or deep observation',
        'Customer service or sales',
        'I’m not sure yet / Still figuring it out',
        'Other',
        ],
        multiple: true, // ini multiple
    },
    {
        id: 63,
        text: 'Are you currently in college or university?',
        options: ['Yes', 'No'],
        multiple: false,
    },
    ];

interface QuizPage7Props {
    answers: (number[] | null)[];
    allAnswers: (number[] | null)[];
    onAnswer: (index: number, value: number[] | null) => void;
    onSubmit: () => void;
    onBack: () => void;
}

const QuizPage7: React.FC<QuizPage7Props> = ({
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

    const handleSelect = (qIndex: number, val: number, multiple: boolean) => {
        const current = answers[qIndex] || [];
        const exists = current.includes(val);
        let updated: number[] = [];

        if (multiple) {
        updated = exists
            ? current.filter((v) => v !== val)
            : current.length < 3
            ? [...current, val]
            : current;
        } else {
        updated = [val];
        }

        onAnswer(qIndex, updated.length > 0 ? updated : null);
    };

    const allAnswered = answers.filter((a, i) =>
        questionsPage7[i].multiple ? a && a.length > 0 : a !== null
    ).length === questionsPage7.length;

    const totalAnswered = allAnswers.filter((a) => a && a.length > 0).length;
    const progressPercent = Math.round((totalAnswered / 64) * 100); // total 64 (60 + 4)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="bg-[#F5F7FA] text-black p-6 md:p-3 rounded-[32px] space-y-10">
        {/* Header & Progress */}
        <div className="text-center space-y-4">
            <div className="w-full max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Page 7 of 7</span>
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

        {/* Questions */}
        <div className="space-y-6">
            {questionsPage7.map((q, i) => {
            const selectedValues = answers[i] || [];
            const isAnswered = selectedValues.length > 0;
            const isOpen = openIndex === i;
            const arrowIcon = `/arrow-${isOpen ? 'up' : 'down'}-${isAnswered ? 'white' : 'black'}.svg`;

            return (
                <div
                key={q.id}
                className={`rounded-3xl px-6 py-4 transition-colors ${
                    isAnswered ? 'bg-[#003E85] text-[#F5F5F5]' : 'bg-[#F5F5F5] text-black shadow-sm border border-[#00000027]'
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
                    {q.options.map((option, idx) => {
                    const isSelected = selectedValues.includes(idx);
                    return (
                        <button
                        key={idx}
                        onClick={() => handleSelect(i, idx, q.multiple)}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
                            isSelected ? 'bg-[#003E85] text-[#F5F5F5]' : 'bg-[#F5F5F5] text-black border border-[#00000027]'
                        }`}
                        >
                        <Image
                            src={`/${isSelected ? 'radio-checked' : 'radio-unchecked'}.svg`}
                            alt="radio"
                            width={16}
                            height={16}
                        />
                        <span>{option}</span>
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

export default QuizPage7;