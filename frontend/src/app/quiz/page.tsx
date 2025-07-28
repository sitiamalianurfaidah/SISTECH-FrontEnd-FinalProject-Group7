'use client';

import React, { useState } from 'react';
import QuizWrapper from './QuizWrapper';

export default function QuizPage() {
    const totalQuestions = 30;

    // Array dengan panjang 30, semua diisi null (belum dijawab)
    const [answers, setAnswers] = useState<(string | number | null)[]>(Array(totalQuestions).fill(null));

    return (
        <QuizWrapper
        answers={answers}
        setAnswers={setAnswers}
        />
    );
}
