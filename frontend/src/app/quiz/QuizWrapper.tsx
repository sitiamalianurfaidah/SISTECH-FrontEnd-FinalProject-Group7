"use client";

import React, { FC, useState } from "react";
import QuizPage1 from "./QuizPage1";
import QuizPage2 from "./QuizPage2";
import QuizPage3 from "./QuizPage3";
import QuizPage4 from "./QuizPage4";
import QuizPage5 from "./QuizPage5";
import QuizPage6 from "./QuizPage6";
import QuizPage7 from "./QuizPage7"; // multiple choice page
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export type AnswerType = number[] | null;

interface QuizWrapperProps {
    answers: AnswerType[];
    setAnswers: React.Dispatch<React.SetStateAction<AnswerType[]>>;
}

const QuizWrapper: FC<QuizWrapperProps> = ({ answers, setAnswers }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();

    const riasecTypes = [
        ...Array(10).fill("R"),
        ...Array(10).fill("I"),
        ...Array(10).fill("A"),
        ...Array(10).fill("S"),
        ...Array(10).fill("E"),
        ...Array(10).fill("C"),
    ];

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
        if (currentPage < 7) {
        setCurrentPage((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
        }
    };

    const calculateRiasecScores = (): Record<string, number> => {
        const scores: Record<string, number> = {
        R: 0,
        I: 0,
        A: 0,
        S: 0,
        E: 0,
        C: 0,
        };

        answers.forEach((answer, idx) => {
        const type = riasecTypes[idx];
        if (Array.isArray(answer) && type) {
            const sum = answer.reduce((acc, cur) => acc + cur, 0);
            scores[type] += sum;
        }
        });

        return scores;
    };

    const handleSubmit = async () => {
        const scores = calculateRiasecScores();

        try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
            throw new Error("API URL is not defined in environment variables.");
        }

        const res = await fetch(`${apiUrl}/recommend-careers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(scores),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Backend response:", data);

        localStorage.setItem("riasecScores", JSON.stringify(scores));
        localStorage.setItem("recommendations", JSON.stringify(data));

        router.push("/quiz/result");
        } catch (error) {
        console.error("Failed to submit scores", error);
        }
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
                onNext={handleNext}
                onBack={handleBack}
            />
            )}
            {currentPage === 4 && (
            <QuizPage4
                allAnswers={answers}
                answers={answers.slice(30, 40)}
                onAnswer={(i, val) => handleSetAnswer(3, i, val)}
                onNext={handleNext}
                onBack={handleBack}
            />
            )}
            {currentPage === 5 && (
            <QuizPage5
                allAnswers={answers}
                answers={answers.slice(40, 50)}
                onAnswer={(i, val) => handleSetAnswer(4, i, val)}
                onNext={handleNext}
                onBack={handleBack}
            />
            )}
            {currentPage === 6 && (
            <QuizPage6
                allAnswers={answers}
                answers={answers.slice(50, 60)}
                onAnswer={(i, val) => handleSetAnswer(5, i, val)}
                onNext={handleNext}
                onBack={handleBack}
            />
            )}
            {currentPage === 7 && (
            <QuizPage7
                allAnswers={answers}
                answers={answers.slice(60, 64)}
                onAnswer={(i, val) => handleSetAnswer(6, i, val)}
                onBack={handleBack}
                onSubmit={handleSubmit}
            />
            )}
        </div>
        </div>
    );
};

export default QuizWrapper;
