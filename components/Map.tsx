'use client';

import { usePathPositions } from '#/lib/usePathPositions';
import {
  geoMercator,
  geoPath,
  GeoPath,
  GeoPermissibleObjects,
} from 'd3-geo';
import {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
} from 'geojson';
import React, { FC, useEffect, useRef, useState } from 'react';
import MapPath from './MapPath';

interface Props {
  data: GeoJSON.FeatureCollection;
}

const Map: FC<Props> = ({ data }) => {
  const initialProjection = () => geoMercator().fitSize([100, 100], data);

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
  const positions = usePathPositions({ paths: data, container: containerRef });


  return (
    <div className="container lg:h-[800px] lg:w-[800px]">
      <svg ref={containerRef} viewBox="0 0 100 100">
        {' '}
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
      
    </div>
  );
};

export default Map;
