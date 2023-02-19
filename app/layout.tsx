/* eslint-disable tailwindcss/no-custom-classname */
import '#/styles/globals.css';
import '#/styles/style.scss';
import '#/styles/leaflet.css';

import { Footer } from '#/components/Footer';
import Header from '#/components/header/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="app notion rounded-t-2xl">
        <div className="viewpoint z-60 bg-blue-600"></div>
        <div className="frame text-clip rounded-t-2xl bg-pink-400 px-2">
          <Header />
          <div className="page-scroller text-clip rounded-t-2xl">
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
