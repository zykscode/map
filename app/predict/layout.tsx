import '#/styles/globals.css';
import '#/styles/style.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
