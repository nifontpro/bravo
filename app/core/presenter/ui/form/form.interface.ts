import {ButtonHTMLAttributes, CSSProperties, InputHTMLAttributes} from "react";
import {FieldError} from "react-hook-form";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
}

export interface IFieldProps {
	placeholder: string
	error?: FieldError | undefined
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps

export interface IField extends TypeInputPropsField {
}

export interface IUploadField {
	folder?: string
	value: string | null // !!!
	onChange: (...event: any[]) => void
	placeholder: string
	error?: FieldError
	style?: CSSProperties
	isNoImage?: boolean
}