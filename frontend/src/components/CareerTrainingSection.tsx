'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
    EducationRecommendation,
    ArticleRecommendation,
    CourseRecommendation,
    JobRecommendation,
} from '@/app/api/result/route';

interface TrainingDataProps {
    careerTitle: string;
    recommendations: EducationRecommendation[];
    articles: ArticleRecommendation[];
    courses: CourseRecommendation[];
    jobs: JobRecommendation[];
}

const CareerTrainingSection = ({
    recommendations,
    articles,
    courses,
    jobs,
    }: TrainingDataProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleDropdown = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    const sections = [
    {
        title: 'Step 1: Pilihan Jurusan',
        content: (
        <ul className="space-y-3 text-[#003E85]">
            {recommendations.map((item, index) => (
            <li
                key={index}
                className="pb-3 border-b border-[#00000027] last:border-none"
            >
                <strong>{item.program}</strong> at {item.university}
            </li>
            ))}
        </ul>
        ),
    },
    {
        title: 'Step 2: Artikel Training',
        content: (
        <ul className="space-y-4 text-[#003E85]">
            {articles.map((article, index) => (
            <li
                key={index}
                className="pb-3 border-b border-[#00000027] last:border-none"
            >
                <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#003E85] font-semibold underline"
                >
                {article.title}
                </a>
                <p className="text-sm text-[#4F647A]">{article.snippet}</p>
            </li>
            ))}
        </ul>
        ),
    },
    {
        title: 'Step 3: Sertifikasi',
        content: (
        <ul className="space-y-4 text-[#003E85]">
            {courses.map((course, index) => (
            <li
                key={index}
                className="pb-3 border-b border-[#00000027] last:border-none"
            >
                <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#003E85] font-semibold underline"
                >
                {course.title}
                </a>{' '}
                – {course.partner}
                <p className="text-sm text-[#4F647A]">{course.description}</p>
            </li>
            ))}
        </ul>
        ),
    },
    {
        title: 'Step 4: Lowongan Pekerjaan',
        content: (
        <ul className="space-y-4 text-[#003E85]">
            {jobs.map((job, index) => (
            <li
                key={index}
                className="pb-3 border-b border-[#00000027] last:border-none"
            >
                <p className="font-semibold">{job.title} – {job.company_name}</p>
                <p className="text-sm text-[#4F647A]">{job.location}</p>
                <p className="text-sm text-[#4F647A]">
                {job.responsibilities?.slice(0, 2).join(', ')}...
                </p>
            </li>
            ))}
        </ul>
        ),
    },
    ];

    return (
    <div className="space-y-6">
        {sections.map((section, index) => {
        const isOpen = openIndex === index;
        const arrowIcon = `/arrow-${isOpen ? 'up' : 'down'}-${isOpen ? 'black' : 'white'}.svg`;

        return (
            <div
            key={index}
            className={`rounded-xl px-6 py-4 transition-colors 
                ${isOpen 
                ? 'bg-[#F5F5F5] text-[#003E85] border border-[#00000027]' 
                : 'bg-[#003E85] text-[#F5F5F5] shadow-sm'}    
            `}
            >
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleDropdown(index)}
            >
                {!isOpen && (
                <p className="font-semibold text-center w-full">{section.title}</p>
                )}
                <Image src={arrowIcon} alt="toggle" width={20} height={20} />
            </div>

            <div
                className={`transition-all duration-500 overflow-hidden mt-2 ${
                isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="pt-2">{section.content}</div>
            </div>
            </div>
        );
        })}
    </div>
    );
};

export default CareerTrainingSection;
