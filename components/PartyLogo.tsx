import React from 'react';
import { parties } from './Parties';



type Props = {};

const PartyLogo = (props: Props) => {
  return (
    <div className="">
     
      {parties.map((party) => {
        return (
          <svg
            className="h-[10rem] w-[10rem] bg-green-500"
            key={party.name}
            viewBox={`0,0, ${party.viewBox[0]},${party.viewBox[1]}`}
          >
            {party.logo}
          </svg>
        );
      })}
    </div>
  );
};

export default PartyLogo;
