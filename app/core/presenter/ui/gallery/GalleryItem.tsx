import cn from 'classnames'
import Link from 'next/link'
import {FC} from 'react'

import styles from '@/core/presenter/ui/gallery/Gallery.module.scss'
import {IGalleryItemProps} from '@/core/presenter/ui/gallery/gallery.types'
import {ImageDefault} from "@/core/presenter/ui/icons/ImageDefault";

const GalleryItem: FC<IGalleryItemProps> = ({item, variant}) => {

	return (
		<Link href={item.link}>
			<a
				className={cn(styles.item, {
					[styles.withText]: item.content,
					[styles.horizontal]: variant === 'horizontal',
					[styles.vertical]: variant === 'vertical',
				})}
			>
				<ImageDefault
					src={item.imageUrl}
					alt={item.name}
					layout="fill"
					draggable={false}
					priority
				/>

				{item.content && (
					<div className={styles.content}>
						<div className={styles.title}>{item.content.title}</div>
						{item.content.subTitle && (
							<div className={styles.subTitle}> {item.content.subTitle}</div>
						)}
					</div>
				)}
			</a>
		</Link>
	)
}

export default GalleryItem
