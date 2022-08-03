import { TypedUseSelectorHook, useSelector } from 'react-redux'
import {TypeRootState} from "@/core/data/store";

export const useTypedSelector: TypedUseSelectorHook<TypeRootState> = useSelector
