export interface Equation {
  a: number;
  b: number;
  c: number;
}

export interface Solution {
  x: number;
  y: number;
}

export interface Question {
  id: number;
  context: string;
  equations: [Equation, Equation];
  solution: Solution;
}

export enum GameState {
  Start = 'START',
  Playing = 'PLAYING',
  GameOver = 'GAME_OVER',
}