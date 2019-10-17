import { ReservationAction, ReservationState } from './types';
import {
  ADD_30_MINUTES,
  MINUS_30_MINUTES,
  SELECT_DATETIME,
  SELECT_ROOM,
} from './actions';
import { DATETIME_FORMAT } from 'types';
import { add30Minutes, minus30Minutes } from 'lib/datetime';
import moment from 'moment';

const initialState: ReservationState = {
  selectedDateTime: moment().format(DATETIME_FORMAT),
  selectedRoomId: 0,
};

function reducer(
  state: ReservationState = initialState,
  action: ReservationAction,
): ReservationState {
  switch (action.type) {
    case SELECT_DATETIME:
      return { ...state, selectedDateTime: action.payload };
    case ADD_30_MINUTES:
      return {
        ...state,
        selectedDateTime: add30Minutes(state.selectedDateTime),
      };
    case MINUS_30_MINUTES:
      return {
        ...state,
        selectedDateTime: minus30Minutes(state.selectedDateTime),
      };
    case SELECT_ROOM:
      return {
        ...state,
        selectedRoomId: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
