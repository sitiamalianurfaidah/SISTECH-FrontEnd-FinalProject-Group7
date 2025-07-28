'use client';

import { useState } from 'react';

export default function QuizPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);

    const questions = [
        { question: 'Apa kegiatan yang paling kamu sukai?', options: ['Menulis', 'Menganalisis data', 'Mendesain UI', 'Berbicara di depan umum'] },
        { question: 'Mana yang lebih kamu nikmati?', options: ['Menggambar', 'Coding', 'Riset', 'Berorganisasi'] },
        // Tambahkan lebih banyak pertanyaan sesuai kebutuhan
    ];

    const handleAnswer = (answer: string) => {
        setAnswers([...answers, answer]);
        setStep(step + 1);
    };

    if (step >= questions.length) {
        // Redirect ke hasil setelah selesai
        return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
            <h2 className="text-xl font-semibold mb-4">Terima kasih telah mengisi kuis!</h2>
            <a
            href={`/result?answers=${encodeURIComponent(JSON.stringify(answers))}`}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
            >
            Lihat Hasil
            </a>
        </div>
        );
    }

    const current = questions[step];

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-6">
        <h1 className="text-2xl font-bold mb-4">{current.question}</h1>
        <div className="grid gap-4 w-full max-w-md">
            {current.options.map((opt, index) => (
            <button
                key={index}
                onClick={() => handleAnswer(opt)}
                className="p-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
            >
                {opt}
            </button>
            ))}
        </div>
        </div>
    );
}
