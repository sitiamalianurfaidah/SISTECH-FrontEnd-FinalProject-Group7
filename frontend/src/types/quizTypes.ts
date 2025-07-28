// src/types/quizTypes.ts
export interface QuizScalePageProps {
    answers: (number | null)[];
    setAnswers: React.Dispatch<React.SetStateAction<(number | null)[]>>;
    onNext: () => void;
    onBack?: () => void;
}

export interface QuizDropdownPageProps {
    answers: string[];
    setAnswers: React.Dispatch<React.SetStateAction<string[]>>;
    onBack: () => void;
    onSubmit: () => void;
}
