'use client';

import { usePathPositions } from '#/lib/usePathPositions';
import usePopup from '#/lib/usePopup';
import { geoMercator, geoPath, GeoPath, GeoPermissibleObjects } from 'd3-geo';
import {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
} from 'geojson';
import React, { FC, useEffect, useRef, useState } from 'react';
import PredictMapPath from './PredictMapPath';

interface Props {
  data: GeoJSON.FeatureCollection;
}

const PredictMap: FC<Props> = ({ data }) => {
  const initialProjection = () => geoMercator().fitSize([100, 100], data);
  const [total, setTotal] = useState(0);
  const [popupDisplay, setPopupDisplay] = useState(false);


  console.log(popupDisplay);
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
      {/* <div className="absolute bg-green-300 z-40 top-0"> {positions.map(({ x, y, key }) => (
        
         <div
           key={key}
           className= "leaflet-tooltip stears-tooltip text-shadow-white leaflet-zoom-animated leaflet-tooltip-center whitespace-pre-wrap border-none  p-0 leading-none text-black shadow-none"
           role="tooltip"
           style={{
             transform: `translate3d(${x}px, ${y}px, 0px)`,
           }}
         >
           {key}
         </div>
       
       ))} 
       </div> */}
    </div>
  );
};

export default PredictMap;
