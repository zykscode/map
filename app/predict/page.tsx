import CountdownContainer from '#/components/CountdownContainer';
import Logo from '#/components/Logo';
import Map from '#/components/Map';
import APC from '#/public/static/images/apc.svg'

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
    <div className="flex align-top bg-green-300 justify-center">
      <Map data={data}  />
    </div>
  );
}
