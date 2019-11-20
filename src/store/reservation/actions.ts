import { createStandardAction, createAsyncAction } from 'typesafe-actions';
import { Meeting } from 'types';

export const FETCH_RESERVATIONS_REQUEST =
  'reservation/FETCH_RESERVATIONS_REQUEST';
export const FETCH_RESERVATIONS_SUCCESS =
  'reservation/FETCH_RESERVATIONS_SUCCESS';
export const FETCH_RESERVATIONS_FAILURE =
  'reservation/FETCH_RESERVATIONS_FAILURE';
export const SELECT_DATETIME = 'reservation/SELECT_DATETIME';
export const ADD_30_MINUTES = 'reservation/ADD_30_MINUTES';
export const MINUS_30_MINUTES = 'reservation/MINUS_30_MINUTES';
export const SET_RECOMMEND_ROOM_ID = 'reservation/SET_RECOMMEND_ROOM_ID';
export const SET_SELECTED_ROOM_ID = 'reservation/SET_SELECTED_ROOM_ID';

export const fetchReservations = createAsyncAction(
  FETCH_RESERVATIONS_REQUEST,
  FETCH_RESERVATIONS_SUCCESS,
  FETCH_RESERVATIONS_FAILURE,
)<string, Meeting[], Error>();
export const selectDateTime = createStandardAction(SELECT_DATETIME)<string>();
export const add30Minutes = createStandardAction(ADD_30_MINUTES)();
export const minus30Minutes = createStandardAction(MINUS_30_MINUTES)();
export const setRecommendRoomId = createStandardAction(SET_RECOMMEND_ROOM_ID)<
  number | null
>();
export const setSelectedRoomId = createStandardAction(SET_SELECTED_ROOM_ID)<
  number | null
>();
