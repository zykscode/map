'use client';

import React from 'react';

type DateTimeDisplayProps = {
  value: number;
  type: string;
  _isDanger: boolean;
};

const DateTimeDisplay = ({ value, type, _isDanger }: DateTimeDisplayProps) => {
  return (
    <span
      className={`bg-gradient-to-tr from-[#007cf0] to-[#042423] bg-clip-text text-transparent transition-colors before:contents`}
    >
      {value} {type}
    </span>
  );
};

export default DateTimeDisplay;
