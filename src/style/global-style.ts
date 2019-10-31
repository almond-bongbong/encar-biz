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
    font-family: 'Noto Sans KR',-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
    color: #333;
    line-height: 1.5;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input,
  button {
    padding: 0;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 
    &:focus,
    &:active {
      outline: 0;
    }
  }
   h1,h2,h3,h4,h5,h6{
    font-family:'Maven Pro', sans-serif;
  }
  .CalendarDay {
    vertical-align: middle;
  }
  *:focus {
    outline: 0;
  }
`;
