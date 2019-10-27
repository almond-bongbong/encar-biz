import { Meeting, Room } from 'types';
import moment from 'moment';
import { MEETING_ROOMS } from 'constants/meetingRoom';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

function UseIsUseRoom(roomId: number): Room | null | undefined {
  const reservations = useSelector(
    (state: RootState) => state.reservation.reservations,
  );

  const reservation = reservations.find(
    (r: Meeting) => r.roomId === roomId && moment().isBetween(r.start, r.end),
  );

  return (
    reservation && MEETING_ROOMS.find(room => room.id === reservation.roomId)
  );
}

export default UseIsUseRoom;
