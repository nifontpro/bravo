import { TypedUseSelectorHook, useSelector } from 'react-redux'
import {TypeRootState} from "../api/store/store";

export const useTypedSelector: TypedUseSelectorHook<TypeRootState> = useSelector
