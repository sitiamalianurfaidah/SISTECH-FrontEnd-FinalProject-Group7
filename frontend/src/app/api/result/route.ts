import { NextResponse } from 'next/server'

export async function GET() {
    try {
        // Contoh dummy data, sesuaikan dengan data dari backend FastAPI kamu
        const riasec = {
        Realistic: 10,
        Investigative: 20,
        Artistic: 15,
        Social: 25,
        Enterprising: 5,
        Conventional: 10,
        }

        const recommendations = [
        { title: 'Software Engineer', description: 'Develops software and applications.' },
        { title: 'UI/UX Designer', description: 'Designs user-friendly interfaces.' },
        ]

        return NextResponse.json({ riasec, recommendations })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get result' }, { status: 500 })
    }
}
