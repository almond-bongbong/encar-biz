import { createStandardAction } from 'typesafe-actions';

export const LOADING_START = 'loading/LOADING_START';
export const LOADING_END = 'loading/LOADING_END';

export const loadingStart = createStandardAction(LOADING_START)<string>();
export const loadingEnd = createStandardAction(LOADING_END)<string>();
