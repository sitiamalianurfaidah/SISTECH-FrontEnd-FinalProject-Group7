"use client";

import React, { FC, useState } from "react";
import QuizPage1 from "./QuizPage1";
import QuizPage2 from "./QuizPage2";
import QuizPage3 from "./QuizPage3";
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
        "R", "R", "R", "R", "R",
        "I", "I", "I", "I", "I",
        "A", "A", "A", "A", "A",
        "S", "S", "S", "S", "S",
        "E", "E", "E", "E", "E",
        "C", "C", "C", "C", "C",
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
        if (currentPage < 3) {
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
        R: 0, I: 0, A: 0, S: 0, E: 0, C: 0,
        };

        answers.forEach((answer, idx) => {
        const type = riasecTypes[idx];
        if (Array.isArray(answer)) {
            const sum = answer.reduce((acc, cur) => acc + cur, 0);
            scores[type] += sum;
        }
        });

        return scores;
    };

    const handleSubmit = async () => {
        const scores = calculateRiasecScores();

        try {
        const res = await fetch("/api/recommend-careers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(scores),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Backend response:", data);

        // Simpan data ke localStorage (opsional)
        localStorage.setItem("riasecScores", JSON.stringify(scores));
        localStorage.setItem("recommendations", JSON.stringify(data));

        // Redirect ke halaman hasil
        router.push("/result");
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
                onBack={handleBack}
                onSubmit={handleSubmit}
            />
            )}
        </div>
        </div>
    );
};

export default QuizWrapper;
