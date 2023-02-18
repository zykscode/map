import { makeup } from '#/data/makeup';

import type { Makeup, Party, PartyMakeup, Senate } from './types';

export const getSenate = async (year: keyof Makeup) => {
  const { senate }: { senate: Senate } = makeup[year];
  const { partyMakeup }: { partyMakeup: PartyMakeup } = senate;

  const partyColors: { [key: string]: string } = {
    APC: '#e03e3e',
    PDP: '#4d6461',
    others: '#9b9a97',
  };

  const parties: Party[] = Object.keys(partyMakeup).map((party) => ({
    name: party,
    seats: partyMakeup[party].seats,
    colour: partyColors[party] || partyColors.others,
  }));

  return parties;
};
export const getRep = async (year: keyof Makeup) => {
  const { rep }: { rep: Senate } = makeup[year];
  const { partyMakeup }: { partyMakeup: PartyMakeup } = rep;

  const partyColors: { [key: string]: string } = {
    APC: '#e03e3e',
    PDP: '#4d6461',
    others: '#9b9a97',
  };

  const parties: Party[] = Object.keys(partyMakeup).map((party) => ({
    name: party,
    seats: partyMakeup[party].seats,
    colour: partyColors[party] || partyColors.others,
  }));

  return parties;
};
