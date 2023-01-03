import { GeoPath, GeoPermissibleObjects } from 'd3-geo';
import { Feature, Geometry, GeoJsonProperties } from 'geojson';
import React from 'react'

interface MapPathProps {
    // The GeoJSON feature to render
    feature: Feature<Geometry, GeoJsonProperties>;
    // The D3 GeoPath generator function for rendering the feature
    path: GeoPath<any, GeoPermissibleObjects> | ((arg0: Feature<Geometry, GeoJsonProperties>) => string | undefined);
    // An optional click handler for the path
    onClick?: (event: React.MouseEvent<SVGPathElement>) => void;
  }
  
const MapPath: React.FC<MapPathProps> = ({ feature, path, onClick }) => {
    return (
      <path
        d={path(feature)}
        className="region stroke-blue-400 stroke-[1px] hover:fill-pink-200"
        onClick={onClick}
      />
    );
  };

export default MapPath