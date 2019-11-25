import axios, { AxiosResponse } from 'axios';
import reservationsMock from 'constants/reservationsMock';
import { Meeting } from '../types';

export const getReservations = (date: string): Promise<AxiosResponse> =>
  axios.get('http://10.19.1.111:8090/rooms/reservations', {
    params: { fromDt: date },
  });

export const getReservationsMock = (
  date: string,
): Promise<{ data: Meeting[] }> =>
  new Promise<{ data: Meeting[] }>((resolve): void => {
    setTimeout(() => {
      resolve({
        data: reservationsMock,
      });
    }, 1000);
  });
