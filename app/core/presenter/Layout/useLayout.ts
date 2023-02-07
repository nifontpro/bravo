import { useDispatch } from 'react-redux'
import { layoutActions, useLayoutState } from './Layout.slice'

export const useLayout = () => {
    const visibleNavigation = useLayoutState().navigationVisible
    const dispatch = useDispatch()

    const close = () => {
        dispatch(layoutActions.setNavigationVisible(false))
    }

    const open = () => {
        dispatch(layoutActions.setNavigationVisible(true))
    }

    return {close, open, visibleNavigation}
}