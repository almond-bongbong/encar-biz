import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { addRootElement } from 'lib/generateElement';
import { createPortal } from 'react-dom';
import { CloseIcon } from 'icons';

interface PopupContentProps {
  scrolling: number;
}

interface ModalPopupProps {
  children: React.ReactNode;
  show: boolean;
  onClickDim?: () => void;
  onCloseButton?: () => void;
  keyPressESC?: () => void;
}

const PopupWrapper = styled.div`
  position: relative;
  z-index: 10000;
  &.enter {
    opacity: 0;
    transition: opacity 0.3s;
  }
  &.enter-active {
    opacity: 1;
  }
  &.exit {
    opacity: 1;
    transition: opacity 0.3s;
  }
  &.exit-active {
    opacity: 0;
  }
`;

const PopupContent = styled.div<PopupContentProps>`
  & .mask {
    overflow-y: auto;
    overflow-x: hidden;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  & .content {
    display: inline-block;
    border-radius: 6px;
    box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.2);
    text-align: center;

    ${({ scrolling }): FlattenSimpleInterpolation =>
      scrolling
        ? css`
            position: relative;
            margin: 50px auto 50px;
          `
        : css`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          `}
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
`;

addRootElement('popup-container');

const ModalPopup: React.FC<ModalPopupProps> = ({
  show = false,
  children,
  onClickDim,
  onCloseButton,
  keyPressESC,
}) => {
  const popupEl = useMemo(() => document.createElement('div'), []);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const popupParent = document.getElementById('popup-container');

    if (popupParent) {
      popupParent.appendChild(popupEl);
      return (): void => {
        popupParent.removeChild(popupEl);
      };
    }
  }, [popupEl]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent): void => {
      if (keyPressESC && e.code === 'Escape') {
        keyPressESC();
      }
    },
    [keyPressESC],
  );

  useEffect(() => {
    if (keyPressESC) {
      document.addEventListener('keydown', handleKeyPress, false);
    }

    return (): void => {
      document.removeEventListener('keydown', handleKeyPress, false);
    };
  }, [keyPressESC, handleKeyPress]);

  useLayoutEffect(() => {
    if (contentRef.current) {
      const windowHeight = window.innerHeight;
      const height = contentRef.current.clientHeight;
      const margin = 50;

      if (windowHeight - margin < height) setHasScroll(true);
    }
  }, [children]);

  const handleClickDim = useCallback(
    e => {
      if (e.target.classList.contains('mask') && onClickDim) onClickDim();
    },
    [onClickDim],
  );

  return (
    <>
      {createPortal(
        <TransitionGroup className="popup">
          {show && (
            <CSSTransition timeout={300}>
              <PopupWrapper>
                <PopupContent scrolling={hasScroll ? 1 : 0}>
                  <div
                    className="mask"
                    role="presentation"
                    onClick={handleClickDim}
                  >
                    <div className="content" ref={contentRef}>
                      {children}
                      {onCloseButton && (
                        <CloseButton onClick={onCloseButton}>
                          <CloseIcon width={20} height={20} />
                        </CloseButton>
                      )}
                    </div>
                  </div>
                </PopupContent>
              </PopupWrapper>
            </CSSTransition>
          )}
        </TransitionGroup>,
        popupEl,
      )}
    </>
  );
};

export default memo(ModalPopup);
