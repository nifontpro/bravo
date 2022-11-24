import {ControllerRenderProps} from 'react-hook-form'
import {IFieldProps} from "@/core/presenter/ui/form/form.interface";
import {Options} from "react-select";

export interface IOption {
	label: string
	value: string
}

export interface ISelect extends IFieldProps {
	options: Options<IOption>
	isMulti?: boolean
	field: ControllerRenderProps<any, any>
	isLoading?: boolean
}
