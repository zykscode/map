import type React from 'react';

import type { Parliament } from '@/lib/types';

interface SeatChartProps {
  parliament: Parliament;
  seatCount?: boolean;
}

declare const SeatChart: React.FC<SeatChartProps>;

export default SeatChart;
