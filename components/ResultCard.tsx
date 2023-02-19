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

  useEffect(() => {
    if (selectedState) {
      setWinnerLogo(() => DynamicWinnerLogo);
    }
  }, [selectedState]);

  return (
    <div className="flex flex-col">
      <div className="relative ">
        <ResultMap set={setSelectedState} map={map} data={data} />
      </div>
      <div className="">
        {selectedState && (
          <div>
            <p>Winner: {selectedState.winner}</p>
            <p>Turnout: {selectedState.turnout}</p>
            <p>Party Votes: {JSON.stringify(selectedState.partyVotes)}</p>
            {WinnerLogo && (
              <div>
                <p>Winner Logo:</p>
                <DynamicWinnerLogo />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
