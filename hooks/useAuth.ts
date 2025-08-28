import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export const useAuth = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const profile = useSelector((state: RootState) => state.user.profile);
  
  return {
    isAuthenticated: !!token,
    token,
    profile,
  };
};