import React, { lazy, Suspense, useState } from 'react';

import type { Candidate } from '#/lib/types';

interface Props {
  candidates: Candidate[];
  onColorSelected: (party: string, color: string) => void;
}

const Options: React.FC<Props> = ({ candidates, onColorSelected }) => {
  const [partyColors, setPartyColors] = useState<Record<string, string>>({});

  const handleColorChange = (party: string, color: string) => {
    setPartyColors((prevColors) => ({
      ...prevColors,
      [party]: color,
    }));
    onColorSelected(party, color);
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="sticky top-0 z-50 bg-[var(--gray-background)] text-xs uppercase">
          <tr className="">
            <th scope="col" className="px-2 py-3">
              Candidate
            </th>
            <th scope="col" className="px-2 py-3">
              Party
            </th>
            <th scope="col" className="px-2 py-3">
              Colour
            </th>
            <th scope="col" className="px-2 py-3">
              Seat
            </th>
          </tr>
        </thead>
        <tbody className="overflow-x-auto text-clip">
          {candidates.map((candidate) => {
            const PartyLogo = lazy(() => import(`./${candidate.party}.tsx`));
            const partyColor = partyColors[candidate.party];
            return (
              <tr className="items-center" key={candidate.candidateName}>
                <th scope="row" className=" px-3 py-2 font-medium">
                  {candidate.candidateName}
                </th>
                <td className="flex items-center gap-1 py-2">
                  <Suspense fallback={<div>Loading...</div>}>
                    {candidate.party}
                    <div className="h-4 w-4 bg-[var(fg-color-1)]">
                      <PartyLogo />
                    </div>
                  </Suspense>
                </td>
                <td className="px-3 py-2">
                  <input
                    value={partyColor || ''}
                    title="party color"
                    type="color"
                    className="circle-color-input"
                    onChange={(e) =>
                      handleColorChange(candidate.party, e.target.value)
                    }
                  />
                </td>
                <td className="px-3 py-2">0</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Options;
