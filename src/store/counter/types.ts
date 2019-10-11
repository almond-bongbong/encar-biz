import {
  DECREASE,
  INCREASE,
  INCREASE_BY,
  increase,
  decrease,
  increaseBy,
} from './actions';

export interface IncreaseAction {
  type: typeof INCREASE;
}

export interface DecreaseAction {
  type: typeof DECREASE;
}

export interface IncreaseByAction {
  type: typeof INCREASE_BY;
  payload: number;
}

export type CounterAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>;

export interface CounterState {
  count: number;
}
