import {ControllerRenderProps} from 'react-hook-form'
import {IFieldProps} from "@/core/presenter/ui/form/form.interface";
import {Options} from "react-select";
import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from 'react';

export interface IOption {
	label: string
	value: string
}

export interface ISelect extends IFieldProps, DetailedHTMLProps<HTMLAttributes<HTMLSelectElement>, HTMLSelectElement>  {
	options: Options<IOption>
	isMulti?: boolean
	field?: ControllerRenderProps<any, any>
	isLoading?: boolean
	placeholder: string
	setDepartSort: Dispatch<SetStateAction<string>>
}
