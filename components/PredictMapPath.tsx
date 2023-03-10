/* eslint-disable tailwindcss/no-custom-classname */

'use client';

import type { GeoPath, GeoPermissibleObjects } from 'd3-geo';
import type { Feature, GeoJsonProperties, Geometry } from 'geojson';
import React, { useRef, useState } from 'react';

import usePopup from '#/lib/usePopup';

interface PredictMapPathProps {
  // The GeoJSON feature to render
  feature: Feature<Geometry, GeoJsonProperties>;
  // The D3 GeoPath generator function for rendering the feature
  path:
    | GeoPath<any, GeoPermissibleObjects>
    | ((arg0: Feature<Geometry, GeoJsonProperties>) => string | undefined);
  // An optional click handler for the path
  onClick?: (event: React.MouseEvent<SVGPathElement>) => void;
}

const PredictMapPath: React.FC<PredictMapPathProps> = ({ feature, path }) => {
  const [popupDisplay] = useState(false);
  const { popup, setPopup } = usePopup();
  const id = feature.properties!.lganame || feature.properties!.adminName;
  const pathRef = useRef<SVGPathElement>(null);
  const handleClick = () => {
    // allRegions.filter((a)=>a.classList.contains('active')).map(a=>a.classList.toggle('active'))
    setPopup(true);
    console.log('popup in predictPath:', popup);
    if (pathRef.current) {
      const bbox = pathRef.current.getBBox();
      const x = bbox.x + bbox.width / 2;
      const y = bbox.y + bbox.height / 2;
      console.log(`The middle of the path is at x: ${x}, y: ${y}`);
    }
  };

  return (
    <path
      ref={pathRef}
      id={id}
      d={path(feature)!}
      className={`${
        popupDisplay ? 'active' : ''
      }  region  stroke-blue-400 stroke-[0.1px] hover:fill-pink-200`}
      onClick={() => {
        handleClick();
      }}
    ></path>
  );
};

export default PredictMapPath;
