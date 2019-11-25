import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_RESERVATIONS_REQUEST,
  fetchReservations,
  FetchReservationsAction,
} from 'store/reservation';
import * as reservationApi from 'api/reservation';
import { loadingEnd, loadingStart } from 'store/loading';

function* getReservations(action: FetchReservationsAction): Generator {
  try {
    yield put(loadingStart(action.type));
    const response: any = yield call(
      reservationApi.getReservationsMock,
      action.payload,
    );
    yield put(fetchReservations.success(response.data));
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
