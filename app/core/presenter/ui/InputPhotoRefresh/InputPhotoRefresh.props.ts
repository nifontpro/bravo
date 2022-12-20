import React, { DetailedHTMLProps, Dispatch, InputHTMLAttributes, ReactNode, SetStateAction } from "react"
import { DeepRequired, FieldError, FieldErrorsImpl, Merge } from "react-hook-form"

export type InputPhotoRefreshProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    error?: Merge<FieldError, FieldErrorsImpl<DeepRequired<FileList>>> | undefined
    children: ReactNode
}