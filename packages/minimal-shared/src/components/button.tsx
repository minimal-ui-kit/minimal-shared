'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={() => alert(`Hello from your ${appName} app!`)}
      style={{ padding: '1rem', fontSize: '1rem', color: 'red', background: 'green' }}
    >
      {children}
    </button>
  );
};
