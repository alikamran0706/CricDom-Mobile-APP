import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | null;
  profile: Record<string, any> | null;
}

const initialState: UserState = {
  token: null,
  profile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
       AsyncStorage.setItem('token', action.payload);
    },
    setProfile: (state, action: PayloadAction<any>) => {
      state.profile = action.payload;
      AsyncStorage.setItem('profile', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.token = null;
      state.profile = null;
    },
  },
});

export const { setToken, setProfile, logout } = userSlice.actions;
export default userSlice.reducer;