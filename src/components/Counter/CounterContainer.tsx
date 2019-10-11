import React from 'react';
import CounterPresenter from './CounterPresenter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { decrease, increase, increaseBy } from 'store/counter/actions';

const CounterContainer: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  const onIncrease = (): void => {
    dispatch(increase());
  };

  const onDecrease = (): void => {
    dispatch(decrease());
  };

  const onIncreaseBy = (diff: number): void => {
    dispatch(increaseBy(diff));
  };

  return (
    <div>
      <CounterPresenter
        count={count}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        onIncreaseBy={onIncreaseBy}
      />
    </div>
  );
};

export default CounterContainer;
