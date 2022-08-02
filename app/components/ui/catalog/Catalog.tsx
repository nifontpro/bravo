import {FC} from 'react'
import styles from './Catalog.module.scss'
import {ICatalog} from './catalog.types'
import Meta from "@/utils/meta/Meta";
import Heading from "@/ui/heading/Heading";
import Description from "@/ui/heading/Description";
import GalleryItem from "@/ui/gallery/GalleryItem";
import {getCompanyPath} from "../../../config/path.config";

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