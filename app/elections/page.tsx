import type { FeatureCollection } from 'geojson';

import Map from '#/components/Maps';
import states from '#/data/state.json';

async function getData() {
  const map = states as FeatureCollection;
  return map;
}

export default async function Home() {
  const map = await getData();

  return (
    <>
      <div className="">page</div>
      <div className="">
        <Map map={map} />
      </div>
    </>
  );
}
