/* eslint-disable tailwindcss/no-custom-classname */
import type { FeatureCollection } from 'geojson';

import PredictContainer from '#/components/PredictContainer';
import { presidentialCandidates } from '#/data/candidates';
import state from '#/data/state.json';
import type { Candidate } from '#/lib/types';

const getData = async () => {
  const filterCandidates = (
    candidates: Candidate[],
    keys: (keyof Candidate)[],
    values: (string | number | null)[][],
  ) => {
    return candidates.filter((candidate) =>
      keys.every((key, index) => {
        const value = candidate[key];
        if (value === undefined) return false;
        return values[index]!.includes(value);
      }),
    );
  };
  const key: (keyof Candidate)[] = ['party', 'position'];
  const values = [['PDP', 'APC', 'NNPP', 'LP'], ['Presidential']];
  const candidateData = filterCandidates(presidentialCandidates, key, values);

  return {
    options: candidateData,
    data: state as FeatureCollection,
  };
};

export default async function Home() {
  const { options, data } = await getData();
  return (
    <div className="mx-auto max-w-7xl bg-green-400">
      {/* <Map options={options} data={data} /> */}
      <PredictContainer options={options} data={data} />
    </div>
  );
}
