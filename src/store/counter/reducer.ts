import { CounterAction, CounterState } from './types';
import { DECREASE, INCREASE, INCREASE_BY } from './actions';

const initialState: CounterState = {
  count: 0,
};

function reducer(
  state: CounterState = initialState,
  action: CounterAction,
): CounterState {
  switch (action.type) {
    case INCREASE:
      return { count: state.count + 1 };
    case DECREASE:
      return { count: state.count - 1 };
    case INCREASE_BY:
      return { count: state.count + action.payload };
    default:
      return state;
  }
}

export default reducer;
