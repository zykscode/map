'use client';
import React, { useEffect, useState } from 'react';
import { geoPath, geoMercator, GeoPath, GeoPermissibleObjects } from 'd3-geo';
import { Feature, Geometry, GeoJsonProperties } from 'geojson';

interface Props {
  data: GeoJSON.FeatureCollection;
}

const Map: React.FC<Props> = ({ data }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function getWindowSize() {
      setWindowWidth(window.innerWidth);
    }
    function handleResize() {
      setWindowWidth(window.innerWidth);
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('load', getWindowSize);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
    };
  }, []);

  let projection;
  let path:
    | GeoPath<any, GeoPermissibleObjects>
    | ((arg0: Feature<Geometry, GeoJsonProperties>) => string | undefined);
  if (windowWidth > 960) {
    projection = geoMercator().fitSize([960, 800], data);
    path = geoPath().projection(projection);
  } else {
    console.log(window.innerWidth);
    projection = geoMercator().fitSize(
      [
        dimensions.width - 32 || window.innerWidth,
        dimensions.height || window.innerWidth,
      ],
      data,
    );
    path = geoPath().projection(projection);
  }

  return (
    <svg
      style={{
        width:
          dimensions.width > 960 ? 992 : dimensions.width || window.innerWidth,
        height:
          dimensions.height > 800
            ? 800
            : dimensions.height || window.innerWidth,
      }}
    >
      <g className="regions">
        {data.features.map((feature) => (
          <path
            key={feature.properties!.adminName}
            d={path(feature)}
            className="region stroke-blue-400 stroke-[1px] hover:fill-pink-200"
            onClick={() => console.log(feature.properties!.adminName)}
          />
        ))}
      </g>
    </svg>
  );
};

export default Map;
