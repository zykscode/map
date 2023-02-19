/* eslint-disable tailwindcss/no-custom-classname */

'use client';

import { geoMercator, geoPath } from 'd3-geo';
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import type { ElectionsResults } from '#/lib/types';
import useElectionResults from '#/lib/useElectionResults';

import MapPath from './New';

interface Props {
  map: GeoJSON.FeatureCollection;
  data: ElectionsResults;
}

const ResultMap: FC<Props> = ({ map, data }) => {
  const result = useElectionResults(data);
  const initialProjection = () => geoMercator().fitSize([100, 100], map);
  const [projections, setProjection] = useState(initialProjection);
  useEffect(() => {
    function handleResize() {
      setProjection(initialProjection);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('load', handleResize);
    };
  }, []);

  const path = geoPath().projection(projections);

  const containerRef = useRef<SVGSVGElement>(null);
  const partyColors: Record<string, string> = {
    APC: 'red',
    PDP: 'yellow',
    // Add more party-color pairs as needed
    Other: 'gray',
  };
  const [selectedState, setSelectedState] = useState<any>(null);
  const handleClick = (state: any) => {
    setSelectedState(state);
  };

  console.log(result);
  return (
    <div className="relative bg-blue-500">
      <svg ref={containerRef} viewBox="0 0 100 100">
        {' '}
        <g className="regions">
          {map.features.map((feature) => {
            const stateResults = result.find(
              (r) =>
                r.state === feature.properties!.lganame ||
                r.state === feature.properties!.adminName,
            );
            if (!stateResults) return null;

            const { winner, turnout, partyVotes } = stateResults;

            const winningPartyColor = partyColors[winner] || 'gray';

            return (
              <MapPath
                key={
                  feature.properties!.lganame || feature.properties!.adminName
                }
                feature={feature}
                path={path}
                winner={winner}
                turnout={turnout}
                fill={winningPartyColor}
                partyVotes={partyVotes}
                onClick={() => handleClick(stateResults)}
              />
            );
          })}
        </g>
      </svg>
      <div className="absolute bottom-0 right-0 h-1/4 w-2/5 bg-yellow-500">
        {selectedState && (
          <div>
            <p>Winner: {selectedState.winner}</p>
            <p>Turnout: {selectedState.turnout}</p>
            <p>Party Votes: {JSON.stringify(selectedState.partyVotes)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultMap;
