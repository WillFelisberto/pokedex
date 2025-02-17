import { Mars, Venus } from 'lucide-react';
import React from 'react';

export interface ProgressBarProps {
  malePercentage: number;
}

export const ProgressBar = ({ malePercentage }: ProgressBarProps) => {
  return (
    <div className="w-full text-center">
      <p className="text-gray-700 font-semibold mb-1">GÊNERO</p>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden relative">
        <div
          data-testid="male-bar"
          className="bg-[#2551C3] h-full absolute left-0"
          style={{ width: `${malePercentage}%` }}
        ></div>
        <div
          data-testid="female-bar"
          className="bg-[#FF7596] h-full absolute right-0"
          style={{ width: `${100 - malePercentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-gray-700 mt-1 text-sm">
        <span className="flex items-center font-bold">
          <Mars className="mr-1" size={16} /> {malePercentage.toFixed(1)}%
        </span>
        <span className="flex items-center font-bold">
          <Venus className="mr-1" size={16} /> {(100 - malePercentage).toFixed(1)}%
        </span>
      </div>
    </div>
  );
};
