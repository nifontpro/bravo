import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useTypedSelector} from "@/core/hooks/useTypedSelector";

interface IModalState {
	isOpen: boolean
}

const initialState: IModalState = {
	isOpen: false
}

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setState: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload
		}
	}
})

export const modalActions = modalSlice.actions

export const useModalState = () => useTypedSelector((state) => state.modal)