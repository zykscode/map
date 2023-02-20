/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable tailwindcss/no-custom-classname */

'use client';

import { geoMercator, geoPath } from 'd3-geo';
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import type { ElectionsResults } from '#/lib/types';
import useElectionResults from '#/lib/useElectionResults';
import usePartyWins from '#/lib/usePartyWins';

import MapPath from './New';

interface Props {
  map: GeoJSON.FeatureCollection;
  data: ElectionsResults;
  set: React.Dispatch<any>;
  selectedStates?: any;
}

const ResultMap: FC<Props> = ({ map, data, set }) => {
  const result = useElectionResults(data);
  const partyWins = usePartyWins(result);
  const initialProjection = () => geoMercator().fitSize([100, 100], map);
  const [projections, setProjection] = useState(initialProjection);
  const [partyColors, setPartyColors] = useState({
    APC: '#e03e3e',
    PDP: '#4d6461',
    Other: '#9b9a97',
  });

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
  const handleClick = (state: any) => {
    set(state);
  };

  const handlePartyColorChange = (party: string, color: string) => {
    setPartyColors((prevColors) => ({ ...prevColors, [party]: color }));
  };

  return (
    <div className="relative bg-[var(--blue-background)] px-2">
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
      <div className="absolute bottom-0 right-0 h-1/4 w-2/5 bg-yellow-500 p-1">
        <form className="flex flex-col">
          <div className="flex gap-2">
            <label className="flex gap-1">
              APC
              <input
                type="color"
                className="circle-color-input"
                value={partyColors.APC}
                onChange={(e) => handlePartyColorChange('APC', e.target.value)}
              />
            </label>
            <label className="flex">
              PDP
              <input
                className="circle-color-input"
                type="color"
                value={partyColors.PDP}
                onChange={(e) => handlePartyColorChange('PDP', e.target.value)}
              />
            </label>
          </div>
        </form>{' '}
      </div>
    </div>
  );
};

export default ResultMap;
