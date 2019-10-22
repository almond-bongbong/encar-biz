import React, { Fragment } from 'react';
import styled from 'styled-components';
import { clearfix } from 'style/mixin';
import _ from 'lodash';
import Button from 'components/Button';
import { MEETING_ROOMS } from '../../constants/meetingRoom';

interface RoomDetailProps {
  roomId: number;
  selectedDate: string;
  submitLoading: boolean;
  onClickReservation: () => void;
}

const Container = styled.div`
  width: 900px;
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

  & li {
    overflow: hidden;
    padding: 5px 15px;
    height: 34px;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
    background-color: #eee;
  }

  & li + li {
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
`;

const ReservationArea = styled.div`
  margin-top: 50px;

  & > div + div {
    margin-left: 5px;
  }
`;

const numberFormatting = (number: number): string =>
  number.toString().padStart(2, '0');

const RoomDetail: React.FC<RoomDetailProps> = ({
  roomId,
  selectedDate,
  submitLoading,
  onClickReservation,
}) => {
  const roomData = MEETING_ROOMS.find(r => r.id === roomId);

  return (
    <Container>
      {roomData && (
        <>
          <Title>{roomData.name}</Title>
          <RoomInfo>
            <Photo
              src={
                'https://campusu.co.kr/wp-content/uploads/2016/12/%ED%81%AC%EA%B8%B0%EB%B3%80%ED%99%98_KENN4462-1.jpg'
              }
              alt={'회의실 전경'}
            />
            <Schedule>
              <SelectedDate>{selectedDate}</SelectedDate>
              <ul>
                {_.range(9, 19).map((hour, index, array) => (
                  <Fragment key={hour}>
                    <li>
                      <span className={'time'}>{`${numberFormatting(
                        hour,
                      )}:00 ~ ${numberFormatting(hour)}:30`}</span>
                      <span className={'name'}>회의명</span>
                    </li>
                    {index + 1 !== array.length && (
                      <li>
                        <span className={'time'}>{`${numberFormatting(
                          hour,
                        )}:30 ~ ${numberFormatting(hour + 1)}:00`}</span>
                        <span className={'name'}>회의명</span>
                      </li>
                    )}
                  </Fragment>
                ))}
              </ul>
            </Schedule>
          </RoomInfo>
          <ReservationArea>
            <Button
              width={130}
              color={'gray'}
              height={50}
              loading={submitLoading}
              onClick={onClickReservation}
            >
              예약하기
            </Button>
          </ReservationArea>
        </>
      )}
    </Container>
  );
};

export default RoomDetail;
