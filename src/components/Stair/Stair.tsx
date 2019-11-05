import React from 'react';
import styled from 'styled-components';
import { CustomArrowProps } from 'react-slick';
import stair from 'resources/images/reservation/stair.png';
import { ArrowRightIcon } from 'icons';

interface SliderArrowProps extends CustomArrowProps {
  className?: string;
  direction: 'up' | 'down';
  onClick: () => void;
}

interface DirectionArrow {
  direction: 'up' | 'down';
}

const Button = styled.button`
  position: relative;
  border: 0;
`;

const StairImg = styled.img`
  width: 150px;
`;

const DirectionArrow = styled(ArrowRightIcon)<DirectionArrow>`
  position: absolute;
  top: 30px;
  left: 0;
  transform: ${({ direction }): string =>
    direction === 'up' ? 'rotate(-60deg)' : 'rotate(125deg)'};
`;

const Stair: React.FC<SliderArrowProps> = ({
  onClick,
  className,
  direction,
}) => {
  return (
    <Button type={'button'} className={className} onClick={onClick}>
      <StairImg src={stair} alt="다음 층" />
      <DirectionArrow direction={direction} />
    </Button>
  );
};

export default Stair;
