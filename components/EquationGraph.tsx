
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceDot } from 'recharts';
import { Equation, Solution } from '../types';

interface EquationGraphProps {
  equations: [Equation, Equation];
  solution: Solution;
}

const EquationGraph: React.FC<EquationGraphProps> = ({ equations, solution }) => {
  const generateData = () => {
    const data = [];
    const [eq1, eq2] = equations;
    const { x: solX } = solution;

    const xMin = Math.floor(solX - 5);
    const xMax = Math.ceil(solX + 5);

    for (let x = xMin; x <= xMax; x++) {
      let y1, y2;

      // Calculate y for equation 1
      if (eq1.b !== 0) {
        y1 = (eq1.c - eq1.a * x) / eq1.b;
      } else { // Vertical line
        y1 = x === eq1.c / eq1.a ? 0 : null; // This is a simplification, recharts handles vertical lines poorly this way
      }

      // Calculate y for equation 2
      if (eq2.b !== 0) {
        y2 = (eq2.c - eq2.a * x) / eq2.b;
      } else { // Vertical line
        y2 = x === eq2.c / eq2.a ? 0 : null;
      }

      data.push({ x, 'Linha 1': y1, 'Linha 2': y2 });
    }
    return data;
  };

  const data = generateData();
  const formatEquation = (eq: { a: number; b: number; c: number }) => {
    const xTerm = eq.a !== 0 ? (eq.a === 1 ? 'x' : eq.a === -1 ? '-x' : `${eq.a}x`) : '';
    const bAbs = Math.abs(eq.b);
    const yTermSign = eq.b > 0 ? '+' : '-';
    const yTermValue = bAbs === 1 ? 'y' : `${bAbs}y`;
    const yTerm = eq.b !== 0 ? `${yTermSign} ${yTermValue}` : '';
    return `${xTerm} ${yTerm} = ${eq.c}`.replace(' + -', ' - ');
  };


  return (
    <div className="w-full h-80 bg-gray-50 p-4 rounded-lg">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" type="number" domain={['dataMin', 'dataMax']} />
          <YAxis type="number" domain={['dataMin - 1', 'dataMax + 1']} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Linha 1" stroke="#3b82f6" strokeWidth={2} name={formatEquation(equations[0])} dot={false} />
          <Line type="monotone" dataKey="Linha 2" stroke="#f97316" strokeWidth={2} name={formatEquation(equations[1])} dot={false} />
          <ReferenceDot x={solution.x} y={solution.y} r={6} fill="#16a34a" stroke="white" strokeWidth={2}>
            <title>Solução ({solution.x}, {solution.y})</title>
          </ReferenceDot>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EquationGraph;
