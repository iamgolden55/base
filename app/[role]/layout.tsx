// app/[role]/layout.tsx
'use client';

import { usePathname, redirect } from 'next/navigation';

export default function RoleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { role: string };
}) {
  const pathname = usePathname();
  const isAuthenticated = true; // Replace with your auth logic
  const isAuthorized = true; // Check if user has the correct role

  if (!isAuthenticated) {
    redirect('/auth/login');
  }

  
  return (
    <div className="">
      <nav className="">
        {/* Add role-specific navigation */}
      </nav>
      <main className="">
        {children}
      </main>
    </div>
  );
}