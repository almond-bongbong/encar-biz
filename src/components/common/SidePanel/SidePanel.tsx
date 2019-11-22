import React, { memo, useCallback, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { addRootElement } from 'lib/generateElement';
import { createPortal } from 'react-dom';
import { CloseIcon } from 'icons';

interface ModalPopupProps {
  children: React.ReactNode;
  show: boolean;
  closeHandler?: () => void;
}

const PanelWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  width: 400px;
  background-color: rgba(40, 43, 53, 0.9);
  &.enter {
    opacity: 0;
    transform: translateX(80%);
    transition: opacity 0.4s, transform 0.4s;
  }
  &.enter-active {
    opacity: 1;
    transform: translateX(0%);
  }
  &.exit {
    opacity: 1;
    transform: translateX(0%);
    transition: opacity 0.4s, transform 0.4s;
  }
  &.exit-active {
    opacity: 0;
    transform: translateX(80%);
  }
`;

const Content = styled.div``;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
`;

addRootElement('side-panel-container');

const SidePanel: React.FC<ModalPopupProps> = ({
  show = false,
  children,
  closeHandler,
}) => {
  const panelContainerElement = document.getElementById('side-panel-container');

  const handleKeyPress = useCallback(
    (e: KeyboardEvent): void => {
      if (closeHandler && e.code === 'Escape') {
        closeHandler();
      }
    },
    [closeHandler],
  );

  const handleClose = useCallback(
    (e: MouseEvent): void => {
      if (
        closeHandler &&
        e.target instanceof Element &&
        !e.target.closest('#side-panel-container')
      ) {
        closeHandler();
      }
    },
    [closeHandler],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false);
    document.addEventListener('click', handleClose, true);

    return (): void => {
      document.removeEventListener('keydown', handleKeyPress, false);
      document.removeEventListener('click', handleClose, true);
    };
  }, [handleKeyPress, handleClose]);

  return (
    <>
      {panelContainerElement &&
        createPortal(
          <TransitionGroup>
            {show && (
              <CSSTransition timeout={400}>
                <PanelWrapper>
                  <Content>
                    {children}
                    {closeHandler && (
                      <CloseButton onClick={closeHandler}>
                        <CloseIcon width={20} height={20} />
                      </CloseButton>
                    )}
                  </Content>
                </PanelWrapper>
              </CSSTransition>
            )}
          </TransitionGroup>,
          panelContainerElement,
        )}
    </>
  );
};

export default memo(SidePanel);
