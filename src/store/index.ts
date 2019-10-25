import { combineReducers } from 'redux';
import loading from './loading';
import reservation from './reservation';

const rootReducer = combineReducers({
  loading,
  reservation,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
