import CountdownContainer from '#/components/CountdownContainer';
import Logo from '#/components/Logo';
import Map from '#/components/Map';
import APC from '#/public/static/images/apc.svg'
import CandidateCard from '#/components/CandidateCard';
import data from '#/lib/data/state.geojson'
import { csv,json } from 'd3';
import NewMap from '#/components/NewMap';

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
    <div className="flex bg-blue-500 align-top justify-center">
{/* <CandidateCard name={'Tinubu'} age={70} party={'APC'}/> */}
      {/* <Map data={data}  /> */}
      <NewMap data={data}/>
    </div>
  );
}
