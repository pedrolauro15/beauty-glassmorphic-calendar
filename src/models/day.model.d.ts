import { Moment } from "moment";

export interface IDay {
  date: Moment;
  literals: number;
  weekday: number;
}

export type Day = IDay | 'NOT';