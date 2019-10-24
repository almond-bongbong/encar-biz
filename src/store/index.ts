import { combineReducers } from 'redux';
import reservation from './reservation';

const rootReducer = combineReducers({
  reservation,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
