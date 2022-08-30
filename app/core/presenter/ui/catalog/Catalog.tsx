import {FC} from 'react'
import styles from '@/core/presenter/ui/catalog/Catalog.module.scss'
import {ICatalog} from '@/core/presenter/ui/catalog/catalog.types'
import Meta from "@/core/utils/meta/Meta";
import Heading from "@/core/presenter/ui/heading/Heading";
import Description from "@/core/presenter/ui/heading/Description";
import GalleryItem from "@/core/presenter/ui/gallery/GalleryItem";

const Catalog: FC<ICatalog> = ({title, description, prefix, data}) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading}/>
			{description && (
				<Description text={description}/>
			)}

			<section className={styles.elements}>
				{data.map((d) => (
					<GalleryItem
						key={d.id}
						variant="horizontal"
						item={{
							name: d.name,
							imageUrl: d.imageUrl,
							link: `${prefix}/${d.id}`,
							content: {
								title: d.name,
							},
						}}
					/>
				))}
			</section>

			{/* <div className="text-center">
				<button className={styles.button}>Load more</button>
			</div> */}
		</Meta>
	)
}

export default Catalog