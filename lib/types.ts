export type Candidate = {
  constituency: string;
  party: string;
  position: string;
  candidateName: string;
  PWD: string;
  age: number;
  gender: string;
  qualificaton: string;
  remarks?: string | undefined | null;
};

export type Item = {
  text: string;
  slug?: string;
  segment?: string;
};

export type Parliament = {
  [key: string]: Party;
};

export interface SeatData {
  seats: number;
  colour: string;
}

export interface ElectionDetails {
  details: {
    registeredVoters: number;
    accreditedVoters: number;
    votesCast: number;
    validVotes: number;
    rejectedVotes: number;
  };
  partyVotes: Record<string, number>;
}

export type Product = {
  id: string;
  stock: number;
  rating: number;
  name: string;
  description: string;
  price: Price;
  isBestSeller: boolean;
  leadTime: number;
  image?: string;
  imageBlur?: string;
  discount?: Discount;
  usedPrice?: UsedPrice;
};

type Price = {
  amount: number;
  currency: Currency;
  scale: number;
};

type Currency = {
  code: string;
  base: number;
  exponent: number;
};

type Discount = {
  percent: number;
  expires?: number;
};

type UsedPrice = {
  amount: number;
  currency: Currency;
  scale: number;
};

export type Makeup = {
  [key: number]: {
    senate: Senate;
    rep: Senate;
  };
};

export interface ElectionsResults {
  [state: string]: Record<string, ElectionDetails>;
}

export interface Party {
  name: string;
  seats: number;
  colour: string;
}

export interface PartyMakeup {
  [key: string]: {
    seats: number;
  };
}

export interface GenderMakeUp {
  male: number;
  female: number;
}

export interface Senate {
  partyMakeup: PartyMakeup;
  genderMakeUp: GenderMakeUp;
}
