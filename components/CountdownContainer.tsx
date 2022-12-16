'use client';

import React from 'react';
import { CountdownTimer } from './CountDownTimer';

type Props = {};

const CountdownContainer = (props: Props) => {
  const electionDay = new Date('2023-02-25T07:00:00Z');
  return (
    <div>
      <h1>Countdown Timer</h1>
      <CountdownTimer targetDate={electionDay} />
    </div>
  );
};

export default CountdownContainer;
