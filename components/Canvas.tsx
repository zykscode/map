import React from 'react';
import { geoPath, geoMercator } from 'd3-geo';
import { event, select } from 'd3-selection';
import { useResizeObserver } from 'react-resize-observer';

interface MapProps {
  geoJson: GeoJSON.FeatureCollection<GeoJSON.GeometryObject>;
}

const Map: React.FC<MapProps> = ({ geoJson }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const contextRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const dimensions = useResizeObserver();

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    contextRef.current = context;

    const svg = select(context.canvas)
      .append('svg')
      .style('position', 'absolute');

    const projection = geoMercator().fitSize([800, 800], geoJson);
    const pathGenerator = geoPath().projection(projection);

    svg
      .selectAll('path')
      .data(geoJson.features)
      .join('path')
      .attr('d', (feature: GeoJSON.Feature<GeoJSON.GeometryObject>) => pathGenerator(feature))
      .attr('fill', '#ccc')
      .attr('stroke', '#333')
      .on('mouseenter', (feature: GeoJSON.Feature<GeoJSON.GeometryObject>) => {
        svg
          .selectAll('path')
          .attr('fill', '#ccc')
          .attr('stroke', '#333');
        event.target.setAttribute('fill', '#f00');
      })
      .on('mouseleave', (feature: GeoJSON.Feature<GeoJSON.GeometryObject>) => {
        event.target.setAttribute('fill', '#ccc');
      });

    return () => {
      svg.remove();
    };
  }, [geoJson]);

  React.useEffect(() => {
    const context = contextRef.current;

    if (context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      width={Math.min(dimensions.width, 800)}
      height={Math.min(dimensions.height, 800)}
    />
  );
};

export default Map;
