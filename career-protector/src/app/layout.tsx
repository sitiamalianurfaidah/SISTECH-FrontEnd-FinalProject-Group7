// app/layout.tsx
import '../styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discover Your Ideal Career',
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
      <body className="bg-white text-gray-800">{children}</body>
    </html>
  );
}
