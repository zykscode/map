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
      <body className="app notion">
        <div className="viewpoint"></div>
        <div className="frame">
          <Header />
          <div className="page-scroller">{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
