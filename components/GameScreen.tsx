import React, { useState, useEffect, useCallback } from 'react';
import { getGameQuestions } from '../services/questionBank';
import { Question } from '../types';
import EquationGraph from './EquationGraph';
import StepByStepSolution from './StepByStepSolution';

interface GameScreenProps {
  onGameEnd: (score: number) => void;
  onRestart: () => void;
}

const formatEquation = (eq: { a: number; b: number; c: number }) => {
    const xTerm = eq.a === 1 ? 'x' : eq.a === -1 ? '-x' : `${eq.a}x`;
    const yTermSign = eq.b >= 0 ? '+' : '-';
    const yTermValue = Math.abs(eq.b) === 1 ? 'y' : `${Math.abs(eq.b)}y`;
    return `${xTerm} ${yTermSign} ${yTermValue} = ${eq.c}`;
};

const GameScreen: React.FC<GameScreenProps> = ({ onGameEnd, onRestart }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState({ x: '', y: '' });
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  useEffect(() => {
    setQuestions(getGameQuestions());
  }, []);

  const handleAnswerSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    const x = parseFloat(userAnswer.x);
    const y = parseFloat(userAnswer.y);

    if (isNaN(x) || isNaN(y)) {
      alert('Por favor, insira valores numéricos para X e Y.');
      return;
    }
    
    // Using a small tolerance for floating point comparisons
    const isCorrect = 
        Math.abs(x - currentQuestion.solution.x) < 0.01 &&
        Math.abs(y - currentQuestion.solution.y) < 0.01;

    if (isCorrect) {
      setScore(s => s + 100);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  }, [userAnswer, questions, currentQuestionIndex]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex + 1 >= questions.length) {
      onGameEnd(score);
    } else {
      setCurrentQuestionIndex(i => i + 1);
      setUserAnswer({ x: '', y: '' });
      setFeedback(null);
    }
  }, [currentQuestionIndex, questions.length, score, onGameEnd]);

  if (questions.length === 0) {
    return <div>Carregando questões...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full">
      <header className="flex justify-between items-center mb-4 p-4 bg-white/50 rounded-lg shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-sky-700">Onda {currentQuestionIndex + 1} de {questions.length}</h2>
          <div className="w-64 bg-gray-200 rounded-full h-2.5 mt-1">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="text-2xl font-bold text-orange-500">Pontos: {score}</div>
        <button onClick={onRestart} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
          Voltar ao Início
        </button>
      </header>

      <div className="bg-white p-8 rounded-2xl shadow-lg">
        {!feedback ? (
          <form onSubmit={handleAnswerSubmit} className="flex flex-col items-center">
            <p className="text-xl text-gray-800 mb-6 text-center max-w-3xl font-medium">{currentQuestion.context}</p>
            <div className="text-3xl font-mono space-y-2 mb-8 p-4 bg-sky-50 rounded-lg text-center w-full max-w-md">
                <p className="text-base text-gray-600 mb-2 font-sans font-normal">Sistema a ser resolvido:</p>
                <div>{formatEquation(currentQuestion.equations[0])}</div>
                <div>{formatEquation(currentQuestion.equations[1])}</div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-2">
                <label htmlFor="x-input" className="text-3xl font-bold text-sky-600">X =</label>
                <input
                  id="x-input"
                  type="number"
                  step="any"
                  value={userAnswer.x}
                  onChange={(e) => setUserAnswer({ ...userAnswer, x: e.target.value })}
                  className="w-28 p-3 text-2xl border-2 border-gray-300 rounded-lg focus:border-sky-500 focus:ring-sky-500"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="y-input" className="text-3xl font-bold text-sky-600">Y =</label>
                <input
                  id="y-input"
                  type="number"
                  step="any"
                  value={userAnswer.y}
                  onChange={(e) => setUserAnswer({ ...userAnswer, y: e.target.value })}
                  className="w-28 p-3 text-2xl border-2 border-gray-300 rounded-lg focus:border-sky-500 focus:ring-sky-500"
                  required
                />
              </div>
            </div>
            <button type="submit" className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold text-lg rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105">
              Verificar Resposta
            </button>
          </form>
        ) : (
          <div className="animate-fade-in">
            {feedback === 'correct' ? (
              <div className="text-center">
                <h3 className="text-4xl font-bold text-green-500 mb-4">BOA! ONDA PERFEITA!</h3>
                <p className="text-xl mb-4">Você acertou! A solução é X = {currentQuestion.solution.x} e Y = {currentQuestion.solution.y}.</p>
              </div>
            ) : (
              <div className="text-center">
                <h3 className="text-4xl font-bold text-red-500 mb-4">QUASE LÁ!</h3>
                <p className="text-xl mb-4">A resposta correta era X = {currentQuestion.solution.x} e Y = {currentQuestion.solution.y}.</p>
                <StepByStepSolution question={currentQuestion} />
              </div>
            )}
            <div className="mt-6">
                <h4 className="text-xl font-semibold text-center mb-2">Visualização Gráfica</h4>
                <EquationGraph equations={currentQuestion.equations} solution={currentQuestion.solution} />
            </div>
            <div className="text-center mt-8">
              <button onClick={handleNextQuestion} className="px-8 py-3 bg-orange-500 text-white font-bold text-lg rounded-full hover:bg-orange-600 transition-transform transform hover:scale-105">
                {currentQuestionIndex + 1 >= questions.length ? 'Ver Ranking' : 'Próxima Onda'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameScreen;