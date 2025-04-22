import { useState, useEffect } from "react";

type HomeProps = {
  onStart: () => void;
};

export function Home({ onStart }: HomeProps) {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("quiz_user_name");
    if (saved) setName(saved);
  }, []);

  const handleStart = () => {
    if (name.trim()) {
      localStorage.setItem("quiz_user_name", name);
      onStart();
    } else {
      alert("Please enter your name to start the quiz.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Welcome to the Quiz</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-2 border rounded-md mb-4"
        />
        <button
          onClick={handleStart}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}