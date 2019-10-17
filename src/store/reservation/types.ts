import {
  SELECT_DATETIME,
  ADD_30_MINUTES,
  MINUS_30_MINUTES,
  SELECT_ROOM,
  selectDateTime,
  add30Minutes,
  minus30Minutes,
  selectRoom,
} from './actions';

export interface SelectDateTimeAction {
  type: typeof SELECT_DATETIME;
  payload: string;
}

export interface Add30MinutesAction {
  type: typeof ADD_30_MINUTES;
}

export interface Minus30MinutesAction {
  type: typeof MINUS_30_MINUTES;
}

export interface SelectRoomAction {
  type: typeof SELECT_ROOM;
  payload: number;
}

export type ReservationAction =
  | ReturnType<typeof selectDateTime>
  | ReturnType<typeof add30Minutes>
  | ReturnType<typeof minus30Minutes>
  | ReturnType<typeof selectRoom>;

export interface ReservationState {
  selectedDateTime: string;
  selectedRoomId: number;
}
