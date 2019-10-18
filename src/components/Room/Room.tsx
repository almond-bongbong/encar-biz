import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import ModalPopup from 'components/ModalPopup';
import { Meeting } from 'types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { selectRoom } from 'store/reservation';
import Tooltip from 'components/Tooltip';

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

const Marker = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 30px;
  transform: translate(-50%, -50%);
`;

const RoomDetail = styled.div`
  background-color: #fff;
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
}) => {
  const dispatch = useDispatch();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const selectedDateTime = useSelector(
    (state: RootState) => state.reservation.selectedDateTime,
  );
  const currentMeeting = useMemo(() => {
    return meetings.find(r => {
      const start = moment(r.start);
      const end = moment(r.end);

      return r.roomId === id && moment(selectedDateTime).isBetween(start, end);
    });
  }, [id, meetings, selectedDateTime]);

  const handleShowPopup = (): void => {
    setShowDetail(true);
  };

  const handleClosePopup = (): void => {
    setShowDetail(false);
  };

  const handleSelectRoom = (): void => {
    dispatch(selectRoom(id));
  };

  return (
    <>
      <Tooltip content={'대충 내용이라는 글'}>
        <Container
          inUse={!!currentMeeting}
          recommended={recommended}
          x={x}
          y={y}
          width={width}
          height={height}
          onClick={handleShowPopup}
        >
          <Title>{name}</Title>

          {currentMeeting && (
            <CurrentMeeting>
              <em>{currentMeeting.title}</em> 진행중
            </CurrentMeeting>
          )}

          {selected && (
            <Marker>
              <span role={'img'} aria-label={'선택된 회의실'}>
                📍
              </span>
            </Marker>
          )}
        </Container>
      </Tooltip>

      <ModalPopup
        show={showDetail}
        keyPressESC={handleClosePopup}
        onClickDim={handleClosePopup}
      >
        <RoomDetail>
          <div>{name}</div>
          <ul>
            <li>10:00 ~ 11:00 위클리</li>
            <li>11:00 ~ 11:30 프로젝트 회의</li>
            <li>13:00 ~ 16:00 파트 회의</li>
            <li>16:00 ~ 18:00 미팅</li>
          </ul>
        </RoomDetail>
      </ModalPopup>
    </>
  );
};

export default Room;
