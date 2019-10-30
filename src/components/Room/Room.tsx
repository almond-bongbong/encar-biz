import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import { Meeting } from 'types';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import moment from 'moment';

interface ContainerProps {
  x: number;
  y: number;
  inUse?: boolean;
}

interface TitleProps {
  inUse?: boolean;
}

interface RoomProps extends ContainerProps {
  id: number;
  name: string;
  meetings: Meeting[];
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  top: ${({ y }): number => y}%;
  left: ${({ x }): number => x}%;
  z-index: -10;
  background: ${({ inUse }): string => (inUse ? 'rgba(255, 0, 0, 0.4)' : '')};
  text-align: center;
  transform: translate(-50%, -50%);
`;

const Title = styled.div<TitleProps>`
  padding: 0 5px;
  color: ${({ inUse }): string => (inUse ? '#666' : '#333')};
  font-weight: 700;
  font-size: 20px;
`;

const Room: React.FC<RoomProps> = ({ id, name, x, y, meetings }) => {
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

  return (
    <>
      <Container inUse={!!currentMeeting} x={x} y={y}>
        <Title inUse={!!currentMeeting}>{name}</Title>
      </Container>
    </>
  );
};

export default memo(Room);
