import { DecreaseAction, IncreaseAction, IncreaseByAction } from './types';

export const INCREASE = 'counter/INCREASE' as const;
export const DECREASE = 'counter/DECREASE' as const;
export const INCREASE_BY = 'counter/INCREASE_BY' as const;

export const increase = (): IncreaseAction => ({ type: INCREASE });
export const decrease = (): DecreaseAction => ({ type: DECREASE });
export const increaseBy = (diff: number): IncreaseByAction => ({
  type: INCREASE_BY,
  payload: diff,
});
