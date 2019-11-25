import {
  add30Minutes,
  fetchReservations,
  minus30Minutes,
  selectDateTime,
  setRecommendRoomId,
  setSelectedRoomId,
  FETCH_RESERVATIONS_REQUEST,
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

export interface FetchReservationsAction {
  type: typeof FETCH_RESERVATIONS_REQUEST;
  payload: string;
}
