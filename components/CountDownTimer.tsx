'use client';
import { useCountdown } from '#/lib/useCountdown';
import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';

type ShowCounterProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
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

const ShowCounter = ({ days, hours, minutes, seconds }: ShowCounterProps) => {
  return (
    <h1 className="show-counter">
      <span style={{'--tw-content':days, content:'var(--content)'}} >
        <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
      </span>
      <span style={{'--content':hours}}>
        <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
      </span>
      <span style={{'--content':minutes}}>
        <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
      </span>
      <span style={{'--content':seconds}}>
        <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
      </span>
    </h1>
  );
};

export const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};
