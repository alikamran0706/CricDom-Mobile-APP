import Button from '@/components/ui/Buttons';
import { logout } from '@/store/features/user/userSlice';
import { useRouter } from 'expo-router';
import React from 'react';
import { useDispatch } from 'react-redux';

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    // The router will automatically redirect due to the dynamic guard
    router.replace('/getStarted');
  };

  return (
    <Button
      title="Logout"
      onPress={handleLogout}
      variant="secondary"
    />
  );
};

export default LogoutButton;