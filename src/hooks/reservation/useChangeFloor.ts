import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

type ChangeFloorHook = () => (floor: number | string) => void;

const useChangeFloor: ChangeFloorHook = () => {
  const history = useHistory();

  return useCallback(
    (floor: number | string): void => {
      history.push(`/?floor=${floor}`);
    },
    [history],
  );
};

export default useChangeFloor;
