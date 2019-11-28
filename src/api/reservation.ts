import axios, { AxiosResponse } from 'axios';

export const getReservations = (date: string): Promise<AxiosResponse> =>
  axios.get('/rooms/reservations', {
    params: { fromDt: date },
  });

// export const getReservations = (date: string): Promise<{ data: Meeting[] }> =>
//   new Promise<{ data: Meeting[] }>((resolve): void => {
//     setTimeout(() => {
//       resolve({
//         data: reservationsMock,
//       });
//     }, 1000);
//   });
