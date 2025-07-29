"use client";

import React, { FC, useState } from "react";
import QuizPage1 from "./QuizPage1";
import QuizPage2 from "./QuizPage2";
import QuizPage3 from "./QuizPage3";
import Navbar from '@/components/Navbar'; 

// Define consistent answer type
export type AnswerType = number[] | null;

interface QuizWrapperProps {
    answers: AnswerType[];
    setAnswers: React.Dispatch<React.SetStateAction<AnswerType[]>>;
    }

const QuizWrapper: FC<QuizWrapperProps> = ({ answers, setAnswers }) => {
    const [currentPage, setCurrentPage] = useState(1);

const handleSetAnswer = (
    pageIndex: number,
    questionIndex: number,
    value: AnswerType
    ) => {
        const globalIndex = pageIndex * 10 + questionIndex;
        const updatedAnswers = [...answers];
        updatedAnswers[globalIndex] = value;
        setAnswers(updatedAnswers);
    };

const handleNext = () => {
        if (currentPage < 3) {
        setCurrentPage((prev) => prev + 1);
        }
    };

const handleBack = () => {
        if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
        }
    };

const handleSubmit = () => {
        console.log("Submitted Answers:", answers);
        // TODO: Kirim ke backend di sini
    };

return (
    <div className="min-h-screen bg-[#F5F7FA]">
        <Navbar />
        <div className="max-w-3xl mx-auto">
            {currentPage === 1 && (
            <QuizPage1
                allAnswers={answers}
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
