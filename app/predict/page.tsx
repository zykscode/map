/* eslint-disable tailwindcss/no-custom-classname */
import type { FeatureCollection } from 'geojson';

import PredictMap from '#/components/PredictMap';
import data from '#/data/state.json';

export default async function Home() {
  return (
    <div className="page full-page   ">
      {/* <CandidateCard name={'Tinubu'} age={70} party={'APC'}/> */}

      <PredictMap data={data as FeatureCollection} />

      <div className="info">
        <span id="state-name" className="state-title"></span>
      </div>
    </div>
  );
}
