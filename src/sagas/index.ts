import { all, fork } from 'redux-saga/effects';
import reservation from './reservation';

export default function* rootSaga(): Generator {
  yield all([fork(reservation)]);
}
