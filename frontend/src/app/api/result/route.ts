import { NextResponse } from 'next/server'

// types.ts
export interface EducationRecommendation {
    program: string;
    university: string;
    rank: number;
}

export interface ArticleRecommendation {
    title: string;
    link: string;
    snippet: string;
}

export interface CourseRecommendation {
    title: string;
    description: string;
    marketing_url: string;
    partner: string;
    primary_description: string;
    subject: string;
    level: string;
    weeks_to_complete: string;
    language: string;
}

export interface JobRecommendation {
    title: string;
    company_name: string;
    location: string;
    responsibilities: string[];
    level: string;
    employment_type: string;
    job_function: string;
    industries: string;
    link: string;
}

export async function GET() {
    try {
        const riasec = {
        Realistic: 10,
        Investigative: 20,
        Artistic: 15,
        Social: 25,
        Enterprising: 5,
        Conventional: 10,
        }

        const recommendations = [
        {
            code: '15-2011.00',
            title: 'Actuary',
            what_they_do:
            'Analyze statistical data to forecast risk and liability for future benefits.',
            on_the_job: [
                "Ascertain premium rates required and cash reserves and liabilities necessary to ensure payment of future benefits.",
                "Collaborate with programmers, underwriters, accounts, claims experts, and senior management to help companies develop plans for new lines of business or improvements to existing business.",
                "Analyze statistical information to estimate mortality, accident, sickness, disability, and retirement rates."
            ],
            skills: ['Statistical analysis', 'Problem-solving', 'Attention to detail'],
            abilities: ['Math reasoning', 'Critical thinking', 'Written communication'],
            knowledge: ['Mathematics', 'Economics', 'English language'],
            job_outlook: {
            description: 'New job opportunities are very likely in the future.',
            category: 'Bright',
            },
        },
        {
            code: '19-2021.00',
            title: 'Meteorologist',
            what_they_do:
            'Interpret weather data and use computer models to forecast conditions.',
            on_the_job: [
                "Develop or use mathematical or computer models for weather forecasting.",
                "Interpret data, reports, maps, photographs, or charts to predict long- or short-range weather conditions, using computer models and knowledge of climate theory, physics, and mathematics.",
                "Conduct meteorological research into the processes or determinants of atmospheric phenomena, weather, or climate."
            ],
            skills: ['Data interpretation', 'Modeling', 'Critical thinking'],
            abilities: ['Visual understanding', 'Logical reasoning', 'Math'],
            knowledge: ['Physics', 'Climate theory', 'Mathematics'],
            job_outlook: {
            description: 'New job opportunities are very likely in the future.',
            category: 'Bright',
            },
        },
        {
            code: '17-2011.00',
            title: 'Aerospace Engineer',
            what_they_do:
            'Design and test aircraft, missiles, and spacecraft, and recommend improvements.',
            on_the_job: [
                "Formulate mathematical models or other methods of computer analysis to develop, evaluate, or modify design, according to customer engineering requirements.",
                "Plan or conduct experimental, environmental, operational, or stress tests on models or prototypes of aircraft or aerospace systems or equipment.",
                "Formulate conceptual design of aeronautical or aerospace products or systems to meet customer requirements or conform to environmental regulations."
            ],
            skills: ['Engineering design', 'Problem-solving', 'Technical evaluation'],
            abilities: ['Math', 'Spatial reasoning', 'Technical communication'],
            knowledge: ['Aerospace tech', 'Mathematics', 'Physics'],
            job_outlook: {
            description: 'New job opportunities are very likely in the future.',
            category: 'Bright',
            },
        },
        ]

        return NextResponse.json({ riasec, recommendations })
    } catch (error) {
        console.error('Error getting result:', error);
        return NextResponse.json({ error: 'Failed to get result' }, { status: 500 });
    }
}
