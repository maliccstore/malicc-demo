import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import {
  checkHealth,
  pingServer,
  clearHealthError,
} from '../../../store/slices/healthSlice';

export const useHealth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const healthState = useSelector((state: RootState) => state.health);

  const checkServerHealth = () => {
    dispatch(checkHealth());
  };

  const ping = () => {
    dispatch(pingServer());
  };

  const clearError = () => {
    dispatch(clearHealthError());
  };

  return {
    ...healthState,
    checkServerHealth,
    ping,
    clearError,
  };
};
