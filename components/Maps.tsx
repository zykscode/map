'use client';

import { geoMercator, geoPath } from 'd3-geo';
import type { FeatureCollection } from 'geojson';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import MapPath from './MapPath';

interface Props {
  map: FeatureCollection;
  handleClick: (stateName: string) => void;
}

const Map: FC<Props> = ({ map, handleClick }) => {
  const initialProjection = () => geoMercator().fitSize([100, 100], map);
  const [projection, setProjection] = useState(initialProjection);

  useEffect(() => {
    function handleResize() {
      setProjection(initialProjection);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const path = geoPath().projection(projection);

  const containerRef = useRef<SVGSVGElement>(null);

  return (
    <svg ref={containerRef} viewBox="0 0 100 100">
      <g className="regions">
        {map.features.map((feature) => (
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
  );
};

export default Map;
