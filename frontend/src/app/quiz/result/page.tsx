'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

interface CareerRecommendation {
    code: string;
    title: string;
    what_they_do: string;
    skills: string[];
    abilities: string[];
    knowledges: string[];
    job_outlook: {
        description: string;
        category: string;
    };
}

export default function ResultPage() {
    const [loading, setLoading] = useState(true);
    const [riasec, setRiasec] = useState<Record<string, number> | null>(null);
    const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
        try {
            const res = await fetch('/api/result');
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
        <div className="max-w-4xl mx-auto mt-12 px-4">
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
                <div className="space-y-6">
                {recommendations.map((rec, i) => (
                    <div key={i} className="bg-white shadow p-6 rounded-md">
                    <h3 className="text-xl font-bold mb-1">{rec.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{rec.code}</p>
                    <p className="text-gray-700 mb-3">{rec.what_they_do}</p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                        <p className="font-semibold mb-1 text-gray-800">Skills</p>
                        <ul className="list-disc list-inside text-gray-600">
                            {rec.skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                            ))}
                        </ul>
                        </div>
                        <div>
                        <p className="font-semibold mb-1 text-gray-800">Abilities</p>
                        <ul className="list-disc list-inside text-gray-600">
                            {rec.abilities.map((ability, index) => (
                            <li key={index}>{ability}</li>
                            ))}
                        </ul>
                        </div>
                        <div>
                        <p className="font-semibold mb-1 text-gray-800">Knowledge</p>
                        <ul className="list-disc list-inside text-gray-600">
                            {rec.knowledges.map((knowledge, index) => (
                            <li key={index}>{knowledge}</li>
                            ))}
                        </ul>
                        </div>
                    </div>

                    <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3">
                        <p className="text-sm text-blue-800 font-semibold">Job Outlook</p>
                        <p className="text-gray-700">{rec.job_outlook.description}</p>
                        <p className="text-xs text-blue-600 italic">Category: {rec.job_outlook.category}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            )}
        </div>
        </div>
    );
}
