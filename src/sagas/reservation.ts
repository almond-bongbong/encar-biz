import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  fetchReservations,
  FETCH_RESERVATIONS_REQUEST,
  setIsUseRooms,
  ReservationAction,
} from 'store/reservation';
import * as reservationApi from 'api/reservation';
import moment from 'moment';
import { Meeting } from 'types';
import { MEETING_ROOMS } from 'constants/meetingRoom';
import { loadingEnd, loadingStart } from 'store/loading';

function* getReservations(action: ReservationAction): Generator {
  try {
    yield put(loadingStart(action.type));
    const reservations: any = yield call(reservationApi.getReservations);
    const isUseRooms = reservations
      .filter((r: Meeting) => moment().isBetween(r.start, r.end))
      .map((r: Meeting) => MEETING_ROOMS.find(room => room.id === r.roomId));

    yield put(fetchReservations.success(reservations));
    yield put(setIsUseRooms(isUseRooms));
  } catch (e) {
    yield put(fetchReservations.failure(e));
  } finally {
    yield put(loadingEnd(action.type));
  }
}

function* watchGetReservations(): Generator {
  yield takeLatest(FETCH_RESERVATIONS_REQUEST, getReservations);
}

export default function* reservationSaga(): Generator {
  yield all([fork(watchGetReservations)]);
}
