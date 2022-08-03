import {useTypedSelector} from "@/core/hooks/useTypedSelector";

export const useAuth = () => useTypedSelector((state) => state.auth)