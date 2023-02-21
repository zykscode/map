import React, { lazy, Suspense, useState } from 'react';

import type { Candidate } from '#/lib/types';

interface Props {
  candidates: Candidate[];
}

const Options: React.FC<Props> = ({ candidates }) => {
  const [partyColors, setPartyColors] = useState<PartyColors>({
    APC: '#e03e3e',
    PDP: '#4d6461',
    lP: '#2f9c0a',
    NNPP: '#8b5cf6',
  });
  return (
    <table className="w-full overflow-x-auto text-left text-sm">
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
          return (
            <tr className="" key={candidate.candidateName}>
              <th
                scope="row"
                className="w-1/4 bg-yellow-100 px-3 py-2 font-medium"
              >
                {candidate.candidateName}
              </th>
              <td className="flex items-center gap-1  py-2">
                <Suspense fallback={<div>Loading...</div>}>
                  {candidate.party}
                  <div className="h-4 w-4 bg-[var(fg-color-1)]">
                    <PartyLogo />
                  </div>
                </Suspense>
              </td>
              <td className="px-3 py-2">
                <input
                  value={partyColors[candidate.party]}
                  title="party color"
                  type="color"
                  className="circle-color-input"
                  onChange={(e) =>
                    handleColorChange(candidate.party, e.target.value)
                  }
                />
              </td>
              <td className="px-3 py-2">{candidate.position}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Options;
