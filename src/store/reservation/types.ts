import {
  add30Minutes,
  minus30Minutes,
  selectDateTime,
  selectRoom,
  fetchReservations,
  setIsUseRooms,
} from './actions';
import { ActionType } from 'typesafe-actions';
import { Meeting, Room } from 'types';

const actions = {
  fetchReservations,
  selectDateTime,
  add30Minutes,
  minus30Minutes,
  selectRoom,
  setIsUseRooms,
};

export type ReservationAction = ActionType<typeof actions>;

export interface ReservationState {
  selectedDateTime: string;
  selectedRoomId: number | null;
  reservations: Meeting[];
  isUseRooms: Room[];
}
