import React from 'react';

interface ButtonProps {
  text?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  href?: string; // Adicionamos a opção de link
  target?: '_blank' | '_self' | '_parent' | '_top'; // Para abrir em nova aba, etc.
  testId?: string;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  className = '',
  onClick,
  disabled = false,
  href,
  target = '_self',
  testId
}) => {
  const commonClasses =
    'flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white transition disabled:opacity-50 disabled:cursor-not-allowed';

  // Se `href` for passado, renderiza um link (<a>)
  if (href) {
    return (
      <a
        data-testid={testId}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={`${commonClasses} ${className}`}
      >
        {icon && <span>{icon}</span>}
        {text && <span>{text}</span>}
      </a>
    );
  }

  // Se não for um link, renderiza um <button>
  return (
    <button
      data-testid={testId}
      className={`${commonClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span>{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  );
};
