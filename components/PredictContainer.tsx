/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import { geoMercator, geoPath } from 'd3-geo';
import type { FeatureCollection } from 'geojson';
import React, { useEffect, useRef, useState } from 'react';

import { states } from '#/data/states';
import type { Candidate } from '#/lib/types';

import MapPath from './MapPath';

type Props = {
  data: FeatureCollection;
  options: Candidate[];
};

type VoterData = {
  state: string;
  female: number;
  total: number;
  party: string;
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

  const handleClick = (name: string) => {
    const data = states.find((d) => d.state === name);
    data!.male = data!.total - data!.female;
    setSelectedOption(data);
  };

  console.log(selectedOption);

  return (
    <div className="flex flex-col px-4">
      <svg ref={containerRef} viewBox="0 0 100 100">
        <g className="regions">
          {data.features.map((feature) => (
            <MapPath
              key={feature.properties!.lganame || feature.properties!.adminName}
              feature={feature}
              path={path}
              onClick={() =>
                handleClick(
                  feature.properties!.lganame || feature.properties!.adminName,
                )
              }
            />
          ))}
        </g>
      </svg>
      <div className="container w-full bg-blue-500">
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
