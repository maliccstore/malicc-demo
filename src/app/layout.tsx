// app/layout.js (App Router - Root Layout)
import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { Container } from '@radix-ui/themes';
import { Providers } from '@/provider/app/Provider';

export const metadata = {
  title: 'Next.js Application',
  description: 'A modern Next.js application with responsive layout',
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-slate-200 `}
      >
        <Container className="mobile-only  pb-20   max-h-screen z-10">
          <Providers>
            <div className="app-container">{children}</div>
          </Providers>
        </Container>
      </body>
    </html>
  );
}
