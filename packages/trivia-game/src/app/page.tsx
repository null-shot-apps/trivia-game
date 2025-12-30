'use client';

import { useState } from 'react';

const triviaQuestions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correct: 2
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correct: 3
  },
  {
    question: "In what year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correct: 2
  },
  {
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correct: 1
  },
  {
    question: "Which element has the chemical symbol 'Au'?",
    options: ["Silver", "Gold", "Copper", "Aluminum"],
    correct: 1
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correct: 2
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correct: 1
  },
  {
    question: "What is the speed of light?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
    correct: 0
  }
];

export default function TriviaGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameOver(false);
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === triviaQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < triviaQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameOver(true);
    }
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">🧠 Trivia Challenge</h1>
          <p className="text-xl text-white/90 mb-8">Test your knowledge with 10 questions!</p>
          <button
            onClick={startGame}
            className="bg-white text-purple-600 px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform shadow-lg"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  if (gameOver) {
    const percentage = (score / triviaQuestions.length) * 100;
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Game Over! 🎉</h2>
          <div className="text-6xl font-bold text-purple-600 mb-4">
            {score}/{triviaQuestions.length}
          </div>
          <p className="text-xl text-gray-600 mb-6">
            {percentage >= 80 ? "Amazing! You're a trivia master! 🏆" :
             percentage >= 60 ? "Great job! Well done! 👏" :
             percentage >= 40 ? "Not bad! Keep practicing! 💪" :
             "Keep trying! You'll get better! 📚"}
          </p>
          <button
            onClick={startGame}
            className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-purple-700 transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  const question = triviaQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-semibold text-gray-600">
            Question {currentQuestion + 1}/{triviaQuestions.length}
          </div>
          <div className="text-sm font-semibold text-purple-600">
            Score: {score}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / triviaQuestions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <h2 className="text-2xl font-bold text-gray-800 mb-8">{question.question}</h2>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => {
            const isCorrect = index === question.correct;
            const isSelected = index === selectedAnswer;
            
            let buttonClass = "w-full p-4 rounded-xl text-left font-semibold transition-all ";
            
            if (!showResult) {
              buttonClass += "bg-gray-100 hover:bg-purple-100 text-gray-800 hover:scale-[1.02]";
            } else {
              if (isCorrect) {
                buttonClass += "bg-green-500 text-white";
              } else if (isSelected && !isCorrect) {
                buttonClass += "bg-red-500 text-white";
              } else {
                buttonClass += "bg-gray-100 text-gray-800";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={buttonClass}
              >
                <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
                {showResult && isCorrect && <span className="float-right">✓</span>}
                {showResult && isSelected && !isCorrect && <span className="float-right">✗</span>}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        {showResult && (
          <button
            onClick={nextQuestion}
            className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition-colors"
          >
            {currentQuestion < triviaQuestions.length - 1 ? "Next Question →" : "See Results"}
          </button>
        )}
      </div>
    </div>
  );
}

