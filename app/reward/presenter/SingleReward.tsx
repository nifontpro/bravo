import {FC} from 'react'
import {IReward} from "../model/reward.types";
import Meta from "@/core/utils/meta/Meta";
import Banner from "@/core/presenter/ui/banner/Banner";

const SingleReward: FC<{ reward: IReward }> = ({reward}) => {

	return <Meta title={`Награждение ${reward.name}`} description={`Подробности награждения`}>
		Награждение: {reward.name}
		<Banner
			imagePath={reward.medal.imageUrl}
			Detail={() => <div className="">
				Детали награды
			</div>}
		/>
	</Meta>
}

export default SingleReward