/* eslint-disable tailwindcss/no-custom-classname */

'use client';

import React from 'react';

import { useCountdown } from '#/lib/useCountdown';

import AnimatedGradientText from './AnimatedGradientText';

type ShowCounterProps = {
  days: number | undefined;
  hours: number | undefined;
  minutes: number | undefined;
  seconds?: number | undefined;
};

type CountdownTimerProps = {
  targetDate: Date;
};

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes }: ShowCounterProps) => {
  return (
    <h1 className="show-counter">
      <AnimatedGradientText
        content={days}
        type={days && days > 1 ? 'Days' : 'Day'}
        index={1}
        startColor={'#00ca12'}
        endColor={'#f0ce12'}
      />

      <AnimatedGradientText
        content={hours}
        type={hours && hours > 1 ? 'Hours' : 'Hour'}
        index={2}
        startColor={'var(--yellow)'}
        endColor={'var(--red)'}
      />

      <AnimatedGradientText
        content={minutes}
        type={minutes && minutes > 1 ? 'Minutes' : 'Minutes'}
        startColor={'var(--blue)'}
        index={3}
        endColor={'var(--pink)'}
      />
    </h1>
  );
};

export const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (
    days &&
    hours &&
    minutes &&
    seconds &&
    days + hours + minutes + seconds <= 0
  ) {
    return <ExpiredNotice />;
  }
  return <ShowCounter days={days} hours={hours} minutes={minutes} />;
};
