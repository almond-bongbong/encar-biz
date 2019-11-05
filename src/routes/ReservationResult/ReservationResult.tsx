import React from 'react';
import styled from 'styled-components';
import { Button } from 'components/common';

interface ReservationResultProps {
  onClose: () => void;
}

const Container = styled.div`
  width: 400px;
  padding: 50px;
  background-color: #fff;
  font-size: 28px;

  p {
    margin-bottom: 30px;

    em {
      margin: 0 5px;
      font-size: 36px;
      text-decoration: underline;
    }
  }
`;

const ReservationResult: React.FC<ReservationResultProps> = ({ onClose }) => {
  return (
    <Container>
      <p>
        <em>산토리니</em> 예약완료!
      </p>
      <Button onClick={onClose}>확인</Button>
    </Container>
  );
};

export default ReservationResult;
