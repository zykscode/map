import type { Item } from '#/lib/types';

import { Tab } from './Tab';

export const TabGroup = ({ path, items }: { path: string; items: Item[] }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 bg-green-200">
      {items.map((item) => (
        <Tab key={path + item.slug} item={item} path={path} />
      ))}
    </div>
  );
};
