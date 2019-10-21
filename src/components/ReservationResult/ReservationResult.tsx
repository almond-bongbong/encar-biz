import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 50px;
  background-color: #fff;
  text-align: left;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 24px;
`;

const Description = styled.p`
  margin-top: 10px;
  font-size: 16px;
`;

const InfoWrapper = styled.div`
  margin-top: 40px;
`;

const Info = styled.div`
  display: table;
  table-layout: fixed;
  
  & + & {
    margin-top: 10px;
  }

  & em {
    display: table-cell;
    width: 80px;
    color: #888;
  }

  & span {
    display: table-cell;
  }
`;

const ReservationResult: React.FC = () => {
  return (
    <Container>
      <Title>예약 완료</Title>
      <Description>예약하신 내용은 아래와 같습니다.</Description>
      <InfoWrapper>
        <Info>
          <em>회의실</em>
          <span>코타키나발루</span>
        </Info>
        <Info>
          <em>예약시간</em>
          <span>2019.11.17 13:00 ~ (2시간)</span>
        </Info>
        <Info>
          <em>회의명</em>
          <span>우리는 어디로 가고 있는가?</span>
        </Info>
        <Info>
          <em>예약</em>
          <span>이충만</span>
        </Info>
      </InfoWrapper>
    </Container>
  );
};

export default ReservationResult;
