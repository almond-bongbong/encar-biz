import axios, { AxiosResponse } from 'axios';

export const getLikeCount = (): Promise<AxiosResponse> =>
  axios.get('/rooms/like');

export const postLikeCount = (): Promise<AxiosResponse> =>
  axios.post('/rooms/like');
