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

type Party = 'APC' | 'PDP' | 'Other';

type PartyColors = { [key: string]: string };

const ResultMap: FC<Props> = ({ map, data, set }) => {
  const result = useElectionResults(data);
  const partyWins = usePartyWins(result);
  const initialProjection = () => geoMercator().fitSize([100, 100], map);
  const [projections, setProjection] = useState(initialProjection);
  const [partyColors, setPartyColors] = useState<PartyColors>({
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
  const handleClick = (state: ElectionsResults[number]) => {
    set(state);
  };

  const handlePartyColorChange = (party: Party, color: string) => {
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
      <div className="w-3/7 absolute right-0 bottom-0 h-1/4 bg-yellow-500 px-1">
        <div className="max-h-full overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 z-50 bg-[var(--gray-background)] text-xs uppercase">
              <tr>
                <th className="px-1">Party</th>
                <th className="px-1">Colour</th>
                <th className="px-1">States</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(partyWins)
                .filter(([state]) => state !== 'FCT')
                .map(([party, count]) => (
                  <tr key={party}>
                    <td className="font-small p-1">{party}</td>
                    <td className="p-1">
                      <input
                        value={partyColors[party]}
                        title="party color"
                        type="color"
                        className="circle-color-input"
                        onChange={(e) =>
                          handlePartyColorChange(party, e.target.value)
                        }
                      />
                    </td>
                    <td className="p-1">{count}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultMap;
