import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDepartment} from "@/department/data/department.types";
import {useTypedSelector} from "@/core/hooks/useTypedSelector";

interface IDepartmentState {
	currentDepartment: IDepartment | null
}

const initialState: IDepartmentState = {
	currentDepartment: null
}

export const departmentSlice = createSlice({
	name: 'department',
	initialState,
	reducers: {
		setState: (state, action: PayloadAction<IDepartment>) => {
			state.currentDepartment = action.payload
			console.log(`SET DEP: ${action.payload.name}`)
		},
		clear: (state) => {
			state.currentDepartment = null
		}
	}
})

export const departmentActions = departmentSlice.actions

export const useDepartmentState = () => useTypedSelector((state) => state.department)