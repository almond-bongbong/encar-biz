import {
  SelectDateTimeAction,
  Add30MinutesAction,
  Minus30MinutesAction,
  SelectRoomAction,
} from './types';

export const SELECT_DATETIME = 'reservation/SELECT_DATETIME' as const;
export const ADD_30_MINUTES = 'reservation/ADD_30_MINUTES' as const;
export const MINUS_30_MINUTES = 'reservation/MINUS_30_MINUTES' as const;
export const SELECT_ROOM = 'reservation/SELECT_ROOM' as const;

export const selectDateTime = (datetime: string): SelectDateTimeAction => ({
  type: SELECT_DATETIME,
  payload: datetime,
});

export const add30Minutes = (): Add30MinutesAction => ({
  type: ADD_30_MINUTES,
});

export const minus30Minutes = (): Minus30MinutesAction => ({
  type: MINUS_30_MINUTES,
});

export const selectRoom = (roomId: number): SelectRoomAction => ({
  type: SELECT_ROOM,
  payload: roomId,
});
