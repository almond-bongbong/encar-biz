import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FloorTab from 'components/FloorTab';
import styled from 'styled-components';
import 'moment/locale/ko';
import moment from 'moment';
import Button from 'components/Button';

type selectedFloor = string | number;

const Content = styled.div``;

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

const MapArea = styled.div`
  position: relative;
  margin-top: 50px;

  img {
    display: block;
    width: 100%;
    margin: 0 auto;
  }
`;

const TabWrapper = styled(FloorTab)`
  position: absolute;
  top: 50px;
  right: 20px;

  @media screen and (max-width: 768px) {
    position: static;
    margin-bottom: 30px;
    text-align: right;
  }
`;

interface MarkerProps {
  x: number;
  y: number;
}

const Marker = styled.div<MarkerProps>`
  position: absolute;
  top: ${(props): number => props.y}%;
  left: ${(props): number => props.x}%;
  width: 140px;
  padding: 60px 10px;
  background-color: rgba(22, 23, 246, 0.69);
  color: #fff;
  font-size: 24px;
  text-align: center;
  cursor: pointer;
`;

const ButtonsWrapper = styled.div`
  text-align: center;

  > div {
    + div {
      margin-left: 10px;
    }
  }
`;

const SmartBooking: React.FC = () => {
  const [selectedFloor, setSelectedFloor] = useState<selectedFloor>(18);
  const history = useHistory();
  const [x, setX] = useState(20);
  const [y, setY] = useState(20);
  const nowTime = moment().format(`A h시 m분`);

  const handleLocation = (): void => {
    setX(Math.floor(Math.random() * 80));
    setY(Math.floor(Math.random() * 80));
  };

  const handleFloor = (value: selectedFloor): void => {
    setSelectedFloor(value);
  };

  const submitBooking = (): void => {
    history.push('/booking/1');
  };

  return (
    <Content>
      <TabWrapper
        value={selectedFloor}
        onClick={handleFloor}
        items={[{ value: 18, label: '18층' }, { value: 19, label: '19층' }]}
      />
      <Recommend>
        <div className="time">{nowTime}</div>
        <p>
          지금 <em>산토리니</em> 어때?
        </p>
      </Recommend>
      <MapArea>
        <img
          src="http://www.digipine.com/files/attach/images/1072/605/026/992a89f4ef1944f906d3f81cdc2ee177.png"
          alt=""
        />
        <Marker onClick={submitBooking} x={x} y={y}>
          지금바로
          <br />
          이용가능
        </Marker>
      </MapArea>
      <ButtonsWrapper>
        <Button height={50} onClick={handleLocation} width={200}>
          다른 회의실
        </Button>
      </ButtonsWrapper>
    </Content>
  );
};

export default SmartBooking;
