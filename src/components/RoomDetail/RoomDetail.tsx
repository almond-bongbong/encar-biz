import React from 'react';
import styled from 'styled-components';
import { clearfix } from 'style/mixin';
import _ from 'lodash';
import { MEETING_ROOMS } from 'constants/meetingRoom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface RoomDetailProps {
  roomId: number;
  selectedDateTime: string;
}

interface ReservationAreaProps {
  topPx: number;
  heightPx: number;
}

interface PhotoProps {
  backgroundImage: string;
}

interface SelectedTimeBarProps {
  topPx: number;
}

const Container = styled.div`
  overflow: hidden;
  padding: 10px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 28px;
  text-align: left;
`;

const RoomInfo = styled.div``;

const Photo = styled.div<PhotoProps>`
  display: block;
  width: 100%;
  height: 250px;
  background-image: url(${({ backgroundImage }): string => backgroundImage});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  box-shadow: 2px 2px 4px 3px rgba(0, 0, 0, 0.2);
`;

const NoPhoto = styled.div`
  display: block;
  width: 100%;
  height: 250px;
  background-color: #666;
`;

const Content = styled.div`
  ${clearfix}
`;

const Schedule = styled.div`
  position: relative;
  margin-top: 10px;
  text-align: left;
`;

const SelectedDate = styled.div`
  position: absolute;
  top: -40px;
  left: 10px;
  font-weight: 700;
  font-size: 18px;
`;

const TimeTable = styled.div`
  border: 1px solid #eee;
`;

const Time = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
  padding: 10px 15px 9px;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  color: #fff;

  & .time {
    margin-right: 10px;
    color: #fff;
    font-family: ${({ theme }): string => theme.basicFont};
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    right: 0;
    left: 60px;
    margin-top: -1px;
    border-top: 1px solid #666;
  }
`;

const ReservationArea = styled.div<ReservationAreaProps>`
  display: flex;
  position: absolute;
  top: ${({ topPx }): number => topPx}px;
  left: 80px;
  right: 20px;
  height: ${({ heightPx }): number => heightPx}px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  font-size: 13px;
  color: #666;
  align-items: center;

  & .wrap_text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & .time {
    margin-right: 10px;
  }
`;

const SelectedTimeBar = styled.div<SelectedTimeBarProps>`
  position: absolute;
  right: -6px;
  left: 80px;
  top: ${({ topPx }): number => Math.ceil(topPx)}px;
  border-top: 2px solid #ea4335;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    right: 0;
    width: 12px;
    height: 12px;
    margin-top: -7px;
    border-radius: 50%;
    background-color: #ea4335;
  }
`;

const RoomDetail: React.FC<RoomDetailProps> = ({
  roomId,
  selectedDateTime,
}) => {
  const reservations = useSelector(
    (state: RootState) => state.reservation.reservations,
  );
  const reservationsByRoomId = reservations.filter(r => r.room.id === roomId);
  const roomData = MEETING_ROOMS.find(r => r.id === roomId);

  return (
    <Container>
      {roomData && (
        <>
          <Title>{roomData.name}</Title>
          <Content>
            <RoomInfo>
              {roomData.imgUrl ? (
                <Photo backgroundImage={roomData.imgUrl} />
              ) : (
                <NoPhoto />
              )}
            </RoomInfo>
            <Schedule>
              <SelectedDate>
                {moment(selectedDateTime).format('YYYY.MM.DD')}
              </SelectedDate>
              <TimeTable>
                {_.range(9, 20, 1).map(hour => (
                  <Time key={hour}>
                    <span className={'time'}>
                      {moment(selectedDateTime)
                        .set('hours', Math.floor(hour))
                        .set('minutes', 0)
                        .format('HH:mm')}
                    </span>
                  </Time>
                ))}
                {reservationsByRoomId.map(r => (
                  <ReservationArea
                    key={r.id}
                    topPx={
                      50 *
                        ((moment(r.startedAt).diff(
                          moment(selectedDateTime)
                            .set('hours', Math.floor(9))
                            .set('minutes', 0),
                        ) *
                          0.905) /
                          3600000) +
                      25 * 0.905
                    }
                    heightPx={
                      50 *
                      ((moment(r.endedAt).diff(moment(r.startedAt)) * 0.91) /
                        3600000)
                    }
                  >
                    <div className="wrap_text">
                      <span className="time">
                        {moment(r.startedAt).format('HH:mm')}-
                        {moment(r.endedAt).format('HH:mm')}
                      </span>
                      <span className="title">{r.name}</span>
                    </div>
                  </ReservationArea>
                ))}
                <SelectedTimeBar
                  topPx={
                    50 *
                      ((moment(selectedDateTime).diff(
                        moment(selectedDateTime)
                          .set('hours', Math.floor(9))
                          .set('minutes', 0),
                      ) *
                        0.9) /
                        3600000) +
                    25 * 0.905
                  }
                />
              </TimeTable>
            </Schedule>
          </Content>
        </>
      )}
    </Container>
  );
};

export default RoomDetail;
