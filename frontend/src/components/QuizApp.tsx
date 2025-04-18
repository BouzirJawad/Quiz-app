import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define a type for a question
type Question = {
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
};

const QuizApp: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=5&type=multiple');
        setQuestions(response.data.results);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const shuffleOptions = (question: Question): string[] => {
    const options = [...question.incorrect_answers, question.correct_answer];
    return options.sort(() => Math.random() - 0.5);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
    setSelectedOption(null);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowScore(false);
    setLoading(true);
    setQuestions([]);
    // Refetch questions
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=5&type=multiple');
        setQuestions(response.data.results);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  };

  if (loading) return <p className="text-center mt-10">Loading questions...</p>;

  if (!questions.length) return <p className="text-center mt-10">No questions found.</p>;

  const currentQuestion = questions[currentQuestionIndex];
  const options = shuffleOptions(currentQuestion);

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Quiz App</h1>
      {showScore ? (
        <div>
          <h2 className="text-xl mb-4">Your score: {score} / {questions.length}</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleRestart}>Restart</button>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-3" dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
          <div className="flex flex-col gap-2">
            {options.map((option, index) => (
              <button
                key={index}
                className={`px-4 py-2 border rounded ${selectedOption === option ? 'bg-blue-300' : 'bg-white'}`}
                onClick={() => handleOptionClick(option)}
                dangerouslySetInnerHTML={{ __html: option }}
              />
            ))}
          </div>
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleNext}
            disabled={!selectedOption}
          >
            {currentQuestionIndex + 1 === questions.length ? 'Finish' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
