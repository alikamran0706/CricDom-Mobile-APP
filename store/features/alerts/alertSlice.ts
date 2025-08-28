import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
  type: 'success' | 'warning' | 'error' | null;
  message: string | null;
}

const initialState: AlertState = {
  type: null,
  message: null,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (
      state,
      action: PayloadAction<{ type: AlertState['type']; message: string }>
    ) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    clearAlert: () => initialState,
  },
});

export const { showAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
