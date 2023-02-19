/* eslint-disable unused-imports/no-unused-vars */

'use client';

import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';

import type { Party } from '#/lib/types';

import ParliamentChart from './ParliamentChart';
import { TabGroup } from './TabGroup';

type Props = {
  children: ReactNode;
  repParties: Party[];
  senateParties: Party[];
  path: string;
  tabs: any[];
};

const SectionCard = ({
  children,
  repParties,
  senateParties,
  tabs,
  path,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState('senate');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const partyChart = selectedValue === 'senate' ? senateParties : repParties;
  const partyName =
    selectedValue === 'senate' ? 'Senate' : 'House of Representatives';

  const handleDropdownChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="">
      <TabGroup
        path={`/${path}`}
        items={[
          {
            text: 'Home',
          },
          ...tabs.map((x) => ({
            text: x.name,
            slug: x.slug,
          })),
        ]}
      />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:px-8 medium:grid-cols-2 bg-yellow-400">
        <div className="order-2 bg-gray-400">
          <div className="flex flex-col justify-center gap-4 p-4">
            {isMobile ? (
              <>
                <div className="small:hidden">
                  <ParliamentChart
                    name={partyName}
                    seatCount={true}
                    party={partyChart}
                  />
                </div>
                <div className="hidden justify-center gap-8 small:flex ">
                  <div className="">
                    <ParliamentChart
                      name="Senate"
                      seatCount={true}
                      party={senateParties}
                    />
                  </div>
                  <div className="">
                    <ParliamentChart
                      name="House of Representatives"
                      seatCount={true}
                      party={repParties}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex justify-center gap-4 medium:flex-row">
                <div className="">
                  <ParliamentChart
                    name="Senate"
                    seatCount={true}
                    party={senateParties}
                  />
                </div>
                <div className="">
                  <ParliamentChart
                    name="House of Representatives"
                    seatCount={true}
                    party={repParties}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default SectionCard;
