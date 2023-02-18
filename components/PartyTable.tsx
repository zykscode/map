import React from 'react';

import type { Party } from '#/lib/types';

type Props = {
  party: Party[];
  handleColorChange: (name: string, color: string) => void;
  partyColors: any;
};

export const PartyTable = ({
  party,
  handleColorChange,
  partyColors,
}: Props) => {
  return (
    <div className="relative mx-auto h-[200px] overflow-x-auto shadow-md sm:rounded-lg">
      <table className=" text-left text-sm">
        <thead className="sticky top-0 z-50 bg-[var(--gray-background)] text-xs uppercase">
          <tr className="">
            <th scope="col" className="px-2 py-3">
              Party
            </th>
            <th scope="col" className="px-2 py-3">
              Colour
            </th>
            <th scope="col" className="px-2 py-3">
              Seats
            </th>
          </tr>
        </thead>
        <tbody className="text-clip">
          {party.map((p: any) => (
            <tr key={p.name}>
              <th
                scope="row"
                className="whitespace-nowrap px-3 py-4 font-medium"
              >
                {p.name}
              </th>
              <td className="px-3 py-4">
                <input
                  value={partyColors[p.name]}
                  title="party color"
                  type="color"
                  className="circle-color-input"
                  onChange={(e) => handleColorChange(p.name, e.target.value)}
                />
              </td>
              <td className="px-3 py-4">{p.seats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
