import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useTypedSelector } from '@/core/hooks/useTypedSelector';

interface IModalState {
  startDate: string;
  endDate: string;
}

const initialState: IModalState = {
  startDate: '',
  endDate: '',
};

export const dataCreateAwardSlice = createSlice({
  name: 'dataCreateAward',
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    resetDate: (state) => {
      state.endDate = ''
      state.startDate = ''
    },
  },
});

export const dateActions = dataCreateAwardSlice.actions;

export const useStartDateState = () => useTypedSelector((state) => state.dataCreateAward.startDate);
export const useEndDateState = () => useTypedSelector((state) => state.dataCreateAward.endDate);
