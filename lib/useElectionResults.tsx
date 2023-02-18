import { useEffect, useState } from 'react';

import type { ElectionsResults } from './types';

interface PartyVotes {
  [party: string]: number;
}

interface StateResult {
  state: string;
  partyVotes: PartyVotes;
  turnout: number;
  winner: string;
}

interface ElectionResults extends Array<StateResult> {}

const useElectionResults = (results: ElectionsResults) => {
  const [electionResults, setElectionResults] = useState<ElectionResults>([]);

  useEffect(() => {
    const resultsArray: ElectionResults = Object.entries(results).map(
      ([state, election]) => {
        const partyVotes: PartyVotes = {};
        const totalValidVotes = election['2019'].details.validVotes;

        Object.entries(election['2019'].partyVotes).forEach(
          ([party, votes]) => {
            partyVotes[party] = (votes / totalValidVotes) * 100;
          },
        );

        const totalRegisteredVoters = election['2019'].details.registeredVoters;
        const totalAccreditedVoters = election['2019'].details.accreditedVoters;
        const turnout = (totalAccreditedVoters / totalRegisteredVoters) * 100;

        let winner = '';
        let highestVote = 0;

        Object.entries(partyVotes).forEach(([party, votes]) => {
          if (votes > highestVote) {
            winner = party;
            highestVote = votes;
          }
        });

        return {
          state,
          partyVotes,
          turnout,
          winner,
        };
      },
    );

    setElectionResults(resultsArray);
  }, []);

  return electionResults;
};

export default useElectionResults;
