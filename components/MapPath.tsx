import { GeoPath, GeoPermissibleObjects } from 'd3-geo';
import { Feature, Geometry, GeoJsonProperties } from 'geojson';
import React, { useEffect, useRef } from 'react';

interface MapPathProps {
  // The GeoJSON feature to render
  feature: Feature<Geometry, GeoJsonProperties>;
  // The D3 GeoPath generator function for rendering the feature
  path:
    | GeoPath<any, GeoPermissibleObjects>
    | ((arg0: Feature<Geometry, GeoJsonProperties>) => string | undefined);
  // An optional click handler for the path
  onClick?: (event: React.MouseEvent<SVGPathElement>) => void;
}

const MapPath: React.FC<MapPathProps> = ({ feature, path, onClick }) => {
  const id = feature.properties!.lganame || feature.properties!.adminName;
  const pathRef = useRef<SVGPathElement>(null);
  const handleClick = () => {
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
      d={path(feature)}
      className="region stroke-blue-400 stroke-[0.1px] hover:fill-pink-200"
      onClick={handleClick}
    >
    {/* <text x={x} y={y} fontSize="20" className='z-20'>{key}</text>*/}
    </path> 
  );
};

export default MapPath;
