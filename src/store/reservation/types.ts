import {
  add30Minutes,
  fetchReservations,
  minus30Minutes,
  selectDateTime,
  setRecommendRoomId,
  setSelectedRoomId,
} from './actions';
import { ActionType } from 'typesafe-actions';
import { Meeting } from 'types';

const actions = {
  fetchReservations,
  selectDateTime,
  add30Minutes,
  minus30Minutes,
  setRecommendRoomId,
  setSelectedRoomId,
};

export type ReservationAction = ActionType<typeof actions>;

export interface ReservationState {
  selectedDateTime: string;
  selectedRoomId: number | null;
  reservations: Meeting[];
  recommendRoomId: number | null;
}
