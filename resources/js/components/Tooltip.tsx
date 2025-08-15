import React from 'react';

interface Props {
  content: string;
  children: React.ReactNode;
}

export default function Tooltip({ content, children }: Props) {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute z-10 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 mt-1 whitespace-nowrap left-1/2 -translate-x-1/2">
        {content}
      </div>
    </div>
  );
}
