import CountdownContainer from '#/components/CountdownContainer';
import Map from '#/components/Map';
import { states } from '#/lib/data/data';
import { naijaMap } from '#/lib/data/naija';



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
      {/* <CountdownContainer /> */}
    <Map geoJson={states} />
    </div>
  );
}
