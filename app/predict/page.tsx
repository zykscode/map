import CountdownContainer from '#/components/CountdownContainer';
import Map from '#/components/Map';

import data from '#/lib/data/state.geojson';

export default async function Home() {
  console.log({
    todo: [
      'stimulate your own result',
      'compare that to others',
      'save it',
      'share it',
    ],
  });
  return (
    <div className="">
      <CountdownContainer />
      <Map data={data} width={960} height={800} />
    </div>
  );
}
