import { ReservationAction, ReservationState } from './types';
import {
  ADD_30_MINUTES,
  FETCH_RESERVATIONS_SUCCESS,
  MINUS_30_MINUTES,
  SELECT_DATETIME,
  SELECT_ROOM,
} from './actions';
import { createReducer } from 'typesafe-actions';
import { DATETIME_FORMAT } from 'types';
import { add30Minutes, minus30Minutes } from 'lib/datetime';
import moment from 'moment';

const initialState: ReservationState = {
  selectedDateTime: moment().format(DATETIME_FORMAT),
  selectedRoomId: 0,
  reservations: [],
};

const reducer = createReducer<ReservationState, ReservationAction>(
  initialState,
  {
    [FETCH_RESERVATIONS_SUCCESS]: (state, action) => ({
      ...state,
      reservations: action.payload,
    }),
    [SELECT_DATETIME]: (state, action) => ({
      ...state,
      selectedDateTime: action.payload,
    }),
    [ADD_30_MINUTES]: state => ({
      ...state,
      selectedDateTime: add30Minutes(state.selectedDateTime),
    }),
    [MINUS_30_MINUTES]: state => ({
      ...state,
      selectedDateTime: minus30Minutes(state.selectedDateTime),
    }),
    [SELECT_ROOM]: (state, action) => ({
      ...state,
      selectedRoomId: action.payload,
    }),
  },
);

export default reducer;
