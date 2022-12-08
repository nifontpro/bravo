import {ControllerRenderProps} from 'react-hook-form'
import {IFieldProps} from "@/core/presenter/ui/form/form.interface";
import {Options} from "react-select";
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IOption {
	label: string
	value: string
}

export interface ISelect extends IFieldProps, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>  {
	options: Options<IOption>
	isMulti?: boolean
	field?: ControllerRenderProps<any, any>
	isLoading?: boolean
	placeholder: string
}
