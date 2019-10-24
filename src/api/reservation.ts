import { RESERVATIONS } from 'constants/dummyData';
import { Meeting } from 'types';

export const getReservations = (): Promise<Meeting[]> =>
  new Promise((resolve): void => {
    setTimeout(() => {
      resolve(RESERVATIONS);
    }, 500);
  });

// export const getReservations = (): Meeting[] => RESERVATIONS;
