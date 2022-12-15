import {GetServerSideProps, NextPage} from "next";
import {errorCatch} from "@/core/utils/api.helpers";
import Error404 from "../404";
// import {medalApi} from "@/medal/data/medal.api";
// import SingleMedal from "@/medal/presenter/SingleMedal";
import { awardApi } from 'award/data/award.api';
import Award from 'award/presenter/Award/Award';

const SingleAwardPage: NextPage<{ id: string }> = ({id}) => {

	const {data: award} = awardApi.useGetAwardByIdWithUsersQuery(id)
	return award ?
		<Award award={award}/>
		:
		<Error404/>
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
	try {
		const id = String(params?.id)
		return {
			props: {id}
		}
	} catch (e) {
		console.log(errorCatch(e))
		return {notFound: true}
	}
}

export default SingleAwardPage