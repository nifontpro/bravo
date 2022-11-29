import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthResponse } from '@/auth/model/auth.types';
import { removeLocalData, saveTokensToCookie } from '@/auth/data/auth.helper';
import { useTypedSelector } from '@/core/hooks/useTypedSelector';
import { IUser } from '@/user/model/user.types';
import { useSelector } from 'react-redux';

// export interface ILoginState {
//   email: string;
// }

const initialState = {
  email: 'example',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      console.log(action.payload)
    },
  },
});

export const loginActions = loginSlice.actions;

export const useLoginState = () => useTypedSelector((state) => state.login)