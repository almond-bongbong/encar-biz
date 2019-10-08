import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { addRootElement, createElement } from 'lib/generateElement';
import { createPortal } from 'react-dom';

interface PopupContentProps {
  scrolling: number;
}

interface ModalPopupProps {
  children: React.ReactNode;
  show: boolean;
  onClickDim?: () => void;
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
    background-color: rgba(0, 0, 0, 0.4);
    text-align: center;
  }
  & .content {
    display: inline-block;
    padding: 20px;
    border-radius: 6px;
    background-color: #444;
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

const popupContainer = document.getElementById('popup_container');
if (!popupContainer) addRootElement(createElement('popup_container'));

const ModalPopup: React.FC<ModalPopupProps> = ({
  show = false,
  children,
  onClickDim,
  keyPressESC,
}) => {
  const popupEl = useMemo(() => document.createElement('div'), []);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const popupParent = document.getElementById('popup_container');

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
  }, [show]);

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
                    title="팝업닫기"
                  >
                    <div className="content" ref={contentRef}>
                      {children}
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
