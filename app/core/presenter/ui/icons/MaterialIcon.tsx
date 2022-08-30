import {FC} from 'react'
import * as MaterialIcons from 'react-icons/md'

import {useRenderClient} from '@/core/hooks/useRenderClient'

import {TypeMaterialIconName} from '@/core/model/icon.types'

const MaterialIcon: FC<{ name: TypeMaterialIconName, classname?: string }> =
	({name, classname}) => {
		const {isRenderClient} = useRenderClient()

		const IconComponent = MaterialIcons[name]

		if (isRenderClient)
			return <IconComponent className={classname}/> || <MaterialIcons.MdDragIndicator/>
		else return null
	}

export default MaterialIcon
