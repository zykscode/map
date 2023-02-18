/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import type { GeoPath, GeoPermissibleObjects } from 'd3-geo';
import { geoMercator, geoPath } from 'd3-geo';
import type { Feature, GeoJsonProperties, Geometry } from 'geojson';
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import MapPath from './MapPath';

interface Props {
  data: GeoJSON.FeatureCollection;
}

// const NewMap: FC<Props> = ({ data }) => {
//   const initialProjection = () =>
//     geoMercator().fitSize([window.innerWidth, window.innerHeight], data);

//   const [projections, setProjection] = useState(initialProjection);
//   useEffect(() => {
//     function handleResize() {
//       const initialProjection = () =>
//         geoMercator().fitSize([window.innerWidth, window.innerHeight], data);
//       setProjection(initialProjection);
//     }

//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('load', handleResize);
//     };
//   }, []);

//   console.log(window.innerHeight);

//   let path:
//     | GeoPath<any, GeoPermissibleObjects>
//     | ((arg0: Feature<Geometry, GeoJsonProperties>) => string | undefined);
//   path = geoPath().projection(projections);

//   return (
//     <svg className="bg-green-300 md:aspect-square md:w-full lg:h-[800px] lg:w-[960px]">
//       <g className="regions">
//         {data.features.map((feature) => (
//           <MapPath
//             key={feature.properties!.lganame || feature.properties!.adminName}
//             feature={feature}
//             path={path}
//           />
//         ))}
//       </g>
//     </svg>
//   );
// };

const NewMap: FC<Props> = ({ data }) => {
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

  return (
    <div className="container lg:h-[800px] lg:w-[800px]">
      <svg ref={containerRef} viewBox="0 0 100 100">
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

export default NewMap;
