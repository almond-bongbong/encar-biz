import React from 'react';
import styled from 'styled-components';
import { clearfix } from '../../style/mixin';
import Button from '../Button';

interface RoomDetailProps {
  roomName: string;
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
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
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

const RoomDetail: React.FC<RoomDetailProps> = ({
  roomName,
  selectedDate,
  submitLoading,
  onClickReservation,
}) => {
  return (
    <Container>
      <Title>{roomName}</Title>
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
            <li>
              <span className={'time'}>10:00 ~ 11:00</span>
              <span className={'name'}>위클리</span>
            </li>
            <li>
              <span className={'time'}>11:00 ~ 11:30</span>
              <span className={'name'}>프로젝트 회의</span>
            </li>
            <li>
              <span className={'time'}>13:00 ~ 16:00</span>
              <span className={'name'}>파트 회의</span>
            </li>
            <li>
              <span className={'time'}>16:00 ~ 18:00</span>
              <span className={'name'}>
                긴 이름의 미팅입니다 긴 이름의 미팅입니다
              </span>
            </li>
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
    </Container>
  );
};

export default RoomDetail;
