import type { Metadata } from 'next';
import './globals.css';
import { Press_Start_2P } from 'next/font/google';

const pixelify = Press_Start_2P({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pixelify',
});

export const metadata: Metadata = {
  title: 'Coders Club',
  description: 'Official IEDC SECT Coders Club website',
    icons: {
    icon: '/coders_club.ico', // or '/favicon.ico'
  },
    generator: 'v0.dev'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pixelify.variable}>
      <body>{children}</body>
    </html>
  );
}
