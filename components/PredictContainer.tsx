/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import { geoMercator, geoPath } from 'd3-geo';
import type { FeatureCollection } from 'geojson';
import React, { useEffect, useRef, useState } from 'react';

import { states } from '#/data/states';
import type { Candidate } from '#/lib/types';

import MapPath from './MapPath';
import Options from './Options';

type Props = {
  data: FeatureCollection;
  options: Candidate[];
};

const PredictContainer = ({ options, data }: Props) => {
  const initialProjection = () => geoMercator().fitSize([100, 100], data);
  const [projections, setProjection] = useState(initialProjection);
  useEffect(() => {
    function handleResize() {
      setProjection(initialProjection);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const path = geoPath().projection(projections);

  const containerRef = useRef<SVGSVGElement>(null);
  const [selectedOption, setSelectedOption] = useState();
  const [selectedCandidate, setSelectedCandidate] = useState();
  const handleClick = (name: string) => {
    const data = states.find((d) => d.state === name);
    data!.male = data!.total - data!.female;
    console.log('clicked');
    setSelectedOption(data);
  };

  const [partyColors, setPartyColors] = useState<Record<string, string>>({
    APC: '#e03e3e',
    PDP: '#4d6461',
    LP: '#5b9b4c',
    NNPP: '#8b5cf6',
  });
  const handleChangeColor = (party: string, color: string) => {
    setPartyColors((prevColors) => ({ ...prevColors, [party]: color }));
  };

  return (
    <div className="flex h-screen flex-col px-4 lg:flex-row">
      <div className="w-full lg:max-w-[700px]">
        <svg ref={containerRef} viewBox="0 0 100 100">
          <g className="regions">
            {data.features.map((feature) => (
              <MapPath
                key={
                  feature.properties!.lganame || feature.properties!.adminName
                }
                feature={feature}
                path={path}
                onClick={handleClick}
                partyColor={selectedCandidate}
              />
            ))}
          </g>
        </svg>
        <Options
          candidates={options}
          partyColors={partyColors}
          handleColorChange={handleChangeColor}
          handleCandidateClick={setSelectedCandidate}
        />
      </div>
      <div className=" bg-blue-500">
        {selectedOption && (
          <div>
            <p>State: {selectedOption.state}</p>
            <p>Registered Voters: {selectedOption.total}</p>
            <p>
              Male Percentage: {selectedOption.male / selectedOption.total}%
            </p>
            <p>
              Female Percentage: {selectedOption.female / selectedOption.total}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictContainer;
