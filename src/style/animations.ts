import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  0%   { opacity: 0; }
  100% { opacity: 1; }
`;

export const rotation = keyframes`
  0% { transform: translateZ(0) rotate(0deg); }
  100% { transform: translateZ(0) rotate(360deg); }
`;

export const veil = keyframes`
  0% { background-position: 0 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0 50% }
`;

export default null;