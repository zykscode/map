import { useEffect, useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
  key: string;
}

interface UsePathPositionsProps {
  paths: GeoJSON.FeatureCollection;
  container: React.MutableRefObject<SVGSVGElement>;
}

const usePathPositions = ({ paths, container }: UsePathPositionsProps): Position[] => {
  const [positions, setPositions] = useState<Position[]>([]);
  
  useEffect(() => {
    const pathElements = container.current.querySelectorAll('path');
    const containerRect = container.current.getBoundingClientRect();
    const pathPositions = Array.from(pathElements).map((path) => {
      const pathRect = path.getBoundingClientRect();
      const bbox = path.getBBox();
      const x = pathRect.x + bbox.width / 2;
      const y = pathRect.y + bbox.height / 2;
      const xInPx = x - containerRect.x;
      const yInPx = y - containerRect.y;
      const key = path.getAttribute('id');
      return { x: xInPx, y: yInPx, key } as Position;
    });
    setPositions(pathPositions);
  }, [paths, container]);

  return positions;
};

export { usePathPositions };
