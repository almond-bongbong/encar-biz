import { Meeting, Room } from 'types';
import moment from 'moment';
import { MEETING_ROOMS } from 'constants/meetingRoom';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

function useIsUseRoom(roomId: number): Room | null | undefined {
  const { reservations, selectedDateTime } = useSelector(
    (state: RootState) => state.reservation,
  );

  const reservation = reservations.find(
    (r: Meeting) =>
      r.roomId === roomId &&
      moment(selectedDateTime).isBetween(r.start, r.end, undefined, '[]'),
  );

  return (
    reservation && MEETING_ROOMS.find(room => room.id === reservation.roomId)
  );
}

export default useIsUseRoom;
