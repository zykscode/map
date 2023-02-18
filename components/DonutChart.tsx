import type { ChartOptions } from 'billboard.js';
import bb, { donut } from 'billboard.js';
import React, { useEffect, useRef } from 'react';

interface DonutChartProps {
  data: Record<string, number>;
  width?: number;
  height?: number;
  title?: string;
}

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  width = 300,
  height = 300,
  title,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chartData = {
      columns: Object.entries(data),
      type: donut(),
      depth: 20,
    };
    const chartOptions: ChartOptions = {
      bindto: chartRef.current,
      data: chartData,
      donut: {
        title,
        label: {
          show: true,
          ratio: 1,
        },
      },
    };
    const chart = bb.generate(chartOptions);

    return () => {
      chart.destroy();
    };
  }, [data, title]);

  return <div ref={chartRef} style={{ width, height }} />;
};

export default DonutChart;
