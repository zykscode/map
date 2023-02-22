import React, { lazy, Suspense, useMemo } from 'react';

import type { Candidate } from '#/lib/types';

interface Props {
  candidates: Candidate[];
  handleColorChange: (party: string, color: string) => void;
  partyColors?: any;
  handleCandidateClick?: any;
}

const Options: React.FC<Props> = ({
  candidates,
  handleColorChange,
  handleCandidateClick,
  partyColors,
}) => {
  const PartyLogos = useMemo(() => {
    return candidates.reduce((logos, candidate) => {
      logos[candidate.party] = lazy(() => import(`./${candidate.party}.tsx`));
      return logos;
    }, {} as Record<string, React.LazyExoticComponent<React.ComponentType>>);
  }, [candidates]);

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
              States
            </th>
          </tr>
        </thead>
        <tbody className="overflow-x-auto text-clip">
          {candidates.map((candidate) => {
            const PartyLogo = PartyLogos[candidate.party];
            const partyColor = partyColors[candidate.party];
            return (
              <tr
                className=" cursor-pointer "
                onClick={(e) => handleCandidateClick(partyColor)}
                key={candidate.candidateName}
              >
                <th scope="row" className=" px-3 py-2 font-medium">
                  {candidate.candidateName}
                </th>
                <td className="gap-1 py-2">
                  <Suspense fallback={<div>Loading...</div>}>
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
