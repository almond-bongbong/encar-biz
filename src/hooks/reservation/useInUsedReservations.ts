import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Meeting } from 'types';

function useInUsedReservations(floor: number): Meeting[] {
  const { reservations, selectedDateTime } = useSelector(
    (state: RootState) => state.reservation,
  );

  return reservations.filter(
    (r: Meeting) =>
      r.room.floor === floor &&
      moment(selectedDateTime).isBetween(
        r.startedAt,
        r.endedAt,
        undefined,
        '[)',
      ),
  );
}

export default useInUsedReservations;
