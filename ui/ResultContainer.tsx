'use client';

import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';

import type { Party } from '#/lib/types';

import ParliamentChart from '../components/ParliamentChart';
import ResultCard from './ResultCard';

type Props = {
  children?: ReactNode;
  repParties: Party[];
  senateParties: Party[];
  map: FeatureCollection<Geometry, GeoJsonProperties>;
  data: any;
};

const ResultContainer = ({ data, map, repParties, senateParties }: Props) => {
  const [selectedValue] = useState('senate');
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

  return (
    <div className="mx-auto w-full grid grid-cols-1 gap-8 bg-green-300 px-4 md:px-8 lg:grid-cols-2">
      <div className="order-2">
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
                  table={false}
                  party={senateParties}
                />
              </div>
              <div className="">
                <ParliamentChart
                  name="House of Representatives"
                  seatCount={true}
                  party={repParties}
                  table={true}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" order-1 lg:px-4">
        <ResultCard map={map} data={data} />
      </div>
    </div>
  );
};

export default ResultContainer;
