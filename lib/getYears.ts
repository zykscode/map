import { cache } from 'react';

export type PageProps = {
  params?: any;
  children?: React.ReactNode;
};

export type Election = {
  name: string;
  slug: string;
};
export type Year = {
  name: number;
  slug: string;
  elections: Omit<Election, 'elections'>[];
};

export const getYears = cache((): Year[] => [
  {
    name: 2019,
    slug: '2019',
    elections: [
      { name: 'senate', slug: 'senate' },
      { name: 'rep', slug: 'reps' },
      { name: 'president', slug: 'president' },
    ],
  },
  {
    name: 2015,
    slug: '2015',
    elections: [
      { name: 'senate', slug: 'senate' },
      { name: 'rep', slug: 'reps' },
      { name: 'president', slug: 'president' },
    ],
  },
]);

export async function fetchYearBySlug(slug: string | undefined) {
  return getYears().find((year) => year.slug === slug);
}

export async function fetchYears(): Promise<Year[]> {
  return getYears();
}
