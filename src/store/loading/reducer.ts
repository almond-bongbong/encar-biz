import { LoadingAction, LoadingState } from './types';
import { LOADING_START, LOADING_END } from './actions';
import { createReducer } from 'typesafe-actions';

const initialState: LoadingState = {};

const reducer = createReducer<LoadingState, LoadingAction>(initialState, {
  [LOADING_START]: (state, action) => ({
    ...state,
    [action.payload]: true,
  }),
  [LOADING_END]: (state, action) => ({
    ...state,
    [action.payload]: false,
  }),
});

export default reducer;
