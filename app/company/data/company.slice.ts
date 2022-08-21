import {ICompany} from "@/company/model/company.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useTypedSelector} from "@/core/hooks/useTypedSelector";
import {getCompanyByStorage} from "@/auth/data/auth.helper";

interface ICompanyState {
	currentCompany: ICompany | null
}

const initialState: ICompanyState = {
	currentCompany: getCompanyByStorage()
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

export const useCompanyState = () => useTypedSelector((state) => state.company)