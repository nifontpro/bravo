import { DetailedHTMLProps, Dispatch, InputHTMLAttributes, SetStateAction } from 'react';
import {
  DeepRequired,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form';

export type InputRadioProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  error?:
    | Merge<FieldError, FieldErrorsImpl<DeepRequired<FileList>>>
    | undefined;
  active: 'MALE' | 'FEMALE';
  setActive: Dispatch<SetStateAction<"MALE" | "FEMALE">>

};
