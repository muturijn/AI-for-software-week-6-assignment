
import React from 'react';

interface CardProps {
  step: string;
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ step, title, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
      <div className="p-5 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-10 h-10 bg-brand-green text-white rounded-full flex items-center justify-center font-bold text-lg">
            {step}
          </div>
          <h2 className="text-xl font-semibold text-brand-brown-dark">{title}</h2>
        </div>
      </div>
      <div className="p-6 flex-grow">
        {children}
      </div>
    </div>
  );
};

export default Card;
