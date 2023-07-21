export type ICabin = {
  id?: number;
  created_at?: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image?: string | undefined;
  description: string;
};
