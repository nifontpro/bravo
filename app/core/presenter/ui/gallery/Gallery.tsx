import { FC } from 'react'

import { IGalleryItem } from '@/core/presenter/ui/gallery/gallery.types'
import GalleryItem from '@/core/presenter/ui/gallery/GalleryItem'

import styles from '@/core/presenter/ui/gallery/Gallery.module.scss'

const Gallery: FC<{ items: IGalleryItem[] }> = ({ items }) => {
	return (
		<div className={styles.gallery}>
			{items.map(item => (
				<GalleryItem key={item.link} item={item} variant='vertical' />
			))}
		</div>
	)
}

export default Gallery
