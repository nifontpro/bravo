import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import logoImage from '@/core/presenter/images/bravo.webp'

const Logo: FC = () => {
	return (
		<Link href="/">
			<a className="px-layout mb-10 block">
				<Image
					src={logoImage}
					width={300}
					height={80}
					alt="Браво"
					draggable={false}
				/>
			</a>
		</Link>
	)
}

export default Logo
