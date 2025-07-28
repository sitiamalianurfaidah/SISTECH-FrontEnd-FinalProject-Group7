'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface CareerResult {
    career: string;
    description: string;
}

export default function ResultPage() {
    const searchParams = useSearchParams();
    const answersParam = searchParams.get('answers');
    const [result, setResult] = useState<CareerResult | null>(null);

    useEffect(() => {
        const fetchResult = async () => {
        try {
            const response = await fetch('/api/predict-career', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers: JSON.parse(answersParam || '[]') }),
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error fetching result:', error);
        }
        };

        if (answersParam) fetchResult();
    }, [answersParam]);

    if (!result) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-4">Hasil Kariermu ✨</h1>
        <h2 className="text-xl text-blue-600 font-semibold mb-2">{result.career}</h2>
        <p className="text-gray-700 mb-6 text-center max-w-lg">{result.description}</p>
        <a
            href={`/roadmap?career=${encodeURIComponent(result.career)}`}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition"
            >
            Lihat Roadmap
        </a>
        </div>
    );
}
