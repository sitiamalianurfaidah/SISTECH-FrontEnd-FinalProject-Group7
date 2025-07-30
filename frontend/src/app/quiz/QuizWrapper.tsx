"use client";

import React, { FC, useState } from "react";
import QuizPage1 from "./QuizPage1";
import QuizPage2 from "./QuizPage2";
import QuizPage3 from "./QuizPage3";
import QuizPage4 from "./QuizPage4";
import QuizPage5 from "./QuizPage5";
import QuizPage6 from "./QuizPage6";
import QuizPage7 from "./QuizPage7"; // multiple choice page
import { questionsPage7 } from "./QuizPage7";
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
        const confirmSubmit = window.confirm("Are you sure you want to send the quiz now?");
        if (!confirmSubmit) {
            return; // kalau user cancel, hentikan proses submit
        }

        const scores = calculateRiasecScores();

        const majorOptions = questionsPage7[0].options;
        const interestOptions = questionsPage7[1].options;
        const skillsOptions = questionsPage7[2].options;
        const highSchoolAnswer = answers[63]?.[0];

        const majorIndex = answers[60]?.[0];
        const major = majorIndex !== undefined && majorIndex < majorOptions.length
            ? majorOptions[majorIndex]
            : "";

        const interests = (answers[61] || [])
            .filter((i) => i < interestOptions.length)
            .map((i) => interestOptions[i])
            .join(", ");

        const skills = (answers[62] || [])
            .filter((i) => i < skillsOptions.length)
            .map((i) => skillsOptions[i])
            .join(", ");

        const payloadCareer = {
            request_id: Date.now(),
            in_highschool: highSchoolAnswer === 0,
            major,
            interests,
            skills,
            r: scores["R"] || 0,
            i: scores["I"] || 0,
            a: scores["A"] || 0,
            s: scores["S"] || 0,
            e: scores["E"] || 0,
            c: scores["C"] || 0,
        };

        const textQueryPayload = {
            request_id: payloadCareer.request_id,
            query: `${major} ${skills} ${interests}`.trim() || "career query", // fallback kalau kosong
        };

        try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
            throw new Error("API URL is not defined in environment variables.");
        }

        console.log("Payload yang dikirim:", payloadCareer);

        const res = await fetch(`${apiUrl}/recommend-careers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payloadCareer),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const careerData = await res.json();
        console.log("Backend response:", careerData);

        const educationRes = await fetch(`${apiUrl}/recommend-programs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(textQueryPayload),
        });
        const educationData = await educationRes.json();
        console.log("Backend response:", educationData);

        const articlesRes = await fetch(`${apiUrl}/get-job-articles`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(textQueryPayload),
        });
        const articlesData = await articlesRes.json();
        console.log("Backend response:", articlesData);

        const coursesRes = await fetch(`${apiUrl}/recommend-courses`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(textQueryPayload),
        });
        const coursesData = await coursesRes.json();
        console.log("Backend response:", coursesData);

        const jobsRes = await fetch(`${apiUrl}/recommend-jobs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(textQueryPayload),
        });
        const jobsData = await jobsRes.json();
        console.log("Backend response:", jobsData);

        localStorage.setItem("riasecScores", JSON.stringify(scores));
        localStorage.setItem("recommendations", JSON.stringify(careerData));
        localStorage.setItem("education", JSON.stringify(educationData.recommendations));
        localStorage.setItem("articles", JSON.stringify(articlesData.articles));
        localStorage.setItem("courses", JSON.stringify(coursesData.recommendations.courses)); 
        localStorage.setItem("jobs", JSON.stringify(jobsData.recommendations));

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
