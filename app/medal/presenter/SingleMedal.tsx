import {FC} from 'react';
import Meta from "@/core/utils/meta/Meta";
import Banner from "@/core/presenter/ui/banner/Banner";
import {IMedal} from "@/medal/model/medal.types";
import styles from "@/core/presenter/ui/form/form.module.scss";

const SingleMedal: FC<{ medal: IMedal }> = ({medal}) => {

	return <Meta title={medal.name} description={`Медаль ${medal.name}`}>
		<Banner
			imagePath={medal.imageUrl}
			Detail={() => null}
		/>
		<div className={styles.singleEntity}>
			<h1>Наименование: {medal.name}</h1>
			<h2>Описание: {medal.description}</h2>
			<h2>Ценность: {medal.score}</h2>
		</div>

	</Meta>
}

export default SingleMedal