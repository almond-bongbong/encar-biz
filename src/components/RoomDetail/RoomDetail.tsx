import React, { ChangeEvent, useEffect, useState } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { blue, clearfix, hidden } from 'style/mixin';
import _ from 'lodash';
import Button from 'components/Button';
import { MEETING_ROOMS } from 'constants/meetingRoom';
import moment from 'moment';
import { roundMinutes } from 'lib/datetime';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Meeting } from 'types';

interface RoomDetailProps {
  roomId: number;
  selectedDateTime: string;
  submitLoading: boolean;
  onClickReservation: () => void;
  onClose: () => void;
}

interface Time {
  id: number;
  startTime: string;
  endTime: string;
  reservedMeeting?: Meeting;
  isReserved: boolean;
  active: boolean;
}

const Container = styled.div`
  width: 1000px;
  height: 1000px;
  padding: 50px;
  background-color: #fff;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 28px;
  text-align: left;
`;

const RoomInfo = styled.div`
  float: left;
`;

const Photo = styled.img`
  display: block;
  float: left;
  width: 400px;
  box-shadow: 2px 2px 4px 3px rgba(0, 0, 0, 0.2);
`;

const Content = styled.div`
  ${clearfix}
`;

const Schedule = styled.div`
  float: right;
  width: 350px;
  text-align: left;
`;

const TimeTable = styled.div``;

interface TimeProps {
  active: boolean;
  disabled: boolean;
}

const Time = styled.label<TimeProps>`
  display: block;
  overflow: hidden;
  padding: 5px 15px;
  height: 34px;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  cursor: pointer;
  ${({ disabled }): SimpleInterpolation =>
    disabled
      ? css`
          opacity: 0.3;
        `
      : ''};
  ${({ active }): SimpleInterpolation =>
    active
      ? css`
          background-color: ${blue};
        `
      : css`
          background-color: #eee;
        `};

  & > input {
    ${hidden}
  }

  & + & {
    margin-top: 5px;
  }

  & .time {
    margin-right: 10px;
    color: #888;
  }
`;

const SelectedDate = styled.div`
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 18px;
  text-decoration: underline;
  text-align: left;
`;

const Tags = styled.ul`
  font-size: 0;
`;

const Tag = styled.li`
  display: inline-block;
  font-size: 14px;
  vertical-align: middle;

  & + & {
    margin-left: 10px;
  }
`;

const ReservationArea = styled.div`
  margin-top: 50px;

  & > div + div {
    margin-left: 10px;
  }
`;

const RoomDetail: React.FC<RoomDetailProps> = ({
  roomId,
  selectedDateTime,
  submitLoading,
  onClickReservation,
  onClose,
}) => {
  const reservations = useSelector(
    (state: RootState) => state.reservation.reservations,
  );
  const roomData = MEETING_ROOMS.find(r => r.id === roomId);
  const [times, setTimes] = useState<Time[]>([]);

  useEffect(() => {
    const initTimes: Time[] = _.range(9, 18.5, 0.5).map((hour, index) => {
      const start = moment(selectedDateTime)
        .set('hours', Math.floor(hour))
        .set('minutes', (hour % 1) * 60);
      const end = start.clone().add(30, 'minutes');
      const startTime = start.format('HH:mm');
      const endTime = end.format('HH:mm');
      const reservedMeeting = reservations
        .filter(r => r.roomId === roomId)
        .find(r => start.isSame(r.start) || start.isBetween(r.start, r.end));
      const isReserved = !!reservedMeeting;
      const active =
        !isReserved &&
        roundMinutes(moment(selectedDateTime), 30).format('HH:mm') ===
          startTime;

      return {
        id: index,
        startTime,
        endTime,
        reservedMeeting,
        isReserved,
        active,
      };
    });

    setTimes(initTimes);
  }, [roomId, selectedDateTime, reservations]);

  const toggleSelectTime = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = e.target;
    const selectedTime = times.find(time => time.id === parseInt(value));
    if (!selectedTime) {
      return console.error(
        `id ${parseInt(value)}의 time 데이터를 찾지 못했습니다.`,
      );
    }
    const [hours, minutes] = selectedTime.startTime.split(':');
    const checkedDateTime = moment(selectedDateTime);

    checkedDateTime.set('hours', parseInt(hours));
    checkedDateTime.set('minutes', parseInt(minutes));

    setTimes(prev =>
      prev.map(time => ({
        ...time,
        active: time.id === parseInt(value) ? checked : time.active,
      })),
    );
  };

  return (
    <Container>
      {roomData && (
        <>
          <Title>{roomData.name}</Title>
          <SelectedDate>
            {moment(selectedDateTime).format('YYYY.MM.DD')}
          </SelectedDate>
          <Content>
            <RoomInfo>
              <Photo
                src={
                  'https://campusu.co.kr/wp-content/uploads/2016/12/%ED%81%AC%EA%B8%B0%EB%B3%80%ED%99%98_KENN4462-1.jpg'
                }
                alt={'회의실 전경'}
              />
              {roomData.tags && (
                <Tags>
                  {roomData.tags.map(tag => (
                    <Tag key={tag}>{`#${tag}`}</Tag>
                  ))}
                </Tags>
              )}
            </RoomInfo>
            <Schedule>
              <TimeTable>
                {times.map(
                  ({
                    id,
                    active,
                    reservedMeeting,
                    isReserved,
                    startTime,
                    endTime,
                  }) => (
                    <Time key={id} active={active} disabled={isReserved}>
                      <input
                        type={'checkbox'}
                        value={id}
                        checked={active}
                        disabled={isReserved}
                        onChange={toggleSelectTime}
                      />
                      <span
                        className={'time'}
                      >{`${startTime} ~ ${endTime}`}</span>
                      <span className={'name'}>
                        {reservedMeeting && reservedMeeting.title}
                      </span>
                    </Time>
                  ),
                )}
              </TimeTable>
            </Schedule>
          </Content>
          <ReservationArea>
            <Button
              width={130}
              color={'blue'}
              height={50}
              loading={submitLoading}
              onClick={onClickReservation}
            >
              예약하기
            </Button>
            <Button width={130} height={50} onClick={onClose}>
              닫기
            </Button>
          </ReservationArea>
        </>
      )}
    </Container>
  );
};

export default RoomDetail;
