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

export const dateSlice = createSlice({
  name: 'date',
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

export const dateActions = dateSlice.actions;

export const useStartDateState = () => useTypedSelector((state) => state.date.startDate);
export const useEndDateState = () => useTypedSelector((state) => state.date.endDate);
