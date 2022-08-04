import {ICompany} from "@/company/model/company.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ICompanyState {
	currentCompany: ICompany | null
}

const initialState: ICompanyState = {
	currentCompany: null
}

export const companySlice = createSlice({
	name: 'company',
	initialState,
	reducers: {
		setState: (state, action: PayloadAction<ICompany>) => {
			state.currentCompany = action.payload
		},
		clear: (state) => {
			state.currentCompany = null
		}
	}
})

export const companyActions = companySlice.actions