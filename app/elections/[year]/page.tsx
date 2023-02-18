import type { PageProps } from '#/lib/getYears';
import { fetchYearBySlug } from '#/lib/getYears';

export default async function Page({ params }: PageProps) {
  console.log(params, 'params in pageeeeeeeeee');
  const year = await fetchYearBySlug(params.year);
  if (!year) return null;
  return (
    <div className="bg-blue-300 ">
      <h1>{year.slug}</h1>
      hhdssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssj
    </div>
  );
}
