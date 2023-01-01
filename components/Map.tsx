'use client';

import React from 'react';
import { geoPath, geoMercator } from 'd3-geo';

interface Props {
  data: GeoJSON.FeatureCollection;
  width: number;
  height: number;
}

const Map: React.FC<Props> = ({ data, width, height }) => {
  const projection = geoMercator().fitSize([width, height], data);
  const path = geoPath().projection(projection);

  return (
    <svg width={width} height={height}>
      <g className="regions">
        {data.features.map((feature) => (
          <path
            key={feature.properties!.adminName}
            d={path(feature)}
            className="region hover:fill-pink-200 stroke-blue-400 stroke-[4px]"
            onClick={() => console.log(feature.properties!.adminName)}
          />
        ))}
      </g>
    </svg>
  );
};

export default Map;
