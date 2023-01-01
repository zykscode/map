'use client'
import React, { FC, useEffect, useRef } from 'react';
import { geoPath, geoMercator } from 'd3-geo';
import d3, { select } from 'd3';

interface MapProps {
  geoJson: GeoJSON.FeatureCollection<GeoJSON.GeometryObject>;
}

const Map: FC<MapProps> = ({ geoJson }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = select(svgRef.current);
    const projection = geoMercator().fitSize([800, 800], geoJson);
    const pathGenerator = geoPath().projection(projection);

    svg
      .selectAll('path')
      .data(geoJson.features)
      .join('path')
      .attr('d', (feature: GeoJSON.Feature<GeoJSON.GeometryObject>) => pathGenerator(feature))
      .attr('fill', '#ccc')
      .attr('stroke', '#333');
  }, [geoJson]);

  return <svg ref={svgRef} width={800} height={800} />;
};

export default Map;
