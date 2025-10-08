
import React from 'react';
import { Question } from '../types';

interface StepByStepSolutionProps {
  question: Question;
}

const StepByStepSolution: React.FC<StepByStepSolutionProps> = ({ question }) => {
  const [eq1, eq2] = question.equations;

  const formatEquation = (eq: { a: number; b: number; c: number }) => {
    const xTerm = eq.a === 1 ? 'x' : eq.a === -1 ? '-x' : `${eq.a}x`;
    const yTermSign = eq.b >= 0 ? '+' : '-';
    const yTermValue = Math.abs(eq.b) === 1 ? 'y' : `${Math.abs(eq.b)}y`;
    return `${xTerm} ${yTermSign} ${yTermValue} = ${eq.c}`;
  };

  return (
    <div className="text-left bg-sky-50 p-6 rounded-lg border border-sky-200 mt-4 max-w-2xl mx-auto">
      <h4 className="text-lg font-bold text-sky-800 mb-3">Passo a Passo da Resolução (Método da Substituição):</h4>
      <div className="space-y-4 text-gray-700">
        <div>
          <p className="font-semibold">1. Sistema Inicial:</p>
          <div className="font-mono pl-4">
            <p>(I) {formatEquation(eq1)}</p>
            <p>(II) {formatEquation(eq2)}</p>
          </div>
        </div>
        <div>
          <p className="font-semibold">2. Isolar uma variável:</p>
          <p>Vamos isolar <span className="font-bold">x</span> na primeira equação (I):</p>
          <p className="font-mono pl-4">{eq1.a}x = {eq1.c} {eq1.b > 0 ? '-' : '+'} {Math.abs(eq1.b)}y</p>
          <p className="font-mono pl-4">x = ({eq1.c} {eq1.b > 0 ? '-' : '+'} {Math.abs(eq1.b)}y) / {eq1.a}</p>
        </div>
        <div>
          <p className="font-semibold">3. Substituir na outra equação:</p>
          <p>Agora, substituímos essa expressão de <span className="font-bold">x</span> na segunda equação (II):</p>
          <p className="font-mono pl-4">{eq2.a} * (({eq1.c} {eq1.b > 0 ? '-' : '+'} {Math.abs(eq1.b)}y) / {eq1.a}) {eq2.b > 0 ? '+' : '-'} {Math.abs(eq2.b)}y = {eq2.c}</p>
        </div>
        <div>
          <p className="font-semibold">4. Resolver para encontrar Y:</p>
          <p>Simplificando a equação, encontramos o valor de Y.</p>
          <p className="font-mono pl-4 font-bold text-green-600">y = {question.solution.y}</p>
        </div>
        <div>
          <p className="font-semibold">5. Encontrar X:</p>
          <p>Com o valor de Y, voltamos à expressão do passo 2 para encontrar X.</p>
          <p className="font-mono pl-4 font-bold text-green-600">x = {question.solution.x}</p>
        </div>
      </div>
    </div>
  );
};

export default StepByStepSolution;
