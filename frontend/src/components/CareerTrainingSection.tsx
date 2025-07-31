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

    const toTitleCase = (str: string) =>
        str.replace(/\w\S*/g, (txt) =>
            txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
    );

    const sections = [
    {
        title: 'Step 1: Academic Major',
        content: (
        <ul className="space-y-3 text-[#003E85]">
            {recommendations.map((item, index) => (
            <li key={index} className="flex items-start gap-3 pb-3 border-b border-[#00000027] last:border-none">
            <svg className="w-2.5 h-2.5 mt-2 shadow-xl shadow-amber-900 text-[#FFD000]" viewBox="0 0 10 10" fill="currentColor">
                <circle cx="5" cy="5" r="5" />
            </svg>
            <div>
                <strong>{toTitleCase(item.program)}</strong> at {toTitleCase(item.university)}
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded ml-1">
                    {item.rank === 999 ? '#999+' : `#${item.rank}`}
                </span>
            </div>
            </li>

            ))}
        </ul>
        ),
    },
    {
        title: 'Step 2: Training',
        content: (
        <ul className="space-y-4 text-[#003E85]">
            {articles.map((article, index) => (
            <li key={index} className="flex gap-3 items-start pb-3 border-b border-[#00000027] last:border-none">
            <svg className="w-2.5 h-2.5 mt-[8px] shadow-xl shadow-amber-900 text-[#FFD000] shrink-0" viewBox="0 0 10 10" fill="currentColor">
                <circle cx="5" cy="5" r="5" />
            </svg>
            <div>
                <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#003E85] text-xl font-bold hover:underline hover:text-[#002e60] transition-colors duration-200"
                >
                {article.title}
                </a>
                <p className="text-sm text-[#003E85] mt-1">{article.snippet}</p>
            </div>
            </li>
            ))}
        </ul>
        ),
    },
    {
    title: 'Step 3: Certification',
    content: (
        <ul className="space-y-6 text-[#003E85]">
        {courses.map((course, index) => (
            <li key={index} className="flex gap-3 items-start border-b border-[#00000027] pb-6 last:border-none">
            {/* Content */}
            <div className="space-y-2">
                {/* Title + Partner */}
                <div>
                <a
                    href={course.marketing_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#003E85] text-xl font-bold hover:underline hover:text-[#002E60] transition-colors duration-200"
                >
                    {course.title}
                </a>
                <div className="text-md font-semibold text-[#4F647A] mt-1">
                    by {course.partner}
                </div>
                <span className="bg-[#FFD000] text-[#003E85] px-2 py-0.5 rounded-full text-xs font-semibold">
                    {course.level}
                </span>

                </div>

                {/* Description */}
                <p className="text-sm">{course.primary_description}</p>

                {/* Meta info */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#4F647A] mt-2 shrink-0">
                <span>📚 {course.subject}</span>
                <span>⏱ {course.weeks_to_complete || '–'} weeks</span>
                <span>🌐 {course.language}</span>
                </div>
            </div>
            </li>
        ))}
        </ul>
    )
    },
    {
    title: 'Step 4: Job Vacancies',
    content: (
        <ul className="space-y-6 text-[#003E85]">
        {jobs.map((job, index) => (
            <li
            key={index}
            className="border-b border-[#00000027] pb-6 last:border-none"
            >
            {/* Title + Company */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <h3 className="text-lg sm:text-xl font-bold text-[#003E85]">
                {job.title}
                <span className="text-[#003E85]"> – {job.company_name}</span>
                </h3>
                <span className="text-sm font-semibold text-[#4F647A]">
                {job.location}
                </span>
            </div>

            {/* Responsibility Snippet */}
            <p className="mt-2 text-sm text-[#003E85]">
                {job.responsibilities?.slice(0, 2).join(', ')}...
            </p>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#4F647A]">
                <span>📌 {job.level}</span>
                <span>💼 {job.employment_type}</span>
                <span>🛠 {job.job_function}</span>
                <span>🏭 {job.industries?.split(',')[0]}</span>
            </div>

            {/* CTA */}
            <div className="mt-4">
                <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-semibold text-[#000000] bg-[#FFD000] hover:bg-yellow-400 px-4 py-2 rounded transition-colors duration-200"
                >
                View Job
                </a>
            </div>
            </li>
        ))}
        </ul>
    )
    }
    ];

    return (
    <div className="space-y-6">
        {sections.map((section, index) => {
        const isOpen = openIndex === index;
        const arrowIcon = `/arrow-${isOpen ? 'up' : 'down'}-${isOpen ? 'black' : 'white'}.svg`;

        return (
            <div
            key={index}
            className={`rounded-3xl px-6 py-4 transition-colors 
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
                {!isOpen && (
                    <Image src={arrowIcon} alt="toggle" width={20} height={20} />
                )}
            </div>

            <div
                className={`transition-all duration-500 overflow-hidden mt-2 ${
                isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="pt-2 text-left">{section.content}</div>
            </div>
            </div>
        );
        })}
    </div>
    );
};

export default CareerTrainingSection;
