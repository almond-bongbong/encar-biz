import React from 'react';
import styled from 'styled-components';
import { CustomArrowProps } from 'react-slick';
import { ArrowLeft, ArrowRight } from 'icons';

interface SliderArrowProps extends CustomArrowProps {
  className?: string;
  direction: 'left' | 'right';
}

const Button = styled.button`
  padding: 10px;
  border: 0;
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
      {direction === 'left' && !first && <ArrowLeft />}
      {direction === 'right' && !last && <ArrowRight />}
    </Button>
  );
};

export default SliderArrow;
