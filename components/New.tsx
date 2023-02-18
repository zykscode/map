/* eslint-disable tailwindcss/no-custom-classname */
import type { GeoPath, GeoPermissibleObjects } from 'd3-geo';
import type { Feature, GeoJsonProperties, Geometry } from 'geojson';
import React, { useRef, useState } from 'react';

interface MapPathProps {
  // The GeoJSON feature to render
  feature: Feature<Geometry, GeoJsonProperties>;
  // The D3 GeoPath generator function for rendering the feature
  path:
    | GeoPath<any, GeoPermissibleObjects>
    | ((arg0: Feature<Geometry, GeoJsonProperties>) => string | undefined);
  // An optional click handler for the path
  onClick?: (event: React.MouseEvent<SVGPathElement>) => void;
  toggleOptions?: any;
  fill?: string;
  winner?: string;
  turnout?: number;
  partyVotes?: any;
}

const MapPath: React.FC<MapPathProps> = ({
  feature,
  path,
  toggleOptions,
  fill,
  onClick,
  // winner,
  // turnout,
  // partyVotes
}) => {
  const id = feature.properties!.lganame || feature.properties!.adminName;
  const pathRef = useRef<SVGPathElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <path
      ref={pathRef}
      id={id}
      d={path(feature)!}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`region stroke-[black] stroke-[0.1px] hover:fill-gray-300`}
      style={{ fill }}
      onClick={onClick}
    >
      {isHovered && (
        <title>
          {feature.properties!.lganame || feature.properties!.adminName}
        </title>
      )}
    </path>
  );
};

export default MapPath;
