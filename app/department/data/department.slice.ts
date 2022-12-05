import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDepartment} from "@/department/model/department.types";
import {useTypedSelector} from "@/core/hooks/useTypedSelector";
import {getDepartmentByStorage, saveDepartmentToStorage} from "@/auth/data/auth.helper";

interface IDepartmentState {
	currentDepartment: IDepartment | null
}

const initialState: IDepartmentState = {
	currentDepartment: getDepartmentByStorage()
}

export const departmentSlice = createSlice({
	name: 'department',
	initialState,
	reducers: {
		setState: (state, action: PayloadAction<IDepartment>) => {
			state.currentDepartment = action.payload
			saveDepartmentToStorage(action.payload);
		},
		clear: (state) => {
			state.currentDepartment = null
		}
	}
})

export const departmentActions = departmentSlice.actions

export const useDepartmentState = () => useTypedSelector((state) => state.department)