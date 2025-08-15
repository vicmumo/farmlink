import React from 'react';
import NavBar from '@/components/NavBar';

interface Props {
  children: React.ReactNode;
  title: string;
}

export default function MainLayout({ children, title }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-4">{title}</h1>
        {children}
      </main>
    </div>
  );
}

