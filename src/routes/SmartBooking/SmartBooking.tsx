import React, { useState } from 'react';
import FloorTab from 'components/FloorTab';
import styled from 'styled-components';
import 'moment/locale/ko';
import moment from 'moment';
import Button from 'components/Button';
import Room from '../../components/Room/Room';

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

const ButtonsWrapper = styled.div`
  text-align: center;

  > div {
    + div {
      margin-left: 10px;
    }
  }
`;

const MEETING_ROOM = [
  { id: 0, name: '발리', x: 130, y: 40, width: 110, height: 160, inUse: true },
  {
    id: 1,
    name: '코나키나발루',
    x: 130,
    y: 200,
    width: 110,
    height: 160,
  },
  {
    id: 2,
    name: '오키나와',
    x: 130,
    y: 360,
    width: 110,
    height: 140,
  },
  {
    id: 3,
    name: '하와이',
    x: 535,
    y: 330,
    width: 160,
    height: 170,
  },
];

const SmartBooking: React.FC = () => {
  const [selectedFloor, setSelectedFloor] = useState<selectedFloor>(18);
  const [recommendedRoom, setRecommendedRoom] = useState<number>(2);
  const nowTime = moment().format(`A h시 m분`);
  const selectedRoom = MEETING_ROOM.find(r => r.id === recommendedRoom);

  const handleRecommend = (): void => {
    const id = Math.floor(Math.random() * 4);
    setRecommendedRoom(id);
  };

  const handleFloor = (value: selectedFloor): void => {
    setSelectedFloor(value);
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
        {selectedRoom && (
          <p>
            지금 <em>{selectedRoom.name}</em> 어때?
          </p>
        )}
      </Recommend>
      <MapArea>
        <img
          src="http://www.digipine.com/files/attach/images/1072/605/026/992a89f4ef1944f906d3f81cdc2ee177.png"
          alt=""
        />
        {MEETING_ROOM.map(room => (
          <Room
            key={room.id}
            name={room.name}
            x={room.x}
            y={room.y}
            width={room.width}
            height={room.height}
            inUse={room.inUse}
            recommended={room.id === recommendedRoom}
          />
        ))}
      </MapArea>
      <ButtonsWrapper>
        <Button height={50} onClick={handleRecommend} width={200}>
          다른 회의실
        </Button>
      </ButtonsWrapper>
    </Content>
  );
};

export default SmartBooking;
