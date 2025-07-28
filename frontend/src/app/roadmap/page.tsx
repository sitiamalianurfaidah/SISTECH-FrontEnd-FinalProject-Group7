'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Step {
    title: string;
    description: string;
    }

    export default function RoadmapPage() {
    const searchParams = useSearchParams();
    const career = searchParams.get('career');
    const [steps, setSteps] = useState<Step[]>([]);

    useEffect(() => {
        const fetchRoadmap = async () => {
        try {
            const res = await fetch(`/api/roadmap?career=${career}`);
            const data = await res.json();
            setSteps(data.steps || []);
        } catch (error) {
            console.error('Failed to fetch roadmap', error);
        }
        };

        if (career) fetchRoadmap();
    }, [career]);

    return (
        <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Roadmap untuk Karier: {career}</h1>
        <div className="space-y-6">
            {steps.length > 0 ? (
            steps.map((step, index) => (
                <div key={index} className="p-6 bg-white rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-2">Step {index + 1}: {step.title}</h2>
                <p className="text-gray-700">{step.description}</p>
                </div>
            ))
            ) : (
            <p className="text-center text-gray-500">Memuat roadmap...</p>
            )}
        </div>
        </div>
    );
}
