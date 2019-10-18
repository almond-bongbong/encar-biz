import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from 'styled-components';
import { MEETING_ROOMS } from 'constants/meetingRoom';
import Button from 'components/Button';

interface ReservationSubmitBarProps {
  onSubmit: () => void;
}

const Container = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 30px 50px;
  background-color: #fff;
  box-shadow: 0 -3px 5px 1px rgba(0, 0, 0, 0.1);
`;

const Name = styled.div`
  font-size: 20px;
`;

const InfoButton = styled(Button)`
  position: absolute;
  top: 50%;
  right: 160px;
  transform: translateY(-50%);
`;

const SubmitButton = styled(Button)`
  position: absolute;
  top: 50%;
  right: 50px;
  transform: translateY(-50%);
`;

const ReservationSubmitBar: React.FC<ReservationSubmitBarProps> = ({
  onSubmit,
}) => {
  const selectedRoomId = useSelector(
    (state: RootState) => state.reservation.selectedRoomId,
  );
  const selectedRoom = MEETING_ROOMS.find(r => r.id === selectedRoomId);

  return (
    <Container>
      {selectedRoom && (
        <>
          <Name>{selectedRoom.name}</Name>
          <InfoButton color={'gray'} onClick={onSubmit}>
            회의실 정보보기
          </InfoButton>
          <SubmitButton color={'red'} onClick={onSubmit}>
            예약하기
          </SubmitButton>
        </>
      )}


    </Container>
  );
};

export default ReservationSubmitBar;
