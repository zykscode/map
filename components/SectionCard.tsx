import type { ReactNode } from 'react';
import React from 'react';

import { TabGroup } from './TabGroup';

type Props = {
  children: ReactNode;

  path: string;

  tabs: any[];
};

const SectionCard = ({ children, tabs, path }: Props) => {
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
      {children}
    </div>
  );
};

export default SectionCard;
