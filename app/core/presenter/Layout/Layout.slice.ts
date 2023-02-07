import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useTypedSelector } from '@/core/hooks/useTypedSelector';

const initialState = {
  navigationVisible: false,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setNavigationVisible: (state, action: PayloadAction<boolean>) => {
      state.navigationVisible = action.payload;
    },
  },
});

export const layoutActions = layoutSlice.actions;

export const useLayoutState = () => useTypedSelector((state) => state.layout)