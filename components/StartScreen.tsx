
import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center animate-fade-in">
      <h1 className="text-5xl font-bold text-sky-600 mb-2">Surf da Equação</h1>
      <p className="text-2xl text-sky-500 mb-8">Calcule a Onda Perfeita!</p>
      <p className="max-w-prose text-lg text-gray-700 mb-10">
        Bem-vindo, surfista da matemática! Sua missão é resolver sistemas de equações para encontrar as coordenadas da onda perfeita.
        Acerte 15 questões, acumule pontos e torne-se uma lenda do surfe!
      </p>
      <button
        onClick={onStart}
        className="px-10 py-4 bg-orange-500 text-white font-bold text-xl rounded-full shadow-md hover:bg-orange-600 transition-transform transform hover:scale-105"
      >
        Começar a Surfar!
      </button>
    </div>
  );
};

export default StartScreen;
