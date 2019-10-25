import React, { ChangeEvent, useState } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { blue, clearfix, hidden } from 'style/mixin';
import _ from 'lodash';
import Button from 'components/Button';
import { MEETING_ROOMS } from 'constants/meetingRoom';
import moment, { Moment } from 'moment';
import { calcRoundMinutes } from 'lib/datetime';
import { CalcType } from 'types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface RoomDetailProps {
  roomId: number;
  selectedDateTime: string;
  submitLoading: boolean;
  onClickReservation: () => void;
  onClose: () => void;
}

const Container = styled.div`
  width: 1000px;
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
  ${clearfix}
`;

const Photo = styled.img`
  display: block;
  float: left;
  width: 400px;
  box-shadow: 2px 2px 4px 3px rgba(0, 0, 0, 0.2);
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
  const defaultCheckedDateTime = calcRoundMinutes(
    moment(selectedDateTime),
    30,
    CalcType.MINUS,
  );
  const [checkedDateTime, setCheckedDateTime] = useState<Moment[]>([
    defaultCheckedDateTime,
  ]);

  const toggleSelectTime = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = e.target;
    const [hours, minutes] = value.split(':');
    const checkedDateTime = moment(selectedDateTime);
    checkedDateTime.set('hours', parseInt(hours));
    checkedDateTime.set('minutes', parseInt(minutes));

    if (checked) {
      setCheckedDateTime(prev => prev.concat(checkedDateTime));
    } else {
      setCheckedDateTime(prev =>
        prev.filter(datetime => !datetime.isSame(checkedDateTime)),
      );
    }
  };

  return (
    <Container>
      {roomData && (
        <>
          <Title>{roomData.name}</Title>
          <SelectedDate>
            {moment(selectedDateTime).format('YYYY.MM.DD')}
          </SelectedDate>
          <RoomInfo>
            <Photo
              src={
                'https://campusu.co.kr/wp-content/uploads/2016/12/%ED%81%AC%EA%B8%B0%EB%B3%80%ED%99%98_KENN4462-1.jpg'
              }
              alt={'회의실 전경'}
            />
            <Schedule>
              <TimeTable>
                {_.range(9, 18.5, 0.5).map(hour => {
                  const start = moment(selectedDateTime)
                    .set('hours', Math.floor(hour))
                    .set('minutes', (hour % 1) * 60);
                  const end = start.clone().add(30, 'minutes');
                  const startTime = start.format('HH:mm');
                  const endTime = end.format('HH:mm');
                  const checked = checkedDateTime.some(
                    d => d.format('HH:mm') === startTime,
                  );
                  const reservedMeeting = reservations
                    .filter(r => r.roomId === roomId)
                    .find(
                      r =>
                        start.isSame(r.start) ||
                        start.isBetween(r.start, r.end),
                    );
                  const isReserved = !!reservedMeeting;

                  return (
                    <Time key={hour} active={checked} disabled={isReserved}>
                      <input
                        type={'checkbox'}
                        value={startTime}
                        checked={checked}
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
                  );
                })}
              </TimeTable>
            </Schedule>
          </RoomInfo>
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
