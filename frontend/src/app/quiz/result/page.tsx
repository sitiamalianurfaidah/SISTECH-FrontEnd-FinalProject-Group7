'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

interface CareerRecommendation {
    title: string;
    description: string;
}

export default function ResultPage() {
    const [loading, setLoading] = useState(true);
    const [riasec, setRiasec] = useState<Record<string, number> | null>(null);
    const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
        try {
            const res = await fetch('/api/result'); // Ganti jika endpoint-nya beda
            if (!res.ok) throw new Error('Failed to fetch result');
            const data = await res.json();

            setRiasec(data.riasec);
            setRecommendations(data.recommendations || []);
            setLoading(false);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Something went wrong');
            }
        }
        };

        fetchResults();
    }, []);

    if (loading) {
        return (
        <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
            <p className="text-gray-600 text-lg">Loading your result...</p>
        </div>
        );
    }

    if (error) {
        return (
        <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
            <p className="text-red-500 text-lg">{error}</p>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F7FA]">
        <Navbar />
        <div className="max-w-3xl mx-auto mt-12 px-4">
            <h1 className="text-3xl font-bold text-center mb-6">Your RIASEC Result</h1>

            {riasec ? (
            <div className="mb-8 text-lg text-center text-gray-800">
                <p className="mb-2">Your personality scores:</p>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                {Object.entries(riasec).map(([type, score]) => (
                    <div key={type} className="bg-white shadow-md rounded p-4 text-center">
                    <p className="font-bold text-xl">{type}</p>
                    <p className="text-gray-600">{score}</p>
                    </div>
                ))}
                </div>
            </div>
            ) : (
            <p className="text-center text-red-500">No RIASEC scores found.</p>
            )}

            {recommendations.length > 0 && (
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-center">Career Recommendations</h2>
                <div className="space-y-4">
                {recommendations.map((rec, i) => (
                    <div key={i} className="bg-white shadow p-4 rounded-md">
                    <h3 className="text-xl font-bold">{rec.title}</h3>
                    <p className="text-gray-700 mt-1">{rec.description}</p>
                    </div>
                ))}
                </div>
            </div>
            )}
        </div>
        </div>
    );
}
