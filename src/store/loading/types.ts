import { loadingStart, loadingEnd } from './actions';
import { ActionType } from 'typesafe-actions';

const actions = {
  loadingStart,
  loadingEnd,
};

export type LoadingAction = ActionType<typeof actions>;

export interface LoadingState {
  [key: string]: boolean;
}
