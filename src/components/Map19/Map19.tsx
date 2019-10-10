import React from 'react';
import styled from 'styled-components';
import Room from '../Room/Room';

const MapArea = styled.div`
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

const Map19: React.FC = () => {
  return (
    <MapArea>
      <Room name={'산토리니'} x={100} y={100} width={300} height={400} />
    </MapArea>
  );
};

export default Map19;
