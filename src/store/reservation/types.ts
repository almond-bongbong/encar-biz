import {
  add30Minutes,
  fetchReservations,
  minus30Minutes,
  selectDateTime,
  setRecommendRoom,
} from './actions';
import { ActionType } from 'typesafe-actions';
import { Meeting, Room } from 'types';

const actions = {
  fetchReservations,
  selectDateTime,
  add30Minutes,
  minus30Minutes,
  setRecommendRoom,
};

export type ReservationAction = ActionType<typeof actions>;

export interface ReservationState {
  selectedDateTime: string;
  selectedRoomId: number | null;
  reservations: Meeting[];
  recommendRoom: Room | null;
}
