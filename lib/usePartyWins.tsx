import { useEffect, useState } from 'react';

import type { PartyWins, Result } from './types';

const usePartyWins = (results: Result[]) => {
  const [partyWins, setPartyWins] = useState<PartyWins>({});

  useEffect(() => {
    const partywins: PartyWins = results.reduce((acc, cur) => {
      if (cur.state !== 'FCT') {
        const { winner } = cur;
        if (winner in acc) {
          acc[winner] += 1;
        } else {
          acc[winner] = 1;
        }
      }
      return acc;
    }, {});

    setPartyWins(partywins);
  }, [results]);

  return partyWins;
};

export default usePartyWins;
