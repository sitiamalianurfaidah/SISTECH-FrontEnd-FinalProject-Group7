import { useState } from 'react';

type Question = {
    id: number;
    text: string;
};

type AnswerMap = {
  [key: number]: string[]; // tiap pertanyaan punya jawaban berupa array string
};

type QuizPage3Props = {
    onBack: () => void;
    onSubmit: (answers: AnswerMap) => void;
};

const dummyQuestions: Question[] = [
    { id: 21, text: 'Bidang pekerjaan yang paling menarik bagi saya:' },
    { id: 22, text: 'Topik yang sering saya cari atau baca:' },
    { id: 23, text: 'Aktivitas favorit saat waktu luang:' },
];

const options: string[] = [
    'Teknologi',
    'Kreatif/Desain',
    'Bisnis',
    'Kesehatan',
    'Sosial',
    'Teknik',
    'Pendidikan',
];

export default function QuizPage3({ onBack, onSubmit }: QuizPage3Props) {
    const [answers, setAnswers] = useState<AnswerMap>({});

    const handleChange = (questionId: number, selectedOptions: HTMLCollectionOf<HTMLOptionElement>) => {
        const selected = Array.from(selectedOptions).map(opt => opt.value);
        setAnswers(prev => ({ ...prev, [questionId]: selected }));
    };

    const isAnswered = (id: number): boolean => {
        return Array.isArray(answers[id]) && answers[id].length > 0;
    };

    return (
        <div className="min-h-screen bg-[#F5F7FA] px-6 py-10">
        <nav className="flex justify-between items-center mb-8">
            <img src="/logo.svg" alt="Logo" className="h-10" />
        </nav>

        <div className="max-w-3xl mx-auto space-y-6">
            {dummyQuestions.map((q) => (
            <div
                key={q.id}
                className={`p-5 rounded-md shadow-sm transition-colors ${
                isAnswered(q.id) ? 'bg-[#003E85] text-white' : 'bg-[#F5F7FA] text-gray-800'
                }`}
            >
                <p className="mb-4 font-semibold">{q.text}</p>
                <select
                multiple
                onChange={(e) => handleChange(q.id, e.target.selectedOptions)}
                className="w-full p-2 border rounded text-gray-800"
                >
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
                </select>
            </div>
            ))}

            <div className="flex justify-between">
            <button
                onClick={onBack}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition"
            >
                ← Back
            </button>
            <button
                onClick={() => onSubmit(answers)}
                className="bg-[#003E85] text-white px-6 py-2 rounded hover:bg-blue-900 transition"
            >
                Submit
            </button>
            </div>
        </div>
        </div>
    );
}
