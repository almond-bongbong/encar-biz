import { RESERVATIONS } from 'constants/dummyData';
import { Meeting } from 'types';

export const getReservations = (): Promise<Meeting[]> =>
  new Promise((resolve): void => {
    setTimeout(() => {
      resolve(RESERVATIONS);
    }, 500);
  });

export const saveReservation = (): Promise<number> =>
  new Promise<number>((resolve): void => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
