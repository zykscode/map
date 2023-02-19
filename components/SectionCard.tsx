import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import type { ReactNode } from 'react';
import React from 'react';

import type { Party } from '#/lib/types';

import ResultContainer from './ResultContainer';
import { TabGroup } from './TabGroup';

type Props = {
  children: ReactNode;
  repParties: Party[];
  senateParties: Party[];
  path: string;
  map: FeatureCollection<Geometry, GeoJsonProperties>;
  data: any;
  tabs: any[];
};

const SectionCard = ({
  tabs,
  path,
  repParties,
  senateParties,
  data,
  map,
}: Props) => {
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
      <ResultContainer
        data={data}
        map={map}
        repParties={repParties}
        senateParties={senateParties}
      />
    </div>
  );
};

export default SectionCard;
