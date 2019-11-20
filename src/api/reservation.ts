import axios, { AxiosResponse } from 'axios';

export const getReservations = (date: string): Promise<AxiosResponse> =>
  axios.get('http://10.19.1.111:8090/rooms/reservations', {
    params: { fromDt: date },
  });

export const saveReservation = (): Promise<number> =>
  new Promise<number>((resolve): void => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
