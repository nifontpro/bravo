import { DetailedHTMLProps, InputHTMLAttributes } from "react"
import { DeepRequired, FieldError, FieldErrorsImpl, Merge } from "react-hook-form"

export type InputFileProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    error?: Merge<FieldError, FieldErrorsImpl<DeepRequired<FileList>>> | undefined
}