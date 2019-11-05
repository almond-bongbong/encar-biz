import React, { ChangeEvent, useEffect, useState } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { blue, clearfix, hidden } from 'style/mixin';
import _ from 'lodash';
import toast from 'react-simple-toasts';
import { Button, Input } from 'components/common';
import { MEETING_ROOMS } from 'constants/meetingRoom';
import moment from 'moment';
import { roundMinutes } from 'lib/datetime';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Meeting } from 'types';
import { saveReservation } from 'api/reservation';

interface RoomDetailProps {
  roomId: number;
  selectedDateTime: string;
  submitLoading: boolean;
  onSaveReservation: (reservationId: number) => void;
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
  height: 900px;
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
  width: 400px;
  box-shadow: 2px 2px 4px 3px rgba(0, 0, 0, 0.2);
`;

const Content = styled.div`
  ${clearfix}
`;

const Schedule = styled.div`
  float: right;
  position: relative;
  width: 350px;
  text-align: left;
`;

const SelectedDate = styled.div`
  position: absolute;
  top: -40px;
  left: 0;
  font-weight: 700;
  font-size: 18px;
`;

const TimeTable = styled.div`
  border: 1px solid #eee;
`;

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

  & > input {
    ${hidden}
  }

  & .time {
    margin-right: 10px;
    color: #888;
    font-family: ${({ theme }): string => theme.basicFont};
  }

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

          & .time {
            color: #fff;
          }
        `
      : css`
          background-color: #fff;
        `};
`;

const Tags = styled.ul`
  margin-top: 15px;
  font-size: 0;
  text-align: left;
`;

const Tag = styled.li`
  display: inline-block;
  font-size: 15px;
  vertical-align: middle;

  & + & {
    margin-left: 10px;
  }
`;

const Form = styled.form`
  margin-top: 15px;
`;

const FormField = styled.div`
  text-align: left;

  & + & {
    margin-top: 10px;
  }

  & > label {
    display: block;
    margin-bottom: 5px;
    font-size: 16px;
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
  onSaveReservation,
  onClose,
}) => {
  const reservations = useSelector(
    (state: RootState) => state.reservation.reservations,
  );
  const roomData = MEETING_ROOMS.find(r => r.id === roomId);
  const [times, setTimes] = useState<Time[]>([]);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

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
        .find(r => start.isBetween(r.start, r.end, undefined, '[)'));
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

  const handleSubmit = async (): Promise<void> => {
    try {
      setSubmitLoading(true);
      const savedId = await saveReservation();
      toast('예약되었습니다.');
      onSaveReservation(savedId);
    } catch (e) {
      toast('저장 과정에서 문제가 발생했습니다.');
      console.error(e);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Container>
      {roomData && (
        <>
          <Title>{roomData.name}</Title>
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
              <Form>
                <FormField>
                  <label htmlFor={'title'}>회의명</label>
                  <Input id={'title'} value={''} onChange={(): void => {}} />
                </FormField>
              </Form>
            </RoomInfo>
            <Schedule>
              <SelectedDate>
                {moment(selectedDateTime).format('YYYY.MM.DD')}
              </SelectedDate>
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
                        size={30}
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
              onClick={handleSubmit}
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
