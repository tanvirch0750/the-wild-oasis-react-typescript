import { IFromTodayFunction } from './utils';

export type IBooking = {
  created_at: ReturnType<IFromTodayFunction>;
  startDate: ReturnType<IFromTodayFunction>;
  endDate: ReturnType<IFromTodayFunction>;
  cabinId: number;
  guestId: number;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;
  numGuests: number;
};
