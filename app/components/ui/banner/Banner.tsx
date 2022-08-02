import React, {FC} from 'react'
import styles from './Banner.module.scss'
import {ImageDefault} from "@/ui/icons/ImageDefault";

interface IBanner {
	imagePath: string | null
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
				className="image-like-bg object-top"
				unoptimized
				priority
			/>
			{Detail && <Detail />}
		</div>
	)
}

export default Banner
