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
    overflow: hidden;
    font-family: ${({ theme }): string => theme.primaryFont};
    color: #eee;
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
    color: inherit;
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
  
  @-webkit-keyframes dash {
    to {
      stroke-dashoffset: 1000;
    }
  }
  .path {
    -webkit-animation: dash 30s linear infinite;
    stroke-dasharray: 8;
  }
`;
