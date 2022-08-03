import {FC} from 'react'
import styles from '@/core/presenter/ui/catalog/Catalog.module.scss'
import {ICatalog} from '@/core/presenter/ui/catalog/catalog.types'
import Meta from "@/core/utils/meta/Meta";
import Heading from "@/core/presenter/ui/heading/Heading";
import Description from "@/core/presenter/ui/heading/Description";
import GalleryItem from "@/core/presenter/ui/gallery/GalleryItem";
import {getCompanyPath} from "@/core/config/path.config";

const Catalog: FC<ICatalog> = ({title, description, data}) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading}/>
			{description && (
				<Description text={description} className={styles.description}/>
			)}

			<section className={styles.movies}>
				{data.map((d) => (
					<GalleryItem
						key={d.id}
						variant="horizontal"
						item={{
							name: d.name,
							imageUrl: d.imageUrl,
							link: getCompanyPath(d.id),
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