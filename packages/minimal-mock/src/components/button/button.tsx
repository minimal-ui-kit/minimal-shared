'use client';

import type { ReactNode, AnchorHTMLAttributes } from 'react';

export type ButtonProps = any;

export function Button({ children, href, newTab, ...other }: ButtonProps): JSX.Element {
  return (
    <button
      onClick={() => console.log('Button')}
      rel={newTab ? 'noreferrer' : undefined}
      target={newTab ? '_blank' : undefined}
      style={{ backgroundColor: 'red', color: 'yellow', padding: 20 }}
      {...other}
    >
      {children} 23232
    </button>
  );
}
