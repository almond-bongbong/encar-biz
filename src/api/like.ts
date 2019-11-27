import axios, { AxiosResponse } from 'axios';

export const getLikeCount = (): Promise<AxiosResponse> =>
  axios.get('http://10.19.1.111:8090/rooms/like');

export const postLikeCount = (): Promise<AxiosResponse> =>
  axios.post('http://10.19.1.111:8090/rooms/like');
