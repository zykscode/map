/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable tailwindcss/no-custom-classname */

'use client';

import React, { useState } from 'react';

import type { Party } from '#/lib/types';

import { PartyTable } from './PartyTable';
import SeatChart from './SeatChart';

const ParliamentChart = ({
  party,
  seatCount,
  name,
  table,
}: {
  party: Party[];
  seatCount?: boolean;
  name: string;
  table?: boolean;
}) => {
  const [partyColors, setPartyColors] = useState(() => {
    const initialColors: any = {};
    party.forEach((p: Party) => {
      initialColors[p.name] = p.colour;
    });
    return initialColors;
  });

  const handleColorChange = (name: string, color: string) => {
    setPartyColors((prevColors: any) => ({ ...prevColors, [name]: color }));
  };

  const updatedParty = party.map((p: Party) => ({
    ...p,
    colour: partyColors[p.name],
  }));

  return (
    <div className="">
      <h2 className="collection-header-title">{name}</h2>
      <div className="flex flex-col gap-6 ">
        <SeatChart parliament={updatedParty} seatCount={seatCount} />
        {table && (
          <PartyTable
            party={party}
            partyColors={partyColors}
            handleColorChange={handleColorChange}
          />
        )}
      </div>
    </div>
  );
};

export default ParliamentChart;
