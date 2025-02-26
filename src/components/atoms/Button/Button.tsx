import React from 'react';

interface ButtonProps {
  text?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ text, icon, className, onClick, disabled }) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span>{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  );
};
