import { combineReducers } from 'redux';
import counter from './counter';
import reservation from './reservation';

const rootReducer = combineReducers({
  reservation,
  counter,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
