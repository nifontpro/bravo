import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useTypedSelector } from '@/core/hooks/useTypedSelector';

const initialState = {
  email: 'example',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      console.log(action.payload);
    },
  },
});

export const loginActions = loginSlice.actions;

export const useLoginState = () => useTypedSelector((state) => state.login);
