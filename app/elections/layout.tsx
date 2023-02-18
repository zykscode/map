import SectionCard from '#/components/SectionCard';
import { fetchYears } from '#/lib/getYears';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const years = await fetchYears();
  return (
    <SectionCard
      path={'elections'}
      tabs={years}
      repParties={[]}
      senateParties={[]}
    >
      {children}
    </SectionCard>
  );
}
