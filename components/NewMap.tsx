'use client'

import { geoMercator, geoPath } from 'd3-geo';
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import type { Candidate } from '#/lib/types';

import MapPath from './MapPath';
import Options from './Options';

interface Props {
  data: GeoJSON.FeatureCollection;
  options: Candidate[];
}

const Map: FC<Props> = ({ data, options }) => {
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
  const [optionsVisible, setOptionsVisible] = useState(false);
  const toggleOptionsTrue = () => setOptionsVisible(true);
  const toggleOptions = () => setOptionsVisible(!optionsVisible);
  // const toggleOptionsFlase = () => setOptionsVisible(false);
  return (
    <div className="container relative bg-green-500 lg:h-[800px] lg:w-[800px]">
      <svg ref={containerRef} viewBox="0 0 100 100">
        {' '}
        <g className="regions">
          {data.features.map((feature) => (
            <MapPath
              key={feature.properties!.lganame || feature.properties!.adminName}
              feature={feature}
              path={path}
              toggleOptions={toggleOptionsTrue}
            />
          ))}
        </g>
      </svg>
      {
        <div className="absolute bottom-0 right-0 h-1/4 w-2/5 pb-4">
          <div onClick={toggleOptions}>
            {optionsVisible && <Options candidates={options} />}
          </div>
        </div>
      }
    </div>
  );
};

export default Map;
