import {GetServerSideProps, NextPage} from "next";
import SingleReward from "../../app/reward/presenter/SingleReward";
import {rewardApi} from "../../app/reward/data/reward.api";
import Error404 from "../404";
import {errorCatch} from "@/core/utils/api.helpers";

const SingleRewardPage: NextPage<{ id: string | undefined }> = ({id}) => {

	const {data: reward} = rewardApi.useGetRewardByIdQuery(id || '', {skip: !id})

	return reward ?
		<SingleReward reward={reward}/>
		:
		<Error404/>
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
	try {
		const id = params?.id
		return {
			props: {id}
		}
	} catch (e) {
		console.log(errorCatch(e))
		return {notFound: true}
	}
}

export default SingleRewardPage