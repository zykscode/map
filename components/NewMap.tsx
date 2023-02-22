/* eslint-disable unused-imports/no-unused-vars */
import { geoMercator, geoPath } from 'd3-geo';
import type { FC } from 'react';
import React, { useState } from 'react';

import type { Candidate } from '#/lib/types';

import MapPath from './MapPath';

interface Props {
  data: GeoJSON.FeatureCollection;
  options?: Candidate[];
}

interface StateColor {
  [state: string]: string;
}

const Map: FC<Props> = ({ data }) => {
  const initialProjection = () => geoMercator().fitSize([100, 100], data);
  const [projections, setProjection] = useState(initialProjection);
  const [stateColors, setStateColors] = useState<StateColor>({});

  const handleStateClick = (stateName: string) => {
    const newColor = stateColors[stateName] === 'green' ? 'red' : 'green';
    setStateColors((prevColors) => ({
      ...prevColors,
      [stateName]: newColor,
    }));
  };

  const path = geoPath().projection(projections);

  return (
    <div className="container relative bg-green-500 lg:h-[800px] lg:w-[800px]">
      <svg viewBox="0 0 100 100">
        <g className="regions">
          {data.features.map((feature) => (
            <MapPath
              key={feature.properties!.lganame || feature.properties!.adminName}
              feature={feature}
              path={path}
              onClick={() =>
                handleStateClick(
                  feature.properties!.lganame || feature.properties!.adminName,
                )
              }
              color={
                stateColors[
                  feature.properties!.lganame || feature.properties!.adminName
                ]
              }
            />
          ))}
        </g>
      </svg>
      <div className="absolute bottom-0 right-0 h-1/4 w-2/5 pb-4">
        {Object.keys(stateColors).length > 0 && (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 z-50 bg-[var(--gray-background)] text-xs uppercase">
                <tr className="">
                  <th scope="col" className="px-2 py-3">
                    State
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Color
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-x-auto text-clip">
                {Object.entries(stateColors).map(([state, color]) => (
                  <tr className="items-center" key={state}>
                    <td className=" px-3 py-2 font-medium">{state}</td>
                    <td className="px-3 py-2">
                      <input
                        value={color}
                        title="state color"
                        type="color"
                        className="circle-color-input"
                        onChange={(e) =>
                          setStateColors((prevColors) => ({
                            ...prevColors,
                            [state]: e.target.value,
                          }))
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
