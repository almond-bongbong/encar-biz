import React, { useRef } from 'react';
import styled from 'styled-components';

const HeartWrapper = styled.div`
  position: absolute;
  right: 100px;
  bottom: 100px;
`;

const Heart = styled.button`
  position: relative;
  width: 100px;
  height: 100px;
  background: url(https://cssanimation.rocks/images/posts/steps/heart.png)
    no-repeat right;
  cursor: pointer;

  &.is_animating {
    animation: heart-burst 0.8s steps(28) 1;
  }

  @keyframes heart-burst {
    from {
      background-position: left;
    }
    to {
      background-position: right;
    }
  }
`;

const Count = styled.div`
  margin-top: -30px;
  font-size: 20px;
  color: #fff;
  text-align: center;
  text-shadow: 1px 1px 3px 6px rgba(255, 255, 255, 0.4);
`;

const HeartButton: React.FC = () => {
  const heartRef = useRef<HTMLButtonElement>(null);

  const startAnimate = (): void => {
    setTimeout(() => {
      if (heartRef.current) heartRef.current.classList.remove('is_animating');
    }, 10);
    setTimeout(() => {
      if (heartRef.current) heartRef.current.classList.add('is_animating');
    }, 20);
  };

  const endAnimate = (): void => {
    if (heartRef.current) {
      heartRef.current.classList.remove('is_animating');
    }
  };

  return (
    <HeartWrapper>
      <Heart
        onClick={startAnimate}
        onAnimationEnd={endAnimate}
        ref={heartRef}
      />
      <Count>534</Count>
    </HeartWrapper>
  );
};

export default HeartButton;
