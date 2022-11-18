import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import LogoImage from '@/core/presenter/images/logo.svg'

const Logo: FC = () => {
	return (
		<Link href="/">
			<a className="px-layout mb-10">
				{/* <Image
					src={LogoImage}
					width={300}
					height={80}
					alt="Медалист"
					draggable={false}
				/> */}
				<LogoImage className='w-[200px] mt-2'/>
			</a>
		</Link>
	)
}

export default Logo
