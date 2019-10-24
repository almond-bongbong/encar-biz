import {
  add30Minutes,
  minus30Minutes,
  selectDateTime,
  selectRoom,
  fetchReservations,
} from './actions';
import { ActionType } from 'typesafe-actions';
import { Meeting } from 'types';

const actions = {
  fetchReservations,
  selectDateTime,
  add30Minutes,
  minus30Minutes,
  selectRoom,
};

export type ReservationAction = ActionType<typeof actions>;

export interface ReservationState {
  selectedDateTime: string;
  selectedRoomId: number;
  reservations: Meeting[];
}
