import type { Metadata } from "next";
import { Roboto } from "next/font/google"
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider"


export const metadata: Metadata = {
  title: "NoteHub",
  description: "A web app for creating, editing, and saving notes with a simple interface and quick access to your entries.",
  openGraph: {
    title: `NoteHub`,
    description: "A web app for creating, editing, and saving notes with a simple interface and quick access to your entries.",
    url: `https://notehub.com`,
    images: [
      {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
    ]
  }
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ overflow: "scroll" }} className={roboto.variable}>
        <TanStackProvider>
        <Header />
          {children}
          {modal}
          <Footer />
          </TanStackProvider>
      </body>
    </html>
  );
}