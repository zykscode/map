import { fetchYears } from '#/lib/getYears';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const years = await fetchYears();
  return (
    <h1>{years[0].slug}</h1>
    // <SectionCard
    //   path={'elections'}
    //   tabs={years}
    //   repParties={[]}
    //   senateParties={[]}
    // >
    //   {children}
    // </SectionCard>
  );
}
