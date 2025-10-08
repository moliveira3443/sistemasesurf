
import React, { useState, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import { GameState } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [score, setScore] = useState(0);

  const startGame = useCallback(() => {
    setScore(0);
    setGameState(GameState.Playing);
  }, []);

  const endGame = useCallback((finalScore: number) => {
    setScore(finalScore);
    setGameState(GameState.GameOver);
  }, []);

  const restartGame = useCallback(() => {
    setGameState(GameState.Start);
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case GameState.Playing:
        return <GameScreen onGameEnd={endGame} onRestart={restartGame} />;
      case GameState.GameOver:
        return <GameOverScreen score={score} onRestart={startGame} />;
      case GameState.Start:
      default:
        return <StartScreen onStart={startGame} />;
    }
  };

  return (
    <div className="min-h-screen bg-sky-100 text-gray-800 font-sans flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
