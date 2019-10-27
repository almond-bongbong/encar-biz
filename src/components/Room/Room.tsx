import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Meeting } from 'types';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import redArrowDown from 'resources/images/reservation/red-arrow-down.png';
import moment from 'moment';

interface ContainerProps {
  x: number;
  y: number;
  width: number;
  height: number;
  inUse?: boolean;
  recommended?: boolean;
}

interface RoomProps extends ContainerProps {
  id: number;
  name: string;
  meetings: Meeting[];
  selected: boolean;
  onClickRoom: (roomId: number) => void;
  isSwiping?: boolean;
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  top: ${({ y }): number => y}px;
  left: ${({ x }): number => x}px;
  z-index: 10;
  width: ${({ width }): number => width}px;
  height: ${({ height }): number => height}px;
  padding: 10px;
  border: 1px solid #666;
  background: ${({ recommended, inUse }): string =>
    inUse
      ? 'rgba(255, 0, 0, 0.4)'
      : recommended
      ? 'rgba(0, 255, 0, 0.6)'
      : 'rgba(0, 255, 0, 0.6)'};
  text-align: center;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 16px;
  color: ${({ theme }): string => theme.white};
`;

const CurrentMeeting = styled.div`
  margin-top: 8px;
  font-size: 14px;

  & > em {
    color: darkblue;
    font-weight: 700;
  }
`;

const Marker = styled.img`
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 50px;
  font-size: 20px;
  transform: translate(-50%, -50%);
  animation: point 0.5s infinite alternate;

  @keyframes point {
    from {
      margin-top: -15px;
    }
    to {
      margin-top: 0;
    }
  }
`;

const Room: React.FC<RoomProps> = ({
  id,
  name,
  recommended,
  x,
  y,
  width,
  height,
  meetings,
  selected,
  onClickRoom,
  isSwiping,
}) => {
  const selectedDateTime = useSelector(
    (state: RootState) => state.reservation.selectedDateTime,
  );
  const currentMeeting = useMemo(
    () =>
      meetings.find(
        r =>
          r.roomId === id && moment(selectedDateTime).isBetween(r.start, r.end),
        [id, meetings, selectedDateTime],
      ),
    [id, selectedDateTime, meetings],
  );

  const handleClickRoom = (): void => {
    if (!isSwiping) {
      onClickRoom(id);
    }
  };

  return (
    <>
      <Container
        inUse={!!currentMeeting}
        recommended={recommended}
        x={x}
        y={y}
        width={width}
        height={height}
        onClick={handleClickRoom}
      >
        <Title>{name}</Title>

        {currentMeeting && (
          <CurrentMeeting>
            <em>{currentMeeting.title}</em> 진행중
          </CurrentMeeting>
        )}
        {selected && <Marker src={redArrowDown} alt="" />}
      </Container>
    </>
  );
};

export default Room;
