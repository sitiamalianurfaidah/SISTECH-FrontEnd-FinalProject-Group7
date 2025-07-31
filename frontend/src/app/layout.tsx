// app/layout.tsx
import '../styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PathMatch',
  description: 'Identify your perfect profession based on your personality',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head />
      <link rel="icon" href="/pathmatch-logo.svg" sizes="32x32" />
      <body className="bg-white text-gray-800">{children}</body>
    </html>
  );
}
