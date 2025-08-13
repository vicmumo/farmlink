import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';

interface User {
  id: number;
  name: string;
  role: 'farmer' | 'consumer' | 'admin';
}

interface NavProps {
  auth: {
    user: User;
  };
  [key: string]: unknown;
}

export default function NavBar() {
  const { auth } = usePage<NavProps>().props;
  const role = auth?.user?.role;

  const commonLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Marketplace', href: '/marketplace' },
  ];

  const farmerLinks = [
    { name: 'Farms', href: '/farms' },
    { name: 'Products', href: '/products' },
    { name: 'Orders', href: '/orders' },
  ];

  const consumerLinks = [
    { name: 'Subscriptions', href: '/subscriptions' },
    { name: 'Orders', href: '/orders' },
  ];

  const adminLinks = [
    { name: 'Users', href: '/admin/users' },
    { name: 'Reports', href: '/admin/reports' },
  ];

  const links = [
    ...commonLinks,
    ...(role === 'farmer' ? farmerLinks : []),
    ...(role === 'consumer' ? consumerLinks : []),
    ...(role === 'admin' ? adminLinks : []),
  ];

  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">🌿 FarmLink</div>
      <div className="space-x-4">
        {links.map(link => (
          <Link
            key={link.name}
            href={link.href}
            className="hover:underline hover:text-green-200"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
