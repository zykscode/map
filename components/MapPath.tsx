/* eslint-disable tailwindcss/no-custom-classname */
import type { GeoPath, GeoPermissibleObjects } from 'd3-geo';
import type { Feature, GeoJsonProperties, Geometry } from 'geojson';
import React, { useEffect, useRef, useState } from 'react';

interface MapPathProps {
  // The GeoJSON feature to render
  feature: Feature<Geometry, GeoJsonProperties>;
  // The D3 GeoPath generator function for rendering the feature
  path:
    | GeoPath<any, GeoPermissibleObjects>
    | ((arg0: Feature<Geometry, GeoJsonProperties>) => string | undefined);
  // An optional click handler for the path
  onClick?: (name: string, event: React.MouseEvent<SVGPathElement>) => void;
  toggleOptions?: any;
  color?: string;
  partyColor?: any;
}

const MapPath: React.FC<MapPathProps> = ({
  feature,
  path,
  onClick,
  partyColor,
}) => {
  const { lganame, adminName } = feature.properties!;
  const pathRef = useRef<SVGPathElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [currentPartyColor, setCurrentPartyColor] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    if (isClicked) {
      setCurrentPartyColor(partyColor);
    }
  }, [isClicked, partyColor]);

  const handleClick = (event: React.MouseEvent<SVGPathElement>) => {
    const name = lganame || adminName;
    if (onClick) {
      onClick(name, event);
    }
    setIsClicked(!isClicked);
    setCurrentPartyColor(partyColor);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <path
      ref={pathRef}
      id={lganame || adminName}
      fill={isClicked ? partyColor : currentPartyColor || 'pink'}
      d={path(feature)!}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`region stroke-[black] stroke-[0.1px] `}
      onClick={handleClick}
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
