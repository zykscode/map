import PredictMap from '#/components/PredictMap';
import data from '#/lib/data/state.geojson';
import { csv, json } from 'd3';

export default async function Home() {
  return (
    <div className="page full-page   ">
      {/* <CandidateCard name={'Tinubu'} age={70} party={'APC'}/> */}

      <PredictMap data={data} />

      <div className="info">
        <span id='state-name' className='state-title'>

        </span>
      </div>
    </div>
  );
}
