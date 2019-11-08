import React from 'react';

interface ArrowRightProps {
  className?: string;
}

const ArrowRight: React.FC<ArrowRightProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 24 24"
  >
    <path d="M24 12l-12-8v5h-12v6h12v5z" fill="#eee" />
  </svg>
);

export default ArrowRight;
