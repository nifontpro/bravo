import {FC} from 'react';
import Meta from "@/core/utils/meta/Meta";
import Banner from "@/core/presenter/ui/banner/Banner";
import {IMedal} from "@/medal/model/medal.types";

const SingleMedal: FC<{ medal: IMedal }> = ({medal}) => {

	return <Meta title={medal.name} description={`Награда ${medal.name}`}>
		<Banner
			imagePath={medal.imageUrl}
			Detail={() => null}
		/>
		<h1>Название награды: {medal.name}</h1>
		<h2>Описание: {medal.description}</h2>
		<h2>Ценность: {medal.score}</h2>

	</Meta>
}

export default SingleMedal