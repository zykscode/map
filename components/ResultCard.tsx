'use client';

import dynamic from 'next/dynamic';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import type { ElectionsResults } from '#/lib/types';

import ResultMap from './ResultMap';

interface Props {
  map: GeoJSON.FeatureCollection;
  data: ElectionsResults;
}

const ResultCard: FC<Props> = ({ map, data }) => {
  const [selectedState, setSelectedState] = useState<any>(null);
  const [WinnerLogo, setWinnerLogo] = useState<any>(null);

  const winnerName = selectedState?.winner ?? '';
  const winnerLogoPath = `./${winnerName}`;

  const DynamicWinnerLogo = dynamic(
    () => import(`${winnerLogoPath.toUpperCase()}.tsx`),
    {
      loading: () => <div>Loading...</div>,
      ssr: false,
    },
  );
  console.log(selectedState);
  useEffect(() => {
    if (selectedState) {
      setWinnerLogo(() => DynamicWinnerLogo);
    }
  }, [selectedState]);

  return (
    <div className="flex flex-col gap-4 text-clip">
      <div className="relative ">
        <ResultMap set={setSelectedState} map={map} data={data} />
      </div>

      {selectedState && WinnerLogo && (
        <div className="overflow-hidden px-4">
          <h2 className="title capitalize">{selectedState.state}</h2>
          <div className="mb-4">
            <div className=" flex items-center justify-center gap-2 text-lg font-medium">
              <div className="">Winner: {selectedState.winner}</div>

              <div className="mb-4 h-4 w-4">
                <DynamicWinnerLogo />
              </div>
            </div>
            <p className="">Turnout: {selectedState.turnout}</p>
            <p className="">
              Party Votes: {JSON.stringify(selectedState.partyVotes)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
