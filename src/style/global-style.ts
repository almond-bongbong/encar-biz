import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Maven+Pro&display=swap');
  ${reset}
  * {
    box-sizing: border-box;
  }
  html {
    touch-action: manipulation;
  }
  body {
    font-family: ${({ theme }): string => theme.primaryFont};
    color: #333;
    line-height: 1.5;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  button {
    padding: 0;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    font-family: ${({ theme }): string => theme.primaryFont};
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 
    &:focus,
    &:active {
      outline: 0;
    }
  }
  .CalendarDay {
    vertical-align: middle;
  }
  *:focus {
    outline: 0;
  }
`;
