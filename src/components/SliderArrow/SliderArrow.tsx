import React from 'react';
import styled from 'styled-components';
import { CustomArrowProps } from 'react-slick';
import { ArrowLeft, ArrowRight } from 'icons';
import stair from 'resources/images/reservation/stair.png';

interface SliderArrowProps extends CustomArrowProps {
  className?: string;
  direction: 'left' | 'right';
}

const Button = styled.button`
  padding: 10px;
  border: 0;
`;

const Stair = styled.img`
  width: 200px;
`;

const SliderArrow: React.FC<SliderArrowProps> = ({
  onClick,
  currentSlide,
  slideCount,
  className,
  direction,
}) => {
  const first = currentSlide === 0;
  const last = currentSlide === (slideCount || 0) - 1;

  return (
    <Button type={'button'} className={className} onClick={onClick}>
      <Stair src={stair} alt="다음 층" />
      {direction === 'left' && !first && <ArrowLeft />}
      {direction === 'right' && !last && <ArrowRight />}
    </Button>
  );
};

export default SliderArrow;
