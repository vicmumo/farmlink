import React from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

interface Props {
  message: string;
  type?: 'success' | 'error';
}

export default function Toast({ message, type = 'success' }: Props) {
  const bg = type === 'success' ? 'bg-green-600' : 'bg-red-600';
  const Icon = type === 'success' ? CheckCircleIcon : ExclamationCircleIcon;

  return (
    <div className={`fixed bottom-4 right-4 flex items-center gap-2 px-4 py-2 text-white rounded shadow-lg ${bg}`}>
      <Icon className="h-5 w-5" />
      <span className="text-sm">{message}</span>
    </div>
  );
}
