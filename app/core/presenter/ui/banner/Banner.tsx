import React, {FC} from 'react'
import styles from '@/core/presenter/ui/banner/Banner.module.scss'
import {ImageDefault} from "@/core/presenter/ui/icons/ImageDefault";

interface IBanner {
	imagePath?: string
	Detail?: FC | null
}

const Banner: FC<IBanner> = ({ imagePath, Detail }) => {
	return (
		<div className={styles.banner}>
			<ImageDefault
				alt=""
				src={imagePath}
				draggable={false}
				layout="fill"
				className="image-like-bg"
				unoptimized
				priority
			/>
			{Detail && <Detail />}
		</div>
	)
}

export default Banner
