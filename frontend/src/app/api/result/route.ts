import { NextResponse } from 'next/server'

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
            skills: ['Statistical analysis', 'Problem-solving', 'Attention to detail'],
            abilities: ['Math reasoning', 'Critical thinking', 'Written communication'],
            knowledges: ['Mathematics', 'Economics', 'English language'],
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
            skills: ['Data interpretation', 'Modeling', 'Critical thinking'],
            abilities: ['Visual understanding', 'Logical reasoning', 'Math'],
            knowledges: ['Physics', 'Climate theory', 'Mathematics'],
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
            skills: ['Engineering design', 'Problem-solving', 'Technical evaluation'],
            abilities: ['Math', 'Spatial reasoning', 'Technical communication'],
            knowledges: ['Aerospace tech', 'Mathematics', 'Physics'],
            job_outlook: {
            description: 'New job opportunities are very likely in the future.',
            category: 'Bright',
            },
        },
        ]

        return NextResponse.json({ riasec, recommendations })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get result' }, { status: 500 })
    }
}
