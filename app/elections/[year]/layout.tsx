import type { PageProps } from '#/lib/getYears';
import { fetchYearBySlug } from '#/lib/getYears';

export default async function Layout({ children, params }: PageProps) {
  console.log(params,'Paramss  dddddddddddddddddddddddmf')
  const year = await fetchYearBySlug(params.year);
  if (!year) return null;
  return <div className="bg-blue-300 ">{children}</div>;
}
