'use client'
import React, { useEffect } from 'react';

type DateTimeDisplayProps = {
  value: number;
  type: string;
  isDanger: boolean;
};

const DateTimeDisplay = ({ value, type, isDanger }: DateTimeDisplayProps) => {

  return (
  <span className={`text-transparent before:contents bg-gradient-to-tr transition-colors bg-clip-text from-[#007cf0] to-[#042423]`}>{value} {" "} {type}</span>

  );
};

export default DateTimeDisplay;
