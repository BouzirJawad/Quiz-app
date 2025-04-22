type ResultScreenProps = {
    score: number;
    total: number;
    onRestart: () => void;
  };
  
  export function ResultScreen({ score, total, onRestart }: ResultScreenProps) {
    const name = localStorage.getItem("quiz_user_name") || "User";
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-2">Well done, {name}!</h2>
          <p className="mb-4 text-lg">
            You scored <span className="font-semibold">{score}</span> out of {total}
          </p>
          <button
            onClick={onRestart}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }