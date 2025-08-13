import React from 'react';
import NavBar from '@/components/NavBar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="p-6">{children}</main>
    </div>
  );
}
