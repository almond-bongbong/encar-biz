import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  fetchReservations,
  FETCH_RESERVATIONS_REQUEST,
} from 'store/reservation';
import * as reservationApi from 'api/reservation';

function* getReservations(): Generator {
  try {
    const reservations: any = yield call(reservationApi.getReservations);
    yield put(fetchReservations.success(reservations));
  } catch (e) {
    yield put(fetchReservations.failure(e));
  }
}

function* watchGetReservations(): Generator {
  yield takeLatest(FETCH_RESERVATIONS_REQUEST, getReservations);
}

export default function* reservationSaga(): Generator {
  yield all([fork(watchGetReservations)]);
}
