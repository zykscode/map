/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import type { GeoPath, GeoPermissibleObjects } from 'd3-geo';
import { geoMercator, geoPath } from 'd3-geo';
import type { Feature, GeoJsonProperties, Geometry } from 'geojson';
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import PredictMapPath from './PredictMapPath';

interface Props {
  data: GeoJSON.FeatureCollection;
}

const PredictMap: FC<Props> = ({ data }) => {
  const initialProjection = () => geoMercator().fitSize([100, 100], data);
  const [total, setTotal] = useState(0);
  const [popupDisplay, setPopupDisplay] = useState(false);
  const [projections, setProjection] = useState(initialProjection);
  useEffect(() => {
    function handleResize() {
      const initialProjection = () => geoMercator().fitSize([100, 100], data);
      setProjection(initialProjection);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('load', handleResize);
    };
  }, []);

  let path:
    | GeoPath<any, GeoPermissibleObjects>
    | ((arg0: Feature<Geometry, GeoJsonProperties>) => string | undefined);
  path = geoPath().projection(projections);

  const containerRef = useRef<SVGSVGElement>(null);

  return (
    <div className="container bg-green-500 lg:h-[800px] lg:w-[800px]">
      <svg ref={containerRef} viewBox="0 0 100 100">
        {' '}
        <g className="regions">
          {data.features.map((feature) => (
            <PredictMapPath
              key={feature.properties!.lganame || feature.properties!.adminName}
              feature={feature}
              path={path}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default PredictMap;
