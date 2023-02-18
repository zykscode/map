import React from 'react';

import DonutChart from './DonutChart';

interface DonutProps {
  className?: string;
  data: Record<string, number>;
  width?: number;
  height?: number;
  title?: string;
}

function Donut({ className, data, height, width, title }: DonutProps) {
  return (
    <div className={className}>
      <DonutChart data={data} width={width} height={height} title={title} />
    </div>
  );
}

export default Donut;
