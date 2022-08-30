import {FC} from 'react'
import * as MaterialIcons from 'react-icons/md'

import {useRenderClient} from '@/core/hooks/useRenderClient'

import {TypeMaterialIconName} from '@/core/model/icon.types'

const MaterialIcon: FC<{ name: TypeMaterialIconName, classname?: string, onClick?: () => void }> =
	({name, classname, onClick}) => {
		const {isRenderClient} = useRenderClient()

		const IconComponent = MaterialIcons[name]

		if (isRenderClient)
			return <IconComponent className={classname} onClick={onClick}/> || <MaterialIcons.MdDragIndicator/>
		else return null
	}

export default MaterialIcon
