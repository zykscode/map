import type { FeatureCollection } from 'geojson';

import CountdownContainer from '#/components/CountdownContainer';
import ResultContainer from '#/components/ResultContainer';
import SectionCard from '#/components/SectionCard';
import { results } from '#/data/2019';
import states from '#/data/state.json';
import { getRep, getSenate } from '#/lib/getData';
import { fetchYears } from '#/lib/getYears';

async function getData() {
  const map = states as FeatureCollection;
  const data = results;
  return { map, data };
}

export default async function Home() {
  const { map, data } = await getData();
  const years = await fetchYears();
  const senateParties = await getSenate(2019);
  const repParties = await getRep(2019);

  console.log({
    todo: [
      'stimulate your own result',
      'compare that to others',
      'save it',
      'share it',
    ],
  });
  return (
    <main className="w-full ">
      <CountdownContainer />
      <SectionCard path={'elections'} tabs={years}>
        <ResultContainer
          data={data}
          map={map}
          repParties={repParties}
          senateParties={senateParties}
        />
      </SectionCard>
    </main>
  );
}
