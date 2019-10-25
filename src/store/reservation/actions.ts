import { createStandardAction, createAsyncAction } from 'typesafe-actions';
import { Meeting, Room } from 'types';

export const FETCH_RESERVATIONS_REQUEST =
  'reservation/FETCH_RESERVATIONS_REQUEST';
export const FETCH_RESERVATIONS_SUCCESS =
  'reservation/FETCH_RESERVATIONS_SUCCESS';
export const FETCH_RESERVATIONS_FAILURE =
  'reservation/FETCH_RESERVATIONS_FAILURE';
export const SELECT_DATETIME = 'reservation/SELECT_DATETIME';
export const ADD_30_MINUTES = 'reservation/ADD_30_MINUTES';
export const MINUS_30_MINUTES = 'reservation/MINUS_30_MINUTES';
export const SELECT_ROOM = 'reservation/SELECT_ROOM';
export const SET_IS_USE_ROOMS = 'reservation/SET_IS_USE_ROOMS';

export const fetchReservations = createAsyncAction(
  FETCH_RESERVATIONS_REQUEST,
  FETCH_RESERVATIONS_SUCCESS,
  FETCH_RESERVATIONS_FAILURE,
)<void, Meeting[], Error>();
export const selectDateTime = createStandardAction(SELECT_DATETIME)<string>();
export const add30Minutes = createStandardAction(ADD_30_MINUTES)();
export const minus30Minutes = createStandardAction(MINUS_30_MINUTES)();
export const selectRoom = createStandardAction(SELECT_ROOM)<number>();
export const setIsUseRooms = createStandardAction(SET_IS_USE_ROOMS)<Room[]>();
