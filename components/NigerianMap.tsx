'use client';

import * as d3 from 'd3';
import React, { useState } from 'react';

import nigeria from '#/data/state.json';

const candidates = [
  { name: 'Candidate A', party: 'Party A' },
  { name: 'Candidate B', party: 'Party B' },
  { name: 'Candidate C', party: 'Party C' },
];

interface State {
  properties: {
    NAME_1: string;
  };
  path: string;
}

const NigerianMap: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<{
    name: string;
    party: string;
  } | null>(null);

  const handleCandidateSelect = (candidate: {
    name: string;
    party: string;
  }) => {
    setSelectedCandidate(candidate);
  };

  const colorScale = d3
    .scaleOrdinal<string, string>()
    .domain(candidates.map((c) => c.party))
    .range(['#f00', '#0f0', '#00f']);

  const handleStateClick = (
    event: React.MouseEvent<SVGPathElement, MouseEvent>,
    state: State,
  ) => {
    if (selectedCandidate) {
      // Update state to reflect the selected candidate for this state
      console.log(
        `State ${state.properties.NAME_1} won by ${selectedCandidate.name}`,
      );
    }
  };

  const paths = [];
  d3.geoPath()
    .projection(d3.geoMercator().fitSize([800, 600], nigeria))
    .pointRadius(2)
    .context(null)(
      nigeria.features,
      d3.geoIdentity().fitSize([800, 600], nigeria),
    )
    .forEach((d: any) => {
      paths.push(
        <path
          key={d.properties.NAME_1}
          d={d.path}
          fill={colorScale(selectedCandidate?.party || '')}
          stroke="#fff"
          strokeWidth={0.5}
          onClick={(event) => handleStateClick(event, d)}
        />,
      );
    });

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <ul className="flex flex-row space-x-2">
        {candidates.map((candidate) => (
          <li key={candidate.name}>
            <button
              className={`rounded-full px-4 py-2 text-white ${
                selectedCandidate?.party === candidate.party
                  ? 'bg-black'
                  : 'bg-gray-500'
              }`}
              onClick={() => handleCandidateSelect(candidate)}
            >
              {candidate.name}
            </button>
          </li>
        ))}
      </ul>
      <svg viewBox="0 0 800 600" className="mt-4 w-full max-w-screen-lg">
        {paths}
      </svg>
    </div>
  );
};

export default NigerianMap;
