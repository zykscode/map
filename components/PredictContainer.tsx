'use client';

import type { FeatureCollection } from 'geojson';
import React from 'react';

import type { Candidate } from '#/lib/types';

import Options from './Options';

type Props = {
  data: FeatureCollection;
  options: Candidate[];
};

const PredictContainer = ({ options, data }: Props) => {
  return (
    <div className="flex flex-col">
      <Options candidates={options} />
    </div>
  );
};

export default PredictContainer;
