
import React from 'react';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const getRanking = (score: number): { title: string; message: string; color: string } => {
  if (score >= 1200) {
    return { title: 'Lenda do Surfe!', message: 'Você dominou todas as ondas com perfeição! Um verdadeiro mestre da matemática!', color: 'text-yellow-400' };
  } else if (score >= 800) {
    return { title: 'Surfista Profissional', message: 'Você pegou ótimas ondas e mostrou grande habilidade. Continue assim!', color: 'text-sky-500' };
  } else if (score >= 400) {
    return { title: 'Amador Talentoso', message: 'Você tem potencial! Com mais prática, você chegará ao topo.', color: 'text-green-500' };
  } else {
    return { title: 'Iniciante na Prancha', message: 'Não desista! Toda lenda começou pegando as primeiras marolas.', color: 'text-gray-600' };
  }
};

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart }) => {
  const ranking = getRanking(score);

  return (
    <div className="text-center bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center animate-fade-in">
      <h1 className="text-5xl font-bold text-sky-600 mb-4">Fim de Jogo!</h1>
      <p className="text-2xl text-gray-700 mb-2">Sua pontuação final foi:</p>
      <p className="text-7xl font-bold text-orange-500 mb-8">{score}</p>
      <div className="mb-10">
        <h2 className={`text-4xl font-bold ${ranking.color}`}>{ranking.title}</h2>
        <p className="text-lg text-gray-600 mt-2 max-w-md">{ranking.message}</p>
      </div>
      <button
        onClick={onRestart}
        className="px-10 py-4 bg-blue-600 text-white font-bold text-xl rounded-full shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
      >
        Surfar Novamente
      </button>
    </div>
  );
};

export default GameOverScreen;
