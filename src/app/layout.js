import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "CRUD Completo - Gerenciador de Comentários",
  description: "Sistema completo de CRUD para gerenciamento de comentários com interface moderna e responsiva",
  keywords: ["CRUD", "Next.js", "React", "Comentários", "API"],
  author: "Desenvolvedor",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#667eea" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
