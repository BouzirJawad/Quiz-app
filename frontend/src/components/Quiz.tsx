import { useEffect, useState } from "react";

type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
};

type QuizProps = {
  onFinish: (score: number) => void;
};

export function Quiz({ onFinish }: QuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        const formatted: Question[] = data.results.map((q: any) => {
          const answers = [...q.incorrect_answers];
          const randIndex = Math.floor(Math.random() * 4);
          answers.splice(randIndex, 0, q.correct_answer);
          return { ...q, answers };
        });
        setQuestions(formatted);
      });
  }, []);

  const handleAnswer = (answer: string) => {
    setSelected(answer);
    if (answer === questions[currentIndex].correct_answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
    } else {
      onFinish(score);
    }
  };

  if (!questions.length) return <p className="text-center mt-10">Loading...</p>;

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-700 mb-1">
          Question {currentIndex + 1} of {questions.length}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <h2
        className="text-lg font-semibold mb-4"
        dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
      />
      <div className="grid grid-cols-1 gap-3">
        {currentQuestion.answers.map((ans, idx) => {
          const isCorrect = ans === currentQuestion.correct_answer;
          const isSelected = selected === ans;

          let buttonStyle = "bg-gray-100 hover:bg-gray-200";
          if (selected) {
            if (isCorrect) {
              buttonStyle = "bg-green-300 border-2 border-green-600";
            } else if (isSelected) {
              buttonStyle = "bg-red-300 border-2 border-red-600";
            } else {
              buttonStyle = "bg-gray-100 opacity-70";
            }
          }

          return (
            <button
              key={idx}
              className={`px-4 py-2 rounded-lg border text-left ${buttonStyle}`}
              onClick={() => handleAnswer(ans)}
              disabled={selected !== null}
              dangerouslySetInnerHTML={{ __html: ans }}
            />
          );
        })}
      </div>
      <button
        onClick={handleNext}
        disabled={!selected}
        className="mt-6 w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
      >
        {currentIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
      </button>
    </div>
  );
}