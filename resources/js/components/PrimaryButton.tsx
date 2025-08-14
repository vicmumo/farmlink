import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function PrimaryButton({ children, className = '', ...props }: Props) {
  return (
    <button
      {...props}
      className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
