import { useState } from "react";
import { Home } from "./components/StartScreen";
import { Quiz } from "./components/Quiz";
import { ResultScreen } from "./components/ResultScreen";

export default function App() {
  const [step, setStep] = useState<"home" | "quiz" | "result">("home");
  const [score, setScore] = useState<number>(0);

  const handleStart = () => {
    setStep("quiz");
  };

  const handleFinish = (finalScore: number) => {
    setScore(finalScore);
    setStep("result");
  };

  const handleRestart = () => {
    setScore(0);
    setStep("home");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {step === "home" && <Home onStart={handleStart} />}
      {step === "quiz" && <Quiz onFinish={handleFinish} />}
      {step === "result" && <ResultScreen score={score} total={10} onRestart={handleRestart} />}
    </div>
  );
}