'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import CareerTrainingSection from '@/components/CareerTrainingSection';

interface CareerRecommendation {
    title: string;
    also_called: string[];
    what_they_do: string;
    description: string;
    on_the_job: string[];
    skills: string[];
    knowledges: string[];
    abilities: string[];
    job_outlook: {
        description: string;
        category: string;
    };
}

export default function ResultPage() {
    const [loading, setLoading] = useState(true);
    const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedCareerIndex, setSelectedCareerIndex] = useState<number | null>(0); // Default ke karier pertama (index 0)
    const [activeTab, setActiveTab] = useState<'description' | 'training'>('description'); // State untuk tab Description/Training
    const [education, setEducation] = useState([]);
    const [articles, setArticles] = useState([]);
    const [courses, setCourses] = useState([]);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
    const fetchFromLocalStorage = () => {
        try {
            const stored = localStorage.getItem("recommendations");
            if (stored) {
                const parsed = JSON.parse(stored);

                if (parsed.recommendations && Array.isArray(parsed.recommendations)) {
                    setRecommendations(parsed.recommendations);
                } else {
                    console.warn("Data recommendations tidak ditemukan atau format salah");
                    setRecommendations([]);
                }
            } else {
                console.warn("Tidak ada data recommendations disimpan");
                setRecommendations([]);
            }

            // Ambil dan set data lainnya
            const educationData = JSON.parse(localStorage.getItem("education") || "[]");
            setEducation(educationData);

            const articlesData = JSON.parse(localStorage.getItem("articles") || "[]");
            setArticles(articlesData);

            const coursesData = JSON.parse(localStorage.getItem("courses") || "[]");
            setCourses(coursesData);

            const jobsData = JSON.parse(localStorage.getItem("jobs") || "[]");
            setJobs(jobsData);

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Gagal memuat data dari localStorage.");
            }

            // Reset semua jika error
            setRecommendations([]);
            setEducation([]);
            setArticles([]);
            setCourses([]);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    fetchFromLocalStorage();
}, []);

    const formatList = (list?: string[], max = 2): string => {
        if (!Array.isArray(list)) return "";
        return list.slice(0, max).map((item) => item.toLowerCase()).join(", ");
    };

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
        <div className="min-h-screen bg-[#F5F7FA] mt-0">
            <Navbar />
            <div className="max-w-4xl mx-auto mt-0 px-4 py-8">
                {/* Header Section: "Top 3 Career Matching You!" dan Podium */}
                <div className="relative w-full h-[380px] flex flex-col items-center justify-start bg-[#F5F7FA] pb-0">
                    {/* Lightning kiri */}
                    <div className="absolute left-[-60] xl:left-[-200px] bottom-50 xl:bottom-30 z-0 shadow-outer">
                    <Image src="/left-lightning.svg" alt="lightning" width={190} height={190} />
                    </div>

                    {/* Lightning kanan */}
                    <div className="absolute right-[-60] xl:right-[-200px] bottom-65 xl:bottom-65 z-0">
                    <Image src="/right-lightning.svg" alt="lightning" width={180} height={180} />
                    </div>
                    {/* Teks "Top 3 Career Matching You!" */}
                    <div className="relative z-10 text-center ml-30 xl:ml-50 mr-30 xl:mr-50 mt-0 mb-7 pt-0"> {/* Padding top agar tidak terlalu mepet Navbar */}
                        <h1 className="relative z-10 text-4xl xl:text-5xl font-extrabold mb-8 text-[#112A46]">
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
                {/* Description / Training Tabs Card */}
                <div className="flex justify-center mt-5 xl:mt-2">
                <div className="bg-white shadow-md rounded-full px-3 py-2 flex gap-3">
                    <button
                    onClick={() => setActiveTab('description')}
                    className={`px-20 py-2 rounded-full font-semibold transition duration-300
                        ${activeTab === 'description'
                        ? 'bg-[#FFD000] text-[#000000]'
                        : 'text-[#000000] hover:bg-[#FFF5CC]'
                        }`}
                    >
                    Description
                    </button>
                    <button
                    onClick={() => setActiveTab('training')}
                    className={`px-20 py-2 rounded-full font-semibold transition duration-300
                        ${activeTab === 'training'
                        ? 'bg-[#FFD000] text-[#000000]'
                        : 'text-[#000000] hover:bg-[#FFF5CC]'
                        }`}
                    >
                    Training
                    </button>
                </div>
                </div>
                {/* Main Content Area - Hanya tampilkan jika selectedCareer ada */}
                {selectedCareer && (
                    <div className="bg-[#F5F7FA] p-8 pl-10 xl:pl-0 pr-10 xl:pr-0 rounded-lg mb-0 mt-5"> {/* Menambahkan margin-top */}
                        {/* Content for Description tab */}
                        {activeTab === 'description' && (
                        <div className="space-y-8">
                            {/* Image Section */}
                            <div className="flex justify-center mt-[20px] mb-15"> {/* Adjust margin-top to position correctly */}
                                <Image
                                    src="/cover.jpg" // Replace with the actual path to your doctor image
                                    alt="Cover"
                                    width={1000} // Adjust width as needed
                                    height={700} // Adjust height as needed
                                    objectFit="cover" // Cover the area, cropping if necessary
                                    className="rounded-xl shadow-lg" // Add some styling
                                />
                            </div>

                            {/* Career Overview */}
                            <div>
                            <h2 className="text-3xl font-bold text-[#002C5E] mb-3">{selectedCareer.title}</h2>
                            <div className="bg-[#FFFAE6] p-6 rounded-2xl shadow-inner shadow-[#fff1b0c3]">
                                <p className="text-lg text-gray-700 leading-relaxed">
                                {selectedCareer.what_they_do} {selectedCareer.description}
                                </p>
                            </div>
                            </div>

                            {/* Level and Gaji per Bulan sections */}
                                <div className="grid grid-cols-2 gap-8">
                                    {/* Level */}
                                    <div>
                                        <h2 className="text-3xl font-bold text-center text-[#002C5E] mb-0">Level</h2>
                                        <div className="p-6 rounded-2xl space-y-3 text-center">
                                            <div className="text-lg text-gray-700">Fresh Graduate</div>
                                            <div className="text-lg text-gray-700">Dokter Umum Senior</div>
                                            <div className="text-lg text-gray-700">Dokter Spesialis</div>
                                        </div>
                                    </div>

                                    {/* Gaji per Bulan */}
                                    <div>
                                        <h2 className="text-3xl font-bold text-center text-[#002C5E] mb-0">Salary</h2>
                                        <div className="p-6 rounded-2xl space-y-3 text-center">
                                            <div className="text-lg text-gray-700">Rp6.000.000 - Rp10.000.000</div>
                                            <div className="text-lg text-gray-700">Rp12.000.000 - Rp25.000.000</div>
                                            <div className="text-lg text-gray-700">≥ Rp30.000.000</div>
                                        </div>
                                    </div>
                                </div>

                            {/* On The Job Description */}
                            <h2 className="text-3xl font-bold text-[#002C5E] mb-3">Job Description</h2>
                            <div className="bg-[#FFFAE6] p-6 rounded-2xl shadow-inner shadow-[#fff1b0c3]">
                            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
                                {selectedCareer.on_the_job.map((task, idx) => (
                                <li key={idx}>{task}</li>
                                ))}
                            </ul>
                            </div>

                            {/* Why This Career Suits You */}
                            <h2 className="text-3xl font-bold text-[#002C5E] mb-3">Why This Career Suits You</h2>
                            <div className="bg-[#FFFAE6] p-6 rounded-md shadow-inner shadow-[#fff1b0c3]">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Based on your results, you are likely to thrive in a career that values {formatList(selectedCareer?.skills)} and relies heavily on your {formatList(selectedCareer?.abilities)}. Your strong foundation in {formatList(selectedCareer?.knowledges)} aligns perfectly with the role of a <strong>{selectedCareer?.title}</strong>, making this a great fit for your strengths and interests.
                            </p>

                            </div>

                            {/* Future Outlook */}
                            <h2 className="text-3xl font-bold text-[#002C5E] mb-3">Future Outlook</h2>
                            <div className="bg-[#FFFAE6] p-6 rounded-2xl shadow-inner shadow-[#fff1b0c3]">
                            <p className="text-lg text-gray-700 mb-2">{selectedCareer.job_outlook.description}</p>
                            </div>
                        </div>
                        )}
                        {/* Konten untuk tab Training (Placeholder) */}
                        {activeTab === 'training' && (
                            <div className="bg-[#F5F7FA] p-6 rounded-2xl text-center">
                            <CareerTrainingSection
                                careerTitle={selectedCareer.title}
                                recommendations={education}
                                articles={articles}
                                courses={courses}
                                jobs={jobs}
                            />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}