import React from 'react';

interface CounterProps {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onIncreaseBy: (diff: number) => void;
}

const CounterPresenter: React.FC<CounterProps> = ({
  count,
  onIncrease,
  onDecrease,
  onIncreaseBy,
}) => {
  return (
    <div>
      <h1>{count}</h1>
      <button type={'button'} onClick={onIncrease}>
        +1
      </button>
      <button type={'button'} onClick={onDecrease}>
        -1
      </button>
      <button type={'button'} onClick={() => onIncreaseBy(5)}>
        +5
      </button>
    </div>
  );
};

export default CounterPresenter;
