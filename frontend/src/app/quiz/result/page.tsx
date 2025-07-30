'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

interface CareerRecommendation {
    title: string;
    also_called: string[];
    what_they_do: string;
    description: string;
    on_the_job: string[];
    skills: string[];
    knowledge: string[];
    abilities: string[];
    job_outlook: {
        description: string;
        category: string;
    };
    // Properti salary dan imageUrl tetap dihapus seperti permintaan sebelumnya
}

export default function ResultPage() {
    const [loading, setLoading] = useState(true);
    const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedCareerIndex, setSelectedCareerIndex] = useState<number | null>(0); // Default ke karier pertama (index 0)
    const [activeTab, setActiveTab] = useState<'description' | 'training'>('description'); // State untuk tab Description/Training
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100); // delay kecil biar animasi jalan
    return () => clearTimeout(timer);
    }, []);
    
    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await fetch('/api/result');
                if (!res.ok) {
                    throw new Error(`Failed to fetch result: ${res.status} ${res.statusText}`);
                }
                const data = await res.json();

                if (data.recommendations && Array.isArray(data.recommendations)) {
                    setRecommendations(data.recommendations);
                } else {
                    console.warn("No recommendations found or data format is incorrect.");
                    setRecommendations([]);
                }
                
                setLoading(false);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Something went wrong');
                }
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    const selectedCareer = selectedCareerIndex !== null && recommendations.length > selectedCareerIndex
        ? recommendations[selectedCareerIndex]
        : null;

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
                <p className="text-red-500 text-lg">Error: {error}</p>
            </div>
        );
    }

    if (recommendations.length === 0) {
        return (
            <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center justify-center">
                <Navbar />
                <p className="text-gray-600 text-lg mt-12">No career recommendations available.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F7FA]">
            <Navbar />
            <div className="max-w-4xl mx-auto mt-0 px-4 py-8">
                {/* Header Section: "Top 3 Career Matching You!" dan Podium */}
                <div className="relative w-full h-[380px] flex flex-col items-center justify-start bg-[#F5F7FA] pb-0">
                    {/* Teks "Top 3 Career Matching You!" */}
                    <div className="relative z-10 text-center mb-8 pt-0"> {/* Padding top agar tidak terlalu mepet Navbar */}
                        <h1 className="relative z-10 text-4xl font-extrabold mb-10 text-[#112A46]">
                        Top 3 <span className="text-[#003E85]">Career</span> Matching You!
                        </h1>
                    </div>

                    {/* Container untuk podium karier dengan SVG */}
                    <div className="flex justify-center items-end gap-0 h-40 mt-10 mb-0">
                    {/* Career 2 */}
                    {recommendations[1] && (
                        <button
                        className={`w-[160px] h-[150px] rounded-t-2xl bg-[#003E85] text-white font-semibold transition duration-300 ${
                            selectedCareerIndex === 1 ? 'opacity-100 scale-105' : 'opacity-80 hover:opacity-100'
                            
                        }`}
                        onClick={() => setSelectedCareerIndex(1)}
                        >
                        {recommendations[1].title}
                        </button>
                    )}

                    {/* Career 1 */}
                    {recommendations[0] && (
                        <button
                        className={`w-[160px] h-[200px] rounded-t-2xl bg-[#003E85] text-white font-bold transition duration-300 ${
                            selectedCareerIndex === 0 ? 'opacity-100 scale-105' : 'opacity-80 hover:opacity-100'
                        }`}
                        onClick={() => setSelectedCareerIndex(0)}
                        >
                        {recommendations[0].title}
                        </button>
                    )}

                    {/* Career 3 */}
                    {recommendations[2] && (
                        <button
                        className={`w-[160px] h-[150px] rounded-t-2xl bg-[#003E85] text-white font-semibold transition duration-300 ${
                            selectedCareerIndex === 2 ? 'opacity-100 scale-105' : 'opacity-80 hover:opacity-100'
                        }`}
                        onClick={() => setSelectedCareerIndex(2)}
                        >
                        {recommendations[2].title}
                        </button>
                    )}
                    </div>
                </div>

                {/* Description / Training Tabs menggunakan SVG */}
                <div className="flex justify-center mt-0 gap-4">
                <button
                    onClick={() => setActiveTab('description')}
                    className={`px-6 py-2 rounded-full font-semibold border transition duration-300 ${
                    activeTab === 'description'
                        ? 'bg-[#FFD000] text-white border-yellow-400'
                        : 'bg-white text-gray-800 border-gray-300 hover:bg-[#FFF5CC]'
                    }`}
                >
                    Description
                </button>
                <button
                    onClick={() => setActiveTab('training')}
                    className={`px-6 py-2 rounded-full font-semibold border transition duration-300 ${
                    activeTab === 'training'
                        ? 'bg-[#FFD000] text-white border-yellow-400'
                        : 'bg-white text-gray-800 border-gray-300 hover:bg-[#FFF5CC]'
                    }`}
                >
                    Training
                </button>
                </div>
                {/* Main Content Area - Hanya tampilkan jika selectedCareer ada */}
                {selectedCareer && (
                    <div className="bg-white p-8 rounded-lg shadow-md mb-8 mt-10"> {/* Menambahkan margin-top */}
                        {/* Konten untuk tab Description */}
                        {activeTab === 'description' && (
                            <div className="space-y-8">
                                {/* Deskripsi Umum Karier */}
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedCareer.title}</h2>
                                    <div className="bg-[#FFFAE6] p-4 rounded-md">
                                        <p className="text-lg text-gray-700 leading-relaxed">
                                            <strong className="font-semibold">{selectedCareer.title} </strong>
                                            adalah {selectedCareer.what_they_do}. {selectedCareer.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Deskripsi Pekerjaan (On The Job) */}
                                <div className="bg-[#FFFAE6] p-6 rounded-md shadow-inner">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">Deskripsi Pekerjaan</h3>
                                    <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
                                        {selectedCareer.on_the_job.map((task, idx) => (
                                            <li key={idx}>{task}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Kenapa Karier Ini Cocok Untukmu? */}
                                <div className="bg-[#FFFAE6] p-6 rounded-md shadow-inner">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">Kenapa Karier Ini Cocok Untukmu?</h3>
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        Kamu menyukai ilmu pengetahuan, memiliki empati yang tinggi, dan senang membantu orang lain secara langsung, maka menjadi <strong className="font-semibold">{selectedCareer.title}</strong> adalah pilihan yang tepat. Karier ini membutuhkan ketelitian, keseksamaan dan kemampuan komunikasi yang baik, yang sesuai dengan hasil quismu.
                                    </p>
                                </div>

                                {/* Prospek Kedepan */}
                                <div className="bg-[#FFFAE6] p-6 rounded-md shadow-inner">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">Prospek Kedepan</h3>
                                    <p className="text-lg text-gray-700 mb-2">{selectedCareer.job_outlook.description}</p>
                                </div>
                            </div>
                        )}

                        {/* Konten untuk tab Training (Placeholder) */}
                        {activeTab === 'training' && (
                            <div className="bg-[#F0F8FF] p-6 rounded-lg shadow-inner text-center">
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">Informasi Pelatihan untuk {selectedCareer.title}</h3>
                                <p className="text-lg text-gray-700">
                                    Informasi pelatihan terkait karier ini akan ditampilkan di sini.
                                </p>
                                {/* Anda bisa menambahkan detail pelatihan di sini, mungkin dari properti baru di CareerRecommendation */}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}