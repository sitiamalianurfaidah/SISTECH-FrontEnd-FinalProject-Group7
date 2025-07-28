"use client";

import React, { FC } from "react";
import QuizPage1 from "./QuizPage1";
import QuizPage2 from "./QuizPage2";
import QuizPage3 from "./QuizPage3";
import Image from "next/image";

interface QuizWrapperProps {
    answers: (string | number | null)[];
    setAnswers: React.Dispatch<React.SetStateAction<(number | string | null)[]>>;
}

const QuizWrapper: FC<QuizWrapperProps> = ({ answers, setAnswers }) => {
    const [currentPage, setCurrentPage] = React.useState(1);

    const handleSetAnswer = (
        pageIndex: number, // 0, 1, 2
        questionIndex: number, // 0-9
        value: number | string | null
    ) => {
        const globalIndex = pageIndex * 10 + questionIndex;
        const updatedAnswers = [...answers];
        updatedAnswers[globalIndex] = value;
        setAnswers(updatedAnswers);
    };

    const handleNext = () => {
        if (currentPage < 3) {
        setCurrentPage(currentPage + 1);
        }
    };

    const handleBack = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    };

    const handleSubmit = () => {
        const allAnswers = answers;
        console.log("Submitted Answers:", allAnswers);
        // TODO: kirim ke backend
    };

    return (
        <div className="min-h-screen bg-[#F5F7FA] py-10 px-4">
        <nav className="w-full px-8 py-6 flex justify-between items-center">
            <Image src="/pathmatch-logo.svg" alt="PathMatch Logo" width={150} height={30} />
        </nav>

        <div className="max-w-3xl mx-auto">
            {currentPage === 1 && (
            <QuizPage1
                answers={answers.slice(0, 10)}
                onAnswer={(i, val) => handleSetAnswer(0, i, val)}
                onNext={handleNext}
            />
            )}

            {currentPage === 2 && (
            <QuizPage2
                allAnswers={answers}
                answers={answers.slice(10, 20)}
                onAnswer={(i, val) => handleSetAnswer(1, i, val)}
                onNext={handleNext}
                onBack={handleBack}
            />
            )}

            {currentPage === 3 && (
            <QuizPage3
                allAnswers={answers}
                answers={answers.slice(20, 30)}
                onAnswer={(i, val) => handleSetAnswer(2, i, val)}
                onBack={handleBack}
                onSubmit={handleSubmit}
            />
            )}
        </div>
        </div>
    );
};

export default QuizWrapper;
