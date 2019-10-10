import React from 'react';
import Room from '../Room/Room';
import styled from 'styled-components';
import { MEETING_ROOM } from 'constants/meetingRoom';

const Container = styled.div`
  position: relative;
  margin-top: 50px;
  padding-top: 75%;
  background-color: #ddd;
  border: 1px solid #aaa;

  img {
    display: block;
    width: 100%;
    margin: 0 auto;
  }
`;

const Map18: React.FC = () => {
  return (
    <Container>
      {MEETING_ROOM.map(room => (
        <Room
          key={room.id}
          name={room.name}
          x={room.x}
          y={room.y}
          width={room.width}
          height={room.height}
          inUse={room.inUse}
        />
      ))}
    </Container>
  );
};

export default Map18;
