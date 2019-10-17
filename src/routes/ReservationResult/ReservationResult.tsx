import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const Recommend = styled.div`
  font-size: 28px;

  p {
    margin-top: 10px;

    em {
      margin: 0 5px;
      font-size: 36px;
      text-decoration: underline;
    }
  }
`;

const ReservationResult: React.FC = () => {
  const nowTime = moment().format(`A h시 m분`);

  return (
    <div>
      <Recommend>
        <div className="time">{nowTime}</div>
        <p>
          지금 <em>산토리니</em> 예약완료!
        </p>
        <div
          style={{
            marginTop: 30,
            padding: '30px 30px 200px',
            backgroundColor: '#eee',
          }}
        >
          예약 정보
        </div>
      </Recommend>
    </div>
  );
};

export default ReservationResult;
