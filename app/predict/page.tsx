import CountdownContainer from '#/components/CountdownContainer';
import Logo from '#/components/Logo';
import Map from '#/components/Map';
import APC from '#/public/static/images/apc.svg'
import CandidateCard from '#/components/CandidateCard';
import Data from '#/lib/data/state.json'
import { csv,json } from 'd3';
import { useEffect, useState } from 'react';

export default async function Home() {
  const [data, setData] = useState([]);
  console.log({
    todo: [
      'stimulate your own result',
      'compare that to others',
      'save it',
      'share it',
    ],
  }); 


  return (
    <div className="flex align-top justify-center">
{/* <CandidateCard name={'Tinubu'} age={70} party={'APC'}/> */}
      {/* <Map data={data}  /> */}
      jjj
    </div>
  );
}
