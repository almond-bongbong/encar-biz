import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { addRootElement } from 'lib/generateElement';
import styled, { css, SimpleInterpolation } from 'styled-components';

addRootElement('tooltip-container');

interface TooltipProps {
  content: React.ReactNode;
}

interface ContentProps {
  top: number;
  left: number;
}

const Trigger = styled.div``;

const Content = styled.div<ContentProps>`
  position: absolute;
  background-color: #fff;
  box-shadow: 0 2px 3px 4px rgba(0, 0, 0, 0.1);
  ${({ top, left }): SimpleInterpolation => css`
    top: ${top}px;
    left: ${left}px;
  `};
`;

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const containerElement = document.getElementById('tooltip-container');
  const triggerElement = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<boolean>(false);

  const showTooltip = (): void => {
    setShow(true);
  };

  const hideTooltip = (): void => {
    setShow(false);
  };

  const target: HTMLElement | null =
    triggerElement.current &&
    (triggerElement.current.children[0] as HTMLElement);
  const { top = 0, left = 0 } =
    (target && target.getBoundingClientRect()) || {};

  return (
    <>
      <Trigger
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        ref={triggerElement}
      >
        {children}
      </Trigger>

      {containerElement &&
        show &&
        createPortal(
          <Content top={top} left={left}>
            {content}
          </Content>,
          containerElement,
        )}
    </>
  );
};

export default Tooltip;
