'use client';

import {
  geoAlbers,
  geoMercator,
  geoPath,
  GeoPath,
  GeoPermissibleObjects,
} from 'd3-geo';
import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import React, { FC, useEffect, useState } from 'react';
import MapPath from './MapPath';

interface Props {
  data: GeoJSON.FeatureCollection;
}

const NewMap: FC<Props> = ({ data }) => {
  const initialProjection = () =>
    geoMercator().fitSize([window.innerWidth, window.innerHeight], data);

  const [projections, setProjection] = useState(initialProjection);
  useEffect(() => {
    function handleResize() {
      const initialProjection = () =>
        geoMercator().fitSize([window.innerWidth, window.innerHeight], data);
      setProjection(initialProjection);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('load', handleResize);
    };
  }, []);

  console.log(window.innerHeight);

  let path:
    | GeoPath<any, GeoPermissibleObjects>
    | ((arg0: Feature<Geometry, GeoJsonProperties>) => string | undefined);
  path = geoPath().projection(projections);

  return (
    <svg className="bg-green-300 md:aspect-square md:w-full lg:h-[800px] lg:w-[960px]">
      <g className="regions">
        {data.features.map((feature) => (
          <MapPath
            key={feature.properties!.lganame || feature.properties!.adminName}
            feature={feature}
            path={path}
          />
        ))}
      </g>
    </svg>
  );
};

export default NewMap;
